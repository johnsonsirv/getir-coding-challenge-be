const asyncHandler = require('../middleware/async');
const response = require('../utils/response');
const { getFilteredRecords } = require('../services/records');
/**
 * @description Get lis of records within minCount & maxCount
 * @route GET /api/vi/records
 * @access Public
 */
module.exports.getRecords = asyncHandler(async (req, res) => {
    const records = await getFilteredRecords(req.body);

    return response.sendSuccess(res, 200, records, 'Success');
});
