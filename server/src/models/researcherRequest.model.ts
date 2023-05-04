/**
 * Defines the Invite model for the database and also the interface to
 * access the model in TypeScript.
 */
import mongoose from 'mongoose';

const ResearcherRequestSchema = new mongoose.Schema({
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
  approved: {
    type: Boolean,
    default: false,
    required: true,
  },
  institution: {
    type: String,
    required: true,
  },
});

interface IResearcherRequest extends mongoose.Document {
  _id: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  verified: boolean;
  approved: boolean;
  verificationToken: string | null | undefined;
  institution: string;
}

const ResearcherRequest = mongoose.model<IResearcherRequest>(
  'ResearcherRequest',
  ResearcherRequestSchema,
);

export { IResearcherRequest, ResearcherRequest };
