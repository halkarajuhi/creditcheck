import React from 'react';

import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from 'react-router-dom';


export default function Header() {
  return (
    <div>
          <nav className="navbar navbar-expand-lg navbar-light header_bg">
                <div className="container-fluid">
                    <Link className="navbar-brand" to = {"/"}><img src="assets/img/logo.png" className=" logo" alt="" /></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item ">
                                <Link className="nav-link text-light " aria-current="page" to ="/">Home</Link>
                               
                            </li>
                            <span className="white_line"></span>
                            <li className="nav-item">
                                <a className="nav-link text-light" href="#">About</a>
                            </li>
                            <span className="white_line"></span>
                            <li className="nav-item">
                                <a className="nav-link text-light ">Chat</a>
                            </li>
                            <span className="white_line"></span>
                            <li className="nav-item">
                                <a className="nav-link text-light">FAQ</a>
                            </li>
                        </ul>
                        <ul className="navbar-nav m-auto mb-2">
                            <li className="nav-item">
                                <a className="nav-link text-light" aria-current="page" href="#">Help</a>
                            </li>
                            <span className="white_line"></span>
                            <li className="nav-item">
                                <a className="nav-link text-light" href="#">News</a>
                            </li>
                            <span className="white_line"></span>
                            <li className="nav-item">
                                <a className="nav-link text-light">English</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

  <section id="topbar" className=" d-flex align-items-center ">
                <div className="container">

                    <div className="row ">
                        <div className="col-md-6 m-auto">
                            <div className="justify-content-center topbar_nav">
                                <a href="#" className="text-decoration-none top_txt">File</a>
                                <a href="#" className="text-decoration-none top_txt">Pay</a>
                                <a href="#" className="text-decoration-none top_txt">Refund</a>
                                <a href="#" className="text-decoration-none top_txt">Credit</a>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="d-flex justify-content-center align-items-center p-2">
                                <div className="form">
                                    <i className="bi bi-search text-black"></i>
                                    <input type="text" className="form-control form-input" placeholder="Search" />
                                    <span className="left-pan">
                                        <i className="bi bi-mic-fill text-black"></i>
                                    </span>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </section>
      
    </div>
  )
}
