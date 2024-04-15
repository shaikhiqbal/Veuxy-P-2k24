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
  Progress,
} from "reactstrap";

// ** Third Party Components
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);
const handleWarning = () => {
  return MySwal.fire({
    title: "",
    text: " Please Fill Atleast Company Profile!",
    icon: "warning",
    customClass: {
      confirmButton: "btn btn-primary",
    },
    buttonsStyling: false,
  });
};
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
      attempt: 1,
    };
    let personal = {
      application_id: localStorage.getItem("application_id"),
      document: null,
      document_type: "personal_id",
      cop_id: data[i].uid,
      name: `${data[i].first_name} ${data[i].last_name}`,
      attempt: 2,
    };
    bucket.push({ ...personal }, { ...utility });
  }
  setDocument((pre) => [...pre, ...bucket]);
};

// ** Setup Document Feild Get Backend Uploaded Data

// ** Cop dataBucket.cop.uid === documentBucket.cop_id

const setGetDocumentFromBackend = (
  data = [],
  document = [],
  setDocument,
  setDocumentName
) => {
  if (!data.length) return;
  let dataBucket = [...data];
  let documentBucket = [...document];
  let documentName = [];
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
  const progressNum = 100 / documentBucket.length;
  documentBucket.forEach((i, index) => {
    if (!i.document) i.message = "empty feild";
    documentName.push({
      [index + 1]: {
        document_type: i.document_type,
        cop_user_name:
          i?.cop?.first_name && i?.cop?.first_name + " " + i?.cop?.last_name,
        progress: progressNum,
      },
    });
  });
  setDocument([...documentBucket]);
  setDocumentName([...documentName]);
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

const Document = (props) => {
  const { application_id, recallOwners,next } = props;
  // ** State
  const [loader, setLoader] = useState(false);
  const [document, setDocument] = useState(Documentfeild);
  const [countSended, setCountSended] = useState(0);
  const [flag1, setFlag1] = useState(false);
  const [flag2, setFlag2] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressSum, setProgressSum] = useState(0);
  const [documentName, setDocumentName] = useState([]);
  const applicationID = localStorage.getItem("application_id");
  // ** Naviagate
  const navigate = useNavigate();

  // ** get Director and UBO
  useEffect(() => {
    useJwt
      .cop_document({ application_id })
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
  }, [recallOwners, application_id]);
  // ** Post Data
  const post = (data, i) => {
    useJwt
      .postfileupload(data)
      .then((res) => {
        if (res.status === 201) {
          document[i].is_save = true;
          setCountSended((count) => count + 1);
        }
      })
      .catch((error) => {
        if (error?.response?.status) setLoader(false);
      });
  };

  // ** Updata Data
  const updata = (id, data) => {
    useJwt
      .putfileupload(id, data)
      .then((res) => {
        if (res.status === 200) {
          setCountSended((count) => count + 1);
        }
      })
      .catch((error) => {
        if (error?.response?.status) setLoader(false);
      });
  };
  const onSubmit = (e) => {
    setLoader(true);
    if (applicationID == "undefined") {
      handleWarning();
      navigate("/merchant/cp-application");
    } else {
      for (let i = 0; i < document.length; i++) {
        let id = null;
        let id_present = false;
        let form = new FormData();
        if (document[i].cop) {
          document[i].cop_id = document[i].cop.uid;
          delete document[i].cop;
        }
      }
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
        else post(form, i);
      }
    }
  };
  // ** Get Uploade Data
  useEffect(() => {
    useJwt.getfileupload({ application_id }).then((res) => {
      if (res?.status === 200 && res?.data?.length > 0) {
        if (flag1)
          setGetDocumentFromBackend(
            res?.data,
            document,
            setDocument,
            setDocumentName
          );
      }
    });
  }, [flag1, flag2, application_id]);
  useEffect(() => {
    const userData = localStorage.getItem("userData");
    let l1 = countSended;
    let l2 = document.length;
    if (l1 == l2) {
      next("7")
    }
  }, [countSended]);
  return (
    <Card className="application-container">
      <CardHeader>
        <div className="content-header">
          <h5 className="card-title">Document</h5>
          <small className="text-muted">Upload Required Document</small>
        </div>
      </CardHeader>
      <CardBody>
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
                    <a className="fb-bold" href={i.document} target="_blank">
                      previous document click here
                    </a>
                  )}
                </div>
                <Input
                  type="file"
                  // className="form-control"
                  className={`${i?.message ? "inputError" : null}`}
                  accept="application/pdf, application/vnd.ms-excel"
                  name={i.document}
                  onChange={(event) => {
                    i.document = event.target.files[0];
                    i.message && delete i.message;
                  }}
                />
                {i?.message && (
                  <small className="text-danger">{i?.message}</small>
                )}
              </Col>
            </Row>
          ))}
      </CardBody>
      <CardFooter className="d-flex justify-content-between mt-3">
        <Button
          onClick={() => {
            navigate("/merchant/settlebank-application");
          }}
          color="secondry btn-outline-secondary"
        >
          <span className="align-middle d-sm-inline-block d-none">
            Previous
          </span>
        </Button>
        <div>
          <Button
            color="primary"
            className={`btn-next ${loader ? "d-none" : "d-block"}`}
            onClick={onSubmit}
          >
            Next
          </Button>
          <button
            color="primary"
            className={`btn-next ${loader ? "d-block" : "d-none"}`}
            type="submit"
            disabled
          >
            <Spinner size={"md"} />
          </button>
        </div>
      </CardFooter>
      <div className={`${countSended ? "d-block" : "d-none"} m-1`}>
        <div className="d-flex justify-content-between">
          {documentName[countSended]?.cop_user_name &&
            documentName[countSended]?.cop_user_name}
          <span>{documentName[countSended]?.document_type}</span>
          <span>{`${progress ? progress : 0}%`}</span>
        </div>
        <Progress striped className="progress-bar-success" value={progress} />
      </div>
    </Card>
  );
};

export default Document;
