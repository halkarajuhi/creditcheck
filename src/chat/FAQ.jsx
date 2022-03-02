import React, { useState, useEffect } from "react";
import { API_URL, GETFAQ, QUESTION } from "../common/api/constant";
import Navbar from '../common/header/Navbar';
import Sidebar from '../common/header/Sidebar';

export default function FAQ() {

    const [data, setData] = useState([]);
    const [QUESdata, setQuesData] = useState([]);

    useEffect(() => {
        fetch(`${API_URL}/${GETFAQ}`)
            .then((res) => res.json())
            .then((data) => {
                setData(data.response);
            })
            .catch((err) => {
                console.log(err);
            });

        fetch(`${API_URL}/${QUESTION}`)
            .then((res) => res.json())
            .then((data) => {
                setQuesData(data.response);
            })
            .catch((err) => {
                console.log(err);
            });


    }, []);


    return (
        <div className="sb-nav-fixed">

            <Navbar />
            <div id="layoutSidenav">
                <Sidebar />
                <div id="layoutSidenav_content">
                    <div className="pt-4 pb-5 px-4">
                        <main>

                            <div className="row">

                                {QUESdata.map((ques_type, j) => {


                                    var oldqustiontype = ques_type.type;
                                    var k = 0;

                                    return data.map((ques, i) => {

                                        return ((i == 0)) ? <p className="question_faq_title">{ques_type.type}</p> : (oldqustiontype == ques.question_type) ? <div class="accordion accordion-flush" id="accordionFlushExample">
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="flush-headingOne">
                                        <button  class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#flush-collapseOne" + i }aria-expanded="false" aria-controls="flush-collapseOne">
                                           {ques.question}
                                        </button>
                                    </h2>
                                    <div id={"flush-collapseOne" + i } class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                        <div class="accordion-body"> {ques.answer}</div>
                                    </div>
                                </div>
                            </div> : null;

                                    })

                                })}


                            </div>
                            
                        </main>
                    </div>

                </div>
            </div >
        </div >
    )
}
