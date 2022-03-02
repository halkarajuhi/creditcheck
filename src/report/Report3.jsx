import React from 'react';
import Navbar from "../common/header/Navbar";
import Sidebar from "../common/header/Sidebar";

export default function Report3() {
    return (
        <div className="sb-nav-fixed">
            <Navbar />
            <div id="layoutSidenav">

                <Sidebar />

                <div id="layoutSidenav_content">
                    <div className="pt-4 pb-5">
                        <main>
                            <p className="px-5 text-center request_title">Request for Sample</p>
                            <div className="containar-fluid px-5 ">

                            <div className ="report_form">
                            <div className ="row">

                            <div className ="form-group row pb-3">
                            <label className ="col-md-3 col-form-label report_form_txt">Sample Reports*</label>
                            <div className ="col-md-8 m-auto">
                            <input type ="text" className ="form-control l_c_r" name="username" placeholder="Local Credit Report (Normal)" required=""/>
                            </div>
                            </div>

                            <div className ="form-group row pb-3">
                            <label className ="col-md-3 col-form-label report_form_txt">Your Company Name*</label>
                            <div className ="col-md-8 m-auto">
                            <input type ="text" className ="form-control" name="username" required=""/>
                            </div>
                            </div>

                            <div className ="form-group row pb-3">
                            <label className ="col-md-3 col-form-label report_form_txt">Salute*</label>
                            <div className ="col-md-8 m-auto">
                            <input type ="text" className ="form-control" name="username" required=""/>
                            </div>
                            </div>

                            <div className ="form-group row pb-3">
                            <label for="username" className ="col-md-3 col-form-label report_form_txt">First Name*</label>
                            <div className ="col-md-8 m-auto">
                            <input type ="text" className ="form-control" name="username" required=""/>
                            </div>
                            </div>

                            <div className ="form-group row pb-3">
                            <label for="username" className ="col-md-3 col-form-label report_form_txt">Last Name*</label>
                            <div className ="col-md-8 m-auto">
                            <input type ="text" className ="form-control" name="username" required=""/>
                            </div>
                            </div>

                            <div className ="form-group row pb-3">
                            <label className ="col-md-3 col-form-label report_form_txt">Designation*</label>
                            <div className ="col-md-8 m-auto">
                            <input type ="text" className ="form-control" name="username" required=""/>
                            </div>
                            </div>

                            <div className ="form-group row pb-3">
                            <label for="number" className ="col-md-3 col-form-label report_form_txt">Tel *</label>
                            <div className ="col-md-8 m-auto">
                            <input type ="text" className ="form-control" name="username" required=""/>
                            </div>
                            </div>

                            <div className ="form-group row pb-3">
                            <label for="e-mail" className ="col-md-3 col-form-label report_form_txt">Email *</label>
                            <div className ="col-md-8 m-auto">
                            <input type ="text" className ="form-control" name="username" required=""/>
                            </div>
                            </div>

                            <div className ="form-group row pb-3">
                            <label for="fax" className ="col-md-3 col-form-label report_form_txt">Fax*</label>
                            <div className ="col-md-8 m-auto">
                            <input type ="text" className ="form-control" name="username" required=""/>
                            </div>
                            </div>

                            <div className ="form-group row pb-3">
                            <div className ="col-md-3"></div>
                            <div className ="col-md-8 m-auto">
                            <img src="assets/img/captcha.png" alt="" srcset=""/><br/>
                            <a href="#" className ="chng_img">Change Image</a><br/>
                            <a href="#" className ="chng_img">Type the characters from the image</a>
                            </div>
                            </div>

                            <div className ="form-group row pb-4">
                            <div className ="col-md-3"></div>
                            <div className ="col-md-8 m-auto">
                            <input type ="text" className ="form-control" name="username" required=""/>
                            </div>
                            </div>

                            <div className ="form-group row pb-3">
                            <div className ="col-md-3"></div>
                            <div className ="col-md-8 request_sample m-auto">
                            <button type ="button" className ="btn btn-primary">Submit</button>
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
