import React, { useState, useEffect } from "react";
import { Modal, Button, Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import jsPDF from 'jspdf'; 
import autoTable from 'jspdf-autotable'

export default function Basic_info(props) {

    const [basic_information , setBasic_information] = useState(false);
    const [basic_data, setBasic_data] = useState([]);
      
  const handleClose13 = () => setBasic_information(false);
  const handleShow13 = () => {
    setBasic_information(true);
    basic_info();
  }
  const searchValue = props.companyNamevalue;
  const { t } = useTranslation();
  const basic_info = async () => {
    try {
      const response = await fetch('http://localhost:5000/reportapi/basic_information', {
        method: "post",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ searchValue })
      })
        .then(response => response.json())
        .then(data => {
          setBasic_data(data.result.hkData) 
         
         
         })
    }
    catch (e) {
      console.log(e)
    }
  }
  function generate() {
    const doc = new jsPDF();
  
    autoTable(doc, { html: '#mytable1' })
    
  
    doc.save('Basic_information_of_special.pdf');
  }
  return (
    <div>
         <p className="report_head" onClick={handleShow13}>14. {t("Basic_information_of_special")}</p>
                        <p className="report_txt">
                     .{t("companyID")} <br />
                     .{t("companyNum")} <br />
                     .{t("base")} <br />
                     .{t("name")} <br />
                     .{t("nameS")} <br />
                     .{t("nameCn")} <br />
                     .{t("nameCnS")} <br />
                     .{t("nameEn")} <br />
                     .{t("companyOrgType")}  <br />
                     .{t("companyOrgTypeS")} <br />
                     .{t("estiblishTime")} <br />
                     .{t("regStatus")} <br />
                     .{t("regStatusS")}<br />
                     .{t("remarks")} <br />
                     .{t("remarksS")}  <br />
                     .{t("liquidationMode")} <br />
                     .{t("liquidationModeS")}  <br />
                     .{t("toTime")}  <br />
                     .{t("mortgage")}  <br />
                     .{t("mortgageS")}  <br />
                     .{t("importantItems")}  <br />
                     .{t("importantItemsS")} <br /> 
                     .{t("property1")} <br />
                     .{t("property2")} <br />
                     .{t("property3")} <br />
                        </p>
        {/* *******************FOregin Investment******************** */}
              <Modal show={basic_information} onHide={handleClose13} >
                <Modal.Header closeButton>
                  <Modal.Title>{t("Basic_information_of_special")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Table striped bordered hover id="mytable1">
                    
                    {(basic_data == "")?
                      <tr><td colSpan={3}>{t("Please_search_Company_name_first")} </td></tr>:
                    <tbody>
                     
                      <tr>{t("companyID")}  : {basic_data.companyID}</tr>
                      <tr>{t("companyNum")} : {basic_data.companyNum}</tr>
                      <tr>{t("base")} : {basic_data.base}</tr>
                      <tr>{t("name")} : {basic_data.name}</tr>
                      <tr>{t("nameS")} : {basic_data.nameS}</tr>
                      <tr>{t("nameCn")} : {basic_data.nameCn}</tr>
                      <tr>{t("nameCnS")}  : {basic_data.nameCnS}</tr>
                      <tr>{t("nameEn")}  : {basic_data.nameEn}</tr>
                      <tr>{t("companyOrgType")}  : {basic_data.companyOrgType}</tr>
                      <tr>{t("companyOrgTypeS")}  : {basic_data.companyOrgTypeS}</tr>
                      <tr>{t("estiblishTime")}  : {basic_data.estiblishTime}</tr>
                      <tr>{t("regStatus")}  : {basic_data.regStatus}</tr>
                      <tr>{t("regStatusS")}  : {basic_data.regStatusS}</tr>
                      <tr>{t("remarks")}  : {basic_data.remarks}</tr>
                      <tr>{t("remarksS")}  : {basic_data.remarksS}</tr>
                      <tr>{t("liquidationMode")}  : {basic_data.liquidationMode}</tr>
                      <tr>{t("liquidationModeS")}  : {basic_data.liquidationModeS}</tr>
                      <tr>{t("toTime")}  : {basic_data.toTime}</tr>
                      <tr>{t("mortgage")}  : {basic_data.mortgage}</tr>
                      <tr>{t("mortgageS")}  : {basic_data.mortgageS}</tr>
                      <tr>{t("importantItems")}  : {basic_data.importantItems}</tr>
                      <tr>{t("importantItemsS")}  : {basic_data.importantItemsS}</tr>
                      <tr>{t("property1")}  : {basic_data.property1}</tr>
                      <tr>{t("property2")}  : {basic_data.property2}</tr>
                      <tr>{t("property3")}  : {basic_data.property3}</tr>
                    
                    </tbody>
                      }
                  </Table>
                </Modal.Body>
                <Button onClick={generate} variant="contained" color="primary">  
            Generate Pdf  
                                </Button>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose13}>
                  {t("Close")}
                  </Button>
                  <Button variant="primary" onClick={handleClose13}>
                  {t("Save_Changes")} 
                  </Button>
                </Modal.Footer>
               
              </Modal>

    </div>
  )
}
