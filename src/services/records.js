const Record = require('../models/Record');

/**
 * @description Get a records for specified range
 * @param {date} startDate
 * @param {date} endDate
 * @param {number} maxCount
 * @param {number} minCount
 * @async
 * @return {collection} filtered collection
 */

module.exports.getFilteredRecords = async ({
 startDate, endDate, maxCount, minCount,
}) => Record.aggregate([
        {
            $match: {
                createdAt: { $lte: new Date(endDate), $gte: new Date(startDate) },
            },
        },
        {
            $addFields: {
                totalCount: { $sum: '$counts' },
            },
        },
        {
            $match: {
                totalCount: { $gte: minCount, $lte: maxCount },
            },
        },
        {
            $project: {
                key: 1,
                createdAt: 1,
                totalCount: 1,
            },
        },
    ]);
