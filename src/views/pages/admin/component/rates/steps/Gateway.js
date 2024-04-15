import React from "react";
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

const Gateway = ({ stepper ,scrollTop}) => {
  const {
    control,
    reset,
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm();
  const onSubmit = (data) => {
    // console.log(data);
    let isValid=true;
    for(const key in data){
      if(!data[key]){
        setError(key,{type:"custom",message:"This above field is required"})
        isValid=false;
      }
    }
    if(isValid){
console.log('posted')
    }
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        {/* <Col sm={12} md={6} className="mb-1">
          <Label htmlFor="gmf">Gateway Monthly Fees</Label>
          <Controller
            control={control}
            name="generated_monthly_fees"
            render={({ field }) => {
              return (
                <InputGroup className="input-group-merge">
                  <Input
                    id="gmf"
                    type="text"
                    invalid={errors.generated_monthly_fees && true}
                    {...field}
                  />
                  <InputGroupText>USD</InputGroupText>
                </InputGroup>
              );
            }}
          />
          {errors.generated_monthly_fees ? (
            <FormFeedback>{errors.generated_monthly_fees.message}</FormFeedback>
          ) : null}
        </Col> */}
        {/* <Col sm={12} md={6} className="mb-1">
          <Label htmlFor="rc">Return Charges</Label>
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
        <Col sm={12} md={6} className="mb-1">
          <Label htmlFor="vf">Verification Fees</Label>
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
        </Col> */}
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
            <FormFeedback>{errors.cash_discount.message}</FormFeedback>
          ) : null}
        </Col>
        <Col sm="6" md="6" className="mb-1">
          <Label htmlFor="cd">Load Balancing</Label>
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
            <FormFeedback>{errors.cash_discount.message}</FormFeedback>
          ) : null}
        </Col>
        <Col sm={12} md={6} className="mb-1">
          <Label htmlFor="iso">Iso Name </Label>
          <Controller
            control={control}
            name="iso"
            render={({ field }) => {
              return (
                <Input
                  id="iso"
                  type="text"
                  invalid={errors.iso && true}
                  {...field}
                />
              );
            }}
          />
          {errors.iso ? (
            <FormFeedback>{errors.iso.message}</FormFeedback>
          ) : null}
        </Col>
           <Col sm={12} md={6} className="mb-1">
          <Label htmlFor="vt">Virtual Terminal</Label>
          <Controller
            control={control}
            name="virtual_terminal"
            render={({ field }) => {
              return (
                <Input
                  id="vt"
                  type="text"
                  invalid={errors.virtual_terminal && true}
                  {...field}
                />
              );
            }}
          />
          {errors.virtual_terminal ? (
            <FormFeedback>{errors.virtual_terminal.message}</FormFeedback>
          ) : null}
        </Col>
        <Col sm={12} md={6} className="mb-1">
          <Label htmlFor="sr">Split Rates</Label>
          <Controller
            control={control}
            name="split_rates"
            render={({ field }) => {
              return (
                <InputGroup className="input-group-merge">
                  <Input
                    id="sr"
                    type="text"
                    invalid={errors.split_rates && true}
                    {...field}
                  />
                  <InputGroupText>USD</InputGroupText>
                </InputGroup>
              );
            }}
          />
          {errors.split_rates ? (
            <FormFeedback>{errors.split_rates.message}</FormFeedback>
          ) : null}
        </Col>
        <Col sm={12} md={6} className="mb-1">
          <Label htmlFor="vlu">Value</Label>
          <Controller
            control={control}
            name="value"
            render={({ field }) => {
              return (
                <InputGroup className="input-group-merge">
                  <Input
                    id="vlu"
                    type="text"
                    invalid={errors.value && true}
                    {...field}
                  />
                  <InputGroupText>USD</InputGroupText>
                </InputGroup>
              );
            }}
          />
          {errors.value ? (
            <FormFeedback>{errors.value.message}</FormFeedback>
          ) : null}
        </Col>
        <Col sm={12} md={6} className="mb-1">
          <Label htmlFor="mts">Maximum Ticket Size</Label>
          <Controller
            control={control}
            name="maximum_ticket_size"
            render={({ field }) => {
              return (
                <InputGroup className="input-group-merge">
                  <Input
                    id="mts"
                    type="text"
                    invalid={errors.maximum_ticket_size && true}
                    {...field}
                  />
                  <InputGroupText>USD</InputGroupText>
                </InputGroup>
              );
            }}
          />
          {errors.maximum_ticket_size ? (
            <FormFeedback>{errors.maximum_ticket_size.message}</FormFeedback>
          ) : null}
        </Col>
        <Col sm={12} md={6} className="mb-1">
          <Label htmlFor="rp">Reject Percent</Label>
          <Controller
            control={control}
            name="reject_percent"
            render={({ field }) => {
              return (
                <InputGroup className="input-group-merge">
                  <Input
                    id="rp"
                    type="text"
                    invalid={errors.reject_percent && true}
                    {...field}
                  />
                  <InputGroupText>%</InputGroupText>
                </InputGroup>
              );
            }}
          />
          {errors.reject_percent ? (
            <FormFeedback>{errors.reject_percent.message}</FormFeedback>
          ) : null}
        </Col>
        <Col sm={12} md={6} className="mb-1">
          <Label htmlFor="dp">Declined Percent</Label>
          <Controller
            control={control}
            name="declined_percent"
            render={({ field }) => {
              return (
                <InputGroup className="input-group-merge">
                  <Input
                    id="dp"
                    type="text"
                    invalid={errors.declined_percent && true}
                    {...field}
                  />
                  <InputGroupText>%</InputGroupText>
                </InputGroup>
              );
            }}
          />
          {errors.declined_percent ? (
            <FormFeedback>{errors.declined_percent.message}</FormFeedback>
          ) : null}
        </Col>
        <Col sm={12} md={6} className="mb-1">
          <Label htmlFor="cp">Chargeback Percent</Label>
          <Controller
            control={control}
            name="chargeback_percent"
            render={({ field }) => {
              return (
                <InputGroup className="input-group-merge">
                  <Input
                    id="cp"
                    type="text"
                    invalid={errors.chargeback_percent && true}
                    {...field}
                  />
                  <InputGroupText>%</InputGroupText>
                </InputGroup>
              );
            }}
          />
          {errors.chargeback_percent ? (
            <FormFeedback>{errors.chargeback_percent.message}</FormFeedback>
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
          color="success"
          className="btn-next"
          onClick={() => stepper.next()}
        >
          <span className="align-middle d-sm-inline-block d-none">Submit</span>
        </Button>
      </div>
    </Form>
  );
};

export default Gateway;
