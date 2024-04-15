// ** React Imports
import { Fragment, useState, useEffect, useCallback, useMemo } from "react";

// ** Third Party Components
import axios from "axios";
import Flatpickr from "react-flatpickr";
import { SlideDown } from "react-slidedown";
import { X, Plus, Hash, DownloadCloud, Check } from "react-feather";
import Select, { components } from "react-select";
// ** Reactstrap Imports
import { selectThemeColors } from "@utils";
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Label,
  Button,
  CardBody,
  CardText,
  InputGroup,
  InputGroupText,
  Collapse,
  Badge,
} from "reactstrap";

// ** Styles
import "react-slidedown/lib/slidedown.css";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/base/pages/app-invoice.scss";

// ** Form Hooks
import { Controller, useForm, useFieldArray } from "react-hook-form";

// ** Country List JSOM
import country_list from "../../../../../country_code.json";

//** Custom Component*/
import AddNewCustomer from "./AddNewCustomer";
import AddItems from "./AddItems";
import { AddUPIID, AddBankDetails } from "./AddBankOrUPI";
import { PartialPayment, PartialPaymentDefault } from "./PartialPayment";

// Drop Loge
import { Dropzone, DisplayLogo } from "./DropLogo";

const AddCard = () => {
  // ** States
  const [value, setValue] = useState({});
  const [open, setOpen] = useState(false);
  const [clients, setClients] = useState(null);
  const [selected, setSelected] = useState(null);
  const [picker, setPicker] = useState(new Date());
  const [logoFile, setLogoFile] = useState(null);
  const [invoiceNumber, setInvoiceNumber] = useState(false);
  const [dueDatepicker, setDueDatePicker] = useState(new Date());
  const [openLogoUploader, setOpenLogoUploader] = useState(false);
  const [addDueDateToggle, setAddDueDateToggle] = useState(false);
  const [addNotes, setAddNotes] = useState(false);
  const [addTermCondition, setAddTermCondition] = useState(false);
  const [addBankDetails, setAddBankDetails] = useState(false);
  const [addUPIID, setAddUPIID] = useState(false);
  const [options, setOptions] = useState([
    {
      value: "add-new",
      label: "Add New Customer",
      type: "button",
      color: "flat-success",
    },
  ]);

  const [addCharges, setAddCharges] = useState(false);
  const [addDiscount, setAddDiscount] = useState(false);
  const [partialPayment, setPartialPayment] = useState(false);

  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      product_details: [
        { package_size: "", measurment_type: "", mrp_price: "" },
      ],
    },
  });

  const {
    fields: product_details,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "product_details",
  });

  useEffect(() => {
    // ** Get Clients
    axios.get("/api/invoice/clients").then((response) => {
      const arr = options;
      response.data.map((item) =>
        arr.push({ value: item.name, label: item.name })
      );
      setOptions([...arr]);
      setClients(response.data);
    });

    // ** Get Invoices & Set Invoice Number
    axios
      .get("/apps/invoice/invoices", {
        q: "",
        page: 1,
        status: "",
        sort: "asc",
        perPage: 10,
        sortColumn: "id",
      })
      .then((response) => {
        const lastInvoiceNumber = Math.max.apply(
          Math,
          response.data.allData.map((i) => i.id)
        );
        setInvoiceNumber(lastInvoiceNumber + 1);
      });
  }, []);

  // ** Deletes form
  const deleteForm = (e) => {
    e.preventDefault();
    e.target.closest(".repeater-wrapper").remove();
  };

  // ** Function to toggle sidebar
  const toggleSidebar = () => setOpen(!open);

  // ** Custom Options Component
  const OptionComponent = ({ data, ...props }) => {
    if (data.type === "button") {
      return (
        <Button
          className="text-start rounded-0 px-50"
          color={data.color}
          block
          onClick={() => setOpen(true)}
        >
          <Plus className="font-medium-1 me-50" />
          <span className="align-middle">{data.label}</span>
        </Button>
      );
    } else {
      return <components.Option {...props}> {data.label} </components.Option>;
    }
  };

  // ** Invoice To OnChange
  const handleInvoiceToChange = (data) => {
    setValue(data);
    setSelected(clients.filter((i) => i.name === data.value)[0]);
  };

  // ** Country Option;
  const option = country_list.map((country) => (
    <option
      key={country.dial_code}
      value={country.name}
    >{`${country.code}-${country.name}`}</option>
  ));

  // Swicth
  const CustomLabel = ({ htmlFor }) => {
    return (
      <Label className="form-check-label" htmlFor={htmlFor}>
        <span className="switch-icon-left">
          <Check size={14} />
        </span>
        <span className="switch-icon-right">
          <X size={14} />
        </span>
      </Label>
    );
  };

  const dropZone = useMemo(() => {
    return (
      <Dropzone
        open={openLogoUploader}
        url={setLogoFile}
        close={setOpenLogoUploader}
      />
    );
  }, [openLogoUploader]);

  // Add items Mangement
  const addItmes = useMemo(() => {
    return (
      <AddItems
        product_details={product_details}
        control={control}
        append={append}
        remove={remove}
      />
    );
  }, [product_details]);

  return (
    <Fragment>
      <Card className="invoice-preview-card">
        {/* Header */}
        <CardBody className="invoice-padding pb-0">
          <div className="d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0">
            <div>
              <div className="mb-2">
                {logoFile ? (
                  <DisplayLogo
                    url={logoFile}
                    open={() => setOpenLogoUploader(!openLogoUploader)}
                  />
                ) : (
                  <button
                    color="secondary"
                    style={{
                      padding: "10px 20px",
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      borderStyle: "dashed",
                    }}
                    className="bg-white text-secondary"
                    onClick={() => setOpenLogoUploader(!openLogoUploader)}
                  >
                    <span>
                      <Plus size={14} />
                    </span>
                    <small>Add Logo</small>
                  </button>
                )}
              </div>
              {/* <p className="card-text mb-25">
                Office 149, 450 South Brand Brooklyn
              </p>
              <p className="card-text mb-25">San Diego County, CA 91905, USA</p>
              <p className="card-text mb-0">
                +1 (123) 456 7891, +44 (876) 543 2198
              </p> */}
            </div>
            <div className="invoice-number-date mt-md-0 mt-2">
              <div className="d-flex align-items-center justify-content-md-end mb-1">
                <h4 className="invoice-title">Invoice</h4>
                <InputGroup className="input-group-merge invoice-edit-input-group disabled">
                  <InputGroupText>
                    <Hash size={15} />
                  </InputGroupText>
                  <Input
                    type="number"
                    className="invoice-edit-input"
                    value={invoiceNumber || 3171}
                    placeholder="53634"
                    disabled
                  />
                </InputGroup>
              </div>
              <div className="d-flex align-items-center mb-1">
                <span className="title">Date:</span>
                <Flatpickr
                  value={picker}
                  onChange={(date) => setPicker(date)}
                  className="form-control invoice-edit-input date-picker"
                />
              </div>
              <div className="d-flex align-items-center">
                <span className="title">Due Date:</span>
                <Flatpickr
                  value={dueDatepicker}
                  onChange={(date) => setDueDatePicker(date)}
                  className="form-control invoice-edit-input due-date-picker"
                />
              </div>
            </div>
          </div>
        </CardBody>
        {/* /Header */}

        <hr className="invoice-spacing" />
        <CardBody className="invoice-padding pt-0">
          <Row className="row-bill-to invoice-spacing">
            <Col className="col-bill-to ps-0" xl="8">
              <h6 className="invoice-to-title">Invoice To:</h6>
              <div className="invoice-customer">
                {clients !== null ? (
                  <Fragment>
                    <Select
                      className="react-select"
                      classNamePrefix="select"
                      id="label"
                      value={value}
                      options={options}
                      theme={selectThemeColors}
                      components={{
                        Option: OptionComponent,
                      }}
                      onChange={handleInvoiceToChange}
                    />
                    {selected !== null ? (
                      <div className="customer-details mt-1">
                        <p className="mb-25">{selected.name}</p>
                        <p className="mb-25">{selected.company}</p>
                        <p className="mb-25">{selected.address}</p>
                        <p className="mb-25">{selected.country}</p>
                        <p className="mb-0">{selected.contact}</p>
                        <p className="mb-0">{selected.companyEmail}</p>
                      </div>
                    ) : null}
                  </Fragment>
                ) : null}
              </div>
            </Col>
            <Col className="pe-0 mt-xl-0 mt-2" xl="4">
              <h6>
                Add Due Data:
                <span className="ms-1">
                  <Button.Ripple
                    className="btn-icon rounded-circle"
                    color={`${
                      addDueDateToggle ? "flat-danger" : "flat-success"
                    }`}
                    onClick={() => setAddDueDateToggle(!addDueDateToggle)}
                  >
                    {!addDueDateToggle ? <Plus size={16} /> : <X size={16} />}
                  </Button.Ripple>
                </span>
              </h6>
              <Row>
                <Collapse isOpen={addDueDateToggle}>
                  <Col sm="12">
                    <Label>Payments Terms:</Label>
                    <Input type="number" />
                  </Col>
                  <Col sm="12">
                    <Label>Due Date:</Label>
                    <Flatpickr
                      value={picker}
                      onChange={(date) => setPicker(date)}
                      className="form-control invoice-edit-input date-picker"
                      style={{ maxWidth: "100%" }}
                    />
                  </Col>
                </Collapse>
                <Col sm="12">
                  <Label>PO Bill No:</Label>
                  <Input type="number" value={1234} disabled />
                </Col>
                <Col sm="12">
                  <Label>Vechile No</Label>
                  <Input type="number" />
                </Col>
              </Row>
            </Col>
          </Row>
        </CardBody>
        <CardBody>{addItmes}</CardBody>
        <hr className="invoice-spacing mt-0" />

        <CardBody>
          <Row>
            <Col sm="12" md="5" lg="5" className="">
              <div className="mb-1">
                <Collapse isOpen={!addNotes}>
                  <Button.Ripple
                    color="flat-success"
                    onClick={() => setAddNotes(!addNotes)}
                  >
                    <Plus size={14} /> Add Notes
                  </Button.Ripple>
                </Collapse>
                <Collapse isOpen={addNotes}>
                  <div className="d-flex justify-content-end">
                    <Button.Ripple
                      className="btn-icon rounded-circle"
                      color="flat-danger"
                      onClick={() => setAddNotes(!addNotes)}
                    >
                      <X size={14} />
                    </Button.Ripple>
                  </div>
                  <div className="form-floating">
                    <Input
                      type="textarea"
                      name="text"
                      placeholder="Notes...."
                      style={{ minHeight: "100px" }}
                    />
                    <Label className="form-label" for="floating-textarea">
                      Notes
                    </Label>
                  </div>
                </Collapse>
              </div>
              <div className="mb-1">
                <Collapse isOpen={!addTermCondition}>
                  <Button.Ripple
                    color="flat-success"
                    onClick={() => setAddTermCondition(!addTermCondition)}
                  >
                    <Plus size={14} /> Add Term And Condition
                  </Button.Ripple>
                </Collapse>
                <Collapse isOpen={addTermCondition}>
                  <div className="d-flex justify-content-end">
                    <Button.Ripple
                      className="btn-icon rounded-circle"
                      color="flat-danger"
                      onClick={() => setAddTermCondition(!addTermCondition)}
                    >
                      <X size={14} />
                    </Button.Ripple>
                  </div>
                  <div className="form-floating">
                    <Input
                      type="textarea"
                      name="text"
                      placeholder="Notes...."
                      style={{ minHeight: "100px" }}
                    />
                    <Label className="form-label" for="floating-textarea">
                      Terms & Condition
                    </Label>
                  </div>
                </Collapse>
              </div>
              <hr className="invoice-spacing" />
              <div className="my-1">
                <div>
                  <h6 className="invoice-to-title">Bank Details:</h6>
                  <div className="mb-1">
                    <Badge
                      className="cursor-pointer"
                      onClick={() => setAddBankDetails(!addBankDetails)}
                      color={`light-${addBankDetails ? "danger" : "primary"}`}
                    >
                      {addBankDetails ? "Cancle" : "+ Add Bank Details"}
                    </Badge>
                    <Collapse isOpen={addBankDetails}>
                      <AddBankDetails />
                    </Collapse>
                  </div>
                  <div className="mb-1">
                    {/* <Badge
                      className="cursor-pointer"
                      onClick={() => setAddUPIID(!addUPIID)}
                      color={`light-${addUPIID ? "danger" : "primary"}`}
                    >
                      {addUPIID ? "Cancle" : "+ Add UPI ID"}
                    </Badge>
                    <Collapse isOpen={addUPIID}>
                      <AddUPIID />
                    </Collapse> */}
                  </div>
                </div>
              </div>
            </Col>
            <Col sm="12" md="7" lg="7" className="border-start">
              <div className="d-flex justify-content-between">
                <h6 className="invoice-to-title">Taxable Amount :</h6>
                <span>0$</span>
              </div>

              <hr className="invoice-spacing mt-0" />

              <div className="add-chages mb-1">
                <Collapse isOpen={!addCharges}>
                  {/* <Badge  */}
                  <Badge
                    color="light-primary"
                    onClick={() => setAddCharges(!addCharges)}
                  >
                    + Add Anothor Charge
                  </Badge>
                </Collapse>
                <Collapse isOpen={addCharges}>
                  <div className="d-flex justify-content-end">
                    <Button.Ripple
                      className="btn-icon rounded-circle"
                      color="flat-danger"
                      onClick={() => setAddCharges(!addCharges)}
                    >
                      <X size={14} />
                    </Button.Ripple>
                  </div>
                  <Row>
                    <Col sm="6" md="6" lg="6">
                      <Controller
                        control={control}
                        name="addition_charges"
                        render={({ field, fieldState }) => (
                          <>
                            <Input
                              {...field}
                              type="text"
                              placeholder="Eenter Charges"
                              invalid={
                                fieldState?.error && fieldState?.error?.message
                              }
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
                    <Col sm="6" md="6" lg="6">
                      <Controller
                        control={control}
                        name="addition_charges_cost"
                        render={({ field, fieldState }) => (
                          <>
                            <InputGroup>
                              <InputGroupText>$</InputGroupText>
                              <Input
                                {...field}
                                type="text"
                                placeholder=""
                                invalid={
                                  fieldState?.error &&
                                  fieldState?.error?.message
                                }
                              />
                            </InputGroup>
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
                </Collapse>
              </div>

              <div className="add-discount mb-1">
                <Collapse isOpen={!addDiscount}>
                  {/* <Badge  */}
                  <Badge
                    color="light-primary"
                    onClick={() => setAddDiscount(!addDiscount)}
                    className="cursor-pointer"
                  >
                    + Add Discount
                  </Badge>
                </Collapse>
                <Collapse isOpen={addDiscount}>
                  <div className="d-flex justify-content-end">
                    <Button.Ripple
                      className="btn-icon rounded-circle"
                      color="flat-danger"
                      onClick={() => setAddDiscount(!addDiscount)}
                    >
                      <X size={14} />
                    </Button.Ripple>
                  </div>
                  <div className="d-flex justify-content-between">
                    <h5>Discount</h5>
                    <div
                      className="d-flex flex-row align-items-basline"
                      style={{ gap: "10px" }}
                    >
                      <Controller
                        control={control}
                        name="discount_amt"
                        render={({ field, fieldState }) => (
                          <>
                            <InputGroup>
                              <InputGroupText>$</InputGroupText>
                              <Input
                                {...field}
                                type="text"
                                invalid={
                                  fieldState?.error &&
                                  fieldState?.error?.message
                                }
                              />
                            </InputGroup>
                            {fieldState.error && (
                              <small className="text-danger">
                                {fieldState.error.message}
                              </small>
                            )}
                          </>
                        )}
                      />
                      <div className="d-flex align-items-center">
                        <small className="text-secondary">/</small>
                      </div>
                      <Controller
                        control={control}
                        name="discount_percent"
                        render={({ field, fieldState }) => (
                          <>
                            <InputGroup>
                              <InputGroupText>%</InputGroupText>
                              <Input
                                {...field}
                                type="text"
                                invalid={
                                  fieldState?.error &&
                                  fieldState?.error?.message
                                }
                              />
                            </InputGroup>
                            {fieldState.error && (
                              <small className="text-danger">
                                {fieldState.error.message}
                              </small>
                            )}
                          </>
                        )}
                      />
                    </div>
                  </div>
                </Collapse>
              </div>
              <hr className="invoice-spacing mt-0" />

              <div>
                <div className="mb-1 d-flex justify-content-end">
                  <Label className="me-1">Round Off</Label>
                  <Controller
                    control={control}
                    name=""
                    render={({ field }) => <Input {...field} type="checkbox" />}
                  />
                </div>
                <div className="mb-1 d-flex justify-content-between align-items-baseline">
                  <h6 className="invoice-to-title">Total Amount:</h6>
                  <div>
                    <Controller
                      control={control}
                      name=""
                      render={({ field }) => <Input {...field} type="number" />}
                    />
                  </div>
                </div>
              </div>

              <hr className="invoice-spacing mt-0" />

              <div className="my-2">
                <div className="d-flex align-items-baseline justify-content-end mb-1">
                  <div className="form-switch form-check-primary">
                    <Input
                      type="switch"
                      checked={partialPayment}
                      onChange={(e) => setPartialPayment(e.target.checked)}
                      id="icon-primary"
                      name="partial-payment"
                    />
                    <CustomLabel htmlFor="icon-primary" />
                  </div>
                  <Label>Partial Payment</Label>
                </div>

                {!partialPayment ? (
                  <PartialPaymentDefault control={control} watch={watch} />
                ) : (
                  <PartialPayment control={control} watch={watch} />
                )}
              </div>
              <hr className="invoice-spacing mt-0" />
              <div className="text-success d-flex justify-content-between">
                <h6 className="invoice-to-title text-success">
                  Balance Amount
                </h6>
                <span>NAN</span>
              </div>
              <hr className="invoice-spacing mt-0" />
            </Col>
          </Row>
        </CardBody>
      </Card>
      <AddNewCustomer toggleSidebar={toggleSidebar} open={open} />
      {dropZone}
      <div className="d-flex justify-content-end">
        <Button color="relief-success" className="px-4">Save</Button>
      </div>
    </Fragment>
  );
};

export default AddCard;
