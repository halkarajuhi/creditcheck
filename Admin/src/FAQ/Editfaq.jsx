import React, { useState, useEffect } from "react";
import Navbar from '../common/header/Navbar';
import Sidebar from '../common/header/Sidebar';
import axios from 'axios';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import "bootstrap/dist/css/bootstrap.min.css";
import { API_URL, LOGIN } from "../common/api/constant";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link ,useParams} from 'react-router-dom';

export default function Editfaq() {
   
    const ids = useParams();
const navigate = useNavigate();

const [faqdata, setFaqdata] = useState([]);

const [question, setQuestion] = useState();

const [answer, setAnswer] = useState();
const [question_type, setQuestion_type] = useState();
const [dropdownvalue, setDropdownvalue] = useState([]);


    const validationSchema = Yup.object().shape({
        question: Yup.string()
            .required('Question is required'),
           
        answer: Yup.string()
            .required('Answre is required')

    });
    const formOptions = { resolver: yupResolver(validationSchema), reValidateMode: "onChange" };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;
    console.log(ids.id)

    useEffect(() => {
        fetch(`http://localhost:5000/Faq/getsingledata/`+ids.id)
            .then((res) => res.json())
            .then((data) => {
               
                setFaqdata(data.response)
                setQuestion(data.response.question)
                setAnswer(data.response.answer)
                setQuestion_type(data.response.question_type)
            })
            .catch((err) => {
                console.log(err);
            });

            fetch(`http://localhost:5000/Faq/getallfaqdata`)
            .then((res) => res.json())
            .then((data) => {
                setDropdownvalue(data.response);
               console.log(dropdownvalue)
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    async function onSubmit(e) {
        const faq = {question ,answer,question_type}
       e.preventDefault();
        axios.put('http://localhost:5000/Faq/updatefaq/'+ids.id, faq, {
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
                     navigate('/Showfaq');
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
                                                <label for="username" class="col-md-3 col-form-label report_form_txt">Question</label>
                                                <div class="col-md-8 m-auto">
                                                    <input type="text"  name="question" value={question}{...register('question')}  onChange={(e) => setQuestion(e.target.value)} className={`form-control ${errors.question ? 'is-invalid' : ''}`} />
                                                    <div className="invalid-feedback">{errors.question?.message}</div>
                                                </div>
                                            </div>
                                            <div class="form-group row pb-3">
                                                <label for="username" class="col-md-3 col-form-label report_form_txt">Question</label>
                                                <div class="col-md-8 m-auto">
                                                   
                                               <select className="form-select" aria-label="Default select example" name="question_type" value={question_type}  onChange={(e) => setQuestion_type(e.target.value)}>
                                                            <option selected>Open this select menu</option>
                                                            {dropdownvalue.map((data,index) => (
                                                            <option value={data.type} >{data.type}</option>
                                                             ))}
                                                    </select>
                                                </div>
                                            </div>

                                             <div class="form-group row pb-3">
                                                <label for="username" class="col-md-3 col-form-label report_form_txt">Answer</label>
                                                <div class="col-md-8 m-auto">
                                                    <textarea  name="answer" rows="3" value={answer}{...register('answer')}  onChange={(e) => setAnswer(e.target.value)} className={`form-control ${errors.answer ? 'is-invalid' : ''}`}></textarea>
                                                    <div className="invalid-feedback">{errors.answer?.message}</div>
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
