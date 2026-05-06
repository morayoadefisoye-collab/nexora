const User = require('../models/User');
const Order = require('../models/Order');
const Wallet = require('../models/Wallet');

const getAllUsers = async (req, res) => {
  const users = await User.find({}).populate('walletId').select('-password');
  res.json(users);
};

const getAllOrders = async (req, res) => {
  const orders = await Order.find({})
    .populate('userId walletTransactionId')
    .sort({ createdAt: -1 });
  res.json(orders);
};

const updateOrderStatus = async (req, res) => {
  const { orderId, status } = req.body;
  
  const order = await Order.findById(orderId).populate('userId');
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  order.status = status;
  await order.save();

  // If refund needed, update wallet (simple logic)
  if (status === 'failed' && order.walletTransactionId) {
    const wallet = await Wallet.findById(order.userId.walletId);
    if (wallet) {
      wallet.balance += order.amount;
      await wallet.save();
    }
  }

  res.json({ success: true, order });
};

module.exports = { getAllUsers, getAllOrders, updateOrderStatus };
