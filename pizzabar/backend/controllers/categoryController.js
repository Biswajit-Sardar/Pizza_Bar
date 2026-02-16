const Pizza = require('../models/Pizza');

// Get all categories with pizza count
exports.getAllCategories = async (req, res, next) => {
    try {
        const categories = await Pizza.aggregate([
            {
                $group: {
                    _id: '$category',
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    name: '$_id',
                    count: 1,
                    _id: 0
                }
            },
            {
                $sort: { name: 1 }
            }
        ]);

        res.json({
            success: true,
            data: categories
        });
    } catch (error) {
        next(error);
    }
};
