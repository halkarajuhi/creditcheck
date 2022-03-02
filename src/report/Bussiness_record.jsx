import React, { useState, useEffect } from "react";
import { Modal, Button, Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import jsPDF from 'jspdf'; 
import 'jspdf-autotable';

  

export default function Bussiness_record(props) {

    const [bussinessdata, setBussinessdata] = useState([]);
    const [bussinessModal, setBussinessModal] = useState(false);

    const searchValue = props.companyNamevalue;
   
    const { t } = useTranslation();

  const handleClose2 = () => setBussinessModal(false);
  const handleShow2 = () => {
    setBussinessModal(true);
    Bussinessrecord();
  }
  const Bussinessrecord = async () => {
    try {
      const response = await fetch('http://localhost:5000/reportapi/bussinessrecord', {
        method: "post",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ searchValue })
      })
        .then(response => response.json())
        .then(data => {
          setBussinessdata(data.result.items)
        })
    }
    catch (e) {
      console.log(e)
    }
  }
  function generate() {
    const doc = new jsPDF('p', 'mm');
   var font = './SourceHans.ttf';

doc.addFileToVFS('./SourceHanSerifCN-Regular.ttf', font);
doc.addFont('./SourceHanSerifCN-Regular.ttf', 'SourceHanSerifCN-Regular', 'normal');

doc.setFont('SourceHanSerifCN-Regular');
    doc.autoTable({
      html: "#record",
      headStyles: {
        
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


  doc.save('bussiness_record');
  
  
  }

  return (
    <div> 
   
         <p className="report_head" onClick={handleShow2} >3.{t("business_change_records")}</p>
                        <p className="report_txt">.	{t("id")}<br />
                          .	{t("Company_id")}<br />
                          .{t("changeItem")} <br />
                          .	{t("contentBefore")} <br />
                          .	{t("contentAfter")} <br />
                          .	{t("changeTime")}<br />

                        </p>

                        <Modal show={bussinessModal} onHide={handleClose2}>
                <Modal.Header closeButton>
                  <Modal.Title>{t("business_change_records")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                
       
                  <Table striped bordered hover id="record">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th> {t("Company_id")}</th>
                        <th> {t("changeItem")}</th>
                        <th>{t("contentBefore")}</th>
                        <th> {t("contentAfter")}</th>
                        <th>{t("changeTime")}</th>

                      </tr>
                    </thead>
                    <tbody>
                      {(bussinessdata != '') ?
                        bussinessdata.map((item, index) => (

                          <tr>
                            <td>{index + 1}</td>
                            <td>{item.companyID}</td>
                            <td>{item.changeItem}</td>
                            <td>{item.contentBefore}</td>
                            <td>{item.contentAfter}</td>
                            <td>{item.changeTime}</td>
                          </tr>
                        )) :

                        <tr><td colSpan={6}>Please search with company Name</td></tr>

                      }
                    </tbody>
                  </Table>
                 
                </Modal.Body>
                <Button onClick={generate} variant="contained" color="primary">  
            Generate Pdf  </Button>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose2}>
                  {t("Close")} 
                  </Button>
                  <Button variant="primary" onClick={handleClose2}>
                  {t("Save_Changes")} 
                  </Button>
                </Modal.Footer>
              </Modal>
      
    </div>
  )
}
