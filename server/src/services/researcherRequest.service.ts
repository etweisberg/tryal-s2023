import { hash } from 'bcrypt';
import { ResearcherRequest } from '../models/researcherRequest.model';

const passwordHashSaltRounds = 10;
const removeSensitiveDataQuery = [
  '-password',
  '-verificationToken',
  '-resetPasswordToken',
  '-resetPasswordTokenExpiryDate',
];

const createResearcherRequest = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  institution: string,
  address: string,
) => {
  const hashedPassword = await hash(password, passwordHashSaltRounds);
  const newResearcherRequest = new ResearcherRequest({
    firstName,
    lastName,
    password: hashedPassword,
    email,
    institution,
    address,
  });
  const researcherRequest = await newResearcherRequest.save();
  return researcherRequest;
};

const getAllResearcherRequests = async () => {
  const researcherRequests = await ResearcherRequest.find({})
    .select(removeSensitiveDataQuery)
    .exec();
  console.log(researcherRequests);
  return researcherRequests;
};

const getResearcherRequest = async (email: string) => {
  const researcherRequest = await ResearcherRequest.findOne({ email })
    .select(removeSensitiveDataQuery)
    .exec();
  return researcherRequest;
};

const getResearcherRequestByVerificationToken = async (
  verificationToken: string,
) => {
  const researcherRequest = await ResearcherRequest.findOne({
    verificationToken,
  })
    .select(removeSensitiveDataQuery)
    .exec();
  return researcherRequest;
};

export {
  createResearcherRequest,
  getAllResearcherRequests,
  getResearcherRequest,
  getResearcherRequestByVerificationToken,
};
