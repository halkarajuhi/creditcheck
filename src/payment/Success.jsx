import React from "react";
import { useCart } from "react-use-cart";
import Navbar from "../common/header/Navbar";
import Sidebar from "../common/header/Sidebar";
import { useNavigate } from 'react-router-dom';
import Enterprise_basic_info from "../report/Enterprise_basic_info";
import Key_personel from "../report/Key_personel";
import Shareholder_information from "../report/Shareholder_information";
import Bussiness_record from "../report/Bussiness_record";
import Enterprise_info from "../report/Enterprise_info";
import Foreign_investment from "../report/Foreign_investment";
import Annual_report from "../report/Annual_report";
import Enterprise from "../report/Enterprise";
import Corporate from "../report/Corporate";
import Shareholding_change from "../report/Shareholding_change";
import Taxpayer_identification from "../report/Taxpayer_identification";
import Searches from "../report/Searches";
import Branch_related from "../report/Branch_related";
import Basic_info from "../report/Basic_info";
import Get_previousname from "../report/Get_previousname";
import Head_office from "../report/Head_office";


const Success = () => {

  const navigate = useNavigate();

  const { items, totalItems} = useCart();

  let companyName = localStorage.getItem('searchvalue');
 

  return (
    <div className="sb-nav-fixed">

      <Navbar totalItems={totalItems} />
      <div id="layoutSidenav">
        <Sidebar />
        <div id="layoutSidenav_content">
          <div className="pt-4 pb-5 px-4">

            <section className="container">

              <div className="row jistufy-content-center">
               <div className="col-12">

                  <table className="table table-light m-0">
                    <tbody>
                      {items.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{item.heading}</td>
                            {(item.heading == "Key Personel")?
                             <td>
                               <Key_personel companyNamevalue ={companyName}/>
                             </td>:<div></div>
                            }
                            {(item.heading == "Shareholder information")?
                             <td>
                               <Shareholder_information companyNamevalue ={companyName}/>
                             </td>:<div></div>
                            }
                            {(item.heading == "Business change records")?
                             <td>
                               <Bussiness_record companyNamevalue ={companyName}/>
                             </td>:<div></div>
                            }
                            {(item.heading == "Enterprise basic information")?
                             <td>
                               <Enterprise_basic_info companyNamevalue ={companyName}/>
                             </td>:<div></div>
                            }
                            {(item.heading == "Enterprise basic informationV5")?
                             <td>
                               <Enterprise_info companyNamevalue ={companyName}/>
                             </td>:<div></div>
                            }
                            {(item.heading == "Foreign Investment")?
                             <td>
                               <Foreign_investment companyNamevalue ={companyName}/>
                             </td>:<div></div>
                            }
                            {(item.heading == "Annual report details")?
                             <td>
                               <Annual_report companyNamevalue ={companyName}/>
                             </td>:<div></div>
                            }
                            {(item.heading == "Enterprise")?
                             <td>
                               <Enterprise companyNamevalue ={companyName}/>
                             </td>:<div></div>
                            }
                            {(item.heading == "Corporate Contact")?
                             <td>
                               <Corporate companyNamevalue ={companyName}/>
                             </td>:<div></div>
                            }
                            {(item.heading == "Shareholding_change")?
                             <td>
                               <Shareholding_change companyNamevalue ={companyName}/>
                             </td>:<div></div>
                            }
                            {(item.heading == "Obtain a taxpayer identification")?
                             <td>
                               <Taxpayer_identification companyNamevalue ={companyName}/>
                             </td>:<div></div>
                            }
                            {(item.heading == "SEARCHES")?
                             <td>
                               <Searches companyNamevalue ={companyName}/>
                             </td>:<div></div>
                            }
                            {(item.heading == "Branch RELATED SEARCHES")?
                             <td>
                               <Branch_related companyNamevalue ={companyName}/>
                             </td>:<div></div>
                            }
                            {(item.heading == "Basic Information of Special")?
                             <td>
                               <Basic_info companyNamevalue ={companyName}/>
                             </td>:<div></div>
                            }
                            {(item.heading == "Get the Previous Name")?
                             <td>
                               <Get_previousname companyNamevalue ={companyName}/>
                             </td>:<div></div>
                            }
                            {(item.heading == "Head Office")?
                             <td>
                               <Head_office companyNamevalue ={companyName}/>
                             </td>:<div></div>
                            }
                            
                           
                            <td><button>Download</button></td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

              </div>
            </section>
          </div>
        </div>


      </div>


    </div>

  );
};

export default Success;
