import { loadStripe } from "@stripe/stripe-js";
import React from "react";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe("pk_test_51IFCZMCgALYZd2y9nucePviKKe8bmpoYVZ9Hui3oEGxHXFBTZoPMQcnEkTg8iYDGxT0lUIaV56a8vVtGhtOK42vJ00ZVSBk1g4");

function StripeCheckoutComponent() {
  const handleClick = async () => {
    // Get Stripe.js instance
    const stripe = await stripePromise;

    // Call your backend to create the Checkout Session
    const response = await fetch(
      "http://localhost:5000/stripetrial/create-checkout-session",
      {
        method: "POST",
      }
    );

    const session = await response.json();

    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
    }
  };

  return (
    <div style={{ margin: "5%" }}>
      <img
        style={{ width: "20%", border: "1px gray solid" }}
        src="assets/img/alipay.png"
      ></img>
      <h4>You have selected T-shirt</h4>
      <h4>Amount: 200 (INR)</h4>
      <p>Once click on pay, you will be redirected to our Payment gateway.</p>
      <button role="link" onClick={handleClick}>
        {" "}
        Click here to Pay
      </button>
    </div>
  );
}

export default StripeCheckoutComponent;