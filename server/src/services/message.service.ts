import { User } from '../models/user.model';
import { Message } from '../models/message.model';

const allMsg = async () => {
  const messages = await Message.find({}).exec();
  return messages;
};

// eslint-disable-next-line import/prefer-default-export
export { allMsg };
