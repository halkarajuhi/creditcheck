import React, { useState, useEffect ,useRef} from "react";
import Header from "../common/header/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';
import { API_URL } from "../common/api/constant";
import { FORGETPASSWORD } from "../common/api/constant";
import { EMAILSEND } from "../common/api/constant";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReCAPTCHA from 'react-google-recaptcha';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from "react-router-dom";
var crypto = require("crypto");


export default function Forgotpass() {
  const [detail, setDetail] = useState({
    email: "",
    otp: "",
    password: "",
    confirmpass: "",
    humankey: "",
    uniquekey:""
  });
  const { email, otp, password, confirmpass ,uniquekey} = detail;

  const onInputChange = e => {
    setDetail({ ...detail, [e.target.name]: e.target.value });
  };
  const btnRef = useRef();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email is required')
      .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, "Enter a valid e-mail address")

  });
  const formOptions = { resolver: yupResolver(validationSchema), mode: 'all', reValidateMode: 'all' };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  function onChange(humankey) {
    console.log(humankey);
    setDetail({ ...detail, ['humankey']: humankey });
  }

  function emailSubmit(event) {
    if(btnRef.current){
      btnRef.current.setAttribute("disabled", "disabled");
    }
    fetch(`${API_URL}/${EMAILSEND}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(detail)
    }).then(res => res.json())
      .then(data => {
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

        toast.error("Something went wrong!", {
          position: toast.POSITION.TOP_CENTER
        });
      });
  }
  const id = useParams();

  const previouskey = id.uniquekey;
  const  newuniquekey = localStorage.getItem('uniquekey')
  


  function onSubmit(e) {
    if (detail.humankey == '') {
      toast.error("please select captcha first", {
        position: toast.POSITION.TOP_CENTER
      });
    } else {
     
      var uniquekey = crypto.randomBytes(20).toString('hex');
     
      if(newuniquekey == previouskey ){

        axios.put(`${API_URL}/${FORGETPASSWORD}/` + uniquekey, detail, {
          "headers": {
            "content-type": "application/json",
          },
        }).then(res => {
          if (res.success == false) {
            toast.error(res.msg, {
              position: toast.POSITION.TOP_CENTER
            });
          }else{
            toast.success("password  changed Successfully", {
              position: toast.POSITION.TOP_CENTER
            });
            navigate('/');
          }
          
        });
      }else{
        toast.error("key Expire ", {
          position: toast.POSITION.TOP_CENTER
        });
      }

     
    }
  }

  function reset() {
    setDetail({ email: "", otp: "", password: "", confirmpass: "" })
  }


  const validationSchema_newpass = Yup.object().shape({
    otp: Yup.string()
      .required('OTP is required'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"),
    confirmpass: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password')], 'Passwords must match')
  });

  const formOptions_value = { resolver: yupResolver(validationSchema_newpass), mode: 'all', reValidateMode: "all" };
  const {
    register: register2,
    formState: { errors: errors2 },
    handleSubmit: handleSubmit2,
  } = useForm(formOptions_value);
  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <section className="forget_Password">
        <div className="container">
          <div id="for_pass_page" className="for_pass_page pt-5">
            <div className="form">
              <div className="for_pass-title pb-2">
                <p>Forget Password</p>
              </div>
              <form className="for_pass_form" onSubmit={handleSubmit(emailSubmit)}   >
                <p className="email_para ">Enter your Email</p>

                <input type="text" placeholder="Email" name="email" value={email}{...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} onChange={e => onInputChange(e)} />
                <div className="invalid-feedback">{errors.email?.message}</div>
                <button className="forpass_send_otp" type="submit"  ref ={btnRef} >Send OTP</button>
              </form>
              <form className="for_pass_form" onSubmit={handleSubmit2(onSubmit)} >
                <input type="text" placeholder="Enter 6 Digit Code" name="otp" value={otp}{...register2('otp')} className={`form-control ${errors2.otp ? 'is-invalid' : ''}`} onChange={e => onInputChange(e)} />
                <div className="invalid-feedback">{errors2.otp?.message}</div>
                <a href="#"><i className="bi bi-eye-slash-fill for_pass_icn"></i></a>
                <input type="password" placeholder="Password" name="password" value={password}{...register2('password')} className={`form-control ${errors2.password ? 'is-invalid' : ''}`} onChange={e => onInputChange(e)} />
                <div className="invalid-feedback">{errors2.password?.message}</div>

                <a href="#"><i className="bi bi-eye-slash-fill for_pass_conicn"></i></a>
                <input type="password" placeholder="Conform Password" name="confirmpass" value={confirmpass}{...register2('confirmpass')} className={`form-control ${errors2.confirmpass ? 'is-invalid' : ''}`} onChange={e => onInputChange(e)} />
                <div className="invalid-feedback">{errors2.confirmpass?.message}</div>
                <div style={{ marginLeft: '30px' }}>
                  <ReCAPTCHA
                    sitekey="6Lc47T0dAAAAAIU1MfgMMo46un7IqfKbw2Kq3fzT"
                    onChange={onChange}
                  />
                </div>
                <button className="Conform_pass" style={{ marginTop: '30px' }}>Conform</button>
              </form>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
