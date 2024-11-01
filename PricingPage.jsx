import React from 'react';
import { useNavigate } from 'react-router-dom';

function PricingPage() {
  const navigate = useNavigate();

  const handlePlanSelect = (plan) => {
    if (plan === 'premium') {
      navigate('/payment');
    } else {
      alert('You selected the free plan. Enjoy your basic access!');
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Our Subscription Plans</h2>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginTop: '20px' }}>
        
        {/* Free Plan */}
        <div style={{ border: '1px solid #ccc', padding: '20px', width: '200px', borderRadius: '8px' }}>
          <h3>Free Plan</h3>
          <p>Access limited features for free.</p>
          <button onClick={() => handlePlanSelect('free')}>Choose Free Plan</button>
        </div>
        
        {/* Premium Plan */}
        <div style={{ border: '1px solid #ccc', padding: '20px', width: '200px', borderRadius: '8px' }}>
          <h3>Premium Plan</h3>
          <p>Enjoy full access, customizations, and support.</p>
          <button onClick={() => handlePlanSelect('premium')}>Choose Premium Plan</button>
        </div>

      </div>
    </div>
  );
}

export default PricingPage;
