import React, { useState ,useEffect} from "react";
import Navbar from '../common/header/Navbar';
import Sidebar from '../common/header/Sidebar';
import { API_URL } from "../common/api/constant";
import { UPDATE_STATUS } from "../common/api/constant";
import { GETDATA } from "../common/api/constant";
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";

import moment from 'moment' ;

export default function Subscription2() {

  const [data, setData] = useState([]);
  const [newdata, setNewdata] = useState([]);
  const userid = localStorage.getItem('USER_ID');
  const { t } = useTranslation();

  useEffect(() => {

    fetch(`${API_URL}/${GETDATA}`)
    .then((res) => res.json())
    .then((newdata) => {
      setNewdata(newdata);
    })
    .catch((err) => {
      console.log(err);
    });
    
  fetch(`${API_URL}/${UPDATE_STATUS}/`+userid)
      .then((res) => res.json())
      .then((data) => {
        setData(data.response);
        console.log(data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  
const end_date = "";
  return (
    <div className="sb-nav-fixed">


      <Navbar />

      <div id="layoutSidenav">

        <Sidebar /> <div id="layoutSidenav_content">
          <div className="pt-4 pb-5">
            <main>
              <div className="containar-fluid px-5">

                <div className="subscription" style={{ marginLeft: '100px' }}>

                  <div className="row subs_main_row d-flex justify-content-center">


                    <div className="row ">
                      <div className="col-md-3">
                        <p className="subs_head mb-0">{t("subscription_types")}</p>
                      </div>
                      <div className="col-md-3 text-center">
                        <p className="subs_head mb-0">{t("payment")}</p>
                      </div>
                      <div className="col-md-3 text-center">
                        <p className="subs_head mb-0">{t("due_date")}</p>
                      </div>
                    </div>
                    {newdata.map((item) => (
                    <div className="row subs_line">
                      <div className="col-md-3">
                        <p className="type_pra mb-0">{item.type}</p>
                      </div>
                      <div className="col-md-3 text-center">
                        <p className="pay_pra mb-0 ">{item.payment}{item.currency}</p>
                      </div>
                      {data.subscription_id == item.id ? ( 
                      <div className="col-md-3  text-center">
                            {
                             data.formatted_end_date 
                           }
                         </div>):(
                           <div className="col-md-3  text-center">
                        </div>
                         )}
                     
                        {data.subscription_id == item.id ? ( 
                          
                          <div className="col-md-3 text-center">
                        <a href="#" className="text-decoration-none subsscribed">Susbscribed</a>
                        </div>):(
                        <div className="col-md-3 text-center">
                       <Link className="btn btn-primary"  to={{ pathname: `/checkout/${item.id}`}}>Pay</Link>
                      </div>)}
                      
                        <p className="pay_pra mb-0"></p>
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
