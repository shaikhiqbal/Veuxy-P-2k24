import InputNumber from "rc-input-number";
import { useState, useRef, useEffect, Fragment } from "react";

import { Minus, Plus, Search, Trash } from "react-feather";

import {
  Button,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Table,
  Row,
  Col,
  InputGroup,
  InputGroupText,
  Input,
  Collapse,
  ButtonGroup,
  TabContent,
  TabPane,
} from "reactstrap";

import { Controller } from "react-hook-form";

import { SlideDown } from "react-slidedown";
import "react-slidedown/lib/slidedown.css";

const ItemModal = (props) => {
  const [isCreate, setIsCreate] = useState(false);
  const [rSelected, setRSelected] = useState("1");
  const [additionalDetails, setAdditionalDetails] = useState(true);

  const dynBox = useRef();

  const handleDynAppend = async () => {
    // console.log("Befor  " + dynBox.current.scrollHeight);
    await props.append({
      package_size: "",
      measurment_type: "",
      mrp_price: "",
    });
    // console.log("Befor  " + dynBox.current.scrollHeight);
    dynBox.current.scrollTop = dynBox.current.scrollHeight;
  };

  return (
    <Modal isOpen={props.open} className={"modal-dialog-centered modal-lg"}>
      <ModalHeader toggle={props.toggle}>Add items</ModalHeader>
      <ModalBody>
        <Row className="my-2">
          <Col sm="12" md="6" lg="6">
            <InputGroup className="input-group-merge mb-2">
              <InputGroupText>
                <Search size={14} />
              </InputGroupText>
              <Input placeholder="search..." />
            </InputGroup>
          </Col>
          <Col sm="12" md="6" lg="6">
            <Input
              type="button"
              value={"+ Create New Item"}
              className="text-primary"
              style={{
                transition: "opacity 1s",
                opacity: isCreate ? "0" : "1",
              }}
              onClick={() => setIsCreate(!isCreate)}
            />
          </Col>
        </Row>
        <Collapse isOpen={!isCreate}>
          <div>
            <div>
              <Table striped responsive>
                {/* ITEM NAMEITEM CODESALES PRICEQUANTITY */}
                <thead>
                  <tr>
                    <th className="text-uppercase">#</th>
                    <th className="text-uppercase">Item Name</th>
                    <th className="text-uppercase">Item Code</th>
                    <th className="text-uppercase">Sales Price</th>
                    <th className="text-uppercase">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <Input type="checkbox" className="cursor-pointer" />
                    </td>
                    <td>Jeans</td>
                    <td>4564</td>
                    <td>45</td>
                    <td>
                      <InputNumber
                        defaultValue={0}
                        upHandler={<Plus />}
                        downHandler={<Minus />}
                        id={`primary-number-input`}
                        className={`input-primary`}
                        onChange={(e) => console.log(e)}
                      />
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
            <div></div>
          </div>
        </Collapse>
        <Collapse isOpen={isCreate}>
          <Row>
            <Col sm="12" md="12" lg="12" className="mb-1">
              <Input type="radio" className="me-1" />
              <Label>Product</Label>
            </Col>
            <Col sm="12" md="12" lg="12" className="mb-1">
              <Label>Item Name *</Label>
              <Input type="text" placeholder="Enter Item name."/>
            </Col>
            <Col sm="12" md="12" lg="12" className="mb-1">
              <Button.Ripple
                color="flat-dark"
                className="btn-sm w-100"
                onClick={() => setAdditionalDetails(!additionalDetails)}
              >
                {additionalDetails
                  ? "- Show Less Detail"
                  : "+ Add Additional Details"}
              </Button.Ripple>
            </Col>
            <Collapse isOpen={additionalDetails}>
              <Col
                sm="12"
                md="12"
                lg="12"
                className="mb-1 d-flex justify-content-center"
              >
                <ButtonGroup className="mb-1">
                  <Button
                    color="primary"
                    onClick={() => setRSelected("1")}
                    active={rSelected === "1"}
                  >
                    General Details
                  </Button>
                  <Button
                    color="primary"
                    onClick={() => setRSelected("2")}
                    active={rSelected === "2"}
                  >
                    Tax Details
                  </Button>
                  <Button
                    color="primary"
                    onClick={() => setRSelected("3")}
                    active={rSelected === "3"}
                  >
                    Pricing Details
                  </Button>
                </ButtonGroup>
              </Col>
              <Col sm="12" md="12" lg="12" className="mb-1">
                <TabContent className="py-50" activeTab={rSelected}>
                  <TabPane tabId="1">
                    <Row>
                      <Col sm="12" md="6" lg="6">
                        <h3 className="mb-1">General Details</h3>

                        <Label>Category</Label>
                        <Input type="select" />
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="2">
                    <h3 className="mb-1">Tax Details</h3>

                    <Row>
                      <Col sm="12" md="6" lg="6">
                        <Label>Tax Rate (%)</Label>
                        <InputGroup>
                          <Input type="select" />
                          <InputGroupText>%</InputGroupText>
                        </InputGroup>
                      </Col>
                      <Col sm="12" md="6" lg="6">
                        <Label>Tax Type</Label>
                        <InputGroup>
                          <Input type="select" />
                          <InputGroupText>%</InputGroupText>
                        </InputGroup>
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane
                    tabId="3"
                    style={{ maxHeight: "500px", overflow: "scroll" }}
                  >
                    <div ref={dynBox}>
                      <SlideDown>
                        {props.pruductField &&
                          props.pruductField.map((field, index) => (
                            <Fragment key={index}>
                              <div className="d-flex justify-content-end">
                                <Button.Ripple
                                  className="btn-icon btn-sm"
                                  color="danger"
                                  onClick={() => props.remove(index)}
                                  // disabled={props.pruductField.length == 1}
                                >
                                  <Trash size={14} />
                                </Button.Ripple>
                              </div>
                              <Row
                                key={field.id}
                                className="border rounded m-1 py-1"
                              >
                                <Col sm="12" md="4" lg="4" className="mb-1">
                                  <Label>Package Size</Label>
                                  <Controller
                                    control={props.control}
                                    name={`product_details.${index}.package_size"`}
                                    render={({ field, fieldState }) => (
                                      <>
                                        <Input
                                          {...field}
                                          type="text"
                                          className="form-input-sm"
                                          invalid={fieldState?.error && true}
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
                                <Col sm="12" md="4" lg="4" className="mb-1">
                                  <Label>Measurment Type</Label>
                                  <Controller
                                    control={props.control}
                                    name={`product_details.${index}.measurment_type"`}
                                    render={({ field, fieldState }) => (
                                      <>
                                        <Input
                                          {...field}
                                          type="text"
                                          invalid={fieldState?.error && true}
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
                                <Col sm="12" md="4" lg="4" className="mb-1">
                                  <Label>MRP Price</Label>
                                  <Controller
                                    control={props.control}
                                    name={`product_details.${index}.mrp_price"`}
                                    render={({ field, fieldState }) => (
                                      <>
                                        <Input
                                          {...field}
                                          type="text"
                                          invalid={fieldState?.error && true}
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
                              </Row>
                            </Fragment>
                          ))}
                        <div className="">
                          <Button.Ripple
                            className="btn-sm"
                            color="primary"
                            onClick={handleDynAppend}
                          >
                            {/* <Plus size={14} /> */}+ Add
                          </Button.Ripple>
                        </div>
                      </SlideDown>
                    </div>
                  </TabPane>
                </TabContent>
              </Col>
            </Collapse>
            <Col
              sm="12"
              md="12"
              lg="12"
              className="mb-1 d-flex justify-content-center my-2 flex-row gap-2"
            >
              <Button.Ripple
                onClick={() => setIsCreate(!isCreate)}
                className="btn-sm px-2"
                color="secondary"
                outline
              >
                Cancel
              </Button.Ripple>
              <Button.Ripple className="btn-sm px-3" color="success">
                Save
              </Button.Ripple>
            </Col>
          </Row>
        </Collapse>
      </ModalBody>
    </Modal>
  );
};

const AddItems = (props) => {
  // ** State
  const [open, setOpen] = useState(false);

  // ** toggle Modal
  const toggle = () => setOpen(!open);
  return (
    <div>
      <div>
        <Table striped responsive>
          <thead>
            <tr>
              <th>No</th>
              <th>Items</th>
              <th>HSN</th>
              <th>Qty</th>
              <th>Price/Items</th>
              <th>Discount</th>
              <th>Tax%</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody></tbody>
        </Table>
      </div>
      <div className="border-bottom py-1 d-flex justify-content-center">
        <Button color="primary" className="btn-sm" onClick={toggle}>
          <Plus size={14} /> Add Items
        </Button>
      </div>
      {
        <ItemModal
          open={open}
          toggle={toggle}
          pruductField={props.product_details}
          control={props.control}
          append={props.append}
          remove={props.remove}
        />
      }
    </div>
  );
};

export default AddItems;
