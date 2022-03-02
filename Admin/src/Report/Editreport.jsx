import React, { useState, useEffect } from "react";
import Navbar from '../common/header/Navbar';
import Sidebar from '../common/header/Sidebar';
import axios from 'axios';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import "bootstrap/dist/css/bootstrap.min.css";
import { API_URL, UPDATEREPORT ,UPDATEDATA } from "../common/api/constant";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useParams } from 'react-router-dom';

export default function Editreport() {

  const ids = useParams();
  const navigate = useNavigate();

  const [heading, setHeading] = useState();
  const [price, setPrice] = useState();
  
  const validationSchema = Yup.object().shape({
    heading: Yup.string()
      .required('Question is required'),
     price: Yup.string()
      .required('Answre is required')
 });

  const formOptions = { resolver: yupResolver(validationSchema), reValidateMode: "onChange" };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;
  
  useEffect(() => {
    fetch(`${API_URL}/${UPDATEREPORT}/` + ids.id)
      .then((res) => res.json())
      .then((data) => {
       
        setHeading(data.response.heading)
        setPrice(data.response.price)
        console.log(data.response.heading)
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

  async function onSubmit(e) {
    const data = { heading, price}
    e.preventDefault();
    axios.put(`${API_URL}/${UPDATEDATA}/` + ids.id, data, {
      "headers": {
        "content-type": "application/json",
      },
    })
      .then(res => {
        if (res.data.success == false) {
          toast.error(res.data.error_msg, {
            position: toast.POSITION.TOP_CENTER
          });
        } else {
          toast.success("Login Successfull", {
            position: toast.POSITION.TOP_CENTER
          });
          navigate('/showreport');
        }
      });
  }

  return (
    <div class="sb-nav-fixed">
      <Navbar />
      <div id="layoutSidenav">
        <Sidebar />
        <div id="layoutSidenav_content">
          <div class="pt-4 pb-5">
            <main>
              <h4 class="px-5 text-center request_title">Edit FAQ Question</h4>
              <div class="containar-fluid px-5 ">

                <div class="report_form">
                  <form onSubmit={onSubmit}>
                    <div class="row">

                      <div class="form-group row pb-3">
                        <label for="username" class="col-md-3 col-form-label report_form_txt">Report Heading</label>
                        <div class="col-md-8 m-auto">
                          <input type="text" name="heading" value={heading}{...register('heading')} onChange={e => setHeading(e.target.value)} className={`form-control ${errors.heading ? 'is-invalid' : ''}`} />
                          <div className="invalid-feedback">{errors.heading?.message}</div>
                        </div>
                      </div>
                      <div class="form-group row pb-3">
                        <label for="username" class="col-md-3 col-form-label report_form_txt">Report price</label>
                        <div className="col-md-8 m-auto">
                          <input type="number" name="price" value={price}{...register('price')} onChange={e => setPrice(e.target.value)} className={`form-control ${errors.price ? 'is-invalid' : ''}`} />
                          <div className="invalid-feedback">{errors.price?.message}</div>

                        </div>
                      </div>

                      <div class="form-group row pb-3">
                        <div class="col-md-3"></div>
                        <div class="col-md-8 request_sample m-auto">
                          <button type="submit" class="btn btn-primary">Submit</button>
                        </div>
                      </div>

                    </div>
                  </form>
                </div>
              </div>
            </main>

          </div>
        </div>
      </div>

    </div>
  );
}
