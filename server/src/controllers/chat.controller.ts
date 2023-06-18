import express from 'express';
import ApiError from '../util/apiError';
import { Chat, IChat } from '../models/chat.model';
import StatusCode from '../util/statusCode';
import { IUser } from '../models/user.model';
import { IMessage, Message } from '../models/message.model';

/*
get all chats that include a given list of users and the current user
only return chats that include all users in the list and the current user
*/

const getChats = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const user: IUser | null = req.user as IUser;
  const { users } = req.body;
  if (!users) {
    next(ApiError.missingFields(['users']));
    return;
  }
  try {
    const usersWithCurrent = [...users, user.id];
    const chats = await Chat.find({ users: { $all: usersWithCurrent } }).exec();
    res.status(StatusCode.OK).send(chats);
  } catch (err) {
    next(ApiError.internal('Unable to get chats'));
  }
};

/*
create a new chat with the current user and a given list of users
*/
const createChat = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const user: IUser | null = req.user as IUser;
  const { users } = req.body;
  if (!users) {
    next(ApiError.missingFields(['users']));
    return;
  }
  try {
    const usersWithCurrent = [...users, user.id];
    const chat = new Chat({ users: usersWithCurrent });
    await chat.save();
    res.sendStatus(StatusCode.CREATED);
  } catch (err) {
    next(ApiError.internal('Unable to create chat'));
  }
};

/*
removes a list of users from a chat as long as the current user is in the chat
*/
const removeUsers = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const user: IUser | null = req.user as IUser;
  const { users, chatId } = req.body;
  if (!users || !chatId) {
    next(ApiError.missingFields(['users', 'chatId']));
    return;
  }
  try {
    const chat: IChat | null = await Chat.findById(chatId).exec();
    if (!chat) {
      next(ApiError.badRequest('Chat does not exist'));
      return;
    }
    if (!chat.users.includes(user.id)) {
      next(ApiError.forbidden('User is not in chat'));
      return;
    }
    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      { $pullAll: { users } },
      { new: true },
    ).exec();
    await updatedChat?.save();
    res.status(StatusCode.OK).send(updatedChat);
  } catch (err) {
    next(ApiError.internal('Unable to remove users from chat'));
  }
};

/*
adds a list of users to a chat as long as the current user is in the chat
*/
const addUsers = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const user: IUser | null = req.user as IUser;
  const { users, chatId } = req.body;
  if (!users || !chatId) {
    next(ApiError.missingFields(['users', 'chatId']));
    return;
  }
  try {
    const chat: IChat | null = await Chat.findById(chatId).exec();
    if (!chat) {
      next(ApiError.badRequest('Chat does not exist'));
      return;
    }
    if (!chat.users.includes(user.id)) {
      next(ApiError.forbidden('User is not in chat'));
      return;
    }
    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      { $addToSet: { arrayField: { $each: users } } },
      { new: true },
    ).exec();
    await updatedChat?.save();
    res.status(StatusCode.OK).send(updatedChat);
  } catch (err) {
    next(ApiError.internal('Unable to add users to chat'));
  }
};

/*
removes an entire chat from the database as long as the current user is in the chat
*/
const deleteChat = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const user: IUser | null = req.user as IUser;
  const { chatId } = req.body;
  if (!chatId) {
    next(ApiError.missingFields(['chatId']));
    return;
  }
  try {
    const chat: IChat | null = await Chat.findById(chatId).exec();
    if (!chat) {
      next(ApiError.badRequest('Chat does not exist'));
      return;
    }
    if (!chat.users.includes(user.id)) {
      next(ApiError.forbidden('User is not in chat'));
      return;
    }
    await Chat.findByIdAndDelete(chatId).exec();
    res.sendStatus(StatusCode.OK);
  } catch (err) {
    next(ApiError.internal('Unable to delete chat'));
  }
};

/*
adds a messages to a chat as long as the sender and recipient are in the chat
*/
const addMessage = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const user: IUser | null = req.user as IUser;
  const { chatId, messageId } = req.body;
  if (!chatId || !messageId) {
    next(ApiError.missingFields(['chatId', 'messageId']));
    return;
  }
  try {
    const chat: IChat | null = await Chat.findById(chatId).exec();
    if (!chat) {
      next(ApiError.badRequest('Chat does not exist'));
      return;
    }
    if (!chat.users.includes(user.id)) {
      next(ApiError.forbidden('User is not in chat'));
      return;
    }
    const message: IMessage | null = await Message.findById(messageId).exec();
    if (!message) {
      next(ApiError.badRequest('Message does not exist'));
      return;
    }
    if (
      !chat.users.includes(message.sender) ||
      !chat.users.includes(message.recipient)
    ) {
      next(ApiError.forbidden('Message not between users in chat'));
      return;
    }
    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      { $addToSet: { messages: messageId } },
      { new: true },
    ).exec();
    await updatedChat?.save();
    res.status(StatusCode.OK).send(updatedChat);
  } catch (err) {
    next(ApiError.internal('Unable to add message to chat'));
  }
};

/*
removes a message from a chat as long as the sender and recipient are in the chat, and the current user is the sender and is in the chat
*/
const removeMessage = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const user: IUser | null = req.user as IUser;
  const { chatId, messageId } = req.body;
  if (!chatId || !messageId) {
    next(ApiError.missingFields(['chatId', 'messageId']));
    return;
  }
  try {
    const chat: IChat | null = await Chat.findById(chatId).exec();
    if (!chat) {
      next(ApiError.badRequest('Chat does not exist'));
      return;
    }
    if (!chat.users.includes(user.id)) {
      next(ApiError.forbidden('User is not in chat'));
      return;
    }
    const message: IMessage | null = await Message.findById(messageId).exec();
    if (!message) {
      next(ApiError.badRequest('Message does not exist'));
      return;
    }
    if (
      !chat.users.includes(message.sender) ||
      !chat.users.includes(message.recipient)
    ) {
      next(ApiError.forbidden('Message not between users in chat'));
      return;
    }
    if (message.sender !== user.id) {
      next(ApiError.forbidden('User is not sender of message'));
      return;
    }
    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      { $pullAll: { messages: [messageId] } },
      { new: true },
    ).exec();
    await updatedChat?.save();
    res.status(StatusCode.OK).send(updatedChat);
  } catch (err) {
    next(ApiError.internal('Unable to remove message from chat'));
  }
};

/*
gets all messages in a chat as long as the current user is in the chat
*/
const getMessages = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const user: IUser | null = req.user as IUser;
  const { chatId } = req.body;
  if (!chatId) {
    next(ApiError.missingFields(['chatId']));
    return;
  }
  try {
    const chat: IChat | null = await Chat.findById(chatId).exec();
    if (!chat) {
      next(ApiError.badRequest('Chat does not exist'));
      return;
    }
    if (!chat.users.includes(user.id)) {
      next(ApiError.forbidden('User is not in chat'));
      return;
    }
    const messages = await Message.find({ _id: { $in: chat.messages } }).exec();
    res.status(StatusCode.OK).send(messages);
  } catch (err) {
    next(ApiError.internal('Unable to get messages from chat'));
  }
};

// eslint-disable-next-line import/prefer-default-export
export {
  getChats,
  createChat,
  removeUsers,
  addUsers,
  deleteChat,
  addMessage,
  removeMessage,
  getMessages,
};
