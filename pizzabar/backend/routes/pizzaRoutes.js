const express = require('express');
const router = express.Router();
const pizzaController = require('../controllers/pizzaController');
const { protect, restrictTo } = require('../middleware/auth');

// Public routes
router.get('/', pizzaController.getAllPizzas);
router.get('/:id', pizzaController.getPizzaById);

// Protected routes (admin only)
router.post('/', protect, restrictTo('admin'), pizzaController.createPizza);
router.put('/:id', protect, restrictTo('admin'), pizzaController.updatePizza);
router.delete('/:id', protect, restrictTo('admin'), pizzaController.deletePizza);

module.exports = router;
