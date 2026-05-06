const mongoose = require('mongoose');

const serviceCategorySchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['airtime', 'data', 'subscription', 'social'],
    required: true,
    unique: true
  },
  name: String,
  networks: [String], // e.g., ['MTN', 'Airtel']
  plans: [{
    name: String,
    price: Number,
    data: String // e.g., '1GB'
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('ServiceCategory', serviceCategorySchema);
