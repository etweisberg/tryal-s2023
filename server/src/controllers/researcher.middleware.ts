import express from 'express';
import ApiError from '../util/apiError';
import { IUser } from '../models/user.model';

const isResearcher = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  // Get User
  const user: IUser | null = req.user as IUser;
  // Check is user exists and is valid
  if (!user) {
    next(ApiError.unauthorized('Not a valid user.')); // TODO: see if this is the correct message
    return;
  }
  // Check if the user is an admin
  if (user.researcher) {
    next();
  } else {
    next(ApiError.unauthorized('Need researcher status.'));
  }
};

// eslint-disable-next-line import/prefer-default-export
export { isResearcher };
