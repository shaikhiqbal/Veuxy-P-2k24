import React, { useEffect, useState } from "react";

import {
  Button,
  Card,
  CardBody,
  Col,
  Input,
  Label,
  Row,
  Spinner,
} from "reactstrap";

import Select from "react-select";
import { selectThemeColors } from "@utils";
import axios from "axios";
import useJwt from "@src/dashboard/jwt/useJwt";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "react-feather";

const lable = {
  acquiring_bank: " Acquiring Bank",
  currency: "Currency",
  maximum_ticket_size: "Maximum Ticket Size",
  merchant_category_code: "Merchant Category",
  merchant_type: "Merchant Type",
  minimum_ticket_size: "Minimum Ticket Size",
  payment_services: "Payment Services",
  settlement: "Settlement",
  load_balancing: "Load Balancing",
  cash_discount: "Cash Discount",
  iso_name: "Iso Name",
  virtual_terminal: "Virtual Terminal",
  split_rates: "Split Rates",
  value: "Value",
  reject_percent: "Reject Percent",
  declined_percent: "Declined Percent",
  chargeback_percent: "Chargeback Percent",
  chargeback_charge_0_2: "Chargeback Percent 0 to 2",
  chargeback_charge_2_5: "Chargeback Percent 2 to 5",
  chargeback_charge_5_10: "Chargeback Percent 5 to 10",
  setup_charges: "Setup Charges",
  reserve_rate: "Reserve Rate",
  monthly_fees: "Monthly Fees",
  transaction_fees: "Transaction Fees",
  fraud_scrub_fees: "Fraud Scrub Fees",
  batch_upload: "Batch Upload",
  refund_charge: "Refund Charge",
  return_charges: "Check Return Charges",
  verification_fees: "Check Verification Fees",
  wire_domestic_fees: "Wire Domestic Fees",
  wire_international: "Wire International",
  gateway_fees: "Gateway Fees",
  monthly_maintenance_fees: "Gateway Monthly Fees",
};

// ** Convert Key to Label
const convertKeyToLabel = (str) => {
  let key = str;
  let label = key
    .split("_")
    .map((substring) => substring.charAt(0).toUpperCase() + substring.slice(1))
    .join(" ");
  return label;
};

const AcquiringBankField = ({ string }) => {
  if (!typeof string == "string") return;
  const data = JSON.parse(string);
  const { fields } = data;

  return (
    fields &&
    Object.keys(fields).map((field) => {
      const label = convertKeyToLabel(field);
      const value = fields[field];
      return (
        <Row>
          <Col className="mb-1  ">
            <Label>{label}</Label>
            <Input value={value} />
          </Col>
        </Row>
      );
    })
  );
};

const PaymentServices = ({ labelKey, string }) => {
  if (!typeof string == "string") return;
  const data = JSON.parse(string);
  const option = data.map((option) => ({
    label: option,
    value: option,
  }));
  return (
    <Row>
      <Col className="mb-1">
        <Label>{lable[labelKey]}</Label>
        <Select
          isMulti
          isClearable={false}
          // value={option}
          defaultValue={option}
          theme={selectThemeColors}
          id="payment_services"
          name="colors"
          classNamePrefix="select"
        />
      </Col>
    </Row>
  );
};

const PaymentServicesField = ({ string }) => {
  if (!typeof string == "string") return;
  const data = JSON.parse(string);
  const cardTypeField = [];
  const renderField = data.reduce((acc, data) => {
    if (data.name === "Card Type") cardTypeField.push([...data.fields]);
    else acc.push(data.fields);
    return acc;
  }, []);
  return renderField.length
    ? renderField.map((value) => {
        const labelKeys = Object.keys(value);
        return (
          <Row>
            <Col>
              <Label>{convertKeyToLabel(labelKeys[0])}</Label>
              <Input value={value[labelKeys[0]]} />
            </Col>
            <Col>
              <Label>{convertKeyToLabel(labelKeys[1])}</Label>
              <Input value={value[labelKeys[1]]} />
            </Col>
          </Row>
        );
      })
    : null;
};

const CurrencyFields = ({ labelKey, string }) => {
  if (!typeof string == "string") return;
  const data = JSON.parse(string);
  const option = data.map((option) => ({
    label: option,
    value: option,
  }));
  return (
    <Row>
      <Col>
        <Label>{lable[labelKey]}</Label>
        <Select
          isMulti
          isClearable={false}
          // value={option}
          defaultValue={option}
          theme={selectThemeColors}
          id="payment_services"
          name="colors"
          classNamePrefix="select"
        />
      </Col>
    </Row>
  );
};

