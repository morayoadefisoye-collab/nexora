// Placeholder for data bundle API
const buyData = async ({ phone, network, plan, amount }) => {
  const success = Math.random() > 0.08;
  const reference = `DATA${Date.now()}`;
  
  if (!success) {
    throw new Error('Data purchase failed');
  }
  
  return {
    reference,
    status: 'success',
    message: `${plan} data bundle activated on ${phone} (${network})`,
    data: plan
  };
};

module.exports = { buyData };
