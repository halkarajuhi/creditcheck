import React, { useState, useEffect ,useRef} from "react";
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
import { useTranslation } from "react-i18next";

export default function Profile() {

    const { t } = useTranslation();
const [passwordShown, setPasswordShown] = useState(true);

    const togglePasswordVisiblity = () => {
      setPasswordShown(passwordShown ? false : true);
    };
    const [passwordShown1, setPasswordShown1] = useState(true);

    const togglePasswordVisiblity1 = () => {
      setPasswordShown1(passwordShown1 ? false : true);
    };

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
    const btnRef = useRef();
    const  btnRefff = useRef();
    const formOptions = { resolver: yupResolver(validationSchema2) ,reValidateMode: "onChange"};

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;
    
    const validationSchema = Yup.object().shape({
        firstname: Yup.string()
            .required('firstname is required'),
       
        mobile_no: Yup.string()
            .required('Mobile_no is required')
            .min(10, 'Mobile no must be at least 4 characters'),
        address: Yup.string()
            .required('Address is required')
            .min(4, 'Address must be at least 4 characters'),
    });
    const formOptions_value = { resolver: yupResolver(validationSchema), reValidateMode: "onChange" };
    const {
        register: register2,
        formState: { errors: errors2 },
        handleSubmit: handleSubmit2,
    } = useForm(formOptions_value);

    const [firstname, setfirstname] = useState("");
    const [email, setEmail] = useState("");
    const [mobile_no, setMobile] = useState("");
    const [address, setAddress] = useState("");

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


    const userid = localStorage.getItem('USER_ID');

    useEffect(() => {

        fetch(`${API_URL}/${PROFILE}/` + userid)
            .then((res) => res.json())
            .then((data) => {
                setfirstname(data.firstname);
                setEmail(data.email);
                setMobile(data.mobile_no);
                setAddress(data.address);
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
        if(btnRef.current){
            btnRef.current.setAttribute("disabled", "disabled");
          }
        let detail = { firstname, mobile_no, address }

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
                if(btnRef.current){
                    btnRef.current.removeAttribute("disabled");
                  }
                //   navigate('/');
            }
        });
    }
    const submit = async () => {

        const formdata = new FormData();

        formdata.append('avatar', userInfo.file);

        console.log(formdata)

        axios.put("http://localhost:5000/profile/imageupload/" + userid, formdata, {
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
        if(btnRefff.current){
            btnRefff.current.setAttribute("disabled", "disabled");
          }
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
                                                
                                                <p className="upload_file_txt pt-2 mb-0">{t("acceptable_format_JPG_PNG_only")}.<br />{t("max_file_size_is_500_kb_and_min_size_70_kb")}</p>
                                            </div>
                                            <div className="form-row">
                                                <button type="submit" className="btn btn-dark" onClick={() => submit()} >{t("save")}</button>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="per_info_form">
                                        <div className="row">
                                            <p className="personal_info mt-4">{t("personal_information")}</p>

                                            <form onSubmit={handleSubmit2(update_profile)}>

                                                <div className="form-group row pb-3">
                                                    <label for="username" className="col-md-2 col-form-label">{t("username")}</label>
                                                    <div className="col-md-6">
                                                        <input type="text" className={`form-control ${errors2.firstname ? 'is-invalid' : ''}`} id="username" name="firstname" value={firstname}{...register2('firstname')} onChange={(e) => setfirstname(e.target.value)} />
                                                        <div className="invalid-feedback">{errors2.firstname?.message}</div>
                                                    </div>
                                                </div>
                                                <div className="form-group row pb-3">
                                                    <label for="username" className="col-md-2 col-form-label">{t("email")}</label>
                                                    <div className="col-md-6">
                                                        <input type="email" className={`form-control ${errors2.email ? 'is-invalid' : ''}`} disabled = "disabled" id="email" name="email" value={email} />
                                                       
                                                    </div>
                                                </div>
                                                <div className="form-group row pb-3">
                                                    <label for="username" className="col-md-2 col-form-label">{t("contact")}</label>
                                                    <div className="col-md-6">
                                                        <input type="text" className={`form-control ${errors2.mobile_no ? 'is-invalid' : ''}`} id="contact" name="mobile_no" value={mobile_no}{...register2('mobile_no')} onChange={(e) => setMobile(e.target.value)} />
                                                        <div className="invalid-feedback">{errors2.mobile_no?.message}</div>
                                                    </div>
                                                </div>
                                                <div className="form-group row pb-3">
                                                    <label for="username" className="col-md-2 col-form-label">{t("address")}</label>
                                                    <div className="col-md-6">
                                                        <input type="text" className={`form-control ${errors2.address ? 'is-invalid' : ''}`} id="address" name="address" value={address}{...register2('address')} onChange={(e) => setAddress(e.target.value)} />
                                                        <div className="invalid-feedback">{errors2.address?.message}</div>
                                                    </div>
                                                </div>
                                                <button type="submit" class="btn btn-success" ref = {btnRef}>{t("update")}</button>
                                            </form>

                                            <p className="personal_info mt-4">{t("personal_information")}</p>
                                            <form onSubmit={handleSubmit(changePassword)}>
                                                <div className="form-group row pb-3">
                                                    <label for="username" className="col-md-2 col-form-label">{t("current_password")}</label>
                                                    <div className="col-md-6 cure_pass">
                                                        <a href="#"><i className="bi bi-eye-slash-fill pass_hide_icn" onClick={togglePasswordVisiblity} ></i></a>
                                                        <input type={passwordShown ? "password" : "text"} className={`form-control ${errors.current_password ? 'is-invalid' : ''}`} id="current_password"{...register('current_password')} name="current_password" placeholder="***************" required="" onChange={handleValueChange} />
                                                        <div className="invalid-feedback">{errors.current_password?.message}</div>
                                                    </div>
                                                </div>
                                                <div className="form-group row pb-3">
                                                    <label for="username" className="col-md-2 col-form-label">{t("update_password")}</label>
                                                    <div className="col-md-6 upd_pass">
                                                        <a href="#"><i className="bi bi-eye-slash-fill up_pass_icn" onClick={togglePasswordVisiblity1}></i></a>
                                                        <input type={passwordShown1 ? "password" : "text"} className={`form-control ${errors.updated_password ? 'is-invalid' : ''}`} id="updated_password"{...register('updated_password')} name="updated_password" placeholder="***************" required="" onChange={handleValueChange} />
                                                        <div className="invalid-feedback">{errors.updated_password?.message}</div>
                                                    </div>
                                                </div>
                                                <div> <button type="submit" class="btn btn-primary" ref ={btnRefff}>{t("change_password")}</button></div>
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
