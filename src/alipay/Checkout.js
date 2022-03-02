import React, { useState, useEffect } from "react";
import { API_URL } from "../common/api/constant";
import { SECRET } from "../common/api/constant";
import Stripe from 'stripe';
import '../assets/css/style.css';




export default function Checkout() {
  
  
  const [clientname, setClientName]= useState( '' );
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');


  var clientSecret = "";
  var id = "";
  var stripe = Stripe('pk_test_TQDBumSNtYKnQfTgAbfUNrIO');
  console.log(clientname)

  function create_payment(e){
    e.preventDefault()

    const handleSubmit = async (event) => {


      // We don't want to let default form submission happen here,
      // which would refresh the page.
      event.preventDefault();
      
      setLoading(true);
      setErrorMsg('');
  
      const paymentMethodObj = {
        type: 'alipay',
       
        billing_details: {
          clientname
         
        },
      };
      const paymentMethodResult = await stripe.createPaymentMethod(paymentMethodObj);
      // console.log(paymentMethodResult);
      // stripePaymentMethodHandler({
      //   result: paymentMethodResult,
      //   amount: money
      // }, handleResponse);
    };

    const { error: backendError, clientSecrett } = fetch('http://localhost:5000/alipaydocs/create_payment_intent',
    {
      method: "post",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        currency: 'sgd',
        paymentMethodType: 'alipay',
       
        confirm: true,
    
      })
    })
    .then(function (response) {
      return response.json();
    }).then(function (responseJson) {
      console.log(responseJson.client_secret);
      clientSecret = responseJson.client_secret;
      id = responseJson.id;
    })
    console.log(clientname)
    stripe.confirmAlipayPayment(
      
      clientSecret,
      {
        payment_method: {
          billing_details: {
            name: 'Jenny Rosen',
            email: 'jenny@example.com',
          },
        },
      }
    ).then(function(result) {
      if (result.error) {
        console.log(result.error.message);
  } else {
    // Handle next step based on PaymentIntent's status.
    console.log("PaymentIntent ID: " + result.paymentIntent.id);
    console.log("PaymentIntent status: " + result.paymentIntent.status);
  }
    });
  
  
  }


  return (
    <div>
   
    <div className="card card_design">
      <div className="card-body">
      <h3 style={ {'marginLeft':'29%'}} >Alipay Payment</h3>
        <form onSubmit={create_payment}>
          <div className="mb-3 row">
            <label for="inputPassword" className="col-sm-2 col-form-label" >Name</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" name ="clientname"  value={clientname}  style={ {'margin': '10px'}} onChange={e => setClientName(e.target.value)}/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>

    </div>
    </div>
  );
}
