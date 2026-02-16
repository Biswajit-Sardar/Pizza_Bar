const Pizza = require('../models/Pizza');

// Get all pizzas with optional filtering
exports.getAllPizzas = async (req, res, next) => {
    try {
        const { category, popular, search, limit, sort } = req.query;

        let query = { available: true };

        if (category) {
            query.category = category.toUpperCase();
        }

        if (popular === 'true') {
            query.popular = true;
        }

        if (search) {
            query.$text = { $search: search };
        }

        let pizzaQuery = Pizza.find(query);

        // Sorting
        if (sort) {
            const sortOptions = {
                'price-low': { 'prices.small': 1 },
                'price-high': { 'prices.small': -1 },
                'rating': { rating: -1 },
                'popular': { reviewCount: -1 }
            };
            pizzaQuery = pizzaQuery.sort(sortOptions[sort] || { createdAt: -1 });
        } else {
            pizzaQuery = pizzaQuery.sort({ createdAt: -1 });
        }

        // Limit
        if (limit) {
            pizzaQuery = pizzaQuery.limit(parseInt(limit));
        }

        const pizzas = await pizzaQuery;

        res.json({
            success: true,
            count: pizzas.length,
            data: pizzas
        });
    } catch (error) {
        next(error);
    }
};

// Get pizza by ID
exports.getPizzaById = async (req, res, next) => {
    try {
        const pizza = await Pizza.findById(req.params.id);

        if (!pizza) {
            return res.status(404).json({
                success: false,
                error: 'Pizza not found'
            });
        }

        res.json({
            success: true,
            data: pizza
        });
    } catch (error) {
        next(error);
    }
};

// Create new pizza (admin only)
exports.createPizza = async (req, res, next) => {
    try {
        const pizza = await Pizza.create(req.body);

        res.status(201).json({
            success: true,
            data: pizza
        });
    } catch (error) {
        next(error);
    }
};

// Update pizza (admin only)
exports.updatePizza = async (req, res, next) => {
    try {
        const pizza = await Pizza.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!pizza) {
            return res.status(404).json({
                success: false,
                error: 'Pizza not found'
            });
        }

        res.json({
            success: true,
            data: pizza
        });
    } catch (error) {
        next(error);
    }
};

// Delete pizza (admin only)
exports.deletePizza = async (req, res, next) => {
    try {
        const pizza = await Pizza.findByIdAndDelete(req.params.id);

        if (!pizza) {
            return res.status(404).json({
                success: false,
                error: 'Pizza not found'
            });
        }

        res.json({
            success: true,
            message: 'Pizza deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};
