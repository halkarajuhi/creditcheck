import React,{useState,useEffect} from 'react'
import { API_URL, GETREPORT ,DELETEREPORT} from "../common/api/constant";
import Navbar from '../common/header/Navbar';
import Sidebar from '../common/header/Sidebar';
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Table } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from 'react-router-dom';

export default function Showreport() {

    const [reportdata, setReportdata] = useState([]);
     useEffect(() => {
        fetch(`${API_URL}/${GETREPORT}`)
            .then((res) => res.json())
            .then((data) => {
                setReportdata(data.response)
                if(data.response){
                    toast.success("Success Notification !", {
                        position: toast.POSITION.TOP_CENTER
                      });
                }else{
                    toast.error("Error Notification !", {
                        position: toast.POSITION.TOP_LEFT
                      });
                    }
                })
            .catch((err) => {
                console.log(err);
            });      
    }, []);
  
    function SwalDelete(id) {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${API_URL}/${DELETEREPORT}/`+id,{
                    "headers": {
                        "content-type": "application/json",
                    },
                })
                    .then(res => {
                        window.location.reload();
                        console.log(res.data)
                    })

              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            }
           
          })
    }

  return (
    <div class="sb-nav-fixed">
          
      <Navbar />
            <div id="layoutSidenav">
                <Sidebar />
                <div id="layoutSidenav_content">
                    <div>
                    <Link className="btn btn-outline-primary btnclass"  to={{ pathname: `/Addfaq`}}>Add FAQ</Link>
                   
                        <Table responsive="xxl" striped bordered hover size="sm" className="m-3">
                            <thead>
                                <tr>
                                    <th>Sno.</th>
                                    <th>Report Heading</th>
                                    <th>Report Price</th>
                                     <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reportdata.map((data,index) => (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{data.heading}</td>
                                        <td>{data.price}</td>
                                         <td> <Link className="btn btn-edit btn-outline-primary"  to={{ pathname: `/editreport/${data.id}`}}>Edit</Link> 
                                         <button  class=" mt-1 btn btn-outline-danger" style={{marginLeft: '10px'}} onClick={() => SwalDelete(data.id)} >Delete</button></td>
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

