import React, { useState, useEffect } from "react";
import { Modal, Button, Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export default function Taxpayer_identification(props) {

    const [taxpayerModal , setTaxpayerModal] = useState(false);
    const [taxpayer_data, setTaxpayer_data] = useState([]);
    const handleClose10 = () => setTaxpayerModal(false);
    const handleShow10 = () => {
      setTaxpayerModal(true);
      Tax_payer_identification();
    }

    const searchValue = props.companyNamevalue;
    const { t } = useTranslation();

    const Tax_payer_identification = async () => {
        try {
          const response = await fetch('http://localhost:5000/reportapi/taxpayer_identification', {
            method: "post",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ searchValue })
          })
            .then(response => response.json())
            .then(data => {
              setTaxpayer_data(data.result) 
             
             })
        }
        catch (e) {
          console.log(e)
        }
      }
  return (
    <div>
         <p className="report_head" onClick={handleShow10}>11.{t("Obtain_a_taxpayer_identification")}</p>
                      
  {/* *******************FOregin Investment******************** */}

  <Modal show={taxpayerModal} onHide={handleClose10} dialogClassName="modal-new1" size="lg">
                <Modal.Header closeButton>
                  <Modal.Title>{t("Obtain_a_taxpayer_identification")}</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                 {(taxpayer_data == '')?
                 <div>{t("Please_search_Company_name_firstPlease")}</div>:
                 <>
                 <p>Data :{taxpayer_data}</p>
            
                 </>
                 }
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose10}>
                  {t("Close")}   
                  </Button>
                  <Button variant="primary" onClick={handleClose10}>
                  {t("Save_Changes")} 
                  </Button>
                </Modal.Footer>
              </Modal>

      
    </div>
  )
}
