import React, { useEffect, useState, useMemo } from "react";

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
  Button
} from "reactstrap";
import { Controller, useForm, useFieldArray } from "react-hook-form";


import { SlideDown } from "react-slidedown";
import "react-slidedown/lib/slidedown.css";

const BusinessLengthDetails = ({ index, control }) => (
  <tr key={index}>
    <td style={{ whiteSpace: "nowrap" }}></td>
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

const cardTypeDefault = {
  number_of_transaction: "",
  transaction_volume: "",
  number_of_chargeback: "",
  chargeback_volume: "",
  number_of_refunds: "",
  refund_volume: "",
  months_ago: ""
};
const BusinessProfile = ({control}) => {
  const [businessLength, setBusinessLength] = useState(null);
//   const {
//     control,
//     setError,
//     clearErrors,
//     reset,
//     setValue,
//     handleSubmit,
//     formState: { errors }
//   } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "credit_card_history"
  });

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
  const onSubmit = (data) => {
    console.log(data);
  };
  return (<>
 {/* <Form onSubmit={handleSubmit(onSubmit)}> */}
      <Card>
        <CardHeader></CardHeader>
        <CardBody>
          <Row>
            <Col sm="12" md="6" lg="6" className="mb-1">
              <Label htmlFor="">Business Name</Label>
              <Controller
                control={control}
                name="business_name"
                render={({ feild }) => <Input {...feild} />}
              />
            </Col>
            <Col sm="12" md="6" lg="6" className="mb-1">
              <Label htmlFor="">Business Type</Label>
              <Controller
                control={control}
                name="business_type"
                render={({ feild }) => <Input {...feild} />}
              />
            </Col>
            <Col sm="12" md="6" lg="6" className="mb-1">
              <Label htmlFor="">How Long Business</Label>
              <Controller
                control={control}
                name="business_length"
                render={({ field, fieldState }) => (
                  <Input
                    {...field}
                    // value={businessLength}
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
            {fields &&
              fields.map((feild, index) => (
                <SlideDown><BusinessLengthDetails index={index} control={control} /></SlideDown>
              ))}

            <Col sm="12" md="12" lg="12" className="my-1">
              <Button color="primary" type="submit">
                onSubmit
              </Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
    {/* </Form> */}
    </>
  );
};

export default BusinessProfile;
