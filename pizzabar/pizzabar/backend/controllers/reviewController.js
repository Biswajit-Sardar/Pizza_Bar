const Review = require('../models/Review');
const Order = require('../models/Order');

// Get reviews for a pizza
exports.getReviews = async (req, res, next) => {
    try {
        const { pizzaId } = req.query;

        if (!pizzaId) {
            return res.status(400).json({
                success: false,
                error: 'Please provide pizzaId'
            });
        }

        const reviews = await Review.find({ pizza: pizzaId })
            .populate('user', 'name')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: reviews.length,
            data: reviews
        });
    } catch (error) {
        next(error);
    }
};

// Create review
exports.createReview = async (req, res, next) => {
    try {
        const { pizzaId, orderId, rating, comment } = req.body;

        if (!pizzaId || !rating || !comment) {
            return res.status(400).json({
                success: false,
                error: 'Please provide pizzaId, rating, and comment'
            });
        }

        // Check if user has ordered this pizza
        if (orderId) {
            const order = await Order.findOne({
                _id: orderId,
                user: req.user.id,
                'items.pizza': pizzaId
            });

            if (!order) {
                return res.status(400).json({
                    success: false,
                    error: 'You can only review pizzas you have ordered'
                });
            }
        }

        // Create review
        const review = await Review.create({
            pizza: pizzaId,
            user: req.user.id,
            order: orderId,
            rating,
            comment
        });

        const populatedReview = await Review.findById(review._id)
            .populate('user', 'name');

        res.status(201).json({
            success: true,
            data: populatedReview
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                error: 'You have already reviewed this pizza'
            });
        }
        next(error);
    }
};

// Delete review
exports.deleteReview = async (req, res, next) => {
    try {
        const review = await Review.findById(req.params.id);

        if (!review) {
            return res.status(404).json({
                success: false,
                error: 'Review not found'
            });
        }

        // Check if review belongs to user
        if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                error: 'Not authorized to delete this review'
            });
        }

        await review.deleteOne();

        res.json({
            success: true,
            message: 'Review deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};
