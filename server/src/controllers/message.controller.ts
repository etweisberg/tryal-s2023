import express from 'express';
import { Date } from 'mongoose';
import ApiError from '../util/apiError';
import { allMsg, createMsg } from '../services/message.service';
import StatusCode from '../util/statusCode';
import { IUser, User } from '../models/user.model';
import { IMessage, Message } from '../models/message.model';

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
  const { id } = req.params;
  if (!id) {
    next(ApiError.missingFields(['id']));
    return;
  }
  const message: IMessage | null = await Message.findById(id).exec();
  if (!message) {
    next(ApiError.notFound('Message does not exist'));
    return;
  }
  if (
    message.sender.toString() !== user.id &&
    message.recipient.toString() !== user.id
  ) {
    next(ApiError.forbidden('Cannot delete message as another user'));
    return;
  }
  try {
    if (message.sender.toString() === user.id) {
      if (message.deletedForSender) {
        next(ApiError.badRequest('Message already deleted'));
        return;
      }
      const updatedMessage = await Message.findByIdAndUpdate(id, {
        deletedForSender: true,
      }).exec();
      await updatedMessage?.save();
      res.sendStatus(StatusCode.OK);
    }
    if (message.recipient.toString() === user.id) {
      if (message.deletedForRecipient) {
        next(ApiError.badRequest('Message already deleted'));
        return;
      }
      const updatedMessage = await Message.findByIdAndUpdate(id, {
        deletedForRecipient: true,
      }).exec();
      await updatedMessage?.save();
      res.sendStatus(StatusCode.OK);
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
  const { id } = req.params;
  if (!id) {
    next(ApiError.missingFields(['id']));
    return;
  }
  const message: IMessage | null = await Message.findById(id).exec();
  if (!message) {
    next(ApiError.notFound('Message does not exist'));
    return;
  }
  if (message.recipient.toString() !== user.id) {
    next(ApiError.forbidden('Cannot read message as another user'));
    return;
  }
  if (message.deletedForRecipient) {
    next(ApiError.badRequest('Message already deleted'));
    return;
  }

  if (message.read) {
    next(ApiError.badRequest('Message already read'));
    return;
  }
  try {
    const updatedMessage = await Message.findByIdAndUpdate(id, {
      read: new Date(Date.now()),
    }).exec();
    await updatedMessage?.save();
    res.sendStatus(StatusCode.OK);
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
