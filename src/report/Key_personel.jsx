import React, { useState, useEffect } from "react";
import { Modal, Button, Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import jsPDF from 'jspdf'; 
import 'jspdf-autotable';

export default function Key_personel(props) {

  const [data, setData] = useState([]);

  const [showModal, setShow] = useState(false);

  const { t } = useTranslation();

 

  const searchValue = localStorage.getItem('searchvalue');
  
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    keyPersonelapi();
  }

  
  const keyPersonelapi = async () => {
    try {
      const response = await fetch('http://localhost:5000/reportapi/getData', {
        method: "post",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ searchValue })
      })
        .then(response => response.json())
        .then(data => {
          setData(data.result.items)
        })
    }
    catch (e) {
      console.log(e)
    }
  }
  function generate() {
    const doc = new jsPDF('p', 'mm');
  
    doc.autoTable({
      html: '#my-table',
      theme: 'grid',
    });
   doc.save('key_personel');
  }


  return (
    <div>

      <p className="report_head" onClick={handleShow}>1.{t("key_personel")}</p>
      <p className="report_txt">.	{t("company_id")}<br />
        .	{t("staff_id")} <br />
        .{t("staff_name")} <br />
      </p>

      <Modal show={showModal} onHide={handleClose} id="pdfdiv" >
        <Modal.Header closeButton>
          <Modal.Title>{t("key_personel")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         
          <div >
          <h3>{t("key_personel")}</h3>
            <Table striped bordered hover   id="my-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>{t("company_id")}</th>
                  <th>{t("staff_id")}</th>
                  <th>{t("staff_name")} </th>
                </tr>
              </thead>
              <tbody>
                {(data != '') ?
                  data.map((item, index) => (

                    <tr>
                      <td>{index + 1}</td>
                      <td>{item.companyID}</td>
                      <td>{item.staffID}</td>
                      <td>{item.staffTypeName}</td>
                    </tr>
                  )) :
                  <tr><td colSpan={4}>{t("Please_search_Company_name_firstPlease")}</td></tr>}

              </tbody>
            </Table>
          </div>
        </Modal.Body>
        <Button onClick={generate} variant="contained" color="primary">  
            Generate Pdf  </Button> 
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
