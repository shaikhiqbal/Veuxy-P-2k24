import React from "react";

import { Plus, Trash } from "react-feather";

import country_code from "../../../../country_code.json";

import { Controller } from "react-hook-form";
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
} from "reactstrap";

const ContactForm = (props) => {
  const { name, control, index } = props;
  // const { control, handleSubmit } = useForm({
  //   defaultValues: {
  //     data: [{ ...defaultValues }],
  //   },
  // });
  // console.log(errors&&errors?.director[index])
  const country = country_code.map((e, i) => {
    return <option key={i}>{e.name}</option>;
  });

  return (
    <Row>

      <Col sm="12" md="6" lg="6" className="mb-1">
        <Label htmlFor="first_name">First Name</Label>
        <Controller
          name={`${name}[${index}].first_name`}
          control={control}
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
        <Label htmlFor="">Email</Label>
        <Controller
          control={control}
          name={`${name}[${index}].email_address`}
          render={({ field, fieldState }) => (
            <>
              <Input
                {...field}
                type="email"
                pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                required
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
        <Label htmlFor="house_number">Telephone Number</Label>
        <Controller
          control={control}
          name={`${name}[${index}].telephone_number`}
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
        <Label htmlFor="street_address">Fax Number</Label>
        <Controller
          control={control}
          name={`${name}[${index}].fax_number`}
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
    </Row>
  );
};

export default ContactForm;
