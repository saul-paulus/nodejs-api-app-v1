const {
    setupDIContainer
} = require('./container');
const {
    createApp
} = require('./app');
const config = require('./config');

const startServer = async () => {
    try {
        // 1. Setup DI Container
        const container = setupDIContainer();

        // 2. Buat App Express dengan memasukkan container
        const app = createApp(container);

        // 3. Jalankan Server HTTP
        const server = app.listen(config.port, () => {
            console.log(`Server is running at http://localhost:${config.port} | Mode: ${config.env}`);
        });

        // 4. Graceful Shutdown & Global Error Handlers
        process.on('uncaughtException', (err) => {
            console.error('UNCAUGHT EXCEPTION! 💥 Shutting down...', err.name, err.message);
            // Anda mungkin ingin menambah logic log error ke sistem logging eksternal
            process.exit(1);
        });

        process.on('unhandledRejection', (err) => {
            console.error('UNHANDLED REJECTION! 💥 Shutting down...', err.name, err.message);
            server.close(() => {
                process.exit(1);
            });
        });

    } catch (err) {
        console.error(`Tidak dapat menyalakan server: ${err.message}`, err);
        process.exit(1);
    }
};

startServer();