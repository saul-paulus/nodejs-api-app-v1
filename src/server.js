import { setupDIContainer } from './container.js';
import { createApp } from './app.js';
import config from './config/index.js';
import logger from './config/logger.js';
import { connectDB, disconnectDB } from './infrastructure/database/index.js';

const startServer = async () => {
  try {
    // 0. Connect Database
    await connectDB();

    // 1. Setup DI Container
    const container = setupDIContainer();

    // 2. Buat App Express dengan memasukkan container
    const app = createApp(container);

    // 3. Jalankan Server HTTP
    const server = app.listen(config.port, () => {
      logger.info(`Server is running at http://localhost:${config.port} | Mode: ${config.env}`);
    });

    // 4. Graceful Shutdown & Global Error Handlers
    const shutdown = async () => {
      logger.info('Mematikan server (Graceful Shutdown)...');
      server.close(async () => {
        await disconnectDB();
        process.exit(0);
      });

      // Force shutdown if taking too long (10s)
      setTimeout(() => {
        logger.error('Force shutting down after timeout');
        process.exit(1);
      }, 10000);
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);

    process.on('uncaughtException', async (err) => {
      logger.error(`UNCAUGHT EXCEPTION! 💥 Shutting down...\n${err.name}: ${err.message}\n${err.stack}`);
      await disconnectDB();
      process.exit(1);
    });

    process.on('unhandledRejection', async (err) => {
      logger.error(`UNHANDLED REJECTION! 💥 Shutting down...\n${err.name}: ${err.message}\n${err.stack}`);
      server.close(async () => {
        await disconnectDB();
        process.exit(1);
      });
    });
  } catch (err) {
    logger.error(`Tidak dapat menyalakan server: ${err.message}\n${err.stack}`);
    process.exit(1);
  }
};

startServer();
