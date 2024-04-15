// ** React Imports
import { Fragment, useState, useEffect } from "react";

import { Controller, useForm } from "react-hook-form";

// import country_code from "../../../../../country_code.json";
import country_code from "../../../../country_code.json";

// ** Reactstrap Imports
import {
  Label,
  Row,
  Col,
  Input,
  Form,
  Button,
  Card,
  CardBody,
  CardFooter,
  Spinner,
  CardHeader,
} from "reactstrap";

// ** style
// import "./style/style.css";

// ** Currency List
const paidCurrencyList = [
  "Pounds SterLing",
  "US Dollar",
  "Australian Dollar",
  "Canadian Dollar",
  "Danish Krone",
  "Euro",
  "Hong Kong Dollar",
  "Japenese Yen",
  "New Zealand Dollar",
  "Norwegian Krone",
  "Singapore Dollar",
  "South African Rand",
  "Swedish Krona",
];

const currencyList = paidCurrencyList.map((e, i) => {
  return <option key={i}>{e}</option>;
});

const CompanyProfile = ({ setpper, data = {} }) => {
  // ** states
  const [defaultData, setDefaultData] = useState();
  const [showParent, setShowparent] = useState(false);
  const [billAdress, setBillAdresss] = useState(false);
  const [isAccepted, setIsAccepted] = useState(true);
  // ** Forms
  const {
    control,
    reset,
    formState: { errors },
    setValue,
  } = useForm({ defaultValues: defaultData });

  // ** Country
  const country = country_code.map((e, i) => {
    return <option key={i}>{e.name}</option>;
  });

  useEffect(() => {
    setDefaultData({ ...data });
    reset(data);
  }, [reset,data]);

  return (
    <Card className="application-container">
      <CardHeader>
        <div className="content-header">
          <h5 className="mb-0">Company Profiles</h5>
          <small className="text-muted">Enter Your Company Details.</small>
        </div>
      </CardHeader>

      <CardBody>
        <div>
          <Form className="container-None">
            <div hidden>
              <Controller
                id="uid"
                name="uid"
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      control={control}
                      name="uid"
                      type="number"
                      invalid={errors.uid && true}
                      readOnly={isAccepted}
                      {...field}
                    />
                  );
                }}
              />
            </div>
            <div
              className="row"
              style={{ display: "flex", alignItems: "baseline" }}
            >
              <div className="mt-3 mb-2">
                <Label className="form-label" for="having_parent_company">
                  Is Applying Company owned by a Parent Company?
                </Label>
                <br />
                <Controller
                  id="having_parent_company"
                  name="having_parent_company"
                  control={control}
                  render={({ field: { value, onChange } }) => {
                    if (value == true) {
                      setShowparent(true);
                    } else {
                      setShowparent(false);
                    }
                    return (
                      <div className="form-switch form-check-primary">
                        <Input
                          type="switch"
                          name="icon-primary"
                          onChange={onChange}
                          checked={value}
                          disabled={isAccepted}
                        />
                      </div>
                    );
                  }}
                />
              </div>
              <div className="id col-lg-6 mt-1 ">
                <Label
                  className="d-flex justify-content-between form-label"
                  for="company_registration_no"
                >
                  <span>Company registration number?</span>
                  {showParent && (
                    <span className="text-warning">
                      Details of Applying Company
                    </span>
                  )}
                </Label>
                <Controller
                  id="company_registration_no"
                  name="company_registration_no"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Input
                        control={control}
                        name="company_registration_no"
                        type="number"
                        invalid={errors.company_registration_no && true}
                        readOnly={isAccepted}
                        {...field}
                        required
                      />
                    );
                  }}
                />
              </div>
              {showParent && (
                <div className="company_registration_no col-lg-6 mt-1  ">
                  <Label
                    className="d-flex justify-content-between form-label"
                    for="company_registration_no"
                  >
                    <span>Company registration number</span>
                    {showParent && (
                      <span className="text-warning">
                        Details of Parent Company
                      </span>
                    )}
                  </Label>
                  <Controller
                    id="company_registration_no"
                    name="parent_company_detail.company_registration_no"
                    control={control}
                    render={({ field }) => {
                      return (
                        <Input
                          control={control}
                          name="parent_company_detail.company_registration_no"
                          type="number"
                          invalid={errors.company_registration_no && true}
                          readOnly={isAccepted}
                          {...field}
                        />
                      );
                    }}
                  />
                </div>
              )}

              <div className="legal_name_company col-lg-6 mt-1 ">
                <Label
                  className="d-flex justify-content-between form-label"
                  for="legal_company_name"
                >
                  <span>Legal name of company</span>
                  {showParent && (
                    <span className="text-warning">
                      Details of Applying Company
                    </span>
                  )}
                </Label>
                <Controller
                  id="legal_company_name"
                  name="legal_company_name"
                  control={control}
                  render={({ field }) => (
                    <Input
                      control={control}
                      name="legal_company_name"
                      type="text"
                      invalid={errors.legal_company_name && true}
                      readOnly={isAccepted}
                      {...field}
                    />
                  )}
                />
              </div>
              {showParent && (
                <div className="legal_name_company col-lg-6 mt-1">
                  <Label
                    className="d-flex justify-content-between form-label"
                    for="legal_company_name"
                  >
                    <span>Legal name of company</span>
                    {showParent && (
                      <span className="text-warning">
                        Details of Parent Company
                      </span>
                    )}
                  </Label>
                  <Controller
                    id="legal_company_name"
                    name="parent_company_detail.legal_company_name"
                    control={control}
                    render={({ field }) => (
                      <Input
                        control={control}
                        name="parent_company_detail.legal_company_name"
                        type="text"
                        invalid={errors.legal_company_name && true}
                        readOnly={isAccepted}
                        {...field}
                      />
                    )}
                  />
                </div>
              )}

              <div className="Registered_DBA col-lg-6 mt-1 ">
                <Label
                  className="d-flex justify-content-between form-label"
                  for="About-registrationNumber"
                >
                  <span>
                    Registered DBA/trade name (if other than legal name)
                  </span>
                  {showParent && (
                    <span className="text-warning">
                      Details of Applying Company
                    </span>
                  )}
                </Label>
                <Controller
                  id="trade_name"
                  name="trade_name"
                  control={control}
                  render={({ field }) => (
                    <Input
                      control={control}
                      name="trade_name"
                      type="text"
                      invalid={errors.trade_name && true}
                      readOnly={isAccepted}
                      {...field}
                    />
                  )}
                />
              </div>
              {showParent && (
                <div className="Registered_DBA   col-lg-6 mt-1 ">
                  <Label
                    className="d-flex justify-content-between form-label"
                    for="trade_name_p"
                  >
                    <span>
                      Registered DBA/trade name (if other than legal name)
                    </span>
                    {showParent && (
                      <span className="text-warning">
                        Details of Parent Company
                      </span>
                    )}
                  </Label>
                  <Controller
                    id="trade_name"
                    name="parent_company_detail.trade_name"
                    control={control}
                    render={({ field }) => (
                      <Input
                        control={control}
                        name="parent_company_detail.trade_name"
                        type="text"
                        invalid={errors.trade_name && true}
                        readOnly={isAccepted}
                        {...field}
                      />
                    )}
                  />
                </div>
              )}

              <div className="Type_of_business col-lg-6 mt-1 ">
                <Label
                  className="d-flex justify-content-between form-label"
                  for="business_type"
                >
                  <span>Type of business</span>
                  {showParent && (
                    <span className="text-warning">
                      Details of Applying Company
                    </span>
                  )}
                </Label>
                <Controller
                  id="business_type"
                  name="business_type"
                  control={control}
                  render={({ field }) => (
                    <Input
                      control={control}
                      name="business_type"
                      type="text"
                      invalid={errors.business_type && true}
                      readOnly={isAccepted}
                      {...field}
                    />
                  )}
                />
              </div>
              {showParent && (
                <div className="Type_of_business col-lg-6 mt-1 ">
                  <Label
                    className="d-flex justify-content-between form-label"
                    for="business_type"
                  >
                    <span>Type of business</span>
                    {showParent && (
                      <span className="text-warning">
                        Details of Parent Company
                      </span>
                    )}
                  </Label>
                  <Controller
                    id="business_type"
                    name="parent_company_detail.business_type"
                    control={control}
                    render={({ field }) => (
                      <Input
                        control={control}
                        name="parent_company_detail.business_type"
                        type="text"
                        invalid={errors.business_type && true}
                        readOnly={isAccepted}
                        {...field}
                      />
                    )}
                  />
                </div>
              )}

              <div className="Registered_street_address col-lg-6 mt-1 ">
                <Label
                  className="d-flex justify-content-between form-label"
                  for="registered_street_address"
                >
                  <span>Street address</span>
                  {showParent && (
                    <span className="text-warning">
                      Details of Applying Company
                    </span>
                  )}
                </Label>
                <Controller
                  id="registered_street_address"
                  name="registered_street_address"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Input
                        control={control}
                        name="registered_street_address"
                        type="text"
                        invalid={errors.registered_street_address && true}
                        readOnly={isAccepted}
                        {...field}
                      />
                    );
                  }}
                />
              </div>
              {showParent && (
                <div className="Registered_street_address col-lg-6 mt-1 ">
                  <Label
                    className="d-flex justify-content-between form-label"
                    for="registered_street_address"
                  >
                    <span>Street address</span>
                    {showParent && (
                      <span className="text-warning">
                        Details of Parent Company
                      </span>
                    )}
                  </Label>
                  <Controller
                    id="registered_street_address"
                    name="parent_company_detail.registered_street_address"
                    control={control}
                    render={({ field }) => (
                      <Input
                        control={control}
                        name="parent_company_detail.registered_street_address"
                        type="text"
                        invalid={errors.registered_street_address && true}
                        readOnly={isAccepted}
                        {...field}
                      />
                    )}
                  />
                </div>
              )}

              <div className="House_number col-lg-6 mt-1 ">
                <Label
                  className="d-flex justify-content-between form-label"
                  for="house_number"
                >
                  <span>Office / House number</span>
                  {showParent && (
                    <span className="text-warning">
                      Details of Applying Company
                    </span>
                  )}
                </Label>
                <Controller
                  id="house_number"
                  name="house_number"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Input
                        control={control}
                        name="house_number"
                        type="text"
                        invalid={errors.house_number && true}
                        readOnly={isAccepted}
                        {...field}
                      />
                    );
                  }}
                />
              </div>
              {showParent && (
                <div className="col-lg-6 mt-1 ">
                  <Label
                    className="d-flex justify-content-between form-label"
                    for="house_number"
                  >
                    <span>Office / House number</span>
                    {showParent && (
                      <span className="text-warning">
                        Details of Parent Company
                      </span>
                    )}
                  </Label>
                  <Controller
                    id="house_number"
                    name="parent_company_detail.house_number"
                    control={control}
                    render={({ field }) => (
                      <Input
                        control={control}
                        name="parent_company_detail.house_number"
                        type="text"
                        invalid={errors.house_number && true}
                        readOnly={isAccepted}
                        {...field}
                      />
                    )}
                  />
                </div>
              )}

              <div className="Post_and_zip col-lg-6 mt-1 ">
                <Label
                  className="d-flex justify-content-between form-label"
                  for="zip_code"
                >
                  <span>Postcode / zip code</span>
                  {showParent && (
                    <span className="text-warning">
                      Details of Applying Company
                    </span>
                  )}
                </Label>
                <Controller
                  id="zip_code"
                  name="zip_code"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Input
                        control={control}
                        name="zip_code"
                        type="text"
                        invalid={errors.zip_code && true}
                        readOnly={isAccepted}
                        {...field}
                      />
                    );
                  }}
                />
              </div>
              {showParent && (
                <div className="col-lg-6 mt-1 ">
                  <Label
                    className="d-flex justify-content-between form-label"
                    for="zip_code"
                  >
                    <span>Postcode / zip code</span>
                    {showParent && (
                      <span className="text-warning">
                        Details of Parent Company
                      </span>
                    )}
                  </Label>
                  <Controller
                    id="zip_code"
                    name="parent_company_detail.zip_code"
                    control={control}
                    render={({ field }) => (
                      <Input
                        control={control}
                        name="parent_company_detail.zip_code"
                        type="text"
                        invalid={errors.zip_code && true}
                        readOnly={isAccepted}
                        {...field}
                      />
                    )}
                  />
                </div>
              )}

              <div className="City col-lg-6 mt-1 ">
                <Label
                  className="d-flex justify-content-between form-label"
                  for="city"
                >
                  <span>City</span>
                  {showParent && (
                    <span className="text-warning">
                      Details of Applying Company
                    </span>
                  )}
                </Label>
                <Controller
                  id="city"
                  name="city"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Input
                        control={control}
                        name="city"
                        type="text"
                        invalid={errors.city && true}
                        readOnly={isAccepted}
                        {...field}
                      />
                    );
                  }}
                />
              </div>
              {showParent && (
                <div className="col-lg-6 mt-1 ">
                  <Label
                    className="d-flex justify-content-between form-label"
                    for="city"
                  >
                    <span>City</span>
                    {showParent && (
                      <span className="text-warning">
                        Details of Parent Company
                      </span>
                    )}
                  </Label>
                  <Controller
                    id="city"
                    name="parent_company_detail.city"
                    control={control}
                    render={({ field }) => (
                      <Input
                        control={control}
                        name="city"
                        type="text"
                        invalid={errors.city && true}
                        readOnly={isAccepted}
                        {...field}
                      />
                    )}
                  />
                </div>
              )}

              <div className="col-lg-6">
                <Label
                  className="d-flex justify-content-between form-label"
                  for="state"
                >
                  <span>State</span>
                  {showParent && (
                    <span className="text-warning">
                      Details of Applying Company
                    </span>
                  )}
                </Label>
                <Controller
                  id="state"
                  name="state"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Input
                        control={control}
                        name="state"
                        type="text"
                        invalid={errors.state && true}
                        readOnly={isAccepted}
                        {...field}
                      />
                    );
                  }}
                />
              </div>
              {showParent && (
                <div className="State col-lg-6">
                  <Label
                    className="d-flex justify-content-between form-label"
                    for="state "
                  >
                    <span>State</span>
                    {showParent && (
                      <span className="text-warning">
                        Details of Parent Company
                      </span>
                    )}
                  </Label>
                  <Controller
                    id="state "
                    name="parent_company_detail.state "
                    control={control}
                    render={({ field }) => (
                      <Input
                        control={control}
                        name="state "
                        type="text"
                        invalid={errors.state && true}
                        readOnly={isAccepted}
                        {...field}
                      />
                    )}
                  />
                </div>
              )}

              <div className="Country col-lg-6 mt-1 ">
                <Label
                  className="d-flex justify-content-between form-label"
                  for="country"
                >
                  <span>Country</span>
                  {showParent && (
                    <span className="text-warning">
                      Details of Applying Company
                    </span>
                  )}
                </Label>
                <br />
                <Controller
                  id="country"
                  name="country"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Input
                        control={control}
                        name="country"
                        type="select"
                        invalid={errors.country && true}
                        disabled={isAccepted}
                        {...field}
                      >
                        <option value="none" selected disabled hidden>
                          Select Country
                        </option>
                        {country}
                      </Input>
                    );
                  }}
                />
              </div>
              {showParent && (
                <div className="Country col-lg-6 mt-1 ">
                  <Label
                    className="d-flex justify-content-between form-label"
                    for="country"
                  >
                    <span>Country</span>
                    {showParent && (
                      <span className="text-warning">
                        Details of Parent Company
                      </span>
                    )}
                  </Label>
                  <br />
                  <Controller
                    id="country"
                    name="parent_company_detail.country"
                    control={control}
                    render={({ field }) => (
                      <Input
                        control={control}
                        name="parent_company_detail.country"
                        type="select"
                        invalid={errors.country && true}
                        disabled={isAccepted}
                        {...field}
                      >
                        <option value="none" selected disabled hidden>
                          Select Country
                        </option>
                        {country}
                      </Input>
                    )}
                  />
                </div>
              )}

              <div className="Telephone col-lg-6 mt-1 ">
                <Label
                  className="d-flex justify-content-between form-label"
                  for="telephone_number"
                >
                  <span>Telephone number </span>
                  {showParent && (
                    <span className="text-warning">
                      Details of Applying Company
                    </span>
                  )}
                </Label>
                <Controller
                  id="telephone_number"
                  name="telephone_number"
                  control={control}
                  render={({ field }) => (
                    <Input
                      control={control}
                      name="telephone_number"
                      type="text"
                      invalid={errors.telephone_number && true}
                      readOnly={isAccepted}
                      {...field}
                    />
                  )}
                />
              </div>
              {showParent && (
                <div className="Telephone-p col-lg-6 mt-1 ">
                  <Label
                    className="d-flex justify-content-between form-label"
                    for="telephone_number "
                  >
                    <span>Telephone number </span>
                    {showParent && (
                      <span className="text-warning">
                        Details of Parent Company
                      </span>
                    )}
                  </Label>
                  <Controller
                    id="telephone_number "
                    name="parent_company_detail.telephone_number "
                    control={control}
                    render={({ field }) => (
                      <Input
                        control={control}
                        name="parent_company_detail.telephone_number "
                        type="text"
                        invalid={errors.telephone_number && true}
                        readOnly={isAccepted}
                        {...field}
                      />
                    )}
                  />
                </div>
              )}

              <div className="Fax col-lg-6 mt-1 ">
                <Label
                  className="d-flex justify-content-between form-label"
                  for="fax_number"
                >
                  <span>Fax number </span>
                  {showParent && (
                    <span className="text-warning">
                      Details of Applying Company
                    </span>
                  )}
                </Label>
                <Controller
                  id="fax_number"
                  name="fax_number"
                  control={control}
                  render={({ field }) => (
                    <Input
                      control={control}
                      name="fax_number"
                      type="text"
                      invalid={errors.fax_number && true}
                      readOnly={isAccepted}
                      {...field}
                    />
                  )}
                />
              </div>
              {showParent && (
                <div className="Fax-p col-lg-6 mt-1 ">
                  <Label
                    className="d-flex justify-content-between form-label"
                    for="fax_number "
                  >
                    <span>Fax number </span>
                    {showParent && (
                      <span className="text-warning">
                        Details of Parent Company
                      </span>
                    )}
                  </Label>
                  <Controller
                    id="fax_number "
                    name="parent_company_detail.fax_number "
                    control={control}
                    render={({ field }) => (
                      <Input
                        control={control}
                        name="fax_number "
                        type="text"
                        invalid={errors.fax_number && true}
                        readOnly={isAccepted}
                        {...field}
                      />
                    )}
                  />
                </div>
              )}

              <div
                id="DropYearMonth"
                className="Turnover_last_year col-lg-6 mt-1"
              >
                <div className="container-none">
                  <Label
                    className="d-flex justify-content-between form-label"
                    for="turnover_last_year mb-1"
                  >
                    <span>Turnover last year</span>
                    {showParent && (
                      <span className="text-warning">
                        Details of Applying Company
                      </span>
                    )}
                  </Label>
                  <div className="row g-2">
                    <div className="col-6">
                      <div className="">
                        <Controller
                          id="turnover_last_year"
                          name="turnover_last_year"
                          control={control}
                          render={({ field }) => (
                            <Input
                              control={control}
                              name="turnover_last_year"
                              type="text"
                              invalid={errors.turnover_last_year && true}
                              readOnly={isAccepted}
                              {...field}
                            />
                          )}
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <Controller
                        id="currency"
                        name="currency"
                        control={control}
                        render={({ field }) => (
                          <Input
                            control={control}
                            name="currency"
                            type="select"
                            invalid={errors.currency && true}
                            disabled={isAccepted}
                            {...field}
                          >
                            <option>---currency---</option>
                            {currencyList}
                          </Input>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {showParent && (
                <div
                  id="DropYearMonth"
                  className="Turnover_last_year  col-lg-6 mt-1"
                >
                  <div className="container-none">
                    <Label
                      className="d-flex justify-content-between form-label"
                      for="turnover_last_year  mb-1"
                    >
                      <span>Turnover last year</span>
                      {showParent && (
                        <span className="text-warning">
                          Details of Parent Company
                        </span>
                      )}
                    </Label>
                    <div className="row g-2">
                      <div className="col-6">
                        <div className="">
                          <Controller
                            id="turnover_last_year "
                            name="parent_company_detail.turnover_last_year "
                            control={control}
                            render={({ field }) => (
                              <Input
                                control={control}
                                name="parent_company_detail.turnover_last_year "
                                type="text"
                                invalid={errors.turnover_last_year && true}
                                readOnly={isAccepted}
                                {...field}
                              />
                            )}
                          />
                        </div>
                      </div>
                      <div className="col-6">
                        <Controller
                          id="currency "
                          name="parent_company_detail.currency "
                          control={control}
                          render={({ field }) => (
                            <Input
                              control={control}
                              name="currency "
                              type="select"
                              invalid={errors.currency && true}
                              disabled={isAccepted}
                              {...field}
                            >
                              <option value="none" selected disabled hidden>
                                ---currency---
                              </option>
                              {currencyList}
                            </Input>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className=" incorporation_date col-lg-6 mt-1 ">
                <Label
                  className="d-flex justify-content-between form-label"
                  for="incorporation_date"
                >
                  <span>Incorporation Date </span>
                  {showParent && (
                    <span className="text-warning">
                      Details of Applying Company
                    </span>
                  )}
                </Label>
                <Controller
                  id="incorporation_date"
                  name="incorporation_date"
                  control={control}
                  requird
                  render={({ field }) => (
                    <Input
                      control={control}
                      name="incorporation_date"
                      type="date"
                      invalid={errors.incorporation_date && true}
                      readOnly={isAccepted}
                      {...field}
                    />
                  )}
                />
              </div>
              {showParent && (
                <div className=" incorporation_date col-lg-6 mt-1 ">
                  <Label
                    className="d-flex justify-content-between form-label"
                    for="incorporation_date"
                  >
                    <span>Incorporation Date </span>
                    {showParent && (
                      <span className="text-warning">
                        Details of Parent Company
                      </span>
                    )}
                  </Label>
                  <Controller
                    id="incorporation_date"
                    name="parent_company_detail.incorporation_date"
                    control={control}
                    render={({ field }) => (
                      <Input
                        control={control}
                        name="parent_company_detail.incorporation_date"
                        type="date"
                        invalid={errors.incorporation_date && true}
                        readOnly={isAccepted}
                        {...field}
                      />
                    )}
                  />
                </div>
              )}

              <div className="VAT_Tax col-lg-6 mt-1 ">
                <Label
                  className="d-flex justify-content-between form-label"
                  for="tax_identification_number"
                >
                  <span>VAT / Tax Identification number ³ </span>
                  {showParent && (
                    <span className="text-warning">
                      Details of Applying Company
                    </span>
                  )}
                </Label>
                <Controller
                  id="tax_identification_number"
                  name="tax_identification_number"
                  control={control}
                  render={({ field }) => (
                    <Input
                      control={control}
                      name="tax_identification_number"
                      type="text"
                      invalid={errors.tax_identification_number && true}
                      readOnly={isAccepted}
                      {...field}
                    />
                  )}
                />
              </div>
              {showParent && (
                <div className=" VAT_Tax  col-lg-6 mt-1 ">
                  <Label
                    className="d-flex justify-content-between form-label"
                    for="tax_identification_number "
                  >
                    <span>VAT / Tax Identification number ³ </span>
                    {showParent && (
                      <span className="text-warning">
                        Details of Parent Company
                      </span>
                    )}
                  </Label>
                  <Controller
                    id="tax_identification_number "
                    name="parent_company_detail.tax_identification_number "
                    control={control}
                    render={({ field }) => (
                      <Input
                        control={control}
                        name="parent_company_detail.tax_identification_number "
                        type="text"
                        invalid={errors.tax_identification_number && true}
                        readOnly={isAccepted}
                        {...field}
                      />
                    )}
                  />
                </div>
              )}

              <div className="listed_on_stock col-lg-6 mt-1 ">
                <Label
                  className="d-flex justify-content-between form-label"
                  for="stock_exchange"
                >
                  <span>Is company publicly listed on a stock exchange?</span>
                  {showParent && (
                    <span className="text-warning">
                      Details of Applying Company
                    </span>
                  )}
                </Label>
                <br />
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
                          disabled={isAccepted}
                        />
                      </div>
                    );
                  }}
                />
              </div>
              {showParent && (
                <div className="listed_on_stock  col-lg-6 mt-1 ">
                  <Label
                    className="form-label d-flex justify-content-between"
                    for="stock_exchange"
                  >
                    <span>Is company publicly listed on a stock exchange?</span>
                    {showParent && (
                      <span className="text-warning">
                        (Details of Parent Company)
                      </span>
                    )}
                  </Label>
                  <br />
                  <Controller
                    id="parent_company_detail.stock_exchange"
                    name="parent_company_detail.stock_exchange"
                    control={control}
                    render={({ field: { value, onChange } }) => {
                      return (
                        <div className="form-switch form-check-primary">
                          <Input
                            type="switch"
                            name="icon-primary"
                            onChange={onChange}
                            checked={value}
                            disabled={isAccepted}
                          />
                        </div>
                      );
                    }}
                  />
                </div>
              )}

              <div className="company_registered_organization col-lg-6 mt-1 ">
                <Label
                  className="d-flex justify-content-between form-label"
                  for="not_for_profit"
                >
                  <span>
                    Is company a registered ‘not-for-profit’ organization?
                  </span>
                  {showParent && (
                    <span className="text-warning">
                      Details of Applying Company
                    </span>
                  )}
                </Label>
                <br />
                <Controller
                  id="not_for_profit"
                  name="not_for_profit"
                  control={control}
                  render={({ field: { value, onChange } }) => {
                    return (
                      <div className="form-switch form-check-primary">
                        <Input
                          type="switch"
                          name="icon-primary"
                          onChange={onChange}
                          checked={value}
                          disabled={isAccepted}
                        />
                      </div>
                    );
                  }}
                />
              </div>
              {showParent && (
                <div className="company_registered_organization col-lg-6 mt-1 ">
                  <Label
                    className="d-flex justify-content-between form-label"
                    for="not_for_profit  "
                  >
                    <span>
                      Is company a registered ‘not-for-profit’ organization?
                    </span>
                    {showParent && (
                      <span className="text-warning">
                        Details of Parent Company
                      </span>
                    )}
                  </Label>
                  <br />
                  <Controller
                    id="parent_company_detail.not_for_profit"
                    name="parent_company_detail.not_for_profit"
                    control={control}
                    render={({ field: { value, onChange } }) => {
                      return (
                        <div className="form-switch form-check-primary">
                          <Input
                            type="switch"
                            name="icon-primary"
                            onChange={onChange}
                            checked={value}
                            disabled={isAccepted}
                          />
                        </div>
                      );
                    }}
                  />
                </div>
              )}

              <div className="Billing col-lg-6 mt-1 ">
                <Label className="form-label" for="billing_registered_address">
                  Is billing address different from registered address?
                </Label>
                <br />
                <Controller
                  id="billing_registered_address"
                  name="billing_registered_address"
                  control={control}
                  render={({ field: { value, onChange } }) => {
                    if (value === true) {
                      setBillAdresss(true);
                    } else {
                      setBillAdresss(false);
                    }
                    return (
                      <div className="form-switch form-check-primary">
                        <Input
                          type="switch"
                          name="icon-primary"
                          onChange={onChange}
                          checked={value}
                          disabled={isAccepted}
                        />
                      </div>
                    );
                  }}
                />
              </div>
              {billAdress && (
                <div className="container-none pt-2 mt-2">
                  <div
                    className="row bg-light p-1 gy-1 gx-1"
                    style={{
                      boxShadow:
                        " rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
                    }}
                  >
                    <Label>
                      <h4>BILLING ADDRESS</h4>
                    </Label>
                    <div className="col-sm-6">
                      <Label
                        className="form-label"
                        for="billing_street_address"
                      >
                        Street address
                      </Label>
                      <Controller
                        id="billing_street_address"
                        name="billing_street_address"
                        control={control}
                        render={({ field }) => {
                          return (
                            <Input
                              control={control}
                              name="billing_street_address"
                              type="text"
                              invalid={errors.billing_street_address && true}
                              readOnly={isAccepted}
                              {...field}
                            />
                          );
                        }}
                      />
                    </div>
                    <div className="col-sm-6">
                      <Label className="form-label" for="billing_house_no">
                        Office / House number
                      </Label>
                      <Controller
                        id="billing_house_no"
                        name="billing_house_no"
                        control={control}
                        render={({ field }) => (
                          <Input
                            control={control}
                            name="billing_house_no"
                            type="text"
                            invalid={errors.billing_house_no && true}
                            readOnly={isAccepted}
                            {...field}
                          />
                        )}
                      />
                    </div>
                    <div className="col-sm-6">
                      <Label className="form-label" for="billing_post_code">
                        Postcode / zip code
                      </Label>
                      <Controller
                        id="billing_post_code"
                        name="billing_post_code"
                        control={control}
                        render={({ field }) => (
                          <Input
                            control={control}
                            name="billing_post_code"
                            type="text"
                            invalid={errors.billing_post_code && true}
                            readOnly={isAccepted}
                            {...field}
                          />
                        )}
                      />
                    </div>
                    <div className="col-sm-6">
                      <Label className="form-label" for="billing_city">
                        City
                      </Label>
                      <Controller
                        id="billing_city"
                        name="billing_city"
                        control={control}
                        render={({ field }) => (
                          <Input
                            control={control}
                            name="billing_city"
                            type="text"
                            invalid={errors.billing_city && true}
                            readOnly={isAccepted}
                            {...field}
                          />
                        )}
                      />
                    </div>
                    <div className="col-sm-6">
                      <Label className="form-label" for="billing_state">
                        State
                      </Label>
                      <Controller
                        id="billing_state"
                        name="billing_state"
                        control={control}
                        render={({ field }) => (
                          <Input
                            control={control}
                            name="billing_state"
                            type="text"
                            invalid={errors.billing_state && true}
                            readOnly={isAccepted}
                            {...field}
                          />
                        )}
                      />
                    </div>
                    <div className="col-lg-6 mt-1 ">
                      <Label className="form-label" for="billing_country">
                        Country
                      </Label>
                      <br />
                      <Controller
                        id="billing_country"
                        name="billing_country"
                        control={control}
                        render={({ field }) => (
                          <Input
                            control={control}
                            name="billing_country"
                            type="select"
                            disabled={isAccepted}
                            invalid={errors.billing_country && true}
                            {...field}
                          >
                            <option value="none" selected disabled hidden>
                              Select Country
                            </option>
                            {country}
                          </Input>
                        )}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Form>
        </div>
      </CardBody>

      <CardFooter className="d-flex justify-content-end mt-3">
        <Button color="primary" onClick={() => setpper("next")}>
          Next
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CompanyProfile;

