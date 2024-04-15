import { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
  Row,
  Label,
  Input,
  Button,
  Spinner,
  FormFeedback,
} from "reactstrap";

import { Controller, useForm } from "react-hook-form";

import useJwt from "@src/dashboard/jwt/useJwt";

const SecurityMeasure = (props) => {
  const { next, application_id } = props;
  const [defaultData, setDefaultData] = useState({});
  const {
    control,
    setError,
    reset,
    handleSubmit,
    formState: { errors },
clearErrors
  } = useForm({ defaultValues: defaultData });
  // ** States
  const [showMPI, setShowMPI] = useState(false);
  const [loader, setLoader] = useState(false);
  const [callGet, setCallGet] = useState(false);

  const post = (data) => {
    data.application_id = localStorage.getItem("application_id");
    useJwt
      .postsecuritymeasures(data)
      .then((res) => {
        if (res.status == 201) {
          next("5");
          setLoader(false);
        }
      })
      .catch((err) => {
        console.log(err.response)
          setLoader(!loader)
      });
      
  };
  const update = (data) => {
    useJwt
      .putsecuritymeasures(data.uid, data)
      .then((res) => {
        if (res.status === 200) {
          next("5");
          setLoader(false);
        }
      })
      .catch((err) => {
        alert(err?.response?.status);
        setLoader (false);
      });
  };

  const onSubmit = (data) => {
    data.application_id = localStorage.getItem("application_id");
    setLoader(true);
    if (!data.uid) {
      post(data);
    } else {
      update(data);
    }
  };
  useEffect(() => {
    let id;
    if (application_id) id = application_id;
    else id = "";
    useJwt.getsecuritymeasures({ application_id: id }).then((res) => {
      // {{debugger}}
      if (res.status === 200) {
        setDefaultData(res.data[0]);

        reset(res.data[0]);
      }
    });
  }, [reset, callGet]);
  const checkCharLength = (char, min, name) => {
    if (char?.length > min)
      setError(name, {
        type: "custom",
        message: `value must be lesser than ${min}`,
      });
    else clearErrors(name);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Card className="application-container">
        <CardHeader>
          <div className="content-header">
            <h5 className="card-title">Security Measure</h5>
            <small className="text-muted">Enter Security Details</small>
          </div>
        </CardHeader>

        <CardBody>
          <Row>
            <Col sm={12} md={6} className="mb-1">
              <Label className="form-label" htmlFor="chargeback_handling">
                Describe ALL security measures AND fraud/chargeback handling (in
                detail)
              </Label>
              <Controller
                id="chargeback_handling"
                name="chargeback_handling"
                control={control}
                render={({ field }) => (
                  <Input
                  {...field}
                    control={control}
                    name="chargeback_handling"
                    type="textarea"
                    invalid={errors.chargeback_handling && true}
                    onChange={(e) => {
                      checkCharLength(e.target.value, 30, field.name);
                      field.onChange(e.target.value);
                    }}
                  />
                )}
              />
              {errors.chargeback_handling ? (
                <FormFeedback>
                  {errors.chargeback_handling.message}
                </FormFeedback>
              ) : null}
            </Col>
            <Col sm={12} md={6} className="mb-1">
              <Label className="form-label" htmlFor="apply_for_3d_secure">
                Would you like to apply for 3D Secure (MasterCard SecureCode,
                VerifiedByVisa)
              </Label>
              <br />
              <Controller
                id="apply_for_3d_secure"
                name="apply_for_3d_secure"
                control={control}
                render={({ field: { value, onChange } }) => {
                  if (value) {
                    setShowMPI(true);
                  } else {
                    setShowMPI(false);
                  }
                  return (
                    <div className="form-switch form-check-primary">
                      <Input
                        type="switch"
                        name="icon-primary"
                        onChange={onChange}
                        checked={value}
                      />
                    </div>
                  );
                }}
              />
            </Col>
            <Col
              sm={12}
              md={6}
              className={`mb-1 ${showMPI ? "d-block" : "d-none"}`}
            >
              <Label className="form-label" htmlFor="mpi_used">
                If Yes, what MPI 6 will be used?
              </Label>
              <Controller
                id="mpi_used"
                name="mpi_used"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    invalid={errors.mpi_used && true}
                    onChange={(e) => {
                      checkCharLength(e.target.value, 30, field.name);
                      field.onChange(e.target.value);
                      
                    }}
                  />
                )}
              />
              {errors.mpi_used ? (
                <FormFeedback>{errors.mpi_used.message}</FormFeedback>
              ) : null}
            </Col>
            <Col sm={12} md={6} className="mb-1">
              <Label className="form-label" for="card_verification_code">
                Will you use CVC (Card Verification Code; printed on credit
                card)
              </Label>
              <br />
              <Controller
                id="card_verification_code"
                name="card_verification_code"
                control={control}
                render={({ field: { value, onChange } }) => {
                  return (
                    <div className="form-switch form-check-primary">
                      <Input
                        type="switch"
                        name="icon-primary"
                        onChange={onChange}
                        checked={value}
                      />
                    </div>
                  );
                }}
              />
            </Col>
            <Col sm={12} md={6} className="mb-1">
              <Label className="form-label" for="like_apply_AVS">
                Would you like to apply for AVS (Address Verification)
              </Label>
              <br />
              <Controller
                id="apply_for_avs"
                name="apply_for_avs"
                control={control}
                render={({ field: { value, onChange } }) => {
                  return (
                    <div className="form-switch form-check-primary">
                      <Input
                        type="switch"
                        name="icon-primary"
                        onChange={onChange}
                        checked={value}
                      />
                    </div>
                  );
                }}
              />
            </Col>
          </Row>
        </CardBody>
        <CardFooter className="d-flex justify-content-between mt-3">
          <Button
            onClick={() => next("3")}
            color="secondry btn-outline-secondary"
          >
            <span className="align-middle d-sm-inline-block d-none">
              Previous
            </span>
          </Button>
          <div>
            <button
              color="primary"
              className={`btn-next ${loader ? "d-none" : "d-block"}`}
              type="submit"
            >
              Next
            </button>
            <button
              color="primary"
              className={`btn-next ${loader ? "d-block" : "d-none"}`}
              type="submit"
              disabled
            >
              <Spinner size={"md"} />
            </button>
          </div>
        </CardFooter>
      </Card>
    </Form>
  );
};

export default SecurityMeasure;
