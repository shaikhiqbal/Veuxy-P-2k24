// ** React
import React, { useState } from "react";

// ** Component Definition
import {
  Card,
  CardBody,
  CardHeader,
  Row,
  Col,
  Form,
  Input,
  Button,
  Label,
  CardFooter,
  Collapse,
  Spinner,
} from "reactstrap";

// ** Form Hooks and Controllers
import { Controller, useForm } from "react-hook-form";

// ** Country
import ReactCountryFlag from "react-country-flag";
import country_code from "../../../../country_code.json";

// ** Icons
import { SkipBack } from "react-feather";

// ** Navigation Hooks and Controllers
import { useNavigate } from "react-router-dom";

// ** React Select
import Select from "react-select";

// ** Css For Select
import { selectThemeColors } from "@utils";

// ** Toasts
import toast from "react-hot-toast";

const AddProducts = () => {
  // ** States
  const [manageInventory, setManageInventory] = useState(false);
  const [loader, setLoader] = useState(false);

  // ** Form State
  const { control, handleSubmit, setError, clearErrors, setValue } = useForm();

  // ** Navigation Hook
const navigate=useNavigate()

  // ** Country List
  const formOptionLabel = ({ value, label, name, flag }) => {
    return (
      <div style={{ display: "flex" }}>
        <div style={{ marginLeft: "10px" }}>
          {flag} {label} {value}
        </div>
      </div>
    );
  };
  // ** Country List Function
  const country = country_code.map((data, idx) => {
    return {
      value: data.dial_code,
      label: ` ${data.code}`,
      name: data.name,
      flag: <ReactCountryFlag countryCode={data.code} svg />,
    };
  });

  // ** Send To Create Product
  const creatData = () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("successfully created");
      }, 1000);
    });

  // ** Send To Edit Product
  const updateData = () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {}, 1000);
    });

  // ** handleSubmit
  const onSubmit = (data) => {
    clearErrors();
    setLoader(true);
    const skipField = ["scanInvoice"];
    const copydata = { ...data };
    let isValid = true;
    let isManageInventory = manageInventory;
    if (isManageInventory) {
      Object.keys(copydata).forEach((key) => {
        if (!skipField.includes(key) && !copydata[key]) {
          if (isValid) isValid = false;
          setError(key, { type: "custom", message: "Above field is required" });
        }
      });
    }

    if (isValid) {
      creatData().then((res) => {
        setLoader(false);
        toast.success(res);
      });
    } else setLoader(false);
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {loader ? "sending...." : "sended"}
      <Card>
        <CardHeader></CardHeader>
        <CardBody>
          <Row>
            <Col sm="12" className="mb-1">
              <Label>Product Name</Label>
              <Controller
                control={control}
                name="productName"
                rules={{
                  required: "Product Name is required",
                }}
                render={({ field, fieldState }) => (
                  <>
                    <Input
                      {...field}
                      type="text"
                      invalid={fieldState?.error && true}
                    />
                    {fieldState.error && (
                      <small className="text-danger">
                        {fieldState.error.message}
                      </small>
                    )}
                  </>
                )}
              />
            </Col>
            <Col sm="12" className="mb-1">
              <Label>Manage Inventory :</Label>
              {"  "}
              <Controller
                control={control}
                name="manageInventory"
                render={({ field, fieldState }) => (
                  <>
                    <Input
                      {...field}
                      type="checkbox"
                      className="cursor-pointer"
                      checked={manageInventory}
                      onChange={(e) => {
                        field.onChange(e.target.checked);
                        setManageInventory(e.target.checked);
                      }}
                      invalid={fieldState?.error && true}
                    />
                    {fieldState.error && (
                      <small className="text-danger">
                        {fieldState.error.message}
                      </small>
                    )}
                  </>
                )}
              />
            </Col>
            <Collapse isOpen={manageInventory}>
              <Col sm="12" className="mb-1">
                <Label>Vendor Name</Label>
                <Controller
                  control={control}
                  name="vendorName"
                  render={({ field, fieldState }) => (
                    <>
                      <Input
                        {...field}
                        type="text"
                        invalid={fieldState?.error && true}
                      />
                      {fieldState.error && (
                        <small className="text-danger">
                          {fieldState.error.message}
                        </small>
                      )}
                    </>
                  )}
                />
              </Col>
              <Col sm="12" className="mb-1">
                <Label>Vendor Email</Label>
                <Controller
                  control={control}
                  name="vendorEmail"
                  rules={{
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  }}
                  render={({ field, fieldState }) => (
                    <>
                      <Input
                        {...field}
                        type="text"
                        invalid={fieldState?.error && true}
                      />
                      {fieldState.error && (
                        <small className="text-danger">
                          {fieldState.error.message}
                        </small>
                      )}
                    </>
                  )}
                />
              </Col>
              <Col sm="12" className="mb-1">
                <Label>Vendor Contact</Label>
                <Row>
                  <Col sm="3">
                    <Select
                      options={country}
                      theme={selectThemeColors}
                      defaultValue={country[0]}
                      className="react-select"
                      classNamePrefix="select"
                      formatOptionLabel={formOptionLabel}
                      onChange={(e) => setValue("country_code", e.value)}
                    />
                  </Col>
                  <Col sm="9">
                    <Controller
                      control={control}
                      name="vendorContact"
                      render={({ field, fieldState }) => (
                        <>
                          <Input
                            {...field}
                            type="text"
                            invalid={fieldState?.error && true}
                          />
                          {fieldState.error && (
                            <small className="text-danger">
                              {fieldState.error.message}
                            </small>
                          )}
                        </>
                      )}
                    />
                  </Col>
                </Row>
              </Col>
              <Col sm="12" className="mb-1">
                <Label>Invoice Number</Label>
                <Controller
                  control={control}
                  name="InvoiceNumber"
                  render={({ field, fieldState }) => (
                    <>
                      <Input
                        {...field}
                        type="text"
                        invalid={fieldState?.error && true}
                      />
                      {fieldState.error && (
                        <small className="text-danger">
                          {fieldState.error.message}
                        </small>
                      )}
                    </>
                  )}
                />
              </Col>
              <Col sm="12" className="mb-1">
                <Label>Invoice Amount</Label>
                <Controller
                  control={control}
                  name="invoiceAmount"
                  render={({ field, fieldState }) => (
                    <>
                      <Input
                        {...field}
                        type="text"
                        invalid={fieldState?.error && true}
                      />
                      {fieldState.error && (
                        <small className="text-danger">
                          {fieldState.error.message}
                        </small>
                      )}
                    </>
                  )}
                />
              </Col>
              <Col sm="12" className="mb-1">
                <Label>Scan Invoice (optional)</Label>
                <Controller
                  control={control}
                  name="scanInvoice"
                  render={({ field, fieldState }) => (
                    <>
                      <Input
                        {...field}
                        type="file"
                        invalid={fieldState?.error && true}
                      />
                      {fieldState.error && (
                        <small className="text-danger">
                          {fieldState.error.message}
                        </small>
                      )}
                    </>
                  )}
                />
              </Col>
            </Collapse>
          </Row>
        </CardBody>
        <CardFooter>
          <Button type="submit">
            {loader ? (
              <>
                {" "}
                <Spinner color="white" size="sm" type="grow" />
                <span className="ms-50">Loading...</span>
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </CardFooter>
      </Card>
    </Form>
  );
};

export default AddProducts;
