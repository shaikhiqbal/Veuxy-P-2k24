import React, { useEffect, useRef, useState } from "react";

import PropTypes from "prop-types";

import {
  Button,
  Card,
  Col,
  Form,
  FormFeedback,
  Input,
  Label,
  Row,
  CardBody,
  CardHeader,
  CardText,
  Alert,
  Spinner,
} from "reactstrap";
import { Controller, useForm } from "react-hook-form";

// ** Option List
import { currencyList, countryList } from "./selectOption";

import { propTypes } from "react-country-flag";

// import CompanyProfileSimilarFields from "./CompanyProfileSimilarFields";

// import BillingDetails from "./BillingDetails";

// const defaultValue = {
//   company_registration_no: "",
//   legal_company_name: "",
//   trade_name: "",
//   business_type: "",
//   registered_street_address: "",
//   house_number: "",
//   zip_code: "",
//   city: "",
//   state: "",
//   country: "",
//   telephone_number: "",
//   fax_number: "",
//   turnover_last_year: "",
//   incorporation_date: "",
//   tax_identification_number: "",
//   stock_exchange: "",
//   not_for_profit: "",
//   billing_registered_address: "",
//   billing_street_address: "",
//   billing_house_no: "",
//   billing_post_code: "",
//   billing_city: "",
//   billing_state: "",
//   billing_country: "",
// };

