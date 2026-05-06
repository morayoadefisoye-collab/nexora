// API Routes index - mounted in server.js
// All routes prefixed with /api/*

module.exports = {
  auth: require('./auth'),
  wallet: require('./wallet'),
  orders: require('./orders'),
  admin: require('./admin')
};
