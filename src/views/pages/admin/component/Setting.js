import React from "react";
import { Card, Col, Row } from "reactstrap";

import CompanyProfile from "../../../components/application-7forms/company-profile/CompanyProfile";
import CompanyOwners from "../../../components/application-7forms/company-owner-ship/CompanyOwners";
import BusinessProfile from "../../../components/application-7forms/business-profile/BusinessProfile";
import Settlement from "../../../components/application-7forms/settlement-bank/Settlement";
import Document from "../../../components/application-7forms/document/Document";
// import {} from "../../../components/application-7forms";

const Setting = () => {
  return (
    <Row>
      <Col xs={12} className="my-2">
        <h4 className="text-primary fw-bold mb-1">
          Company Profile
          </h4>
        
        <CompanyProfile />
         </Col>
      <Col xs={12} className="my-2">
        <h4 className="text-primary fw-bold mb-1">
          Company Ownership Profile
          </h4>
        <CompanyOwners />
      </Col>
      <Col xs={12} className="my-2">
        <h4 className="text-primary fw-bold mb-1">
          Business Profile
          </h4>
        <BusinessProfile />
      </Col>
      <Col xs={12} className="my-2">
        <h4 className="text-primary fw-bold mb-1">
          Settlement Bank Details
          </h4>
        <Settlement />
      </Col>
      <Col xs={12} className="my-2">
        <h4 className="text-primary fw-bold mb-1">
          Document
          </h4>
        <Document />
      </Col>
    </Row>
  );
};

export default Setting;
