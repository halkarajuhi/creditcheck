import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from './Header';
import '../style.css';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';


export default function Registration() {

    const [user, setUser] = useState({
        login_id: "",
        firstname: "",
        lastname: "",
        salution: "",
        email: "",
        nationality: "",
        industry: "",
        telephone_no: "",
        mobile_no: "",
        address: "",
        country: "",
        state: "",
        user_type: ""

    });


    const { login_id, firstname, lastname, email, nationality, industry, telephone_no, mobile_no, address, country, state, salution, user_type } = user;

    const onInputChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    console.log(user);
    function onSubmit(e) {
        e.preventDefault();
        axios.post("http://localhost:5000/insertdata", user, {
            "headers": {
                "content-type": "application/json",
            },
        })
        reset();
    };
    function reset() {
        setUser({ login_id: "", firstname: "", lastname: "", email: "", nationality: "", industry: "", telephone_no: "", mobile_no: "", address: "", country: "", state: "", salution: "" })
    }

    const [user_individual, setUserIndividual] = useState({
        login_id_individual: "",
        firstname_individual: "",
        lastname_individual: "",
        salution_individual: "",
        email_individual: "",
        nationality_individual: "",
        industry_individual: "",
        telephone_no_individual: "",
        mobile_no_individual: "",
        address_individual: "",
        country_individual: "",
        state_individual: "",
        user_type_individual: ""

    });


    const { login_id_individual, firstname_individual, lastname_individual, email_individual, nationality_individual, industry_individual, telephone_no_individual, mobile_no_individual, address_individual, country_individual, state_individual, salution_individual, user_type_individual } = user_individual;

    const onInputChangevalue = e => {
        setUserIndividual({ ...user_individual, [e.target.name]: e.target.value });
    };
    function submitData(e) {
        e.preventDefault();
        axios.post("http://localhost:5000/createdata", user_individual, {
            "headers": {
                "content-type": "application/json",
            },
        })
        reset_individual();
    };
    function reset_individual() {
        setUser({ login_id_individual: "", firstname_individual: "", lastname_individual: "", email_individual: "", nationality_individual: "", industry_individual: "", telephone_no_individual: "", mobile_no_individual: "", address_individual: "", country_individual: "", state_individual: "", salution_individual: "" })
    }


    const validationSchema = Yup.object().shape({
        login_id: Yup.string()
            .required('Login id is required'),
        salution_individual: Yup.string()
            .required('Salution is required'),
        firstname: Yup.string()
            .required('Firstname is required')
            .min(4, 'Firstname must be at least 4 characters'),
        lastname: Yup.string()
            .required('Lastname is required')
            .min(4, 'Lastname must be at least 4 characters'),
        email: Yup.string()
            .required('Email is required')
            .min(6, 'Email must contain @ '),
        countryl: Yup.string()
            .required('Country is required')
            .min(4, 'Country must be at least 4 characters'),
        address: Yup.string()
            .required('Address is required')
            .min(4, 'Address must be at least 4 characters'),
        state: Yup.string()
            .required('State is required'),
        nationality: Yup.string()
            .required('Nationality is required'),

        industry: Yup.string()
            .required('Industry is required')
            .min(4, 'Industry must be at least 4 characters'),
        telephone: Yup.string()
            .required('Telephone no is required')
            .min(6, 'Telephone no must be at least 6 characters'),
        mobile_no: Yup.string()
            .required('Mobile_no is required')
            .min(10, 'Mobile no must be at least 4 characters'),
        login_id_individual: Yup.string()
            .required('Login id is required'),
        salution_individual: Yup.string()
            .required('Salution is required'),
        firstname_individual: Yup.string()
            .required('Firstname is required')
            .min(4, 'Firstname must be at least 4 characters'),
        lastname_individual: Yup.string()
            .required('Lastname is required')
            .min(4, 'Lastname must be at least 4 characters'),
        email_individual: Yup.string()
            .required('Email is required')
            .min(6, 'Email must contain @ '),
        country_individual: Yup.string()
            .required('Country is required')
            .min(4, 'Country must be at least 4 characters'),
        address_individual: Yup.string()
            .required('Address is required')
            .min(4, 'Address must be at least 4 characters'),
        state_individual: Yup.string()
            .required('State is required'),
        nationality_individual: Yup.string()
            .required('Nationality is required'),

        industry_individual: Yup.string()
            .required('Industry is required')
            .min(4, 'Industry must be at least 4 characters'),
        telephone_no_individual: Yup.string()
            .required('Telephone no is required')
            .min(6, 'Telephone no must be at least 6 characters'),
        mobile_no_individual: Yup.string()
            .required('Mobile_no is required')
            .min(10, 'Mobile no must be at least 4 characters'),

    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;
    console.log(errors);

    return (

        <div>
            <Header />
            <div id="regist-page" className="login_page pt-5">

                <div className="form">

                    <div className="regi-title pb-2">
                        <p>Registration</p>
                    </div>

                    <div className="regi_btn d-flex justify-content-center mb-3">
                        <ul className="nav nav-tabs " id="myTab" role="tablist">
                            <li className="nav-item item-1" role="presentation ">
                                <button className="nav-link active" id="corporate-tab" data-bs-toggle="tab" data-bs-target="#corporate" type="button" role="tab" aria-controls="corporate" aria-selected="true">Corporate </button>
                            </li>
                            <li className="nav-item item-2" role="presentation">
                                <button className="nav-link " id="individual-tab" data-bs-toggle="tab" data-bs-target="#individual" type="button" role="tab" aria-controls="individual" aria-selected="false">Individual </button>
                            </li>
                        </ul>
                    </div>


                    <div className="tab-content">
                        <div className="tab-pane fade show active" id="corporate" role="tabpanel" aria-labelledby="corporate-tab">
                            <form className="regist_form" onSubmit={handleSubmit(onSubmit)}>
                                <div className="registration_box mb-4">

                                    <select className="form-select " aria-label="Default select example">
                                        <option selected>Open this select menu</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>

                                </div>
                                <input type="hidden" name="user_type" value="1" />
                                <div className="row">
                                    <div className="col-md-6">
                                        <input type="text" placeholder="Login ID" name="login_id" value={login_id} {...register('login_id')} onChange={e => onInputChange(e)} className={`form-control ${errors.login_id ? 'is-invalid' : ''}`} />
                                        <div className="invalid-feedback">{errors.login_id?.message}</div>
                                    </div>
                                    <div className="col-md-6">
                                        <input type="text" placeholder="First name " name="firstname" value={firstname} {...register('firstname')} onChange={e => onInputChange(e)} className={`form-control ${errors.firstname ? 'is-invalid' : ''}`} />
                                        <div className="invalid-feedback">{errors.firstname?.message}</div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <input type="text" placeholder="Salution ( MR,MS,DR)" name="salution" value={salution}{...register('salution')} onChange={e => onInputChange(e)} className={`form-control ${errors.salution ? 'is-invalid' : ''}`} />
                                        <div className="invalid-feedback">{errors.salution?.message}</div>
                                    </div>
                                    <div className="col-md-6">
                                        <input type="text" placeholder="Email" name="email" value={email}{...register('email')} onChange={e => onInputChange(e)} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                                        <div className="invalid-feedback">{errors.email?.message}</div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <input type="text" placeholder="Last name" name="lastname" value={lastname}{...register('lastname')} onChange={e => onInputChange(e)} className={`form-control ${errors.lastname ? 'is-invalid' : ''}`} />
                                        <div className="invalid-feedback">{errors.lastname?.message}</div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="">
                                            <select className="form-select nation_select" name="nationality" onChange={e => onInputChange(e)}  >
                                                <option selected>Nationality</option>
                                                <option value="1">Indian</option>
                                                <option value="2">Pakistani</option>
                                                <option value="3">Russian</option>
                                            </select>
                                        </div>
                                        <div className="invalid-feedback">{errors.nationality?.message}</div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <input type="text" placeholder="Industry / sector" name="industry" value={industry}{...register('industry')} onChange={e => onInputChange(e)} className={`form-control ${errors.industry ? 'is-invalid' : ''}`} />
                                        <div className="invalid-feedback">{errors.industry?.message}</div>
                                    </div>
                                    <div className="col-md-6">
                                        <input type="text" placeholder="Telephone No" name="telephone_no" value={telephone_no}{...register('telephone_no')} onChange={e => onInputChange(e)} className={`form-control ${errors.telephone_no ? 'is-invalid' : ''}`} />
                                        <div className="invalid-feedback">{errors.telephone_no?.message}</div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <input type="text" placeholder="Mobile No " name="mobile_no" value={mobile_no}{...register('mobile_no')} onChange={e => onInputChange(e)} className={`form-control ${errors.mobile_no ? 'is-invalid' : ''}`} />
                                        <div className="invalid-feedback">{errors.email?.message}</div>

                                    </div>
                                    <div className="col-md-6">
                                        <input type="text" placeholder="Address (City)" name="address" value={address}{...register('address')} onChange={e => onInputChange(e)} className={`form-control ${errors.address ? 'is-invalid' : ''}`} />
                                        <div className="invalid-feedback">{errors.address?.message}</div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <input type="text" placeholder="State ( Optional)" name="state" value={state}{...register('state')} onChange={e => onInputChange(e)} className={`form-control ${errors.state ? 'is-invalid' : ''}`} />
                                        <div className="invalid-feedback">{errors.state?.message}</div>
                                    </div>
                                    <div className="col-md-6">
                                        <input type="text" placeholder="Country" name="country" value={country}{...register('country')} onChange={e => onInputChange(e)} className={`form-control ${errors.country ? 'is-invalid' : ''}`} />
                                        <div className="invalid-feedback">{errors.country?.message}</div>
                                    </div>
                                </div>

                                <div className="registar_btn text-center">
                                    <button className="guest_login " type="submit">Registar</button>

                                </div>

                            </form>
                        </div>

                        <div className="tab-pane fade" id="individual" role="tabpanel" aria-labelledby="individual-tab">
                            <form className="regist_form" onSubmit={handleSubmit(submitData)} >
                                <input type="hidden" name="user_type_individual" value="2" />
                                <div className="row">
                                    <div className="col-md-6">
                                        <input type="text" placeholder="Login ID" name="login_id_individual" value={login_id_individual} {...register('login_id')} onChange={e => onInputChangevalue(e)} className={`form-control ${errors.login_id ? 'is-invalid' : ''}`} />
                                        <div className="invalid-feedback">{errors.login_id_individual?.message}</div>
                                    </div>
                                    <div className="col-md-6">
                                        <input type="text" placeholder="First name " name="firstname_individual" value={firstname_individual} {...register('firstname')} onChange={e => onInputChangevalue(e)} className={`form-control ${errors.firstname ? 'is-invalid' : ''}`} />
                                        <div className="invalid-feedback">{errors.firstname_individual?.message}</div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <input type="text" placeholder="Salution ( MR,MS,DR)" name="salution_individual" value={salution_individual}{...register('salution')} onChange={e => onInputChangevalue(e)} className={`form-control ${errors.salution ? 'is-invalid' : ''}`} />
                                        <div className="invalid-feedback">{errors.salution_individual?.message}</div>
                                    </div>
                                    <div className="col-md-6">
                                        <input type="text" placeholder="Email" name="email_individual" value={email_individual}{...register('email_individual')} onChange={e => onInputChangevalue(e)} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                                        <div className="invalid-feedback">{errors.email_individual?.message}</div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <input type="text" placeholder="Last name" name="lastname_individual" value={lastname_individual}{...register('lastname_individual')} onChange={e => onInputChangevalue(e)} className={`form-control ${errors.lastname ? 'is-invalid' : ''}`} />
                                        <div className="invalid-feedback">{errors.lastname_individual?.message}</div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="">
                                            <select className="form-select nation_select" name="nationality_individual" onChange={e => onInputChangevalue(e)} >
                                                <option selected>Nationality</option>
                                                <option value="1">Indian</option>
                                                <option value="2">Pakistani</option>
                                                <option value="3">Russian</option>
                                            </select>
                                        </div>
                                        <div className="invalid-feedback">{errors.nationality_individual?.message}</div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <input type="text" placeholder="Industry / sector" name="industry_individual" value={industry_individual}{...register('industry_individual')} onChange={e => onInputChangevalue(e)} className={`form-control ${errors.industry_individual ? 'is-invalid' : ''}`} />
                                        <div className="invalid-feedback">{errors.industry_individual?.message}</div>
                                    </div>
                                    <div className="col-md-6">
                                        <input type="text" placeholder="Telephone No" name="telephone_no_individual" value={telephone_no_individual}{...register('telephone_no_individual')} onChange={e => onInputChangevalue(e)} className={`form-control ${errors.telephone_no_individual ? 'is-invalid' : ''}`} />
                                        <div className="invalid-feedback">{errors.telephone_no_individual?.message}</div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <input type="text" placeholder="Mobile No " name="mobile_no_individual" value={mobile_no_individual}{...register('mobile_no_individual')} onChange={e => onInputChangevalue(e)} className={`form-control ${errors.mobile_no_individual ? 'is-invalid' : ''}`} />
                                        <div className="invalid-feedback">{errors.mobile_no_individual?.message}</div>

                                    </div>
                                    <div className="col-md-6">
                                        <input type="text" placeholder="Address (City)" name="address_individual" value={address_individual}{...register('address_individual')} onChange={e => onInputChangevalue(e)} className={`form-control ${errors.address_individual ? 'is-invalid' : ''}`} />
                                        <div className="invalid-feedback">{errors.address_individual?.message}</div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <input type="text" placeholder="State ( Optional)" name="state_individual" value={state_individual}{...register('state_individual')} onChange={e => onInputChangevalue(e)} className={`form-control ${errors.state_individual ? 'is-invalid' : ''}`} />
                                        <div className="invalid-feedback">{errors.state_individual?.message}</div>
                                    </div>
                                    <div className="col-md-6">
                                        <input type="text" placeholder="Country" name="country_individual" value={country_individual}{...register('country_individual')} onChange={e => onInputChangevalue(e)} className={`form-control ${errors.country_individual ? 'is-invalid' : ''}`} />
                                        <div className="invalid-feedback">{errors.country_individual?.message}</div>
                                    </div>
                                </div>
                                <div className="registar_btn text-center">
                                    <button className="guest_login " type="submit">Registar</button>

                                </div>

                            </form>
                            <div>
                            </div>
                        </div></div></div></div>



        </div>
    )
}
