import express from 'express';
import { isAuthenticated } from '../controllers/auth.middleware';
import { getAllMessages } from '../controllers/message.controller';

const router = express.Router();

router.get('/all', isAuthenticated, getAllMessages);

export default router;