const ApplyingCompanyDetails = (props) => {
  const { isParentHave, title, control, errors, firstInputRef } = props;
  const [isAccepted, setIsAccepted] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardText>
          <Alert color="warning">{isParentHave && title}</Alert>
        </CardText>
      </CardHeader>
      <CardBody>
        <Row>
          <Col sm="12"></Col>
          <Col
            sm="12"
            md={isParentHave ? 12 : 6}
            lg={isParentHave ? 12 : 6}
            className="mb-1"
          >
            <Label htmlFor="company_registration_no">
              Company registration number?
            </Label>
            <Controller
              id="company_registration_no"
              name="company_registration_no"
              control={control}
              rules={{
                // required: true,
                maxLength: {
                  value: 20,
                  message: "value must be lesser than 20",
                },
              }}
              render={({ field }) => {
                return (
                  <Input
                    innerRef={(ref) => {
                      field.ref = ref;
                      firstInputRef.current = ref;
                    }}
                    {...field}
                    type="number"
                    readOnly={isAccepted}
                    invalid={errors.company_registration_no && true}
                  />
                );
              }}
            />
            {errors.company_registration_no ? (
              <FormFeedback>
                {errors.company_registration_no.message}
              </FormFeedback>
            ) : null}
          </Col>
          <Col
            sm="12"
            md={isParentHave ? 12 : 6}
            lg={isParentHave ? 12 : 6}
            className="mb-1"
          >
            <Label htmlFor="legal_company_name">Legal name of company</Label>
            <Controller
              id="legal_company_name"
              name="legal_company_name"
              control={control}
              rules={{
                maxLength: {
                  value: 32,
                  message: "value must be lesser than 32",
                },
              }}
              render={({ field }) => (
                <Input
                  control={control}
                  name="legal_company_name"
                  type="text"
                  {...field}
                  invalid={errors.legal_company_name && true}
                  readOnly={isAccepted}
                />
              )}
            />
            {errors?.legal_company_name ? (
              <FormFeedback>{errors?.legal_company_name?.message}</FormFeedback>
            ) : null}
          </Col>
          <Col
            sm="12"
            md={isParentHave ? 12 : 6}
            lg={isParentHave ? 12 : 6}
            className="mb-1"
          >
            <Label htmlFor="legal_company_name">
              Registered DBA/trade name
            </Label>
            <Controller
              id="trade_name"
              name="trade_name"
              control={control}
              rules={{
                maxLength: {
                  value: 32,
                  message: "value must be lesser than 32",
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  name="trade_name"
                  type="text"
                  invalid={errors.trade_name && true}
                  readOnly={isAccepted}
                />
              )}
            />
            {errors?.trade_name ? (
              <FormFeedback>{errors?.trade_name?.message}</FormFeedback>
            ) : null}
          </Col>
          <Col sm="12" md="6" lg="6" className="msb-1">
            <Label htmlFor="">Type of business</Label>
            <Controller
              id="business_type"
              name="business_type"
              control={control}
              rules={{
                maxLength: {
                  value: 32,
                  message: "value must be lesser than 32",
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  name="business_type"
                  type="text"
                  invalid={errors.business_type && true}
                  readOnly={isAccepted}
                />
              )}
            />
            {errors?.business_type ? (
              <FormFeedback>{errors?.business_type?.message}</FormFeedback>
            ) : null}
          </Col>
          <Col
            sm="12"
            md={isParentHave ? 12 : 6}
            lg={isParentHave ? 12 : 6}
            className="mb-1"
          >
            <Label htmlFor="registered_street_address">Street address</Label>
            <Controller
              id="registered_street_address"
              name="registered_street_address"
              control={control}
              rules={{
                maxLength: {
                  value: 50,
                  message: "value must be lesser than 50",
                },
              }}
              render={({ field }) => {
                return (
                  <Input
                    {...field}
                    type="text"
                    invalid={errors.registered_street_address && true}
                    readOnly={isAccepted}
                  />
                );
              }}
            />
            {errors?.registered_street_address ? (
              <FormFeedback>
                {errors?.registered_street_address?.message}
              </FormFeedback>
            ) : null}
          </Col>
          <Col
            sm="12"
            md={isParentHave ? 12 : 6}
            lg={isParentHave ? 12 : 6}
            className="mb-1"
          >
            <Label htmlFor="">Office / House number</Label>
            <Controller
              id="house_number"
              name="house_number"
              control={control}
              rules={{
                maxLength: {
                  value: 5,
                  message: "value must be lesser than 5",
                },
              }}
              render={({ field }) => {
                return (
                  <Input
                    {...field}
                    name="house_number"
                    type="text"
                    invalid={errors.house_number && true}
                    readOnly={isAccepted}
                  />
                );
              }}
            />
            {errors?.house_number ? (
              <FormFeedback>{errors?.house_number?.message}</FormFeedback>
            ) : null}
          </Col>
          <Col
            sm="12"
            md={isParentHave ? 12 : 6}
            lg={isParentHave ? 12 : 6}
            className="mb-1"
          >
            <Label htmlFor="">Postcode / zip code</Label>
            <Controller
              id="zip_code"
              name="zip_code"
              control={control}
              rules={{
                maxLength: {
                  value: 10,
                  message: "value must be lesser than 10",
                },
              }}
              render={({ field }) => {
                return (
                  <Input
                    {...field}
                    type="text"
                    invalid={errors.zip_code && true}
                    readOnly={isAccepted}
                  />
                );
              }}
            />
            {errors?.zip_code ? (
              <FormFeedback>{errors?.zip_code?.message}</FormFeedback>
            ) : null}
          </Col>
          <Col
            sm="12"
            md={isParentHave ? 12 : 6}
            lg={isParentHave ? 12 : 6}
            className="mb-1"
          >
            <Label htmlFor="">City</Label>
            <Controller
              id="city"
              name="city"
              control={control}
              rules={{
                maxLength: {
                  value: 15,
                  message: "value must be lesser than 15",
                },
              }}
              render={({ field }) => {
                return (
                  <Input
                    {...field}
                    type="text"
                    invalid={errors.city && true}
                    readOnly={isAccepted}
                  />
                );
              }}
            />
            {errors?.city ? (
              <FormFeedback>{errors?.city?.message}</FormFeedback>
            ) : null}
          </Col>
          <Col
            sm="12"
            md={isParentHave ? 12 : 6}
            lg={isParentHave ? 12 : 6}
            className="mb-1"
          >
            <Label htmlFor="">State</Label>
            <Controller
              id="state"
              name="state"
              control={control}
              rules={{
                maxLength: {
                  value: 15,
                  message: "value must be lesser than 15",
                },
              }}
              render={({ field }) => {
                return (
                  <Input
                    {...field}
                    type="text"
                    invalid={errors.state && true}
                    readOnly={isAccepted}
                  />
                );
              }}
            />
            {errors?.state ? (
              <FormFeedback>{errors?.state?.message}</FormFeedback>
            ) : null}
          </Col>
          <Col
            sm="12"
            md={isParentHave ? 12 : 6}
            lg={isParentHave ? 12 : 6}
            className="mb-1"
          >
            <Label htmlFor="">Country</Label>
            <Controller
              id="country"
              name="country"
              control={control}
              render={({ field }) => {
                return (
                  <Input
                    {...field}
                    type="select"
                    invalid={errors.country && true}
                    disabled={isAccepted}
                  >
                    <option value="none" selected disabled hidden>
                      Select Country
                    </option>
                    {countryList}
                  </Input>
                );
              }}
            />
            {errors?.country ? (
              <FormFeedback>{errors?.country?.message}</FormFeedback>
            ) : null}
          </Col>
          <Col
            sm="12"
            md={isParentHave ? 12 : 6}
            lg={isParentHave ? 12 : 6}
            className="mb-1"
          >
            <Label htmlFor="telephone_number">Telephone number</Label>
            <Controller
              id="telephone_number"
              name="telephone_number"
              control={control}
              rules={{
                maxLength: {
                  value: 15,
                  message: "value must be lesser than 15",
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  invalid={errors.telephone_number && true}
                  readOnly={isAccepted}
                />
              )}
            />
            {errors?.telephone_number ? (
              <FormFeedback>{errors?.telephone_number?.message}</FormFeedback>
            ) : null}
          </Col>
          <Col
            sm="12"
            md={isParentHave ? 12 : 6}
            lg={isParentHave ? 12 : 6}
            className="mb-1"
          >
            <Label htmlFor="fax_number">Fax number</Label>
            <Controller
              id="fax_number"
              name="fax_number"
              control={control}
              rules={{
                maxLength: {
                  value: 10,
                  message: "value must be lesser than 10",
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  onChange={(e) => {
                    field.onChange(parseInt(e.target.value));
                  }}
                  invalid={errors?.fax_number && true}
                  readOnly={isAccepted}
                />
              )}
            />
            {errors?.fax_number ? (
              <FormFeedback>{errors?.fax_number?.message}</FormFeedback>
            ) : null}
          </Col>
          <Col
            sm="12"
            md={isParentHave ? 12 : 6}
            lg={isParentHave ? 12 : 6}
            className="mb-1"
          >
            <Label htmlFor="currency">Currency</Label>
            <Controller
              id="currency"
              name="currency"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  control={control}
                  name="currency"
                  type="select"
                  invalid={errors.currency && true}
                  disabled={isAccepted}
                >
                  <option>---currency---</option>
                  {currencyList}
                </Input>
              )}
            />
            {errors?.currency ? (
              <FormFeedback>{errors?.currency?.message}</FormFeedback>
            ) : null}
          </Col>
          <Col
            sm="12"
            md={isParentHave ? 12 : 6}
            lg={isParentHave ? 12 : 6}
            className="mb-1"
          >
            <Label htmlFor="turnover_last_year">Turnover last year</Label>
            <Controller
              id="turnover_last_year"
              name="turnover_last_year"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  invalid={errors.turnover_last_year && true}
                  readOnly={isAccepted}
                />
              )}
            />
            {errors?.turnover_last_year ? (
              <FormFeedback>{errors?.turnover_last_year?.message}</FormFeedback>
            ) : null}
          </Col>
         
          <Col
            sm="12"
            md={isParentHave ? 12 : 6}
            lg={isParentHave ? 12 : 6}
            className="mb-1"
          >
            <Label htmlFor="incorporation_date">Incorporation Date</Label>
            <Controller
              id="incorporation_date"
              name="incorporation_date"
              control={control}
              requird
              render={({ field }) => (
                <Input
                  {...field}
                  type="date"
                  invalid={errors.incorporation_date && true}
                  readOnly={isAccepted}
                />
              )}
            />
            {errors?.incorporation_date ? (
              <FormFeedback>{errors?.incorporation_date?.message}</FormFeedback>
            ) : null}
          </Col>
          <Col
            sm="12"
            md={isParentHave ? 12 : 6}
            lg={isParentHave ? 12 : 6}
            className="mb-1"
          >
            <Label htmlFor="tax_identification_number">
              VAT / Tax Identification number³
            </Label>
            <Controller
              id="tax_identification_number"
              name="tax_identification_number"
              control={control}
              rules={{
                maxLength: {
                  value: 15,
                  message: "value must be lesser than 15",
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  invalid={errors.tax_identification_number && true}
                  readOnly={isAccepted}
                />
              )}
            />
            {errors?.tax_identification_number ? (
              <FormFeedback>
                {errors?.tax_identification_number?.message}
              </FormFeedback>
            ) : null}
          </Col>
          <Col
            sm="12"
            md={isParentHave ? 12 : 6}
            lg={isParentHave ? 12 : 6}
            className="mb-1"
          >
            <Label htmlFor="stock_exchange">
              Is company publicly listed on a stock exchange?
            </Label>
            <Controller
              id="stock_exchange"
              name="stock_exchange"
              control={control}
              render={({ field: { value, onChange } }) => {
                return (
                  <div className="form-switch form-check-primary">
                    <Input
                      type="switch"
                      name="icon-primary"
                      onChange={onChange}
                      checked={value}
                    />
                  </div>
                );
              }}
            />
          </Col>
          <Col
            sm="12"
            md={isParentHave ? 12 : 6}
            lg={isParentHave ? 12 : 6}
            className="mb-1"
          >
            <Label htmlFor="">
              Is company a registered ‘not-for-profit’ organization?
            </Label>
            <Controller
              id="not_for_profit"
              name="not_for_profit"
              control={control}
              render={({ field: { value, onChange } }) => (
                <div className="form-switch form-check-primary">
                  <Input
                    type="switch"
                    name="icon-primary"
                    onChange={onChange}
                    checked={value}
                  />
                </div>
              )}
            />
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};
const ParentCompanyDetails = (props) => {
  const { isParentHave, title, control, errors } = props;
  const [isAccepted, setIsAccepted] = useState(false);
  return (
    <Card>
      <CardHeader>
        <CardText>
          <Alert color="warning">{isParentHave && title}</Alert>
        </CardText>
      </CardHeader>
      <CardBody>
        <Row>
          <Col sm="12"></Col>
          <Col
            sm="12"
            md={isParentHave ? 12 : 6}
            lg={isParentHave ? 12 : 6}
            className="mb-1"
          >
            <Label htmlFor="company_registration_no">
              Company registration number?
            </Label>
            <Controller
              name="parent_company_detail.company_registration_no"
              control={control}
              rules={{
                // required: true,
                maxLength: {
                  value: 20,
                  message: "value must be lesser than 20",
                },
              }}
              render={({ field }) => {
                return (
                  <Input
                    {...field}
                    type="number"
                    readOnly={isAccepted}
                    invalid={errors.company_registration_no && true}
                  />
                );
              }}
            />
            {errors?.parent_company_detail?.parent_company_detail
              ?.company_registration_no ? (
              <FormFeedback>
                {
                  errors?.parent_company_detail?.parent_company_detail
                    ?.company_registration_no.message
                }
              </FormFeedback>
            ) : null}
          </Col>
          <Col
            sm="12"
            md={isParentHave ? 12 : 6}
            lg={isParentHave ? 12 : 6}
            className="mb-1"
          >
            <Label htmlFor="legal_company_name">Legal name of company</Label>
            <Controller
              name="parent_company_detail.legal_company_name"
              control={control}
              rules={{
                maxLength: {
                  value: 32,
                  message: "value must be lesser than 32",
                },
              }}
              render={({ field }) => (
                <Input
                  control={control}
                  type="text"
                  {...field}
                  invalid={errors.legal_company_name && true}
                  readOnly={isAccepted}
                />
              )}
            />
            {errors?.parent_company_detail?.parent_company_detail
              ?.legal_company_name ? (
              <FormFeedback>
                {errors?.parent_company_detail?.parent_company_detail?.message}
              </FormFeedback>
            ) : null}
          </Col>
          <Col
            sm="12"
            md={isParentHave ? 12 : 6}
            lg={isParentHave ? 12 : 6}
            className="mb-1"
          >
            <Label htmlFor="legal_company_name">
              Registered DBA/trade name
            </Label>
            <Controller
              id="trade_name"
              name="parent_company_detail.trade_name"
              control={control}
              rules={{
                maxLength: {
                  value: 32,
                  message: "value must be lesser than 32",
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  name="parent_company_detail.trade_name"
                  type="text"
                  invalid={errors.trade_name && true}
                  readOnly={isAccepted}
                />
              )}
            />
            {errors?.parent_company_detail?.trade_name ? (
              <FormFeedback>
                {errors?.parent_company_detail?.trade_name?.message}
              </FormFeedback>
            ) : null}
          </Col>
          <Col sm="12" md="6" lg="6" className="msb-1">
            <Label htmlFor="">Type of business</Label>
            <Controller
              id="business_type"
              name="parent_company_detail.business_type"
              control={control}
              rules={{
                maxLength: {
                  value: 32,
                  message: "value must be lesser than 32",
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  name="parent_company_detail.business_type"
                  type="text"
                  invalid={errors.business_type && true}
                  readOnly={isAccepted}
                />
              )}
            />
            {errors?.parent_company_detail?.business_type ? (
              <FormFeedback>
                {errors?.parent_company_detail?.business_type?.message}
              </FormFeedback>
            ) : null}
          </Col>
          <Col
            sm="12"
            md={isParentHave ? 12 : 6}
            lg={isParentHave ? 12 : 6}
            className="mb-1"
          >
            <Label htmlFor="registered_street_address">Street address</Label>
            <Controller
              id="registered_street_address"
              name="parent_company_detail.registered_street_address"
              control={control}
              rules={{
                maxLength: {
                  value: 50,
                  message: "value must be lesser than 50",
                },
              }}
              render={({ field }) => {
                return (
                  <Input
                    {...field}
                    type="text"
                    invalid={errors.registered_street_address && true}
                    readOnly={isAccepted}
                  />
                );
              }}
            />
            {errors?.parent_company_detail?.registered_street_address ? (
              <FormFeedback>
                {
                  errors?.parent_company_detail?.registered_street_address
                    ?.message
                }
              </FormFeedback>
            ) : null}
          </Col>
          <Col
            sm="12"
            md={isParentHave ? 12 : 6}
            lg={isParentHave ? 12 : 6}
            className="mb-1"
          >
            <Label htmlFor="">Office / House number</Label>
            <Controller
              id="house_number"
              name="parent_company_detail.house_number"
              control={control}
              rules={{
                maxLength: {
                  value: 5,
                  message: "value must be lesser than 5",
                },
              }}
              render={({ field }) => {
                return (
                  <Input
                    {...field}
                    name="parent_company_detail.house_number"
                    type="text"
                    invalid={errors.house_number && true}
                    readOnly={isAccepted}
                  />
                );
              }}
            />
            {errors?.parent_company_detail?.house_number ? (
              <FormFeedback>
                {errors?.parent_company_detail?.house_number?.message}
              </FormFeedback>
            ) : null}
          </Col>
          <Col
            sm="12"
            md={isParentHave ? 12 : 6}
            lg={isParentHave ? 12 : 6}
            className="mb-1"
          >
            <Label htmlFor="">Postcode / zip code</Label>
            <Controller
              id="zip_code"
              name="parent_company_detail.zip_code"
              control={control}
              rules={{
                maxLength: {
                  value: 10,
                  message: "value must be lesser than 10",
                },
              }}
              render={({ field }) => {
                return (
                  <Input
                    {...field}
                    type="text"
                    invalid={errors.zip_code && true}
                    readOnly={isAccepted}
                  />
                );
              }}
            />
            {errors?.parent_company_detail?.zip_code ? (
              <FormFeedback>
                {errors?.parent_company_detail?.zip_code?.message}
              </FormFeedback>
            ) : null}
          </Col>
          <Col
            sm="12"
            md={isParentHave ? 12 : 6}
            lg={isParentHave ? 12 : 6}
            className="mb-1"
          >
            <Label htmlFor="">City</Label>
            <Controller
              id="city"
              name="parent_company_detail.city"
              control={control}
              rules={{
                maxLength: {
                  value: 15,
                  message: "value must be lesser than 15",
                },
              }}
              render={({ field }) => {
                return (
                  <Input
                    {...field}
                    type="text"
                    invalid={errors.city && true}
                    readOnly={isAccepted}
                  />
                );
              }}
            />
            {errors?.parent_company_detail?.city ? (
              <FormFeedback>
                {errors?.parent_company_detail?.city?.message}
              </FormFeedback>
            ) : null}
          </Col>
          <Col
            sm="12"
            md={isParentHave ? 12 : 6}
            lg={isParentHave ? 12 : 6}
            className="mb-1"
          >
            <Label htmlFor="">State</Label>
            <Controller
              id="state"
              name="parent_company_detail.state"
              control={control}
              rules={{
                maxLength: {
                  value: 15,
                  message: "value must be lesser than 15",
                },
              }}
              render={({ field }) => {
                return (
                  <Input
                    {...field}
                    type="text"
                    invalid={errors.state && true}
                    readOnly={isAccepted}
                  />
                );
              }}
            />
            {errors?.parent_company_detail?.state ? (
              <FormFeedback>
                {errors?.parent_company_detail?.state?.message}
              </FormFeedback>
            ) : null}
          </Col>
          <Col
            sm="12"
            md={isParentHave ? 12 : 6}
            lg={isParentHave ? 12 : 6}
            className="mb-1"
          >
            <Label htmlFor="">Country</Label>
            <Controller
              id="country"
              name="parent_company_detail.country"
              control={control}
              render={({ field }) => {
                return (
                  <Input
                    {...field}
                    type="select"
                    invalid={errors.country && true}
                    disabled={isAccepted}
                  >
                    <option value="none" selected disabled hidden>
                      Select Country
                    </option>
                    {countryList}
                  </Input>
                );
              }}
            />
            {errors?.parent_company_detail?.country ? (
              <FormFeedback>
                {errors?.parent_company_detail?.country?.message}
              </FormFeedback>
            ) : null}
          </Col>
          <Col
            sm="12"
            md={isParentHave ? 12 : 6}
            lg={isParentHave ? 12 : 6}
            className="mb-1"
          >
            <Label htmlFor="telephone_number">Telephone number</Label>
            <Controller
              id="telephone_number"
              name="parent_company_detail.telephone_number"
              control={control}
              rules={{
                maxLength: {
                  value: 15,
                  message: "value must be lesser than 15",
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  invalid={errors.telephone_number && true}
                  readOnly={isAccepted}
                />
              )}
            />
            {errors?.parent_company_detail?.telephone_number ? (
              <FormFeedback>
                {errors?.parent_company_detail?.telephone_number?.message}
              </FormFeedback>
            ) : null}
          </Col>
          <Col
            sm="12"
            md={isParentHave ? 12 : 6}
            lg={isParentHave ? 12 : 6}
            className="mb-1"
          >
            <Label htmlFor="fax_number">Fax number</Label>
            <Controller
              id="fax_number"
              name="parent_company_detail.fax_number"
              control={control}
              rules={{
                maxLength: {
                  value: 10,
                  message: "value must be lesser than 10",
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  onChange={(e) => {
                    field.onChange(parseInt(e.target.value));
                  }}
                  invalid={errors?.parent_company_detail?.fax_number && true}
                  readOnly={isAccepted}
                />
              )}
         
            />
            {errors?.parent_company_detail?.fax_number ? (
              <FormFeedback>
                {errors?.parent_company_detail?.fax_number?.message}
              </FormFeedback>
            ) : null}
          </Col>
          <Col
            sm="12"
            md={isParentHave ? 12 : 6}
            lg={isParentHave ? 12 : 6}
            className="mb-1"
          >
            <Label htmlFor="currency">Currency</Label>
            <Controller
              id="currency"
              name="parent_company_detail.currency"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="select"
                  invalid={errors.currency && true}
                  disabled={isAccepted}
                >
                  <option>---currency---</option>
                  {currencyList}
                </Input>
              )}
            />
            {errors?.parent_company_detail?.currency ? (
              <FormFeedback>
                {errors?.parent_company_detail?.currency?.message}
              </FormFeedback>
            ) : null}
          </Col>
          <Col
            sm="12"
            md={isParentHave ? 12 : 6}
            lg={isParentHave ? 12 : 6}
            className="mb-1"
          >
            <Label htmlFor="turnover_last_year">Turnover last year</Label>
            <Controller
              id="turnover_last_year"
              name="parent_company_detail.turnover_last_year"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  invalid={errors.turnover_last_year && true}
                  readOnly={isAccepted}
                />
              )}
            />
            {errors?.parent_company_detail?.turnover_last_year ? (
              <FormFeedback>
                {errors?.parent_company_detail?.turnover_last_year?.message}
              </FormFeedback>
            ) : null}
          </Col>
          <Col
            sm="12"
            md={isParentHave ? 12 : 6}
            lg={isParentHave ? 12 : 6}
            className="mb-1"
          >
            <Label htmlFor="incorporation_date">Incorporation Date</Label>
            <Controller
              id="incorporation_date"
              name="parent_company_detail.incorporation_date"
              control={control}
              requird
              render={({ field }) => (
                <Input
                  {...field}
                  type="date"
                  invalid={errors.incorporation_date && true}
                  readOnly={isAccepted}
                />
              )}
            />
            {errors?.parent_company_detail?.incorporation_date ? (
              <FormFeedback>
                {errors?.parent_company_detail?.incorporation_date?.message}
              </FormFeedback>
            ) : null}
          </Col>
          <Col
            sm="12"
            md={isParentHave ? 12 : 6}
            lg={isParentHave ? 12 : 6}
            className="mb-1"
          >
            <Label htmlFor="tax_identification_number">
              VAT / Tax Identification number³
            </Label>
            <Controller
              id="tax_identification_number"
              name="parent_company_detail.tax_identification_number"
              control={control}
              rules={{
                maxLength: {
                  value: 15,
                  message: "value must be lesser than 15",
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  invalid={errors.tax_identification_number && true}
                  readOnly={isAccepted}
                />
              )}
            />
            {errors?.parent_company_detail?.tax_identification_number ? (
              <FormFeedback>
                {
                  errors?.parent_company_detail?.tax_identification_number
                    ?.message
                }
              </FormFeedback>
            ) : null}
          </Col>
          <Col
            sm="12"
            md={isParentHave ? 12 : 6}
            lg={isParentHave ? 12 : 6}
            className="mb-1"
          >
            <Label htmlFor="stock_exchange">
              Is company publicly listed on a stock exchange?
            </Label>
            <Controller
              id="stock_exchange"
              name="parent_company_detail.stock_exchange"
              control={control}
              render={({ field: { value, onChange } }) => {
                return (
                  <div className="form-switch form-check-primary">
                    <Input
                      type="switch"
                      name="parent_company_detail.icon-primary"
                      onChange={onChange}
                      checked={value}
                    />
                  </div>
                );
              }}
            />
          </Col>
          <Col
            sm="12"
            md={isParentHave ? 12 : 6}
            lg={isParentHave ? 12 : 6}
            className="mb-1"
          >
            <Label htmlFor="">
              Is company a registered ‘not-for-profit’ organization?
            </Label>
            <Controller
              id="not_for_profit"
              name="parent_company_detail.not_for_profit"
              control={control}
              render={({ field: { value, onChange } }) => (
                <div className="form-switch form-check-primary">
                  <Input
                    type="switch"
                    name="parent_company_detail.icon-primary"
                    onChange={onChange}
                    checked={value}
                  />
                </div>
              )}
            />
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

const BillingDetails = (props) => {
  const { control, errors, isAccepted = false } = props;
  return (
    <Card>
      <CardBody>
        <Row>
          <Col sm="12" md="6" lg="6" className="mb-1">
            <Label htmlFor="">Street address</Label>
            <Controller
              id="billing_street_address"
              name="billing_street_address"
              control={control}
              rules={{
                maxLength: {
                  value: 50,
                  message: "value must be lesser than 50",
                },
              }}
              render={({ field }) => {
                return (
                  <Input
                    {...field}
                    type="text"
                    invalid={errors.billing_street_address && true}
                    readOnly={isAccepted}
                  />
                );
              }}
            />
            {errors?.billing_street_address ? (
              <FormFeedback>
                {errors?.billing_street_address?.message}
              </FormFeedback>
            ) : null}
          </Col>
          <Col sm="12" md="6" lg="6" className="mb-1">
            <Label htmlFor="billing_house_no">Office / House number</Label>
            <Controller
              id="billing_house_no"
              name="billing_house_no"
              control={control}
              rules={{
                maxLength: {
                  value: 5,
                  message: "value must be lesser than 5",
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  invalid={errors.billing_house_no && true}
                  readOnly={isAccepted}
                />
              )}
            />

            {errors?.billing_house_no ? (
              <FormFeedback>{errors?.billing_house_no?.message}</FormFeedback>
            ) : null}
          </Col>
          <Col sm="12" md="6" lg="6" className="mb-1">
            <Label htmlFor="billing_post_code">Postcode / zip code</Label>
            <Controller
              id="billing_post_code"
              name="billing_post_code"
              control={control}
              rules={{
                maxLength: {
                  value: 25,
                  message: "value must be lesser than 25",
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  invalid={errors.billing_post_code && true}
                  readOnly={isAccepted}
                />
              )}
            />
            {errors?.billing_post_code ? (
              <FormFeedback>{errors?.billing_post_code?.message}</FormFeedback>
            ) : null}
          </Col>
          <Col sm="12" md="6" lg="6" className="mb-1">
            <Label htmlFor="billing_city">City</Label>
            <Controller
              id="billing_city"
              name="billing_city"
              control={control}
              rules={{
                maxLength: {
                  value: 35,
                  message: "value must be lesser than 35",
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  invalid={errors.billing_city && true}
                  readOnly={isAccepted}
                />
              )}
            />
            {errors?.billing_city ? (
              <FormFeedback>{errors?.billing_city?.message}</FormFeedback>
            ) : null}
          </Col>
          <Col sm="12" md="6" lg="6" className="mb-1">
            <Label htmlFor="billing_state">State</Label>
            <Controller
              id="billing_state"
              name="billing_state"
              control={control}
              rules={{
                maxLength: {
                  value: 20,
                  message: "value must be lesser than 20",
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  invalid={errors.billing_state && true}
                  readOnly={isAccepted}
                />
              )}
            />
            {errors?.registered_street_address ? (
              <FormFeedback>
                {errors?.registered_street_address?.message}
              </FormFeedback>
            ) : null}
          </Col>
          <Col sm="12" md="6" lg="6" className="mb-1">
            <Label htmlFor="billing_country">Country</Label>
            <Controller
              id="billing_country"
              name="billing_country"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="select"
                  disabled={isAccepted}
                  invalid={errors.billing_country && true}
                >
                  <option value="none" selected disabled hidden>
                    Select Country
                  </option>
                  {countryList}
                </Input>
              )}
            />
            {errors?.billing_country ? (
              <FormFeedback>{errors?.billing_country?.message}</FormFeedback>
            ) : null}
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

const CompanyProfile = (props) => {
  const { defaultData, creat, update, loader } = props;
  // ** state
  const [isAccepted, setIsAccepted] = useState(false);
  const [billAdress, setBillAdress] = useState(false);
  const [isParentHave, setIsParentHave] = useState(false);
  const [rotateValue, setRotateValue] = useState(180);
  const [defaultValues, setDefaultValues] = useState({ ...defaultData });
  const [isDefaultSet, setIsDefaultSet] = useState(false);

  const firstInputRef = useRef();
  // console.log(defaultData);
  const {
    control,
    setError,
    reset,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm({ defaultValues: defaultValues });

  // console.log({ applyingComapanyData, parentCompanyData });

  const handleParent = (value) => {
    const isHave = value; // get the new value from the event
    if (!isHave) {
      setRotateValue(180);
      setTimeout(() => setIsParentHave(isHave), 1500);
    } else {
      setIsParentHave(isHave);
      setTimeout(() => setRotateValue(0), 1500);
    }
  };

  const onSubmit = (data) => {
    if (data.uid) update({ ...data });
    else creat(data);
  };

  useEffect(() => {
    setDefaultValues({ ...defaultData });
    setIsDefaultSet(true);
  }, [defaultData]);

  useEffect(() => {
    if (isDefaultSet) {
      reset({ ...defaultValues });
      setIsDefaultSet(false);
    }
  }, [isDefaultSet, reset]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row style={{ perspective: "1000px" }}>
        <Col sm="12" className="my-1">
          <Label className="form-label" for="having_parent_company">
            Is Applying Company owned by a Parent Company?
          </Label>
          {/* <div className="form-switch form-check-primary">
            <Input
              type="switch"
              name="icon-primary"
              onChange={handleParent}
              checked={isParentHave}
              disabled={isAccepted}
            />
          </div> */}
          <Controller
            control={control}
            name="having_parent_company"
            render={({ field: { value, onChange } }) => {
              handleParent(value);
              return (
                <div className="form-switch form-check-primary">
                  <Input
                    type="switch"
                    name="icon-primary"
                    onChange={onChange}
                    checked={value}
                  />
                </div>
              );
            }}
          />
        </Col>
        <Col
          sm="12"
          md={isParentHave ? 6 : 12}
          lg={isParentHave ? 6 : 12}
          style={{ zIndex: "1", transition: "all 1s" }}
        >
          <ApplyingCompanyDetails
            isParentHave={isParentHave}
            title={"Applying Compnay Details"}
            control={control}
            errors={errors}
            firstInputRef={firstInputRef}
          />
        </Col>
        <Col
          sm="12"
          md={isParentHave ? 6 : 12}
          lg={isParentHave ? 6 : 12}
          style={{
            // transform: "rotateY(45deg)",
            transform: `rotateY(${rotateValue}deg)`,
            transition: "all 1s",
            transformOrigin: "left",
          }}
        >
          {isParentHave && (
            <ParentCompanyDetails
              isParentHave={isParentHave}
              title={"Parent Compnay Details"}
              control={control}
              errors={errors}
            />
          )}
        </Col>
        <Col sm="12" md="12" lg="12" className="mb-1">
          <Label htmlFor="">
            Is billing address different from registered address?
          </Label>
          <Controller
            id="billing_registered_address"
            name="billing_registered_address"
            control={control}
            render={({ field: { value, onChange } }) => {
              if (value === true) {
                setBillAdress(true);
              } else {
                setBillAdress(false);
              }
              return (
                <div className="form-switch form-check-primary">
                  <Input
                    type="switch"
                    name="icon-primary"
                    onChange={onChange}
                    checked={value}
                  />
                </div>
              );
            }}
          />
        </Col>
        <Col
          sm="12"
          md="12"
          lg="12"
          className="mb-1"
          style={{ position: "relative", perspective: "1000px" }}
        >
          <div
            style={{
              transition: "all 1s",
              height: "max-content",
              transform: `rotatex(${billAdress ? 0 : 74.4}deg)`,
              transformOrigin: "top",
            }}
          >
            {billAdress && (
              <BillingDetails
                control={control}
                errors={errors}
                isAccepted={isAccepted}
                setBillAdress={setBillAdress}
                isParentHave={isParentHave}
              />
            )}
          </div>
        </Col>
        <Col sm="12" md="12" lg="12" className="d-flex justify-content-end">
          <Button type="submit" color="success">
            {loader ? (
              <>
                <Spinner color="white" size="sm" type="grow" />
                <span className="ms-50">Loading...</span>
              </>
            ) : (
              <span className="ms-50">SUBMIT</span>
            )}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default CompanyProfile;

CompanyProfile.propTypes = {
  update: PropTypes.func.isRequired,
  creat: PropTypes.func.isRequired,
  defaultData: PropTypes.object.isRequired,
  loader: PropTypes.bool.isRequired,
};
