// import React from "react";

import { Check, Plus, Trash, X } from "react-feather";

// import country_code from "../../../../country_code.json";

import ContactForm from "./ContactForm";

import { Controller, useForm, useFieldArray } from "react-hook-form";
import {
  Input,
  Label,
  Row,
  Col,
  Card,
  Form,
  Button,
  CardText,
  Badge,
  Spinner,
} from "reactstrap";
import { useEffect, useState } from "react";

class defaultMcField {
  constructor(type, id) {
    this.first_name = "";
    this.last_name = "";
    this.email_address = "";
    this.telephone_number = "";
    this.fax_number = "";
    this.contact_type = type;
  }
}

const Contacts = (props) => {
  // ** Props
  const { defaultData, loader, handleSend, id } = props;
  // ** Form Hook
  const {
    control,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
    getValues,
    setValue,
    reset,
  } = useForm({ defaultValues: { mc: [new defaultMcField(1)] } });

  // ** States

  const [isTechnical, setIsTechnical] = useState(false);
  const [isFinancial, setIsFinancial] = useState(false);
  const [isChargeBack, setIsChargeBack] = useState(false);

  // ** Form Hook Array
  const { fields, append, remove } = useFieldArray({
    control,
    name: "mc",
  });

  // ** Switch Function
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

  // ** Handle Dynamic Field Array
  const handleDynamicFieldArray = (field) => {
    // ** Input Value
    const { value, name } = field;
    // ** Form Array
    const fieldArray = getValues("mc");

    /**Contact Type */
    const fields = {
      technical_contact: 2,
      financial_contact: 3,
      chargeback_contact: 4,
    };

    const newContactField = new defaultMcField(fields[name]);

    if (value) {
      fieldArray.push({ ...newContactField });
      setValue("mc", fieldArray);
      return;
    } else {
      fieldArray.splice(
        fieldArray.indexOf((ele) => ele.contact_type === fields[name]),
        1
      );
      setValue("mc", fieldArray);
      return;
    }
  };
  // const activeContact = (id) => watch("mc").includes(id);

  const ContactHeader = (props) => {
    const fields = {
      1: "General Contact",
      2: "Technical Contact",
      3: "Financial Contact",
      4: "Chargback Contact",
    };

    return (
      <div className="shadow-sm p-1 mb-1 bg-body-tertiary rounded text-center fs-1 fw-bold text-white bg-primary">
        {fields[props.type]}
      </div>
    );
  };

  useEffect(() => {
    if (defaultData?.["mc"] && defaultData?.["mc"].length > 0) {
       reset({ ...defaultData });
      console.log("Yes We Have A data");
    }
  }, [defaultData, reset]);

  return (
    <div className="p-1">
      <Row className="w-100">
        <Col sm="12" md="6" lg="6" className="mb-1 ">
          <div className="shadow p-1 mb-1 bg-body-tertiary rounded">
            <CardText>
              <Badge color="light-warning" pill>
                Genral Contact
              </Badge>
            </CardText>
            <div className="form-switch form-check-success">
              <Input
                type="switch"
                defaultChecked
                id="icon-success-2"
                name="icon-success-2"
                checked
              />
              <CustomLabel htmlFor="icon-success-2" />
            </div>
          </div>
        </Col>
        <Col sm="12" md="6" lg="6" className="mb-1 ">
          <div className="shadow p-1 mb-1 bg-body-tertiary rounded">
            <CardText>
              Is
              <Badge color="light-warning" pill>
                Technical Contact
              </Badge>
              Diffrent to General Contact ?
            </CardText>
            <div className="form-switch form-check-success">
              <Input
                type="switch"
                defaultChecked={false}
                // checked={activeContact(2)}
                id="icon-success-1"
                onChange={(e) =>
                  handleDynamicFieldArray({
                    value: e.target.checked,
                    name: "technical_contact",
                  })
                }
                name="icon-success"
              />
              <CustomLabel htmlFor="icon-success-1" />
            </div>
          </div>
        </Col>

        <Col sm="12" md="6" lg="6" className="mb-1 ">
          <div className="shadow p-1 mb-1 bg-body-tertiary rounded">
            <CardText>
              Is
              <Badge color="light-warning" pill>
                Financial Contact
              </Badge>
              Diffrent to General Contact ?
            </CardText>
            <div className="form-switch form-check-success">
              <Input
                type="switch"
                id="icon-success-3"
                name="icon-success-3"
                // checked={activeContact(3)}
                onChange={(e) =>
                  handleDynamicFieldArray({
                    value: e.target.checked,
                    name: "financial_contact",
                  })
                }
              />
              <CustomLabel htmlFor="icon-success-3" />
            </div>
          </div>
        </Col>
        <Col sm="12" md="6" lg="6" className="mb-1 ">
          <div className="shadow p-1 mb-1 bg-body-tertiary rounded">
            <CardText>
              Is
              <Badge color="light-warning" pill>
                Chargback Contact
              </Badge>
              Diffrent to General Contact ?
            </CardText>
            <div className="form-switch form-check-success">
              <Input
                type="switch"
                id="icon-success-4"
                name="icon-success-4"
                // checked={activeContact(4)}
                onChange={(e) =>
                  handleDynamicFieldArray({
                    value: e.target.checked,
                    name: "chargeback_contact",
                  })
                }
              />
              <CustomLabel htmlFor="icon-success-4" />
            </div>
          </div>
        </Col>
      </Row>
      <Form onSubmit={handleSubmit(handleSend)} className="mt-2">
        <Row>
          {fields.map((field, index) => (
            <Col sm="12" className="mb-1 border rounded py-1">
              <ContactHeader type={field.contact_type} />
              <ContactForm
                key={field.contact_type}
                control={control}
                name="mc"
                index={index}
              />
            </Col>
          ))}
          {/* <Col sm="12" className="mb-1 border rounded py-1">
            <div className="shadow-sm p-1 mb-1 bg-body-tertiary rounded text-center fs-1 fw-bold text-white bg-primary">
              Genral Contact
            </div>
            <ContactForm name="mc" control={control} index={0} />
          </Col> */}
          {/* {isTechnical && (
            <Col sm="12" className="mb-1 border rounded py-1">
              <div className="shadow-sm p-1 mb-1 bg-body-tertiary rounded text-center fs-1 fw-bold text-white bg-primary">
                Technical Contact
              </div>
              <ContactForm name="mc" control={control} index={1} />
            </Col>
          )}
          {isFinancial && (
            <Col sm="12" className="mb-1 border rounded py-1">
              <div className="shadow-sm p-1 mb-1 bg-body-tertiary rounded text-center fs-1 fw-bold text-white bg-primary">
                Financial Contact
              </div>
              <ContactForm name="mc" control={control} index={2} />
            </Col>
          )}
          {isChargeBack && (
            <Col sm="12" className="mb-1 border rounded py-1">
              <div className="shadow-sm p-1 mb-1 bg-body-tertiary rounded text-center fs-1 fw-bold text-white bg-primary">
                Chargback Contact
              </div>
              <ContactForm name="mc" control={control} index={3} />
            </Col>
          )} */}
          <Col
            sm="12"
            md="12"
            lg="12"
            xl="12"
            className="my-1 d-flex justify-content-between"
          >
            <Button.Ripple onClick={() => previous()} color="secondary" outline>
              Previous
            </Button.Ripple>
            <Button type="submit" color="success">
              {loader ? (
                <>
                  <Spinner color="white" size="sm" type="grow" />
                  <span className="ms-50">Loading...</span>
                </>
              ) : (
                <span className="ms-50">SUBMIT</span>
              )}
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Contacts;

/*
"application_id": "90db6667-4f31-4b00-99c4-58e35e583b29",
"first_name": "Renuka",
"last_name": "Kshirsagar",
"email_address": "renukshirsagar45@gmail.com",
"telephone_number": "2356892",
"fax_number": "586472",
"further_info": "No",
"contact_type": "1"
*/
