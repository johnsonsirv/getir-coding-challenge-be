const response = require('../../utils/response');
const schema = require('./schema');

module.exports.validateRequestBody = (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return response.sendError(res, 400, 'Failure', `${error.message}`);
  }

  return next();
};
