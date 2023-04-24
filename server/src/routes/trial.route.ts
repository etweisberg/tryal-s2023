import express from 'express';

import { isAuthenticated } from '../controllers/auth.middleware';
import { isResearcher } from '../controllers/researcher.middleware';
import { createTrial, updateTrial } from '../controllers/trial.controller';

const router = express.Router();

router.post('/create', isAuthenticated, isResearcher, createTrial);

router.put('/update', isAuthenticated, isResearcher, updateTrial);

export default router;
