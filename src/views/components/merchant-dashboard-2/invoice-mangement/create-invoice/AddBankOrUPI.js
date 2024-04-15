import React, { useState } from "react";

import { Controller, useForm } from "react-hook-form";

import { Row, Col, Button, Input, Label, Form } from "reactstrap";

import UPIImg from "../../../../../assets/images/upi/UPI.png";

export const AddUPIID = () => {
  const [loader, setLoader] = useState(false);
  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Form className="border rounded p-1" onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Col sm="12" md="12" lg="12" className="d-flex justify-content-between border-bottom">
          <h4>Add UPI ID</h4>
          <img src={UPIImg} alt="upi-logo.." height={"20px"}/>
        </Col>
        <Col sm="12" md="12" lg="12" className="mb-1">
          <Label>UPI ID </Label>
          <Controller
            control={control}
            name="account_number"
            rules={{
              required: "This field is required",
            }}
            render={({ field, fieldState }) => (
              <>
                <Input
                  {...field}
                  type="text"
                  placeholder="Enter Your UPI ID "
                  invalid={fieldState?.error && true}
                />
                {fieldState?.error && (
                  <small className="text-danger">
                    {fieldState.error.message}
                  </small>
                )}
              </>
            )}
          />
        </Col>
        <Col
          sm="12"
          className="d-flex justify-content-end"
          style={{ gap: "10px" }}
        >
          {/* <Button.Ripple className="btn-sm" color="danger" outline>
            Cancle
          </Button.Ripple> */}
          <Button className="btn-sm" color="gradient-primary">
            Save
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export const AddBankDetails = () => {
  const [loader, setLoader] = useState(false);
  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Form className="border rounded p-1" onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Col sm="12" md="6" lg="6" className="mb-1">
          <Label>ACCOUNT NUMBER</Label>
          <Controller
            control={control}
            name="account_number"
            rules={{
              required: "This field is required",
            }}
            render={({ field, fieldState }) => (
              <>
                <Input
                  {...field}
                  type="text"
                  placeholder="Enter Your Account number "
                  invalid={fieldState?.error && true}
                />
                {fieldState?.error && (
                  <small className="text-danger">
                    {fieldState.error.message}
                  </small>
                )}
              </>
            )}
          />
        </Col>
        <Col sm="12" md="6" lg="6" className="mb-1">
          <Label>ACCOUNT HOLDER'S NAME</Label>
          <Controller
            control={control}
            name="account_holder_namee"
            rules={{
              required: "This field is required",
            }}
            render={({ field, fieldState }) => (
              <>
                <Input
                  {...field}
                  type="text"
                  placeholder="Enter Your Name"
                  invalid={fieldState?.error && true}
                />
                {fieldState?.error && (
                  <small className="text-danger">
                    {fieldState.error.message}
                  </small>
                )}
              </>
            )}
          />
        </Col>
        <Col sm="12" md="6" lg="6" className="mb-1">
          <Label>IFSC CODE</Label>
          <Controller
            control={control}
            name="ifce_code"
            rules={{
              required: "This field is required",
            }}
            render={({ field, fieldState }) => (
              <>
                <Input
                  {...field}
                  type="text"
                  placeholder="Enter Your IFCE code"
                  invalid={fieldState?.error && true}
                />
                {fieldState?.error && (
                  <small className="text-danger">
                    {fieldState.error.message}
                  </small>
                )}
              </>
            )}
          />
        </Col>
        <Col sm="12" md="6" lg="6" className="mb-1">
          <Label>BANK & BRANCH NAME</Label>
          <Controller
            control={control}
            name="branch_name"
            rules={{
              required: "This field is required",
            }}
            render={({ field, fieldState }) => (
              <>
                <Input
                  {...field}
                  type="text"
                  placeholder="Enter Your Branch Name"
                  invalid={fieldState?.error && true}
                />
                {fieldState?.error && (
                  <small className="text-danger">
                    {fieldState.error.message}
                  </small>
                )}
              </>
            )}
          />
        </Col>
        <Col
          sm="12"
          className="d-flex justify-content-end"
          style={{ gap: "10px" }}
        >
          {/* <Button.Ripple className="btn-sm" color="danger" outline>
            Cancle
          </Button.Ripple> */}
          <Button className="btn-sm" color="gradient-primary">
            Save
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
