import React, { useState, useEffect } from "react";
import Navbar from '../common/header/Navbar';
import Sidebar from '../common/header/Sidebar';
import { Table,Button } from 'react-bootstrap';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import axios from 'axios';
import { Link ,useParams} from 'react-router-dom';
import { API_URL, USERSINGLE, USERUPDATE } from "../common/api/constant";

export default function Userlist() {

    const [detail, setDetail] = useState([]);
    const [active, setActive] = useState(0);
    

    useEffect(() => {
        fetch(`http://localhost:5000/users/getall`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data.response);
                setDetail(data.response)
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    async function updatestatus(id) {
        setActive(1)
        console.log(id)
       const activedata = { active }
      axios.put('http://localhost:5000/users/updatestatus/'+ id, activedata, {
            "headers": {
                "content-type": "application/json",
            },
        }).then(res => {
                console.log(res.data)
              });
    }
 return (
        <div class="sb-nav-fixed">
            <Navbar />
            <div id="layoutSidenav">
                <Sidebar />
                <div id="layoutSidenav_content">
                    <div>
                   
              <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Qno.</th>
                                    <th>Firstname</th>
                                    <th>Lastname</th>
                                    <th>Mobile</th>
                                    <th>Email</th>
                                    <th>Address</th>
                                    <th>status</th>
                                    <th>view</th>
                                </tr>
                            </thead>
                            <tbody>
                                {detail.map((data,index) => (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{data.firstname}</td>
                                        <td>{data.lastname}</td>
                                        <td>{data.mobile_no}</td>
                                        <td>{data.email}</td>
                                        <td>{data.address}</td>
                                        <td>
                                            {(data.status == 1) ? <BootstrapSwitchButton
                                        checked={true}
                                        onlabel='Active'
                                        offlabel='Inactive'
                                        onstyle="success" 
                                        size="sm"
                                        onChange={() => {
                                            updatestatus(data.user_id);
                                        }}/> : <BootstrapSwitchButton
                                        checked={false}
                                        onlabel='Active'
                                        offlabel='Inactive'
                                        onstyle="success" 
                                        size="sm"
                                        onChange={() => {
                                            updatestatus(data.user_id);
                                        }}
                                     />}
                                      </td>
                                      <td><Link className="btn btn-outline-primary btnclass"  to={{ pathname: `/showuser/${data.user_id}`}}>View</Link></td>
                                     </tr>
                                ))}
                            </tbody>
                        </Table>

                    </div>
                </div>
            </div>



        </div>

    )
}
