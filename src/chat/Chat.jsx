import React, { useState, useEffect } from 'react';
import Navbar from '../common/header/Navbar'
import Sidebar from '../common/header/Sidebar';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { API_URL, CHAT, SHOW } from "../common/api/constant";

export default function Chat() {

    const [detail, setDetail] = useState({
        message: "",
        userid: localStorage.getItem('USER_ID')
    });
    const { message } = detail;

    const onInputChange = e => {
        setDetail({ ...detail, [e.target.name]: e.target.value });
    };
    const [data, setData] = useState([]);

    function getData() {
     
        fetch(`${API_URL}/${SHOW}/` + detail.userid)
            .then((res) => res.json())
            .then((data) => {
                setData(data.response);

            })
            .catch((err) => {
                console.log(err);
            });
    }
    useEffect(() => {
        getData()
    }, []);

    const validationSchema = Yup.object().shape({
        message: Yup.string()
            .required('please write some text')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    function submitData() {
       
        fetch(`${API_URL}/${CHAT}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(detail)
        }).then((res) => res.json())
            .then((data) => {
                getData();
            })
       
        restdata();
      }
    function restdata() {
        setDetail({ message: "" ,userid: localStorage.getItem('USER_ID')})
    }
    return (
        <div className="sb-nav-fixed">
         <Navbar />
            <div id="layoutSidenav">
              <Sidebar />
                <div id="layoutSidenav_content">
                    <div className="pt-4 pb-5 px-4">
                        <main>
                         <div className="card-body msg_card_body">
                              {data.map((list) => {
                                return    (list.sender_id == detail.userid) ?
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
 }   )}
                            </div>
                            <form>
                                <div className="row">
                                    <div className="form-floating">
                                        <textarea  placeholder="Leave a comment here" id="floatingTextarea" name="message" value={message}{...register('message')} className={`form-control w-100 ${errors.message ? 'is-invalid' : ''}`} onChange={e => onInputChange(e)}  ></textarea>
                                        <div className="invalid-feedback">{errors.message?.message}</div> 
                                    </div>
                                   
                                </div>
                                <button className='btn btn-primary  m-5' type='button' onClick={handleSubmit(submitData)}>submit</button>
                            </form>

                        </main>
                    </div>
                </div>
            </div >
        </div >
    )
}
