
import React, { useState, useEffect, props } from "react";
import { API_URL } from "../common/api/constant";
import { SUBSCRIPTION } from "../common/api/constant";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ITEM_DETAIL,ORDER } from "../common/api/constant";
import { useNavigate } from 'react-router-dom';
import moment from 'moment' ;
import { useCart } from "react-use-cart";

export default function Order_paypal(props) {
    const [paid, setPaid] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [data, setData] = React.useState(null);
    const paypalRef = React.useRef();
    const { id } = useParams();

    const { cartTotal, totalItems, items } = useCart();
    const [order_response, setOrder_response] = useState('');
  
    let data1 = { cartTotal, totalItems }
  
    const navigate = useNavigate();
    let transaction_status = 0;

    // To show PayPal buttons once the component loads

    useEffect(() => {
        window.paypal
            .Buttons({
                createOrder: (data, actions) => {
                    return actions.order.create({
                        intent: "CAPTURE",
                        purchase_units: [
                            {
                                description: "Your description",
                                amount: {
                                    currency_code: "USD",
                                    value: cartTotal,
                                },
                            },
                        ],
                    });
                },
                onApprove: async (data, actions) => {
                    const order = await actions.order.capture();
                    setPaid(true);
                    console.log(order);
                },
                onError: (err) => {
                    //   setError(err),
                    console.error(err);
                },
            })
            .render(paypalRef.current);
    }, []);

   
  var current_datetime = new Date();
 
const totalamount = props.totalamount;
    
    // If the payment has been made
    if (paid) {
        const userid = localStorage.getItem('USER_ID');
        transaction_status = 1;
       
        axios.post(`${API_URL}/${ORDER}`, {
            user_id: userid,
            total_amount: totalamount,
            transaction_status: transaction_status,
            payment_type: 'paypal',
            order_date: current_datetime
        },
            {
                "headers": {
                    "content-type": "application/json",
                },
            }).then(response => setOrder_response(response.data.insertid))
            .catch(error => {
                console.error('There was an error!', error);
            })
     
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


    // If any error occurs
    if (error) {
        return <div>Error Occurred in processing payment.! Please try again.</div>;
    }


    return (
        <div>

            <div ref={paypalRef} />
        </div>
    );
}

