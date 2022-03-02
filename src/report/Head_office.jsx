import React, { useState, useEffect } from "react";
import { Modal, Button, Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export default function Head_office(props) {
    const [headModal , setHeadModal] = useState(false);
const [head_data, setHead_data] = useState([]);
   
   const searchValue = props.companyNamevalue;
   
    const handleClose = () => setHeadModal(false);
    const handleShow = () => {
        setHeadModal(true);
        Head_officeapi();
    }
    const { t } = useTranslation();
    const Head_officeapi = async () => {
        try {
          const response = await fetch('http://localhost:5000/reportapi/head_office', {
            method: "post",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ searchValue})
          })
            .then(response => response.json())
            .then(data => {
                setHead_data(data.result)
            })
        }
        catch (e) {
          console.log(e)
        }
      }
    
  return (
    <div>
         <p className="report_head" onClick={handleShow}>16. {t("Head_Office")}</p>
        <p className="report_txt"> {t("id")}  <br />
                      {t("Base")}  <br />
                      {t("Name")} <br />
                      {t("legalPersonID")}  <br />
                      {t("legalPersonName")}  <br />
                      {t("legalPersonType")} <br />
                     {t("regNumber")}  <br />
                     {t("companyType")} <br />
                      {t("companyOrgType")} <br /> 
                      {t("regLocation")}  <br />
                      {t("estiblishTime")} <br />
                      {t("fromTime")}  <br />
                      {t("toTime")} <br />
                      {t("businessScope")}  <br />
                      {t("regInstitute")}  <br />
                      {t("regStatus")}   <br />
                      {t("regCapital")} <br />
                      {t("actualCapital")} <br />
                      {t("orgNumber")} <br />
                      {t("orgApprovedInstitute")} <br />
                      {t("parentID")} <br />
                      {t("listCode")} <br />
                      {t("ownershipStake")}  <br />
                      {t("property1")}   <br />
                      {t("property2")} <br />
                      {t("property3")}   <br />
                      {t("property4")}  <br />
        </p>


        {/* *******************FOregin Investment******************** */}

        <Modal show={headModal } onHide={handleClose} dialogClassName="modal-new1" >
                <Modal.Header closeButton>
                  <Modal.Title>{t("Head_Office")}</Modal.Title>
                </Modal.Header>
                <Modal.Body >

                <Table  bordered hover>
                     <tr>{t("id")}  : {head_data.id}</tr>
                      <tr>{t("Base")} : {head_data.base}</tr>
                      <tr>{t("Name")} : {head_data.name}</tr>
                      <tr>{t("legalPersonID")} : {head_data.legalPersonID}</tr>
                      <tr>{t("legalPersonName")} : {head_data.legalPersonName}</tr>
                      <tr>{t("legalPersonType")} : {head_data.legalPersonType}</tr>
                     <tr>{t("regNumber")} : {head_data.regNumber}</tr>
                     <tr>{t("companyType")} : {head_data.companyType}</tr>
                      <tr>{t("companyOrgType")} : {head_data.companyOrgType}</tr>
                      <tr>{t("regLocation")} : {head_data.regLocation}</tr>
                      <tr>{t("estiblishTime")} : {head_data.estiblishTime}</tr>
                      <tr>{t("fromTime")} : {head_data.fromTime}</tr>
                      <tr>{t("toTime")} : {head_data.toTime}</tr>
                      <tr>{t("businessScope")} : {head_data.businessScope}</tr>
                      <tr>{t("regInstitute")} : {head_data.regInstitute}</tr>
                      <tr>{t("approvedTime")} : {head_data.approvedTime}</tr>
                      <tr>{t("regStatus")}:  {head_data.regStatus}</tr>
                      <tr>{t("regCapital")}:  {head_data.regCapital}</tr>
                      <tr>{t("actualCapital")}:  {head_data.actualCapital}</tr>
                      <tr>{t("orgNumber")}:  {head_data.orgNumber}</tr>
                      <tr>{t("orgApprovedInstitute")}:  {head_data.orgApprovedInstitute}</tr>
                      <tr>{t("parentID")}:  {head_data.parentID}</tr>
                      <tr>{t("listCode")}:  {head_data.listCode}</tr>
                      <tr>{t("ownershipStake")}:  {head_data.ownershipStake}</tr>
                      <tr>{t("property1")}:  {head_data.property1}</tr>
                      <tr>{t("property2")}:  {head_data.property2}</tr>
                      <tr>{t("property3")}:  {head_data.property3}</tr>
                      <tr>{t("property4")}:  {head_data.property4}</tr>
                 </Table>
                
               
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                  {t("Close")}
                  </Button>
                  <Button variant="primary" onClick={handleClose}>
                  {t("Save_Changes")} 
                  </Button>
                </Modal.Footer>
              </Modal>

      
    </div>
  )
}
