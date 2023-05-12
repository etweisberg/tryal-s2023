import express from 'express';

import registerResearcherRequest from '../controllers/researcher.controller';

import { isAuthenticated } from '../controllers/auth.middleware';

const router = express.Router();

router.post('/researcher-request', isAuthenticated, registerResearcherRequest);

export default router;
