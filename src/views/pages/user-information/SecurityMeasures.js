import { useEffect, useState } from "react";
import { Label, Button, Form, Input, FormGroup } from "reactstrap";
import useJwt from "@src/dashboard/jwt/useJwt";
import { Controller, useForm } from "react-hook-form";
const SecurityMeasures = ({ stepper, setCounter, counter }) => {
  const [defaultData, setDefaultData] = useState({});
  const {
    control,
    setError,
    reset,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ defaultValues: defaultData });

  const [showMPI, setShowMPI] = useState(false);

  useEffect(() => {
    useJwt.getsecuritymeasures().then((res) => {
      if (res.status === 200) {
        setDefaultData(res.data[0]);

        reset(res.data[0]);
      }
    });
  }, [reset, counter]);
  const onSubmit = (data) => {
    if (data.uid === undefined) {
      data.application_id = localStorage.getItem("application_id");
      useJwt
        .postsecuritymeasures(data)
        .then((res) => {
          if (res.status == 201) {
            stepper.next();
            setCounter(counter + 1);
          }
        })
        .catch((err) => console.log(err.response));
    } else {
      useJwt
        .putsecuritymeasures(data.uid, data)
        .then((res) => {
          if (res.status === 200) {
            stepper.next();
            setCounter(counter + 1);
          }
        })
        .catch((err) => console.log(err.massage));
    }
  };
  const HideShow = {
    display: showMPI ? "block" : "none",
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div
        className="mb-3"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <h1 className="text-primary" style={{ fontWeight: "bold" }}>
          Security Measures
        </h1>
      </div>
      <div className="container_none">
        <div className="row">
          <div className="col-sm-6">
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
                  control={control}
                  name="chargeback_handling"
                  type="textarea"
                  invalid={errors.chargeback_handling && true}
                  {...field}
                  required
                ></Input>
              )}
            />
          </div>
          <div className="col-sm-6">
            {" "}
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
          </div>
          <div className="col-sm-6" style={HideShow}>
            {" "}
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
                    control={control}
                    name="mpi_used"
                    type="text"
                    invalid={errors.mpi_used && true}
                    {...field}
                  ></Input>
                  <p>(leave field empty if unknown)</p>
                </>
              )}
            />
          </div>
          <div className="col-sm-6">
            {" "}
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
                      type="switch"
                      name="icon-primary"
                      onChange={onChange}
                      checked={value}
                    />
                  </div>
                );
              }}
            />
          </div>
          <div className="col-sm-6">
            {" "}
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
          </div>
        </div>
        {/* remove aboutyou for */}
      </div>
      <div
        className="mt-2 mb-b  d-flex justify-content-end  "
        style={{ width: "90%", alignContent: "end" }}
      >
        <Button
          color="secondry btn-outline-secondary"
          onClick={() => {
            stepper.previous();
            setCounter(counter + 1);
          }}
        >
          Previouse
        </Button>

        <Button type="submit" color="primary ms-2">
          Next
        </Button>
      </div>
    </Form>
  );
};
export default SecurityMeasures;
