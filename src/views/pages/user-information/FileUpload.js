import React, { useEffect, useState } from "react";
import { Container, Row, Col, Label, Button } from "reactstrap";
import { ArrowLeft } from "react-feather";
import useJwt from "@src/dashboard/jwt/useJwt";
import { arrayOf, element } from "prop-types";
import { formatDate } from "@fullcalendar/react";

const document_option = {
  personal_id: "Passport or Driving Licence",
  bank_statement: "Bank Statement",
  corporate_documents: "Corporate Documents",
  utility_bill: "Utility Bill",
  Bank_Statement: "Bank Statement",
  creditcard_statement: "CreditCard Statement",
  cancel_cheque: "Cancel Cheque",
};

export default function FileUpload({ stepper, setCounter, counter }) {
  const [renderd, setRenderd] = useState(0);
  const [callGetData, setCallGetData] = useState(false);
  const [countSended,setCountSended]=useState(0)
  const [formField, setFormField] = useState([
    {
      application_id: localStorage.getItem("application_id"),
      document: null,
      document_type: "corporate_documents",
      is_save: false,
    },
    {
      application_id: localStorage.getItem("application_id"),
      document: null,
      document_type: "bank_statement",
    },
    {
      application_id: localStorage.getItem("application_id"),
      document: null,
      document_type: "creditcard_statement",
    },
    {
      application_id: localStorage.getItem("application_id"),
      document: null,
      document_type: "cancel_cheque",
    },
  ]);

  useEffect(() => {
    let flag = false;
    useJwt.cop_document().then((res) => {
      if (res.status === 200) {
        flag = true;
        res.data.map((data, i) => {
          setFormField((prevData) => [
            ...prevData,
            {
              application_id: localStorage.getItem("application_id"),
              document: null,
              document_type: "personal_id",
              cop_id: data.uid,
              first_name: data.first_name,
            },
            {
              application_id: localStorage.getItem("application_id"),
              document: null,
              document_type: "utility_bill",
              cop_id: data.uid,
              first_name: data.first_name,
            },
          ]);
        });
      }
    });

    flag && setCallGetData(true);
    callGetData;
  }, []);

  useEffect(async () => {
    await useJwt.getfileupload().then((res) => {
      if (res.status === 200) {
        if (res.data.length !== 0) {
          setCountSended(0)
          setGetData(res.data);
        }
      }
    });
  }, [counter]);

  function setGetData(getData) {
    let FormData = [...formField];
    let data = [...getData];
    if (data.length !== 0) {
      for (let i = 0; i < FormData.length; i++) {
        for (let j = 0; j < data.length; j++) {
          if (
            FormData[i].document_type == data[j].document_type &&
            !data[j].cop
          ) {
            let temp = FormData[i];
            FormData[i] = data[j];
            data[j] = temp;
          } else if (
            FormData[i].document_type == data[j].document_type &&
            data[j].cop.uid == FormData[i].cop_id
          ) {
            let temp = FormData[i];
            FormData[i] = data[j];
            data[j] = temp;
          } else continue;
        }
      }
      callGetData && setFormField([...FormData]);
    }
    // setFormField([...FormData]);
  }
  const onSubmit = () => {
    for (let i = 0; i < formField.length; i++) {
      let id = null;
      let id_present = false;
      let form = new FormData();
      for (var key in formField[i]) {
        if (key === "uid") {
          id_present = true;
          id = formField[i][key];
        }
        if (formField[i][key] === null) continue;
        if (key === "document" && typeof formField[i][key] === "string")
          continue;
        else {
          console.log(form.append(key, formField[i][key]))
        }
      }
    let counter=0
      if (id_present) {
        useJwt.putfileupload(id, form).then((res) => {
          if (res.status === 200) {
            // window.location='/form-query';
            setCountSended(count=>count+1)
          }
        });
      } else {
        useJwt.postfileupload(form).then((res) => {
          if (res.status === 201) {
            formField[i].is_save = true;
            setCountSended(count=>count+1)
            counter++
          }
        });
      }
    }
   
  };

useEffect(()=>{
  if(countSended===formField.length){
    window.location='/form-query'
  }
},[countSended])
  return (
    <Row className="g-3" g={5}>
      {formField &&
        formField.map((i, idx) => {
          return (
            <Col lg={6} key={idx}>
              <h5>
                {(i.first_name && i.first_name) || (i.cop && i.cop.first_name)}
              </h5>
              <div className="d-flex justify-content-between">
                <Label>{document_option[i.document_type]}</Label>
                {i.document && (
                  <a href={i.document} target={"_blank"}>
                    previous uploaded
                  </a>
                )}
              </div>
              <input
                type="file"
                className="form-control"
                accept="application/pdf, application/vnd.ms-excel"
                name={i.document}
                onChange={(event) => {
                  i.document = event.target.files[0];
                }}
              />
            </Col>
          );
        })}
      <div className="d-flex justify-content-between">
        <Button
          color="primary"
          className="btn-FormData"
          onClick={() => stepper.previous()}
        >
          <ArrowLeft
            size={14}
            className="align-middle me-sm-25 me-0"
          ></ArrowLeft>
          <span className="align-middle d-sm-inline-block d-none">
            Previous
          </span>
        </Button>
        <Button
          color="success"
          className="btn-submit"
          onClick={() => onSubmit()}
        >
          Submit
        </Button>
      </div>
    </Row>
  );
}
