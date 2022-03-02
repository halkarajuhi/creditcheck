import React, { useState,props,useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { useParams } from 'react-router-dom';
import { API_URL } from "../common/api/constant";

import { PAY } from "../common/api/constant";

// import './index.css';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe("pk_test_TQDBumSNtYKnQfTgAbfUNrIO");

const successMessage = () => {
 
  return (
    <div className="success-msg">
      <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-check2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
      </svg>
      <div className="title">Payment Successful</div>
    </div>
  )
}

const cart = () => {
  return (<React.Fragment>
   
  </React.Fragment>)
}

function App() {
  const { id } = useParams();
  console.log(id);
 
  const [subscription, setSubscription] = useState({});

  const [paymentCompleted, setPaymentCompleted] = useState(false);


    useEffect(() => {
    fetch(`${API_URL}/${PAY}`+id)
      .then((res) => res.json())
      .then((data) => {
        setSubscription(data);
      })
  }, []);

console.log(subscription.type);
  return (
    <div className="container">
      

      <div className="row s-box">
        {paymentCompleted ? successMessage() : <React.Fragment>
          <div className="col-md-5 order-md-2 mb-4">
            {cart()}
          </div>
          <div className="col-md-7 order-md-1">
            <Elements stripe={stripePromise}>
              <CheckoutForm  id = {subscription.id}  amount={subscription.payment} type = {subscription.type} setPaymentCompleted={setPaymentCompleted}/>
            </Elements>
          </div>
        </React.Fragment>}
      </div>

    </div>
  );
}

export default App;