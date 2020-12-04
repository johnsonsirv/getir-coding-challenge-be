const { logger } = require('../../utils/customLogger');

const asyncHandler = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(ex => {
        logger.error('Internal Server Error', ex);
        next();
    });

module.exports = asyncHandler;
