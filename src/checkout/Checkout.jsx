import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../common/header/Navbar'
import Sidebar from '../common/header/Sidebar'
import '../assets/css/main.css';
import stri from '../assets/img/icon/stri.png';
import pay from '../assets/img/icon/pay.png';
import chat from '../assets/img/icon/chat..png';
import ali from '../assets/img/icon/ali.png';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { API_URL } from "../common/api/constant";
import { SUBSCRIPTION_TYPE, SUBSCRIPTION, UPDATE_SUBSCRIPTION } from "../common/api/constant";
import ReactPayPal from "../payment/ReactPayPal";
import Appstripe from '../stripe/App';

import { loadStripe } from "@stripe/stripe-js";


export default function Checkout() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [subs_id, setSubs_id] = useState('');
  const userid = useParams();

  const stripePromise = loadStripe("pk_test_TQDBumSNtYKnQfTgAbfUNrIO");

  useEffect(() => {
    fetch(`${API_URL}/${SUBSCRIPTION_TYPE}/` + userid.id)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })

      .catch((err) => {
        console.log(err);
      });
  }, []);
  const subscription_id = data.id;
  localStorage.setItem("subs_id", subscription_id);
  const [checkout, setCheckout] = useState(false);

  const [stripecheckout, setStripecheckout] = useState(false);

  const handleClick = async () => {


    // Get Stripe.js instance
    const stripe = await stripePromise;

    // Call your backend to create the Checkout Session

    const response = await fetch("http://localhost:5000/stripetrial/create-checkout-session",
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }
    );
    const session = await response.json();
    if (session) {
      submitdata();
    }
    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,

    })
    if (result.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
    }
  }

  const handleClick1 = async () => {
    // Get Stripe.js instance
    const stripe1 = await stripePromise;

    const response1 = await fetch("http://localhost:5000/alipaytrial/create-checkout-alipay",
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }

    );
    const session1 = await response1.json();
    if (session1) {
      submitdata();
    }
    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe1.redirectToCheckout({
      sessionId: session1.id,

    })
    if (result.error) {
    }
  }

  const handleClick2 = async () => {
    // Get Stripe.js instance
    const stripe2 = await stripePromise;

    const response2 = await fetch("http://localhost:5000/wechatpay/create-checkout-wechatpay",
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }

    );
    const session2 = await response2.json();
    if (session2) {
      submitdata();
    }
    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe2.redirectToCheckout({
      sessionId: session2.id,

    })
    if (result.error) {
    }
  }


  function submitdata() {
    const userid = localStorage.getItem('USER_ID');

    let current_datetime = new Date();

    let start_date = current_datetime.getFullYear() + "-" + current_datetime.getMonth() + 1 + "-" + current_datetime.getDate()
    let end_date = (current_datetime.getFullYear() + 1) + "-" + current_datetime.getMonth() + 1 + "-" + current_datetime.getDate()

    axios.post(`${API_URL}/${SUBSCRIPTION}/` + userid, {
      user_id: userid,
      subscription_id: data.id,
      subsription_type: data.type,
      amount: data.payment,
      start_date: start_date,
      end_date: end_date,
      status: 1
    },
      {
        "headers": {
          "content-type": "application/json",
        },
      }).then(response => setSubs_id(response.data.id))
      .catch(error => {

        console.error('There was an error!', error);
      })
  }


  return (

    <div className="sb-nav-fixed">

      <Navbar />
      <div id="layoutSidenav">

        <Sidebar />

        <div id="layoutSidenav_content">
          <div className="pt-4 ">
            <main>

              <div className="row px-4">
                <div className="col-md-7">
                  <h2>Subscription Types</h2>  <h5>{data.type}</h5>

                  <h2>Subscription Amount</h2>  <h5>{data.payment} USD</h5>

                </div>

                <div className="col-md-5" >
                  <div className="ano_pay">


                    <div className="d-flex justify-content-between pay_img_1">


                      <img src={stri} alt="" srcset="" className="pt-3" onClick={handleClick} />
                      {/* <Link  to={{ pathname: `/reactPayPal/${data.id}`}}><img src={pay} alt="" srcset="" className="pt-3"/></Link> */}
                      {(checkout === true) ? <div className="payment-div"> <ReactPayPal amount={data.payment} type={data.type} subscription_id={data.id} points={data.credit_point}/> </div> : <div>
                        <div className="col-md-3 row_logo_img">

                          <a href="#"><img src={pay} alt="" srcset="" className="logo_paypal" onClick={() => { setCheckout(true) }} /></a>
                        </div>
                      </div>
                      }

                    </div>
                    <div className="d-flex justify-content-between pay_img_2">
                      <img src={ali} alt="alipay" srcset="" className="pt-4" onClick={handleClick1} />

                      <div className="col-md-3 row_logo_img">
                       

                        <a href="#"><img src={chat} alt="" srcset="" style={{ marginTop: '45px' }} onClick={handleClick2} /></a>
                      </div>
                    </div>
                  </div>

                </div>
              </div>


            </main>
          </div>
        </div>


      </div>
    </div>

  )
}
