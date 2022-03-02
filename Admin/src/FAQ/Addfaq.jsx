import React, { useState, useEffect } from "react";
import Navbar from '../common/header/Navbar';
import Sidebar from '../common/header/Sidebar';
import axios from 'axios';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import "bootstrap/dist/css/bootstrap.min.css";

import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_URL, ADDFAQ, GETFAQ } from "../common/api/constant";

import { Link, useParams } from 'react-router-dom';

export default function Addfaq() {
    const [faq, setFaq] = useState({
        faq_question: "",
        faq_answer: "",
        question_type: ""
    });

    const navigate = useNavigate();

    const { faq_question, faq_answer, question_type } = faq;

    const onInputChangevalue = e => {
        setFaq({ ...faq, [e.target.name]: e.target.value });

    };
    const validationSchema = Yup.object().shape({
        faq_question: Yup.string()
            .required('Question is required'),

        faq_answer: Yup.string()
            .required('Answre is required')

    });
    const [dropdownvalue, setDropdownvalue] = useState([]);

    const formOptions = { resolver: yupResolver(validationSchema), reValidateMode: "onChange" };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;


    useEffect(() => {
        fetch(`${API_URL}/${GETFAQ}`)
            .then((res) => res.json())
            .then((data) => {
                setDropdownvalue(data.response);

            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    function onSubmit(e) {

        axios.post(`${API_URL}/${ADDFAQ}`, faq, {
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
                    navigate('/Showfaq');
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


                        <Link className="btn btn-outline-primary btnclass" to={{ pathname: `/Showfaq` }}>Show FAQ</Link>
                        <main style={{ marginTop: '4%' }}>
                            <h4 class="px-5 text-center request_title">Add FAQ Question</h4>
                            <div class="containar-fluid px-5 ">

                                <div class="report_form">
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div class="row">

                                            <div class="form-group row pb-3">
                                                <label for="username" class="col-md-3 col-form-label report_form_txt">Question</label>
                                                <div class="col-md-8 m-auto">
                                                    <input type="text" name="faq_question" value={faq_question}{...register('faq_question')} onChange={e => onInputChangevalue(e)} className={`form-control ${errors.faq_question ? 'is-invalid' : ''}`} />
                                                    <div className="invalid-feedback">{errors.faq_question?.message}</div>
                                                </div>
                                            </div>
                                            <div class="form-group row pb-3">
                                                <label for="username" class="col-md-3 col-form-label report_form_txt">Question Type</label>
                                                <div className="col-md-8 m-auto">

                                                    <select className="form-select" aria-label="Default select example" name="question_type" onChange={e => onInputChangevalue(e)}>
                                                        <option selected>Open this select menu</option>
                                                        {dropdownvalue.map((data, index) => (
                                                            <option value={data.type}>{data.type}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>

                                            <div class="form-group row pb-3">
                                                <label for="username" class="col-md-3 col-form-label report_form_txt">Answer</label>
                                                <div class="col-md-8 m-auto">
                                                    <textarea name="faq_answer" rows="3" value={faq_answer}{...register('faq_answer')} onChange={e => onInputChangevalue(e)} className={`form-control ${errors.faq_answer ? 'is-invalid' : ''}`}></textarea>
                                                    <div className="invalid-feedback">{errors.faq_answer?.message}</div>
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
    )
}
