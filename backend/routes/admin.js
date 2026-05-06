const express = require('express');
const { getAllUsers, getAllOrders, updateOrderStatus } = require('../controllers/adminController');
const { protect, admin } = require('../middleware/auth');
const { body } = require('express-validator');

const router = express.Router();

router.use(protect, admin);

router.get('/users', getAllUsers);
router.get('/orders', getAllOrders);

router.patch('/orders/:id/status', [
  body('status').isIn(['pending', 'processing', 'completed', 'failed'])
], updateOrderStatus);

module.exports = router;
