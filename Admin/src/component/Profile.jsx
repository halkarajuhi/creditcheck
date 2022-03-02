import React, { useState, useEffect } from "react";
import Navbar from '../common/header/Navbar';
import Sidebar from '../common/header/Sidebar';
import { API_URL } from "../common/api/constant";
import { PROFILE, UPDATEPROFILE, RESETPASSWORD } from "../common/api/constant";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import profileimg from '../assets/img/avtarimg.png';
import * as Yup from 'yup';

export default function Profile() {

    const validationSchema2 = Yup.object().shape({
        updated_password: Yup.string()
            .required('New Password is required')
            .min(8, 'Password must be at least 8 characters')
            .matches(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"),
        current_password: Yup.string()
            .required(' Password is required')
            .min(8, 'Password must be at least 8 characters')
    });
    const formOptions = { resolver: yupResolver(validationSchema2) ,reValidateMode: "onChange"};

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;
    console.log(errors);

    const validationSchema = Yup.object().shape({
        firstname: Yup.string()
            .required('firstname is required'),
        email: Yup.string()
            .required('Email is required')
            .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, "Enter a valid e-mail address"),
            phone: Yup.string()
            .required('phone is required')
            .min(10, 'Mobile no must be at least 4 characters'),
      
    });
    const formOptions_value = { resolver: yupResolver(validationSchema), reValidateMode: "onChange" };
    const {
        register: register2,
        formState: { errors: errors2 },
        handleSubmit: handleSubmit2,
    } = useForm(formOptions_value);

    const [firstname, setfirstname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setMobile] = useState("");
   

    const [userInfo, setuserInfo] = useState({
        file: [],
        filepreview: null,
    });

    const handleInputChange = event => {
        setuserInfo({
            ...userInfo,
            file: event.target.files[0],
            filepreview: URL.createObjectURL(event.target.files[0]),
        });
    };

    const [password, setPassword] = useState({
        updated_password: "",
        current_password: ""
    });
    const { updated_password, current_password } = password;

    const handleValueChange = e => {
        setPassword({ ...password, [e.target.name]: e.target.value });
    };
    function reset() {
        setPassword({ updated_password: "", current_password: "" })
    }


    const [data, setData] = useState([]);
    const [isSucces, setSuccess] = useState(null);


    const userid = localStorage.getItem('userid');

    useEffect(() => {

        fetch(`${API_URL}/${PROFILE}/` + userid)
            .then((res) => res.json())
            .then((data) => {
                setfirstname(data.firstname);
                setEmail(data.email);
                setMobile(data.phone);
              
                setData(data)
                setuserInfo({
                    ...userInfo,
                    file: data.profile_pic,
                  });
                 })
            .catch((err) => {
                console.log(err);
            });
    }, []);
  

    function update_profile(e) {
            
        let detail = { firstname, email, phone }

        axios.put(`${API_URL}/${UPDATEPROFILE}/` + userid, detail, {
            "headers": {
                "content-type": "application/json",
            },
        }).then(res => {
            if (res.data.success == false) {
                toast.error(res.msg, {
                    position: toast.POSITION.TOP_CENTER
                });
            } else {
                toast.success("Profile updated Successfully", {
                    position: toast.POSITION.TOP_CENTER
                });
                //   navigate('/');
            }
        });
    }


    const submit = async () => {
 console.log(userInfo.file)
        const formdata = new FormData();

        formdata.append('avatar', userInfo.file);

        axios.put("http://localhost:5000/admin_profile/imageupload/" + userid, formdata, {
            headers: { "Content-Type": "multipart/form-data" }
        })
            .then(res => { // then print response status

                if (res.data.error == false) {

                  setuserInfo({
                        ...userInfo,
                        file: res.data.profile_pic,

                    });
                    window.location.reload();
                }

            })
    }
    async function changePassword(e) {
        axios.put(`${API_URL}/${RESETPASSWORD}/` + email, password, {
            "headers": {
                "content-type": "application/json",
            },
        })
            .then(res => {
                // let data = JSON.parse(res)

                if (res.data.error == true) {
                    toast.error(res.data.msg, {
                        position: toast.POSITION.TOP_CENTER
                    });
                } else {
                    toast.success(res.data.msg, {
                        position: toast.POSITION.TOP_CENTER
                    });
                    reset()
                }

            });
    }

console.log(data.profile_pic)
    return (

        <div className="sb-nav-fixed">

            <Navbar />
            <div id="layoutSidenav">
                <Sidebar />
                <div id="layoutSidenav_content">
                    <div className="pt-4 pb-5">
                        <main>
                            <div className="containar-fluid px-5">
                                <div>
                                    <div className="row">
                                        <div className="col-md-2 text-center">

                                        { (data.profile_pic == '' || data.profile_pic == null) ?
                                                <img className="previewimg" src={profileimg} alt="UploadImage" />
                                                : <img className="previewimg" src={data.profile_pic} alt="UploadImage" />

                                            }
                                            
                                        </div>

                                        <div className="col-md-4">
                                            <div className="pt-4 pro_txt_fr">
                                                <input type="file" className="btn btn-bg" name="file" onChange={handleInputChange} />
                                                <p className="upload_file_txt pt-2 mb-0">Acceptable format JPG, PNG only.<br />Max file size is 500 kb and min size 70 kb</p>
                                            </div>
                                            <div className="form-row">
                                                <button type="submit" className="btn btn-dark" onClick={() => submit()} > Save </button>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="per_info_form">
                                        <div className="row">
                                            <p className="personal_info mt-4">PERSONAL INFORMATION</p>

                                            <form onSubmit={handleSubmit2(update_profile)}>

                                                <div className="form-group row pb-3">
                                                    <label for="username" className="col-md-2 col-form-label">User Name</label>
                                                    <div className="col-md-6">
                                                        <input type="text" className={`form-control ${errors2.firstname ? 'is-invalid' : ''}`} id="username" name="firstname" value={firstname}{...register2('firstname')} onChange={(e) => setfirstname(e.target.value)} />
                                                        <div className="invalid-feedback">{errors2.firstname?.message}</div>
                                                    </div>
                                                </div>
                                                <div className="form-group row pb-3">
                                                    <label for="username" className="col-md-2 col-form-label">E-mail</label>
                                                    <div className="col-md-6">
                                                        <input type="email" className={`form-control ${errors2.email ? 'is-invalid' : ''}`} id="email" name="email" value={email}{...register2('email')} onChange={(e) => setEmail(e.target.value)} />
                                                        <div className="invalid-feedback">{errors2.email?.message}</div>
                                                    </div>
                                                </div>
                                                <div className="form-group row pb-3">
                                                    <label for="username" className="col-md-2 col-form-label">Contact</label>
                                                    <div className="col-md-6">
                                                        <input type="text" className={`form-control ${errors2.phone ? 'is-invalid' : ''}`} id="contact" name="phone" value={phone}{...register2('phone')} onChange={(e) => setMobile(e.target.value)} />
                                                        <div className="invalid-feedback">{errors2.phone?.message}</div>
                                                    </div>
                                                </div>
                                             
                                                <button type="submit" class="btn btn-success" >Update</button>
                                            </form>

                                            <p className="personal_info mt-4">PERSONAL INFORMATION</p>
                                            <form onSubmit={handleSubmit(changePassword)}>
                                                <div className="form-group row pb-3">
                                                    <label for="username" className="col-md-2 col-form-label">Current Password</label>
                                                    <div className="col-md-6 cure_pass">
                                                        <a href="#"><i className="bi bi-eye-slash-fill pass_hide_icn"></i></a>
                                                        <input type="password" className={`form-control ${errors.current_password ? 'is-invalid' : ''}`} id="current_password"{...register('current_password')} name="current_password" placeholder="***************" required="" onChange={handleValueChange} />
                                                        <div className="invalid-feedback">{errors.current_password?.message}</div>
                                                    </div>
                                                </div>
                                                <div className="form-group row pb-3">
                                                    <label for="username" className="col-md-2 col-form-label">Update Password</label>
                                                    <div className="col-md-6 upd_pass">
                                                        <a href="#"><i className="bi bi-eye-slash-fill up_pass_icn"></i></a>
                                                        <input type="password" className={`form-control ${errors.updated_password ? 'is-invalid' : ''}`} id="updated_password"{...register('updated_password')} name="updated_password" placeholder="***************" required="" onChange={handleValueChange} />
                                                        <div className="invalid-feedback">{errors.updated_password?.message}</div>
                                                    </div>
                                                </div>
                                                <div> <button type="submit" class="btn btn-primary">change password</button></div>
                                            </form>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </main>
                    </div>
                </div>

            </div>
            
        </div>

    )
}
