import React, { useState, useEffect } from "react";
import { logout } from '../Route/index';
import "bootstrap/dist/css/bootstrap.min.css";
import CredoCheck_logo from "../../assets/img/CredoCheck_logo.png";
import {useNavigate} from 'react-router-dom';
import { API_URL } from "../api/constant";
import { PROFILE } from "../api/constant";
import '../../assets/css/style.css';
import profileimg from '../../assets/img/avtarimg.png';

export default function Navbar() {


 const navigate = useNavigate();

    function logout(){
        window.localStorage.clear();
       window.location.href = '/';
    }
   

    const [firstname, setfirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [data, setData] = useState([]);

    const userid = localStorage.getItem('userid');

    useEffect(() => {
        
        fetch(`${API_URL}/${PROFILE}/` + userid)
            .then((res) => res.json())
            .then((data) => {
                setfirstname(data.firstname);
                setLastname(data.lastname);
                setData(data)
               })
            .catch((err) => {
                console.log(err);
            });
    }, []);


    return (

        <nav className=" sb-topnav navbar navbar-expand navbar-dark top_bg">

            <a className="brand ps-3 pt-2" href="index.html">
                <img src={CredoCheck_logo} className="logo" />
            </a>

            <button className="btn btn_tog btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#"><i className="fas fa-bars"></i></button>

            <div className="nav_search_field">
                {/* <div className="form d-none d-md-inline-block form-inline form_search me-0 me-md-3 my-2 my-md-0">
                    <i className="bi bi-search"></i>
                    <input type="text" className="form-control form-input" placeholder="Search" />
                </div> */}

                {/* <div className="form d-none d-md-inline-block form-inline ms-auto me-md-5 me-5 me-lg-5">
                    <select className="form-select top_select text-center" aria-label="Default select example">
                        <option selected>English</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                </div> */}
            </div>
            {/* <div className="form d-none d-md-inline-block form-inline  me-0 me-md-5 ">
                <a href="#"><i className="bi bi-bell-fill noti_icon"></i></a>
            </div> */}


            <ul id="#profile_box" className=" navbar-nav offset-9">
                <li className="nav-item dropdown ">
                    <a className="nav-link  d-flex profile_box p-0" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    { (data.profile_pic == '' || data.profile_pic == null) ?
                                                <img className="previewimg" src={profileimg} alt="UploadImage" />
                                                : <img className="previewimg" src={data.profile_pic} alt="UploadImage" />

                                            }
                        <div className=" user">
                            <p className="user_name">{firstname + lastname}</p>
                            <p className="user_id">{userid}</p>
                        </div>
                        <i className="bi bi-chevron-down drop_profile"></i>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                        <li><a className="dropdown-item" href="#!">Settings</a></li>
                        <li><a className="dropdown-item" href="#!">Activity Log</a></li>
                        <li><hr className="dropdown-divider" /></li>
                      
                        <li><a className="dropdown-item" href = "#" onClick = {() => logout()}>Logout</a></li>
                    </ul>
                </li>
            </ul>
        </nav>


    )
}
