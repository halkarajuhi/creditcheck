import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import '../assets/css/Login.css';
import logo from '../assets/img/logo1.png'
import "bootstrap/dist/css/bootstrap.min.css";
import { API_URL, LOGIN } from "../common/api/constant";
import { useNavigate } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { loginnew } from '../common/Route/index';

export default function Login() {

  const [detail, setDetail] = useState({
    email: "",
    password: ""
  });
  const navigate = useNavigate();
 
  const { email, password } = detail;

  const [data, setData] = useState('');

  const onInputChangevalue = e => {
    setDetail({ ...detail, [e.target.name]: e.target.value });

  };
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email is required')
      .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, "Enter a valid e-mail address"),
    password: Yup.string()
      .required('Password is required')
      // .min(8, 'Password must be at least 8 characters')
      // .matches(
      //   /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      //   "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character")

  });
  const formOptions = { resolver: yupResolver(validationSchema), mode: 'all', reValidateMode: 'all' };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  async function Login(e) {
   //e.preventDefault()
    axios.post('http://localhost:5000/admin_login/login', detail, {
      "headers": {
        "content-type": "application/json",
      },
    })
      .then(res => {
        // let data = JSON.parse(res)
        setData(res.data);
     
        if (res.data.success == "false") {
         
          toast.error(res.data.error_msg, {
            position: toast.POSITION.TOP_CENTER
          });
        } else {
          toast.success(res.data.error_msg, {
            position: toast.POSITION.TOP_CENTER
          });
          console.log(res.data.user_id)
       if (res.data.token) {
            loginnew(res.data.token,
              res.data.user_id,
              res.data.email,
              res.data.mobile_no,
              res.data.firstname,
              res.data.lastname
            );
             navigate('/');
           
          }
          else {
            toast.error(data.error_msg, {
              position: toast.POSITION.TOP_CENTER
            });
          
          }
       
        }

      });
  }
  return (

    <div className="container">
      <div className="cardnew card-login mx-auto text-center bg-dark">
        <div className="card-header mx-auto bg-dark">
          <span> <img src={logo} className="w-75" alt="Logo" /> </span><br />
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit(Login)}>
            <div className="input-group form-group">
              <div className="input-group-prepend">
                <span className="input-group-text"><i className="fas fa-user"></i></span>
              </div>
              <input type="text" name="email" value={email}{...register('email')} placeholder="Username" onChange={e => onInputChangevalue(e)} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
              <div className="invalid-feedback">{errors.email?.message}</div>
            </div>

            <div className="input-group form-group">
              <div className="input-group-prepend">
                <span className="input-group-text"><i className="fas fa-key"></i></span>
              </div>
              <input type="password" name="password" placeholder="Password" value={password}{...register('password')} onChange={e => onInputChangevalue(e)} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
              <div className="invalid-feedback">{errors.password?.message}</div>
            </div>

            <div className="form-group">
              <input type="submit" name="btn" value="Login" className="btn btn-outline-danger login_btn" />
            </div>

          </form>
        </div>
      </div>
      <ToastContainer />
    </div>


  )
}
