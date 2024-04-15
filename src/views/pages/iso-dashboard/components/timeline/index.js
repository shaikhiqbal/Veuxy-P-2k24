import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Avatar from "@components/avatar";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Collapse,
  Row,
} from "reactstrap";
import useJwt from "@src/dashboard/jwt/useJwt";
// ** Css
import "./index.css";

const QueryList = (string = "", userType) => {
  userType = "merchant";
  const [toggle, setToggle] = useState(false);
  const [application, setApplication] = useState({});
  const navigate = useNavigate();
  const applicationQuery = JSON.parse(string);
  const applicationName = {
    CP: {
      name: "Company Profile",
      iso: "1",
      merchant: "/merchant/cp-application",
      feild: "",
    },
    BP: {
      name: "Business Profile",
      iso: "2",
      merchant: "/merchant/business-profile-application",
      feild: "",
    },
    COP: {
      name: "Company Owners",
      iso: "3",
      merchant: "/merchant/company-owners-application",
      feild: "",
    },
    SM: {
      name: "Security Measure",
      iso: "4",
      merchant: "/merchant/security-measure-application",
      feild: "",
    },
    SBD: {
      name: "Settlement Bank",
      iso: "5",
      merchant: "/merchant/settlebank-application",
      feild: "",
    },
    MC: {
      name: "Merchant Contact",
      iso: "6",
      merchant: "/merchant/merchant-contact-application",
      feild: "",
    },
    DOC: {
      name: "Document",
      iso: "7",
      merchant: "/merchant/document-application",
      feild: "",
    },
  };

  const onEdit = (link, num) => {
    if (parseInt(num) === 0) {
      navigate(link);
    } else {
      navigate(link, { state: { num: num } });
    }
  };

  useEffect(() => {
    if (applicationQuery) {
      for (let key of Object.keys(applicationName)) {
        if (applicationQuery[key]) {
          applicationName[key].feild = applicationQuery[key].length;
        } else {
          delete applicationName[key];
        }
      }
      setApplication({ ...applicationName });
    }
  }, [string]);
  return (
    <div className="query-container ">
      <div className="d-flex justify-start">
        <Button
          className="btn-sm"
          color="danger"
          onClick={() => setToggle(!toggle)}
        >
          Query Generated
        </Button>
      </div>
      <Collapse isOpen={toggle}>
        <div>
          <div className="text-start my-2">Pending Application List:</div>
          {Object.keys(application).map((i, idx) => (
            <div className="queury-list" key={idx}>
              <div className="query-application-name">
                {application[i].name}
              </div>
              <div className="query-count">
                <span className="fw-bold mx-1">Pending Feilds</span>
                <span>
               <Avatar color="light-danger" content={application[i].feild} />
                </span>
              </div>
              <div className="query-application-button">
                <Button
                  onClick={() =>
                    userType === "merchant"
                      ? onEdit(application[i].merchant, "0")
                      : onEdit("iso", application[i].iso)
                  }
                  className="btn-icon btn-sm"
                  color="primary"
                >
                  Edit
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Collapse>
    </div>
  );
};
// Under Writer Items
const UWTimelineItems = ({ data, navigate, application_id }) => {
  return (
    <div className="timeline-item" data-aos="fade-right">
      <div className="timeline-item-content">
        <div className=" timeline-top-bar">
          <span>
            <Badge pill color="light-primary" className="me-1">
              {new Date(data.time).toLocaleDateString()}
            </Badge>
          </span>
        </div>
        <div className="timeLine-message">
          {data.query_type === "automatic"
            ? QueryList(data.query_rest)
            : "Message"}
        </div>
        <div className=" timeline-footer">
          <small className="fw-bold text-muted">
            {new Date(data.time).toLocaleTimeString()}
          </small>
        </div>
        <span className="circle" />
      </div>
    </div>
  );
};

// Merchant  Items
const MerchantTimlineItems = ({ data }) => {
  return (
    <div className="timeline-item merchant" data-aos="fade-left">
      <div className="timeline-item-content">
        <div className=" timeline-top-bar d-flex justify-content-end">
          <span>
            <Badge pill color="light-primary" className="me-1">
              {new Date(data.time).toLocaleDateString()}
            </Badge>
          </span>
        </div>
        <div className=" timeLine-top-message">
          {/* <h4 className="">Message...</h4> */}
          <h4>
            {data.query_type === "automatic" ? (
              <h5>{data.query_rest.toUpperCase()}</h5>
            ) : (
              "Message"
            )}
          </h4>
        </div>
        <div className=" timeline-footer d-flex justify-content-end">
          <small className="fw-bold text-muted">
            {new Date(data.time).toLocaleTimeString()}
          </small>
        </div>
        <span className="circle" />
      </div>
    </div>
  );
};

const index = () => {
  const [application_id, setApplication_Id] = useState("");
  const [data, setData] = useState([]);
  const location = useLocation();
  const isoApplicationId = location?.state;
  const scrollBottom=useRef()
  const navigate = useNavigate("");

  const time = new Date();

  useEffect(() => {
    if (isoApplicationId) {
      setApplication_Id(isoApplicationId);
    } else {
      setApplication_Id(localStorage.getItem("application_id"));
    }
  }, []);
  useEffect(() => {
    if (application_id)
      useJwt
        .getNote({ application_id })
        .then((res) => {
          if (res?.status == 200 && res?.data?.length) {
            setData([...res?.data]);
            scrollBottom.current.scrollIntoView({ behavior: "smooth" });
          }
        })
        .catch((err) => {
          console.log(err?.response?.status);
        });
  }, [application_id]);
  return (
    <Card className="timeline-card-container ">
      <CardHeader className="timeline-header d-flex justify-content-center">
          <h1 className="text fw-bold">TIMELINE</h1>
      </CardHeader>
      <CardBody>
        <div className="timeline-container ">
          {data &&
            data.map((i, idx) => {
              if (
                i.query_raised_by_merchant ||
                i.query_rest === "form submitted"
              ) {
                return (
                  <MerchantTimlineItems
                    data={i}
                    application_id={application_id}
                    key={idx}
                    className="m-5"
                  />
                );
              } else if (
                i.query_raised_by_underwriter ||
                i.query_rest !== "form submitted"
              ) {
                return (
                  <UWTimelineItems
                    data={i}
                    application_id={application_id}
                    navigate={navigate}
                    key={idx}
                    className="m-5"
                  />
                );
              }
            })}
          <div ref={scrollBottom} />
        </div>
      </CardBody>
    </Card>
  );
};

export default index;

