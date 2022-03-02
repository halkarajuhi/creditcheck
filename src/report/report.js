import React, { useState, useEffect } from "react";
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
import ShopContext from "../context/shop-context";


export default function Report1() {

  const [searchValue, setSearchValue] = useState("");
  const [showModal, setShow] = useState(false);

  const [datareport, setDatareport] = useState('');

  const [reporthead, setReporthead] = useState([]);
  const { t } = useTranslation();


  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setShow(true);

    showdata(id)
  }

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

    <ShopContext.Consumer>
      {context => (
        <React.Fragment>
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
    //                 <input  type="text" placeholder="Search Anything" onChange={(e) => setSearchValue(e.target.value)}/>
    //                 <button> search </button>
    //               </div> */}
                              <div className="form d-none d-md-inline-block form-inline form_search me-0 me-md-3 my-2 my-md-0">
                                <i className="bi bi-search"></i>
                                <input type="text" className="form-control form-input" placeholder="Search Anything" onChange={(e) => setSearchValue(e.target.value)} />
                              </div>

                            </div>
                          </div>
                          <hr style={{ color: 'black' }} />
                          <Navbar
                            cartItemNumber={context.cart.reduce((count, curItem) => {
                              return count + curItem.quantity;
                            }, 0)}
                          />
                          <main className="products">
                            <ul>
                              {context.products.map(product => (
                                <li key={product.id}>
                                  <div>
                                    <strong>{product.heading}</strong> - ${product.price}
                                  </div>
                                  <div>
                                    <button
                                      onClick={context.addProductToCart.bind(this, product)}
                                    >
                                      Add to Cart
                                    </button>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </main>

                        </div>
                      </div>
                    </div>
                  </div>
                </main>
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </ShopContext.Consumer>








  )
}
