import { PrismaClient } from '@prisma/client';
import logger from '../../config/logger.js';

const prismaClient = new PrismaClient();

export const connectDB = async () => {
  try {
    await prismaClient.$connect();
    logger.info('Database connected successfully using Prisma ORM.');
  } catch (error) {
    logger.error('Database connection failed:', error);
    process.exit(1);
  }
};

export const disconnectDB = async () => {
  await prismaClient.$disconnect();
};

export default prismaClient;
