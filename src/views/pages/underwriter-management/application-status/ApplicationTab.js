import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";

import ApplicationCard from "./ApplicationCard";
import ApplicationStatus from "../../../components/underwriter-dashboard/ApplicationStatus";

// import UILoader from "../../../../@core/components/ui-loader";
// import Loading from "../../../@core/components/spinner/Loading-spinner";
import Loading from "../../../../@core/components/spinner/Loading-spinner";
import useJwt from "@src/dashboard/jwt/useJwt";
const title = {
  pending: "Pending Application",
  approved: "Approved Application",
  rejected: "Rejected Application",
  uw: "Underwriter Application",
  incomplited: "Incomplited",
};

const ApplicationTab = () => {
  const userInfo = localStorage.getItem("userData");
  const [data, setData] = useState({});
  const [loader, setLoader] = useState(true);
  const [dataType, setDataType] = useState("pending");
  const [role, setRole] = useState(null);
  const [show, setShow] = useState(0);

  // ** fetching list data
  useEffect(() => {
    // const dataType = { pending: "P&status=MQ", approved: "A", rejected: "R" };
    const dataType = {
      pending: "INC,MQ",
      approved: "AA",
      rejected: "REJ",
      uw: "AUW",
    };

    const fetchData = async (list) => {
      const store = {};
      for (const key in dataType) {
        try {
          const response = await useJwt.application_view(dataType[key]);
          store[key] = response?.data;
        } catch (error) {
          console.log(error);
        }
      }
      setData({ ...store });
      setShow(1);
    };
    fetchData();
    const userDetail = JSON.parse(userInfo);
    const { role } = userDetail;
    setRole(role);
    setLoader(false);
  }, []);
  if (loader) return <Loading />;
  return (
    <Row>
      <Col xl="12" sm="12" md="12">
        <ApplicationCard setTable={setDataType} data={data} show={show} />
      </Col>
      <Col
        xl="12"
        sm="12"
        md="12"
        style={{
          transition: "all 0.5s",
          cursor: "pointer",
          transform: `scale(${show})`,
        }}
      >
        <ApplicationStatus list={data[dataType]} title={title[dataType]} />
      </Col>
    </Row>
  );
};

export default ApplicationTab;

// {!loader ? (
//   <>

//   </>
// ) : (
//   <Col
//     xl="12"
//     sm="12"
//     md="12"
//     style={{ height: "80vh", width: "100vw" }}
//   >
//     <Loading />
//   </Col>
// )}
