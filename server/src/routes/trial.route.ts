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
  clickOnTrial,
  saveTrial,
} from '../controllers/trial.controller';

const router = express.Router();

/*
Trial routes now need to create messages 
Message from researcher to user when user is accepted
Message from user to researcher when they request to join
Message from the researcher to all participants when the trial is updated
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
router.put('/request/:id', isAuthenticated, requestTrial);

/*
adds user with given userId to accepted participants for trial with given trialId if user is not already accepted and is already requested
requesting user must be a researcher on the trial
*/
router.put('/accept', isAuthenticated, isResearcher, acceptUserForTrial);

/*
put for toggling acceptingParticipants
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
router.post('/filter', filterTrials);

/*
get all trials
*/
router.get('/all', getAllTrials);

/*
get trial by ID
*/
router.get('/:id', getTrialById);

/*
click on a trial and update a users clickedOnQueue
*/
router.put('/click/:id', isAuthenticated, clickOnTrial);

/*
save  a trial and update a users saved
*/
router.put('/save/:id', isAuthenticated, saveTrial);

export default router;
