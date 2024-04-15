// ** React Imports
import { useEffect, useState } from "react";

import { Controller, useForm } from "react-hook-form";

import useJwt from "@src/auth/jwt/useJwt";
// ** Reactstrap Imports
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Button,
  Form,
  Input,
  Row,
  Label,
  Col,
  UncontrolledTooltip,
  Tooltip,
} from "reactstrap";

import {  Edit } from "react-feather";

import mobileVerify from "../two-step-verification/SVG/Messages.gif";

import OTPInput from "otp-input-react";

import country_code from "../../../../country_code.json";

import ReactCountryFlag from "react-country-flag";

import Select from "react-select";


const TwoStepsBasic = ({ user, userEmail ,setIsMobileVerify}) => {
  //** Store Email and Mobile



  const [email, setEmail] = useState(userEmail && userEmail);
  const [currentMobile, setCurrentMobile] = useState(
    user && user.countryCode + user.mobile
  );
  const [updatMobileNumber, setUpdatedNumber] = useState(user && user.mobile);
  const [countryCode, setCountryCode] = useState(user && user.countryCode);

  //** Tooltip Toggle
  const [tooltipOpen, setTooltipOpen] = useState(false);

  //** ToggleInput
  const [toggleInput, setToggleInput] = useState(true);

  //**
  const [errorMassageMobileNumber, setErrorMassageMobileNumber] = useState("");

  /*
requird:data;
1:email,
2:number

*/
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [counter, setCounter] = useState(30);
  const [error, setErrors] = useState("");

  //Verify Number
  const onSubmit = (data) => {
    
    useJwt
    .verifyPhone({
      mobile: currentMobile,
      email: userEmail,
      otp: parseInt(data.otp),
    })
    .then((res) => {
      if (res.status === 202) {
          // setIsMobileVerify(true);
          setIsMobileVerify(true);
        }
      })
      .catch((err) => {
        if (err && err.response.status === 403)
          setErrors(err.response.data.detail);

      });
    console.log(data);
  };

  //** Resend OTP
  const resendOtp = () => {


    useJwt
      .resendOTPOnMassage({ mobile: currentMobile, email: userEmail })
      .then((res) => {
        setCounter(30);

      })
      .catch((err) => {
      });
  };
// console.log(userEmail)
  //** onCall Otp
  const onCallOtp = () => {
    useJwt
      .resendOTPOnCall({
        mobile: currentMobile,
        email: userEmail,
      })
      .then((res) => {
        if (res.status === 200) {
          setCounter(30);
        }
      })

      .catch((err) => {
        err.response.data;
      });
  };
  //** Country Setup
  const country = country_code.map((data, idx) => {
    return {
      value: data.dial_code,
      label: ` ${data.code}`,
      name: data.name,
      flag: <ReactCountryFlag countryCode={data.code} svg />,
    };
  });

  const formOptionLabel = ({ value, label, name, flag }) => {
    return (
      <div style={{ display: "flex" }}>
        <div style={{ marginLeft: "10px" }}>
          {flag} {label} {value}
        </div>
      </div>
    );
  };
  //** Edit Number
  const changeNumber = () => {

    useJwt
      .changeMobileNo({
        old_mobile: currentMobile,
        new_mobile: countryCode + updatMobileNumber,
        email: userEmail,
      })
      .then((res) => {
        if (res.status === 202) {
          setToggleInput(true);
          setCurrentMobile(res.data.new_mobile);
          setErrorMassageMobileNumber("");
          setCounter(30)
        }
      })
      .catch((err) => {

        console.log(err.response);
        setErrorMassageMobileNumber(err.response.data.mobile);
      });
  };

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter((x) => x - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);



  return (
    <Card className="h-100 w-100">
      
      <CardBody>
        <div className="d-flex justify-content-center">
          <img src={mobileVerify} alt="this slowpoke moves" width="150" />
        </div>

        <span>
          <CardTitle tag="h2" className="fw-bolder mb-1">
            Verify Your Mobile Number 💬
          </CardTitle>
          <CardText className="mb-75">
            We have sent a verification code to your mobile. Enter the code from
            the mobile in the field below.
          </CardText>
          <Row>
            <Col
              className="mb-1"
              sm={"12"}
              style={{
                transition: "all 2s",
              }}
            >
              <span className="d-flex align-items-baseline">
                <Label className="form-label w-100" for="disabledInput">
                  Mobile
                </Label>
                <Button.Ripple
                  id="Edit-Icon"
                  className="btn-icon rounded-circle"
                  color="flat-success"
                  onClick={() => setToggleInput(!toggleInput)}
                >
                  <Edit size={16} />
                </Button.Ripple>
                <Tooltip
                  isOpen={tooltipOpen}
                  placement="top"
                  target="Edit-Icon"
                  toggle={() => {
                    setTooltipOpen(!tooltipOpen);
                  }}
                >
                  Edit
                </Tooltip>
              </span>
              <CardText className="text-danger">
                {errorMassageMobileNumber}
              </CardText>
              <Row gap={0}>
                <Col sm={"4"}>
                  <span className={`${toggleInput ? "d-none" : "d-block"}`}>
                    <Select
                      options={country}
                      defaultValue={country[0]}
                      formatOptionLabel={formOptionLabel}
                      onChange={(e) => setCountryCode(e.value)}
                      isDisabled={toggleInput}
                    />
                  </span>
                  <span className={`${!toggleInput ? "d-none" : "d-block"}`}>
                    <Input value={countryCode} disabled />
                  </span>
                </Col>
                <Col sm={"8"}>
                  <Input
                    id="mobile"
                    defaultValue={updatMobileNumber}
                    type="text"
                    disabled={toggleInput}
                    onChange={(e) => {
                      setUpdatedNumber(e.target.value);
                    }}
                  />
                </Col>
              </Row>
              <span className={`${!toggleInput ? "d-block" : "d-none"}`}>
                <Button
                  color="gradient-primary"
                  className="btn-sm mt-1"
                  onClick={changeNumber}
                >
                  Update
                </Button>
              </span>
            </Col>
          </Row>
          <Form className="mt-2" onSubmit={handleSubmit(onSubmit)}>
            <h6>Type your 6 digit security code</h6>
            <CardText className="fw-bold text-danger">{error}</CardText>
            <div className=" otpinput me-1 mt-2 mb-2">
              <Controller
                className="otp_input_login_verification"
                name="otp"
                control={control}
                render={({ field }) => (
                  <OTPInput

                    autoFocus
                    OTPLength={6}
                    otpType="number"
                    invalid={errors.otp && true}
                    {...field}
                  />
                )}
              />
            </div>
            <Button block type="submit" color="primary">
              Verify
            </Button>
            <p className="text-center mt-2">
              <span>Didn’t get the code?</span>{" "}
            </p>
            <span className="d-flex justify-content-between">
              <Button.Ripple
                onClick={resendOtp}
                className="btn-sm"
                color="info"
                outline
              >
                Resend
              </Button.Ripple>
              <Button.Ripple
                onClick={onCallOtp}
                className="btn-sm"
                color="warning"
                outline
              >
                Call Now
              </Button.Ripple>
            </span>
          </Form>
        </span>

        <div
          className="mb-1 position-relative mt-2"
          style={{ display: "grid", placeItems: "center" }}
        >
          <img
            className="child-1"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSeLai2FZHsPuxQ0tR9sNiTBuBCC8MqxS9NucqUWeGQcKyK7QrrPVeediNNbw0nc01L8A&usqp=CAU"
            alt=""
            style={{ width: "50px" }}
          />
          <label id="seconds" className="position-absolute">
            {counter < 10 ? `0${counter}` : counter}
          </label>
        </div>
      </CardBody>
    </Card>
  );
};

export default TwoStepsBasic;
