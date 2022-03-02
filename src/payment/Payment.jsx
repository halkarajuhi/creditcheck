import React, { useState } from 'react'
import Navbar from '../common/header/Navbar'
import Sidebar from '../common/header/Sidebar'
import '../assets/css/main.css';
import cardimg from '../assets/img/payment-1.png';
import Visa from '../assets/img/icon/Visa.png';
import payment1 from '../assets/img/payment-1.png';
import group from '../assets/img/icon/Group.png';
import am from '../assets/img/icon/am.png';
import stri from '../assets/img/icon/stri.png';
import discover from '../assets/img/icon/Discover.png';
import pay from '../assets/img/icon/pay.png';
import chat from '../assets/img/icon/chat..png';
import ali from '../assets/img/icon/ali.png';
import { useCart } from "react-use-cart";
import { loadStripe } from "@stripe/stripe-js";
import { API_URL, ORDER, ITEM_DETAIL } from "../common/api/constant";
import axios from 'axios';
import Order_paypal from './Order_paypal';

export default function Payment() {

    const stripePromise = loadStripe("pk_test_TQDBumSNtYKnQfTgAbfUNrIO");

    const { cartTotal, totalItems, items } = useCart();
    const [order_response, setOrder_response] = useState('');
    const [checkout, setCheckout] = useState(false);

    let data = { cartTotal, totalItems }

    let transaction_status = 0;

    const handleClick = async () => {
        // Get Stripe.js instance
        const stripe = await stripePromise;

        // Call your backend to create the Checkout Session

        const response = await fetch("http://localhost:5000/stripetrial/create-checkout-session-data",
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }
        );
        const session = await response.json();
        transaction_status = 1;
        if (session) {
            submitdata();
            order_detail();
        }
        // When the customer clicks on the button, redirect them to Checkout.
        const result = await stripe.redirectToCheckout({
            sessionId: session.id,

        })
        if (result.error) {
            //     // If `redirectToCheckout` fails due to a browser or network
            //     // error, display the localized error message to your customer
            //     // using `result.error.message`.
        }
    }
    function submitdata() {
        const userid = localStorage.getItem('USER_ID');

        let current_datetime = new Date();

        axios.post(`${API_URL}/${ORDER}`, {
            user_id: userid,
            total_amount: cartTotal,
            transaction_status: transaction_status,
            payment_type: 'stripe',
            current_datetime: current_datetime
        },
            {
                "headers": {
                    "content-type": "application/json",
                },
            }).then(response => setOrder_response(response.data.insertid))
            .catch(error => {
                console.error('There was an error!', error);
            })
    }
    function order_detail() {
        let current_datetime = new Date();
        const orderid = { order_response, items, current_datetime }
        axios.post(`${API_URL}/${ITEM_DETAIL}`, orderid, {
            "headers": {
                "content-type": "application/json",
            },
        }).then(response => setOrder_response(response.data))
            .catch(error => {
                console.error('There was an error!', error);
            })
    }


    const handleClick1 = async () => {
        // Get Stripe.js instance
        const stripe1 = await stripePromise;

        const response1 = await fetch("http://localhost:5000/alipaytrial/create-checkout-alipay-data",
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

        const response2 = await fetch("http://localhost:5000/wechatpay/create-checkout-wechatpay-data",
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
                                    <section >
                                        <div id="payment_sec" className="payment_sec">
                                            <div className="form">


                                                <div className="row ">
                                                    <div className="col-8">


                                                        <div id="carouselExampleControls" className="carousel slide" data-interval="false">
                                                            {/* <div className="carousel-inner">
                                                                    <div className="carousel-item active">
                                                                        <img src={payment1} className="d-block w-100" alt="..." />
                                                                    </div>
                                                                    <div className="carousel-item">
                                                                        <img src={payment1} className="d-block w-100" alt="..." />
                                                                    </div>
                                                                    <div className="carousel-item">
                                                                        <img src={payment1} className="d-block w-100" alt="..." />
                                                                    </div>
                                                                </div> */}
                                                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                                                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                                                <span className="visually-hidden">Previous</span>
                                                            </button>
                                                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                                                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                                                <span className="visually-hidden">Next</span>
                                                            </button>
                                                        </div>

                                                    </div>

                                                    <div className="col-4 vertical_line">

                                                        <div className="current">
                                                            <p className="current_amount mb-0 ">$ {cartTotal} </p>
                                                            {/* <p className="current_status">Current balance</p> */}
                                                            <p className="current_status">Total balance</p>
                                                        </div>

                                                        <div className="current">
                                                            <p className="current_income mb-0">$ 1500.50</p>
                                                            <p className="current_status">Income</p>
                                                        </div>

                                                        <div className="current">
                                                            <p className="current_outcome mb-0">$ 350.60</p>
                                                            <p className="current_status">Outcome</p>
                                                        </div>

                                                    </div>
                                                </div>

                                                <div className="row ">
                                                    <div className="col-8 mt-2">
                                                        <div className="progress" style={{ height: '10px' }}>
                                                            <div className="progress-bar" style={{ width: '25%', height: '10px' }}></div>
                                                        </div>
                                                        <div className="d-flex justify-content-between weekly_pay_limi">
                                                            <p className="weekly_pay mb-1">Weekly payment limit</p>
                                                            <p className="weekly_amou mb-1">$350.60 / $4000</p>
                                                        </div>
                                                    </div>

                                                    <div className="col-4 card_progreson">
                                                        <div className="form-check form-switch d-flex justify-content-end">
                                                            <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                                                        </div>
                                                        <div>
                                                            <p className="deactivate_card mb-1">Deacivate card</p>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </section>

                                    <div className="row mt-4">
                                        <div className="col-12">

                                            <section >
                                                <div className="card_detail">
                                                    <div className="row">
                                                        <div className="col-3 d card_credit_box">
                                                            <i className="bi bi-credit-card-fill i_c__n"></i>
                                                            <p className="cred_it_text mb-0">Card</p>
                                                        </div>
                                                        <div className="col-3 d card_credit_box">
                                                            <i className="bi bi-credit-card-fill"></i>
                                                            <p className="cred_it_text mb-0">EPS</p>
                                                        </div>
                                                        <div className="col-3 d card_credit_box">
                                                            <i className="bi bi-credit-card-fill"></i>
                                                            <p className="cred_it_text mb-0">Giropay</p>
                                                        </div>
                                                        <div className="col-1 d card_credit_box">
                                                            <p className="cred_it_text mb-0">...</p>
                                                        </div>

                                                        <form>
                                                            <fieldset >
                                                                <div className="card_number">
                                                                    <label for="TextInput" className="form-label">Card number</label>
                                                                    <a href="#"><img src={Visa} alt="" srcset="" className="visa_img" /></a>
                                                                    <a href="#"><img src={group} alt="" srcset="" className="group_img" /></a>
                                                                    <a href="#"><img src={am} alt="" srcset="" className="am_img" /></a>
                                                                    <a href="#"><img src={discover} alt="" srcset="" className="discover_img" /></a>
                                                                    <input type="text" id="TextInput" className="form-control card_number_img" placeholder="1234 1234 1234 1234" />
                                                                </div>

                                                                <div className="row">
                                                                    <div className="col-6">
                                                                        <div className="card_number">
                                                                            <label for="TextInput" className="form-label">Expiry</label>
                                                                            <input type="text" id="TextInput" className="form-control" placeholder="MM / YY" />
                                                                        </div>
                                                                    </div>

                                                                    <div className="col-6">
                                                                        <div className="cvc">
                                                                            <label for="TextInput" className="form-label">CVC</label>
                                                                            <input type="text" id="TextInput" className="form-control" placeholder="CVC" />
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="row mb-3">
                                                                    <div className="col-6">
                                                                        <div className="card_number">
                                                                            <label for="Select" className="form-label">Country</label>
                                                                            <select id="Select" className="form-select">
                                                                                <option>United States</option>
                                                                                <option>India</option>
                                                                            </select>
                                                                        </div>
                                                                    </div>

                                                                    <div className="col-6">
                                                                        <div className="card_number">
                                                                            <label for="TextInput" className="form-label">Postal code</label>
                                                                            <input type="text" id="TextInput" className="form-control" placeholder="90210" />
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <button type="submit" className="btn btn-primary pay_btn">Pay</button>
                                                            </fieldset>
                                                        </form>

                                                    </div>
                                                </div>
                                            </section>
                                        </div>
                                    </div>

                                </div>

                                <div className="col-md-5" >
                                    <div className="ano_pay">
                                        <p className="ano_pay_p">Select another payment method</p>
                                        <div className="d-flex justify-content-between pay_img_1">
                                            <a href="#"><img src={stri} alt="" srcset="" className="pt-3" onClick={handleClick} /></a>

                                            {(checkout === true) ? <div className="payment-div"> <Order_paypal totalamount={cartTotal} /> </div> : <div>
                                                <div className="col-md-3 row_logo_img">

                                                    <a href="#"><img src={pay} alt="" srcset="" className="logo_paypal" onClick={() => { setCheckout(true) }} /></a>
                                                </div>
                                            </div>
                                            }
                                        </div>
                                        <div className="d-flex justify-content-between pay_img_2">
                                            <a href="#"><img src={chat} alt="" srcset="" className="pt-4" onClick={handleClick2} /></a>
                                            <a href="#"><img src={ali} alt="" srcset="" onClick={handleClick1} /></a>
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
