import React, { useEffect, useState, useRef } from "react";

import {
  Row,
  Col,
  Input,
  Label,
  Form,
  FormFeedback,
  CardHeader,
  CardBody,
  Card,
  CardFooter,
  Button,
  Table,
  InputGroup,
  InputGroupText,
  CardText,
  Spinner,
} from "reactstrap";
import { Controller, useForm, useFieldArray } from "react-hook-form";

import { SlideDown } from "react-slidedown";
import "react-slidedown/lib/slidedown.css";
import { Check, X } from "react-feather";

import useJwt from "@src/dashboard/jwt/useJwt";

const CustomLabel = ({ htmlFor }) => {
  return (
    <Label className="form-check-label" htmlFor={htmlFor}>
      <span className="switch-icon-left">
        <Check size={14} />
      </span>
      <span className="switch-icon-right">
        <X size={14} />
      </span>
    </Label>
  );
};

const BusinessLengthDetails = ({ index, control }) => (
  <tr key={index}>
    <td>
      <Controller
        control={control}
        name={`credit_card_history[${index}].month`}
        render={({ field, fieldState }) => (
          <>
            <Input
              {...field}
              type="text"
              value={index + 1}
              invalid={fieldState?.error !== undefined}
              disabled={true}
            />
            {fieldState?.error && (
              <FormFeedback>{fieldState?.error?.message}</FormFeedback>
            )}
          </>
        )}
      />
    </td>
    <td>
      <Controller
        control={control}
        name={`credit_card_history[${index}].number_of_transaction`}
        render={({ field, fieldState }) => (
          <>
            <Input
              {...field}
              type="text"
              invalid={fieldState?.error !== undefined}
            />
            {fieldState?.error && (
              <FormFeedback>{fieldState?.error?.message}</FormFeedback>
            )}
          </>
        )}
      />
    </td>
    <td>
      <Controller
        control={control}
        // name={`credit_card_history[${index}]?.transaction_volume`}
        name={`credit_card_history[${index}].transaction_volume`}
        render={({ field, fieldState }) => (
          <>
            <Input
              {...field}
              type="text"
              invalid={fieldState?.error !== undefined}
            />
            {fieldState?.error && (
              <FormFeedback>{fieldState?.error?.message}</FormFeedback>
            )}
          </>
        )}
      />
    </td>
    <td>
      <Controller
        name={`credit_card_history[${index}].number_of_chargeback`}
        control={control}
        render={({ field, fieldState }) => (
          <>
            <Input
              {...field}
              type="text"
              invalid={fieldState?.error !== undefined}
            />
            {fieldState?.error && (
              <FormFeedback>{fieldState?.error?.message}</FormFeedback>
            )}
          </>
        )}
      />
    </td>
    <td>
      <Controller
        name={`credit_card_history[${index}].chargeback_volume`}
        control={control}
        render={({ field, fieldState }) => (
          <>
            <Input
              {...field}
              type="text"
              invalid={fieldState?.error !== undefined}
            />
            {fieldState?.error && (
              <FormFeedback>{fieldState?.error?.message}</FormFeedback>
            )}
          </>
        )}
      />
    </td>
    <td>
      <Controller
        name={`credit_card_history[${index}].number_of_refunds`}
        control={control}
        render={({ field, fieldState }) => (
          <>
            <Input
              {...field}
              type="text"
              invalid={fieldState?.error !== undefined}
            />
            {fieldState?.error && (
              <FormFeedback>{fieldState?.error?.message}</FormFeedback>
            )}
          </>
        )}
      />
    </td>
    <td>
      <Controller
        name={`credit_card_history[${index}].refund_volume`}
        control={control}
        render={({ field, fieldState }) => (
          <>
            <Input
              {...field}
              type="text"
              invalid={fieldState?.error !== undefined}
            />
            {fieldState?.error && (
              <FormFeedback>{fieldState?.error?.message}</FormFeedback>
            )}
          </>
        )}
      />
    </td>
  </tr>
);

