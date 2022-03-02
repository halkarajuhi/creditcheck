import React, { useState, useEffect } from "react";
import { Modal, Button, Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import jsPDF from 'jspdf'; 
import 'jspdf-autotable';

export default function Shareholder_information(props) {
 
    const [sharedata, setSharedata] = useState([]);
    const [showModalnew, setShownew] = useState(false);
    const searchValue = props.companyNamevalue;

    const { t } = useTranslation();

    const handleClose1 = () => setShownew(false);
    const handleShow1 = () => {
        setShownew(true);
        Shareholderapi();
    }
    const Shareholderapi = async () => {
        try {
            const response = await fetch('http://localhost:5000/reportapi/Shareholder', {
                method: "post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ searchValue })
            })
                .then(response => response.json())
                .then(data => {
                    setSharedata(data.result.items)

                })
        }
        catch (e) {
            console.log(e)
        }
    }

    function generate() {
        const doc = new jsPDF('p', 'mm');
      
        doc.autoTable({
          html: '#shareholder2',
          theme: 'grid',
          tableWidth: 180,
          columnStyles: {
            3: {cellWidth: 'wrap'}
          },
        });
      
        doc.save('Shareholder_information');
      }

    return (
        <div>
            <p className="report_head" onClick={handleShow1} >2.{t("Shareholder_information")}</p>
            <p className="report_txt">.{t("Investor_Type")}<br />
                .	{t("Amount")}<br />
                .	{t("Ratio")}<br />
                .	{t("capital_actl")}<br />
                .	{t("capitals")}<br />
                .	{t("company_Name")}<br />
                .	{t("Investor_Name")}<br />
            </p>


            <Modal show={showModalnew} onHide={handleClose1}>
                <Modal.Header closeButton>
                    <Modal.Title>{t("Shareholder_information")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        <h1>{t("Shareholder_information")}</h1>
                    <Table striped bordered hover id="shareholder2" >
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>{t("Investor_Type")}</th>
                                <th>{t("Amount")}</th>
                                <th>{t("Ratio")}</th>
                                <th>c{t("capital_actl")}</th>
                                <th>{t("capitals")}</th>
                                <th>{t("company_Name")}</th>
                                <th>{t("Investor_Name")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(sharedata != '') ?
                                sharedata.map((item, index) => (

                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{item.investor_type}</td>
                                        <td>{item.amount}</td>
                                        <td>{item.ratio}</td>
                                        <td>{item.capital_actl.map((newdata) => (
                                            <tr>
                                                <td>{newdata.amount}</td>
                                                <td>{newdata.payment}</td>
                                                <td>{newdata.time}</td>
                                            </tr>
                                        ))}</td>
                                        <td>{item.capitals.map((inndata) => (
                                            <tr>
                                                <td>{inndata.amount}</td>
                                            </tr>
                                        ))}</td>
                                        <td>{item.company_name}</td>
                                        <td>{item.investor_name}</td>
                                    </tr>
                                )) :
                                <tr><td colSpan={8}>{t("Please_search_Company_name_first")}</td></tr>
                            }
                        </tbody>
                    </Table>
                   
                </Modal.Body>
                <Button onClick={generate} variant="contained" color="primary">  
            Generate Pdf  </Button> 
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose1}>
                        {t("Close")}
                    </Button>
                    <Button variant="primary" onClick={handleClose1}>
                        {t("Save_Changes")}
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}
