import express from 'express';
import passport from 'passport';
import crypto from 'crypto';
import { hash } from 'bcrypt';
import { IResearcherRequest } from '../models/researcherRequest.model';
import { IResearcher } from '../models/researcher.model';
import StatusCode from '../util/statusCode';
import {
  createResearcherRequest,
  getAllResearcherRequests,
  getResearcherRequest,
  getResearcherRequestByVerificationToken,
} from '../services/researcherRequest.service';
import {
  emailResetPasswordLink,
  emailVerificationLink,
} from '../services/mail.service';
import ApiError from '../util/apiError';
import {
  getInviteByToken,
  removeInviteByToken,
} from '../services/invite.service';
import { IInvite } from '../models/invite.model';
import { instance } from 'gaxios';

const registerResearcherRequest = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { firstName, lastName, email, password, institution, address } =
    req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !institution ||
    !address
  ) {
    next(
      ApiError.missingFields([
        'firstName',
        'lastName',
        'email',
        'password',
        'institution',
        'address',
      ]),
    );
    return;
  }
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/g;

  const passwordRegex = /^[a-zA-Z0-9!?$%^*)(+=._-]{6,61}$/;

  const nameRegex = /^[a-z ,.'-]+/i;

  if (
    !email.match(emailRegex) ||
    !password.match(passwordRegex) ||
    !firstName.match(nameRegex) ||
    !lastName.match(nameRegex)
  ) {
    next(ApiError.badRequest('Invalid email, password, or name.'));
    return;
  }

  if (req.isAuthenticated()) {
    next(ApiError.badRequest('Already logged in.'));
    return;
  }
  const lowercaseEmail = email.toLowerCase();
  // Check if researcher request exists
  const existingResearcherRequest: IResearcherRequest | null =
    await getResearcherRequest(lowercaseEmail);
  if (existingResearcherRequest) {
    next(
      ApiError.badRequest(
        `An account with email ${lowercaseEmail} already exists.`,
      ),
    );
    return;
  }

  // Create researcher request and send verification email
  try {
    const researcherRequest = await createResearcherRequest(
      firstName,
      lastName,
      lowercaseEmail,
      password,
      institution,
      address,
    );
    if (process.env.NODE_ENV === 'test') {
      researcherRequest!.verified = true;
      await researcherRequest?.save();
    } else {
      const verificationToken = crypto.randomBytes(32).toString('hex');
      researcherRequest!.verificationToken = verificationToken;
      await researcherRequest!.save();
      await emailVerificationLink(lowercaseEmail, verificationToken);
    }
    res.sendStatus(StatusCode.CREATED);
  } catch (err) {
    console.log(JSON.stringify(err));
    next(ApiError.internal('Unable to register researcher.'));
  }
};

const verifyResearcherRequest = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { token } = req.body;
  if (!token) {
    next(ApiError.missingFields(['token']));
    return;
  }

  const researcherRequest = await getResearcherRequestByVerificationToken(
    token,
  );
  if (!researcherRequest) {
    next(ApiError.badRequest('Invalid verification token.'));
    return;
  }
  researcherRequest!.verificationToken = undefined;
  researcherRequest!.verified = true;
  try {
    await researcherRequest!.save();
    res.sendStatus(StatusCode.OK);
  } catch (err) {
    next(ApiError.internal('Unable to verify the account.'));
  }
};

const getAllRequests = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  getAllResearcherRequests()
    .then((researcherRequests) => {
      res.status(StatusCode.OK).send(researcherRequests);
    })
    .catch(() =>
      next(ApiError.internal('Unable to retriever research requests')),
    );
};

export { registerResearcherRequest, verifyResearcherRequest, getAllRequests };
