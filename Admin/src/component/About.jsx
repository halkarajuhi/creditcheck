import React from 'react'
import Sidebar from '../common/header/Sidebar';
import Navbar from '../common/header/Navbar';

export default function About() {
    return (
        <div className="sb-nav-fixed">

            <Navbar />
            <div id="layoutSidenav">
                <Sidebar />
                <div id="layoutSidenav_content">
                    <div className="pt-4 pb-5 px-4">
                        <main>

                            <div className="row">
                                <div className="ab_out">

                                    <p>Credochaeck is a leading global information services company, providing data and analytical tools to our clients around the world. For more than 125 years around the world.</p><br />

                                    <p>For more than 125 years around the world, we've been gathering, analysing and processing data in unique ways. We help individuals to take financial control and access financial services, businesses to make smarter decisions and thrive, lenders to lend more responsibly, and organisations to prevent identity fraud and crime.</p><br />

                                    <p>Our Credit Services business in Singapore was formerly operating as DP Information Group and underwent a full rebrand to become a part of Experian in May 2019.</p><br />

                                    <p>For more information on our Credit Services business, please visit <a href="#" className="about_us_a">www.example.com/credit-information-services</a>.</p><br />

                                    <p>For more information about Experian, visit <a href="#" className="about_us_a"> www.example.com/about-us</a>.</p><br />

                                    <p style={{fontSize: '16px', fontWeight: '600', color: '#247087' }}>KEY PARTNERS AND CORPORATE ACHIEVEMENTS</p>

                                    <p>Experian is the strategic alliance partner with Accounting & Corporate Regulatory Authority (ACRA), the Registrar for company/business incorporation of Singapore, in facilitating real-time information exchange and hosting the nation's corporate database.</p>

                                    <p>DP SME Advisory is Singapore's One-stop Business Advisory Centre for companies/businesses incorporation and changes.</p>

                                    <p>Experian is the ranking body and publisher for Singapore 1000 and SME 1000, the financial benchmark for top performing companies in Singapore (equivalent to Fortune 500 ratings). This is co-produced with EY and supported by the Singapore Business Federation, IE Singapore, SPRING Singapore, ACRA and IDA Singapore.</p>

                                    <p>Experian offers a credit scoring solution for the national credit consumer market and is also a developer of DP Credit Ratings, a proprietary corporate credit ratings model based on the probability of default.</p>

                                    <p>The only non-bank entity that Central Provident Fund (CPF) Board permit to allow CPF members to authorise the disclosure of their CPF statements electronically to Experian.</p>

                                    <p>Financial institutions, leading law firms, and leading MNCs and SMEs using our information system as their trusted credit bureau information tool.</p>

                                    <p>Expertise to backend integrate with financial institutions and the first information provider to perform web-service with Banks.</p>

                                    <p>Legal Name of Entity: <span className="about_us_a"> Credochaeck CREDIT SERVICES SINGAPORE PTE LTD</span></p>

                                    <p>Name of Business: <span className="about_us_a"> Credochaeck</span></p>

                                    <p>Unique Entity No.: <span className="about_us_a"> 00000000053E</span></p>

                                    <p>Goods and Service Tax(GST) Registration Number: <span className="about_us_a"> 00-00000-00</span></p>

                                    <p>Contact for Information, Suggestions & Complaints: <span className="about_us_a"> Customer Service Team</span></p>

                                    <p>Email Address: <span className="about_us_a"> cs@example.com</span></p>

                                    <p>Customer Service Hotline: <span className="about_us_a"> +65 0000 0000</span></p>

                                    <p>Fax: <span className="about_us_a"> +65 0000 0000</span></p>

                                    <p>Place Of Registration: <span className="about_us_a"> SINGAPORE</span></p>

                                    <p>Physical Address: <span className="about_us_a"> 10 Kallang Avenue #14-18 Aperia Tower 2 Singapore 339510</span></p>

                                    <p>Operating Hours: <span className="about_us_a"> 9:00am to 5:30pm (Mon-Fri). We are closed on Sat, Sun & Public Holidays.</span></p>

                                    <p>Website: <a href="#" className="about_us_a"> www.example.com/credit-information-services</a></p>


                                </div>

                            </div>

                        </main>
                    </div>
                </div>


            </div>


        </div>
    )
}
