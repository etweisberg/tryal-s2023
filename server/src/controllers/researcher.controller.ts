import express from 'express';
import { IResearcherRequest } from '../models/researcherRequest.model';
import { IUser } from '../models/user.model';
import { getUserByEmail } from '../services/user.service';
import StatusCode from '../util/statusCode';
import {
  createResearcherRequest,
  getResearcherRequest,
} from '../services/researcherRequest.service';
import ApiError from '../util/apiError';

const registerResearcherRequest = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { email, institution } = req.body;
  if (!email || !institution) {
    next(ApiError.missingFields(['email', 'institution']));
    return;
  }
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/g;

  if (!email.match(emailRegex)) {
    next(ApiError.badRequest('Invalid email'));
    return;
  }

  if (!req.isAuthenticated()) {
    next(ApiError.badRequest('Not logged in.'));
    return;
  }
  const lowercaseEmail = email.toLowerCase();
  // Check if researcher request exists
  const existingResearcherRequest: IResearcherRequest | null =
    await getResearcherRequest(lowercaseEmail);
  if (existingResearcherRequest) {
    next(
      ApiError.badRequest(
        `Request with email ${lowercaseEmail} already exists.`,
      ),
    );
    return;
  }
  const user: IUser | null = await getUserByEmail(lowercaseEmail);
  if (!user) {
    next(
      ApiError.badRequest(`User with email ${lowercaseEmail} does not exist.`),
    );
    return;
  }
  // Create researcher request and send verification email
  try {
    const researcherRequest = await createResearcherRequest(
      user.firstName,
      user.lastName,
      lowercaseEmail,
      institution,
    );
    await researcherRequest?.save();
    res.sendStatus(StatusCode.CREATED);
  } catch (err) {
    next(ApiError.internal('Unable to register researcher.'));
  }
};

export default registerResearcherRequest;
