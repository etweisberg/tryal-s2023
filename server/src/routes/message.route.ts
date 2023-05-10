import express from 'express';
import { isAuthenticated } from '../controllers/auth.middleware';
import {
  getAllMessages,
  sendMessage,
  deleteMessage,
  readMessage,
  getSender,
  getReceiver,
  getMessage,
} from '../controllers/message.controller';

const router = express.Router();
/*
get all messages
*/
router.get('/all', isAuthenticated, getAllMessages);

/*
sends message from sender to recipient
1. does not allow message to be sent to self
2. does not allow non-researcher to message researcher
3. does not allow message to be sent as another user
4. does not allow message to be sent to non-existent user
*/
router.post('/send', isAuthenticated, sendMessage);

/*
deletes message with given id
checks to make sure user is sender or recipient
*/
router.put('/delete', isAuthenticated, deleteMessage);

/*
marks message as read with current timestamp
ensures user is recipient
*/
router.put('/read', isAuthenticated, readMessage);

/*
get messages with given sender id
*/
router.get('/get-sender/:id', isAuthenticated, getSender);

/*
get messages with given recipient id
*/
router.get('/get-receiver/:id', isAuthenticated, getReceiver);

/*
get message with given id
*/
router.get('/:id', isAuthenticated, getMessage);

export default router;
