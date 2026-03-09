import winston from 'winston';
import 'winston-daily-rotate-file';

const { combine, timestamp, printf, colorize, align } = winston.format;

// Format log custom
const customFormat = printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`);

// Transport untuk merotasi file log khusus Error
const fileRotateError = new winston.transports.DailyRotateFile({
  filename: 'logs/error-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true, // Zipped untuk hemat ruang
  maxSize: '20m', // Maksimal ukuran file 20 MB sebelum rotasi
  maxFiles: '14d', // Hapus yang umurnya lebih dari 14 Hari
  level: 'error',
});

// Transport untuk merotasi seluruh tipe log (info, error, debug, dll)
const fileRotateCombined = new winston.transports.DailyRotateFile({
  filename: 'logs/combined-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '30d', // Simpan rekam jejak untuk sebulan penuh
});

// Transport untuk logging ke Console (dengan warna-warni mempermudah proses Dev)
const consoleTransport = new winston.transports.Console({
  format: combine(
    colorize({
      all: true,
    }),
    align(),
    customFormat,
  ),
});

const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD hh:mm:ss.SSS A',
    }),
    customFormat,
  ),
  // Default tidak dimatikan pada test
  silent: process.env.NODE_ENV === 'test',
  transports: [fileRotateError, fileRotateCombined],
});

// Jangan tampilkan log console jika di environment 'production' (hanya file)
if (process.env.NODE_ENV !== 'production') {
  logger.add(consoleTransport);
}

export default logger;
