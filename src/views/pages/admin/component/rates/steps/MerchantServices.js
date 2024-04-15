import { element } from "prop-types";
import React, { useState } from "react";
import { ArrowLeft, ArrowRight } from "react-feather";
import { Controller, useForm } from "react-hook-form";
import {
  Col,
  Form,
  Input,
  Label,
  Row,
  Button,
  InputGroup,
  InputGroupText,
  Badge,
  FormFeedback,
} from "reactstrap";
// ** style
import "../style/style.css";

const defaultValue = {
  block_type: "both",
  virtual_termonal: "not-active",
  reject_percent: "10",
  declined_percent: "10",
  refund_percent: "10",
  chargeback_percent: "2",
  paymentServicedFields: {},
};

const MerchantServices = ({ dynamiceFields, stepper, scrollTop }) => {
  // ** States
  const [defaultData, setDefaultData] = useState({ ...defaultValue });
  const [cardTypeValues, setCardTypeValues] = useState([]);

  // ** Destructor Required data
  const {
    acuiringFields,
    paymentServicesField,
    cardType,
    maximum_ticket_size,
    minimum_ticket_size,
  } = dynamiceFields;

  // ** hook-form function
  const {
    control,
    reset,
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm({ defaultValues: { ...defaultValue } });

  // ** Convert Key to Label
  const convertKeyToLabel = (str) => {
    let key = str;
    let label = key
      .split("_")
      .map(
        (substring) => substring.charAt(0).toUpperCase() + substring.slice(1)
      )
      .join(" ");
    return label;
  };

  // ** Handle Card Type Value
  const handlCardType = (value) => {
    const values = [...cardTypeValues];
    if (values.includes(value)) {
      const index = values.findIndex((element) => element == value);
      values.splice(index, 1);
    } else {
      values.push(value);
    }
    setCardTypeValues([...values]);
  };

  // ** post data
  const onSubmit = (data) => {
    stepper.next();
    scrollTop((x) => !x);
    let  isValide=true;
    for (const key in defaultData) {
      if (data[key]?.length == 0) {
        setError(key, {
          type: "custom",
          message: "This above field is required",
        });
      }
    }
    for (let i = 0; i < paymentServicesField.length; i++) {
      const keys = Object.keys(paymentServicesField[i].fields);
      if (keys) {
        for (let j = 0; j < keys.length; j++) {
          if (!data[keys[j]] || data[keys[j]]?.length == 0) {
            setError(keys[j], {
              type: "custom",
              message: "This above field is required",
            });
          }
        }
      }
    }
    if (
      (cardType.length && !data?.card_type) ||
      (cardType.length && !data?.card_type?.length)
    ) {
      alert("Pleas Select activated cards");
      const element = document.getElementById("cardType");
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    if (cardType.length && data?.card_type) {
      const array = [...data?.card_type];
      for (let i = 0; i < array.length; i++) {
        // {{debugger}}
        //cardTypeDetials
        const index = cardType.findIndex(
          (element) => element.credit_card_type == array[i]
        );
        if (index >= 0) {
          // console.log(index)
          const reqiredValue = data.cardTypeDetials[index];
          // console.log(reqiredValue)
        }
      }
    }
    // console.log(data);
    // stepper.next();
  };
  // console.log({ merchantServices: acuiringFields });
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        {/* {acuiringFields &&
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
          })} */}
        <Col sm="12" className="mb-1">
          <Label className="form-label" htmlFor="gn">
            Generated Name
          </Label>
          <Controller
            control={control}
            name="generated_name"
            render={({ field }) => {
              return (
                <Input
                  id="generated_name"
                  type="text"
                  invalid={errors.generated_name && true}
                  {...field}
                />
              );
            }}
          />
          {errors.generated_name ? (
            <FormFeedback>{errors.generated_name.message}</FormFeedback>
          ) : null}
        </Col>
        {paymentServicesField && (
          <Col sm="12" className="mb-1">
            <Row>
              {paymentServicesField.map((data, idx) => {
                const nameKeys = Object.keys(data.fields);
                return (
                  <>
                    <Col key={idx} sm={6} className="mb-1">
                      <Label>{convertKeyToLabel(nameKeys[0])}</Label>
                      <Controller
                        control={control}
                        name={nameKeys[0]}
                        render={({ field }) => (
                          <InputGroup className="input-group-merge">
                            <Input
                              id={`${nameKeys[0]}_${idx}`}
                              type="number"
                              invalid={errors[nameKeys[0]] && true}
                              {...field}
                            />
                            <InputGroupText>%</InputGroupText>
                          </InputGroup>
                        )}
                      />
                      {errors[nameKeys[0]] ? (
                        <FormFeedback>
                          {errors[nameKeys[0]]?.message}
                        </FormFeedback>
                      ) : null}
                    </Col>
                    <Col key={idx} sm={6}>
                      <Label>{convertKeyToLabel(nameKeys[1])}</Label>
                      <Controller
                        control={control}
                        name={nameKeys[1]}
                        render={({ field }) => (
                          <InputGroup className="input-group-merge">
                            <Input
                              id={`${nameKeys[0]}_${idx}`}
                              type="number"
                              invalid={errors[nameKeys[1]] && true}
                              {...field}
                            />
                            <InputGroupText>USD</InputGroupText>
                          </InputGroup>
                        )}
                      />
                      {errors[nameKeys[1]] ? (
                        <FormFeedback>
                          {errors[nameKeys[1]]?.message}
                        </FormFeedback>
                      ) : null}
                    </Col>
                  </>
                );
              })}
            </Row>
          </Col>
        )}
        {cardType.length ? (
          <Col sm="12" className="mb-1" id="cardType">
            <table class="wp-table">
              <tr>
                <th>Card Name</th>
                <th>Select Active Card</th>
                <th> Merchant Discount Rate</th>
                <th> Transaction Fees</th>
              </tr>
              {cardType.map((card, key) => {
                const active = cardTypeValues.includes(card.credit_card_type);
                return (
                  <tr key={key}>
                    <td>
                      <Label>{card.credit_card_type}</Label>
                    </td>
                    <td className="d-flex gx-1">
                      <input
                        style={{ cursor: "pointer" }}
                        {...register("card_type")}
                        onChange={(e) => handlCardType(e.target.value)}
                        type="checkbox"
                        value={card.credit_card_type}
                      />
                      {active ? (
                        <Badge pill color="light-success">
                          Acitve
                        </Badge>
                      ) : (
                        <Badge pill color="light-warning">
                          InAcitve
                        </Badge>
                      )}
                    </td>
                    <td>
                      <Controller
                        control={control}
                        name={`cardTypeDetials[${key}].discount_rate`}
                        render={({ field }) => (
                          <InputGroup className="input-group-merge">
                            <Input
                              id={`cardTypeDetials[${key}].discount_rate`}
                              type="number"
                              disabled={!active}
                              {...field}
                            />
                            <InputGroupText>%</InputGroupText>
                          </InputGroup>
                        )}
                      />
                      {/* {errors?.cardTypeDetials[key]?.discount_rate ? (
                        <FormFeedback>
                          {errors?.cardTypeDetials[key]?.discount_rate?.message}
                        </FormFeedback>
                      ) : null} */}
                    </td>
                    <td>
                      <Controller
                        control={control}
                        name={`cardTypeDetials[${key}].transaction_fees`}
                        render={({ field }) => (
                          <InputGroup className="input-group-merge">
                            <Input
                              id={`cardTypeDetials[${key}]?.transaction_fees`}
                              type="number"
                              disabled={!active}
                              {...field}
                            />
                            <InputGroupText>USD</InputGroupText>
                          </InputGroup>
                        )}
                      />
                    </td>
                  </tr>
                );
              })}
            </table>
          </Col>
        ) : null}

        <Col sm={12} md={6} className="mb-1">
          <Label>Reject Percent</Label>
          <Controller
            control={control}
            name="reject_percent"
            render={({ field }) => {
              return (
                // <Input
                //   id="reject_percent"
                //   type="text"
                //   invalid={errors.reject_percent && true}
                //   {...field}
                // />
                <InputGroup className="input-group-merge">
                  <Input
                    id="reject_percent"
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
          <Label>Cancelled/Declined Percent</Label>
          <Controller
            control={control}
            name="declined_percent"
            render={({ field }) => {
              return (
                <InputGroup className="input-group-merge">
                  <Input
                    id="declined_percent"
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
          <Label>Refund Percent</Label>
          <Controller
            control={control}
            name="refund_percent"
            render={({ field }) => {
              return (
                <InputGroup className="input-group-merge">
                  <Input
                    id="refund_percent"
                    type="text"
                    invalid={errors.refund_percent && true}
                    {...field}
                  />
                  <InputGroupText>%</InputGroupText>
                </InputGroup>
              );
            }}
          />
          {errors.refund_percent ? (
            <FormFeedback>{errors.refund_percent.message}</FormFeedback>
          ) : null}
        </Col>
        <Col sm={12} md={6} className="mb-1">
          <Label>Chargeback Percent</Label>
          <Controller
            control={control}
            name="chargeback_percent"
            render={({ field }) => {
              return (
                <InputGroup className="input-group-merge">
                  <Input
                    id="chargeback_percent"
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
        <Col sm={6} className="my-2">
          <h5>Block Type</h5>
          <Row>
            <Col sm={3}>
              <input {...register("block_type")} type="radio" value="count" />
              <Label>Count</Label>
            </Col>
            <Col sm={3}>
              <input {...register("block_type")} type="radio" value="value" />
              <Label>Value</Label>
            </Col>
            <Col sm={3}>
              <input {...register("block_type")} type="radio" value="both" />
              <Label>Both</Label>
            </Col>
          </Row>
        </Col>

        <Col sm={6} className="my-2">
          <h5>Virtual Terminal</h5>
          <Row>
            <Col sm={3}>
              <input
                {...register("virtual_termonal")}
                type="radio"
                value="acitive"
              />
              <Label>Active</Label>
            </Col>
            <Col sm={3}>
              <input
                {...register("virtual_termonal")}
                type="radio"
                value="not-active"
              />
              <Label>Non Acitve</Label>
            </Col>
            {errors?.virtual_terminal && <span>This field is required</span>}
          </Row>
        </Col>
      </Row>

      <div className="d-flex justify-content-between">
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
        <Button color="primary" className="btn-next" type="submit">
          <span className="align-middle d-sm-inline-block d-none">Next</span>
          <ArrowRight
            size={14}
            className="align-middle ms-sm-25 ms-0"
          ></ArrowRight>
        </Button>
      </div>
    </Form>
  );
};

export default MerchantServices;
