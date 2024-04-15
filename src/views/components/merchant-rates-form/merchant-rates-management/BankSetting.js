import React, { useEffect, useState } from "react";
import { Row, Form, Col, Label, Input, Button, FormFeedback } from "reactstrap";

import { Controller, useForm } from "react-hook-form";

import { ArrowRight } from "react-feather";

// ** useJWT
import Select from "react-select";
import { selectThemeColors } from "@utils";

const bankSettingData = (data) => {
  const lable = (data) => data.map((value) => ({ lable: value, value: value }));
  let copyData = { ...data };
  const { fields } = copyData.acquiring_bank_field;
  copyData.currency = lable(copyData.currency);
  copyData.payment_services = lable(copyData.payment_services);

  delete copyData.acquiring_bank_field;
  return (copyData = { ...copyData, ...fields });
};

const defaultsValue = {
  acquiring_bank: "",
  currency: "",
  maximum_ticket_size: "",
  merchant_category_code: "",
  merchant_type: "",
  minimum_ticket_size: "",
  payment_services: "",
  settlement: "",
  currency: "",
};

const BankSetting = ({
  dynamicOptions,
  setMechentSerivesFields,
  stepper,
  storeData,
  data,
}) => {
  const [acuiringFields, setAcuiringFields] = useState({});
  const [defaultData, setDefaultData] = useState({ ...defaultsValue });

  // ** React hook form
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm({ defaultValues: defaultData });
  // ** Option Rendering
  const optionLists = (listName) => {
    const optionValue = { ...dynamicOptions };
    if (!optionValue) return;
    if (listName == "acquiringBank" && optionValue[listName]) {
      return optionValue[listName].map((option, key) => (
        <option key={key} value={option?.name}>
          {option?.name}
        </option>
      ));
    } else if (listName == "merchantCategory" && optionValue[listName]) {
      return optionValue[listName].map((option, key) => (
        <option key={key} value={`${option.code}`}>
          {/* {console.log(option.code)} */}
          {option.code} {option.name}
        </option>
      ));
    } else if (listName == "merchantType" && optionValue[listName]) {
      return optionValue[listName].map((option, key) => (
        <option key={key} value={option.name}>
          {option.name}
        </option>
      ));
    } else if (listName == "settlement" && optionValue[listName]) {
      return optionValue[listName].map((option, key) => (
        <option key={key} value={option.settlement_type}>
          {option.settlement_type}
        </option>
      ));
    } else if (listName == "creditCard" && optionValue[listName]) {
      return optionValue[listName].map((option, key) => (
        <option key={key} value={option.credit_card_type}>
          {option.credit_card_type}
        </option>
      ));
    } else if (listName == "paymentServices" && optionValue[listName]) {
      if (Array.isArray(optionValue[listName])) {
        const option = [];
        optionValue[listName].forEach((element) =>
          option.push({ value: element.name, label: element.name })
        );
        return option;
      } else return [];
    } else if (listName == "currency" && optionValue[listName]) {
      if (Array.isArray(optionValue[listName])) {
        const option = [];
        optionValue[listName].forEach((element) =>
          option.push({
            value: element.currency_type,
            label: element.currency_type,
          })
        );
        return option;
      } else return [];
    }
  };
  // ** acquiring bank feildb
  const setAcuiringAllField = (name, listKey) => {
    if (name || listKey) return;
    const option = [...dynamicOptions[listKey]].find(
      (element) => element.name === name
    );
    try {
      const { fields } = option;
      const fieldsParse = JSON.parse(fields);
      if (listKey === "acquiringBank") setAcuiringFields({ ...fieldsParse });
      else
        setMechentSerivesFields((prevState) => ({
          ...prevState,
          acuiringFields: { ...fieldsParse },
        }));
    } catch (error) {
      console.log("Invalid Json " + error.message);
    }
  };
  // ** Payment And services Fields
  const handleProcessingService = (value = []) => {
    if (!value.length) return;
    const element = document.getElementById("payment_services");
    if (element.classList.contains("inputError")) {
      element.classList.remove("inputError");
    }
    const field = [];
    const option = [...dynamicOptions.paymentServices];
    var cardTypeField = [];
    for (let i = 0; i < value.length; i++) {
      for (let j = 0; j < option.length; j++) {
        if (option[j]?.name == value[i]?.value) {
          if (value[i]?.value == "Card Type") {
            cardTypeField = [...dynamicOptions.creditCard];
            break;
          } else {
            let data = {
              name: option[j]?.name,
              fields: JSON.parse(option[j]?.fields),
            };
            field.push(data);
            break;
          }
        } else continue;
      }
    }
    setMechentSerivesFields((prevState) => ({
      ...prevState,
      paymentServicesField: [...field],
      cardType: [...cardTypeField],
    }));
  };

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

  // ** Validtion Data
  const isValidate = (data) => {
    let flag = true;

    // default value
    for (const key in defaultData) {
      if (!data[key]?.length || !data[key]) {
        if (key == "currency" || key == "payment_services") {
          // document.getElementById(key).classList.add("inputError");
          continue;
        } else
          setError(key, {
            type: "manual",
            message: "This above field is required",
          });
        flag = false;
      }
    }

    // acuring bank validation
    for (const key in acuiringFields) {
      if (!data[key]?.length || !data[key]) {
        setError(key, {
          type: "manual",
          message: "This above field is required",
        });
        flag = false;
      }
    }

    function handleMultiSelectError(key, task) {
      const element = document.getElementById(key);
      if (
        element &&
        element.classList.contains("inputError") &&
        task == "remove"
      ) {
        element.classList.remove("inputError");
      } else if (element && task == "add") {
        element.classList.add("inputError");
      }
    }
    if (!data["currency"]?.length && !data["payment_services"]?.length) {
      handleMultiSelectError("currency", "add");
      handleMultiSelectError("payment_services", "add");
      flag = false;
    } else if (!data["currency"]?.length) {
      flag = false;
      handleMultiSelectError("currency", "add");
    } else if (!data["payment_services"]?.length) {
      flag = false;
      handleMultiSelectError("payment_services", "add");
    } else {
      handleMultiSelectError("currency", "remove");
      handleMultiSelectError("payment_services", "remove");
    }
    return flag;
  };

  //** Submit form
  const onSubmit = (data) => {
    // scrollTop((x) => !x);
    let isValide = isValidate(data);
    if (isValide) {
      const acuiringValue = { ...acuiringFields };
      for (const key in acuiringValue) {
        acuiringValue[key] = data[key];
      }
      for (const key in defaultData) {
        if (key == "payment_services" || key == "currency") {
          const value = data[key].reduce((array, element) => {
            array.push(element.value);
            return array;
          }, []);
          defaultData[key] = JSON.stringify([...value]);
        } else defaultData[key] = data[key];
      }
      storeData({
        ...defaultData,
        acquiring_bank_field: JSON.stringify({
          name: data.acquiring_bank,
          fields: { ...acuiringValue },
        }),
      });
      stepper.next();
    } else console.log("empty fields");
  };

  useEffect(() => {
    if (!Object.keys(data)) return;
    setAcuiringAllField(data?.acquiring_bank, "acquiringBank");
    handleProcessingService(data?.payment_services);
    reset(data);
  }, [data]);
  
  return (
    <Row>
      <Form onSubmit={handleSubmit(onSubmit)}>
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

        <Col sm="12" className="mb-1">
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
        </Col>
      </Form>
    </Row>
  );
};

export default BankSetting;































