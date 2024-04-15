import React, { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "react-feather";
import { Button, Col, Row } from "reactstrap";

import RatesForm from "./BuySale";

const Rates = ({ stepper, scrollTop, storeData, data }) => {
  const [submit, setSubmit] = useState(false);
  const [isValidBuyRate, setIsValidBuyRate] = useState(false);
  const [isValidSaleRate, setIsValidSaleRate] = useState(false);
  const [buyRateData, setBuyRateData] = useState(
    data?.buyRates ? { ...data.buyRates } : {}
  );
  const [saleRateData, setSaleRateData] = useState(
    data?.saleRates ? { ...data.saleRates } : {}
  );
  useEffect(() => {
    if (isValidBuyRate && isValidSaleRate) {
      storeData({ buyRateData, saleRateData });
      setIsValidBuyRate(!isValidBuyRate);
      setIsValidSaleRate(!isValidSaleRate);
      stepper.next();
    }
  }, [isValidBuyRate, isValidSaleRate]);

  // console.log(buyRateData)
  // const data = {
  //   batch_upload: "",
  //   chargeback_charge_0_2: "",
  //   chargeback_charge_2_5: "",
  //   chargeback_charge_5_10: "",
  //   fraud_scrub_fees: "",
  //   monthly_fees: "",
  //   refund_charge: "",
  //   reserve_rate: "",
  //   return_charges: "",
  //   setup_charges: "",
  //   transaction_fees: "",
  //   verification_fees: "",
  //   wire_domestic_fees: "",
  //   wire_international: "",
  // };
  // console.log({ buyRateData, saleRateData });
  // console.log()
  return (
    <Row>
      <Col sm={12} md={6} className="border p-1">
        <h4>Buy Rates</h4>
        <RatesForm
          submit={submit}
          isValidData={setIsValidBuyRate}
          setData={setBuyRateData}
          data={buyRateData}
        />
      </Col>
      <Col sm={12} md={6} className="border p-1">
        <h4>Sale Rates</h4>
        <RatesForm
          saleRate={true}
          submit={submit}
          isValidData={setIsValidSaleRate}
          setData={setSaleRateData}
          data={saleRateData}
        />
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
