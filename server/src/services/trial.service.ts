import { Trial } from '../models/trial.model';
import { User } from '../models/user.model';

const createNewTrial = async (
  name: string,
  description: string,
  date: Date,
  location: string,
  eligibleConditions: string[],
  researcher: string,
) => {
  const researchers = [researcher];
  const newTrial = new Trial({
    name,
    researchers,
    description,
    date,
    location,
    eligibleConditions,
  });
  const trial = await newTrial.save();
  return trial;
};

const getTrial = async (trialId: string) => {
  const trial = await Trial.findById(trialId).exec();
  return trial;
};

const getTrialByName = async (name: string) => {
  const trial = await Trial.findOne({ name }).exec();
  return trial;
};

const addTrialToUser = async (userId: string, trialId: string) => {
  const user = await User.findByIdAndUpdate(userId, {
    $push: { trials: trialId },
  }).exec();
  return user;
};

const addResearcherToTrial = async (trialId: string, researcherId: string) => {
  const trial = await Trial.findByIdAndUpdate(trialId, {
    $push: { researchers: researcherId },
  }).exec();
  return trial;
};

const updateTrialName = async (trialId: string, name: string) => {
  const trial = await Trial.findByIdAndUpdate(trialId, {
    $set: { name },
  }).exec();
  return trial;
};

const updateTrialDate = async (trialId: string, date: Date) => {
  const trial = await Trial.findByIdAndUpdate(trialId, {
    $set: { date },
  }).exec();
  return trial;
};

const updateTrialDescription = async (trialId: string, description: string) => {
  const trial = await Trial.findByIdAndUpdate(trialId, {
    $set: { description },
  }).exec();
  return trial;
};

const updateTrialLocation = async (trialId: string, location: string) => {
  const trial = await Trial.findByIdAndUpdate(trialId, {
    $set: { location },
  }).exec();
  return trial;
};

const updateTrialConditions = async (trialId: string, conditions: string[]) => {
  const trial = await Trial.findByIdAndUpdate(trialId, {
    $set: { eligibleConditions: conditions },
  }).exec();
  return trial;
};

// eslint-disable-next-line import/prefer-default-export
export {
  createNewTrial,
  getTrial,
  getTrialByName,
  addTrialToUser,
  addResearcherToTrial,
  updateTrialName,
  updateTrialDate,
  updateTrialDescription,
  updateTrialLocation,
  updateTrialConditions,
};
