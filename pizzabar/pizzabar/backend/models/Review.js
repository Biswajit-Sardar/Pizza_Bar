const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    pizza: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pizza',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: true,
        maxlength: 500
    },
    helpful: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// Ensure user can only review once per pizza
reviewSchema.index({ pizza: 1, user: 1 }, { unique: true });

// Update pizza rating after review is saved
reviewSchema.post('save', async function() {
    const Review = this.constructor;
    const stats = await Review.aggregate([
        {
            $match: { pizza: this.pizza }
        },
        {
            $group: {
                _id: '$pizza',
                avgRating: { $avg: '$rating' },
                count: { $sum: 1 }
            }
        }
    ]);

    if (stats.length > 0) {
        const Pizza = mongoose.model('Pizza');
        await Pizza.findByIdAndUpdate(this.pizza, {
            rating: Math.round(stats[0].avgRating * 10) / 10,
            reviewCount: stats[0].count
        });
    }
});

module.exports = mongoose.model('Review', reviewSchema);
