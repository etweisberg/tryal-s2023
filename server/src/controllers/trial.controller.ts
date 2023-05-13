import express from 'express';
import ApiError from '../util/apiError';
import { ITrial } from '../models/trial.model';
import { IUser } from '../models/user.model';
import {
  createNewTrial,
  getTrialByName,
  getTrial,
  updateTrialName,
  updateTrialDescription,
  updateTrialDate,
  updateTrialLocation,
  updateTrialConditions,
  addUserToRequests,
  addUserToAccepted,
  toggleAccept,
  getTrials,
  getAll,
} from '../services/trial.service';
import StatusCode from '../util/statusCode';
import {
  addTrialClickToUser,
  addTrialOwnershipToUser,
  addTrialSaveToUser,
  addTrialToUser,
} from '../services/user.service';

interface TrialFilter {
  date?: Date;
  location?: string;
  eligibleConditions?: string[];
  acceptingParticipants?: boolean;
}

const createTrial = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const user: IUser | null = req.user as IUser;
  const { name, description, date, location, eligibleConditions } = req.body;
  if (!name || !description || !date || !location || !eligibleConditions) {
    next(
      ApiError.missingFields([
        'name',
        'description',
        'date',
        'location',
        'eligibleConditions',
      ]),
    );
    return;
  }
  const existingTrial: ITrial | null = await getTrialByName(name);
  if (existingTrial) {
    next(ApiError.badRequest(`A trial with name ${name} already exists.`));
    return;
  }
  try {
    const trial = await createNewTrial(
      name,
      description,
      date,
      location,
      eligibleConditions,
      user.id,
    );
    await trial?.save();
    addTrialOwnershipToUser(user.id, trial.id);
    res.status(StatusCode.CREATED).send(trial);
  } catch (err) {
    next(ApiError.internal('Unable to create trial'));
  }
};

const updateTrial = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const user: IUser | null = req.user as IUser;
  const { name, description, date, location, eligibleConditions, trialId } =
    req.body;
  const trial = await getTrial(trialId);
  if (!trial) {
    next(ApiError.badRequest('Trial does not exist'));
    return;
  }
  if (!trial.researchers.includes(user.id)) {
    next(ApiError.forbidden('You are not a researcher on this trial'));
    return;
  }
  try {
    if (name) {
      await updateTrialName(trialId, name);
    }
    if (description) {
      await updateTrialDescription(trialId, description);
    }
    if (date) {
      await updateTrialDate(trialId, date);
    }
    if (location) {
      await updateTrialLocation(trialId, location);
    }
    if (eligibleConditions) {
      await updateTrialConditions(trialId, eligibleConditions);
    }
    res.sendStatus(StatusCode.OK);
  } catch (err) {
    next(ApiError.internal('Unable to update trial'));
  }
};

const requestTrial = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const user: IUser | null = req.user as IUser;
  const { id } = req.params;
  const trial = await getTrial(id);
  if (!trial) {
    next(ApiError.badRequest('Trial does not exist'));
    return;
  }
  if (trial.participantRequests.includes(user.id)) {
    next(ApiError.badRequest('You have already requested to join this trial'));
    return;
  }
  if (trial.participantAccepted.includes(user.id)) {
    next(ApiError.badRequest('You are already a participant in this trial'));
    return;
  }
  try {
    await addUserToRequests(user.id, id);
    res.sendStatus(StatusCode.OK);
  } catch (err) {
    next(ApiError.internal('Unable to request trial'));
  }
};

const acceptUserForTrial = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const user: IUser | null = req.user as IUser;
  const { trialId, participantId } = req.body;
  const trial = await getTrial(trialId);
  if (!trial) {
    next(ApiError.badRequest('Trial does not exist'));
    return;
  }
  if (!trial.researchers.includes(user.id)) {
    next(ApiError.forbidden('You are not a researcher on this trial'));
    return;
  }
  if (!trial.participantRequests.includes(participantId)) {
    next(ApiError.badRequest('User has not requested to join this trial'));
    return;
  }
  if (
    trial.participantAccepted.includes(participantId) ||
    user.trials.includes(trialId)
  ) {
    next(ApiError.badRequest('User is already a participant in this trial'));
    return;
  }
  try {
    await addUserToAccepted(participantId, trialId);
    await addTrialToUser(participantId, trialId);
    res.sendStatus(StatusCode.OK);
  } catch (err) {
    next(ApiError.internal('Unable to accept user for trial'));
  }
};

const toggleAcceptUserForTrial = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const user: IUser | null = req.user as IUser;
  const { trialId } = req.body;
  const trial = await getTrial(trialId);
  if (!trial) {
    next(ApiError.badRequest('Trial does not exist'));
    return;
  }
  if (!trial.researchers.includes(user.id)) {
    next(ApiError.forbidden('You are not a researcher on this trial'));
    return;
  }
  try {
    await toggleAccept(trialId);
    res.sendStatus(StatusCode.OK);
  } catch (err) {
    next(ApiError.internal('Unable to toggle accept user for trial'));
  }
};

const filterTrials = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const filters: TrialFilter = req.body;
  try {
    const trials = await getTrials(filters);
    res.status(StatusCode.OK).send(trials);
  } catch (err) {
    next(ApiError.internal('Unable to filter trials'));
  }
};

const getAllTrials = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  try {
    const trials = await getAll();
    res.status(StatusCode.OK).send(trials);
  } catch (err) {
    next(ApiError.internal('Unable to get trials'));
  }
};

const getTrialById = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { trialId } = req.params;
  try {
    const trial = await getTrial(trialId);
    res.status(StatusCode.OK).send(trial);
  } catch (err) {
    next(ApiError.internal('Unable to get trial'));
  }
};

const clickOnTrial = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { id } = req.params;
  const user: IUser | null = req.user as IUser;
  try {
    const trial = await getTrial(id);
    if (!trial) {
      next(ApiError.badRequest('Trial does not exist'));
      return;
    }
    if (!user) {
      next(ApiError.badRequest('User does not exist'));
      return;
    }
    await addTrialClickToUser(user.id, id);
    res.sendStatus(StatusCode.OK);
  } catch (err) {
    console.log(err);
    next(ApiError.internal('Unable to click on trial'));
  }
};

const saveTrial = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { id } = req.params;
  const user: IUser | null = req.user as IUser;
  try {
    const trial = await getTrial(id);
    if (!trial) {
      next(ApiError.badRequest('Trial does not exist'));
      return;
    }
    if (!user) {
      next(ApiError.badRequest('User does not exist'));
      return;
    }
    await addTrialSaveToUser(user.id, id);
    res.sendStatus(StatusCode.OK);
  } catch (err) {
    next(ApiError.internal('Unable to save trial'));
  }
};

// eslint-disable-next-line import/prefer-default-export
export {
  createTrial,
  updateTrial,
  requestTrial,
  acceptUserForTrial,
  toggleAcceptUserForTrial,
  filterTrials,
  getAllTrials,
  getTrialById,
  clickOnTrial,
  saveTrial,
};
