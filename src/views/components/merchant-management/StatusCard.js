import React, { useEffect, useState } from "react";

// ** Third Party Components
import classnames from "classnames";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Reactstrap Imports
import {
  Card,
  CardTitle,
  CardText,
  CardBody,
  Label,
  Badge,
  Button,
  Row,
  Col,
  Alert,
} from "reactstrap";

import useJwt from "@src/dashboard/jwt/useJwt";

import { useLocation, useNavigate } from "react-router-dom";

import { Edit, Eye } from "react-feather";

import { useSelector } from "react-redux";

import TimeLine from "../application-timeline/TimeLine";

const applicationStatus = {
  INC: { name: "Incomplete", color: "light-warning" },
  SUB: { name: "Submitted", color: "light-info" },
  MAQ: { name: "Manual Query", color: "light-secondry" },
  REJ: { name: "Rejected", color: "light-danger" },
  STB: { name: "Send To Bank", color: "light-info" },
  RAR: { name: "Rate Received", color: "light-info" },
  AUW: { name: "Approve By Underwriter", color: "light-secondry" },
  ABA: { name: "Approved", color: "light-success" },
  AAI: { name: "Approve By Admin By Pass Iso", color: "light-primary" },
  ABI: { name: "Approve By Iso", color: "light-primary" },
  ABM: { name: "Approve By Merchant", color: "light-primary" },
};

const CardAppDesign = () => {
  const location = useLocation();

  const [userInfo, setUserInfo] = useState([]);

  const [userId, setUserId] = useState(location?.state?.userId || "");

  const navigate = useNavigate();

  const userRole = useSelector((state) => state.auth.userData.role);

  const avatarArr = [
    {
      img: require("@src/assets/images/portrait/small/avatar-s-9.jpg").default,
      imgHeight: 34,
      imgWidth: 34,
    },
    {
      content: "PI",
      color: "light-danger",
    },
    {
      img: require("@src/assets/images/portrait/small/avatar-s-14.jpg").default,
      imgHeight: 34,
      imgWidth: 34,
    },
    {
      img: require("@src/assets/images/portrait/small/avatar-s-7.jpg").default,
      imgHeight: 34,
      imgWidth: 34,
    },
    {
      content: "AL",
      color: "light-secondary",
    },
  ];

  ///merchant-rates-view
  const designPlanningArr = [
    {
      title: "Query Management",
      btn: "See",
      navigate: "/view-query",
      icon: <Eye size={14} />,
    },
    {
      title: "Edit Application",
      btn: "Edit",
      navigate: {
        // merchant: "/merchant/cp-application",
        merchant: "/application-create",
        iso: "/application-create",
      },
      icon: <Edit size={14} />,
    },
  ];

  useEffect(() => {
    useJwt.getApplication(userId || "").then((res) => {
      if (res.status === 200) {
        setUserInfo([...res?.data]);
        if (res?.data?.length > 1) {
          const filterOut = res?.data.filter((ele) => ele.uid === userId);
          setUserInfo({ ...filterOut[0] });
        } else {
          setUserInfo({ ...res?.data[0] });
        }
      }
    });
  }, []);

  if (!Object.keys(userInfo).length) return <p>loading....</p>;
  const content = (status) => {
    switch (status) {
      case "INC":
        return (
          // <span className="me-1" color="light-danger">
          <Alert color="warning">
            We have noticed some Required Information is Missing from your
            Application Please Click on timeline and Which will guide to which
            Information is Required
          </Alert>
        );
      case "SUB":
        return (
          <Alert color="info">
            We have all the Necessary details our team is working with to find
            the most cost effective and reliable solution for you
          </Alert>
        );
      case "AUW":
        return (
          <Alert color="info">
            We have all the Necessary details our team is working with to find
            the most cost effective and reliable solution for you
          </Alert>
        );
      case "MAQ":
        return (
          <Alert color="info">
            Our Underwiter team is looking for some information which can help
            them to find best solution for you.
          </Alert>
        );
      case "REJ":
        return (
          <Alert color="danger">
            We are sorry we cannot find any solution that will fit you
            requirement as of now we will be happy to reconsider you Application
            in Near Future.
          </Alert>
        );
      default:
        return "";
    }
  };

  return (
    <>
      {userInfo && (
        <Row className="d-flex justify-content-center">
          <Col sm="12" md="6" lg="6">
            {" "}
            <Card className="card-app-design">
              <Row className="m-1">
                <Col
                  sm={12}
                  className="d-flex justify-content-between border-bottom"
                >
                  <div className="d-flex justify-content-between mb-1">
                    <Badge color="light-primary">05 Sep, 23</Badge>
                  </div>
                  <div>
                    <Badge
                      className="me-1"
                      color={applicationStatus?.[userInfo["status"]]?.["color"]}
                    >
                      Application
                      {applicationStatus?.[userInfo["status"]]?.["name"]}
                    </Badge>
                  </div>
                </Col>
              </Row>
              <CardBody>
                <Row>
                  <Col sm={12} md={12} lg={12}>
                    <div className="design-group mb-1 pt-50">
                      <h6 className="section-label">Name</h6>
                      <Badge className="me-1" color="light-info">
                        {userInfo?.user?.full_name}
                      </Badge>
                    </div>
                    <div className="design-group mb-1 pt-50">
                      <h6 className="section-label">Email</h6>
                      <Badge className="me-1" color="light-info">
                        {userInfo?.user?.email}
                      </Badge>
                    </div>
                    <div className="design-group mb-1 pt-50">
                      <h6 className="section-label">Mobile</h6>
                      <Badge className="me-1" color="light-info">
                        {userInfo?.user?.mobile}
                      </Badge>
                    </div>
                    <Row className="design-group mb-2 pt-50">
                      <h6 className="section-label">Note:</h6>
                      <Col
                        sm="12"
                        md="12"
                        lg="12"
                        className="font-small-2 mb-1 my-1 "
                      >
                        {content(userInfo?.status)}
                      </Col>
                    </Row>
                    <>
                      <h6 className="section-label">Mangament</h6>
                      <div className="design-group pt-25 d-flex">
                        {designPlanningArr.map((obj, index) => {
                          return (
                            <div className="mx-2" key={index}>
                              <h4 className="section-label"> {obj?.title}</h4>
                              {/* {console.log(
                          userInfo?.status == "AA" || "AUW" ? true : false
                        )} */}
                              <Button.Ripple
                                onClick={() =>
                                  navigate(
                                    designPlanningArr.length - 1 == index
                                      ? obj?.navigate?.[userRole]
                                      : obj?.navigate,
                                    {
                                      state: {
                                        application_id: userInfo?.uid,
                                        user_type: userRole,
                                      },
                                    }
                                  )
                                }
                                className="btn-sm"
                                outline
                                color="primary"
                              >
                                {obj.icon}
                                <span className="align-middle ms-25">
                                  {obj.btn}
                                </span>
                              </Button.Ripple>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  </Col>
                </Row>
                {/* {console.log(userInfo&&userInfo.status)} */}
                {userInfo && userInfo.status == "ABA" && (
                  <div className="d-grid">
                    <Button
                      color="primary"
                      onClick={() =>
                        navigate("/merchant-rates-view", {
                          state: { application_id: userInfo.uid },
                        })
                      }
                      // disabled={userInfo?.status == "AA" ? false : true}
                    >
                      See Rates
                    </Button>
                  </div>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default CardAppDesign;
