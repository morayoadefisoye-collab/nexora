const Wallet = require('../models/Wallet');
const Transaction = require('../models/Transaction');
const { fundWallet: paymentFundWallet } = require('../services/paymentService');
const { generateToken } = require('../utils/jwt');

const getBalance = async (req, res) => {
  const wallet = await Wallet.findOne({ userId: req.user.id });
  res.json({ balance: wallet?.balance || 0 });
};

const fundWallet = async (req, res) => {
  const { amount, reference } = req.body;
  
  if (amount < 100) {
    return res.status(400).json({ message: 'Minimum ₦100' });
  }

  const result = await paymentFundWallet({ amount, reference });
  
  // Update wallet
  let wallet = await Wallet.findOne({ userId: req.user.id });
  if (!wallet) {
    wallet = await Wallet.create({ userId: req.user.id });
  }
  wallet.balance += amount;
  await wallet.save();

  // Create transaction
  await Transaction.create({
    userId: req.user.id,
    walletId: wallet._id,
    type: 'fund',
    amount,
    reference,
    description: 'Wallet funding'
  });

  res.json({ 
    success: true, 
    message: 'Wallet funded successfully',
    balance: wallet.balance 
  });
};

const getHistory = async (req, res) => {
  const transactions = await Transaction.find({ userId: req.user.id })
    .sort({ createdAt: -1 })
    .limit(50)
    .populate('walletId');
  res.json(transactions);
};

module.exports = { getBalance, fundWallet, getHistory };
