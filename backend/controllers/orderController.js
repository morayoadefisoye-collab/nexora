const Order = require('../models/Order');
const Transaction = require('../models/Transaction');
const Wallet = require('../models/Wallet');
const { buyAirtime } = require('../services/airtimeService');
const { buyData } = require('../services/dataService');
const { paySubscription } = require('../services/subscriptionService');
const { createSocialOrder } = require('../services/socialService');

const createOrder = async (req, res) => {
  const { serviceType, phoneNumber, network, amount, dataPlan, socialPlatform, quantity } = req.body;
  const wallet = await Wallet.findOne({ userId: req.user.id });

  if (!wallet || wallet.balance < amount) {
    return res.status(400).json({ message: 'Insufficient balance' });
  }

  let serviceResult;
  const reference = `${serviceType.toUpperCase()}${Date.now()}`;

  // Call service placeholder
  try {
    switch (serviceType) {
      case 'airtime':
        serviceResult = await buyAirtime({ phone: phoneNumber, network, amount });
        break;
      case 'data':
        serviceResult = await buyData({ phone: phoneNumber, network, dataPlan, amount });
        break;
      case 'subscription':
        serviceResult = await paySubscription({ phone: phoneNumber, network, amount });
        break;
      case 'social':
        serviceResult = await createSocialOrder({ platform: socialPlatform, quantity, amount });
        break;
      default:
        return res.status(400).json({ message: 'Invalid service type' });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }

  // Deduct wallet
  wallet.balance -= amount;
  await wallet.save();

  // Create order & transaction
  const order = await Order.create({
    userId: req.user.id,
    serviceType,
    amount,
    phoneNumber,
    network,
    dataPlan,
    socialPlatform,
    quantity,
    status: 'completed',
    reference
  });

  await Transaction.create({
    userId: req.user.id,
    walletId: wallet._id,
    type: serviceType,
    amount: -amount, // debit
    reference,
    description: `${serviceType} purchase`
  });

  res.json({
    success: true,
    order,
    balance: wallet.balance,
    message: serviceResult.message
  });
};

const getUserOrders = async (req, res) => {
  const orders = await Order.find({ userId: req.user.id })
    .populate('walletTransactionId')
    .sort({ createdAt: -1 });
  res.json(orders);
};

module.exports = { createOrder, getUserOrders };
