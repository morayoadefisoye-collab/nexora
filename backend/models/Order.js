const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  serviceType: {
    type: String,
    enum: ['airtime', 'data', 'subscription', 'social'],
    required: true
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ServiceCategory'
  },
  amount: {
    type: Number,
    required: true
  },
  phoneNumber: String,
  dataPlan: String,
  network: String,
  socialPlatform: String,
  quantity: Number,
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed'],
    default: 'pending'
  },
  reference: {
    type: String,
    unique: true
  },
  walletTransactionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Transaction'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
