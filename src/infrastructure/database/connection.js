import { PrismaClient } from '@prisma/client';
import logger from '../../config/logger.js';
import config from '../../config/index.js';

const prismaClient = new PrismaClient({
  log: [
    { emit: 'event', level: 'query' },
    { emit: 'event', level: 'error' },
    { emit: 'event', level: 'info' },
    { emit: 'event', level: 'warn' },
  ],
});

if (config.db.loggingEnabled) {
  prismaClient.$on('query', (e) => {
    logger.debug(`[Prisma Query] duration: ${e.duration}ms - query: ${e.query}`);
  });
}

prismaClient.$on('error', (e) => logger.error(`[Prisma Error] ${e.message}`));
prismaClient.$on('info', (e) => logger.info(`[Prisma Info] ${e.message}`));
prismaClient.$on('warn', (e) => logger.warn(`[Prisma Warn] ${e.message}`));

export const connectDB = async () => {
  try {
    await prismaClient.$connect();
    logger.info('Database connected successfully using Prisma ORM.');
  } catch (error) {
    logger.error(`Database connection failed: ${error.message}`);
    process.exit(1);
  }
};

export const disconnectDB = async () => {
  await prismaClient.$disconnect();
  logger.info('Database connection closed gracefully.');
};

export default prismaClient;
