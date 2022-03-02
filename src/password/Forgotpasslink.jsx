import React, { useState, useEffect } from "react";
import Header from "../common/header/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';
import { API_URL } from "../common/api/constant";
import { CONFIRMPASSEMAIL } from "../common/api/constant";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReCAPTCHA from 'react-google-recaptcha';
import 'react-toastify/dist/ReactToastify.css';
var crypto = require("crypto");


export default function Forgotpasslink() {
  const [detail, setDetail] = useState({
    email: "",
    humankey: ""
  });
  const { email } = detail;

  const onInputChange = e => {
    setDetail({ ...detail, [e.target.name]: e.target.value });
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

  function onChange(humankey) {
    console.log(humankey);
    setDetail({ ...detail, ['humankey']: humankey });
  }

  function emailSubmit(event) {

    if (detail.humankey == '') {
      toast.error("please select captcha first", {
        position: toast.POSITION.TOP_CENTER
      });
    } else {
      var uniquekey = crypto.randomBytes(20).toString('hex');
      localStorage.setItem("uniquekey", uniquekey);
      console.log(uniquekey);
      
      fetch(`${API_URL}/${CONFIRMPASSEMAIL}` + uniquekey, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(detail)
      })
        .then(res => {
          if (res.result == '') {
            toast.error(res.msg, {
              position: toast.POSITION.TOP_CENTER
            });
          }
          else {
            toast.success("email send Successfully", {
              position: toast.POSITION.TOP_CENTER
            });
            // navigate('/forgot');
          }


        })
    }
  }
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
                <div style={{ marginLeft: '30px' }}>
                  <ReCAPTCHA
                    sitekey="6Lc47T0dAAAAAIU1MfgMMo46un7IqfKbw2Kq3fzT"
                    onChange={onChange}
                  />
                </div>
                <button className="forpass_send_otp" type="submit" style={{ 'marginTop': '10px' }}>Send Email</button>
              </form>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
