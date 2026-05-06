const express = require('express');
const { createOrder, getUserOrders } = require('../controllers/orderController');
const { protect } = require('../middleware/auth');
const { body } = require('express-validator');

const router = express.Router();

router.use(protect);

router.post('/', [
  body('serviceType').isIn(['airtime', 'data', 'subscription', 'social']),
  body('amount').isFloat({ min: 50 })
], createOrder);

router.get('/', getUserOrders);

module.exports = router;
