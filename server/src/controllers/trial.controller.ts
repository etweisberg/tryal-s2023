import express from 'express';
import ApiError from '../util/apiError';
import { ITrial } from '../models/trial.model';
import { IUser } from '../models/user.model';
import {
  createNewTrial,
  getTrialByName,
  addTrialToUser,
  getTrial,
  updateTrialName,
  updateTrialDescription,
  updateTrialDate,
  updateTrialLocation,
  updateTrialConditions,
} from '../services/trial.service';
import StatusCode from '../util/statusCode';

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
    addTrialToUser(user.id, trial.id);
    res.sendStatus(StatusCode.CREATED);
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
  } catch (err) {
    next(ApiError.internal('Unable to update trial'));
  }
};

// eslint-disable-next-line import/prefer-default-export
export { createTrial, updateTrial };
