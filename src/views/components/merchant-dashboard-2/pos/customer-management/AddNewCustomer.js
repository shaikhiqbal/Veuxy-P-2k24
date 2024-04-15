import { useState } from "react";

import {
  Button,
  Offcanvas,
  OffcanvasHeader,
  OffcanvasBody,
  Label,
  Input,
  Form,
} from "reactstrap";

// ** Form Hook
import { Controller, useForm } from "react-hook-form";

const AddNewCustomer = (props) => {

  // ** Form Destructuree
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
      phone_no: "",
      email: "",
      address: "",
      city_name: "",
      state: "",
      country: "",
      pincode: "",
    },
  });

  const resetForm = () => {
    reset({
      first_name: "",
      last_name: "",
      phone_no: "",
      email: "",
      address: "",
      city_name: "",
      state: "",
      country: "",
      pincode: "",
    });
  };

  // ** Handle Create and Update;
  const handlSend = (data) => {
    console.log(data);
  };

  //**  Required Field *
  const requiredField = () => <small className="text-danger">*</small>;

  return (
    <div>
      <Offcanvas direction="end" style={{ width: "400px" }} isOpen={props.open}>
        <OffcanvasHeader toggle={props.toggle} className="border-bottom mb-3">
          <h4>Creat New Customer</h4>
        </OffcanvasHeader>
        <OffcanvasBody className={"mx-0 flex-grow-0 end"}>
          <Form onSubmit={handleSubmit(handlSend)}>
            <div className="mb-1">
              <Label>First Name {requiredField()}</Label>
              <Controller
                control={control}
                name="first_name"
                rules={{ required: "First name is required" }}
                render={({ field, fieldState }) => (
                  <>
                    <Input
                      {...field}
                      type="text"
                      invalid={fieldState?.error && true}
                    />
                    {fieldState?.error && (
                      <small className="text-danger">
                        {fieldState.error?.message}
                      </small>
                    )}
                  </>
                )}
              />
            </div>

            <div className="mb-1">
              <Label>Last Name {requiredField()}</Label>
              <Controller
                control={control}
                name="last_name"
                rules={{ required: "Last name is required" }}
                render={({ field, fieldState }) => (
                  <>
                    <Input
                      {...field}
                      type="text"
                      invalid={fieldState?.error && true}
                    />
                    {fieldState?.error && (
                      <small className="text-danger">
                        {fieldState.error?.message}
                      </small>
                    )}
                  </>
                )}
              />
            </div>

            <div className="mb-1">
              <Label>Phone Number {requiredField()}</Label>
              <Controller
                control={control}
                name="phone_no"
                rules={{ required: "Phone no is required" }}
                render={({ field, fieldState }) => (
                  <>
                    <Input
                      {...field}
                      type="text"
                      invalid={fieldState?.error && true}
                    />
                    {fieldState?.error && (
                      <small className="text-danger">
                        {fieldState.error?.message}
                      </small>
                    )}
                  </>
                )}
              />
            </div>

            <div className="mb-1">
              <Label>Email</Label>
              <Controller
                control={control}
                name="email"
                rules={{
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Please enter a valid email address",
                  },
                }}
                render={({ field, fieldState }) => (
                  <>
                    <Input
                      {...field}
                      type="email"
                      invalid={fieldState?.error && true}
                    />
                    {fieldState?.error && (
                      <small className="text-danger">
                        {fieldState.error?.message}
                      </small>
                    )}
                  </>
                )}
              />
            </div>

            <div className="mb-1">
              <Label>Address</Label>
              <Controller
                control={control}
                name="address"
                render={({ field, fieldState }) => (
                  <>
                    <Input
                      {...field}
                      type="textarea"
                      invalid={fieldState?.error && true}
                    />
                    {fieldState?.error && (
                      <small className="text-danger">
                        {fieldState.error?.message}
                      </small>
                    )}
                  </>
                )}
              />
            </div>

            <div className="mb-1">
              <Label>City Name</Label>
              <Controller
                control={control}
                name="city_name"
                render={({ field, fieldState }) => (
                  <>
                    <Input
                      {...field}
                      type="text"
                      invalid={fieldState?.error && true}
                    />
                    {fieldState?.error && (
                      <small className="text-danger">
                        {fieldState.error?.message}
                      </small>
                    )}
                  </>
                )}
              />
            </div>

            <div className="mb-1">
              <Label>State Name</Label>
              <Controller
                control={control}
                name="state"
                render={({ field, fieldState }) => (
                  <>
                    <Input
                      {...field}
                      type="text"
                      invalid={fieldState?.error && true}
                    />
                    {fieldState?.error && (
                      <small className="text-danger">
                        {fieldState.error?.message}
                      </small>
                    )}
                  </>
                )}
              />
            </div>

            <div className="mb-1">
              <Label>Country Name</Label>
              <Controller
                control={control}
                name="country"
                render={({ field, fieldState }) => (
                  <>
                    <Input
                      {...field}
                      type="text"
                      invalid={fieldState?.error && true}
                    />
                    {fieldState?.error && (
                      <small className="text-danger">
                        {fieldState.error?.message}
                      </small>
                    )}
                  </>
                )}
              />
            </div>

            <div className="mb-1">
              <Label>Pincode</Label>
              <Controller
                control={control}
                name="pincode"
                render={({ field, fieldState }) => (
                  <>
                    <Input
                      {...field}
                      type="text"
                      invalid={fieldState?.error && true}
                    />
                    {fieldState?.error && (
                      <small className="text-danger">
                        {fieldState.error?.message}
                      </small>
                    )}
                  </>
                )}
              />
            </div>
            <div className="my-2 d-flex justify-content-end gap-2">
              <Button.Ripple color="flat-danger" onClick={resetForm}>
                Cancel
              </Button.Ripple>
              <Button color="gradient-success" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </OffcanvasBody>
      </Offcanvas>
    </div>
  );
};

export default AddNewCustomer;
