import React from 'react';

const StripePaymentSuccess = () => {
    return (
      <>
        <h2>Thanks for your order!</h2>
        <h4>Your payment is successful.</h4>
        <p>
          We appreciate your business! If you have any questions, please email
          <a href="mailto:orders@example.com">orders@example.com</a>.
        </p>
        <div>
          <button> Go to Order page</button>
        </div>
      </>
    );
  };
  
  export default StripePaymentSuccess;