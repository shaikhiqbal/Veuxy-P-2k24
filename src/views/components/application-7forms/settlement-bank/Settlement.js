import React, { useEffect, useState } from "react";

import { Plus, Trash } from "react-feather";

import { useForm, useFieldArray, Controller } from "react-hook-form";

import { SlideDown } from "react-slidedown";
import "react-slidedown/lib/slidedown.css";

import SetttlementForm from "./SetttlementForm";



import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardText,
  Button,
  Input,
  Label,
  Form,
  Row,
  Col,
  Spinner,
} from "reactstrap";

const appendData = {
  settlement_currency: "",
  processing_currency: "",
  bank_account_holder: "",
  bank_name: "",
  bank_account_number: "",
  bank_address: "",
  bic_code: "",
  zip_code: "",
  iban_number: "",
  city: "",
  bank_sort_code: "",
  country: "",
  routing_number: "",
  bank_telephone_number: "",
};

const Settlement = (props) => {
  // ** Props
  const { loader, defaultData, sendData,previous } = props;

  // ** State
  const [defaultValues, setDefaultValues] = useState({ ...defaultData });
  const [isDefaultSet, setIsDefaultSet] = useState(false);

  const { control, handleSubmit, setError, reset } = useForm({
    defaultValues: { ...defaultValues },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "data",
  });

  const handleError = (data) => {
    data?.data.forEach((element, index) => {
      Object.keys(element).forEach((key) => {
        if (!element[key] || !element[key].length) {
          setError(`ubo[${index}].${key}`, {
            type: "manual",
            message: "Empty Field",
          });
        }
      });
    });
  };

  const onSubmit = (data) => {
    sendData(data);
    // handleError(data)
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
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => (
          <SlideDown key={field.id}>
            <SetttlementForm
              control={control}
              field={field}
              index={index}
              name={"data"}
              remove={remove}
              title={"Settlement Bank Detail"}
            />
          </SlideDown>
        ))}
        <Row>
          <Col sm="12" className="my-1 d-flex justify-content-center">
            <Button.Ripple
              className="btn-icon rounded-circle"
              color="warning"
              onClick={() => append({ ...appendData })}
            >
              <Plus size="16" />
            </Button.Ripple>
          </Col>
          <Col
            sm="12"
            md="12"
            lg="12"
            xl="12"
            className="my-1 d-flex justify-content-between"
          >
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
          </Col>
        </Row>
      </Form>
      {/* <Sbd/> */}
    </>
  );
};

export default Settlement;
