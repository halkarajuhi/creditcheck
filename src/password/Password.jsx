import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';
import { useParams } from "react-router-dom";
import Header from "../common/header/Header";
import { API_URL } from "../common/api/constant";
import { PASSWORD } from "../common/api/constant";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

export default function Password() {
    const ids = useParams();
    const navigate = useNavigate();
    const userid = ids.id;
    console.log(userid);
    const [detail, setDetail] = useState({
        password: "",
        confirmPassword: ""
        
      });
   
      const { password, confirmPassword} = detail;

      const [passwordShown, setPasswordShown] = useState(true);

      const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
      };
      const [passwordShown1, setPasswordShown1] = useState(true);

      const togglePasswordVisiblity1 = () => {
        setPasswordShown1(passwordShown1 ? false : true);
      };

    const onInputChange = e => {
        setDetail({ ...detail, [e.target.name]: e.target.value });
    };
    const validationSchema = Yup.object().shape({
        password: Yup.string()
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters')
           .matches(
              /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
              "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"),
        confirmPassword: Yup.string()
            .required('Confirm Password is required')
            .oneOf([Yup.ref('password')], 'Passwords must match')

    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    
  

   function onSubmit(e) {
    axios.put(`${API_URL}/${PASSWORD}` + userid, detail, {
            "headers": {
                "content-type": "application/json",
            },
        } )
        .then(res => {
         if (res.data.success == false) {
            toast.error(res.data.message, {
              position: toast.POSITION.TOP_CENTER
            });
           }
          else {
            toast.success("password  set Successfully", {
              position: toast.POSITION.TOP_CENTER
            });
             navigate('/');
          }
        });
    };
  

  return (
    <div>
        <Header/>
        <section className="Preferred_Password">
  <div className="container">
    <div id="pass-page" className="pass_page pt-5">      
        <div className="form">
          <div className="pass-title pb-2">
            <p>Preferred Password</p>
          </div>
        
            <form className="pass_form" onSubmit={handleSubmit(onSubmit)}> 
             <a href="#"><i className="bi bi-eye-slash-fill pass_icn"  onClick={togglePasswordVisiblity}></i></a> 
              <input type={passwordShown ? "password" : "text"} placeholder="Password" className="in_pass" name ="password" id ="myInput" value={password}{...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} onChange={e => onInputChange(e)} />
              <div className="invalid-feedback">{errors.password?.message}</div> 
              <a href="#"><i className="bi bi-eye-slash-fill con_pass_icn"  onClick={togglePasswordVisiblity1}></i></a> 
               <input type={passwordShown1 ? "password" : "text"} placeholder="Conform Password" className="con_pass" name ="confirmPassword"  value={confirmPassword} {...register('confirmPassword')} className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`} onChange={e => onInputChange(e)}/>
               <div className="invalid-feedback">{errors.confirmPassword?.message}</div>
              <button className="Conform" type ="submit">Conform</button>
            </form>
        </div>
     </div>
  </div>
</section>
      
    </div>
  )
}
