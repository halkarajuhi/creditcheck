import React, { useState, useEffect } from "react";
import { Modal, Button, Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export default function Enterprise_info(props) {

    const [enterprisedata, setEnterprisedata] = useState('');
    const [categorydata, setCategory] = useState([]);
    const [regiondata, setRegion] = useState([]);
    const [enterpriseModal, setEnterpriseModal] = useState(false);

    const searchValue = props.companyNamevalue;

    const handleClose3 = () => setEnterpriseModal(false);
    const handleShow3 = () => {
      setEnterpriseModal(true);
      Enterpriserecord();
    }
    const { t } = useTranslation();
    const Enterpriserecord = async () => {
        try {
          const response = await fetch('http://localhost:5000/reportapi/enterprise', {
            method: "post",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ searchValue })
          })
            .then(response => response.json())
            .then(data => {
     
        setEnterprisedata(data.result)
        setCategory(data.result.category)
        setRegion(data.result.region)
           
         })
        }
        catch (e) {
          console.log(e)
        }
      }
  return (
   
    <div>
       <p className="report_head" onClick={handleShow3}>4.{t("enterprise_basic_information")}</p>
                        <p className="report_txt">.	{t("id")}<br />
                          .	{t("base")}<br />
                          . {t("name")}	 <br />
                          .	{t("legalPersonID")} <br />
                          .	{t("regNumber")}  <br />
                          .	{t("companyOrgType")}  <br />
                          .	{t("Category")} <br />
                          .	{t("Region")} <br />
                          .{t("area")}<br />
                          .{t("RegLocation")}<br />
                          .	{t("EstiblishTime")} <br />
                          .	{t("fromTime")} <br />
                          .	{t("toTime")}<br />
                          .	{t("businessScope")}<br />
                          .	{t("approvedTime")}<br />
                          .	{t("regStatus")} <br />
                          .	{t("regCapital")}<br />
                          .	{t("actualCapital")}<br />
                          .	{t("orgNumber")} <br />
                          .	{t("orgApprovedInstitute")}<br />
                          .	{t("listCode")}  <br />
                          .	{t("property1")}<br />
                          .	{t("property2")} <br />
                          .	{t("property3")}<br />
                          .	{t("property4")} <br />
                          .	{t("phoneNumber")}<br />
                          .	{t("email")}<br />
                        </p>

 {/* *******************Entriprise Model******************** */}

 <Modal show={enterpriseModal} onHide={handleClose3} style={{}}>
                <Modal.Header closeButton>
                  <Modal.Title>{t("enterprise_basic_information")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Table striped bordered hover>
                    <thead>
                    
                    </thead>
                    { (enterprisedata == "")?  <tr>{t("Please_search_Company_name_first")}</tr> :
                    <tbody>
                   
                   
                     <tr>{t("Id")}  : {enterprisedata.id}</tr>
                     <tr>Base {t("base")}: {enterprisedata.base}</tr>
                     <tr> {t("Name")}: {enterprisedata.name}</tr>
                     <tr>{t("legalPersonID")} : {enterprisedata.legalPersonID}</tr>
                     <tr> {t("regNumber")}: {enterprisedata.regNumber}</tr>
                     <tr>{t("companyOrgType")} : {enterprisedata.companyOrgType}</tr>
                     <tr>{t("Category")}</tr>
                     
                     <tr>{t("categoryCode")} : {categorydata.categoryCode}</tr>
                      <tr> {t("cate3")}: {categorydata.cate3}</tr>
                      <tr>{t("cate2")} : {categorydata.cate2}</tr>
                      <tr>{t("cate1")} : {categorydata.cate1}</tr>
                      <tr>{t("Region")}</tr>
                      <tr> {t("regionCode")}: {regiondata.regionCode}</tr>
                      <tr> {t("province")}: {regiondata.province}</tr>
                      <tr> {t("city")}: {regiondata.city}</tr>
                      <tr>{t("area")} : {regiondata.area}</tr>

                      <tr> {t("RegLocation")} : {enterprisedata.regLocation}</tr>
                      <tr>{t("EstiblishTime")} : {enterprisedata.estiblishTime}</tr>
                      <tr>{t("fromTime")} : {enterprisedata.fromTime}</tr>
                      <tr> {t("toTime")}: {enterprisedata.toTime}</tr>
                      <tr> {t("businessScope")}: {enterprisedata.businessScope}</tr>
                      <tr>{t("approvedTime")} : {enterprisedata.approvedTime}</tr>
                      <tr>{t("regStatus")} : {enterprisedata.regStatus}</tr>
                      <tr>{t("regCapital")} : {enterprisedata.regCapital}</tr>
                      <tr>{t("actualCapital")} : {enterprisedata.actualCapital}</tr>
                      <tr>{t("orgNumber")} : {enterprisedata.orgNumber}</tr>
                      <tr> {t("orgApprovedInstitute")}: {enterprisedata.orgApprovedInstitute}</tr>
                      <tr> {t("parentID")}: {enterprisedata.parentID}</tr>
                      <tr>{t("listCode")} : {enterprisedata.listCode}</tr>
                      <tr>{t("property1")} : {enterprisedata.property1}</tr>
                      <tr>{t("property2")} : {enterprisedata.property2}</tr>
                      <tr>{t("property3")} : {enterprisedata.property3}</tr>
                      <tr> {t("property4")}: {enterprisedata.property4}</tr>
                      <tr>{t("phoneNumber")}: {enterprisedata.phoneNumber}</tr>
                      <tr> {t("email")}: {enterprisedata.email}</tr>:
                   
                      </tbody>
                   }
                  </Table>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose3}>
                  {t("Close")}   
                  </Button>
                  <Button variant="primary" onClick={handleClose3}>
                  {t("Save_Changes")} 
                  </Button>
                </Modal.Footer>
              </Modal>

    </div>
  )
}
