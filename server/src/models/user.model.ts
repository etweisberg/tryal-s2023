/**
 * Defines the User model for the database and also the interface to
 * access the model in TypeScript.
 */
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  prefix: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    match:
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/g,
  },
  password: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    required: true,
    default: false,
  },
  verificationToken: {
    type: String,
    required: false,
    unique: true,
    sparse: true,
  },
  resetPasswordToken: {
    type: String,
    required: false,
    unique: true,
    sparse: true,
  },
  resetPasswordTokenExpiryDate: {
    type: Date,
    required: false,
  },
  trials: {
    type: Array<string>(),
    required: true,
    default: [],
  },
  // eslint-disable-next-line spaced-comment
  //add method, any duplicate just move to the front
  clickedOnTrials: {
    type: Array<string>(),
    required: true,
    default: [],
  },
  trialsOwned: {
    type: Array<string>(),
    required: true,
    default: [],
  },
  savedTrials: {
    type: Array<string>(),
    required: true,
    default: [],
  },
  age: {
    type: Number,
    required: true,
    default: null,
  },
  medConditions: {
    type: Array<string>(),
    required: true,
    default: [],
  },
  interests: {
    type: Array<string>(),
    required: true,
    default: [],
  },
  homeAddress: {
    type: String,
    required: true,
    default: '',
  },
  seekingCompensation: {
    type: Boolean,
    required: true,
    default: false,
  },
  admin: {
    type: Boolean,
    required: true,
    default: false,
  },
  researcher: {
    type: Boolean,
    required: true,
    default: false,
  },
  institution: {
    type: String,
    required: false,
    default: '',
  },
});

interface IUser extends mongoose.Document {
  _id: string;
  firstName: string;
  lastName: string;
  prefix: string;
  email: string;
  password: string;
  verified: boolean;
  verificationToken: string | null | undefined;
  resetPasswordToken: string | null | undefined;
  resetPasswordTokenExpiryDate: Date | null | undefined;
  trials: Array<string>;
  trialsOwned: Array<string>;
  clickedOnTrials: Array<string>;
  savedTrials: Array<string>;
  age: number | null;
  medConditions: Array<string>;
  homeAddress: string;
  seekingCompensation: boolean;
  researcher: boolean;
  institution: string;
  admin: boolean;
}

const User = mongoose.model<IUser>('User', UserSchema);

export { IUser, User };
