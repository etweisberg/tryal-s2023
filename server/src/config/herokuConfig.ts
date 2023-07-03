import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 4000;

// eslint-disable-next-line import/prefer-default-export
export const config = {
  server: {
    port: PORT,
  },
};
