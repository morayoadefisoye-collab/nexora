// Placeholder for subscription payments
const paySubscription = async ({ phone, network, amount, duration }) => {
  const success = Math.random() > 0.1;
  const reference = `SUBS${Date.now()}`;
  
  if (!success) {
    throw new Error('Subscription payment failed');
  }
  
  return {
    reference,
    status: 'success',
    message: `${duration} subscription activated on ${phone}`,
    duration
  };
};

module.exports = { paySubscription };
