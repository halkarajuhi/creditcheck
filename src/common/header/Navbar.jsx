import React, { useState, useEffect } from "react";
import { logout } from '../Route/index';
import "bootstrap/dist/css/bootstrap.min.css";
import CredoCheck_logo from "../../assets/img/CredoCheck_logo.png";
import {useNavigate} from 'react-router-dom';
import { API_URL } from "../api/constant";
import { PROFILE } from "../api/constant";
import '../../assets/css/style.css';
import profileimg from '../../assets/img/avtarimg.png';
import { useTranslation } from "react-i18next";
import LanguageSelect from "../../Language/languageSelect";
import { NavLink } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import { useCart } from "react-use-cart";

export default function Navbar(props) {


 const navigate = useNavigate();

    function logout(){
        window.localStorage.clear();
       window.location.href = '/';
    }
    const { totalItems } = useCart();

    const [firstname, setfirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [data, setData] = useState([]);



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
    const  userid = localStorage.getItem('USER_ID');
    const { t } = useTranslation();

    return (
       <nav className="sb-topnav navbar navbar-expand navbar-dark top_bg">

            <a className="brand ps-3 pt-2" href="index.html">
                <img src={CredoCheck_logo} className="logo" />
            </a>

            <button className="btn btn_tog btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#"><i className="fas fa-bars"></i></button>

            <div className="nav_search_field">
                <div className="form d-none d-md-inline-block form-inline form_search me-0 me-md-3 my-2 my-md-0">
                    <i className="bi bi-search"></i>
                    <input type="text" className="form-control form-input" placeholder="Search" />
                </div>

                <div className="form d-none d-md-inline-block form-inline  me-lg-5"  style={{ margin: '30px'}} >
                <LanguageSelect />
                </div>
            </div>
            <div className="form d-none d-md-inline-block form-inline  me-0 me-md-5 ">
                <a href="#"><i className="bi bi-bell-fill noti_icon"></i></a>
            </div>
            <div className="main">
         </div>

            <ul id="#profile_box" className="navbar-nav ms-auto ms-md-0 me-3 me-lg-5 ">
                <li className="nav-item dropdown ">
                    <a className="nav-link  d-flex profile_box p-0" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {data.profile_pic != '' ?
                    <img className="previewimg" src={data.profile_pic} alt="UploadImage" />
                    : <img className="previewimg" src={profileimg} alt="UploadImage" />

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
            <NavLink to="/cart">Cart ({totalItems})</NavLink>

        </nav>


    )
}
