import React, { useState } from "react";
import { AlignJustify, Codesandbox, Plus, Search } from "react-feather";
import {
  Button,
  Row,
  Col,
  InputGroup,
  InputGroupText,
  Input,
  ButtonGroup,
  Label,
  Card,
  CardBody,
} from "reactstrap";

import AddCustomerForm from "./AddCustomerForm";

const index = () => {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen(!open);

  return (
    <Row>
      <Col sm="12" className="d-flex justify-content-between">
        <h4>Point of Sale</h4>
        <Button color="primary" onClick={toggle}>
          <Plus size={14} />
          Add Customer
        </Button>
      </Col>
      <Col sm="12" md="8" lg="8" className="my-1">
        <Row>
          <Col sm="12" md="6" lg="6">
            <InputGroup className="input-group-merge mb-2">
              <InputGroupText>
                <Search size={14} />
              </InputGroupText>
              <Input placeholder="search..." />
            </InputGroup>
          </Col>
          <Col sm="12" md="6" lg="6">
            <span className="w-50">
              <Input type="select" className="">
                <option>Sort By</option>
                <option>A to Z</option>
                <option>Z to A</option>
              </Input>
            </span>
          </Col>
          <Col sm="12" md="12" lg="12">
            <Card>
              <CardBody className="d-flex justify-content-between">
                <div>
                  <h4>Please select customer first</h4>
                </div>
                <div>
                  <ButtonGroup className="mb-1">
                    <Button outline color="primary">
                      <AlignJustify size={15} />
                    </Button>
                    <Button outline color="primary">
                      <Codesandbox size={15} />
                    </Button>
                  </ButtonGroup>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col sm="12" md="12" lg="12"></Col>
        </Row>
      </Col>

      <Col sm="12" md="4" lg="4" className="my-1">
        <Card className="p-2">
          <div className="d-flex gap-5 align-items-start mb-2">
            <div className="w-50">
              <Label>Search Contact No</Label>
              <Input type="select" className="">
                <option>Select Contact</option>
              </Input>
            </div>
            <div className="w-50">
              <Label>Search Customer Name</Label>
              <Input type="select">
                <option>Select Name</option>
              </Input>
            </div>
          </div>
          <div className="mb-3 ">
            <Button color="relief-warning" className="w-100">
              POS Details
            </Button>
          </div>
          <div className="mb-3 ">
            <div>
              <Label className="mb-1">Discount Type</Label>
              <div className="w-100 d-flex justify-content-between">
                <span className="mb-1">
                  <Label className="me-1">Flat</Label>
                  <Input type="checkbox" />
                </span>
                <span className="mb-1">
                  <Label className="me-1">Percentage</Label>
                  <Input type="checkbox" />
                </span>
                <span className="mb-1">
                  <Label className="me-1">Coupen</Label>
                  <Input type="checkbox" />
                </span>
              </div>
            </div>
          </div>
          <div className="mb-1 d-flex gap-3 align-items-center justify-content-between">
            {true ? (
              <>
                <Label style={{ whiteSpace: "nowrap" }}>Discount Amount</Label>
                <Input style={{ width: "150px" }} />
              </>
            ) : (
              <>
                <Label>Discount Percentage</Label>
                <InputGroup>
                  <Input style={{ width: "150px" }} />
                  <InputGroupText>%</InputGroupText>
                </InputGroup>
              </>
            )}
          </div>
          <div className="mb-3 ">
            <div className="d-flex gap-3 align-items-center justify-content-between w-100 mb-1">
              <Label style={{ whiteSpace: "nowrap" }}>Subtotal</Label>
              <Input style={{ width: "150px" }} />
            </div>
            <div className="d-flex gap-3 align-items-center justify-content-between w-100 mb-1">
              <Label style={{ whiteSpace: "nowrap" }}>Discount</Label>
              <Input style={{ width: "150px" }} />
            </div>
            <div className="d-flex gap-3 align-items-center justify-content-between w-100 mb-1">
              <Label style={{ whiteSpace: "nowrap" }}>Tax Amount</Label>
              <Input style={{ width: "150px" }} />
            </div>
            <div className="d-flex gap-3 align-items-center justify-content-between w-100 mb-1">
              <Label style={{ whiteSpace: "nowrap" }}>Grand Total</Label>
              <Input style={{ width: "150px" }} />
            </div>
          </div>
          <div className="mb-3 ">
            <div className="d-flex gap-3 align-items-center justify-content-between w-100 mb-1">
              <Label style={{ whiteSpace: "nowrap" }}>Invoice No</Label>
              <Input style={{ width: "150px" }} />
            </div>
            <div className="d-flex gap-3 align-items-center justify-content-between w-100 mb-1">
              <Label style={{ whiteSpace: "nowrap" }}>Invoice Date</Label>
              <Input style={{ width: "150px" }} />
            </div>
          </div>
        </Card>
      </Col>
      <Col sm="12" className="d-flex justify-content-end">
        <Button color="relief-success px-4">Save</Button>
      </Col>
      <AddCustomerForm open={open} toggle={toggle} />
    </Row>
  );
};

export default index;

// First Name *
// Last Name *
// Phone
// Email *
// Address
