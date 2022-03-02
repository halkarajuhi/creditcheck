import React, { useState, useEffect } from "react";
import '../../assets/css/main.css';
import "bootstrap/dist/css/bootstrap.min.css";
import dashboard_gr from "../../assets/img/icon/dashboard_gr.png";
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { API_URL, SHOWCOUNT, UPDATECOUNT } from "../api/constant";

export default function Sidebar() {
    const location = useLocation();
    const { pathname } = location;
    const splitLocation = pathname.split("/");

    const userid = localStorage.getItem('USER_ID');

    const [count, setCount] = useState('');

    useEffect(() => {
        
     fetch(`${API_URL}/${SHOWCOUNT}/` + userid)
            .then((res) => res.json())
            .then((data) => {
                setCount(data.response.total_unread);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    function updateCount() {

        fetch(`${API_URL}/${UPDATECOUNT}/` + userid, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },

        }).then((res) => res.json())
            .then((data) => {
                console.log(data.response);
            })
            .catch(err => {
            });
        fetch(`${API_URL}/${SHOWCOUNT}/` + userid)
            .then((res) => res.json())
            .then((data) => {
                setCount(data.response.total_unread);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (

        <div id="layoutSidenav_nav">
            <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                <div className="sb-sidenav-menu">
                    <div className="nav">
                        <Link className="nav-link collapsed" to="/">
                            <div className="sb-nav-link-icon"><img className={`mb-0 mt-1 ${splitLocation[1] === "dashboard" ? "active_db" : ""}`} src={dashboard_gr} alt="" srcset="" /></div>
                            <p className={`mb-0 mt-1 ${splitLocation[1] === "dashboard" ? "active_db" : ""}`}>Dashboard</p>
                        </Link>
                        <Link className="nav-link collapsed" to="/profile">
                            <div className=" sb-nav-link-icon "><i className={`bi bi-people-fill ml- ${splitLocation[1] === "profile" ? "active_db" : ""}`}></i></div>
                            <p className={`mb-0 mt-1 ${splitLocation[1] === "profile" ? "active_db" : ""}`} >Profile</p>
                        </Link>

                        <Link className="nav-link collapsed" to="/payment">
                            <div className="sb-nav-link-icon"><i className={`far fa-credit-card ${splitLocation[1] === "payment" ? "active_db" : ""}`}></i></div>
                            <p className={`mb-0 mt-1 ${splitLocation[1] === "payment" ? "active_db" : ""}`}> Payments</p>
                        </Link>
                        <Link className="nav-link" to="/chat">
                            <div className="sb-nav-link-icon"><i className={`fas fa-hands-helping ${splitLocation[1] === "chat" ? "active_db" : ""}`}></i></div>
                            <p className={`mb-0 mt-1 ${splitLocation[1] === "chat" ? "active_db" : ""}`} onClick={updateCount}> Chat  {count}</p>
                        </Link>
                        <Link className="nav-link" to="/subscription2">
                            <div className="sb-nav-link-icon text-center"><i className={`fas fa-check-double pt-1 ${splitLocation[1] === "subscription2" ? "active_db" : ""}`}></i></div>
                            <p className={`mb-0 mt-1 ${splitLocation[1] === "subscription2" ? "active_db" : ""}`}>Subscriptions</p>
                        </Link>
                        <Link className="nav-link" to="/report1">
                            <div className="sb-nav-link-icon text-center"><i className={`fas fa-bars pt-1 ${splitLocation[1] === "report1" ? "active_db" : ""}`}></i></div>
                            <p className={`mb-0 mt-1 ${splitLocation[1] === "report1" ? "active_db" : ""}`}>Reports</p>
                        </Link>
                        <Link className="nav-link" to="/FAQ">
                            <div className="sb-nav-link-icon text-center"><i className={`bi bi-question-square-fill ${splitLocation[1] === "FAQ" ? "active_db" : ""}`}></i></div>
                            <p className={`mb-0 mt-1 ${splitLocation[1] === "FAQ" ? "active_db" : ""}`}>FAQ</p>
                        </Link>
                        <Link className="nav-link" to="/aboutus">
                            <div className="sb-nav-link-icon text-center"><i className={`bi bi-person-fill ${splitLocation[1] === "aboutus" ? "active_db" : ""}`}></i></div>
                            <p className={`mb-0 mt-1 ${splitLocation[1] === "aboutus" ? "active_db" : ""}`}>About us</p>
                        </Link>
                    </div>
                </div>
            </nav>
        </div>

    )
}
