import React from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Form,
  Input,
  Label,
  Row,
} from "reactstrap";

// ** Form Hook And Controller
import { Controller, useForm } from "react-hook-form";

const TaxForm = () => {
  // ** destructure Form Hook
  const { control, handleSubmit } = useForm();
  return (
    <Card>
      <CardBody>
        <Form>
          <Row>
            <Col sm="12" className="mb-2">
              <Label className="form-label" for="nameVertical">
                Tax Name*
              </Label>
              <Controller
                control={control}
                name="tax_name"
                render={({ field, fieldState }) => (
                  <>
                    <Input
                      {...field}
                      type="text"
                      invalid={fieldState?.error && true}
                      placeholder="Tax name"
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
            <Col sm="12" className="mb-2">
              <Label className="form-label" for="EmailVertical">
                Tax Type*
              </Label>
              <Row>
                <Col sm="6" lg="6">
                  <div className="form-check">
                    <Input
                      type="radio"
                      id="ex1-active"
                      name="ex1"
                      defaultChecked
                    />
                    <Label className="form-check-label" for="ex1-active">
                      Percentage
                    </Label>
                  </div>
                </Col>
                <Col sm="6" lg="6">
                  <div className="form-check">
                    <Input type="radio" id="ex1-active" name="ex1" />
                    <Label className="form-check-label" for="ex1-active">
                      Flat Amount
                    </Label>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col sm="12" className="mb-2">
              <Label className="form-label" for="mobileVertical">
                Tax Value
              </Label>
              <Controller
                control={control}
                name=""
                render={({ field, fieldState }) => (
                  <>
                    <Input
                      {...field}
                      type="text"
                      invalid={fieldState?.error && true}
                      placeholder="Tax value"
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

            <Col sm="12">
              <div className="d-flex">
                <Button
                  className="me-1"
                  color="primary"
                  type="submit"
                  onClick={(e) => e.preventDefault()}
                >
                  Submit
                </Button>
                <Button outline color="secondary" type="reset">
                  Reset
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </Card>
  );
};

export default TaxForm;
