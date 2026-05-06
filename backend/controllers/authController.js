const User = require('../models/User');
const Wallet = require('../models/Wallet');
const { generateToken } = require('../utils/jwt');
const { validationResult } = require('express-validator');

const register = async (req, res) => {
  console.log('📝 REGISTER attempt:', req.body.email);
  
  // Check validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('❌ REGISTER validation errors:', errors.array());
    return res.status(400).json({ message: 'Validation failed', errors: errors.array() });
  }

  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('❌ REGISTER: User exists', email);
      return res.status(400).json({ message: 'User already exists' });
    }

    console.log('✅ Creating user:', email);
    const user = await User.create({ email, password });
    
    // Create wallet
    console.log('💰 Creating wallet for user:', user._id);
    const wallet = await Wallet.create({ userId: user._id });
    user.walletId = wallet._id;
    await user.save();

    const token = generateToken(user._id);
    console.log('✅ REGISTER success for:', email);

    res.status(201).json({
      success: true,
      token,
      user: { id: user._id, email: user.email, role: user.role }
    });
  } catch (error) {
    console.error('💥 REGISTER error:', error);
    res.status(500).json({ message: 'Server error during registration', error: error.message });
  }
};

const login = async (req, res) => {
  console.log('🔐 LOGIN attempt:', req.body.email);
  
  // Check validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('❌ LOGIN validation errors:', errors.array());
    return res.status(400).json({ message: 'Validation failed', errors: errors.array() });
  }

  try {
    const { email, password } = req.body;

    console.log('🔍 Finding user:', email);
    const user = await User.findOne({ email }).populate('walletId');
    if (!user || !(await user.comparePassword(password))) {
      console.log('❌ LOGIN: Invalid credentials for', email);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user._id);
    console.log('✅ LOGIN success for:', email);

    res.json({
      success: true,
      token,
      user: { 
        id: user._id, 
        email: user.email, 
        role: user.role,
        wallet: user.walletId 
      }
    });
  } catch (error) {
    console.error('💥 LOGIN error:', error);
    res.status(500).json({ message: 'Server error during login', error: error.message });
  }
};

const getMe = async (req, res) => {
  console.log('👤 GETME for user:', req.user.id);
  try {
    const user = await User.findById(req.user.id).populate('walletId');
    res.json({ user });
  } catch (error) {
    console.error('💥 GETME error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { register, login, getMe };
