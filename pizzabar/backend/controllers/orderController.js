const Order = require('../models/Order');
const Pizza = require('../models/Pizza');

// Create new order
exports.createOrder = async (req, res, next) => {
    try {
        const { items, deliveryAddress, contactPhone, paymentMethod, notes } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({
                success: false,
                error: 'Order must contain at least one item'
            });
        }

        // Calculate totals
        let subtotal = 0;
        const orderItems = [];

        for (const item of items) {
            const pizza = await Pizza.findById(item.pizzaId);

            if (!pizza || !pizza.available) {
                return res.status(400).json({
                    success: false,
                    error: `Pizza ${item.pizzaId} is not available`
                });
            }

            const price = pizza.prices[item.size];
            const itemTotal = price * item.quantity;
            subtotal += itemTotal;

            orderItems.push({
                pizza: pizza._id,
                name: pizza.name,
                size: item.size,
                quantity: item.quantity,
                price: price
            });
        }

        // Calculate delivery charge
        const minOrderAmount = parseInt(process.env.MIN_ORDER_AMOUNT) || 199;
        const deliveryCharge = subtotal >= minOrderAmount
            ? parseInt(process.env.DELIVERY_CHARGE) || 40
            : 0;

        const total = subtotal + deliveryCharge;

        // Estimated delivery time (35 minutes from now)
        const estimatedDelivery = new Date(Date.now() + 35 * 60 * 1000);

        // Create order
        const order = await Order.create({
            user: req.user.id,
            items: orderItems,
            subtotal,
            deliveryCharge,
            total,
            deliveryAddress,
            contactPhone,
            paymentMethod: paymentMethod || 'cod',
            estimatedDelivery,
            notes
        });

        res.status(201).json({
            success: true,
            data: order
        });
    } catch (error) {
        next(error);
    }
};

// Get user's orders
exports.getMyOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({ user: req.user.id })
            .populate('items.pizza', 'name image')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: orders.length,
            data: orders
        });
    } catch (error) {
        next(error);
    }
};

// Get order by ID
exports.getOrderById = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('items.pizza', 'name image description')
            .populate('user', 'name email');

        if (!order) {
            return res.status(404).json({
                success: false,
                error: 'Order not found'
            });
        }

        // Check if order belongs to user (unless admin)
        if (order.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                error: 'Not authorized to view this order'
            });
        }

        res.json({
            success: true,
            data: order
        });
    } catch (error) {
        next(error);
    }
};

// Cancel order
exports.cancelOrder = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                success: false,
                error: 'Order not found'
            });
        }

        // Check if order belongs to user
        if (order.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                error: 'Not authorized to cancel this order'
            });
        }

        // Check if order can be cancelled
        if (['delivered', 'cancelled'].includes(order.status)) {
            return res.status(400).json({
                success: false,
                error: 'This order cannot be cancelled'
            });
        }

        order.status = 'cancelled';
        await order.save();

        res.json({
            success: true,
            data: order
        });
    } catch (error) {
        next(error);
    }
};

// Get all orders (admin only)
exports.getAllOrders = async (req, res, next) => {
    try {
        const { status, page = 1, limit = 10 } = req.query;

        let query = {};
        if (status) {
            query.status = status;
        }

        const orders = await Order.find(query)
            .populate('user', 'name email phone')
            .populate('items.pizza', 'name')
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const count = await Order.countDocuments(query);

        res.json({
            success: true,
            count: orders.length,
            total: count,
            pages: Math.ceil(count / limit),
            data: orders
        });
    } catch (error) {
        next(error);
    }
};

// Update order status (admin only)
exports.updateOrderStatus = async (req, res, next) => {
    try {
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({
                success: false,
                error: 'Please provide order status'
            });
        }

        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                success: false,
                error: 'Order not found'
            });
        }

        order.status = status;

        if (status === 'delivered') {
            order.deliveredAt = new Date();
            order.paymentStatus = 'paid';
        }

        await order.save();

        res.json({
            success: true,
            data: order
        });
    } catch (error) {
        next(error);
    }
};
