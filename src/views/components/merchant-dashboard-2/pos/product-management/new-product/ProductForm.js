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
  InputGroup,
  InputGroupText,
} from "reactstrap";

// ** Form Hooks and Controllers
import { Controller, useForm, useFieldArray } from "react-hook-form";

// ** Country

// ** Icons
import { Plus, SkipBack } from "react-feather";

// ** Navigation Hooks and Controllers
import { useNavigate } from "react-router-dom";

// ** React Select
import Select from "react-select";

// ** Css For Select
import { selectThemeColors } from "@utils";

// ** Toasts
import toast from "react-hot-toast";

import { SlideDown } from "react-slidedown";
import "react-slidedown/lib/slidedown.css";

const defaultDynamicTax = {
  packageSize: "",
  measurements: "",
  sellingPrice: "",
  tax: "",
};

const labelDynamicTax = {
  packageSize: "Package Size",
  measurements: "",
  sellingPrice: "",
  tax: "",
};

const AddProducts = () => {
  // ** States
  const [manageInventory, setManageInventory] = useState(false);
  const [loader, setLoader] = useState(false);
  const [inTax, setInTax] = useState(false);
  const [exTax, setExTax] = useState(false);

  // ** Form State
  const { control, handleSubmit, setError, clearErrors, setValue } = useForm({
    defaultValues: { tax: [{ ...defaultDynamicTax }] },
  });

  // ** Dynamic Form
  const { fields, remove, append } = useFieldArray({
    control,
    name: "tax",
  });
  // ** Navigation Hook
  const navigate = useNavigate();

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
      <Card>
        <CardHeader></CardHeader>
        <CardBody>
          <Row>
            <Col sm="12" className="mb-2">
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

            <Col sm="12" className="mb-2">
              <Label>Description(optional)</Label>
              <Controller
                control={control}
                name="description"
                render={({ field, fieldState }) => (
                  <>
                    <Input
                      {...field}
                      type="textarea"
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
            <Col sm="12" className="mb-2">
              <Label>Category(optional)</Label>
              <Controller
                control={control}
                name="category"
                render={({ field, fieldState }) => (
                  <>
                    <Input
                      {...field}
                      type="select"
                      invalid={fieldState?.error && true}
                    >
                      <option value={""}>--Select Parent Category--</option>
                    </Input>
                    {fieldState.error && (
                      <small className="text-danger">
                        {fieldState.error.message}
                      </small>
                    )}
                  </>
                )}
              />
            </Col>
            <Col sm="12" className="mb-2">
              <Label>Taxes</Label>

              <Select
                // options={country}
                theme={selectThemeColors}
                defaultValue={{ label: "--Select Tax--", value: "" }}
                className="react-select"
                classNamePrefix="select"
                formatOptionLabel={formOptionLabel}
                onChange={(e) => setValue("taxes", e.value)}
              />
            </Col>
            {/* <Col sm="9">
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
                </Col> */}
            <Col sm="12" className="mb-2">
              <Label>Product Image(optional)</Label>
              <Input type="file" />
            </Col>
            <Col sm="12" className="mb-2">
              <h3 className="mb-1 border-bottom py-2">Variations</h3>
              <Row>
                <Col sm="12" className="mb-2">
                  <p>MRP Price includeing Inclusive/Exclusive</p>
                </Col>
                <Col sm="6" md="6" lg="6" className="mb-2">
                  <div className="form-check form-check-inline">
                    <Input
                      checked={inTax}
                      type="checkbox"
                      id="basic-cb-checked"
                      onChange={(e) => setInTax(e.target.checked)}
                    />
                    <Label for="basic-cb-checked" className="form-check-label">
                      Inclusive tax
                    </Label>
                  </div>
                </Col>
                <Col sm="6" md="6" lg="6" className="mb-2">
                  <div className="form-check form-check-inline">
                    <Input type="checkbox" id="basic-cb-checked" />
                    <Label for="basic-cb-checked" className="form-check-label">
                      Exclusive tax
                    </Label>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col sm="12">
              <SlideDown>
                {fields.map((field, index) => (
                  <Row className="m-1 border rounded py-1">
                    <Col sm="6" md="6" lg="6" className="mb-2">
                      <div className="mb-2">
                        <Label>Package Size</Label>
                        <br />
                        <Controller
                          control={control}
                          name={`tax?.${index}.packageSize`}
                          render={({ field, fieldState }) => (
                            <>
                              <Input
                                type="text"
                                invalid={fieldState?.error && true}
                              />
                              {fieldState?.error && (
                                <small className="text-danger">
                                  {fieldState.error.message}
                                </small>
                              )}
                            </>
                          )}
                        />
                      </div>
                      <div>
                        <Label className="d-block">Package Size</Label>
                        <Controller
                          control={control}
                          name={`tax?.${index}.measurements`}
                          render={({ field, fieldState }) => (
                            <>
                              <Input
                                type="text"
                                invalid={fieldState?.error && true}
                              />
                              {fieldState?.error && (
                                <small className="text-danger">
                                  {fieldState.error.message}
                                </small>
                              )}
                            </>
                          )}
                        />
                      </div>
                    </Col>
                    <Col sm="4" md="4" lg="4">
                      <div className="mb-2">
                        <Label className="d-block">Selling Price</Label>
                        <Controller
                          control={control}
                          name={`tax?.${index}.sellingPrice`}
                          render={({ field, fieldState }) => (
                            <>
                              <Input
                                type="text"
                                invalid={fieldState?.error && true}
                              />
                              {fieldState?.error && (
                                <small className="text-danger">
                                  {fieldState.error.message}
                                </small>
                              )}
                            </>
                          )}
                        />
                      </div>
                      <div>
                        <Label>Tax</Label>
                        <Controller
                          control={control}
                          name={`tax?.${index}.tax`}
                          render={({ field, fieldState }) => (
                            <>
                              <InputGroup>
                                <Input
                                  type="text"
                                  invalid={fieldState?.error && true}
                                />
                                <InputGroupText>%</InputGroupText>
                              </InputGroup>

                              {fieldState?.error && (
                                <small className="text-danger">
                                  {fieldState.error.message}
                                </small>
                              )}
                            </>
                          )}
                        />
                      </div>
                    </Col>
                    <Col
                      sm="2"
                      md="2"
                      lg="2"
                      className="d-flex align-items-center justify-content-center border-start"
                    >
                      <Button color="danger" onClick={() => remove(index)}>
                        delete
                      </Button>
                    </Col>
                  </Row>
                ))}
              </SlideDown>
              <div>
                <Button color="primary">
                  <Plus size={14} onClick={()=>append({...defaultDynamicTax})}/> Add New
                </Button>
              </div>
            </Col>
          </Row>
        </CardBody>
        <CardFooter className="d-flex justify-content-end">
          <Button type="submit" color="success">
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
