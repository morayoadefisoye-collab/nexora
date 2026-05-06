const mongoose = require('mongoose');
const connectDB = require('./db');
const ServiceCategory = require('../models/ServiceCategory');
const User = require('../models/User');
const Wallet = require('../models/Wallet');

// Run with: node backend/utils/seed.js

const seedData = async () => {
  await connectDB();

  // Seed service categories
  await ServiceCategory.deleteMany();
  await ServiceCategory.insertMany([
    {
      type: 'airtime',
      name: 'Airtime',
      networks: ['MTN', 'GLO', 'AIRTEL', '9MOBILE']
    },
    {
      type: 'data',
      name: 'Data Bundles',
      networks: ['MTN', 'GLO', 'AIRTEL'],
      plans: [
        { name: '1GB', price: 300, data: '1GB - 30 days' },
        { name: '2GB', price: 500, data: '2GB - 30 days' }
      ]
    },
    {
      type: 'subscription',
      name: 'Subscriptions',
      networks: ['MTN', 'GLO']
    },
    {
      type: 'social',
      name: 'Social Media Marketing',
      plans: [
        { name: 'Instagram Likes (100)', price: 500 },
        { name: 'Twitter Followers (50)', price: 1000 }
      ]
    }
  ]);

  // Seed admin user (password: admin123)
  const adminExists = await User.findOne({ email: 'admin@nexora.com' });
  if (!adminExists) {
    const admin = await User.create({
      email: 'admin@nexora.com',
      password: 'admin123',
      role: 'admin'
    });
    await Wallet.create({ userId: admin._id });
    console.log('Admin created: admin@nexora.com / admin123');
  }

  console.log('✅ Seeding complete!');
  process.exit(0);
};

seedData().catch(console.error);
