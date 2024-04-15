import React from "react";

import {
    Button,
  Col,
  Form,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";

import { Controller, useForm } from "react-hook-form";

const AddCustomerForm = (props) => {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Modal isOpen={props.open}>
      <ModalHeader toggle={props.toggle}></ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col sm="12" md="12" lg="12" className="mb-1">
              <Label>First Name</Label>
              <Controller
                control={control}
                name="first_name"
                render={({ field, fieldState }) => (
                  <>
                    <Input {...field} invalid={fieldState?.error && error} />
                    {fieldState?.error && (
                      <small className="text-danger">
                        {fieldState?.error?.message}
                      </small>
                    )}
                  </>
                )}
              />
            </Col>
            <Col sm="12" md="12" lg="12" className="mb-1">
              <Label>Last Name</Label>
              <Controller
                control={control}
                name="last_name"
                render={({ field, fieldState }) => (
                  <>
                    <Input {...field} invalid={fieldState?.error && error} />
                    {fieldState?.error && (
                      <small className="text-danger">
                        {fieldState?.error?.message}
                      </small>
                    )}
                  </>
                )}
              />
            </Col>
            <Col sm="12" md="12" lg="12" className="mb-1">
              <Label>Phone</Label>
              <Controller
                control={control}
                name="phone_no"
                render={({ field, fieldState }) => (
                  <>
                    <Input {...field} invalid={fieldState?.error && error} />
                    {fieldState?.error && (
                      <small className="text-danger">
                        {fieldState?.error?.message}
                      </small>
                    )}
                  </>
                )}
              />
            </Col>
            <Col sm="12" md="12" lg="12" className="mb-1">
              <Label>Email</Label>
              <Controller
                control={control}
                name="email"
                render={({ field, fieldState }) => (
                  <>
                    <Input {...field} invalid={fieldState?.error && error} />
                    {fieldState?.error && (
                      <small className="text-danger">
                        {fieldState?.error?.message}
                      </small>
                    )}
                  </>
                )}
              />
            </Col>
            <Col sm="12" md="12" lg="12" className="mb-1">
              <Label>Address</Label>
              <Controller
                control={control}
                name="address"
                render={({ field, fieldState }) => (
                  <>
                    <Input
                      type="textarea"
                      {...field}
                      invalid={fieldState?.error && error}
                    />
                    {fieldState?.error && (
                      <small className="text-danger">
                        {fieldState?.error?.message}
                      </small>
                    )}
                  </>
                )}
              />
            </Col>
            <Col sm="12" className="d-flex justify-content-end my-1">
              <Button.Ripple type='submit' color="success">Submit</Button.Ripple>
            </Col>
          </Row>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default AddCustomerForm;
