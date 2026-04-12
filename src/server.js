import { setupDIContainer } from './container.js';
import { createApp } from './app.js';
import config from './config/env.js';
import logger from './config/logger.js';
import { connectDB, disconnectDB } from './infrastructure/database/prisma.js';

const startServer = async () => {
  try {
    await connectDB();
    const container = await setupDIContainer();
    const app = createApp(container);
    const server = app.listen(config.port, () => {
      logger.info(`Server is running at http://localhost:${config.port} | Mode: ${config.env}`);
    });

    const shutdown = async () => {
      logger.info('Mematikan server (Graceful Shutdown)...');
      server.close(async () => {
        await disconnectDB();
        process.exit(0);
      });
      setTimeout(() => process.exit(1), 10000);
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);
  } catch (err) {
    logger.error(`Tidak dapat menyalakan server: ${err.message}`);
    process.exit(1);
  }
};

startServer();
