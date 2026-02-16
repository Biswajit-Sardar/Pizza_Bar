const mongoose = require('mongoose');

const pizzaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Pizza name is required'],
        trim: true,
        unique: true
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: ['CLASSIC', 'SPECIALTY', 'VEGETARIAN', 'SPICY', 'SEAFOOD']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    ingredients: [{
        type: String,
        required: true
    }],
    prices: {
        small: {
            type: Number,
            required: true,
            min: 0
        },
        medium: {
            type: Number,
            required: true,
            min: 0
        },
        large: {
            type: Number,
            required: true,
            min: 0
        }
    },
    image: {
        type: String,
        default: ''
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    reviewCount: {
        type: Number,
        default: 0,
        min: 0
    },
    popular: {
        type: Boolean,
        default: false
    },
    new: {
        type: Boolean,
        default: false
    },
    available: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Index for faster queries
pizzaSchema.index({ category: 1, popular: -1 });
pizzaSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Pizza', pizzaSchema);
