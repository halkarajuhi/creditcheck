import React, { useState, useEffect, useRef } from "react";
import '../assets/css/main.css';
import Navbar from '../common/header/Navbar';
import Sidebar from '../common/header/Sidebar';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal, Button, Table } from "react-bootstrap";
import Get_previousname from "./Get_previousname";
import Head_office from "./Head_office";
import Key_personel from "./Key_personel";
import Bussiness_record from "./Bussiness_record";
import Shareholder_information from "./Shareholder_information";
import Enterprise_info from "./Enterprise_info";
import Enterprise_basic_info from "./Enterprise_basic_info";
import Foreign_investment from "./Foreign_investment";
import Annual_report from "./Annual_report";
import Enterprise from "./Enterprise";
import Shareholding_change from "./Shareholding_change";
import Taxpayer_identification from "./Taxpayer_identification";
import Searches from "./Searches";
import Branch_related from "./Branch_related";
import Basic_info from "./Basic_info";
import Corporate from "./Corporate";
import { useTranslation } from "react-i18next";
import { useCart } from "react-use-cart";


export default function Report1() {

  const [searchValue, setSearchValue] = useState("");
  const [showModal, setShow] = useState(false);

  const [datareport, setDatareport] = useState('');

  const [reporthead, setReporthead] = useState([]);
  const { t } = useTranslation();

  const { addItem } = useCart();
  const handleClose = () => setShow(false);
  const [disable, setDisable] = useState(false);

  const handleShow = (id) => {
    setShow(true);
 showdata(id)
  }
  const { items,
    totalItems,
  } = useCart();

  useEffect(() => {
    fetch('http://localhost:5000/reportapi/getdata')
      .then((res) => res.json())
      .then((newdata) => {
        setReporthead(newdata);
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);
localStorage.setItem('searchvalue',searchValue)


  const showdata = async (id) => {
    try {
      const response = await fetch('http://localhost:5000/reportapi/singledata/' + id, {
        method: "GET"
      })
        .then(response => response.json())
        .then(data => {
          setDatareport(data)

        })
    }
    catch (e) {
      console.log(e)
    }
  }
  return (
    <div className="sb-nav-fixed">

      <Navbar totalItems={totalItems} />
      <div id="layoutSidenav">
        <Sidebar />
        <div id="layoutSidenav_content">
          <div className="pt-4 pb-5">
            <main>
              <div className="containar-fluid px-5">

                <ul className="nav nav-pills mb-3 d-flex justify-content-center" id="pills-tab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button className="nav-link china_btn active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">China</button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button className="nav-link singapore_btn" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Singapore</button>
                  </li>
                </ul>


                <div className="tab-content" id="pills-tabContent">
                  <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                    <div className="row">
                      <div className="row">
                        <div className="col-md-4">
                          <p className="content_title">CONTENTS</p>
                        </div>
                        <div className="col-md-6 content_search">
                          {/* <div className = "searchBar">
                    <input  type="text" placeholder="Search Anything" onChange={(e) => setSearchValue(e.target.value)}/>
                    <button> search </button>
                  </div> */}
                          <div className="form d-none d-md-inline-block form-inline form_search me-0 me-md-3 my-2 my-md-0">
                            <i className="bi bi-search"></i>
                            <input type="text" className="form-control form-input" placeholder="Search Anything" onChange={(e) => setSearchValue(e.target.value)} />
                          </div>

                        </div>

                      </div>
                      <hr style={{ color: 'black' }} />
                      <>
                        {searchValue == '' ? <><p>Please Search with company Name</p></> :

                          <div className="col-md-6">
                            {reporthead.map((item, index) => (
                              <div>
                                <p className="report_head" onClick={() => handleShow(item.id)}>{index + 1}.{item.heading}</p>
                                <p className="report_txt">.	{t("company_id")}<br />
                                  .	{t("staff_id")} <br />
                                  .{t("staff_name")} <br />
                                </p>
                                <button
                                  className="btn btn-success" disabled={disable}
                                  onClick={() => addItem(item)}
                                >
                                  Add To Cart
                                </button>
                              </div>
                            ))}

                          </div>}</>




                      {/* <Key_personel searchdata = {searchValue} reportdata =  {reporthead}  /> */}

                      {/* <Shareholder_information searchdata = {searchValue}/>
                      <Bussiness_record  searchdata = {searchValue} />

                      <Enterprise_info  searchdata = {searchValue} />
                      <Enterprise_basic_info searchdata = {searchValue}/> 
                       
                        
                       <Foreign_investment searchdata = {searchValue}/>

                       <Annual_report searchdata = {searchValue}/>

                      <Enterprise searchdata = {searchValue}/> */}


                      {/* 
                      <div className="col-md-6">

                        <Corporate searchdata={searchValue} />
                        <Shareholding_change searchdata={searchValue} />

                        <Taxpayer_identification searchdata={searchValue} />

                        <Searches searchdata={searchValue} />

                        <Branch_related searchdata={searchValue} />

                        <Basic_info searchdata={searchValue} />
                        <Get_previousname searchdata={searchValue} />
                        <Head_office searchdata={searchValue} />
                      </div> */}

                    </div>
                  </div>



                  <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab"><div className="row">
                    <p className="content_title">CONTENTS</p>
                    <hr style={{ color: 'black' }} />

                    <div className="col-md-6">
                      <p className="report_head">1.	COMPANY RELATED SEARCHES</p>
                      <p className="report_txt">.	Business Profile <br />
                        .	Corporate Search <br />
                        .	Experian SME Network Score <br />
                        .	Local Credit Report <br />
                        .	DP Credit Rating Report <br />
                        .	Singapore Industry Statistics <br />
                        .	Other Searches(for Package Members & Subscribers)
                      </p>

                      <p className="report_head">2.	LEGAL BENEFICIAL OWNERSHIP</p>
                      <p className="report_txt">.	Legal Beneficial Ownership Search (for Package Members & Subscribers)<br />
                        .	Corporate Tree Search 360 (for Package Members & Subscribers)
                      </p>

                      <p className="report_head">3.	PROPERTY RELATED SEARCHES</p>
                      <p className="report_txt">.	Enhanced Property Search(for Package Members & Subscribers) <br />
                        .	Land Title Search(for Package Members & Subscribers)
                      </p>

                      <p className="report_head">4.	PROPERTY RELATED SEARCHES</p>
                      <p className="report_txt">.	Enhanced Property Search(for Package Members & Subscribers) <br />
                        .	Land Title Search(for Package Members & Subscribers)
                      </p>

                      <p className="report_head">5.	PROPERTY RELATED SEARCHES</p>
                      <p className="report_txt">.	Enhanced Property Search(for Package Members & Subscribers) <br />
                        .	Land Title Search(for Package Members & Subscribers)
                      </p>

                      <p className="report_head">6.	PROPERTY RELATED SEARCHES</p>
                      <p className="report_txt">.	Enhanced Property Search(for Package Members & Subscribers) <br />
                        .	Land Title Search(for Package Members & Subscribers)
                      </p>

                      <p className="report_head">7.	PROPERTY RELATED SEARCHES</p>
                      <p className="report_txt">.	Enhanced Property Search(for Package Members & Subscribers) <br />
                        .	Land Title Search(for Package Members & Subscribers)
                      </p>

                      <p className="report_head">8.	PROPERTY RELATED SEARCHES</p>
                      <p className="report_txt">.	Enhanced Property Search(for Package Members & Subscribers) <br />
                        .	Land Title Search(for Package Members & Subscribers)
                      </p>
                    </div>
                    <div className="col-md-6">

                      <p className="report_head">9.	INDIVIDUAL RELATED SEARCHES</p>
                      <p className="report_txt">.	Enhanced Individual Search<br />
                        .	Individual Business Search<br />
                        .	Total Individual Check<br />
                        .	People's Profile Information
                      </p>

                      <p className="report_head">10.		MONITORING & OTHER SERVICES</p>
                      <p className="report_txt">(Subscription-based Information)<br />
                        .	Credit Monitoring Service<br />
                        .	Business Watch Service<br />
                        .	Experian Non-Bank Bureau Service<br />
                        .	Schedule Court Hearing
                      </p>

                      <p className="report_head">11.	FINANCIAL RELATED SEARCHES</p>
                      <p className="report_txt">.	Financial Online With Notes<br />
                        .	Financial Online Without Notes<br />
                        .	Financial Profile Analysis
                      </p>

                      <p className="report_head">12.	FINANCIAL RELATED SEARCHES</p>
                      <p className="report_txt">.	Financial Online With Notes<br />
                        .	Financial Online Without Notes<br />
                        .	Financial Profile Analysis
                      </p>

                      <p className="report_head">13.	FINANCIAL RELATED SEARCHES</p>
                      <p className="report_txt">.	Financial Online With Notes<br />
                        .	Financial Online Without Notes<br />
                        .	Financial Profile Analysis
                      </p>

                      <p className="report_head">14.	FINANCIAL RELATED SEARCHES</p>
                      <p className="report_txt">.	Financial Online With Notes<br />
                        .	Financial Online Without Notes<br />
                        .	Financial Profile Analysis
                      </p>
                    </div>
                  </div>
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
