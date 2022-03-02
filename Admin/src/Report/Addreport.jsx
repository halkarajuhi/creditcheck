import React, { useState, useEffect } from 'react';
import Navbar from '../common/header/Navbar';
import Sidebar from '../common/header/Sidebar';
import "bootstrap/dist/css/bootstrap.min.css";

import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import "bootstrap/dist/css/bootstrap.min.css";

import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_URL, ADDREPORT } from "../common/api/constant";
import { Link } from 'react-router-dom';


export default function Addreport() {
    const [data, setData] = useState({
        heading: "",
        price: ""
    });

    const navigate = useNavigate();

    const { heading, price } = data;

    const onInputChangevalue = e => {
        setData({ ...data, [e.target.name]: e.target.value });

    };
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


    function onSubmit(e) {

        axios.post(`${API_URL}/${ADDREPORT}`, data, {
            "headers": {
                "content-type": "application/json",
            },
        })
            .then(res => {
                console.log(res.data.success)
                if (res.data.success == true) {
                    toast.success("Add Successfully", {
                        position: toast.POSITION.TOP_CENTER
                    });
                    navigate('/showreport');
                } else {
                    toast.error("Error", {
                        position: toast.POSITION.TOP_CENTER
                    });
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
                        <Link className="btn btn-outline-primary btnclass" to={{ pathname: `/showreport` }}>Show Report</Link>
                        <main style={{ marginTop: '4%' }}>
                            <h4 class="px-5 text-center request_title">Add Report Detail</h4>
                            <div class="containar-fluid px-5 ">
                                <div class="report_form">
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div class="row">

                                            <div class="form-group row pb-3">
                                                <label for="username" class="col-md-3 col-form-label report_form_txt">Report Heading</label>
                                                <div class="col-md-8 m-auto">
                                                    <input type="text" name="heading" value={heading}{...register('heading')} onChange={e => onInputChangevalue(e)} className={`form-control ${errors.heading ? 'is-invalid' : ''}`} />
                                                    <div className="invalid-feedback">{errors.heading?.message}</div>
                                                </div>
                                            </div>
                                            <div class="form-group row pb-3">
                                                <label for="username" class="col-md-3 col-form-label report_form_txt">Report price</label>
                                                <div className="col-md-8 m-auto">
                                                    <input type="number" name="price" value={price}{...register('price')} onChange={e => onInputChangevalue(e)} className={`form-control ${errors.price ? 'is-invalid' : ''}`} />
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
