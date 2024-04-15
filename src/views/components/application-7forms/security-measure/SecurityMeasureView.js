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
} from "reactstrap";

import { Controller, useForm } from "react-hook-form";

const SecurityMeasure = (props) => {
  const { setpper, data } = props;
  const [defaultData, setDefaultData] = useState({});
  const {
    control,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: defaultData });
  // ** States
  const [showMPI, setShowMPI] = useState(false);
  const [loader, setLoader] = useState(false);
  const [isAccepted, setAccepted] = useState(true);

  useEffect(() => {
    setDefaultData(data);
    reset(data);
  }, [reset,data]);
  return (
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
                  disabled={isAccepted}
                  control={control}
                  name="chargeback_handling"
                  type="textarea"
                  invalid={errors.chargeback_handling && true}
                  {...field}
                />
              )}
            />
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
                      disabled={isAccepted}
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
                <>
                  <Input
                    disabled={isAccepted}
                    control={control}
                    name="mpi_used"
                    type="text"
                    invalid={errors.mpi_used && true}
                    {...field}
                  />
                </>
              )}
            />
          </Col>
          <Col sm={12} md={6} className="mb-1">
            <Label className="form-label" for="card_verification_code">
              Will you use CVC (Card Verification Code; printed on credit card)
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
                      disabled={isAccepted}
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
                      disabled={isAccepted}
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
          color="secondry btn-outline-secondary"
          onClick={() => setpper("previous")}
        >
          Previous
        </Button>
        <Button color="primary" onClick={() => setpper("next")}>
          Next
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SecurityMeasure;
