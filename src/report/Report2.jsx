import React from 'react';
import Navbar from "../common/header/Navbar";
import Sidebar from "../common/header/Sidebar";

export default function Report2() {
    return (

 <div className="sb-nav-fixed">

            <Navbar />

            <div id="layoutSidenav">

                <Sidebar />

                <div id="layoutSidenav_content">
                    <div className="pt-4 pb-5">
                        <main>
                            <p className="mb-0 pr-5 local_crd_title px-5">LOCAL CREDIT REPORT / ENHANCED LOCAL CREDIT REPORT</p>
                            <div className="containar-fluid px-5 ">

                                <div className="row">

                                    <p className="local_crd_report mt-3 mb-0">Local Credit Report is a comprehensive current/updated business intelligence report that evaluates and assesses a company's financial health and payment credibility. In an Enhanced Local Credit Report, due diligence on operational aspects of the requested company will be conducted.<br />
                                        Local Credit Report includes: </p>
                                    <p className="local_crd_report_blue">. Type of Company . Company Name . Date of Incorporation . Registration Number . Registered Address . Registered Activities . Capital Structure . Key Personnel Profile . Shareholder (s) Details . Officer (s) Details . Litigation Trace . Singapore 1000/SME 1000/FG 50 Ranking . Banker (s) / Financier (s) . Bank Charges . Payment Profile . Subsidiary (ies) / Associate (s) . Latest Financial Figures . Financial and Ratio Analyses . Performance Charts / Graphs . Credit Opinions</p>

                                    <p className="local_crd_report_blue mb-0">Note :</p>
                                    <p className="local_crd_report">  1-  Working days excludes Saturdays, Sundays and Public Holidays.<br />
                                        2-  All the information above are subjected to availability and filing requirements of country.<br />
                                        3-  Once order is confirmed, full price is chargeable.<br />
                                        4-  All reports are delivered in English, otherwise specified.</p>

                                    <p className="local_crd_report_blue mb-0">If no financial is available, operational information will be provided under Enhanced Local Credit Report.</p>
                                    <p className="local_crd_report">Enhanced Reports conducted previously will be available for retrieval under Online Database Report. The date of report preparation will be displayed.</p>

                                </div>

                                <div className="row mt-5">
                                    <div className="table-responsive">

                                        <table className="table text-center">
                                            <tr>
                                                <th className="table_border">Type of Report</th>
                                                <th className="table_border">Turn around Time</th>
                                                <th className="table_border">Price</th>
                                                <th className="table_border">Delivery Mode</th>
                                            </tr>
                                            <tr>
                                                <td className="table_border">Local Credit Report (SGPFLH)</td>
                                                <td className="table_border">1 working day</td>
                                                <td className="table_border">SGD150.29</td>
                                                <td className="table_border">Online Retrieval</td>
                                                <td className="td_buton"><button type="button" className="btn ">Sample</button></td>
                                            </tr>
                                            <tr>
                                                <td className="table_border">Enhanced Local Credit Report(SGPEXM)	</td>
                                                <td className="table_border">5 working days</td>
                                                <td className="table_border">SGD258.94</td>
                                                <td className="table_border">Online Retrieval</td>
                                                <td className="td_buton"><button type="button" className="btn ">Sample</button></td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>


                                <div className="order_btn mt-3">
                                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Order Now</button>
                                </div>



                                <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                    <div className="modal-dialog modal-dialog-centered">
                                        <div className="modal-content">
                                            <div className="modal-header d-flex justify-content-center">
                                                <p className="modal-title modal_head_title" id="staticBackdropLabel">Recipt</p>
                                            </div>
                                            <div className="modal-body">
                                                <p className="subs_pakage mb-1">Subscription Pakage:</p>
                                                <p className="basic_subs">Basic Subscription</p>
                                                <p className="subs_pakage mb-1">Report Title:</p>
                                                <p className="basic_subs">LOCAL CREDIT REPORT / ENHANCED LOCAL CREDIT REPORT</p>
                                                <p className="subs_pakage mb-1">Type of Report:</p>
                                                <p className="basic_subs mb-1">1-  Local Credit Report (SGPFLH)</p>
                                                <p className="basic_subs">2- Enhanced Local Credit Report(SGPEXM)	</p>

                                            </div>

                                            <div className="modal-body_pra_clr">
                                                <div className="row">
                                                    <p className="mb-0 ">Please Check your email (Downloaded Report sent on your email)</p>
                                                </div>
                                            </div>

                                            <div className="modal_btn_cntn">
                                                <div className="row">
                                                    <button type="button" className="btn pop_up_btn" data-bs-dismiss="modal">Save Receipt</button>
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
        </div>

    )
}
