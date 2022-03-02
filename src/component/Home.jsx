import React, { useState, useEffect,useRef } from "react";
import Header from "../common/header/Header";
import Forgotpass from "../password/Forgotpass";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import img1 from '../assets/img/paypal.png';
import img2 from '../assets/img/stripe.png';
import img3 from "../assets/img/alipay.png";
import img4 from '../assets/img/chat.png';
import { API_URL } from "../common/api/constant";
import { EMAILSEND } from "../common/api/constant";
import { LOGIN } from "../common/api/constant";
import { GUESTLOGIN } from "../common/api/constant";
import { loginnew } from '../common/Route/index';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useNavigate } from 'react-router-dom';
import ReferenceSet from "yup/lib/util/ReferenceSet";
toast.configure()

export default function Home() {

  const btnRef = useRef();
  const [emailverify, setEmailverify] = useState({
    email: "",
    otp: "",
    password: ""
  });
  
  const { email, otp, password } = emailverify;
  const onInputChangevalue = e => {
    setEmailverify({ ...emailverify, [e.target.name]: e.target.value });

  };
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email is required')
      .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, "Enter a valid e-mail address")

  });
  const formOptions = { resolver: yupResolver(validationSchema), mode: 'all', reValidateMode: 'all' };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(false);
  const [userDetail, setUserDetail] = useState({
    user_type: "3"
  });
  const { user_type } = userDetail;

  const onInputChange = e => {
    setUserDetail({ ...userDetail, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();

  function emailSubmit(event) {
    if(btnRef.current){
      btnRef.current.setAttribute("disabled", "disabled");
    }
    fetch(`${API_URL}/${EMAILSEND}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(emailverify)
    }).then(res => res.json())
      .then(data => {
        console.log("response: ", data);
        if(data.error == false){
          toast.success(data.error_msg, {
            position: toast.POSITION.TOP_CENTER
          });
         
       
      }else{
        toast.error(data.error_msg, {
          position: toast.POSITION.TOP_CENTER
        });
        if(btnRef.current){
          btnRef.current.removeAttribute("disabled");
        }
      }
      })
      .catch(err => {
        console.log("error:", err);
        toast.error("Something went wrong!", {
          position: toast.POSITION.TOP_CENTER
        });
      });
     
       
      
  }

  const validationSchema_newpass = Yup.object().shape({
    otp: Yup.string()
      .required('OTP is required'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
  });

  const formOptions_value = { resolver: yupResolver(validationSchema_newpass), mode: 'all', reValidateMode: "all" };
  const {
    register: register2,
    formState: { errors: errors2 },
    handleSubmit: handleSubmit2,
  } = useForm(formOptions_value);

  async function login(e) {

    return fetch(`${API_URL}/${LOGIN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(emailverify)
    })
      .then(res => res.json())
      .then(data => {
        setData(data)
        setLoading(true);
        toast.success(data.msg, {
          position: toast.POSITION.TOP_CENTER
        });
        if (data.token && data.error_msg == '') {
          console.log(data.token);
          loginnew(data.token,
            data.user_id,
            data.email,
            data.mobile_no,
            data.firstname,
            data.lastname
          );
          navigate('/');
          window.location.reload();
        }
        else {
          toast.error(data.error_msg, {
            position: toast.POSITION.TOP_CENTER
          });
          setLoading(false);
        }
      });

  }

  async function Guestlogin(e) {
    e.preventDefault();

    return fetch(`${API_URL}/${GUESTLOGIN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userDetail)
    })
    .then(res => res.json())
    .then(data => {
      setData(data)
      setLoading(true);
     localStorage.setItem("USER_ID",data.response)
        navigate('/');
        window.location.reload();
      });
     
  }
 
  return (
    <div>
      <Header />
      <section className="container">

        <div className="row">
          <div className="col-md-6">
            <section id="hero" className="d-flex align-items-center">
              <div className="">
                <h1> Credit Portal <br /> Business </h1>
                <p className="pt-3">Predicting likelihood of late or delayed payments to help make better business decision</p>
              </div>
            </section>
          </div>

          <div className="col-md-6">
            <div id="login-page" className="login_page pt-5">

              <div className="form">
                <div className="app-title pb-2">
                  <p>Login</p>
                </div>

                <form className="login_form" onSubmit={handleSubmit(emailSubmit)}>
                  <p className="email_para ">Enter your Email</p>
                  <input type="text" placeholder="Email" name="email"  value={email}{...register('email')} onChange={e => onInputChangevalue(e)} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                  <div className="invalid-feedback">{errors.email?.message}</div>
                  <button className="send_otp"  ref={btnRef} type="submit">Send OTP</button>
                </form>
               
                  <input type="text" placeholder="Enter 6 Digit Code" name="otp" value={otp}{...register2('otp')} onChange={e => onInputChangevalue(e)} className={`form-control ${errors2.otp ? 'is-invalid' : ''}`} />
                  <div className="invalid-feedback">{errors2.otp?.message}</div>
                  <input type="password" placeholder="Enter password" name="password" value={password}{...register2('password')} onChange={e => onInputChangevalue(e)} className={`form-control enter_pass ${errors2.password ? 'is-invalid' : ''}`} />
                  <div className="invalid-feedback">{errors2.password?.message}</div>
                  <p className="para pr-5"><Link className="text-decoration-none forget_pass" to="/Forgotpasslink">Forget password</Link></p>
                  <button className="login_btn" type="submit" onClick={handleSubmit2(login)}>Login</button>

                  <Link className=" btn register_email" to="/registration">Register with email</Link>
            
                <form onSubmit={Guestlogin}>
                  <input type="hidden" name="user_type" value="3" onChange={e => onInputChange(e)} />
                  <button className="guest_login" type="submit" style={{width:"100%"}}>Guest Login</button>
                </form>
              </div>
            </div>
          </div>
        </div>

      </section>


      <section className="container">
        <div className="row">
          <div className="col-md-3 column_1">
            <div className="inner_txt_card1">
              <p className="para_title">SINGAPORE SEARCHES</p>
              <p className="para_mid_txt">The Experian Non-Bank Bureau is an essential tool for decision-makers to participate in a repayment repository that will give you greater insight into the payment patterns of vendors, clients and partners</p>
            </div>
          </div>
          <div className="col-md-4 column_2">
            <div className="inner_card">
              <div className="inner_1">
                <p className="para_title">SME CREDIT RATINGS</p>
                <p className="para_mid_txt">Are you looking to capture a more targeted market segment? Do you want the ability to customise your marketing leads database and execute your marketing campaign to maximise returns on investment?</p>
              </div>
              <div className="inner_2 mt-4">
                <p className="para_title">EXPERIAN NON-BANK BUREAU</p>
                <p className="para_mid_txt">Access more than 10,000 credit ratings of Singapore SMEs through this portal.
                  This nationwide SME credit ratings help connect SMEs with banks, financiers and business partners.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 ">
            <div className="inner_txt_card2">
              <p className="para_title">EXPERIAN BANK BUREAU</p>
              <p className="para_mid_txt p_txt">Do you want to identify and track high credit risk customers? Are you updated immediately of any potential business failures and credit deteriorations of your business partners and customers?</p>
            </div>
          </div>
        </div>


        <div className="row row_sec">

          <div className="col-md-3 row_col_1">
            <div className="inner_sec_card inner_sec_txtcard">
              <p>INTERNATIONAL SEARCHES</p>
              <p>:: Corporate Credit Checks<br />
                :: Individual Credit Checks<br />
                :: Litigation Checks<br />
                :: Property Checks<br />
                :: Financial Reports</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="inner_sec_card inner_sec_card_bt">
              <p>ONTARGET MARKETING SOLUTION</p>
              <p>:: Reports from over 72 countries<br />
                :: UK Online Company Searches<br />
                :: Australia Online Company Searches<br />
                :: India Online Company Searches<br />
                :: Malaysia Online Company Searches</p>
            </div>
          </div>
          <div className="col-md-4 row_col_2">
            <div className="inner_sec_card inner_sec_txtcard1">
              <p>NEED ASSISTANCE?</p>
              <p>CANNOT FIND WHAT YOU ARE LOOKING FOR?<br /><br />
                Click Here to write about your request.Our Relationship Executive will contact you as soon as possible</p>
            </div>
          </div>

        </div>
      </section>


      <section className="">
        <div className="container">
          <div className="row logo_img_row">
            <div className="col-md-3 row_logo_img">
              <div className="col-md-3 row_logo_img">
                <div className="logo_img text-center">
                  <img src={img1} className="logo_paypal" />
                </div>

              </div>

            </div>
            <div className="col-md-3">
              <div className="logo_img text-center">
                <img src={img2} className="logo_stripe" />
              </div>
            </div>
            <div className="col-md-3">
              <div className="logo_img text-center">
                <img src={img3} className="logo_chat" />
              </div>
            </div>
            <div className="col-md-3">
              <div className="logo_img text-center">
                <img src={img4} className="logo_alipay" />
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
