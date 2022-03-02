import React, { useState, useEffect } from "react";
import { Modal, Button, Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";


export default function Foreign_investment(props) {


    const [foregindata, setForegindata] = useState([]);
    const [foregindModal, setForegindModal] = useState(false);
  
    const handleClose5 = () => setForegindModal(false);
    const handleShow5 = () => {
      setForegindModal(true);
      ForeginInvestmentapi();
    }
    const searchValue = props.companyNamevalue;
    const { t } = useTranslation();
    
    const ForeginInvestmentapi = async () => {
        try {
          const response = await fetch('http://localhost:5000/reportapi/foreign', {
            method: "post",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ searchValue })
          })
            .then(response => response.json())
            .then(data => {
              setForegindata(data.result.items)
            })
        }
        catch (e) {
          console.log(e)
        }
      }
  return (
    <div>
         <p className="report_head" onClick={handleShow5}>6. {t("Foreign_investment")}	</p>
                        {/* <p className="report_txt">.{t("investor_type")}<br />
                          .	 {t("Amount")}<br />
                          .	 {t("Ratio")}<br />
                          .	 {t("Base")}<br />
                          . {t("Legal_person_name ")}<br />
                          .	 {t("Legal_person_type")}<br />
                          .	 {t("Estiblishc_time ")}<br />
                          .	 {t("reg_status ")}<br />
                          .  {t("reg_capital")}<br />
                          .	  {t("company_Name")}<br />
                          .	  {t("Category")}<br />
                        </p> */}
 {/* *******************FOregin Investment******************** */}

 <Modal show={foregindModal} onHide={handleClose5} dialogClassName="modal-new" size="lg">
                <Modal.Header closeButton>
                  <Modal.Title>{t("Foreign_investment")}</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th> {t("investor_type")}</th>
                        <th>{t("Amount")}</th>
                        <th> {t("Ratio")}</th>
                        <th> {t("Base")}</th>
                        <th> {t("legal_person_name")}</th>
                        <th> {t("Legal_person_type")}</th>
                        <th> {t("Estiblishc_time")}</th>
                        <th> {t("reg_status")}</th>
                        <th> {t("reg_capital")}</th>
                        <th> {t("company_Name")}</th>
                        <th> {t("Category")}</th>

                      </tr>
                    </thead>
                    <tbody>
                     {
                      
                      foregindata.map((item, index) => (

                        <tr>
                          <td>{index + 1}</td>
                          <td>{item.investor_type}</td>
                          <td>{item.amount}</td>
                          <td>{item.ratio}</td>
                          <td>{item.base}</td>
                          <td>{item.legal_person_name}</td>
                          <td>{item.legal_person_type}</td>
                          <td>{item.estiblish_time}</td>
                          <td>{item.reg_status}</td>
                          <td>{item.reg_capital}</td>
                          <td>{item.company_name}</td>

                          <tr><td>{item.category.categoryCode}</td>
                            <td>{item.category.cate3}</td>
                            <td>{item.category.cate2}</td>
                            <td>{item.category.cate1}</td>
                          </tr>

                        </tr>
                      ))}
                      
                    </tbody>
                  </Table>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose5}>
                  {t("Close")}
                  </Button>
                  <Button variant="primary" onClick={handleClose5}>
                  {t("Save_Changes")} 
                  </Button>
                </Modal.Footer>
              </Modal>
      
    </div>
  )
}
