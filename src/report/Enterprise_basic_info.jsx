import React, { useState, useEffect } from "react";
import { Modal, Button, Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export default function Enterprise_basic_info(props) {

    const [enterpriseV5data, setEnterpriseV5data] = useState('');
    const [categorydata, setCategory] = useState([]);
    const [regiondata, setRegion] = useState([]);
  
    const [staffdata, setStaffdata] = useState([]);
    const [enterpriseV5Modal, setEnterpriseV5Modal] = useState(false);

    const searchValue = props.companyNamevalue;

    console.log(searchValue)
    const { t } = useTranslation();

    const handleClose4 = () => setEnterpriseV5Modal(false);
    const handleShow4 = () => {
      setEnterpriseV5Modal(true);
      EnterpriseV5record();
    }
    const EnterpriseV5record = async () => {
        try {
          const response = await fetch('http://localhost:5000/reportapi/bussinessrecord_V5', {
            method: "post",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ searchValue })
          })
            .then(response => response.json())
            .then(data => {
              setEnterpriseV5data(data.result)
              setCategory(data.result.category)
              setRegion(data.result.region)
              setStaffdata(data.result.staffList.items);
    
            })
        }
        catch (e) {
          console.log(e)
        }
      }

  return (
    <div>
        <p className="report_head" onClick={handleShow4}>5.{t("enterprise_basic_information")}V5</p>
                        {/* <p className="report_txt">.{t("id")}<br /> */}
                          {/* .	 {t("base")}<br />
                          .	 {t("Name")}<br />                        
                          .	 {t("legalPersonID")}<br />
                          .	  {t("regNumber")}<br />
                          .	{t("companyOrgType")}  <br />
                          .	 {t("Category")}<br />
                          .	 {t("Region")}<br />
                          .	 {t("area")}<br />
                          .	  {t("RegLocation")}<br />
                          .	   {t("EstiblishTime")}<br />
                          .	 {t("fromTime")} <br />
                          .	 {t("toTime")} <br />
                          .	 {t("businessScope")}  <br />
                          .	  {t("approvedTime")} <br />
                          .	 {t("regStatus")}  <br />
                          .	  {t("regCapital")} <br />
                          .	 {t("actualCapital")}   <br />
                          .	 {t("orgNumber")}   <br />
                          .	  {t("orgApprovedInstitute")}  <br />
                          .	   {t("listCode")}  <br />
                          .	  {t("property1")}   <br />
                          .	  {t("property2")}   <br />
                          .	  {t("property3")}   <br />
                          .	  {t("property4")}   <br />
                          .	 {t("staff_List")}    <br /> */}

                        {/* </p> */}

    
              {/* *******************Entriprise V5 Model******************** */}

              <Modal show={enterpriseV5Modal} onHide={handleClose4} style={{}}>
                <Modal.Header closeButton>
                  <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Table striped bordered hover>
                    <thead>
                      <tr>

                      </tr>
                    </thead>
                 
                    <tbody>
                    { (enterpriseV5data === "")?<tr>{t("Please_search_Company_name_first")}</tr> :
                    <>
                     <tr> {t("id")} : {enterpriseV5data.id}</tr>
                      <tr>{t("base")} : {enterpriseV5data.base}</tr>
                      <tr>{t("name")}: {enterpriseV5data.name}</tr>
                      <tr>{t("legalPersonID")} : {enterpriseV5data.legalPersonID}</tr>
                      <tr>{t("regNumber")} : {enterpriseV5data.regNumber}</tr>
                      <tr>{t("companyOrgType")} : {enterpriseV5data.companyOrgType}</tr>
                      <tr>{t("Category")}</tr>
                      <tr>{t("categoryCode")} : {categorydata.categoryCode}</tr>
                      <tr>{t("cate3")} : {categorydata.cate3}</tr>
                      <tr>{t("cate2")} : {categorydata.cate2}</tr>
                      <tr>{t("cate1")} : {categorydata.cate1}</tr>
                      <tr>{t("Region")}</tr>
                      <tr>{t("regionCode")} : {regiondata.regionCode}</tr>
                      <tr>{t("province")} : {regiondata.province}</tr>
                      <tr>{t("city")} : {regiondata.city}</tr>
                      <tr>{t("area")}:  {regiondata.area}</tr>

                      <tr> {t("RegLocation")} : {enterpriseV5data.regLocation}</tr>
                      <tr>{t("EstiblishTime")} : {enterpriseV5data.estiblishTime}</tr>
                      <tr>{t("fromTime")} : {enterpriseV5data.fromTime}</tr>
                      <tr>{t("toTime")} : {enterpriseV5data.toTime}</tr>
                      <tr>{t("businessScope")} : {enterpriseV5data.businessScope}</tr>
                      <tr>{t("approvedTime")} : {enterpriseV5data.approvedTime}</tr>
                      <tr>{t("regStatus")}: {enterpriseV5data.regStatus}</tr>
                      <tr>{t("regCapital")} : {enterpriseV5data.regCapital}</tr>
                      <tr>{t("actualCapital")} : {enterpriseV5data.actualCapital}</tr>
                      <tr>{t("orgNumber")} : {enterpriseV5data.orgNumber}</tr>
                      <tr>{t("orgApprovedInstitute")} : {enterpriseV5data.orgApprovedInstitute}</tr>
                      <tr>{t("parentID")} : {enterpriseV5data.parentID}</tr>
                      <tr>{t("listCode")}: {enterpriseV5data.listCode}</tr>
                      <tr>{t("property1")}: {enterpriseV5data.property1}</tr>
                      <tr>{t("property2")}: {enterpriseV5data.property2}</tr>
                      <tr>{t("property3")} : {enterpriseV5data.property3}</tr>
                      <tr>{t("property4")} : {enterpriseV5data.property4}</tr>

                      <tr></tr>
                   {staffdata.map((item, index) => (
                        <tr>
                          <td> {t("companyID")}: {item.companyID}</td>
                          <td>{t("staffID")}: {item.staffID}</td>
                          <td>{t("name")}: {item.name}</td>
                          <td>{t("type")}: {item.type}</td>
                          <td>{t("staffTypeName")}: {item.staffTypeName}</td>
                        </tr>
                      ))}
                    </> 
                     }
                </tbody>
                 
               
                  </Table>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose4}>
                  {t("Close")} 
                  </Button>
                  <Button variant="primary" onClick={handleClose4}>
                  {t("Save_Changes")} 
                  </Button>
                </Modal.Footer>
              </Modal>


      
    </div>
  )
}
