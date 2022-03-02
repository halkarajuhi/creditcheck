import React, { useState ,useEffect} from "react";
import { API_URL,ABOUTUS} from "../common/api/constant";
import Sidebar from '../common/header/Sidebar';
import Navbar from '../common/header/Navbar';

export default function About() {

    const [data, setData] = useState();

   useEffect(() => {

        fetch(`${API_URL}/${ABOUTUS}/`+3)
        .then((res) => res.json())
        .then((data) => {
          
            setData(data.response.about_page);
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
                
                              <div
                                dangerouslySetInnerHTML={{ __html: data }}
                            />
                            </div>

                        </main>
                    </div>
                </div>


            </div>


        </div>
    )
}
