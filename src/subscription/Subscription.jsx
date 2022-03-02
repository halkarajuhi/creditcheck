
import React, { useState ,useEffect} from "react";
import Navbar from '../common/header/Navbar';
import Sidebar from '../common/header/Sidebar';
import Stripeapp from '../stripe/App';
import { Link } from 'react-router-dom';
import { API_URL } from "../common/api/constant";
import { GETDATA } from "../common/api/constant";
import {useNavigate} from 'react-router-dom';
import { useTranslation } from "react-i18next";

export default function Subscription() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [data, setData] = useState([]);
    const [id, setId] = useState([]);
  
              useEffect(() => {
                fetch(`${API_URL}/${GETDATA}`)
                  .then((res) => res.json())
                  .then((data) => {
                    setData(data);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }, []);

 
            //   console.log(data[0].id);
    return (
        <div className="sb-nav-fixed">

            <Navbar />

            <div id="layoutSidenav">

                <Sidebar />


                <div id="layoutSidenav_content">
                    <div className="pt-4 pb-5">
                        <main>
                            <div className="containar-fluid px-5">

                                <div className="subscription">

                                    <div className="row subs_main_row d-flex justify-content-center">



                                        <div className="row ">
                                            <div className="col-md-4">
                                                <p className="subs_head mb-0">{t("subscription_types")}</p>
                                            </div>
                                            <div className="col-md-4">
                                                <p className="subs_head mb-0">{t("payment")}</p>
                                            </div>
                                        </div>

                                        
                                       {data.map((item) => (
                                          <div className="row subs_line">
                                            <div className="col-md-4">
                                                <p className="type_pra mb-0">{item.type}</p>
                                            </div>
                                            <div className="col-md-4">
                                                <p className="pay_pra mb-0">{item.payment}{item.currency}</p>
                                            </div>
                                          
                                            <div className="col-md-4 text-center">
                                                <Link className="btn btn-primary"  to={{ pathname: `/checkout/${item.id}`}}>Pay</Link>
                                            </div>
                                        </div>
                                         )) }

                                       

                                    </div>

                                </div>

                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </div>
    )
}
