import React, { useState } from "react";

import FileUploader from "./FileUploader";

// ** useJwt
import useJwt from "@src/dashboard/jwt/useJwt";

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardFooter,
  CardText,
  Row,
  Col,
  ListGroup,
  Button,
  Spinner,
} from "reactstrap";

const Document = (props) => {
  const { documentList, loader, setDocumentList, id, stepper,handleData } = props;

  return (
    <Row>
      {documentList?.map((ele, index) => {
        return (
          <Col sm="12" md="12" lg="6">
            <FileUploader
              element={ele}
              list={documentList}
              setList={setDocumentList}
              index={index}
            />
          </Col>
        );
      })}
      <Col
        sm="12"
        md="12"
        lg="12"
        xl="12"
        className="my-1 d-flex justify-content-between"
      >
        <Button.Ripple
          onClick={() => stepper.previous()}
          color="secondary"
          outline
        >
          Previous
        </Button.Ripple>
        <Button onClick={handleData} color="success">
          {loader ? (
            <>
              <Spinner color="white" size="sm" type="grow" />
              <span className="ms-50">Loading...</span>
            </>
          ) : (
            <span className="ms-50">SUBMIT</span>
          )}
        </Button>
      </Col>
    </Row>
  );
};

export default Document;
