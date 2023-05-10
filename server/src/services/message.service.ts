import { Message } from '../models/message.model';

const allMsg = async () => {
  const messages = await Message.find({}).exec();
  return messages;
};

const createMsg = async (
  sender: string,
  recipient: string,
  content: string,
  timestamp: Date,
) => {
  const newMsg = new Message({
    sender,
    recipient,
    content,
    timestamp,
  });
  const msg = await newMsg.save();
  return msg;
};

// eslint-disable-next-line import/prefer-default-export
export { allMsg, createMsg };
