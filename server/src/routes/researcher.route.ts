import express from 'express';

import {
  registerResearcherRequest,
  verifyResearcherRequest,
  getAllRequests,
} from '../controllers/researcher.controller';

const router = express.Router();

router.get('/all-requests', getAllRequests);

router.post('/researcher-request', registerResearcherRequest);

router.post('/verify-researcher-request', verifyResearcherRequest);

export default router;
