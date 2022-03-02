import React, { useState, useEffect } from 'react';
import Navbar from '../common/header/Navbar'
import Sidebar from '../common/header/Sidebar';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { API_URL, CHAT, SHOW } from "../common/api/constant";
import profileimg from '../assets/img/avtarimg.png';



export default function Chat() {

    const [users, setUsers] = useState([]);

    const [receiverid, setReceiverid] = useState('');
   
    const [message, setMessage] = useState('');
  

    const [userid, setUserid] = useState(localStorage.getItem('userid'));
  
    const detail = " ";
 
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/users/getall`)
            .then((res) => res.json())
            .then((data) => {
                setUsers(data.response)
            })
            .catch((err) => {
                console.log(err);
            });

            // getData()
    }, []);

  function getData(receiverid) {
        const recevid = {receiverid}
        setReceiverid(receiverid)
     setData([]);
        fetch(`${API_URL}/${SHOW}/` + userid  , {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(recevid)
        }).then((res) => res.json())
         .then((data) => {
          setData(data.response);

            })
            .catch((err) => {
                console.log(err);
            });
    }
    const validationSchema = Yup.object().shape({
        message: Yup.string()
            .required('please write some text')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    function submitData() {
        const detail ={ message ,userid,receiverid }
       
        fetch(`${API_URL}/${CHAT}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(detail)
        }).then((res) => res.json())
            .then((data) => {
                getData(detail.receiverid);
            })

            setMessage("")
    }
   
    return (
        <div className="sb-nav-fixed">
            <Navbar />
            <div id="layoutSidenav">
                <Sidebar />
                <div id="layoutSidenav_content">
                    <div className="pt-4 pb-5 px-4">
                        <main>
                            <div className="container ">
                                <div id="msenger" className="row ">
                                    <div className="col-md-4">
                                        <div className="card chat-app">
                                            <div id="plist" className="people-list">
                                                <ul className="list-unstyled chat-list mb-0">
                                                    {users.map((list) => {
                                                        return <li className="clearfix"  onClick={() => getData(list.user_id)}>
                                                            
                                                            { (list.profile_pic == '' || list.profile_pic == null) ?
                                                <img className="previewimg" src={profileimg} alt="UploadImage" />
                                                : <img className="previewimg" src={list.profile_pic} alt="avatar" />

                                            }
                                                        
                                                            <div className="about">
                                                               
                                                                <div className="name" >{list.firstname}{list.lastname}</div>
                                                            </div>
                                                        </li>
                                                    })}
                                                </ul>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="col-md-8">
                                       <div className="card-body msg_card_body">
                                            {data.map((list) => {
                                                return (list.sender_id == userid) ?
                                                    <div className="d-flex justify-content-start mb-4">
                                                        <div className="msg_cotainer">
                                                            <span className="msg_time">{list.new_day} * {list.new_date}</span>
                                                            {list.message}

                                                        </div>
                                                    </div>
                                                    : <div className="d-flex justify-content-end mb-4">
                                                        <div className="msg_cotainer_send">
                                                            <span className="msg_time_send">{list.new_day} * {list.new_date}</span>
                                                            {list.message}

                                                        </div>
                                                    </div>
                                            })}
                                        </div>
                                        <form>
                                            <div className="row">
                                                <div className="form-floating">
                                                    <textarea placeholder="Leave a comment here" id="floatingTextarea" name="message" value={message}{...register('message')} className={`form-control w-100 ${errors.message ? 'is-invalid' : ''}`} onChange={(e) => setMessage(e.target.value)}  ></textarea>
                                                    <div className="invalid-feedback">{errors.message?.message}</div>
                                                </div>

                                            </div>
                                            <button className='btn btn-primary  m-5' type='button' onClick={handleSubmit(submitData)}>submit</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>

            </div >
        </div >
    )
}
