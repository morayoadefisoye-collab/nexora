// Placeholder for social media marketing services
const createSocialOrder = async ({ platform, quantity, amount }) => {
  const success = Math.random() > 0.15;
  const reference = `SOCIAL${Date.now()}`;
  
  if (!success) {
    throw new Error('Social service order failed');
  }
  
  return {
    reference,
    status: 'processing',
    message: `${quantity} ${platform} marketing services ordered`,
    platform,
    quantity
  };
};

module.exports = { createSocialOrder };
