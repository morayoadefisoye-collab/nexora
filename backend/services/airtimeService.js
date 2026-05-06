// Placeholder for real airtime API (e.g., VTpass, ClubKonnect)
// TODO: Replace with actual API integration

const buyAirtime = async ({ phone, network, amount }) => {
  // Mock success 90% of time
  const success = Math.random() > 0.1;
  const reference = `AIR${Date.now()}`;
  
  if (!success) {
    throw new Error('Airtime purchase failed');
  }
  
  return {
    reference,
    status: 'success',
    message: `₦${amount} airtime sent to ${phone} (${network})`,
    // Real API would return: transactionId, apiResponse
  };
};

module.exports = { buyAirtime };
