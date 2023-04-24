import express from 'express';

import { isAuthenticated } from '../controllers/auth.middleware';
import { isResearcher } from '../controllers/researcher.middleware';
import {
  createTrial,
  updateTrial,
  requestTrial,
  acceptUserForTrial,
  filterTrials,
  toggleAcceptUserForTrial,
  getAllTrials,
  getTrialById,
} from '../controllers/trial.controller';

const router = express.Router();

/*
creates new trial with the given parameters
*/
router.post('/create', isAuthenticated, isResearcher, createTrial);

/*
updates trial with any parameters given
*/
router.put('/update', isAuthenticated, isResearcher, updateTrial);

/*
adds requesting user to requested participants for trial with given trialId if user is not already requested or not already accepted
*/
router.put('/request', isAuthenticated, requestTrial);

/*
adds user with given userId to accepted participants for trial with given trialId if user is not already accepted and is already requested
requesting user must be a researcher on the trial
*/
router.put('/accept', isAuthenticated, isResearcher, acceptUserForTrial);

/*
put for togglign acceptingParticipants
*/
router.put(
  '/accepting',
  isAuthenticated,
  isResearcher,
  toggleAcceptUserForTrial,
);

/*
getter for filtering trials by a filter object
*/
router.get('/filter', isAuthenticated, filterTrials);

/*
get all trials
*/
router.get('/all', isAuthenticated, getAllTrials);

/*
get  rial by ID
*/
router.get('/all', isAuthenticated, getTrialById);
export default router;
