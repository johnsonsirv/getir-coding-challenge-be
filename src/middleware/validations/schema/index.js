const Joi = require('joi');

const validDate = Joi.string()
    .regex(/^(\d{4})-(\d{2})-(\d{2})$/)
    .error(new Error('Invalid Date Format. Expected: YYYY-MM-DD'));

module.exports = Joi.object({
    minCount: Joi.number().required().options({ convert: false }),
    maxCount: Joi.number().required().options({ convert: false }),
    startDate: validDate.required(),
    endDate: validDate.required(),
});
