import React, { useState, useEffect } from "react";
import Navbar from '../common/header/Navbar';
import Sidebar from '../common/header/Sidebar';
import { Link, useParams } from 'react-router-dom';
import { API_URL, GETALLUSER, USERUPDATE } from "../common/api/constant";



export default function Showuser() {

    const [userdata, setUserdata] = useState([]);
    const ids = useParams();

  
    useEffect(() => {
        fetch(`http://localhost:5000/users/getsingledata/`+ids.id)
            .then((res) => res.json())
            .then((data) => {
                setUserdata(data.response);
               
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

   
  
      return (
        <div class="sb-nav-fixed">
            <Navbar />
            <div id="layoutSidenav">
                <Sidebar />
                <div id="layoutSidenav_content">
                    <div className="card">
                        <div className="card-body">
                       
                            <div className="form-group row ">
                                <label for="exampleInputEmail2 " className="show_user_lable col-sm-2 col-form-label">Firstname :</label>
                                <div className="col-sm-7">
                                {userdata.firstname}
                                </div>
                            </div>
                            <div class="form-group row ">
                                <label for="exampleInputEmail2" className="show_user_lable col-sm-2 col-form-label">Lastname :</label>
                                <div className="col-sm-7">
                                {userdata.lastname}
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="exampleInputPassword2" className="show_user_lable col-sm-2 col-form-label">Email :</label>
                                <div className="col-sm-7">
                                {userdata.email}
                                </div>
                            </div>
                            <div className="form-group row ">
                                <label for="exampleInputEmail2" className="show_user_lable col-sm-2 col-form-label">Mobile Number :</label>
                                <div className="col-sm-7">
                                {userdata.mobile_no}
                                </div>
                            </div>
                            <div className="form-group row ">
                                <label for="exampleInputEmail2" className="show_user_lable col-sm-2 col-form-label">Address :</label>
                                <div className="col-sm-7">
                                {userdata.address}
                                </div>
                            </div>
                            <div className="form-group row ">
                                <label for="exampleInputEmail2" className="show_user_lable col-sm-2 col-form-label">Nationality :</label>
                                <div className="col-sm-7">
                                {userdata.nationality}
                                </div>
                            </div>
                            <div className="form-group row ">
                                <label for="exampleInputEmail2" className="show_user_lable col-sm-2 col-form-label">Industry :</label>
                                <div className="col-sm-7">
                                {userdata.industry}
                                </div>
                            </div>
                            <div className="form-group row ">
                                <label for="exampleInputEmail2" className="show_user_lable col-sm-2 col-form-label">State :</label>
                                <div className="col-sm-7">
                                {userdata.state}
                                </div>
                            </div>
                            <div className="form-group row ">
                                <label for="exampleInputEmail2" className="show_user_lable col-sm-2 col-form-label">Country :</label>
                                <div className="col-sm-7">
                                {userdata.country}
                                </div>
                            </div>
                        </div>
                  </div>
                </div>
            </div>

        </div>

    )
}