const DefaultInputLabel = ({ labelKey, value }) => {
  return (
    <Row>
      <Col className="mb-1">
        <Label>{lable[labelKey]}</Label>
        <Input value={value} />
      </Col>
    </Row>
  );
};

const RatesDetails = ({ data }) => {
  return Object.keys(data).map((key, index) => {
    switch (key) {
      case "acquiring_bank_field":
        return <AcquiringBankField string={data[key]} />;
      case "payment_services":
        return <PaymentServices labelKey={key} string={data[key]} />;
      case "payment_services_field":
        return <PaymentServicesField string={data[key]} />;
      case "currency":
        return <CurrencyFields labelKey={key} string={data[key]} />;
      case "uid":
        return null;
      default:
        return <DefaultInputLabel labelKey={key} value={data[key]} />;
    }
  });
};
// setLoader(false)

const onSubmit = (data, id, setBuy, setSale, setLoader, loader, method) => {
  setLoader(!loader);

  const uploadeData = {
    sendBuyRate: {
      ...data?.butRates,
      application_id: id,
    },
    sendSaleRate: {
      ...data?.saleRate,
      application_id: id,
    },
  };
  setLoader(!loader);
  const postData = async () => {
    const endpoints = ["sendBuyRate", "sendSaleRate"];
    const status = [];
    const results = {};

    try {
      const salePost = await useJwt[endpoints[0]](uploadeData[endpoints[0]]);
      if (salePost?.status == 201) {
        status.push(salePost?.status);
        setBuy(true);
        const buyPost = await useJwt[endpoints[1]](uploadeData[endpoints[1]]);
        if (buyPost.status == 201) {
          status.push(salePost?.status);
          setSale(true);
        }
      }
      // status.push(response?.status);
    } catch (error) {
      console.log(error);
      setLoader(false);
    }

    return status;
  };
  const updateData = async () => {
    const endpoints = ["updateBuyRate", "updateSaleRate"];
    // console.log(uploadeData)

    // console.log(uploadeData)
    const status = [];
    const results = {};
    try {
      // console.log({data:uploadeData[endpoints[0]]})
      const salePost = await useJwt[endpoints[0]](uploadeData.sendBuyRate.uid, {
        ...uploadeData.sendBuyRate,
      });
      if (salePost?.status == 200) {
        status.push(salePost?.status);
        setBuy(true);
        const buyPost = await useJwt[endpoints[1]](
          uploadeData.sendSaleRate.uid,
          { ...uploadeData.sendSaleRate }
        );
        if (buyPost.status == 200) {
          status.push(salePost?.status);
          setSale(true);
        }
      }
      // status.push(response?.status);
    } catch (error) {
      console.log(error);
      setLoader(false);
    }

    return status;
  };

  switch (method) {
    case "Post":
      return postData();
    case "Update":
      return updateData();
  }
};

const Preview = ({ data, userId, stepper }) => {
  const { butRates, saleRate, method } = { ...data };
  const [buyRatePost, setBuyRatePost] = useState(false);
  const [saleRatePost, setSaleRatePost] = useState(false);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate("/merchants-status");

  useEffect(() => {
    if (buyRatePost && saleRatePost) navigate("/merchants-status");
  }, [buyRatePost, saleRatePost]);

  return Object.keys(data).length ? (
    <Row>
      <Col sm={12} md={6} className="border-b">
        <Card>
          <CardBody>
            <h4>Buy Rates</h4>
            <RatesDetails data={butRates} />
          </CardBody>
        </Card>
      </Col>
      <Col sm={12} md={6}>
        <Card>
          <CardBody>
            <h4>Sale Rates</h4>
            <RatesDetails data={saleRate} />
          </CardBody>
        </Card>
      </Col>

      <div className="d-flex justify-content-between">
        <Button
          color="primary"
          className="btn-prev"
          onClick={() => {
            stepper.previous();
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
        {!loader ? (
          <Button
            className="btn-success"
            onClick={() =>
              onSubmit(
                data,
                userId,
                setBuyRatePost,
                setSaleRatePost,
                setLoader,
                loader,
                method
              )
            }
          >
            Submit
          </Button>
        ) : (
          <Button color="primary">
            <Spinner color="white" size="sm" />
            <span className="ms-50">Loading...</span>
          </Button>
        )}
      </div>
    </Row>
  ) : null;
};

export default Preview;
