import React, { useState, useEffect } from "react";
import { Modal, Button, Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import jsPDF from 'jspdf'; 
import 'jspdf-autotable';

export default function Annual_report(props) {


  const handleClose6 = () => setAnnualModal(false);
  const [annualModal, setAnnualModal] = useState(false);
  const [annualdata, setAnnualdata] = useState([]);

  const handleShow6 = () => {
    setAnnualModal(true);
    Annualreportapi();
  }
  const searchValue = props.companyNamevalue;
  const { t } = useTranslation();
  const ref = React.createRef();

  const Annualreportapi = async () => {
    try {
      const response = await fetch('http://localhost:5000/reportapi/annualapi', {
        method: "post",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ searchValue })
      })
        .then(response => response.json())
        .then(data => {
          setAnnualdata(data.result.items)
        })
    }
    catch (e) {
      console.log(e)
    }
  }
  function generate() {
    var doc = new jsPDF();
  
  
      doc.autoTable({
        html: "#annual_report",
        headStyles: {
          halign: "center",
          valign: "middle",
          lineWidth: 0.25,
          lineColor: 200
        },
        bodyStyles: {
          halign: "center",
          lineWidth: 0.25,
          lineColor: 200
        },
        margin: {
          top: 30
        },
      })

  
    doc.save('Annual_report');
  }

  return (
    <div>
      <p className="report_head" onClick={handleShow6}>7.	{t("Annual_report_details")}</p>
      <p className="report_txt">.{t("Investor_Type")} <br />
        .{t("baseInfo")}<br />
        .{t("company_id")}<br />
        .{t("report_year")}<br />
        .{t("company_name")}<br />
        .{t("credit_code")}<br />
        .{t("reg_number")}<br />
        .{t("phone_number")}<br />
        .{t("postcode")}<br />
        .{t("email")}<br />
        .{t("manage_state")}<br />
        .{t("employee_num")}<br />
        .{t("subscribe_amount")}<br />
        .{t("subscribe_type")}<br />
        .{t("paid_amount")}<br />
        .{t("paid_time")}<br />
        .{t("paid_type")}<br />
      </p>
      {/* *******************FOregin Investment******************** */}

      <Modal show={annualModal} onHide={handleClose6} dialogClassName="modal-new1" size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{t("Annual_report_details")}</Modal.Title>
        </Modal.Header>
        <Modal.Body >
         
          <div >
            <h2>{t("Annual_report_details")}</h2>
            <Table striped bordered hover responsive="xxl" id = "annual_report">
              {/* <thead>
                      <tr>
                        <th>#</th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th>{t("postcode")}</th>
                        <th>{t("email")}</th>
                        <th>{t("manage_state")}</th>
                        <th>{t("employee_num")}</th>
                        <th>{t("subscribe_amount")}</th>
                        <th>{t("subscribe_type")}</th>
                        <th>{t("paid_amount")}</th>
                        <th>{t("paid_time")}</th>
                        <th>{t("paid_type")}</th>
                        </tr>
                    </thead> */}
              <tbody>
                {annualdata.map((item, index) => (

                  <>
                    <tr>{index + 1}</tr>
                    <tr>{t("baseInfo")} : {item.baseInfo.id}</tr>
                    <tr>{t("company_id")}:{item.baseInfo.company_id}</tr>
                    <tr>{t("report_year")}:{item.baseInfo.report_year}</tr>
                    <tr>{t("company_name")}:{item.baseInfo.company_name}</tr>
                    <tr>{t("credit_code")}:{item.baseInfo.credit_code}</tr>
                    <tr>{t("reg_number")}:{item.baseInfo.reg_number}</tr>
                    <tr>{t("phone_number")}:{item.baseInfo.phone_number}</tr>
                    <tr>{t("postcode")}:{item.baseInfo.postcode}</tr>
                    <tr>{t("email")}:{item.baseInfo.email}</tr>
                    <tr>{t("manage_state")}:{item.baseInfo.manage_state}</tr>
                    <tr>{t("employee_num")}:{item.baseInfo.employee_num}</tr>
                    <tr>{t("operator_name")}:{item.baseInfo.operator_name}</tr>
                    <tr>{t("total_assets")}:{item.baseInfo.total_assets}</tr>
                    <tr>{t("total_equity")}:{item.baseInfo.total_equity}</tr>
                    <tr>{t("total_sales")}:{item.baseInfo.total_sales}</tr>
                    <tr>{t("total_profit")}:{item.baseInfo.total_profit}</tr>
                    <tr>{t("prime_bus_profit")}:{item.baseInfo.prime_bus_profit}</tr>
                    <tr>{t("retained_profit")}:{item.baseInfo.retained_profit}</tr>
                    <tr>{t("total_tax")}:{item.baseInfo.total_tax}</tr>
                    <tr>{t("total_liability")}:{item.baseInfo.total_liability}</tr>
                    <tr></tr>
                    {item.changeRecordList.map((val, index) => (

                      <>

                        <tr>{t("change_item")}:{val.change_item}</tr>
                        <tr>{t("content_before")}:{val.content_before}</tr>
                        <tr>{t("content_after")}:{val.content_after}</tr>
                        <tr>{t("change_time")}:{val.change_time}</tr>
                      </>
                    ))}
                    {item.equityChangeInfoList.map((value, index) => (
                      <>
                        <tr></tr>
                      </>
                    ))}
                    {item.outGuaranteeInfoList.map((value1, index) => (
                      <tr>

                      </tr>
                    ))}
                    {item.outboundInvestmentList.map((list, index) => (
                      <>
                        <tr>{t("outcompany_name")}:{list.outcompany_name}</tr>
                        <tr>{t("reg_num")}:{list.reg_num}</tr>
                        <tr>{t("credit_code")}:{list.credit_code}</tr>

                      </>
                    ))}
                    {item.shareholderList.map((list1, index) => (
                      <>
                        <tr>{t("investor_name")}:{list1.investor_name}</tr>
                        <tr>{t("subscribe_amount")}:{list1.subscribe_amount}</tr>
                        <tr>{t("subscribe_time")}:{list1.subscribe_time}</tr>
                        <tr>{t("subscribe_type")}:{list1.subscribe_type}</tr>
                        <tr>{t("paid_amount")}:{list1.paid_amount}</tr>
                        <tr>{t("paid_time")}:{list1.paid_time}</tr>
                        <tr>{t("paid_type")}:{list1.paid_type}</tr>
                      </>))}
                    {item.reportSocialSecurityInfo.map((list2, index) => (
                      <>
                        <tr>{t("endowment_insurance")}:{list2.endowment_insurance}</tr>
                        <tr>{t("unemployment_insurance")}:{list2.unemployment_insurance}</tr>
                        <tr>{t("medical_insurance")}:{list2.medical_insurance}</tr>
                        <tr>{t("employment_injury_insurance")}:{list2.employment_injury_insurance}</tr>
                        <tr>{t("maternity_insurance")}:{list2.maternity_insurance}</tr>
                        <tr>{t("endowment_insurance_base")}:{list2.endowment_insurance_base}</tr>
                        <tr>{t("unemployment_insurance_base")}:{list2.unemployment_insurance_base}</tr>
                        <tr>{t("medical_insurance_base")}:{list2.medical_insurance_base}</tr>
                        <tr>{t("maternity_insurance_base")}:{list2.maternity_insurance_base}</tr>
                        <tr>{t("endowment_insurance_pay_amount")}:{list2.endowment_insurance_pay_amount}</tr>
                        <tr>{t("unemployment_insurance_pay_amount")}:{list2.unemployment_insurance_pay_amount}</tr>
                        <tr>{t("medical_insurance_pay_amount")}:{list2.medical_insurance_pay_amount}</tr>
                        <tr>{t("employment_injury_insurance_pay_amount")}:{list2.employment_injury_insurance_pay_amount}</tr>
                        <tr>{t("maternity_insurance_pay_amount")}:{list2.maternity_insurance_pay_amount}</tr>
                        <tr>{t("endowment_insurance_owe_amount")}:{list2.endowment_insurance_owe_amount}</tr>
                        <tr>{t("unemployment_insurance_owe_amount")}:{list2.unemployment_insurance_owe_amount}</tr>
                        <tr>{t("medical_insurance_owe_amount")}:{list2.medical_insurance_owe_amount}</tr>
                        <tr>{t("employment_injury_insurance_owe_amount")}:{list2.employment_injury_insurance_owe_amount}</tr>
                        <tr>{t("maternity_insurance_owe_amount")}:{list2.maternity_insurance_owe_amount}</tr>
                      </>))}
                    {item.webInfoList.map((value1, index) => (
                      <tr>

                      </tr>
                    ))}

                  </>
                ))}
              </tbody>
            </Table>
          </div>
        </Modal.Body>
        <Button onClick={generate} variant="contained" color="primary">Generate Pdf </Button> 
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose6}>
            {t("Close")}
          </Button>
          <Button variant="primary" onClick={handleClose6}>
            {t("Save_Changes")}
          </Button>

        </Modal.Footer>
      </Modal>
      {/* *******************Entriprise Model******************** */}

    </div>
  )
}
