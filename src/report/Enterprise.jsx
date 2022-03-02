import React, { useState, useEffect } from "react";
import { Modal, Button, Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";


export default function Enterprise(props) {

  const [enterprisevalue, setEnterprisevalue] = useState([]);
  const [enterprise, setEnterprise] = useState(false);
  const { t } = useTranslation();

    const handleClose7 = () => setEnterprise(false);
    const handleShow7 = () => {
      setEnterprise(true);
      enterprise11();
    }
    const searchValue = props.companyNamevalue;
    const enterprise11 = async () => {
        try {
          const response = await fetch('http://localhost:5000/reportapi/enterprisedata', {
            method: "post",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ searchValue })
          })
            .then(response => response.json())
            .then(data => {
              setEnterprisevalue(data.result.msg)
               
            })
        }
        catch (e) {
          console.log(e)
        }
      }
    
  
  return (
    <div>
         <p className="report_head" onClick={handleShow7}>8. {t("Enterprise")}</p>
                        <p className="report_txt">	
                          .{t("Message")}
                        </p>
       <Modal show={enterprise} onHide={handleClose7} dialogClassName="modal-new1" size="lg">
                <Modal.Header closeButton>
                  <Modal.Title>{t("Enterprise")}</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                 {(enterprisevalue == '')?
                 <div>{t("Please_search_Company_name_first")} </div>:
                 <>
                 <p>{t("Message")} :{enterprisevalue}</p>
            
                 </>
                 }
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose7}>
                  {t("Close")}   
                  </Button>
                  <Button variant="primary" onClick={handleClose7}>
                  {t("Save_Changes")} 
                  </Button>
                </Modal.Footer>
              </Modal>
    </div>
  )
}
