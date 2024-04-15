import React, { useState } from "react";
import { Plus, Trash } from "react-feather";

import country_code from "../../../../country_code.json";
import useJwt from "@src/dashboard/jwt/useJwt";

import { Controller, set } from "react-hook-form";
import {
  Input,
  Label,
  Row,
  Col,
  CardHeader,
  CardBody,
  Card,
  Form,
  Button,
  CardText,
  FormFeedback,
  Spinner,
} from "reactstrap";

const COPInputFields = (props) => {
  const { name, control, index, remove, title, field } = props;

  const [loader, setLoader] = useState(false);
  
  const country = country_code.map((e, i) => {
    return <option key={i}>{e.name}</option>;
  });
  async function handleRemove() {
    setLoader(true);
    if (field?.uid) {
      await useJwt.cop_delete(field?.uid).then((res) => {
        remove(index);
      });
    } else {
      remove(index);
    }
    setLoader(false);
  }

  return (
    <Card>
      <CardBody>
        <Row>
          <Col
            sm="12"
            md="12"
            lg="12"
            className="mb-1 d-flex border- justify-content-between align-items-center"
          >
            <CardText tag={"h4"}>{`${title} : ${index + 1}`}</CardText>
            {loader ? (
              <Spinner type="grow" color="danger" />
            ) : (
              <Button.Ripple
                className="btn-icon"
                outline
                color="danger"
                onClick={handleRemove}
              >
                <Trash size={16} />
              </Button.Ripple>
            )}
          </Col>
          <Col sm="12" md="6" lg="6" className="mb-1">
            <Label htmlFor="first_name">First Name</Label>
            <Controller
              name={`${name}[${index}].first_name`}
              control={control}
              rules={{ required: "First name is required" }}
              render={({ field, fieldState }) => (
                <>
                  <Input
                    {...field}
                    id="first_name"
                    type="text"
                    invalid={fieldState?.error !== undefined}
                  />
                  {fieldState?.error && (
                    <FormFeedback>{fieldState?.error?.message}</FormFeedback>
                  )}
                </>
              )}
            />
          </Col>
          <Col sm="12" md="6" lg="6" className="mb-1">
            <Label htmlFor="last_name">Last Name</Label>
            <Controller
              control={control}
              name={`${name}[${index}].last_name`}
              render={({ field, fieldState }) => (
                <>
                  <Input
                    {...field}
                    id="last_name"
                    type="text"
                    invalid={fieldState?.error !== undefined}
                  />
                  {fieldState?.error && (
                    <FormFeedback>{fieldState?.error?.message}</FormFeedback>
                  )}
                </>
              )}
            />
          </Col>
          <Col sm="12" md="6" lg="6" className="mb-1">
            <Label htmlFor="">Date Of Birth</Label>
            <Controller
              control={control}
              name={`${name}[${index}].date_of_birth`}
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  id=""
                  type="date"
                  invalid={fieldState?.error !== undefined}
                />
              )}
            />
          </Col>
          <Col sm="12" md="6" lg="6" className="mb-1">
            <Label htmlFor="house_number">Hous Number</Label>
            <Controller
              control={control}
              name={`${name}[${index}].house_number`}
              render={({ field, fieldState }) => (
                <>
                  <Input
                    {...field}
                    id="house_number"
                    type="text"
                    invalid={fieldState?.error !== undefined}
                  />
                  {fieldState?.error && (
                    <FormFeedback>{fieldState?.error?.message}</FormFeedback>
                  )}
                </>
              )}
            />
          </Col>
          <Col sm="12" md="6" lg="6" className="mb-1">
            <Label htmlFor="street_address">Street Address</Label>
            <Controller
              control={control}
              name={`${name}[${index}].street_address`}
              render={({ field, fieldState }) => (
                <>
                  <Input
                    {...field}
                    id="street_address"
                    type="text"
                    invalid={fieldState?.error !== undefined}
                  />
                  {fieldState?.error && (
                    <FormFeedback>{fieldState?.error?.message}</FormFeedback>
                  )}
                </>
              )}
            />
          </Col>
          <Col sm="12" md="6" lg="6" className="mb-1">
            <Label htmlFor="zip_code">Zip Code</Label>
            <Controller
              control={control}
              name={`${name}[${index}].zip_code`}
              render={({ field, fieldState }) => (
                <>
                  <Input
                    {...field}
                    id="zip_code"
                    type="text"
                    invalid={fieldState?.error !== undefined}
                  />
                  {fieldState?.error && (
                    <FormFeedback>{fieldState?.error?.message}</FormFeedback>
                  )}
                </>
              )}
            />
          </Col>
          <Col sm="12" md="6" lg="6" className="mb-1">
            <Label htmlFor="city">City</Label>
            <Controller
              control={control}
              name={`${name}[${index}].city`}
              render={({ field, fieldState }) => (
                <>
                  {" "}
                  <Input
                    {...field}
                    id="city"
                    type="text"
                    invalid={fieldState?.error !== undefined}
                  />
                  <FormFeedback>{fieldState?.error?.message}</FormFeedback>
                </>
              )}
            />
          </Col>
          <Col sm="12" md="6" lg="6" className="mb-1">
            <Label htmlFor="country">Country</Label>
            <Controller
              control={control}
              name={`${name}[${index}].country`}
              render={({ field, fieldState }) => (
                <>
                  <Input
                    {...field}
                    id="country"
                    type="select"
                    invalid={fieldState?.error !== undefined}
                  >
                    <option defaultChecked>--country--</option>
                    {country}
                  </Input>
                  {fieldState?.error && (
                    <FormFeedback>{fieldState?.error?.message}</FormFeedback>
                  )}
                </>
              )}
            />
          </Col>
          <Col sm="12" md="6" lg="6" className="mb-1">
            <Label htmlFor="telephone_number">Telephone Number</Label>
            <Controller
              control={control}
              name={`${name}[${index}].telephone_number`}
              render={({ field, fieldState }) => (
                <>
                  <Input
                    {...field}
                    id="telephone_number"
                    type="text"
                    invalid={fieldState?.error !== undefined}
                  />
                  {fieldState?.error && (
                    <FormFeedback>{fieldState?.error?.message}</FormFeedback>
                  )}
                </>
              )}
            />
          </Col>
          <Col sm="12" md="6" lg="6" className="mb-1">
            <Label htmlFor="passport">Passport</Label>
            <Controller
              control={control}
              name={`${name}[${index}].passport`}
              render={({ field, fieldState }) => (
                <>
                  <Input
                    {...field}
                    id="passport"
                    type="text"
                    invalid={fieldState?.error !== undefined}
                  />
                  {fieldState?.error && (
                    <FormFeedback>{fieldState?.error?.message}</FormFeedback>
                  )}
                </>
              )}
            />
          </Col>
          {name == "ubo" && (
            <Col sm="12" md="6" lg="6" className="mb-1">
              <Label htmlFor="social_security_number">
                Social Security Number
              </Label>
              <Controller
                control={control}
                name={`${name}[${index}].social_security_number`}
                render={({ field, fieldState }) => (
                  <>
                    <Input
                      {...field}
                      id="social_security_number"
                      type="text"
                      invalid={fieldState?.error !== undefined}
                    />
                    {fieldState?.error && (
                      <FormFeedback>{fieldState?.error?.message}</FormFeedback>
                    )}
                  </>
                )}
              />
            </Col>
          )}
        </Row>
      </CardBody>
    </Card>
  );
};

export default COPInputFields;

// export { MyForm };
