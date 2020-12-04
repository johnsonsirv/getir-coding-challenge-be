const mongoose = require('mongoose');
const { logger } = require('../utils/customLogger');

module.exports.initializeDatabase = () => {
    logger.info('Opening Database connection');
    return mongoose.connect(process.env.DATABASE_URL, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};

const connectionHandler = mongoose.connection;

connectionHandler.on('error', e => logger.error(`database connection error: ${e.message}`));
connectionHandler.on('close', () => logger.warn('Database shutdown'));
connectionHandler.once('open', () => logger.info('Connected to database'));
