import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
  read: {
    type: Date,
    required: false,
  },
  deleted: {
    type: Boolean,
    required: true,
    default: false,
  },
});

interface IMessage extends mongoose.Document {
  _id: string;
  sender: string;
  recipient: string;
  content: string;
  timestamp: Date;
  read: Date | null;
  deleted: boolean;
}

const Message = mongoose.model<IMessage>('Message', MessageSchema);

export { IMessage, Message };
