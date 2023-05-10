import express from 'express';
import ApiError from '../util/apiError';
import { allMsg, createMsg } from '../services/message.service';
import StatusCode from '../util/statusCode';
import { IUser, User } from '../models/user.model';
import { IMessage, Message } from '../models/message.model';
import { Date } from 'mongoose';

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

const sendMessage = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const user: IUser | null = req.user as IUser;
  const { sender, recipient, content } = req.body;
  const timestamp = new Date(Date.now());
  if (!sender || !recipient || !content) {
    next(ApiError.missingFields(['sender', 'recipient', 'content']));
    return;
  }
  if (sender === recipient) {
    next(ApiError.badRequest('Cannot send message to self'));
    return;
  }
  if (sender !== user.id) {
    next(ApiError.forbidden('Cannot send message as another user'));
    return;
  }
  const recipientUser: IUser | null = await User.findById(recipient);
  if (!recipientUser) {
    next(ApiError.badRequest('Recipient does not exist'));
    return;
  }
  if (recipientUser.researcher && !user.researcher) {
    next(
      ApiError.forbidden('Cannot send message to researcher as participant'),
    );
    return;
  }
  try {
    const message = await createMsg(sender, recipient, content, timestamp);
    await message?.save();
    res.sendStatus(StatusCode.CREATED);
  } catch (err) {
    next(ApiError.internal('Unable to send message'));
  }
};

const deleteMessage = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const user: IUser | null = req.user as IUser;
  const { messageId } = req.body;
  if (!messageId) {
    next(ApiError.missingFields(['messageId']));
    return;
  }
  const message: IMessage | null = await Message.findById(messageId).exec();
  if (!message) {
    next(ApiError.notFound('Message does not exist'));
    return;
  }
  if (message.sender !== user.id && message.recipient !== user.id) {
    next(ApiError.forbidden('Cannot delete message as another user'));
    return;
  }
  try {
    if (message.sender === user.id) {
      const updatedMessage = await Message.findByIdAndUpdate(messageId, {
        deletedForSender: true,
      }).exec();
      await updatedMessage?.save();
    }
    if (message.recipient === user.id) {
      const updatedMessage = await Message.findByIdAndUpdate(messageId, {
        deletedForRecipient: true,
      }).exec();
      await updatedMessage?.save();
    }
  } catch (err) {
    next(ApiError.internal('Unable to delete message'));
  }
};

const readMessage = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const user: IUser | null = req.user as IUser;
  const { messageId } = req.body;
  if (!messageId) {
    next(ApiError.missingFields(['messageId']));
    return;
  }
  const message: IMessage | null = await Message.findById(messageId).exec();
  if (!message) {
    next(ApiError.notFound('Message does not exist'));
    return;
  }
  if (message.recipient !== user.id) {
    next(ApiError.forbidden('Cannot read message as another user'));
    return;
  }
  try {
    const updatedMessage = await Message.findByIdAndUpdate(messageId, {
      read: new Date(Date.now()),
    }).exec();
    await updatedMessage?.save();
  } catch (err) {
    next(ApiError.internal('Unable to read message'));
  }
};

const getSender = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { id } = req.params;
  if (!id) {
    next(ApiError.missingFields(['id']));
    return;
  }
  try {
    const messages = await Message.find({ sender: id }).exec();
    res.status(StatusCode.OK).send(messages);
  } catch (err) {
    next(ApiError.internal('Unable to get messages'));
  }
};

const getReceiver = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { id } = req.params;
  if (!id) {
    next(ApiError.missingFields(['id']));
    return;
  }
  try {
    const messages = await Message.find({ recipient: id }).exec();
    res.status(StatusCode.OK).send(messages);
  } catch (err) {
    next(ApiError.internal('Unable to get messages'));
  }
};

const getMessage = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { id } = req.params;
  if (!id) {
    next(ApiError.missingFields(['id']));
    return;
  }
  try {
    const message = await Message.findById(id).exec();
    res.status(StatusCode.OK).send(message);
  } catch (err) {
    next(ApiError.internal('Unable to get message'));
  }
};

// eslint-disable-next-line import/prefer-default-export
export {
  getAllMessages,
  sendMessage,
  deleteMessage,
  readMessage,
  getSender,
  getReceiver,
  getMessage,
};
