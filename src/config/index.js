require('dotenv').config();

const config = {
    env: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT, 10) || 3000,
    db: {
        url: process.env.DB_URL,
    },
    // Tambahkan konfigurasi lain di sini (JWT, Redis, AWS, dll)
};

module.exports = config;