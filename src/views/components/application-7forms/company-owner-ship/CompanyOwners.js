import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Plus } from "react-feather";
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
  Spinner,
} from "reactstrap";
import { SlideDown } from "react-slidedown";
import "react-slidedown/lib/slidedown.css";
import DetailsForm from "./COPInputFields";

const appendData = {
  first_name: "",
  last_name: "",
  house_number: "",
  street_address: "",
  zip_code: "",
  city: "",
  country: "",
  telephone_number: "",
  passport: "",
  social_security_number: "",
};

const CompanyOwners = (props) => {
  const { defaultData, sendData, loader, uboHave ,previous} = props;

  //**  State
  const [anyUBO, setAnyUBO] = useState(false);
  const [defaultValues, setDefaultValues] = useState({ ...defaultData });
  const [isDefaultSet, setIsDefaultSet] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { ...defaultValues },
  });

  // First dynamic form
  const {
    fields: dir,
    append: append1,
    remove: remove1,
  } = useFieldArray({
    control,
    name: "director",
  });

  // Second dynamic form
  const {
    fields: ubo,
    append: append2,
    remove: remove2,
  } = useFieldArray({
    control,
    name: "ubo",
  });

  // Add Form Btn
  const AddForm = ({ append }) => (
    <Row>
      <Col sm="12" className="my-1 d-flex justify-content-center">
        <Button.Ripple
          className="btn-icon rounded-circle"
          color="warning"
          onClick={() => append({ ...appendData })}
        >
          <Plus size="16" />
        </Button.Ripple>
      </Col>
    </Row>
  );

  const handleError = (data) => {
    const { director, ubo } = data;
    director.forEach((element, index) => {
      Object.keys(element).forEach((key) => {
        if (!element[key] || !element[key].length) {
          console.log(!element[key] || !element[key].length);
          setError(`director[${index}].${key}`, {
            type: "manual",
            message: "Empty Field",
          });
        }
      });
    });
    ubo.forEach((element, index) => {
      Object.keys(element).forEach((key) => {
        if (!element[key] || !element[key].length) {
          setError(`ubo[${index}].${key}`, {
            type: "manual",
            message: "Empty Field",
          });
        }
      });
    });
  };

  const onSubmit = (data) => {
    sendData(data);
  };

  useEffect(() => {
    setDefaultValues({ ...defaultData });
    setIsDefaultSet(true);
  }, [defaultData]);

  useEffect(() => {
    if (isDefaultSet) {
      reset({ ...defaultValues });
      setIsDefaultSet(false);
    }
  }, [isDefaultSet, reset]);

  useEffect(() => {
    setAnyUBO(uboHave);
  }, [uboHave]);

  return (
    <Row>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Col sm="12" md="12" lg="12" xl="12">
          {dir.map((field, index) => (
            <SlideDown key={field.id}>
              <DetailsForm
                field={field}
                control={control}
                index={index}
                name={"director"}
                remove={remove1}
                title={"Director"}
                errors={errors?.director?.[index]}
              />
            </SlideDown>
          ))}
          <AddForm append={append1} />
        </Col>
        <Col sm="12" md="12" lg="12" className="my-1">
          <div className=" fw-bold">
            Are there Ultimate Beneficial Owner owning 10% or more of the
            company
            <div className="form-switch form-check-primary">
              <Input
                type="switch"
                name="icon-primary"
                onChange={() => {
                  setAnyUBO(!anyUBO);
                }}
                checked={anyUBO}
              />
            </div>
          </div>
        </Col>
        {anyUBO && (
          <Col sm="12" md="12" lg="12" xl="12">
            {ubo.map((field, index) => (
              <SlideDown key={field.id}>
                <DetailsForm
                  field={field}
                  control={control}
                  index={index}
                  name={"ubo"}
                  remove={remove2}
                  title={"Ultimate Beneficial Owner"}
                />
              </SlideDown>
            ))}
            <AddForm append={append2} />
          </Col>
        )}
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
      </Form>
    </Row>
  );
};

export default CompanyOwners;

// CompanyOwners.propTypes = {
//   id: PropTypes.string.isRequired, // Make the id prop mandatory
// };

// CompanyOwners.defaultProps = {
//   id: "", // Provide a default value for id prop if not passed
// };
