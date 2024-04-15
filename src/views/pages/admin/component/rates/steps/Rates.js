import React, { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "react-feather";
import { Button, Col, Row } from "reactstrap";
import RatesForm from "./rates/RatesForm";
const Rates = ({ stepper, scrollTop }) => {
  const [submit, setSubmit] = useState(false);
  const [isValidBuyRate, setIsValidBuyRate] = useState(false);
  const [isValidSaleRate, setIsValidSaleRate] = useState(false);
  useEffect(() => {
    if (isValidBuyRate && isValidSaleRate) {
      stepper.next();
      setIsValidBuyRate(false)
      setIsValidSaleRate(false)
    }
  }, [isValidBuyRate, isValidSaleRate]);

  return (
    <Row>
      <Col sm={12} md={6} className="border p-1">
        <h4>Buy Rates</h4>
        <RatesForm submit={submit} isValidData={setIsValidBuyRate}/>
      </Col>
      <Col sm={12} md={6} className="border p-1">
        <h4>Sale Rates</h4>
        <RatesForm saleRate={true} submit={submit} isValidData={setIsValidSaleRate}/>
      </Col>
      <div className="d-flex justify-content-between my-2">
        <Button
          color="primary"
          className="btn-prev"
          onClick={() => {
            stepper.previous();
            scrollTop((x) => !x);
          }}
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
          color="primary"
          className="btn-next"
          onClick={() => setSubmit((boolean) => !boolean)}
        >
          <span className="align-middle d-sm-inline-block d-none">Next</span>
          <ArrowRight
            size={14}
            className="align-middle ms-sm-25 ms-0"
          ></ArrowRight>
        </Button>
      </div>
    </Row>
  );
};

export default Rates;
