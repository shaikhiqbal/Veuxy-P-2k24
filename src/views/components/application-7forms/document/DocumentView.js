import React, { useEffect } from "react";

import StatsHorizontal from "@components/widgets/stats/StatsHorizontal";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Row,
} from "reactstrap";
import { AlertCircle, Cpu, Eye, EyeOff } from "react-feather";
import DocumentViewCard from "./DocumentViewCard";
const DocumentView = ({ setpper, data = [] }) => {

useEffect(()=>{

function setupData(data){

  let i=0;
  let j=0;
  while(i<j){
    if(data){}
  }
}


},[data])

  return (
    <>
      <Card className="application-container">
        <CardHeader></CardHeader>

        <CardBody
          className={`${
            !data?.length &&
            "d-flex justify-content-center align-items-center flex-column"
          }`}
        >
          <Row>
            {data.map((documents, key) => (
              <Col sm="12" md="6" key={key}>
                <DocumentViewCard
                  icon={
                    documents?.document ? (
                      <Eye size={21} />
                    ) : (
                      <EyeOff size={21} />
                    )
                  }
                  color={documents?.document ? "primary" : "danger"}
                  stats={documents?.document_type}
                  statTitle={
                    documents?.document
                      ? "Document Uploaded"
                      : "Document File Not Uploaded"
                  }
                  pdfHref={documents?.document}
                  cop={documents?.cop}
                />
              </Col>
            ))}
            {!data?.length && (
              <div className="d-flex justify-content-end align-items-center flex-column">
                <AlertCircle size={100} className="text-danger my-2 " />
                <h4>Document Not Uploaded</h4>
              </div>
            )}
          </Row>
        </CardBody> 
        <CardFooter className="d-flex justify-content-between mt-3">
          <Button
            color="secondry btn-outline-secondary"
            onClick={() => setpper("previous")}
          >
            Previous
          </Button>
          <Button color="primary" onClick={() => setpper("next")}>
            Next
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default DocumentView;
