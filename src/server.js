import { setupDIContainer } from './container.js';
import { createApp } from './app.js';
import config from './config/index.js';
import logger from './config/logger.js';

const startServer = async () => {
  try {
    // 1. Setup DI Container
    const container = setupDIContainer();

    // 2. Buat App Express dengan memasukkan container
    const app = createApp(container);

    // 3. Jalankan Server HTTP
    const server = app.listen(config.port, () => {
      logger.info(`Server is running at http://localhost:${config.port} | Mode: ${config.env}`);
    });

    // 4. Graceful Shutdown & Global Error Handlers
    process.on('uncaughtException', (err) => {
      logger.error(
        `UNCAUGHT EXCEPTION! 💥 Shutting down...\n${err.name}: ${err.message}\n${err.stack}`,
      );
      process.exit(1);
    });

    process.on('unhandledRejection', (err) => {
      logger.error(
        `UNHANDLED REJECTION! 💥 Shutting down...\n${err.name}: ${err.message}\n${err.stack}`,
      );
      server.close(() => {
        process.exit(1);
      });
    });
  } catch (err) {
    logger.error(`Tidak dapat menyalakan server: ${err.message}\n${err.stack}`);
    process.exit(1);
  }
};

startServer();
