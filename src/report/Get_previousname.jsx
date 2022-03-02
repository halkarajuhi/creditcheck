import React, { useState, useEffect } from "react";
import { Modal, Button, Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export default function Get_previousname(props) {

 const [previousname_Modal , setPreviousname_Modal] = useState(false);
const [previous_data, setPrevious_data] = useState([]);
const { t } = useTranslation(); 
   const searchValue = props.companyNamevalue;
    console.log(searchValue)
    const handleClose13 = () => setPreviousname_Modal(false);
    const handleShow13 = () => {
        setPreviousname_Modal(true);
      Previousname();
    }

    const Previousname = async () => {
        try {
          const response = await fetch('http://localhost:5000/reportapi/previous_name', {
            method: "post",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ searchValue})
          })
            .then(response => response.json())
            .then(data => {
                setPrevious_data(data.result)
            })
        }
        catch (e) {
          console.log(e)
        }
      }
    
  return (
    <div>
        <p className="report_head" onClick={handleShow13}>15.{t("Get_the_Previous_Name")}</p>
        <p className="report_txt">
     . {t("historyNames")} <br />
      .{t("companyNum")} <br />
     . {t("base")}<br />
        </p>


        {/* *******************FOregin Investment******************** */}

        <Modal show={previousname_Modal } onHide={handleClose13} dialogClassName="modal-new1">
                <Modal.Header closeButton>
                  <Modal.Title>{t("Get_the_Previous_Name")}</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                  {(previous_data == "")? <tr>
                    <td colSpan={3}>{t("Please_search_Company_name_first")} </td>
                  </tr>:
                 

                <Table striped bordered hover>
                      <tr>{t("historyNames")}  : {previous_data.historyNames}</tr>
                       <tr>{t("companyNum")} : {previous_data.name}</tr>
                      <tr>{t("base")} : {previous_data.total}</tr>
                     
                  </Table>
                
              }
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose13}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={handleClose13}>
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Modal>

      
    </div>
  )
}
