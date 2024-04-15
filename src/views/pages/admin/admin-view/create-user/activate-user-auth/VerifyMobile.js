import { useState, useEffect, useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Form,
  Button,
  Card,
  CardBody,
  CardTitle,
  CardText,
  FormFeedback,
} from "reactstrap";

import useJwt from "@src/auth/jwt/useJwt";


//** Third Party Input
import OTPInput from "otp-input-react";

//** Img 
import Messages from "../../../../authentication/two-step-verification/SVG/Messages.gif";

// ** param
import {useParams} from 'react-router-dom'


// const parent = {
//   display: "flex",
//   justifyContent: "center",
//   position: "relative",
// };

// const timer = {
//   alignSelf: "center",
//   fontSize: "1rem",
//   position: "absolute",
// };




const VerifyMobile = ({setVerify}) => {
  const {
    control,
    setError,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ });

 // ** Params HOOK
const {uid,token} = useParams();


  //** State
  const [counter,setCounter]=useState(30)
  const [fetchTime,setFetchTime]=useState(0)
  const [errorOTP,setErrorOTP]=useState('')
  const [resendBtn,setResendBtn]=useState(false)
  const [callBtn,setCallBtn]=useState(false)

  
// console.log(uid)
    
    const onCallOTP = () => {
      // useJwt
      // .login({ email: data.loginEmail, password: data.password, attempt: 3 })
      // .then((res) => {
      //   if (res.status === 200) {
      //     setTokenVal(res.data.token);
      //     setCounter(30)
      //   }
      // })
      
      // .catch((err) => {
      //   if ( err?.response?.status === 403) {
          
      //   }
      //   if (err && err.response && err.response.status === 429) {
      //     alert("your maximum login attempt exceed");
      //   }
      // });
    };

    // console.log(uid)
    
    
    const onResendOTP = () => {
      console.log({uid,"attempt": 1})
      useJwt
      .resendOTPForreset({uid,"attempt": 1})
      .then((res) => {
        if (res.status === 200) {
          setCounter(30)
        }
      })
      .catch((err) => {
        if (err && err.response && err.response.status === 403) {
          setErrorOTP(err?.response.detail)
        }
        if (err && err.response && err.response.status === 429) {
          return alert("your maximum login attempt exceed");
        }
      });
    };


  const onSubmit = (data) => {
// console.log({...data,token,uid});
    if (Object.values(data).every((field) => field?.length > 0)) {
      data.otp=parseInt(data.otp)
      useJwt
      .verifynumberforactivation(uid,token,{...data,token,uid})
      .then((res) => {
        // setLocalHost(res);
        setVerify(true)
        })
        .catch((err) => {
          if ( err?.response && err?.response.status === 403) {
            setErrorOTP(err && err.response.detail)
          }
          setErrorOTP(err?.response.detail)
        });
    } else {
setErrorOTP('pleas enter 6 digite code')
    }

  };

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => {
        setCounter((x) => x - 1)
        setFetchTime(x=>x+1)
      }, 1000);
    return () => clearInterval(timer);
  }, [counter]);

  useEffect(()=>{
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

   <Card className="w-100" style={{minHeight:"100%" }}>
   <CardBody>
        <div className="d-flex justify-content-center">
          <img src={Messages} alt="this slowpoke moves" width="150" />
        </div>
          <CardTitle tag="h2" className="fw-bolder mb">
            Verify Your Mobile Number 💬
          </CardTitle>
          <CardText className="mb-75">
            We have sent a verification code to your mobile. Enter the code from
            the mobile in the field below.
          </CardText>
          <Form className="mt-2" onSubmit={handleSubmit(onSubmit)}>
            <h6>Type your 6 digit security code</h6>
            
            <CardText className="fw-bold text-danger">{errorOTP}</CardText>
            <div className="d-flex justify-content-center otpinput mb-1 mt-2">
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
                { errors.otp ? (
                  <FormFeedback>{errors.otp.message}</FormFeedback>
                ) : null}
            </div>
            <Button block type="submit" color="primary">
              Verify
            </Button>
            <p className="text-center mt-2">
              <span>Didn’t get the code?</span>{" "}
            </p>

             <span className="d-flex justify-content-between">
              {/* <span  style={{transition:"all 0.5s" , opacity:resendBtn?'1':'0'}}> */}
              <Button.Ripple
                onClick={onResendOTP}
                className="btn-sm"
                color="info"
                outline
                disabled={fetchTime>30 && true}
              >
                Resend
              </Button.Ripple>
              {/* </span> */}
              <span style={{transition:"all 0.5s" , opacity:callBtn?'1':'0'}}>
              <Button.Ripple
                onClick={onCallOTP}
                className="btn-sm"
                color="warning"
                outline
                // disabled={fetchTime>60 && true}
              >
                Call Now
              </Button.Ripple>
              </span>
            </span>
          </Form>


        <div
          className="mb-1 border  position-relative mt-2"
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

export default VerifyMobile;

