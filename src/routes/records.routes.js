const { Router } = require('express');
const { validateRequestBody } = require('../middleware/validations/bodyValidations');
const { getRecords } = require('../controllers/records.controller');

const router = new Router();

router.post('/', validateRequestBody, getRecords);

module.exports = router;
