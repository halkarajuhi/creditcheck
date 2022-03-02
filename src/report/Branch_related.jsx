import React, { useState, useEffect } from "react";
import { Modal, Button, Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export default function Branch_related(props) {

    const [branchModal , setBranchModal] = useState(false);
    const [branchdata, setBranchdata] = useState([]);

    const { t } = useTranslation();

    const handleClose12 = () => setBranchModal(false);
    const handleShow12 = () => {
      setBranchModal(true);
      branchapi();
    }
    const searchValue = props.companyNamevalue;
    const branchapi = async () => {
        try {
          const response = await fetch('http://localhost:5000/reportapi/branch', {
            method: "post",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ searchValue })
          })
            .then(response => response.json())
            .then(data => {
              setBranchdata(data.result.items) 
              console.log(branchdata)
             
             })
        }
        catch (e) {
          console.log(e)
        }
      }
  
  return (
    <div>
        <p className="report_head" onClick={handleShow12}>13.{t("Branch_RELATED_SEARCHES")}</p>
                        <p className="report_txt">
                       .{t("id")}<br />
                       .{t("base")}<br />
                       .{t("name")}<br />
                       .{t("legalPersonID")}<br />
                       .{t("legalPersonName")}<br />
                       .{t("legalPersonType")}<br />
                       .{t("regNumber")}<br />
                       .{t("companyType")}<br />
                       .{t("companyOrgType")}<br />
                       .{t("regLocation")}<br />
                       .{t("estiblishTime")}<br />
                       .{t("fromTime")}<br />
                       .{t("toTime")}<br />
                       .{t("businessScope")}<br />
                       .{t("regInstitute")}<br />
                       .{t("approvedTime")}<br />
                       .{t("regStatus")}<br />
                       .{t("regCapital")}<br />
                       .{t("actualCapital")}<br />
                       .{t("orgNumber")}<br />
                       .{t("orgApprovedInstitute")}<br />
                       .{t("parentID")}<br />
                       .{t("listCode")}<br />
                       .{t("ownershipStake")}<br />
                       .{t("property1")}<br />
                       .{t("property2")}<br />
                       .{t("property3")}<br />
                       .{t("property4")}<br />
                        </p>

                        <Modal show={branchModal } onHide={handleClose12} dialogClassName="modal-new1" size="lg">
                <Modal.Header closeButton>
                  <Modal.Title> {t("Branch_RELATED_SEARCHES")}</Modal.Title>
                </Modal.Header>
                <Modal.Body >

                <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>{t("id")}</th>
                        <th>{t("base")}</th>
                        <th>{t("name")}</th>
                        <th>{t("legalPersonID")}</th>
                        <th>{t("legalPersonName")}</th>
                        <th>{t("legalPersonType")}</th>
                        <th>{t("regNumber")}</th>
                        <th>{t("companyType")}</th>
                        <th>{t("companyOrgType")}</th>
                        <th>{t("regLocation")}</th>
                        <th>{t("estiblishTime")}</th>
                        <th>{t("fromTime")}</th>
                        <th>{t("toTime")}</th>
                        <th>{t("businessScope")}</th>
                        <th>{t("regInstitute")}</th>
                        <th>{t("approvedTime")}</th>
                        <th>{t("regStatus")}</th>
                        <th>{t("regCapital")}</th>
                        <th>{t("actualCapital")}</th>
                        <th>{t("orgNumber")}</th>
                        <th>{t("orgApprovedInstitute")}</th>
                        <th>{t("parentID")}</th>
                        <th>{t("listCode")}</th>
                        <th>{t("ownershipStake")}</th>
                        <th>{t("property1")}</th>
                        <th>{t("property2")}</th>
                        <th>{t("property3")}</th>
                        <th>{t("property4")}</th>
                      

                      </tr>
                    </thead>
                    <tbody>

                  {(branchdata == '')?
                  <tr>
                    <td colSpan={28}>{t("Please_search_Company_name_first")} </td>
                  </tr>:
                  branchdata.map((item, index) => (

                        <tr>
                          <td>{index + 1}</td>
                          <td>{item.id}</td>
                          <td>{item.base}</td>
                          <td>{item.name}</td>
                          <td>{item.legalPersonID}</td>
                          <td>{item.legalPersonName}</td>
                          <td>{item.legalPersonType}</td>
                          <td>{item.regNumber}</td>
                          <td>{item.companyType}</td>
                          <td>{item.companyOrgType}</td>
                          <td>{item.regLocation}</td>
                          <td>{item.estiblishTime}</td>
                          <td>{item.fromTime}</td>
                          <td>{item.toTime}</td>
                          <td>{item.businessScope}</td>
                          <td>{item.regInstitute}</td>
                          <td>{item.approvedTime}</td>
                          <td>{item.regStatus}</td>
                          <td>{item.regCapital}</td>
                          <td>{item.actualCapital}</td>
                          <td>{item.orgNumber}</td>
                          <td>{item.orgApprovedInstitute}</td>
                          <td>{item.parentID}</td>
                          <td>{item.listCode}</td>
                          <td>{item.ownershipStake}</td>
                          <td>{item.property1}</td>
                          <td>{item.property2}</td>
                          <td>{item.property3}</td>
                          <td>{item.property4}</td>
                          </tr>
                      ))
                      }
                    </tbody>
                  </Table>
                
               
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose12}>
                     {t("Close")} 
                  </Button>
                  <Button variant="primary" onClick={handleClose12}>
                  {t("Save_Changes")} 
                  </Button>
                </Modal.Footer>
              </Modal>
      
    </div>
  ) 
}
