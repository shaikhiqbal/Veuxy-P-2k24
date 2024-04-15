import { element } from "prop-types";
import React, { useEffect, useState } from "react";
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
} from "reactstrap";
import CompanyOwnershipProfile from "../../../pages/user-information/ CompanyOwnershipProfileDirector";
// ** style
import "./styles/styles.css";
// import { active } from "sortablejs";

const defaultValue = {
  block_type: "3",
  virtual_terminal: false,
  reject_percent: "10",
  declined_percent: "10",
  refund_percent: "10",
  chargeback_percent: "2",
};

/*
{
      card_type: ["Visa", "Master Card", "Amex", "Dicover"],
      chargeback_percent: "2",
      declined_percent: "10",
      invoicing_merchant_discount_rate: "34",
      invoicing_transaction_fees: "54",
      refund_percent: "10",
      reject_percent: "10",
      sepa_merchant_discount_rate: "13",
      sepa_transaction_fees: "32",
      virtual_terminal: "active",
}
*/

const MerchantServices = ({
  dynamiceFields,
  stepper,
  scrollTop,
  storeData,
  data = {},
}) => {
  // ** Destructor Required data
  const {
    acuiringFields,
    paymentServicesField,
    cardType,
    maximum_ticket_size,
    minimum_ticket_size,
  } = dynamiceFields;

  // ** States
  const [defaultData, setDefaultData] = useState({ ...defaultValue });
  // const [defaultData, setDefaultData] = useState(
  //   Object.keys(data)?.length ? { ...data } : { ...defaultValue }
  // );
  const [cardTypeValues, setCardTypeValues] = useState([]);
  // const [cardTypeValues, setCardTypeValues] = useState(
  //   data?.card_type ? [...data.card_type] : []
  // );
  const [isCardDetailsFilled, setIsCardDetailsFilled] = useState(null);

  const [virtualeTerminal, setVirtualeTerminal] = useState(false);

  // ** hook-form function

  const {
    control,
    reset,
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm({ defaultValues: defaultData });

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

  // ** Validate the Data
  const isDataFill = (data) => {
    setIsCardDetailsFilled(null);
    let flag = true;
    // ** static value check
    for (const key in defaultValue) {
      if (!data[key] && key !== "virtual_terminal") {
        setError(key, { type: "custom", message: "Above field is required*" });
        flag = false;
      }
    }
    // ** dynamic value Check
    paymentServicesField.forEach((element) => {
      for (const key in element.fields) {
        if (!data[key]?.length) {
          flag = false;
          setError(key, {
            type: "custom",
            message: "This above field is required*",
          });
        }
      }
    });
    if (cardType.length && data.card_type?.length) {
      data.card_type.forEach((element, index) => {
        const indexOfValue = cardType.findIndex(
          (value) => value.credit_card_type == element
        );
        if (indexOfValue > -1) {
          if (!data?.cardTypeDetails[indexOfValue].discount_rate) {
            flag = false;
            setError(`cardTypeDetails[${indexOfValue}].discount_rate`, {
              type: "validate",
              message: "This above field is required*",
            });
          }
          if (!data?.cardTypeDetails[indexOfValue].transaction_fees) {
            flag = false;
            setError(`cardTypeDetails[${indexOfValue}].transaction_fees`, {
              type: "validate",
              message: "This above field is required*",
            });
          }
        }
      });
    } else if (cardType.length && !data.cardType?.length) {
      setIsCardDetailsFilled("Pleas select Active card");
      flag = false;
    }
    return flag;
  };

  const changAsRequiredCardType = (data) => {
    const setup = data?.card_type.reduce((acumaletar, element) => {
      const update = {};
      const idx = cardType.findIndex(
        (value) => value?.credit_card_type == element
      );
      if (idx > -1) {
        update["active_card"] = element;
        update["fields"] = data?.cardTypeDetails[idx];
      }
      acumaletar.push(update);
      return acumaletar;
    }, []);
    return setup;
  };

  // ** post data
  const onSubmit = (data) => {
    const terminal={active:true,}
    // console.log(data)
    // ** validate data
    const isValid = isDataFill(data);
    if (isValid) {
      if(typeof data.virtual_terminal==='string')data.virtual_terminal=false
      const paymentServicesFieldValues = paymentServicesField.map((obj) => {
        let updataData = {};
        for (const key in obj.fields) {
          updataData[key] = data[key];
        }
        return { ...obj, fields: updataData };
      });
      const cardTypeDetails = cardType?.length
        ? changAsRequiredCardType(data)
        : [];
      for (const key in defaultData) {
        defaultData[key] = data[key];
      }

      if (cardType?.length) {
        paymentServicesFieldValues.push({
          name: "Card Type",
          fields: JSON.stringify([...cardTypeDetails]),
        });
      }
      storeData({
        ...defaultData,
        payment_services_field: JSON.stringify([...paymentServicesFieldValues]),
      });
      stepper.next();
    } else console.log("empty field****");
  };

  const cardTypeDetailsConvertIntoForm = (get, list) => {
    const { card_details } = { ...get };
    const output = [];
    for (let i = 0; i < list.length; i++) {
      let flag = false;
      for (let j = 0; j < card_details?.length; j++) {
        if (list[i].credit_card_type == card_details[j].active_card) {
          flag = true;
          output.push(card_details[j].fields);
          break;
        }
      }
      if (!flag) output.push({ discount_rate: "", transaction_fees: "" });
    }
    get["cardTypeDetails"] = [...output];
    delete get["card_details"];
  };

  useEffect(() => {
    if (!Object.keys(data).length) return;
    if (data?.card_type && cardType.length) {
      setCardTypeValues([...data?.card_type]);
      cardTypeDetailsConvertIntoForm(data, cardType);
      data.virtual_terminal
        ? (data.virtual_terminal = "active")
        : (data.virtual_terminal = "inactive");
      data.block_type ? (data.block_type = data.block_type.toString()) : null;
      reset(data);
    } else reset(data);
  }, [reset, data, cardType]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        {paymentServicesField && (
          <Col sm="12" className="mb-1">
            <Row>
              {/* {console.log(paymentServicesField)} */}
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
                        <small className="text-danger">
                          {errors[nameKeys[0]]?.message}
                        </small>
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
                        <small className="text-danger">
                          {errors[nameKeys[1]]?.message}
                        </small>
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
            <span className="text-danger">{isCardDetailsFilled}</span>
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
                        name={`cardTypeDetails[${key}].discount_rate`}
                        render={({ field }) => (
                          <InputGroup className="input-group-merge">
                            <Input
                              id={`cardTypeDetails[${key}].discount_rate`}
                              type="number"
                              disabled={!active}
                              {...field}
                              invalid={
                                errors?.cardTypeDetails?.[key]?.discount_rate &&
                                true
                              }
                            />
                            <InputGroupText>%</InputGroupText>
                          </InputGroup>
                        )}
                      />
                      {errors?.cardTypeDetails?.[key]?.discount_rate
                        ?.message && (
                        <small className="text-danger">
                          {
                            errors?.cardTypeDetails?.[key]?.discount_rate
                              ?.message
                          }
                        </small>
                      )}
                    </td>
                    <td>
                      <Controller
                        control={control}
                        name={`cardTypeDetails[${key}].transaction_fees`}
                        render={({ field }) => (
                          <InputGroup className="input-group-merge">
                            <Input
                              id={`cardTypeDetails[${key}].transaction_fees`}
                              type="number"
                              disabled={!active}
                              invalid={
                                errors?.cardTypeDetails?.[key]
                                  ?.transaction_fees && true
                              }
                              {...field}
                            />
                            <InputGroupText>USD</InputGroupText>
                          </InputGroup>
                        )}
                      />
                      {errors?.cardTypeDetails?.[key]?.transaction_fees
                        ?.message && (
                        <small className="text-danger">
                          {
                            errors?.cardTypeDetails?.[key]?.transaction_fees
                              ?.message
                          }
                        </small>
                      )}
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
            <small className="text-danger">
              {errors.reject_percent.message}
            </small>
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
            <small className="text-danger">
              {errors.declined_percent.message}
            </small>
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
            <small className="text-danger">
              {errors.refund_percent.message}
            </small>
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
            <small className="text-danger">
              {errors.chargeback_percent.message}
            </small>
          ) : null}
        </Col>
        <Col sm={6} className="my-2">
          <h5>Block Type</h5>
          <Row>
            <Col
              sm={3}
              className="d-flex justify-content-center align-items-center"
            >
              <input {...register("block_type")} type="radio" value={"1"} />
              <Label>Count</Label>
            </Col>
            <Col
              sm={3}
              className="d-flex justify-content-center align-items-center"
            >
              <input {...register("block_type")} type="radio" value={"2"} />
              <Label>Value</Label>
            </Col>
            <Col
              sm={3}
              className="d-flex justify-content-center align-items-center"
            >
              <input {...register("block_type")} type="radio" value={"3"} />
              <Label>Both</Label>
            </Col>
          </Row>
        </Col>
        <Col sm={6} className="my-2">
          <h5 >Virtual Terminal</h5>
          <Row>
            <Col sm={3} className="d-flex flex-row align-items-center">
              {/* <input
                {...register("virtual_terminal")}
                type="radio"
                value={"active"}
              />
              <Label>Active</Label>
            </Col>
            <Col sm={3} className="d-flex flex-row align-items-center">
              <input
                {...register("virtual_terminal")}
                type="radio"
                value={"inactive"}
              />
              <Label style={{ whiteSpace: "nowrap" }}>Non Acitve</Label> */}
              <Controller
                id="virtual_terminal"
                name="virtual_terminal"
                control={control}
                render={({ field: { value, onChange } }) => {
                  if (value == true) {
                    setVirtualeTerminal(true);
                  } else {
                    setVirtualeTerminal(false);
                  }
                  return (
                    <div className="form-switch form-check-primary ms-1">
                      <Input
                        type="switch"
                        name="icon-primary"
                        onChange={onChange}
                        checked={value}
                        // disabled={isAccepted}
                      />
                      <small className="me-1">
                        {virtualeTerminal ? <span>Active</span> : <span style={{ whiteSpace: 'nowrap'}}>In Active</span>}
                      </small>
                    </div>
                  );
                }}
              />
            </Col>
            {errors?.virtual_terminal && (
              <small className="text-danger">This field is required</small>
            )}
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
