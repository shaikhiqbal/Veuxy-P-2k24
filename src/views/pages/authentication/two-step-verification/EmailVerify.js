// ** React Imports
import { useEffect, useState } from "react";

import { Controller, useForm } from "react-hook-form";

import { Edit } from "react-feather";

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
  Label,
  Row,
  Col,
  Tooltip,
} from "reactstrap";

import emailGig from "../two-step-verification/SVG/LogInVerification.gif";

import OTPInput from "otp-input-react";

const TwoStepsBasic = ({ user, setIsEmailVerificationDone }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();



  //** Verification Timer
  const [counter, setCounter] = useState(30);

  //** Error Message
  const [errorsSubmit, setErrorsSubmit] = useState("");

  //** Button Reqiure Resend or Call
  const [fetchTime,setFetchTime]=useState(0)
  const [resendBtn ,setResendBtn]=useState(false)

  const onSubmit = (data) => {
    useJwt
    .verifyEmail({ otp: parseInt(data.otp), email: user?.email_id[0] })
    .then((res) => {
      // console.log({ isEmailVerified: res.status });
      if (res?.status === 202) {
        setIsEmailVerificationDone(true);
      }
      })
      .catch((err) => {
        if (err?.response.status === 403)
        setErrorsSubmit(err.response.data.detail);
      });
  };

  //** Resend Otp Event
  const resendOtp = () => {
    useJwt
      .resendOTPOnEmail({ email: user?.email_id[0] })
      .then((res) => {

        setCounter(30);
      })
      .catch((err) => {});
  };


//** Otp Timmer
useEffect(() => {

  const timer =
    counter > 0 &&
    setInterval(
      () => {
        setCounter(x => x-1)
        setFetchTime(x => x+1)
      },
      1000
    );
  return () => clearInterval(timer);
}, [counter]);

//** Button hidden show
useEffect(()=>{
  if((fetchTime>=29) && (fetchTime<60))setResendBtn(true);
   else setResendBtn(false) 
},[fetchTime])

  return (
    <Card className="h-100 w-100 ">
      <CardBody>
        <div className="d-flex justify-content-center">
          {/* <EmailVerify width={"200px"} /> */}
          <img src={emailGig} alt="this slowpoke moves" width="150" />
        </div>
        <span>
          <CardTitle tag="h2" className="fw-bolder mb-1">
            Verify Your Email Address 💬
          </CardTitle>
          <CardText className="mb-75">
            We have sent a verification code to your e-mail. Enter the code from
            the e-mail in the field below.
          </CardText>
<CardText className="fw-bolder text-primary">{user?.email_id[0]}</CardText>

          <Form className="mt-2" onSubmit={handleSubmit(onSubmit)}>
            <h6>Type your 6 digit security code</h6>
            <CardText className="fw-bold text-danger">{errorsSubmit}</CardText>
            <div className="auth-input-wrapper me-1 mt-2 mb-2">
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
          </Form>
          <p className="text-center mt-2">
            <span>Didn’t get the code?</span>{" "}
          </p>
        </span>
        <span className="d-flex justify-content-end"
        style={{transition:"all 0.5s" , opacity:resendBtn?'1':'0'}}
        >
          <Button.Ripple
            onClick={resendOtp}
            className="btn-sm"
            color="info"
            outline
            disabled={fetchTime>30 && true}
          >
            Resend
          </Button.Ripple>
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
