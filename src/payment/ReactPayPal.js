
import React, { useState, useEffect ,props} from "react";
import { API_URL } from "../common/api/constant";
import { SUBSCRIPTION } from "../common/api/constant";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { PAY } from "../common/api/constant";
import {useNavigate} from 'react-router-dom';
import moment from 'moment' ;

export default function ReactPayPal(props) {
  const [paid, setPaid] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [data, setData] = React.useState(null);
  const paypalRef = React.useRef();
  
  const navigate = useNavigate();

  // To show PayPal buttons once the component loads
 
  React.useEffect(() => {
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
                  value: props.amount,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          
            setPaid(true);
      
         
         
        },
        onError: (err) => {
        //   setError(err),
          console.error(err);
        },
      })
      .render(paypalRef.current);
  }, []);

  let current_datetime = new Date()
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  var next = (today.getFullYear()+ 1 );
  
  var start_date =  yyyy  + '/' + mm  + '/' + dd;
  var end_date =  next  + '/' + mm  + '/' + dd;
 
  let isoDate = start_date;
  let lastDate = end_date;

let newDate =  moment.utc(isoDate).format('YY/MM/DD');
let endDate =  moment.utc(lastDate).format('YY/MM/DD');

console.log('newDate',newDate)

console.log('endDate',endDate)

  const type = props.type;
  const subscription_id = props.subscription_id;
  const money = props.amount;
  const credit_point = props.points
  const userid = localStorage.getItem('USER_ID');
  const subs_userid = props.userid
  
  // If the payment has been made
  if (paid) {

    axios.post(`${API_URL}/${SUBSCRIPTION}/`+userid, {
        user_id:userid,
        subscription_id:subscription_id,
        subsription_type:type,
        amount	:money,
        credit_point:credit_point,
        start_date:newDate,
        end_date:endDate,
        status:1
 },
      {
        "headers": {
            "content-type": "application/json",
        },
       
    } 
    )
    navigate('/subscription2');
    return <div>Payment successful.!</div>;
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

