import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  Col,
  Form,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupText,
  Label,
  Row,
} from "reactstrap";

const RatesForm = ({
  saleRate = false,
  submit,
  isValidData,
  setData,
  data,
}) => {
  const [click, setClick] = useState(null);
  const {
    control,
    reset,
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm();

  // const onSubmit = (data) => {
  //   {{debugger}}
  //   console.log(data)
  //   for (const key in data) {
  //     if (!data[key] || data[key]?.length > 0) {
  //       setError(key, {
  //         type: "custom",
  //         message: "This above field is required",
  //       });
  //     }
  //   }
  // };

  const scrollTopView = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const onSubmit = (data) => {
    // console.log(data)
    let isValid = true;
    let scroll = true;
    for (const key in data) {
      if (key === "uid") continue;
      else if (parseInt(data[key]) <= 0) {
        if (scroll) {
          scrollTopView(key);
          scroll = false;
        }
        isValid = false;
        setError(key, {
          type: "custom",
          message: "This above field is required",
        });
      }
    }
    isValidData(isValid);
    if (isValid) {
      setData(data);
    }
  };
  const submitForm = handleSubmit(onSubmit);
  useEffect(() => {
    if (click) submitForm();
    setClick(true);
  }, [submit]);

  useEffect(() => reset(data), [data]);
  return (
    <Form>
      <span className="invisible">
        <Controller 
          control={control}
          name="uid"
          render={({ field }) => {
            return (
              <Input type="text" invalid={errors.uid && true} {...field} />
            );
          }}
        />
      </span>
      <Row>
        <Col sm="12" className="mb-1">
          <Label htmlFor="sec">Setup Charges</Label>
          <Controller
            control={control}
            name="setup_charge"
            render={({ field }) => {
              return (
                <InputGroup className="input-group-merge">
                  <Input
                    id="setup_charges"
                    type="number"
                    invalid={errors.setup_charges && true}
                    {...field}
                  />
                  <InputGroupText>USD</InputGroupText>
                </InputGroup>
              );
            }}
          />
          {errors.setup_charges ? (
            <FormFeedback>{errors.setup_charges.message}</FormFeedback>
          ) : null}
        </Col>
        <Col sm="12" className="mb-1">
          <Label htmlFor="rr">Reserve Rate</Label>
          <Controller
            control={control}
            name="reserve_rate"
            render={({ field }) => {
              return (
                <InputGroup className="input-group-merge">
                  <Input
                    id="reserve_rate"
                    type="number"
                    invalid={errors.reserve_rate && true}
                    {...field}
                  />
                  <InputGroupText>USD</InputGroupText>
                </InputGroup>
              );
            }}
          />
          {errors.reserve_rate ? (
            <FormFeedback>{errors.reserve_rate.message}</FormFeedback>
          ) : null}
        </Col>
        <Col sm="12" className="mb-1">
          <Label htmlFor="mf">Monthly Fees</Label>
          <Controller
            control={control}
            name="monthly_fees"
            render={({ field }) => {
              return (
                <InputGroup className="input-group-merge">
                  <Input
                    id="monthly_fees"
                    type="number"
                    invalid={errors.monthly_fees && true}
                    {...field}
                  />
                  <InputGroupText>USD</InputGroupText>
                </InputGroup>
              );
            }}
          />
          {errors.monthly_fees ? (
            <FormFeedback>{errors.monthly_fees.message}</FormFeedback>
          ) : null}
        </Col>
        <Col sm="12" className="mb-1">
          <Label htmlFor="tf">Transaction Fees</Label>
          <Controller
            control={control}
            name="transaction_fees"
            render={({ field }) => {
              return (
                <InputGroup className="input-group-merge">
                  <Input
                    id="transaction_fees"
                    type="number"
                    invalid={errors.transaction_fees && true}
                    {...field}
                  />
                  <InputGroupText>USD</InputGroupText>
                </InputGroup>
              );
            }}
          />
          {errors.transaction_fees ? (
            <FormFeedback>{errors.transaction_fees.message}</FormFeedback>
          ) : null}
        </Col>
        <Col sm="12" className="mb-1">
          <Label htmlFor="fcf">Fraud Scrub Fees</Label>
          <Controller
            control={control}
            name="fraud_scrub_fees"
            render={({ field }) => {
              return (
                <InputGroup className="input-group-merge">
                  <Input
                    id="fraud_scrub_fees"
                    type="number"
                    invalid={errors.fraud_scrub_fees && true}
                    {...field}
                  />
                  <InputGroupText>USD</InputGroupText>
                </InputGroup>
              );
            }}
          />
          {errors.fraud_scrub_fees ? (
            <FormFeedback>{errors.fraud_scrub_fees.message}</FormFeedback>
          ) : null}
        </Col>

        <Col sm="12" className="mb-1">
          <Label htmlFor="bu">Batch Upload</Label>
          <Controller
            control={control}
            name="batch_upload"
            render={({ field }) => {
              return (
                <InputGroup className="input-group-merge">
                  <Input
                    id="batch_upload"
                    type="number"
                    invalid={errors.batch_upload && true}
                    {...field}
                  />
                  <InputGroupText>USD</InputGroupText>
                </InputGroup>
              );
            }}
          />
          {errors.batch_upload ? (
            <FormFeedback>{errors.batch_upload.message}</FormFeedback>
          ) : null}
        </Col>
        <Col sm="12" className="mb-1">
          <Label htmlFor="rc">Refund Charge</Label>
          <Controller
            control={control}
            name="refund_charge"
            render={({ field }) => {
              return (
                <InputGroup className="input-group-merge">
                  <Input
                    id="refund_charge"
                    type="number"
                    invalid={errors.refund_charge && true}
                    {...field}
                  />
                  <InputGroupText>USD</InputGroupText>
                </InputGroup>
              );
            }}
          />
          {errors.refund_charge ? (
            <FormFeedback>{errors.refund_charge.message}</FormFeedback>
          ) : null}
        </Col>
        <Col sm="12" className="mb-1">
          <Label htmlFor="rc">Check Return Charges</Label>
          <Controller
            control={control}
            name="return_charges"
            render={({ field }) => {
              return (
                <InputGroup className="input-group-merge">
                  <Input
                    id="rc"
                    type="text"
                    invalid={errors.return_charges && true}
                    {...field}
                  />
                  <InputGroupText>USD</InputGroupText>
                </InputGroup>
              );
            }}
          />
          {errors.return_charges ? (
            <FormFeedback>{errors.return_charges.message}</FormFeedback>
          ) : null}
        </Col>
        <Col sm="12" className="mb-1">
          <Label htmlFor="vf">Check Verification Fees</Label>
          <Controller
            control={control}
            name="verification_fees"
            render={({ field }) => {
              return (
                <InputGroup className="input-group-merge">
                  <Input
                    id="vf"
                    type="text"
                    invalid={errors.verification_fees && true}
                    {...field}
                  />
                  <InputGroupText>USD</InputGroupText>
                </InputGroup>
              );
            }}
          />
          {errors.verification_fees ? (
            <FormFeedback>{errors.verification_fees.message}</FormFeedback>
          ) : null}
        </Col>
        <Col sm="12" className="mb-1">
          <Label htmlFor="wdf">Wire Domestic Fees</Label>
          <Controller
            control={control}
            name="wire_domestic_fees"
            render={({ field }) => {
              return (
                <InputGroup className="input-group-merge">
                  <Input
                    id="wire_domestic_fees"
                    type="number"
                    invalid={errors.wire_domestic_fees && true}
                    {...field}
                  />
                  <InputGroupText>USD</InputGroupText>
                </InputGroup>
              );
            }}
          />
          {errors.wire_domestic_fees ? (
            <FormFeedback>{errors.wire_domestic_fees.message}</FormFeedback>
          ) : null}
        </Col>
        <Col sm="12" className="mb-1">
          <Label htmlFor="wi">Wire International</Label>
          <Controller
            control={control}
            name="wire_international"
            render={({ field }) => {
              return (
                <InputGroup className="input-group-merge">
                  <Input
                    id="wire_international"
                    type="number"
                    invalid={errors.wire_international && true}
                    {...field}
                  />
                  <InputGroupText>USD</InputGroupText>
                </InputGroup>
              );
            }}
          />
          {errors.wire_international ? (
            <FormFeedback>{errors.wire_international.message}</FormFeedback>
          ) : null}
        </Col>
        <Col md="12" sm="12" className="mb-1">
          <Label>Chargeback Charges</Label>
          <Row>
            <Col md="4" sm="12" className="mb-1">
              <Controller
                control={control}
                name="chargeback_charge_0_2"
                render={({ field }) => {
                  return (
                    <InputGroup className="input-group-merge">
                      <Input
                        id="chargeback_charge_0_2"
                        type="number"
                        invalid={errors.chargeback_charge_0_2 && true}
                        {...field}
                      />
                      <InputGroupText>0% - 2%</InputGroupText>
                    </InputGroup>
                  );
                }}
              />
              {errors.chargeback_charge_0_2 ? (
                <FormFeedback>
                  {errors.chargeback_charge_0_2.message}
                </FormFeedback>
              ) : null}
            </Col>
            <Col md="4" sm="12" className="mb-1">
              <Controller
                control={control}
                name="chargeback_charge_2_5"
                render={({ field }) => {
                  return (
                    <InputGroup className="input-group-merge">
                      <Input
                        id="chargeback_charge_2_5"
                        type="number"
                        invalid={errors.chargeback_charge_2_5 && true}
                        {...field}
                      />
                      <InputGroupText>2% - 5%</InputGroupText>
                    </InputGroup>
                  );
                }}
              />
              {errors.chargeback_charge_2_5 ? (
                <FormFeedback>
                  {errors.chargeback_charge_2_5.message}
                </FormFeedback>
              ) : null}
            </Col>

            <Col md="4" sm="12" className="mb-1">
              <Controller
                control={control}
                name="chargeback_charge_5_10"
                render={({ field }) => {
                  return (
                    <InputGroup className="input-group-merge">
                      <Input
                        id="chargeback_charge_5_10"
                        type="number"
                        invalid={errors.chargeback_charge_5_10 && true}
                        {...field}
                      />
                      <InputGroupText>5% - 10%</InputGroupText>
                    </InputGroup>
                  );
                }}
              />
              {errors.chargeback_charge_5_10 ? (
                <FormFeedback>
                  {errors.chargeback_charge_5_10.message}
                </FormFeedback>
              ) : null}
            </Col>
          </Row>
        </Col>
        {/* {saleRate && (
          <>
            <Col sm="6" className="mb-1">
              <Label htmlFor="wi">Gateway Fees</Label>
              <Controller
                control={control}
                name="gateway_fees"
                render={({ field }) => {
                  return (
                    <InputGroup className="input-group-merge">
                      <Input
                        id="gateway_fees"
                        type="number"
                        invalid={errors.gateway_fees && true}
                        {...field}
                      />
                      <InputGroupText>USD</InputGroupText>
                    </InputGroup>
                  );
                }}
              />
              {errors.gateway_fees ? (
                <FormFeedback>{errors.gateway_fees.message}</FormFeedback>
              ) : null}
            </Col>
            <Col sm="6" className="mb-1">
              <Label htmlFor="mmf">Gateway Monthly Fees</Label>
              <Controller
                control={control}
                name="monthly_maintenance_fees"
                render={({ field }) => {
                  return (
                    <InputGroup className="input-group-merge">
                      <Input
                        id="monthly_maintenance_fees"
                        type="number"
                        invalid={errors.monthly_maintenance_fees && true}
                        {...field}
                      />
                      <InputGroupText>USD</InputGroupText>
                    </InputGroup>
                  );
                }}
              />
              {errors.monthly_maintenance_fees ? (
                <FormFeedback>
                  {errors.monthly_maintenance_fees.message}
                </FormFeedback>
              ) : null}
            </Col>
          </>
        )} */}
      </Row>
    </Form>
  );
};

export default RatesForm;
