const sendSuccess = (res, statusCode, records, msg) => res.status(statusCode).json({
    code: 0,
    records,
    msg,
  });

const sendError = (res, statusCode, msg, error) => res.status(statusCode).json({
    code: 1,
    msg,
    error,
  });

module.exports = {
  sendSuccess,
  sendError,
};
