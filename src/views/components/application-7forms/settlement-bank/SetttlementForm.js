import React, { useState } from "react";
import { Trash } from "react-feather";
import {
  Button,
  Card,
  CardBody,
  CardText,
  Col,
  FormFeedback,
  Input,
  Label,
  Row,
  Spinner,
} from "reactstrap";
import { Controller } from "react-hook-form";

import useJwt from "@src/dashboard/jwt/useJwt";

// ** Utils
import { selectThemeColors } from "@utils";

import countryCurrencyList from "../../../../country_currency.json";
import countryList from "../../../../country_code.json";
// ** Third Party Components
import Select, { components } from "react-select";
import makeAnimated from "react-select/animated";

const SetttlementForm = (props) => {
  const { name, control, index, remove, title, field } = props;

  // ** State
  const [loader, setLoader] = useState(false);

  const animatedComponents = makeAnimated();

  const countryCurrencyListOption = (country = countryCurrencyList) =>
    Object.keys(country).map((key) => ({ value: key, label: country[key] }));

  const country = countryList.map((e, i) => {
    return <option key={i}>{e.name}</option>;
  });

  async function handleRemove() {
    setLoader(true);
    if (field?.uid) {
      await useJwt.sbd_delete(field?.uid).then((res) => {
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
          <Col xs="12" sm="12" md="6" lg="6">
            <Label htmlFor="">SETTLEMENT CURRENCY</Label>
            <Controller
              control={control}
              name={`data[${index}].settlement_currency`}
              render={({ field, fieldState }) => (
                <>
                  <Select
                    {...field}
                    theme={selectThemeColors}
                    classNamePrefix="select"
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: fieldState?.error ? "red" : "#ccc",
                      }),
                    }}
                    options={countryCurrencyListOption()}
                    isClearable
                  />
                  {fieldState.error && (
                    <small className="text-danger">
                      {fieldState.error.message}
                    </small>
                  )}
                </>
              )}
            />
          </Col>

          <Col xs="12" sm="12" md="6" lg="6">
            <Label htmlFor="">PROCESSING CURRENCY/IES</Label>
            <Controller
              control={control}
              name={`data[${index}].processing_currency`}
              render={({ field, fieldState }) => (
                <>
                  <Select
                    {...field}
                    isClearable={false}
                    theme={selectThemeColors}
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    styles={{
                      control: (baseStyles, state) => {
                        return {
                          ...baseStyles,
                          borderColor: fieldState?.error ? "red" : "#ccc",
                        };
                      },
                    }}
                    // defaultValue={[colorOptions[4], colorOptions[5]]}
                    isMulti
                    options={countryCurrencyListOption()}
                    className="react-select"
                    classNamePrefix="select"
                  />
                  {fieldState.error && (
                    <small className="text-danger">
                      {fieldState.error.message}
                    </small>
                  )}
                </>
              )}
            />
          </Col>
          <Col xs="12" sm="12" md="6" lg="6">
            <Label htmlFor="">Bank account holder</Label>
            <Controller
              control={control}
              name={`data[${index}].bank_account_holder`}
              render={({ field, fieldState }) => (
                <>
                  <Input {...field} invalid={fieldState.error !== undefined} />
                  {fieldState.error && (
                    <FormFeedback valid={false}>
                      {fieldState.error.message}
                    </FormFeedback>
                  )}
                </>
              )}
            />
          </Col>
          <Col xs="12" sm="12" md="6" lg="6">
            <Label htmlFor="">Bank Name</Label>
            <Controller
              control={control}
              name={`data[${index}].bank_name`}
              render={({ field, fieldState }) => (
                <>
                  <Input {...field} invalid={fieldState.error !== undefined} />
                  {fieldState.error && (
                    <FormFeedback valid={false}>
                      {fieldState.error.message}
                    </FormFeedback>
                  )}
                </>
              )}
            />
          </Col>
          <Col xs="12" sm="12" md="6" lg="6">
            <Label htmlFor="">Bank account number</Label>
            <Controller
              control={control}
              name={`data[${index}].bank_account_number`}
              render={({ field, fieldState }) => (
                <>
                  <Input {...field} invalid={fieldState.error !== undefined} />
                  {fieldState.error && (
                    <FormFeedback valid={false}>
                      {fieldState.error.message}
                    </FormFeedback>
                  )}
                </>
              )}
            />
          </Col>
          <Col xs="12" sm="12" md="6" lg="6">
            <Label htmlFor="">Reference / ABA / routing number</Label>
            <Controller
              control={control}
              name={`data[${index}].routing_number`}
              render={({ field, fieldState }) => (
                <>
                  <Input {...field} invalid={fieldState.error !== undefined} />
                  {fieldState.error && (
                    <FormFeedback valid={false}>
                      {fieldState.error.message}
                    </FormFeedback>
                  )}
                </>
              )}
            />
          </Col>
          <Col xs="12" sm="12" md="6" lg="6">
            <Label htmlFor="">Bank Address</Label>
            <Controller
              control={control}
              name={`data[${index}].bank_address`}
              render={({ field, fieldState }) => (
                <>
                  <Input {...field} invalid={fieldState.error !== undefined} />
                  {fieldState.error && (
                    <FormFeedback valid={false}>
                      {fieldState.error.message}
                    </FormFeedback>
                  )}
                </>
              )}
            />
          </Col>
          <Col xs="12" sm="12" md="6" lg="6">
            <Label htmlFor="">BIC/SWIFT code</Label>
            <Controller
              control={control}
              name={`data[${index}].bic_code`}
              render={({ field, fieldState }) => (
                <>
                  <Input {...field} invalid={fieldState.error !== undefined} />
                  {fieldState.error && (
                    <FormFeedback valid={false}>
                      {fieldState.error.message}
                    </FormFeedback>
                  )}
                </>
              )}
            />
          </Col>
          <Col xs="12" sm="12" md="6" lg="6">
            <Label htmlFor="">Postcode / zip code</Label>
            <Controller
              control={control}
              name={`data[${index}].zip_code`}
              render={({ field, fieldState }) => (
                <>
                  <Input {...field} invalid={fieldState.error !== undefined} />
                  {fieldState.error && (
                    <FormFeedback valid={false}>
                      {fieldState.error.message}
                    </FormFeedback>
                  )}
                </>
              )}
            />
          </Col>

          <Col xs="12" sm="12" md="6" lg="6">
            <Label htmlFor="">IBAN number</Label>
            <Controller
              control={control}
              name={`data[${index}].iban_number`}
              render={({ field, fieldState }) => (
                <>
                  <Input {...field} invalid={fieldState.error !== undefined} />
                  {fieldState.error && (
                    <FormFeedback valid={false}>
                      {fieldState.error.message}
                    </FormFeedback>
                  )}
                </>
              )}
            />
          </Col>
          <Col xs="12" sm="12" md="6" lg="6">
            <Label htmlFor="">City</Label>
            <Controller
              control={control}
              name={`data[${index}].city`}
              render={({ field, fieldState }) => (
                <>
                  <Input {...field} invalid={fieldState.error !== undefined} />
                  {fieldState.error && (
                    <FormFeedback valid={false}>
                      {fieldState.error.message}
                    </FormFeedback>
                  )}
                </>
              )}
            />
          </Col>
          <Col xs="12" sm="12" md="6" lg="6">
            <Label htmlFor="">Bank sort code</Label>
            <Controller
              control={control}
              name={`data[${index}].bank_sort_code`}
              render={({ field, fieldState }) => (
                <>
                  <Input {...field} invalid={fieldState.error !== undefined} />
                  {fieldState.error && (
                    <FormFeedback valid={false}>
                      {fieldState.error.message}
                    </FormFeedback>
                  )}
                </>
              )}
            />
          </Col>
          <Col xs="12" sm="12" md="6" lg="6">
            <Label htmlFor="">Country</Label>
            <Controller
              control={control}
              name={`data[${index}].country`}
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
          <Col xs="12" sm="12" md="6" lg="6">
            <Label htmlFor="">Bank Telephone number</Label>
            <Controller
              control={control}
              name={`data[${index}].bank_telephone_number`}
              render={({ field, fieldState }) => (
                <>
                  <Input {...field} invalid={fieldState.error !== undefined} />
                  {fieldState.error && (
                    <FormFeedback valid={false}>
                      {fieldState.error.message}
                    </FormFeedback>
                  )}
                </>
              )}
            />
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default SetttlementForm;
