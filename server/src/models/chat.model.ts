import mongoose from 'mongoose';

const ChatSchema = new mongoose.Schema({
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  ],
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message',
      required: true,
    },
  ],
});

interface IChat extends mongoose.Document {
  _id: string;
  users: string[];
  messages: string[];
}

const Chat = mongoose.model<IChat>('Chat', ChatSchema);

export { IChat, Chat };
