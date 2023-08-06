import express from 'express';
import { isAuthenticated } from '../controllers/auth.middleware';
import {
  getChats,
  createChat,
  removeUsers,
  addUsers,
  deleteChat,
  addMessage,
  removeMessage,
  getMessages,
} from '../controllers/chat.controller';

const router = express.Router();

/*
get all chats that include a given list of users and the current user
only return chats that include all users in the list and the current user
*/
router.post('/filter', isAuthenticated, getChats);

/*
create a new chat with the current user and a given list of users
*/
router.post('/create', isAuthenticated, createChat);

/*
removes a list of users from a chat as long as the current user is in the chat
*/
router.patch('/remove', isAuthenticated, removeUsers);

/*
adds a list of users to a chat as long as the current user is in the chat
*/
router.patch('/add', isAuthenticated, addUsers);

/*
removes an entire chat from the database as long as the current user is in the chat
*/
router.delete('/delete', isAuthenticated, deleteChat);

/*
adds a messages to a chat as long as the sender and recipient are in the chat
*/
router.post('/add-message', isAuthenticated, addMessage);

/*
removes a message from a chat as long as the sender and recipient are in the chat, and the current user is the sender and is in the chat
*/
router.delete('/remove-message', isAuthenticated, removeMessage);

/*
gets all messages in a chat as long as the current user is in the chat
*/
router.get('/get-messages', isAuthenticated, getMessages);

export default router;
