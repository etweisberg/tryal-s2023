import express from 'express';
import ApiError from '../util/apiError';
import { allMsg } from '../services/message.service';
import StatusCode from '../util/statusCode';

const getAllMessages = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  try {
    const messages = await allMsg();
    res.status(StatusCode.OK).send(messages);
  } catch (err) {
    next(ApiError.internal('Unable to get messages'));
  }
};

// eslint-disable-next-line import/prefer-default-export
export { getAllMessages };
