import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardText,
  CardFooter,
  Row,
  Col,
  Form,
  Input,
  Label,
  Button,
  Spinner,
  NavbarText,
} from "reactstrap";

import { Controller, useForm } from "react-hook-form";

const MerchanContact = (props) => {
  const { stepper, action, data } = props;
  // ** States
  const [defaultData, setDefaultData] = useState({});
  const [technical, setTechnical] = useState(false);
  const [financial, setFinancial] = useState(false);
  const [chargback, setChargback] = useState(false);
  const [loader, setLoader] = useState(false);
  const [isAccepted, setIsAccepted] = useState(true);

  // ** Forms
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({ defaultValues: defaultData });

  useEffect(() => {
    setDefaultData((defaultData) => ({ ...defaultData, mc: data }));
    reset({ mc: data });
    setTechnical(true);
    setFinancial(true);
    setChargback(true);
  }, [reset, data]);

  return (
    <Card className="application-container">
      <CardHeader>
        <div className="content-header">
          <h5 className="card-title">Contact </h5>
          <small className="text-muted">Enter Contact Details.</small>
        </div>
      </CardHeader>
      <CardBody>
        <CardText className="text-primary fw-bold">General Contact</CardText>
        <Row id="general" className="border mb-1 p-1">
          <Col sm={12} hidden>
            <Controller
              id="uid1"
              name="mc[0].uid"
              control={control}
              render={({ field }) => {
                return (
                  <Input
                    control={control}
                    name="mc[0].uid"
                    readOnly={isAccepted}
                    type="text"
                    invalid={errors.uid && true}
                    {...field}
                  />
                );
              }}
            />
          </Col>
          <Col sm={12} md={6}>
            <Label className="form-label" htmlFor="first_name">
              First Name
            </Label>
            <Controller
              id="first_name"
              name="mc[0].first_name"
              control={control}
              render={({ field }) => {
                return (
                  <Input
                    control={control}
                    name="mc[0].first_name"
                    readOnly={isAccepted}
                    type="text"
                    invalid={errors.first_name && true}
                    {...field}
                  />
                );
              }}
            />
          </Col>
          <Col sm={12} md={6}>
            <Label className="form-label" for="last_name">
              Last Name
            </Label>
            <Controller
              id="last_name"
              name="mc[0].last_name"
              control={control}
              render={({ field }) => {
                return (
                  <Input
                    control={control}
                    name="mc[0].last_name"
                    readOnly={isAccepted}
                    type="text"
                    invalid={errors.last_name && true}
                    {...field}
                  />
                );
              }}
            />
          </Col>
          <Col sm={12} md={6}>
            <Label className="form-label" for="email_address">
              Email address
            </Label>
            <Controller
              id="email_address"
              name="mc[0].email_address"
              control={control}
              render={({ field }) => {
                return (
                  <Input
                    control={control}
                    name="mc[0].email_address"
                    readOnly={isAccepted}
                    type="text"
                    invalid={errors.email_address && true}
                    {...field}
                  />
                );
              }}
            />
          </Col>
          <Col sm={12} md={6}>
            <Label className="form-label" for="telephone_number">
              Telephone number
            </Label>
            <Controller
              id="telephone_number"
              name="mc[0].telephone_number"
              control={control}
              render={({ field }) => {
                return (
                  <Input
                    control={control}
                    name="mc[0].telephone_number"
                    readOnly={isAccepted}
                    type="text"
                    invalid={errors.telephone_number && true}
                    {...field}
                  />
                );
              }}
            />
          </Col>
          <Col sm={12} md={6}>
            <Label className="form-label" for="fax_number">
              Fax number
            </Label>
            <Controller
              id="fax_number"
              name="mc[0].fax_number"
              control={control}
              render={({ field }) => {
                return (
                  <Input
                    control={control}
                    name="mc[0].fax_number"
                    readOnly={isAccepted}
                    type="text"
                    invalid={errors.fax_number && true}
                    {...field}
                  />
                );
              }}
            />
          </Col>
        </Row>
        <CardText
          className={`${
            technical ? "text-primary" : "text-black"
          } fw-bold mb-2`}
        >
          TECHNICAL CONTACT
          <div className="form-switch form-check-primary">
            <Input
              type="switch"
              name="icon-primary"
              disabled={isAccepted}
              onChange={() => setTechnical((x) => !x)}
              checked={technical}
            />
            {!technical ? (
              <span className="text-black">Yes</span>
            ) : (
              <span className="text-black">No</span>
            )}
          </div>
        </CardText>
        {technical && (
          <Row id="technical" className={`border mb-1 p-1`}>
            <Col sm={12} md={6}>
              <Label className="form-label" htmlFor="first_name">
                First Name
              </Label>
              <Controller
                id="first_name"
                name="mc[1].first_name"
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      control={control}
                      name="mc[0].first_name"
                      readOnly={isAccepted}
                      type="text"
                      invalid={errors.first_name && true}
                      {...field}
                    />
                  );
                }}
              />
            </Col>
            <Col sm={12} md={6}>
              <Label className="form-label" for="last_name">
                Last Name
              </Label>
              <Controller
                id="last_name"
                name="mc[1].last_name"
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      control={control}
                      name="mc[0].last_name"
                      readOnly={isAccepted}
                      type="text"
                      invalid={errors.last_name && true}
                      {...field}
                    />
                  );
                }}
              />
            </Col>
            <Col sm={12} md={6}>
              <Label className="form-label" for="email_address">
                Email address
              </Label>
              <Controller
                id="email_address"
                name="mc[1].email_address"
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      control={control}
                      name="mc[0].email_address"
                      readOnly={isAccepted}
                      type="text"
                      invalid={errors.email_address && true}
                      {...field}
                    />
                  );
                }}
              />
            </Col>
            <Col sm={12} md={6}>
              <Label className="form-label" for="telephone_number">
                Telephone number
              </Label>
              <Controller
                id="telephone_number"
                name="mc[1].telephone_number"
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      control={control}
                      name="mc[1].telephone_number"
                      readOnly={isAccepted}
                      type="text"
                      invalid={errors.telephone_number && true}
                      {...field}
                    />
                  );
                }}
              />
            </Col>
          </Row>
        )}
        <CardText
          className={`${
            financial ? "text-primary" : "text-black"
          } fw-bold mb-2`}
        >
          Financial Contact
          <div className="form-switch form-check-primary">
            <Input
              type="switch"
              name="icon-primary"
              disabled={isAccepted}
              onChange={() => setFinancial((x) => !x)}
              checked={financial}
            />
            {!financial ? (
              <span className="text-black">Yes</span>
            ) : (
              <span className="text-black">No</span>
            )}
          </div>
        </CardText>
        {financial && (
          <Row id="financial" className={`border mb-1 p-1`}>
            <Col sm={12} md={6}>
              <Label className="form-label" htmlFor="first_name">
                First Name
              </Label>
              <Controller
                id="first_name"
                name="mc[2].first_name"
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      control={control}
                      name="mc[2].first_name"
                      readOnly={isAccepted}
                      type="text"
                      invalid={errors.first_name && true}
                      {...field}
                    />
                  );
                }}
              />
            </Col>
            <Col sm={12} md={6}>
              <Label className="form-label" for="last_name">
                Last Name
              </Label>
              <Controller
                id="last_name"
                name="mc[2].last_name"
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      control={control}
                      name="mc[0].last_name"
                      readOnly={isAccepted}
                      type="text"
                      invalid={errors.last_name && true}
                      {...field}
                    />
                  );
                }}
              />
            </Col>
            <Col sm={12} md={6}>
              <Label className="form-label" for="email_address">
                Email address
              </Label>
              <Controller
                id="email_address"
                name="mc[2].email_address"
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      control={control}
                      name="mc[0].email_address"
                      readOnly={isAccepted}
                      type="text"
                      invalid={errors.email_address && true}
                      {...field}
                    />
                  );
                }}
              />
            </Col>
            <Col sm={12} md={6}>
              <Label className="form-label" for="telephone_number">
                Telephone number
              </Label>
              <Controller
                id="telephone_number"
                name="mc[2].telephone_number"
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      control={control}
                      name="mc[2].telephone_number"
                      readOnly={isAccepted}
                      type="text"
                      invalid={errors.telephone_number && true}
                      {...field}
                    />
                  );
                }}
              />
            </Col>
          </Row>
        )}
        <CardText
          className={`${
            chargback ? "text-primary" : "text-black"
          } fw-bold mb-2`}
        >
          Chargback Contact
          <div className="form-switch form-check-primary">
            <Input
              type="switch"
              name="icon-primary"
              disabled={isAccepted}
              onChange={() => setChargback((x) => !x)}
              checked={chargback}
            />
            {!chargback ? (
              <span className="text-black">Yes</span>
            ) : (
              <span className="text-black">No</span>
            )}
          </div>
        </CardText>
        {chargback && (
          <Row id="chargback" className={`border mb-1 p-1`}>
            <Col sm={12} md={6}>
              <Label className="form-label" htmlFor="first_name">
                First Name
              </Label>
              <Controller
                id="first_name"
                name="mc[3].first_name"
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      control={control}
                      name="mc[3].first_name"
                      readOnly={isAccepted}
                      type="text"
                      invalid={errors.first_name && true}
                      {...field}
                    />
                  );
                }}
              />
            </Col>
            <Col sm={12} md={6}>
              <Label className="form-label" for="last_name">
                Last Name
              </Label>
              <Controller
                id="last_name"
                name="mc[3].last_name"
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      control={control}
                      name="mc[3].last_name"
                      readOnly={isAccepted}
                      type="text"
                      invalid={errors.last_name && true}
                      {...field}
                    />
                  );
                }}
              />
            </Col>
            <Col sm={12} md={6}>
              <Label className="form-label" for="email_address">
                Email address
              </Label>
              <Controller
                id="email_address"
                name="mc[3].email_address"
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      control={control}
                      name="mc[3].email_address"
                      readOnly={isAccepted}
                      type="text"
                      invalid={errors.email_address && true}
                      {...field}
                    />
                  );
                }}
              />
            </Col>
            <Col sm={12} md={6}>
              <Label className="form-label" for="telephone_number">
                Telephone number
              </Label>
              <Controller
                id="telephone_number"
                name="mc[3].telephone_number"
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      control={control}
                      name="mc[3].telephone_number"
                      readOnly={isAccepted}
                      type="text"
                      invalid={errors.telephone_number && true}
                      {...field}
                    />
                  );
                }}
              />
            </Col>
          </Row>
        )}
      </CardBody>
      <CardFooter className="d-flex justify-content-between mt-3">
        <Button.Ripple
          onClick={() => stepper.previous()}
          color="secondary"
          outline
        >
          Previous
        </Button.Ripple>
        {action()}
      </CardFooter>
    </Card>
  );
};

export default MerchanContact;