const CardFeilds = ({ control, fields, tittle, watch }) => {
  const fieldValues = watch(fields.map((value) => value.name));
  const sum = fieldValues.reduce(
    (total, value) => total + parseFloat(value || 0),
    0
  );
  return (
    <Card className="border rounded h-100">
      <CardHeader className="border-bottom">
        <CardText tag={"h5"} className="">
          {tittle.toUpperCase()}
        </CardText>
      </CardHeader>
      <CardBody>
        {fields.map((value, index) => (
          <Col sm="12" md="12" lg="12" className="my-1" key={index}>
            <Label>{value.lable}</Label>
            <Controller
              control={control}
              name={value.name}
              render={({ field, fieldState }) => (
                <>
                  <InputGroup className="input-group-merge">
                    <Input
                      {...field}
                      type="number"
                      invalid={fieldState?.error !== undefined}
                    />
                    <InputGroupText>%</InputGroupText>
                  </InputGroup>
                  {fieldState?.error && (
                    <small className="text-danger">
                      {fieldState?.error?.message}
                    </small>
                  )}
                </>
              )}
            />
          </Col>
        ))}
      </CardBody>
      <CardFooter>
        {sum > 100 ? (
          <small className="text-danger fw-bold">
            Total should be equal to 100%
          </small>
        ) : (
          ""
        )}
      </CardFooter>
    </Card>
  );
};

const cardTypeDefault = {
  number_of_transaction: "",
  transaction_volume: "",
  number_of_chargeback: "",
  chargeback_volume: "",
  number_of_refunds: "",
  refund_volume: "",
  months_ago: "",
};

