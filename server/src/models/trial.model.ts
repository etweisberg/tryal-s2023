/**
 * Defines the Trial model for the database and also the interface to
 * access the model in TypeScript.
 * has a many-to-many relationship with the researcher model
 * has a many-to-many relationship with the user model
 * has a name, description, researchers, participants, accepting, date, location, elgible conditions
 */

import mongoose from 'mongoose';

const TrialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  researchers: {
    type: Array<string>(),
    required: true,
    default: [],
  },
  participants: {
    type: Array<string>(),
    required: true,
    default: [],
  },
  acceptingParticipants: {
    type: Boolean,
    required: true,
    default: true,
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  eligibleConditions: {
    type: Array<string>(),
    required: true,
    default: [],
  },
});

interface ITrial extends mongoose.Document {
  _id: string;
  name: string;
  description: string;
  researchers: string[];
  participants: string[];
  acceptingParticipants: boolean;
  date: Date;
  location: string;
  eligibleConditions: string[];
}

const Trial = mongoose.model<ITrial>('Trial', TrialSchema);

export { Trial, ITrial };
