import React, { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "react-feather";
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

const defaultValue = {
  cash_discount: false,
  gateway_monthly_fees: "",
  gateway_fees: "",
  load_balancing: false,
  split_rates: 0,
  value: "",
};

const Gateway = ({ stepper, scrollTop, action, createdBy, data }) => {
  const {
    control,
    reset,
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm({ defaultValues: { ...defaultValue } });

  const isValidData = (data, isIsoCreated) => {
    let isValid = true;
    const isoCreated = {
      split_rates: "",
      value: "",
    };
    for (const key in isIsoCreated ? { ...isoCreated, ...data } : data) {
      if (key == "cash_discount" || key == "load_balancing") continue;
      else if (!parseInt(data[key])) {
        isValid = false;
        setError(key, {
          type: "custom",
          message: "This above field is required",
        });
      }
    }
    return isValid;
  };

  const onSubmit = (data) => {
    if (!isValidData(data, createdBy.user_type)) return;
    else {
      action({ ...data });
      stepper.next();
    }
    // if (createdBy.user_type) {
    //   isValidData(data, createdBy.user_type);
    // } else {
    //   isValidData(data, createdBy.user_type);
    // }

    // let isValid = true;
    // for (const key in data) {
    //   if (key == "cash_discount" || key == "load_balancing" || key == "iso")
    //     continue;
    //   else if (!data[key]) {
    //     setError(key, {
    //       type: "custom",
    //       message: "This above field is required",
    //     });
    //     isValid = false;
    //   }
    // }
    // if (isValid) {
    //   action();
    //   stepper.next();
    // }

  };
  useEffect(() => reset(data), [reset]);
  return (
    <>
      <Row>
        <Col sm="6" md="6" className="mb-1">
          <Label htmlFor="cd">Cash Discount</Label>
          <Controller
            control={control}
            name="cash_discount"
            render={({ field: { value, onChange } }) => {
              return (
                <div className="form-switch form-check-primary">
                  <Input
                    id="alw"
                    type="switch"
                    name="icon-primary"
                    onChange={onChange}
                    checked={value}
                  />
                </div>
              );
            }}
          />
          {errors.cash_discount ? (
            <small className="text-danger">
              {errors.cash_discount.message}
            </small>
          ) : null}
        </Col>
        <Col sm="6" md="6" className="mb-1">
          <Label htmlFor="cd">Load Balancing</Label>
          <Controller
            control={control}
            name="load_balancing" // Update this property to match the key name in the `data` object
            render={({ field: { value, onChange } }) => {
              return (
                <div className="form-switch form-check-primary">
                  <Input
                    id="alw"
                    type="switch"
                    name="icon-primary"
                    onChange={onChange}
                    checked={value}
                  />
                </div>
              );
            }}
          />
          {errors.cash_discount ? (
            <small className="text-danger">
              {errors.cash_discount.message}
            </small>
          ) : null}
        </Col>

        {createdBy?.user_type && (
          <>
            <Col sm={12} md={6} className="mb-1">
              <Label htmlFor="iso">Iso Name </Label>
              <Input value={createdBy?.name} readOnly />
            </Col>
            <Col sm={12} md={6} className="mb-1">
              <Label htmlFor="sr">Split Rates</Label>
              <Controller
                control={control}
                name="split_rates"
                render={({ field }) => {
                  return (
                    <Input {...field} type="select">
                      <option value={0} disabled selected>
                        Select
                      </option>
                      <option value={1}>Flat</option>
                      <option value={2}>Recurring</option>
                      <option value={3}>Split</option>
                    </Input>
                  );
                }}
              />
              {errors.split_rates ? (
                <small className="text-danger">
                  {errors.split_rates.message}
                </small>
              ) : null}
            </Col>
            <Col sm={12} md={6} className="mb-1">
              <Label htmlFor="vlu">ISO Commission</Label>
              <Controller
                control={control}
                name="value"
                render={({ field }) => {
                  return (
                    <Input
                      id="vlu"
                      type="text"
                      invalid={errors.value && true}
                      {...field}
                    />
                  );
                }}
              />
              {errors.value ? (
                <small className="text-danger">{errors.value.message}</small>
              ) : null}
            </Col>
          </>
        )}
        {/* <Col sm={12} md={6} className="mb-1"> */}
        {/* <Label htmlFor="vt">Virtual Terminal</Label>
            <Controller
            control={control}
            name="virtual_terminal" // Update this property to match the key name in the `data` object
            render={({ field: { value, onChange } }) => {
              return (
                <div className="form-switch form-check-primary">
                  <Input
                    id="alw"
                    type="switch"
                    name="icon-primary"
                    onChange={onChange}
                    checked={value}
                    defaultChecked={true}
                  />
                </div>
              );
            }}
          />
          {errors.virtual_terminal ? (
            <small className="text-danger">
              {errors.virtual_terminal.message}
            </small>
          ) : null} */}
        {/* </Col> */}

        <Col sm="6" className="mb-1">
          <Label htmlFor="wi">Gateway Fees</Label>
          <Controller
            control={control}
            name="gateway_fees"
            render={({ field }) => {
              return (
                <InputGroup className="input-group-merge">
                  <Input
                    {...field}
                    id="gateway_fees"
                    type="number"
                    invalid={errors.gateway_fees && true}
                  />
                  <InputGroupText>USD</InputGroupText>
                </InputGroup>
              );
            }}
          />
          {errors.gateway_fees ? (
            <small className="text-danger">{errors.gateway_fees.message}</small>
          ) : null}
        </Col>
        <Col sm="6" className="mb-1">
          {/* <Label htmlFor="mmf">Monthly Maintenance Fees</Label> */}
          <Label htmlFor="mmf">Gateway Monthly Fees</Label>
          <Controller
            control={control}
            name="gateway_monthly_fees"
            f
            render={({ field }) => {
              return (
                <InputGroup className="input-group-merge">
                  <Input
                    {...field}
                    id="gateway_monthly_fees"
                    type="number"
                    invalid={errors.gateway_monthly_fees && true}
                  />
                  <InputGroupText>USD</InputGroupText>
                </InputGroup>
              );
            }}
          />
          {errors.gateway_monthly_fees ? (
            <small className="text-danger">
              {errors.gateway_monthly_fees.message}
            </small>
          ) : null}
        </Col>
      </Row>
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
          type="submit"
          onClick={handleSubmit(onSubmit)}
        >
          <span className="align-middle d-sm-inline-block d-none">Next</span>
        </Button>
      </div>
    </>
  );
};

export default Gateway;
