import React, { useEffect, useState } from "react";
import { Row, Form, Col, Label, Input, Button, FormFeedback } from "reactstrap";

import { Controller, useForm } from "react-hook-form";

import { ArrowRight } from "react-feather";
// ** useJWT
import Select from "react-select";
import { selectThemeColors } from "@utils";

const BankSettingView = ({ defaultData }) => {
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm({ defaultValues: defaultData });

  return (
    <Row>
      {/* <Form onSubmit={handleSubmit(onSubmit)}> */}
        <Col sm="12" className="mb-1">
          <Label className="form-label" htmlFor="ac">
            Acquiring Bank
          </Label>
          <Controller
            control={control}
            name="acquiring_bank"
            render={({ field }) => {
              return (
                <Input
                  id="acquiring_bank"
                  type="select"
                  invalid={errors.acquiring_bank && true}
                  {...field}
                  onChange={(e) => {
                    setAcuiringAllField(e.target.value, "acquiringBank");
                    field.onChange(e.target.value);
                  }}
                >
                  <option value={""} disabled selected>
                    select
                  </option>
                  {dynamicOptions && optionLists("acquiringBank")}
                </Input>
              );
            }}
          />
          {errors.acquiring_bank ? (
            <FormFeedback>{errors.acquiring_bank.message}</FormFeedback>
          ) : null}
        </Col>

        {acuiringFields &&
          Object.keys(acuiringFields).map((fieldName, key) => {
            const label = convertKeyToLabel(fieldName);
            return (
              <Col sm="12" className="mb-1" key={key}>
                <Label>{label}</Label>
                <Controller
                  control={control}
                  name={fieldName}
                  render={({ field }) => {
                    return (
                      <Input
                        id={fieldName}
                        type={fieldName == "password" ? "password" : "text"}
                        invalid={errors[fieldName] && true}
                        {...field}
                      />
                    );
                  }}
                />
                {errors[fieldName] ? (
                  <FormFeedback>{errors[fieldName]["message"]}</FormFeedback>
                ) : null}
              </Col>
            );
          })}
        <Col sm="12" className="mb-1">
          <Label className="form-label" htmlFor="gn">
            Minimum Ticket Size
          </Label>
          <Controller
            control={control}
            name="minimum_ticket_size"
            render={({ field }) => {
              return (
                <Input
                  id="minimum_ticket_size"
                  type="number"
                  invalid={errors.minimum_ticket_size && true}
                  {...field}
                />
              );
            }}
          />
          {errors.minimum_ticket_size ? (
            <FormFeedback>{errors.minimum_ticket_size.message}</FormFeedback>
          ) : null}
        </Col>
        <Col sm="12" className="mb-1">
          <Label className="form-label" htmlFor="gn">
            Maximum Ticket Size
          </Label>
          <Controller
            control={control}
            name="maximum_ticket_size"
            render={({ field }) => {
              return (
                <Input
                  id="maximum_ticket_size"
                  type="number"
                  invalid={errors.maximum_ticket_size && true}
                  {...field}
                />
              );
            }}
          />
          {errors.maximum_ticket_size ? (
            <FormFeedback>{errors.maximum_ticket_size.message}</FormFeedback>
          ) : null}
        </Col>

        <Col sm="12" className="mb-1">
          <Label className="form-label" htmlFor="mc">
            Merchant Category
          </Label>
          <Controller
            control={control}
            name="merchant_category_code"
            render={({ field }) => {
              return (
                <Input
                  id="merchant_category_code"
                  type="select"
                  invalid={errors.merchant_category_code && true}
                  {...field}
                >
                  <option value="" disabled selected>
                    select
                  </option>
                  {dynamicOptions && optionLists("merchantCategory")}
                </Input>
              );
            }}
          />
          {errors.merchant_category_code ? (
            <FormFeedback>{errors.merchant_category_code.message}</FormFeedback>
          ) : null}
        </Col>
        <Col sm="12" className="mb-1">
          <Label className="form-label" htmlFor="ps">
            Payment Services
          </Label>
          <Controller
            name="payment_services"
            control={control}
            render={({ field }) => {
              return (
                <Select
                  options={optionLists("paymentServices")}
                  isMulti
                  isClearable={false}
                  theme={selectThemeColors}
                  id="payment_services"
                  style={{ border: "1px solid red !impotant" }}
                  {...field}
                  invalid={errors.payment_services && true}
                  name="colors"
                  classNamePrefix="select"
                  onChange={(selectedOption) => {
                    field.onChange(selectedOption);
                    handleProcessingService(selectedOption);
                  }}
                />
              );
            }}
          />
          {errors.payment_services ? (
            <p className="text-danger" style={{ fontSize: "0.857rem" }}>
              {errors.payment_services.message}
            </p>
          ) : null}
          {/* {errors.payment_services && console.log(errors.payment_services.message)} */}
        </Col>
        <Col sm="12" className="mb-1">
          <Label className="form-label" htmlFor="crr">
            Currency
          </Label>
          <Controller
            name="currency"
            control={control}
            render={({ field }) => (
              <Select
                options={optionLists("currency")}
                isMulti
                id="currency"
                isClearable={false}
                theme={selectThemeColors}
                {...field}
                invalid={errors.currency && true}
                name="colors"
                className="react-select"
                classNamePrefix="select"
                onChange={(selectedOption) => {
                  field.onChange(selectedOption);
                  const element = document.getElementById("currency");
                  if (element.classList.contains("inputError")) {
                    element.classList.remove("inputError");
                  }
                }}
              />
            )}
          />
          {errors.currency ? (
            <p className="text-danger" style={{ fontSize: "0.857rem" }}>
              {errors.currency.message}
            </p>
          ) : null}
        </Col>
        <Col sm="12" className="mb-1">
          <Label className="form-label" htmlFor="mt">
            Merchant Type
          </Label>
          <Controller
            control={control}
            name="merchant_type"
            render={({ field }) => {
              return (
                <Input
                  id="merchant_type"
                  type="select"
                  invalid={errors.merchant_type && true}
                  {...field}
                >
                  <option value="" disabled selected>
                    select
                  </option>
                  {dynamicOptions && optionLists("merchantType")}
                </Input>
              );
            }}
          />
          {errors.merchant_type ? (
            <FormFeedback>{errors.merchant_type.message}</FormFeedback>
          ) : null}
        </Col>

        <Col sm="12" className="mb-1">
          <Label className="form-label" htmlFor="slt">
            Settlement
          </Label>
          <Controller
            control={control}
            name="settlement"
            render={({ field }) => {
              return (
                <Input
                  id="settlement"
                  type="select"
                  invalid={errors.settlement && true}
                  {...field}
                >
                  <option value="" disabled selected>
                    select
                  </option>
                  {dynamicOptions && optionLists("settlement")}
                </Input>
              );
            }}
          />
          {errors.settlement ? (
            <FormFeedback>{errors.settlement.message}</FormFeedback>
          ) : null}
        </Col>

        {/* <Col sm="12" className="mb-1">
          <div className="d-flex justify-content-end">
            <Button
              className="me-1"
              color="primary"
              onClick={() => clearErrors()}
              type="submit"
            >
              Next
              <ArrowRight
                size={14}
                className="align-middle ms-sm-25 ms-0"
              ></ArrowRight>
            </Button>
          </div>
        </Col> */}
      {/* </Form> */}
    </Row>
  );
};

export default BankSettingView;
