import React, { cloneElement, useEffect, useMemo, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Form,
  Input,
  Label,
  Button,
  Row,
  Col,
  CardFooter,
  Spinner,
  CardText,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";

import { useForm } from "react-hook-form";

// ** useJwt
import useJwt from "@src/dashboard/jwt/useJwt";

// ** Navigate
import { useNavigate } from "react-router-dom";

// ** Static Feild

const Documentfeild = [
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
];

// ** Setup Document Feild get from Backend COP Data
const setDocumentfeild = (data, setDocument) => {
  if (!data.length) return;
  let bucket = [];
  // ** Maping data
  for (let i = 0; i < data.length; i++) {
    let utility = {
      application_id: localStorage.getItem("application_id"),
      document: null,
      document_type: "utility_bill",
      cop_id: data[i].uid,
      name: `${data[i].first_name} ${data[i].last_name}`,
    };
    let personal = {
      application_id: localStorage.getItem("application_id"),
      document: null,
      document_type: "personal_id",
      cop_id: data[i].uid,
      name: `${data[i].first_name} ${data[i].last_name}`,
    };
    bucket.push({ ...personal }, { ...utility });
  }

  setDocument((pre) => [...pre, ...bucket]);
};

// ** Cop dataBucket.cop.uid === documentBucket.cop_id

const setGetDocumentFromBackend = () => {
  if (!data.length) return;
  let dataBucket = [...data];
  let documentBucket = [...document];
  let application_id = localStorage.getItem("application_id");

  for (let i = 0; i < dataBucket.length; i++) {
    for (let j = 0; j < documentBucket.length; j++) {
      if (
        dataBucket[i]["document_type"] === documentBucket[j]["document_type"]
      ) {
        if (
          dataBucket[i]["document_type"] === "utility_bill" ||
          dataBucket[i]["document_type"] === "personal_id"
        ) {
          // ** Todo
          if (
            dataBucket[i]["cop"]["uid"] === documentBucket[j]["cop_id"] &&
            dataBucket[i]["document_type"] ===
              documentBucket[j]["document_type"]
          ) {
            documentBucket[j] = {
              ...dataBucket[i],
              application_id: application_id,
            };
            break;
          }
        } else {
          // ** Todo
          documentBucket[j] = {
            ...dataBucket[i],
            application_id: application_id,
          };
          break;
        }
      }
    }
  }
  setDocument([...documentBucket]);
};

// ** Feilds
const document_type = {
  corporate_documents: "Corporate Documents",
  bank_statement: "Bank Statement",
  creditcard_statement: "Creditcard Statement",
  cancel_cheque: "Cancel Cheque",
  utility_bill: "Utility Bill",
  personal_id: "Personal Id",
};

const DocumentUploadModal = ({toggle,toggleModal,uid}) => {
  // ** State
  const [loader, setLoader] = useState(false);
  const [document, setDocument] = useState(Documentfeild);
  const [countSended, setCountSended] = useState(0);
  const [flag1, setFlag1] = useState(false);
  const [flag2, setFlag2] = useState(false);

  // ** Naviagate
  const navigate = useNavigate();

  // ** Form
  const {
    control,
    setError,
    reset,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({});

  // ** get Director and UBO
  useEffect(() => {
    useJwt
      .cop_document({application_id:uid })
      .then((res) => {
        if (!res?.data?.length && res?.status === 200) {
          setFlag2(true);
        }
        if (res?.status === 200 && res?.data?.length > 0) {
          setDocumentfeild(res.data, setDocument);
          setFlag1(true);
        }
      })
      .catch((err) => {
        console.log(err?.response);
      });
  }, [toggle]);
  console.log(Documentfeild)
  // ** Post Data
  const post = (data, i) => {
    useJwt.postfileupload(data).then((res) => {
      if (res.status === 201) {
        document[i].is_save = true;
        setCountSended((count) => count + 1);
      }
    });
  };

  // ** Updata Data
  const updata = (id, data) => {
    useJwt.putfileupload(id, data).then((res) => {
      if (res.status === 200) {
        setCountSended((count) => count + 1);
      }
    });
  };

  const onSubmit = () => {
    navigate("/iso/merchant");
    setLoader(true)
    for (let i = 0; i < document.length; i++) {
      let id = null;
      let id_present = false;
      let form = new FormData();
      for (var key in document[i]) {
        if (key === "uid") {
          id_present = true;
          id = document[i][key];
        }
        if (document[i][key] === null) continue;
        if (key === "document" && typeof document[i][key] === "string")
          continue;
        else {
          form.append(key, document[i][key]);
        }
      }

      if (id_present) updata(id, form);
      // if (id_present) console.log("update");
      else post(form, i);
      // else console.log("post");
    }
  };
  // ** Get Uploade Data
  useEffect(() => {

    useJwt.getfileupload({ application_id: uid }).then((res) => {
      if (res?.status === 200 && res?.data?.length > 0) {
        if (flag1) setGetDocumentFromBackend(res?.data, document, setDocument);
      }
    });
  }, [flag1, flag2, toggle]);
  useEffect(() => {
    
    const userData = localStorage.getItem("userData");
    let l1 = countSended;
    let l2 = document.length;
    if (l1 == l2) {
      if (JSON.parse(userData).role === "merchant"){
        // navigate("/iso/merchant");
      }
        
      else if (JSON.parse(userData).role === "iso") navigate("/iso/merchant");
    }
  }, [countSended]);
  return (
    <Modal
      isOpen={toggle}
      toggle={() => toggleModal(toggle)}
      className="modal-dialog-centered modal-lg"
    >
      {/* <ModalHeader toggle={() => toggleModal(toggle)}>
      </ModalHeader> */}
      <ModalBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Card className="application-container">
            <CardHeader>
              <div className="content-header">
                <h5 className="card-title">Document</h5>
                <small className="text-muted">Upload Required Document</small>
              </div>
            </CardHeader>
            <CardBody style={{height:"70vh",overflow:"scroll"}}>
              {document &&
                document.map((i, idx) => (
                  <Row key={idx}>
                    <Col sm={12} className="mb-1 ">
                      <CardText className=" d-flex align-items-basline justify-content-between">
                        <div>
                          <span
                            className={`text-primary fw-bolder fs-5 ${
                              i.name ? "d-inline-block" : "d-none"
                            }`}
                          >
                            {i.name}:
                          </span>
                          <span
                            className={`text-primary fw-bolder fs-5 ${
                              i?.cop ? "d-inline-block" : "d-none"
                            }`}
                          >
                            {`${i?.cop?.first_name} ${i?.cop?.last_name}`}:
                          </span>
                          <br />
                        </div>
                      </CardText>
                      <div className="d-flex  justify-content-between">
                        {document_type[i.document_type]}
                        {i?.document && (
                          <a
                            className="fb-bold"
                            href={i.document}
                            target="_blank"
                          >
                            previous document click here
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
                  </Row>
                ))}
            </CardBody>
            <CardFooter className="d-flex justify-content-end mt-3">
              <div>
                <Button
                  color="success"
                  // className={`btn-next ${loader ? "d-none" : "d-block"}`}
                  className={`btn-next ${loader ? "d-none" : "d-block"}`}
                  type="submit"
                >
                  Submit
                </Button>
                <button
                  color="primary"
                  style={{padding:"5px 30px",borderRadius:"5px",border:"none",backgroundColor:"#53bdc0"}}
                  // className={`btn-next ${loader ? "d-block" : "d-none"}`}
                  className={`btn-next ${loader ? "d-block" : "d-none"}`}
                  type="submit"
                  disabled
                >
                  <Spinner size={"md"} color="white"/>
                </button>
              </div>
            </CardFooter>
          </Card>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default DocumentUploadModal;
