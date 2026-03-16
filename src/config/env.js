import dotenv from 'dotenv';

dotenv.config();

export default {
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || 'development',
  dbUrl: process.env.DB_URL,
};
