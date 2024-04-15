// ** React Imports
import { useEffect, useState } from "react";

import { Controller, set, useForm } from "react-hook-form";

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


const TwoStepsBasic = ({ user,setIsMobileVerificationDone}) => {

// const [user]

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

  //Timer
  const [counter, setCounter] = useState(30);

  //** Error set BE
  const [error, setErrors] = useState("");

//** Button Reqiure Resend or Call
const [fetchTime,setFetchTime]=useState(0)
const [resendBtn ,setResendBtn]=useState(false)
const [callBtn ,setCallBtn]=useState(false)





  //Verify Number
  const onSubmit = (data) => {
    // seIsMobileVerificationDone(true);
    useJwt
    .verifyPhone({
      mobile: user.phone_no,
      email: user.email_id,
      otp: parseInt(data.otp),
    })
    .then((res) => {
      if (res.status === 202) {
        setIsMobileVerificationDone(true);
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
      .resendOTPOnMassage({ mobile: user?.phone_no[0], email: user?.email_id[0] })
      .then((res) => {
        setCounter(30)
      })
      .catch((err) => {
        alert(err?.response.detail)
      });
  };
  //** onCall Otp
  const onCallOtp = () => {
    useJwt
      .resendOTPOnCall({
        mobile: user?.phone_no[0],
        email: user?.email_id[0],
      })
      .then((res) => {
        if (res?.status === 202) {
          setCounter(30);
        }
      })

      .catch((err) => {
        alert(err?.response.data)
      });
  };

let phone_no=user?.phone_no.split('').slice(user?.phone_no[0].length-3,user?.phone_no.length).join('')

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => {
        setCounter((x) => x - 1)
        setFetchTime(x=>x+1)
      }, 1000);
    return () => clearInterval(timer);
  }, [counter]);

  //** Button hidden show
  useEffect(()=>{
// console.log({timer:fetchTime,resendBtn:resendBtn,callBtn:callBtn})
    if((fetchTime>=29) && (fetchTime<60))setResendBtn(true);
     else if((fetchTime>=60) && (fetchTime<90)){
      setResendBtn(false) 
      setCallBtn(true)
    }else{
      setResendBtn(false)
      setResendBtn(false)
    }
  },[fetchTime])



  return (
    <Card className="h-100 w-100 ">
      
      <CardBody>
        <div className="d-flex justify-content-center">
          <img src={mobileVerify} alt="this slowpoke moves" width="150" />
        </div>


          <CardTitle tag="h2" className="fw-bolder mb-1">
            Verify Your Mobile Number 💬
          </CardTitle>
          <CardText className="mb-75">
            We have sent a verification code to your mobile. Enter the code from
            the mobile in the field below.
          </CardText>
          <CardText className="fw-bolder text-primary">
          {`*********${phone_no}`}
          </CardText>
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
              <span  style={{transition:"all 0.5s" , opacity:resendBtn?'1':'0'}}>
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
              <span style={{transition:"all 0.5s" , opacity:callBtn?'1':'0'}}>
              <Button.Ripple
                onClick={onCallOtp}
                className="btn-sm"
                color="warning"
                outline
                disabled={fetchTime>60 && true}
              >
                Call Now
              </Button.Ripple>
              </span>
            </span>
          </Form>


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
