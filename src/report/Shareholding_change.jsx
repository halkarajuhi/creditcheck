import React, { useState, useEffect } from "react";
import { Modal, Button, Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Pdf from "react-to-pdf";

export default function Shareholding_change(props) {

const [shareholderdata, setShareholderdata] = useState([]);
const [shareholder , setShareholder] = useState(false);
const ref = React.createRef();

  const handleClose9 = () => setShareholder(false);
  const handleShow9 = () => {
    setShareholder(true);
    Shareholding_change();
  }
  const searchValue = props.companyNamevalue;
  const { t } = useTranslation();
  const Shareholding_change = async () => {
    try {
      const response = await fetch('http://localhost:5000/reportapi/Shareholding_change', {
        method: "post",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ searchValue })
      })
        .then(response => response.json())
        .then(data => {
          setShareholderdata(data.result.items) 
          
         })
    }
    catch (e) {
      console.log(e)
    }
  }

  return (
    <div>
        <p className="report_head" onClick={handleShow9}>10. {t("Shareholding_change")}</p>
                        <p className="report_txt">
                          . {t("InvestorName")}<br />
                          .	{t("RatioBefore")}<br />
                          .	{t("RatioAfter")}<br />
                          .	{t("ChangeTime")}<br />
                        </p>

      {/* *******************FOregin Investment******************** */}

      <Modal show={shareholder} onHide={handleClose9} dialogClassName="modal-new" size="lg">
                <Modal.Header closeButton>
                  <Modal.Title> {t("Shareholding_change")}</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th> {t("InvestorName")}</th>
                        <th> {t("RatioBefore")}</th>
                        <th> {t("RatioAfter")}</th>
                        <th>{t("ChangeTime")}</th>
                        

                      </tr>
                    </thead>
                    <tbody>

                  {(shareholderdata == '')?
                  <div>{t("Please_search_Company_name_first")}</div>:
                      shareholderdata.map((item, index) => (

                        <tr>
                          <td>{index + 1}</td>
                          <td>{item.investorName}</td>
                          <td>{item.ratioBefore}</td>
                          <td>{item.ratioAfter}</td>
                          <td>{item.changeTime}</td>
                          </tr>
                      ))
                      }
                    </tbody>
                  </Table>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose9}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={handleClose9}>
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Modal>
              {/* *******************Entriprise Model******************** */}
      
    </div>
  )
}
