// ** React Imports
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// ** Custom Hooks
import { useSkin } from "@hooks/useSkin";
import useJwt from "@src/auth/jwt/useJwt";

import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";

// location action
import { fetchLocation } from "@store/location";

// ** Context
import { AbilityContext } from "@src/utility/context/Can";

// ** Custom Components
import InputPasswordToggle from "@components/input-password-toggle";

import ReCAPTCHA from "react-google-recaptcha";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Form,
  Input,
  Label,
  Alert,
  Button,
  CardText,
  CardTitle,
  Spinner,
  FormFeedback,
} from "reactstrap";

// ** VerifyEmail
import LogInVerfication from "./LogInVerification";

//** Mobile Registration
import MobileRegistration from "./MobileRegistration";

//**  Verify Mobile And Password
import VerifyMobileAndEmail from "./VerifyMobileAndEmail";

// ** Styles
import "@styles/react/pages/page-authentication.scss";

// ** Third Party Components
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const Login = () => {
  // ** Hooks
  const { skin } = useSkin();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { lat, long, isDenied, message } = useSelector(
    (stata) => stata.location
  );
  const ability = useContext(AbilityContext);
  const [open, setOpen] = useState(false);
  const [token, setToken] = useState("");
  const [BEError, setBEError] = useState("");
  const [resend, setResend] = useState(0);
  const [formdata, setFormData] = useState({});
  const [hiddenStatus, setHiddenStatus] = useState(false);
  const [recaptchaBoolean, setRecaptchaBoolean] = useState(false);
  const [mobilerRegister, setMobileRegister] = useState(false);
  const [errorBe, setErrorBe] = useState("");
  const [notVerified, setNotVerified] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [error400, setError400] = useState({});
  const [tempOTP, setTempOTP] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const illustration = skin === "dark" ? "login-v2-dark.svg" : "login-v2.svg",
    source = require(`@src/assets/images/pages/${illustration}`).default;

  function onChange(value) {
    value.length > 0 && setRecaptchaBoolean(false);
  }

  const handleError = () => {
    return MySwal.fire({
      title: "Attempt Excideed!",
      text: "You'r max attempt excided pleas click the forgot password link and genrate a new password",
      icon: "error",
      customClass: {
        confirmButton: "btn btn-primary",
      },
      buttonsStyling: false,
    });
  };

  const onSubmit = async (data) => {
    // {{debugger}}

    if (resend >= 3) {
      return handleError();
    }
    if (Object.values(data).every((field) => field.length > 0)) {
      const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      await sleep(1000);
      if (Object.values(data).every((field) => field.length > 0)) {
        setFormData({ ...data });
        setHiddenStatus(true);
        data.preventDefault;
        useJwt
          .login({
            email: data.loginEmail,
            password: data.password,
            location: `${lat},${long}`,
            login: true,
          })
          .then((res) => {
            if (res.status === 200) {
              setOpen(!open);
              setTempOTP(res?.data?.code ? res?.data?.code + "" : "");
              setToken(res.data.token);
              setMobileNumber(res.data.user);
            }
          })
          .catch((err) => {
            if (err && err.response && err.response.status === 403) {
              let res_data = err.response.data;
              setBEError(res_data.detail);
              setResend((resend) => resend + 1);
              if (resend == 1) {
                setRecaptchaBoolean(true);
              }
            }
            if (err?.response?.status === 429) {
              alert("your max limite exceeded try some time later");
            }
            if (err?.response?.status === 400) {
              setError400(err?.response?.data);
              setNotVerified(true);
            }
            if (err?.response?.status === 403) {
              setErrorBe(err?.response?.data?.message);
            }
            if (err?.response?.status === 400) {
              setBEError(err?.response?.detail);
            }

            setHiddenStatus(false);
          });
      }
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: "manual",
          });
        }
      }
    }
  };

  const RegisterMobileNumber = () => {
    if (mobilerRegister) {
      return (
        <MobileRegistration
          open={mobilerRegister}
          setMobileRegister={setMobileRegister}
          data={error400}
          email={userEmail}
        />
      );
    }
  };

  const page = () => {
    if (open) {
      return (
        <LogInVerfication
          open={open}
          token={token}
          data={formdata}
          mobile={mobileNumber}
          code={tempOTP}
        />
      );
    }
  };

  const emailAndMobileVerified = (notVerified) =>
    notVerified && (
      <VerifyMobileAndEmail user={error400} isOpen={notVerified} />
    );

  useEffect(() => {
    dispatch(fetchLocation());
  }, []);
  return (
    <div className="auth-wrapper auth-cover">
      {page()}
      {/* {RegisterMobileNumber()} */}
      {notVerified && emailAndMobileVerified(notVerified)}
      <Row className="auth-inner m-0">
        <Link className="brand-logo" to="/" onClick={(e) => e.preventDefault()}>
          <svg viewBox="0 0 139 95" version="1.1" height="28">
            <defs>
              <linearGradient
                x1="100%"
                y1="10.5120544%"
                x2="50%"
                y2="89.4879456%"
                id="linearGradient-1"
              >
                <stop stopColor="#000000" offset="0%" />
                <stop stopColor="#FFFFFF" offset="100%" />
              </linearGradient>
              <linearGradient
                x1="64.0437835%"
                y1="46.3276743%"
                x2="37.373316%"
                y2="100%"
                id="linearGradient-2"
              >
                <stop stopColor="#EEEEEE" stopOpacity="0" offset="0%" />
                <stop stopColor="#FFFFFF" offset="100%" />
              </linearGradient>
            </defs>
            <g
              id="Page-1"
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd"
            >
              <g id="Artboard" transform="translate(-400.000000, -178.000000)">
                <g id="Group" transform="translate(400.000000, 178.000000)">
                  <path
                    d="M-5.68434189e-14,2.84217094e-14 L39.1816085,2.84217094e-14 L69.3453773,32.2519224 L101.428699,2.84217094e-14 L138.784583,2.84217094e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L6.71554594,44.4188507 C2.46876683,39.9813776 0.345377275,35.1089553 0.345377275,29.8015838 C0.345377275,24.4942122 0.230251516,14.560351 -5.68434189e-14,2.84217094e-14 Z"
                    id="Path"
                    className="text-primary"
                    style={{ fill: "currentColor" }}
                  />
                  <path
                    d="M69.3453773,32.2519224 L101.428699,1.42108547e-14 L138.784583,1.42108547e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L32.8435758,70.5039241 L69.3453773,32.2519224 Z"
                    id="Path"
                    fill="url(#linearGradient-1)"
                    opacity="0.2"
                  />
                  <polygon
                    id="Path-2"
                    fill="#000000"
                    opacity="0.049999997"
                    points="69.3922914 32.4202615 32.8435758 70.5039241 54.0490008 16.1851325"
                  />
                  <polygon
                    id="Path-2"
                    fill="#000000"
                    opacity="0.099999994"
                    points="69.3922914 32.4202615 32.8435758 70.5039241 58.3683556 20.7402338"
                  />
                  <polygon
                    id="Path-3"
                    fill="url(#linearGradient-2)"
                    opacity="0.099999994"
                    points="101.428699 0 83.0667527 94.1480575 130.378721 47.0740288"
                  />
                </g>
              </g>
            </g>
          </svg>
          <h2 className="brand-text text-primary ms-1">LockTrust</h2>
        </Link>
        <Col className="d-none d-lg-flex align-items-center p-5" lg="8" sm="12">
          <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
            <img className="img-fluid" src={source} alt="Login Cover" />
          </div>
        </Col>
        <Col
          className="d-flex align-items-center auth-bg px-2 p-lg-5"
          lg="4"
          sm="12"
        >
          <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
            {isDenied && (
              <Col sm="12" className="my-3">
                {" "}
                <Alert color="danger">
                  <div className="alert-body">
                    {message}
                    {/* <a
                      color="flat-primary"
                      onClick={() => dispatch(fetchLocation())}
                    >
                      Click here!
                    </a> */}
                  </div>
                </Alert>
              </Col>
            )}
            <CardTitle
              tag="h2"
              className="fw-bolder mb-1"
              style={{ fontSize: "4rem" }}
            >
              <span className="text-primary">LOCKTRUST!</span>
            </CardTitle>

            <CardText className="mb-2" style={{ fontSize: "1rem" }}>
              Please sign-in to your account and start the adventure
            </CardText>
            <Form
              className="auth-login-form mt-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              <p className="fw-bolder text-danger">{BEError || errorBe} </p>
              <div className="mb-1">
                <Label className="form-label" for="login-email">
                  Email
                </Label>
                <Controller
                  defaultValue=""
                  id="loginEmail"
                  name="loginEmail"
                  control={control}
                  render={({ field }) => (
                    <Input
                      autoFocus
                      type="email"
                      placeholder="john@example.com"
                      invalid={errors.loginEmail && true}
                      {...field}
                    />
                  )}
                />
              </div>
              {errors.email ? (
                <FormFeedback>{errors.email.message}</FormFeedback>
              ) : null}
              <div className="mb-1">
                <div className="d-flex justify-content-between">
                  <Label className="form-label" for="login-password">
                    Password
                  </Label>
                  <Link to="/forgot-password">
                    <small>Forgot Password?</small>
                  </Link>
                </div>
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
              {errors.password ? (
                <FormFeedback>{errors.password.message}</FormFeedback>
              ) : null}
              <div className="form-check mb-2">
                <Input type="checkbox" id="remember-me" />
                <Label className="form-check-label" for="remember-me">
                  Remember Me
                </Label>
              </div>
              <ReCAPTCHA
                style={{ display: resend >= 2 ? "block" : "none" }}
                sitekey="6LddPxUiAAAAAMyZD73j0-JGMiBBbnTrEhruNsXV"
                onChange={onChange}
              />

              <Button
                type="submit"
                color="primary"
                block
                // disabled={recaptchaBoolean||isDenied}
              >
                Sign in{" "}
                <Spinner
                  color="light"
                  size="sm"
                  style={{ visibility: hiddenStatus ? "visible" : "hidden" }}
                >
                  Loading...
                </Spinner>
              </Button>
            </Form>

            <div>
              {" "}
              <p className="text-center mt-2">
                <span className="me-25">New our platform?</span>
                <Link to="/register">
                  <span>Create an account</span>
                </Link>
              </p>
            </div>
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