//** Main */
const BusinessProfile = (props) => {
  const { defaultData, creat, update, loader, previous } = props;
  const [defaultValues, setDefaultValues] = useState({ ...defaultData });
  const [isDefaultSet, setIsDefaultSet] = useState(false);
  const [cardTypes, setCardTypes] = useState([]);

  const {
    control,
    setError,
    clearErrors,
    reset,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: defaultValues });

  const formRef = useRef(null);

  const originTransaction = [
    { name: "domestic", lable: "Domestic" },
    { name: "europe", lable: "Europe" },
    { name: "usa", lable: "USA" },
    { name: "asia", lable: "Asia" },
    { name: "rest_of_world", lable: "Rest of world" },
  ];
  const methodAcceptance = [
    { name: "e_commerce", lable: "E-commerce" },
    { name: "card_present", lable: "Card Present (Point-Of-Sale)" },
    { name: "m_pos", lable: "M-Pos (Mobile POS)" },
    { name: "m_commerce", lable: "M-Commerce (Mobile payments)" },
    { name: "moto", lable: "MOTO (Mail-order/Telephone-order)" },
    { name: "in_app_commerce", lable: "In-App commerce" },
  ];
  const deliveryTime = [
    { name: "immediately", lable: "Immediately" },
    { name: "within_four_weeks", lable: "Within 4 weeks" },
    { name: "within_5_14_weeks", lable: "Within 5-14 weeks" },
    { name: "more_than_14_weeks", lable: "More than 14 weeks" },
  ];
  const paymentPlace = [
    { name: "upon_purchase", lable: "Upon purchase" },
    { name: "with_download", lable: "With download" },
    { name: "on_delivery", lable: "On delivery" },
    { name: "others", lable: "Other" },
  ];

  const { fields, append, remove } = useFieldArray({
    control,
    name: "credit_card_history",
  });

  // const

  //**  Input Length Validation
  const onChangeBusinessLength = (month) => {
    const handleField = (action, length) => {
      let rmv = fields.length - 1;
      for (let i = 1; i <= length; i++) {
        rmv -= 1;
        switch (action) {
          case "REMOVE":
            remove(remove);
            break;
          case "ADD":
            append({ ...cardTypeDefault });
            break;
          default:
            return null;
        }
      }
    };
    let lenght = fields.length;
    if (month > 6 && lenght < 6) handleField("ADD", 6 - lenght);
    if (month > lenght && month <= 6) handleField("ADD", month - lenght);
    else if (lenght > month && month > 0) handleField("REMOVE", lenght - month);
    else if (month == 0) handleField("REMOVE", lenght);
  };

  const watchBooleanField = (name) => watch(name);

  const onSubmit = (data) => {
    if (data.uid) update({ ...data });
    else creat(data);
  };

  function cardTypeGet() {
    return new Promise((resolve, reject) => {
      useJwt.cardtype().then((res) => {
        if (res.status === 200) {
          setCardTypes(res.data);
          resolve(200);
        }
      });
    });
  }

  useEffect(() => {
    cardTypeGet();
  }, []);
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
    <Form onSubmit={handleSubmit(onSubmit)} ref={formRef}>
      <Card>
        <CardHeader></CardHeader>
        <CardBody>
          <Row>
            <Col sm="12" md="6" lg="6" className="mb-1">
              <Label htmlFor="">
                Detailed Description of Products/services sold
              </Label>
              <Controller
                control={control}
                name="description_of_products"
                render={({ field, fieldState }) => (
                  <>
                    <Input
                      {...field}
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
              <Label htmlFor="">Length of time in business</Label>
              <Controller
                control={control}
                name="length_of_time_business"
                render={({ field, fieldState }) => (
                  <>
                    <Input
                      {...field}
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
              <Label htmlFor="">Website(s) (Comma-Separated)</Label>
              <Controller
                control={control}
                name="website"
                render={({ field, fieldState }) => (
                  <>
                    <Input
                      {...field}
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
              {/* <Label htmlFor="">Website(s) (Comma-Separated)</Label>
              <Controller
                control={control}
                name=""
                 render={({ field, fieldState }) => (
          <>
            <Input
              {...field}
              type="text"
              invalid={fieldState?.error !== undefined}
            />
            {fieldState?.error && (
              <FormFeedback>{fieldState?.error?.message}</FormFeedback>
            )}
          </>
        )}
              /> */}
              <Label htmlFor="">Beta Site(s)</Label>
              <Controller
                control={control}
                name={"login_details"}
                render={({ field }) => (
                  <div className="form-switch form-check-primary">
                    <Input
                      type="switch"
                      defaultChecked={field.value} // Set the initial value
                      onChange={(e) => field.onChange(e.target.checked)} // Update the value on change
                      id={"login_details"}
                      name="login_details"
                    />
                    <CustomLabel htmlFor={"login_details"} />
                  </div>
                )}
              />
            </Col>
            {watchBooleanField("login_details") && (
              <Col sm="12" md="12" lg="12" className="my-2">
                <SlideDown>
                  <Row className="border rounded">
                    <Col
                      sm="12"
                      md="12"
                      lg="12"
                      className="my-1 border-bottom py-1"
                    >
                      <CardText tag={"h5"}>Provide Website Details</CardText>
                    </Col>
                    <Col sm="12" md="12" lg="12" className="mb-1">
                      <Label htmlFor="">Url</Label>
                      <Controller
                        control={control}
                        name="beta_website"
                        rules={{
                          pattern: {
                            value: /^(ftp|http|https):\/\/[^ "]+$/,
                            message: "Please enter a valid URL",
                          },
                        }}
                        render={({ field, fieldState }) => (
                          <>
                            <Input
                              {...field}
                              type="text"
                              invalid={fieldState?.error !== undefined}
                            />
                            {fieldState?.error && (
                              <FormFeedback>
                                {fieldState?.error?.message}
                              </FormFeedback>
                            )}
                          </>
                        )}
                      />
                    </Col>
                    <Col sm="12" md="6" lg="6" className="mb-1">
                      <Label htmlFor="">User Name</Label>
                      <Controller
                        control={control}
                        name="username"
                        render={({ field, fieldState }) => (
                          <>
                            <Input
                              {...field}
                              type="text"
                              invalid={fieldState?.error !== undefined}
                            />
                            {fieldState?.error && (
                              <FormFeedback>
                                {fieldState?.error?.message}
                              </FormFeedback>
                            )}
                          </>
                        )}
                      />
                    </Col>
                    <Col sm="12" md="6" lg="6" className="mb-1">
                      <Label htmlFor="">Password</Label>
                      <Controller
                        control={control}
                        name="Password"
                        render={({ field, fieldState }) => (
                          <>
                            <Input
                              {...field}
                              type="text"
                              invalid={fieldState?.error !== undefined}
                            />
                            {fieldState?.error && (
                              <FormFeedback>
                                {fieldState?.error?.message}
                              </FormFeedback>
                            )}
                          </>
                        )}
                      />
                    </Col>
                  </Row>
                </SlideDown>
              </Col>
            )}

            <Col sm="12" md="6" lg="6" className="mb-1">
              <Label htmlFor="">Credit Card Descriptor (Max 22 Char.)</Label>
              <Controller
                control={control}
                name="descriptor"
                render={({ field, fieldState }) => (
                  <>
                    <Input
                      {...field}
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
              <Label htmlFor="">DBA/City (Max 12 Char.)</Label>
              <Controller
                control={control}
                name="city_field"
                render={({ field, fieldState }) => (
                  <>
                    <Input
                      {...field}
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
              <Label htmlFor="">Have you filled for bankruptcy before?</Label>
              <Controller
                control={control}
                name="field_for_bankruptcy"
                render={({ field, fieldState }) => (
                  <div className="form-switch form-check-primary">
                    <Input
                      type="switch"
                      defaultChecked={field.value} // Set the initial value
                      onChange={(e) => field.onChange(e.target.checked)} // Update the value on change
                      id={"field_for_bankruptcy"}
                      name="field_for_bankruptcy"
                    />
                    <CustomLabel htmlFor={"field_for_bankruptcy"} />
                  </div>
                )}
              />
            </Col>
            {watch("field_for_bankruptcy") && (
              <Col sm="12" md="6" lg="6" className="mb-1">
                <Label htmlFor="">Date</Label>
                <Controller
                  control={control}
                  name="bankruptcy_date"
                  render={({ field, fieldState }) => (
                    <>
                      <Input
                        {...field}
                        type="text"
                        invalid={fieldState?.error !== undefined}
                      />
                      {fieldState?.error && (
                        <FormFeedback>
                          {fieldState?.error?.message}
                        </FormFeedback>
                      )}
                    </>
                  )}
                />
              </Col>
            )}
            <Col sm="12" md="6" lg="6" className="mb-1">
              <Label htmlFor="">Previous Credit Card Acceptance? </Label>
              <Controller
                control={control}
                name="card_scheme_program"
                render={({ field }) => (
                  <div className="form-switch form-check-primary">
                    <Input
                      type="switch"
                      defaultChecked={field.value} // Set the initial value
                      onChange={(e) => field.onChange(e.target.checked)} // Update the value on change
                      id={"card_scheme_program"}
                      name="card_scheme_program"
                    />
                    <CustomLabel htmlFor={"card_scheme_program"} />
                  </div>
                )}
              />
            </Col>
            {watch("card_scheme_program") && (
              <Col sm="12" md="6" lg="6" className="mb-1">
                <Label htmlFor="">How Many Month</Label>
                <Controller
                  control={control}
                  name="business_length"
                  render={({ field, fieldState }) => (
                    <Input
                      {...field}
                      type="number"
                      onChange={(e) => {
                        if (!e.target.value) onChangeBusinessLength(0);
                        onChangeBusinessLength(parseInt(e.target.value));
                        field.onChange(e.target.value);
                      }}
                    />
                  )}
                />
              </Col>
            )}
            {watch("business_length") > 0 && (
              <Col sm="12" md="12" lg="12" className="mb-1 py-1 border rounded">
                <CardText tag={"h3"} className="text-center py-2">
                  {`Please provide 3 months of most recent processing history
                  below.`.toUpperCase()}
                </CardText>
                <SlideDown>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th style={{ whiteSpace: "nowrap" }}>MONTH</th>
                        <th style={{ whiteSpace: "nowrap" }}>
                          Number of transactions
                        </th>
                        <th style={{ whiteSpace: "nowrap" }}>
                          Transaction volume
                        </th>
                        <th style={{ whiteSpace: "nowrap" }}>
                          Number of chargebacks
                        </th>
                        <th style={{ whiteSpace: "nowrap" }}>
                          Chargeback volume
                        </th>
                        <th style={{ whiteSpace: "nowrap" }}>
                          Number of refunds
                        </th>
                        <th style={{ whiteSpace: "nowrap" }}>Refund volume</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fields &&
                        fields.map((feild, index) => (
                          <BusinessLengthDetails
                            key={index}
                            index={index}
                            control={control}
                          />
                        ))}
                    </tbody>
                  </Table>
                </SlideDown>
              </Col>
            )}
            <Col sm="12" md="6" lg="6" className="mb-1">
              <Label htmlFor="">
                Current/previous Payment Service Provider / gateway
              </Label>
              <Controller
                control={control}
                name="previous_payment_service_provider"
                render={({ field, fieldState }) => (
                  <>
                    <Input
                      {...field}
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
              <Label htmlFor="">Current/previous acquirer</Label>
              <Controller
                control={control}
                name="previous_acquirer"
                render={({ field, fieldState }) => (
                  <>
                    <Input
                      {...field}
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
              <Label htmlFor="">Reason for leaving current acquirer</Label>
              <Controller
                control={control}
                name="leaving_current_acquirer"
                render={({ field, fieldState }) => (
                  <>
                    <Input
                      {...field}
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
              <Label htmlFor="">Estimated monthly sales volume</Label>
              <Controller
                control={control}
                name="monthly_sales_volume"
                render={({ field, fieldState }) => (
                  <>
                    <Input
                      {...field}
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
              <Label htmlFor="">Average transaction value</Label>
              <Controller
                control={control}
                name="avg_transaction_value"
                render={({ field, fieldState }) => (
                  <>
                    <Input
                      {...field}
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
              <Label htmlFor="">Highest transaction value</Label>
              <Controller
                control={control}
                name="highest_transaction_value"
                render={({ field, fieldState }) => (
                  <>
                    <Input
                      {...field}
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
              <Label htmlFor="">Currency</Label>
              <Controller
                control={control}
                name="currency"
                render={({ field, fieldState }) => (
                  <>
                    <Input
                      {...field}
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
              <CardText tag={"h5"}>Payment frequency</CardText>
              <Row>
                <Col sm="6" md="6" lg="6" className="my-1">
                  <Label className="me-1">One-time payment</Label>
                  <Controller
                    control={control}
                    name="one_time_payment"
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="checkbox"
                        defaultChecked
                        id="basic-cb-checked"
                      />
                    )}
                  />
                </Col>
                <Col sm="6" md="6" lg="6" className="my-1">
                  <Label className="me-1">Recurring payment</Label>
                  <Controller
                    control={control}
                    name="recurring_payment"
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="checkbox"
                        defaultChecked
                        id="basic-cb-checked"
                      />
                    )}
                  />
                </Col>
              </Row>
            </Col>
            <Col sm="12" md="12" lg="12" className="my-1">
              <Row>
                <Col sm="12" md="6" lg="4" xl="4">
                  <CardFeilds
                    control={control}
                    fields={originTransaction}
                    tittle={"Origin of transactions"}
                    watch={watch}
                  />
                </Col>
                <Col sm="12" md="6" lg="4" xl="4">
                  <CardFeilds
                    control={control}
                    fields={methodAcceptance}
                    tittle={"Method of acceptance"}
                    watch={watch}
                  />
                </Col>
                <Col sm="12" md="6" lg="4" xl="4">
                  <CardFeilds
                    control={control}
                    fields={deliveryTime}
                    tittle={"Delivery time for goods/services"}
                    watch={watch}
                  />
                </Col>
                <Col sm="12" md="12" lg="12" xl="12" className="my-2">
                  <CardText tag={"h3"}>When does payment take place?</CardText>
                  <Row>
                    {paymentPlace.map((value, index) => (
                      <Col sm="3" md="3" lg="3" xl="3">
                        <Label>{value.lable}</Label>
                        <Controller
                          control={control}
                          name={value.name}
                          render={({ field }) => (
                            <div className="form-switch form-check-primary">
                              <Input
                                type="switch"
                                defaultChecked={field.value} // Set the initial value
                                onChange={(e) =>
                                  field.onChange(e.target.checked)
                                } // Update the value on change
                                id={value.name}
                                name={value.name}
                              />
                              <CustomLabel htmlFor={value.name} />
                            </div>
                          )}
                        />
                      </Col>
                    ))}
                  </Row>
                </Col>
                <Col sm="12" md="12" lg="12" xl="12" className="my-2">
                  {/* <CardFeilds control={control} fields={originTransaction} /> */}
                  <Row>
                    <Col sm="12" lg="12" md="12">
                      <CardText tag={"h3"}>Card types applying for:</CardText>
                    </Col>

                    {cardTypes.map((item) => (
                      <Col sm="3" key={item.id} className="my-1">
                        <Controller
                          name={`${Object.keys(item)[1]}`}
                          control={control}
                          render={({ field }) => (
                            <Input type="checkbox" id={item.id} {...field} />
                          )}
                        />
                        <Label htmlFor={item.id} className="ms-1">
                          {item.card_type}
                        </Label>
                      </Col>
                    ))}
                  </Row>
                </Col>
              </Row>
            </Col>

            <Col sm="12" md="6" lg="6" className="mb-1">
              <Label>Do you offer / make use of affiliate programs?</Label>
              <Controller
                control={control}
                name={"do_you_offer"}
                render={({ field }) => (
                  <div className="form-switch form-check-primary">
                    <Input
                      type="switch"
                      defaultChecked={field.value} // Set the initial value
                      onChange={(e) => field.onChange(e.target.checked)} // Update the value on change
                      id={"do_you_offer"}
                      name="do_you_offer"
                    />
                    <CustomLabel htmlFor={"do_you_offer"} />
                  </div>
                )}
              />
            </Col>
            {watchBooleanField("do_you_offer") && (
              <Col sm="12" md="6" lg="6" className="mb-1">
                <Label>Please provide details</Label>
                <Controller
                  control={control}
                  name="provide_details"
                  render={({ field, fieldState }) => (
                    <>
                      <Input
                        {...field}
                        type="text"
                        invalid={fieldState?.error !== undefined}
                      />
                      {fieldState?.error && (
                        <FormFeedback>
                          {fieldState?.error?.message}
                        </FormFeedback>
                      )}
                    </>
                  )}
                />
              </Col>
            )}
          </Row>
        </CardBody>
        <CardFooter className="my-1 d-flex justify-content-between">
          <Button.Ripple onClick={() => previous()} color="secondary" outline>
            Previous
          </Button.Ripple>
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
        </CardFooter>
      </Card>
    </Form>
  );
};

export default BusinessProfile;
