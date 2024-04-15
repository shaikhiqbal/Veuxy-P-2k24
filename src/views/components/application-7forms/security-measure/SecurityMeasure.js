import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  FormFeedback,
  Input,
  Label,
  Row,
  CardBody,
  CardHeader,
  CardText,
  Alert,
  Spinner,
} from "reactstrap";
import { Controller, useForm } from "react-hook-form";
import { Check, X } from "react-feather";

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

const SecurityMeasure = (props) => {
  const { defaultData, creat, update, loader } = props;
  const [defaultValues, setDefaultValues] = useState({ ...defaultData });
  const [isDefaultSet, setIsDefaultSet] = useState(false);
  const {
    control,
    setError,
    reset,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
    watch,
  } = useForm({});

  const onSubmit = (data) => {
    if (data.uid) update({ ...data });
    else creat(data);
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

  return (
    <Card>
      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col sm="12" md="6" lg="6" xl="6" className="my-1">
              <Label>
                Describe ALL security measures AND fraud/chargeback handling (in
                detail)
              </Label>
              <Controller
                control={control}
                name="chargeback_handling"
                render={({ field, fieldState }) => (
                  <>
                    <Input
                      {...field}
                      type="text"
                      invalid={fieldState?.error !== undefined}
                    />
                    {fieldState?.error && (
                      <FormFeedback>{fieldState?.error?.message}</FormFeedback>
                    )}
                  </>
                )}
              />
            </Col>
            <Col sm="12" md="6" lg="6" xl="6" className="my-1">
              <Label>
                Would you like to apply for 3D Secure (MasterCard SecureCode,
                VerifiedByVisa)
              </Label>
              <Controller
                control={control}
                name="apply_for_3d_secure"
                render={({ field, fieldState }) => (
                  <div className="form-switch form-check-primary">
                    <Input
                      type="switch"
                      defaultChecked={field.value} // Set the initial value
                      onChange={(e) => field.onChange(e.target.checked)} // Update the value on change
                      id={"apply_for_3d_secure"}
                      name="apply_for_3d_secure"
                    />
                    <CustomLabel htmlFor={"apply_for_3d_secure"} />
                  </div>
                )}
              />
            </Col>
            {watch("apply_for_3d_secure") && (
              <Col sm="12" md="6" lg="6" xl="6" className="my-1">
                <Label>If Yes, what MPI 6 will be used?</Label>
                <Controller
                  control={control}
                  name="mpi_used"
                  render={({ field, fieldState }) => (
                    <>
                      <Input
                        {...field}
                        type="text"
                        invalid={fieldState?.error !== undefined}
                      />
                      {fieldState?.error && (
                        <FormFeedback>
                          {fieldState?.error?.message}
                        </FormFeedback>
                      )}
                    </>
                  )}
                />
              </Col>
            )}
            <Col sm="12" md="6" lg="6" xl="6" className="my-1">
              <Label>
                Will you use CVC (Card Verification Code; printed on credit
                card)
              </Label>
              <Controller
                control={control}
                name="card_verification_code"
                render={({ field }) => (
                  <div className="form-switch form-check-primary">
                    <Input
                      type="switch"
                      defaultChecked={field.value} // Set the initial value
                      onChange={(e) => field.onChange(e.target.checked)} // Update the value on change
                      id={"card_verification_code"}
                      name="card_verification_code"
                    />
                    <CustomLabel htmlFor={"card_verification_code"} />
                  </div>
                )}
              />
            </Col>
            <Col sm="12" md="6" lg="6" xl="6" className="my-1">
              <Label>
                Would you like to apply for AVS (Address Verification)
              </Label>
              <Controller
                control={control}
                name="apply_for_avs"
                render={({ field }) => (
                  <div className="form-switch form-check-primary">
                    <Input
                      type="switch"
                      defaultChecked={field.value} // Set the initial value
                      onChange={(e) => field.onChange(e.target.checked)} // Update the value on change
                      id={"apply_for_avs"}
                      name="apply_for_avs"
                    />
                    <CustomLabel htmlFor={"apply_for_avs"} />
                  </div>
                )}
              />
            </Col>
            <Col sm="12" md="12" lg="12" xl="12" className="my-1 d-flex justify-content-between">
              <Button.Ripple
                onClick={() => previous()}
                color="secondary"
                outline
              >
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
      </CardBody>
    </Card>
  );
};

export default SecurityMeasure;
