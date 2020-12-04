const { createLogger, format, transports } = require('winston');

const outputDir = process.env.LOGS_DIR || 'logs';

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.json(),
        format.splat(),
        format.errors({ stack: true }),
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    ),
    transports: [
        new transports.File({ filename: `${outputDir}/error`, level: 'error' }),
        new transports.File({ filename: `${outputDir}/warn`, level: 'warn' }),
        new transports.File({ filename: `${outputDir}/info` }),
    ],
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(
        new transports.Console({
            format: format.simple(),
        }),
    );
}

module.exports = { logger };
