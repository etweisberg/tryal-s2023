import { Trial } from '../models/trial.model';

interface TrialFilter {
  date?: Date;
  location?: string;
  eligibleConditions?: string[];
  acceptingParticipants?: boolean;
}

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

const addUserToRequests = async (userId: string, trialId: string) => {
  const trial = await Trial.findByIdAndUpdate(trialId, {
    $push: { participantRequests: userId },
  }).exec();
  return trial;
};

const addUserToAccepted = async (userId: string, trialId: string) => {
  const trial = await Trial.findByIdAndUpdate(trialId, {
    $push: { participantAccepted: userId },
    $pull: { participantRequests: userId },
  }).exec();
  return trial;
};

const toggleAccept = async (trialId: string) => {
  const trial = await Trial.findById(trialId).exec();
  const accepting = trial?.acceptingParticipants;
  if (accepting) {
    await Trial.findByIdAndUpdate(trialId, {
      $set: { acceptingParticipants: false },
    }).exec();
  } else {
    await Trial.findByIdAndUpdate(trialId, {
      $set: { acceptingParticipants: true },
    }).exec();
  }
  return trial;
};

const getTrials = async (filter: TrialFilter) => {
  const trials = await Trial.find(filter).exec();
  return trials;
};

const getAll = async () => {
  const trials = await Trial.find({}).exec();
  return trials;
};

// eslint-disable-next-line import/prefer-default-export
export {
  createNewTrial,
  getTrial,
  getTrialByName,
  addResearcherToTrial,
  updateTrialName,
  updateTrialDate,
  updateTrialDescription,
  updateTrialLocation,
  updateTrialConditions,
  addUserToRequests,
  addUserToAccepted,
  toggleAccept,
  getTrials,
  getAll,
};
