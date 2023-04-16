import { ResearcherRequest } from '../models/researcherRequest.model';

const createResearcherRequest = async (
  firstName: string,
  lastName: string,
  email: string,
  institution: string,
) => {
  const newResearcherRequest = new ResearcherRequest({
    firstName,
    lastName,
    email,
    institution,
  });
  const researcherRequest = await newResearcherRequest.save();
  return researcherRequest;
};

const getAllResearcherRequests = async () => {
  const researcherRequests = await ResearcherRequest.find({}).exec();
  return researcherRequests;
};

const getResearcherRequest = async (email: string) => {
  const researcherRequest = await ResearcherRequest.findOne({ email }).exec();
  return researcherRequest;
};

const approveRequest = async (id: string) => {
  const researcherRequest = await ResearcherRequest.findByIdAndUpdate(id, [
    { $set: { approved: { $eq: [false, '$approved'] } } },
  ]).exec();
  return researcherRequest;
};

export {
  createResearcherRequest,
  getAllResearcherRequests,
  getResearcherRequest,
  approveRequest,
};
