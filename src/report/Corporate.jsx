import React, { useState, useEffect } from "react";
import { Modal, Button, Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";


export default function Corporate(props) {
    const [coporate, setCoporate] = useState(false);

    const [corporatedata, setCorporatedata] = useState([]);
    const [paging, setPaging] = useState('');
    
    const handleClose8 = () => setCoporate(false);

    const handleShow8 = () => {
        setCoporate(true);
        corporate_contact();
      }
      const { t } = useTranslation();
      const searchValue = props.companyNamevalue;

    const corporate_contact = async () => {
        try {
            const response = await fetch('http://localhost:5000/reportapi/corporate_contact', {
                method: "post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ searchValue })
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data.result.items)
                     setCorporatedata(data.result.items)
                     console.log(corporatedata)
                     setPaging(data.result.paging)

                })
        }
        catch (e) {


            console.log(e)
        }
    }
    return (
        <div>
            <p className="report_head" onClick={handleShow8}>9.{t("Corporate_Contact")}</p>
            <p className="report_txt">
                .	{t("report_lastest")}<br />
                .   {t("report_more")}<br />
                .	{t("Page_num")}<br />
                .	{t("page_size")}<br />
                .   {t("total")}
            </p>

            <Modal show={coporate} onHide={handleClose8} dialogClassName="modal-new1" size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{t("Corporate_Contact")}</Modal.Title>
                </Modal.Header>

                <Modal.Body >
                <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>{t("report_lastest")}</th>
                        <th>{t("report_more")}</th>
                         </tr>
                        </thead>
                        <tbody>
                    { (corporatedata == '')?
                    <tr>{t("Please_search_Company_name_first")}</tr> :
                    corporatedata.map((item, index) => ( 
                        <tr>
                        <td>{index + 1}</td>
                        <td>{item.report_lastest}</td>
                        <td>{item.report_more}</td>
                        </tr>
                        ))
                        }
                        </tbody>
                        </Table>
                        { (corporatedata == '')?
                        <div></div>:
                        <>
                        <div>{t("Page_num")} :- {paging.page_num}</div>
                        <div>{t("page_size")} :- {paging.page_size}</div>
                        <div>{t("total")} :-{paging.total}</div>
                        </>
                      }
                      
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose8}>
                    {t("Close")} 
                    </Button>
                    <Button variant="primary" onClick={handleClose8}>
                    {t("Save_Changes")} 
                    </Button>
                </Modal.Footer>
            </Modal>


        </div>
    )
}
