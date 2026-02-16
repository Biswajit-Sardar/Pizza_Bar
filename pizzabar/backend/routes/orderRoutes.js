const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { protect, restrictTo } = require('../middleware/auth');

// Protected routes
router.use(protect);

router.post('/', orderController.createOrder);
router.get('/', orderController.getMyOrders);
router.get('/:id', orderController.getOrderById);
router.put('/:id/cancel', orderController.cancelOrder);

// Admin routes
router.get('/admin/all', restrictTo('admin'), orderController.getAllOrders);
router.put('/admin/:id/status', restrictTo('admin'), orderController.updateOrderStatus);

module.exports = router;
