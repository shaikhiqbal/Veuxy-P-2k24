// ** React Imports
import { Link, useNavigate, useParams } from "react-router-dom";

// ** Icons Imports
import { ChevronLeft } from "react-feather";

// ** Custom Components
import InputPasswordToggle from "@components/input-password-toggle";

// ** Reactstrap Imports
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Form,
  Label,
  Button,
} from "reactstrap";

//** third party
import { useForm, Controller } from "react-hook-form";

// ** Styles
import "@styles/react/pages/page-authentication.scss";

// ** jWt
import useJwt from "@src/auth/jwt/useJwt";

//** Third Party Input
import OtpInput from "otp-input-react";

//** Custom Style
import "./Auth.css";

//** ResetPassword Modal
import ResetPasswordModal from "./ResetPasswordModal";
import { useEffect, useState } from "react";

const ResetPasswordBasic = () => {
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { uid, token } = useParams();
  const [open, setOpen] = useState(false);

  const [counter, setCounter] = useState(30);
  const navigate=useNavigate()


   //** Button Reqiure Resend or Call
const [fetchTime,setFetchTime]=useState(0)
const [resendBtn ,setResendBtn]=useState(false)
const [callBtn ,setCallBtn]=useState(false)


  const onSubmit = (data) => {
    
    const {password,otp,confirm_password} = data;
    useJwt.changePassword(uid, token, {password:password,confirm_password:confirm_password,otp:parseInt(otp)}).then((res) => {
      if (res.status === 202) {
        navigate('/login')
      }
    });
  };
  
  const onResendOTP = () => {
    setCounter(30)
    useJwt
    .resetPasswordOtpRese({ uid,attempt:1,})
    .then((res) => {
      if (res.status === 200) {
        setTokenVal(res.data.token);
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

  const onCallOTP = () => {
    useJwt
    .login({ email: data.loginEmail, password: data.password, attempt: 2 })
    .then((res) => {
      if (res.status === 200) {

        setCounter(30)
      }
    })
    
    .catch((err) => {
      if ( err?.response?.status === 403) {
        
      }
      if (err && err.response && err.response.status === 429) {
        alert("your maximum login attempt exceed");
      }
    });
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
    <div className="auth-wrapper auth-basic px-2">
      <ResetPasswordModal open={open} />
      <div className="auth-inner my-2">
        <Card className="mb-0">
          <CardBody>
            <CardTitle tag="h4" className="mb-1">
              Reset Password 🔒
            </CardTitle>
            <CardText className="mb-2">
              Your new password must be different from previously used passwords
            </CardText>
            <Form
              className="auth-reset-password-form mt-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div id="resetPassword" className="mb-1">
                <Label className="form-label" for="new-password">
                  Verify Mobile number
                </Label>

                <Controller
                  id="otp"
                  name="otp"
                  control={control}
                  render={({ field }) => (
                    <OtpInput
                      autoFocus={true}
                      OTPLength={6}
                      className="input-group-merge"
                      invalid={errors.otp && true}
                      {...field}
                    />
                  )}
                />

                  <span className="d-flex justify-content-between mt-2">
              <span  style={{transition:"all 0.5s" , opacity:resendBtn?'1':'0'}}>
              <Button.Ripple
                onClick={onResendOTP}
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
                onClick={onCallOTP}
                className="btn-sm"
                color="warning"
                outline
                disabled={fetchTime>60 && true}
              >
                Call Now
              </Button.Ripple>
              </span>
            </span>
                </div>
              <div className="mb-1">
                <Label className="form-label" for="new-password">
                  New Password
                </Label>
                <Controller
                  defaultValue=""
                  id="password"
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <InputPasswordToggle
                      className="input-group-merge"
                      invalid={errors.password && true}
                      {...field}
                    />
                  )}
                />
              </div>
              <div className="mb-1">
                <Label className="form-label" for="confirm-password">
                  Confirm Password
                </Label>
                <Controller
                  defaultValue=""
                  id="confirm_password"
                  name="confirm_password"
                  control={control}
                  render={({ field }) => (
                    <InputPasswordToggle
                      className="input-group-merge"
                      invalid={errors.confirm_password && true}
                      {...field}
                    />
                  )}
                />
              </div>
              <Button color="primary" type="submit" block>
                Set New Password
              </Button>
            </Form>
            <p className="text-center mt-2">
              <Link to="/pages/login-basic">
                <ChevronLeft className="rotate-rtl me-25" size={14} />
                <span className="align-middle">Back to login</span>
              </Link>
            </p>
          </CardBody>
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

        </Card>
      </div>
    </div>
  );
};

export default ResetPasswordBasic;
