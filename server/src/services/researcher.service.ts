/**
 * All the functions for interacting with user data in the MongoDB database
 */
import { hash } from 'bcrypt';
import { Researcher } from '../models/researcher.model';

const passwordHashSaltRounds = 10;
const removeSensitiveDataQuery = [
  '-password',
  '-verificationToken',
  '-resetPasswordToken',
  '-resetPasswordTokenExpiryDate',
];

const removeSensitiveDataQueryKeepPassword = [
  '-verificationToken',
  '-resetPasswordToken',
  '-resetPasswordTokenExpiryDate',
];

const createResearcher = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  institution: string,
  address: string,
) => {
  const hashedPassword = await hash(password, passwordHashSaltRounds);
  if (!hashedPassword) {
    return null;
  }
  const newResearcher = new Researcher({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    institution,
    address,
  });
  const researcher = await newResearcher.save();
  return researcher;
};

/**
 * Gets a user from the database by their email but doesn't include the
 * password in the returned user.
 * @param email The email of the user to get
 * @returns The {@link User} or null if the user was not found.
 */
const getResearcherByEmail = async (email: string) => {
  const researcher = await Researcher.findOne({ email })
    .select(removeSensitiveDataQuery)
    .exec();
  return researcher;
};

/**
 * Gets a user from the database by their email and includes the password in
 * the returned user.
 * @param email The email of the user to get
 * @returns The {@link User} or null if the user was not found.
 */
const getResearcherByEmailWithPassword = async (email: string) => {
  const researcher = await Researcher.findOne({ email })
    .select(removeSensitiveDataQueryKeepPassword)
    .exec();
  return researcher;
};

/**
 * Gets a user from the database by their verification token but doesn't include
 * the password in the returned user.
 * @param verificationToken The {@link string} representing the verification token
 * @returns The {@link User} or null if the user was not found.
 */
const getResearcherByVerificationToken = async (verificationToken: string) => {
  const researcher = await Researcher.findOne({ verificationToken })
    .select(removeSensitiveDataQuery)
    .exec();
  return researcher;
};

/**
 * Gets a user from the database by their id but doesn't include the
 * password in the returned user.
 * @param id The id of the user to get.
 * @returns The {@link User} or null if the user was not found.
 */
const getResearcherById = async (id: string) => {
  const researcher = await Researcher.findById(id)
    .select(removeSensitiveDataQuery)
    .exec();
  return researcher;
};

/**
 * Gets a user from the database by their reset password token if the token
 * is not expired.
 * @param verificationToken The {@link string} representing the verification token
 * @returns The {@link User} or null if such a user was not found.
 */
const getResearcherByResetPasswordToken = async (
  resetPasswordToken: string,
) => {
  const researcher = await Researcher.findOne({
    resetPasswordToken,
    resetPasswordTokenExpiryDate: { $gt: Date.now() },
  }).exec();
  return researcher;
};

/**
 * @returns All the {@link User}s in the database without their passwords.
 */
const getAllResearchersFromDB = async () => {
  const researcherList = await Researcher.find({})
    .select(removeSensitiveDataQuery)
    .exec();
  return researcherList;
};

/**
 * A function that deletes a user from the database.
 * @param id The id of the user to delete.
 * @returns The deleted {@link User}
 */
const deleteResearcherById = async (id: string) => {
  const researcher = await Researcher.findByIdAndDelete(id).exec();
  return researcher;
};

export {
  passwordHashSaltRounds,
  createResearcher,
  getResearcherByEmail,
  getResearcherByVerificationToken,
  getResearcherById,
  getResearcherByEmailWithPassword,
  getResearcherByResetPasswordToken,
  getAllResearchersFromDB,
  deleteResearcherById,
};
