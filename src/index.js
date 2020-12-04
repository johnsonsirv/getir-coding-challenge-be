const dotenv = require('dotenv');
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoose = require('mongoose');
const compression = require('compression');
const swaggerUi = require('swagger-ui-express');
const { initializeDatabase } = require('./database');
const recordRouter = require('./routes/records.routes');
const swaggerJSONDocument = require('../swagger_spec.json');
const { logger } = require('./utils/customLogger');

const env = dotenv.config();

const app = express();

if (process.env.NODE_ENV === 'development') {
    if (env.error) {
        throw env.error;
    }
    app.use(morgan('tiny'));
}

if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
    app.use(compression());
}

app.use(cors());
app.set('trust proxy', true);
app.use(express.json());

app.use('/api/v1/records', recordRouter);
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerJSONDocument));
app.use('*', (req, res) => res.status(404).json({ message: 'Route not found' }));

let server;
initializeDatabase()
    .then(() => {
        const port = process.env.PORT || 5000;
        server = app.listen(port, () => {
            logger.info(`[info] Listening on ${port}`);
        });
    })
    .catch(error => logger.error(error.message));

process.on('uncaughtException', ex => {
    logger.error(`Unhandled Exception ${ex}`);
});

process.on('unhandledRejection', ex => {
    throw ex;
});

process.on('SIGINT', () => {
    mongoose.connection.close();
    server.close();
    process.exit(0);
});
