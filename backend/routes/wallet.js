const express = require('express');
const { getBalance, fundWallet, getHistory } = require('../controllers/walletController');
const { protect } = require('../middleware/auth');
const { body } = require('express-validator');

const router = express.Router();

router.use(protect);

router.get('/balance', getBalance);
router.get('/history', getHistory);

router.post('/fund', [
  body('amount').isFloat({ min: 100 }),
  body('reference').notEmpty()
], fundWallet);

module.exports = router;
