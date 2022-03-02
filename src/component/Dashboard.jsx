import React from 'react';
import Navbar from '../common/header/Navbar';
import Sidebar from '../common/header/Sidebar';
import { useTranslation } from "react-i18next";


export default function Dashboard() {
   const { t } = useTranslation();
  return (
    <div className="sb-nav-fixed">
          <Navbar/>
 <div id="layoutSidenav">
   <Sidebar/>  
<div id="layoutSidenav_content">
<main>

  <div className="containar-fluid ">
     <div className="row">
        <div className="col-md-8 px-5 left_row pt-5" style = {{marginLeft: '15%'}}>
        <div className="language-select">
    
      
    </div>
           <p className="dash_dr_pra">{t("You_Download_20_Reports_in_this_month")}</p>

            <div className="form d-none d-md-inline-block form-inline"> 
                 <select className="form-select dash_dr_slct " aria-label="Default select example"><i className="bi bi-caret-down-square-fill"></i>
                    <option selected>Last 30 days</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
            </div>
             
            <div>
                <div className="graph_img mt-3">
                    <img src="/assets/img/dashboard/graph_img.png" alt="" srcset=""/>
                </div>
            </div>

        
        <div className="row mt-4">
            <div className="col-md-7 report-1">
                <img src="/assets/img/dashboard/reports-1.png" alt="" srcset=""/>
            </div>
            <div className="col-md-5 report_issue">
                <img src="/assets/img/dashboard/report_issue.png" alt="" srcset=""/>
            </div>
        </div>
    </div>
        <div className="col-md-4"  style = {{marginLeft: '15%'}}>

            <div id="card_msg" className="login_page pt-5">
                <div className="main_card">
                    <div className="app-title pb-2">
                    <p>Messages</p>
                    <hr style={{border: '1px solid #E0E0E0'}}/>
                    </div>
                    
                    <div className="msg_card_1 msg_card">
                        <div className="row">
                           <div className="col-md-6">
                              <img src="/assets/img/dashboard/j.png"/>
                           </div>
                           <div className="col-md-6">
                            <p className="msg_crd_date pt-2 mb-0">Jan 2 , 12:31pm</p>
                           </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col-md-9">
                               <p className="msg_name mb-0">James Robinson</p>
                               <p className="msg_txt mb-0">I need some maintenac...</p>
                            </div>
                            <div className="col-md-3">
                               <a href="#"><i className="bi bi-chevron-right"></i></a> 
                            </div>
                         </div>
                    </div>
                    <div className="msg_card_2 mt-2 msg_card">
                        <div className="row">
                           <div className="col-md-6">
                              <img src="/assets/img/dashboard/e.png"/>
                           </div>
                           <div className="col-md-6">
                            <p className="msg_crd_date pt-2 mb-0">Jan 2 , 12:31pm</p>
                           </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col-md-9">
                               <p className="msg_name mb-0">James Robinson</p>
                               <p className="msg_txt mb-0">I need some maintenac...</p>
                            </div>
                            <div className="col-md-3">
                               <a href="#"><i className="bi bi-chevron-right"></i></a> 
                            </div>
                         </div>
                    </div>
                    <div className="msg_card_3 mt-2 msg_card">
                        <div className="row">
                           <div className="col-md-6">
                              <img src="/assets/img/dashboard/j.png"/>
                           </div>
                           <div className="col-md-6">
                            <p className="msg_crd_date pt-2 mb-0">Jan 2 , 12:31pm</p>
                           </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col-md-9">
                               <p className="msg_name mb-0">James Robinson</p>
                               <p className="msg_txt mb-0">I need some maintenac...</p>
                            </div>
                            <div className="col-md-3">
                               <a href="#"><i className="bi bi-chevron-right"></i></a> 
                            </div>
                         </div>
                    </div>
                    <div className="msg_card_4 mt-2 msg_card">
                        <div className="row">
                           <div className="col-md-6">
                              <img src="/assets/img/dashboard/l.png"/>
                           </div>
                           <div className="col-md-6">
                            <p className="msg_crd_date pt-2 mb-0">Jan 2 , 12:31pm</p>
                           </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col-md-9">
                               <p className="msg_name mb-0">James Robinson</p>
                               <p className="msg_txt mb-0">I need some maintenac...</p>
                            </div>
                            <div className="col-md-3">
                               <a href="#"><i className="bi bi-chevron-right"></i></a> 
                            </div>
                         </div>
                    </div>
                    <div className="msg_card_5 mt-2 msg_card">
                        <div className="row">
                           <div className="col-md-6">
                              <img src="/assets/img/dashboard/g.png"/>
                           </div>
                           <div className="col-md-6">
                            <p className="msg_crd_date pt-2 mb-0">Jan 2 , 12:31pm</p>
                           </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col-md-9">
                               <p className="msg_name mb-0">James Robinson</p>
                               <p className="msg_txt mb-0">I need some maintenac...</p>
                            </div>
                            <div className="col-md-3">
                               <a href="#"><i className="bi bi-chevron-right"></i></a> 
                            </div>
                         </div>
                    </div>

                </div>
            </div>

        </div>
     </div>
  </div>

</main>
</div>


</div>     

    </div>
  )
}
