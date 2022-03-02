import React, { useState, useEffect } from "react";
import '../../assets/css/main.css';
import "bootstrap/dist/css/bootstrap.min.css";
import dashboard_gr from "../../assets/img/icon/dashboard_gr.png";
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";


export default function Sidebar() {
    const location = useLocation();
    const { pathname } = location;
    const splitLocation = pathname.split("/");
    
    return (

        <div id="layoutSidenav_nav">
            <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                <div className="sb-sidenav-menu">
                    <div className="nav">
                        <Link   className="nav-link collapsed" to="/">
                            <div className="sb-nav-link-icon"><img  className={`mb-0 mt-1 ${splitLocation[1] === "dashboard" ? "active_db" : ""}`} src={dashboard_gr} alt="" srcset="" /></div>
                            <p  className={`mb-0 mt-1 ${splitLocation[1] === "dashboard" ? "active_db" : ""}`}>Dashboard</p>
                        </Link>
                        <Link className="nav-link" to="/profile">
                            <div className="sb-nav-link-icon text-center"><i className={`fas fa-check-double pt-1 ${splitLocation[1] === "profile" ? "active_db" : ""}`}></i></div>
                            <p className={`mb-0 mt-1 ${splitLocation[1] === "profile" ? "active_db" : ""}`}>Profile</p>
                        </Link>
                        <Link  className="nav-link collapsed" to="/Showfaq">
                            <div className=" sb-nav-link-icon "><i  className={`bi bi-people-fill ml-1 ${splitLocation[1] === "Showfaq" ? "active_db" : ""}`}></i></div>
                            <p className={`mb-0 mt-1 ${splitLocation[1] === "Showfaq" ? "active_db" : ""}`} >Show FAQ</p>
                        </Link>

                        <Link  className="nav-link collapsed" to="/chat">
                            <div className="sb-nav-link-icon"><i  className={`far fa-credit-card ${splitLocation[1] === "chat" ? "active_db" : ""}`}></i></div>
                            <p className={`mb-0 mt-1 ${splitLocation[1] === "chat" ? "active_db" : ""}`}>Chat</p>
                         </Link> 
                         <Link   className="nav-link" to="/users">
                            <div className="sb-nav-link-icon"><i  className={`fas fa-hands-helping ${splitLocation[1] === "users" ? "active_db" : ""}`}></i></div>
                            <p className={`mb-0 mt-1 ${splitLocation[1] === "users" ? "active_db" : ""}`}> Users</p>
                        </Link>
                        
                       <Link  className="nav-link" to="/addreport">
                            <div className="sb-nav-link-icon text-center"><i  className={`fas fa-bars pt-1 ${splitLocation[1] === "addreport" ? "active_db" : ""}`}></i></div>
                            <p className={`mb-0 mt-1 ${splitLocation[1] === "addreport" ? "active_db" : ""}`}>Reports</p>
                        </Link> 
                        {/* <Link  className="nav-link" to="/FAQ">
                            <div className="sb-nav-link-icon text-center"><i className={`bi bi-question-square-fill ${splitLocation[1] === "FAQ" ? "active_db" : ""}`}></i></div>
                            <p className={`mb-0 mt-1 ${splitLocation[1] === "FAQ" ? "active_db" : ""}`}>FAQ</p>
                        </Link>
                        <Link  className="nav-link" to="/aboutus">
                            <div className="sb-nav-link-icon text-center"><i  className={`bi bi-person-fill ${splitLocation[1] === "aboutus" ? "active_db" : ""}`}></i></div>
                            <p className={`mb-0 mt-1 ${splitLocation[1] === "aboutus" ? "active_db" : ""}`}>About us</p>
                        </Link>    */}
                    </div>
                </div>
            </nav>
        </div>




    )
}
