/**
 * Defines the Researcher model for the database and also the interface to
 * access the model in TypeScript.
 * has a many-to-many relationship with the Trial model
 * has a first name, last name, email, password, verified, verification token, reset password token, reset password token expiry date, trials, institution, and address.
 */

import mongoose from 'mongoose';

const ResearcherSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
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
  institution: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

interface IResearcher extends mongoose.Document {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  verified: boolean;
  verificationToken: string;
  resetPasswordToken: string;
  resetPasswordTokenExpiryDate: Date;
  trials: string[];
  institution: string;
  address: string;
}

const Researcher = mongoose.model<IResearcher>('Researcher', ResearcherSchema);

export { IResearcher, Researcher };
