
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import * as Icon from "react-feather";
import ReactCountryFlag from "react-country-flag";
import "./Auth.css";
import country_code from "../../../country_code.json";
import OTPInput, { ResendOTP } from "otp-input-react";
import useJwt from "@src/auth/jwt/useJwt";

import {
  Modal,
  ModalHeader,
  Form,
  Label,
  ModalBody,
  ModalFooter,
  Button,
  FormFeedback,
  DropdownToggle,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  ButtonDropdown,
  Input,
  Tooltip,
  Spinner,
} from "reactstrap";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

let defaultValues = {
  token: "",
};

const SignUpVerificationModel = ({ open, data, email }) => {
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ defaultValues });

  const [basicModal, setBasicModal] = useState(false);
  const [seconds, setSeconds] = useState(30);
  const [OTP1, setOTP1] = useState();
  const [OTP2, setOTP2] = useState();
  const [errorMassageMobileNumber, setErrorMassageMobileNumber] = useState("");
  const [errorMassageEmail, setErrorMassageEmail] = useState("");

  const [countForMob, setCount] = useState(0);
  const [flag, setFlag] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [toggleCountry, setToggleCountry] = useState(false);
  const [successforEmail, setSuccessForEmail] = useState(false);
  const [successforMobile, setSuccessForMobile] = useState(false);
  const [errorSetForMobile, setErrorForMobile] = useState("");
  const [errorSetForEmail, setErrorForEmail] = useState("");

  const [rsdSpinnerEmail, setRsdSpninerEmail] = useState(false);

  const verifyEmail = () => {
    useJwt
      .verifyEmail({ otp: parseInt(OTP1), email: email }) //email was painding
      .then((res) => {
        if (res.status === 202) {
          setErrorForEmail("");
          setSuccessForEmail(true);
          document.getElementById("InputEmail").style.display = "none";
          document.getElementById("Email-Icon").style.display = "none";
          document.getElementById("successForEmail").style.display = "block";
        }
      })
      .catch((err) => {
        if (err.response.status === 403) {
          setErrorForEmail(err.response.data.detail);
        }
      });
  };
  const resendOTP_forEmail = () => {
    setRsdSpninerEmail(true);
    useJwt
      .resendOTPOnEmail({ code: OTP1, email: email })
      .then((res) => {
        res.checkData.email;
      })
      .catch((err) => {
        err.response;
      });
  };
  /* Verify Number */
  const verifyNumber = () => {
    useJwt
      .signinPhoneVerified({
        otp: parseInt(OTP2),
        email: email,
      })
      .then((res) => {
        if (res.status === 202) {
          setSuccessForMobile(true);
          setErrorForMobile("");
          document.getElementById("OTPInput_forNumber").style.display = "none";
          document.getElementById("successForNumber").style.display = "block";
          document.getElementById("Number-Icon").style.display = "none";
        }
      })
      .catch((err) => {
        if (err.response.status && err.response.status === 403) {
          setErrorForMobile(err.response.data.detail);
        }
      });
  };
  /* Resend otp for Mobile*/
  const onResendOTP_forMobile = () => {
    useJwt
      .resendOTPOnMassage({
        code: OTP2,
        mobile: data.phone_no[0],
        email: email,
      })
      .then((res) => {
        if (res.status === 200) {
          setTokenVal(res.checkData.token);
        }
      });
    let interval = null;
    if (open) {
      setSeconds(30);
    }
  };
  /* On Call OTP */
  const onCallOTP_Mobile = () => {
    useJwt
      .resendOTPOnCall({
        code: OTP2,
        mobile: updatedNumber,
        attempt: 3,
      })
      .then((res) => {
        if (res.status === 200) {
          setTokenVal(res.data.token);
        }
      })

      .catch((err) => {
        err.response.data;
      });
  };
  if (successforEmail && successforMobile) window.location = "/login";
  let counter = 1;
  useEffect(() => {
    setBasicModal(open);
    let interval = null;
    if (seconds > 0 && open === true) {
      interval = setInterval(() => {
        setSeconds((seconds) => "0" + seconds - 1);
        setCount((countForMob) => countForMob + counter);
      }, 1000);
    } else if (seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [open, seconds]);
  // let phoneNumber;
  // if (data.phone_no && data.phone_no.length > 0) {
  //   let phoneNumber = data.phone_no[0];

  //   phoneNumber = phoneNumber.slice(phoneNumber.length - 2, phoneNumber.length);
  // }

  return (
    <div>
      <Modal
        isOpen={basicModal}
        toggle={() => setBasicModal(!basicModal)}
        style={{ width: "100vh" }}
      >
        <ModalHeader
          toggle={() => setBasicModal(!basicModal)}
          className="position-relative  bg-primary bg-gradient"
        >
          <div
            className="position-absolute"
            style={{ left: "45%", bottom: "10%" }}
          >
            <h2 className="text-light fw-bold fs-25">Verify</h2>
          </div>
        </ModalHeader>
        <ModalBody className="">
          <div className="Verify_Main">
            <div className="p-2 w-100 ">
              <div className="email-Card text-center">
                <h2 className="mb-2">Verify Your E-mail Address</h2>
                <h3 className="text-secondary ">
                  Enter 6 digit verification code sent on your
                </h3>
                <div className="fw-bolder text-start ps-5 mb-3 text-danger">
                  {errorMassageEmail && <p>Note:-{errorMassageEmail}</p>}
                </div>
                <p>
                  <span className="text-danger">*</span>
                  <small>
                    If email not shown in Inbox please check Spam/Junk
                  </small>
                </p>

                <div
                  id="InputEmail"
                  className="input-area"
                  style={{ marginRight: "1rem", marginLeft: "8px" }}
                >
                  <p className="fw-bolder text-danger">{errorSetForEmail}</p>
                  <OTPInput
                    value={OTP1}
                    onChange={setOTP1}
                    autoFocus
                    OTPLength={6}
                  />
                </div>
                <div id="successForEmail" style={{ display: "none" }}>
                  <Icon.Smile className="text-success" size="5rem" />
                  <h1 className="text-success">Success</h1>
                </div>
                <br />
                <div
                  id="OTPAllBtn_forEmail"
                  className="d-flex  justify-content-between"
                  style={{ display: "" }}
                >
                  <Button
                    className="mt-2"
                    color="primary"
                    onClick={verifyEmail}
                    style={{ display: successforEmail ? "none" : "block" }}
                  >
                    Verify Email
                  </Button>
                  <Button
                    className="mt-2"
                    color="primary"
                    style={{
                      display: successforEmail
                        ? "none"
                        : seconds === 0
                        ? "block"
                        : "none",
                    }}
                    onClick={resendOTP_forEmail}
                  >
                    Resend-OTP
                    <Spinner
                      color="light"
                      size="sm"
                      style={{
                        visibility: rsdSpinnerEmail ? "visible" : "hidden",
                      }}
                    >
                      Loading...
                    </Spinner>
                  </Button>
                </div>
              </div>{" "}
              <div
                className="phone-Card text-center "
                style={{ marginTop: "3rem" }}
              >
                <h2 className="mb-1">Verify Your Mobile Number</h2>
                <h3 className="text-secondary ">
                  Enter 6 digit verification code sent on your
                </h3>
                <h3>
                  {" "}
                  {data.phone_no &&
                    `*********${data.phone_no[0].slice(
                      data.phone_no[0].length - 2,
                      data.phone_no[0].length
                    )}`}
                </h3>
                <div className="fw-bolder text-start ps-5 mb-3 text-danger">
                  {errorMassageMobileNumber && (
                    <p> Note:- {errorMassageMobileNumber}</p>
                  )}
                </div>
                <p className="fw-bolder text-danger">{errorSetForMobile}</p>
                <div
                  id="OTPInput_forNumber"
                  className="input-area"
                  style={{ marginRight: "1rem", marginLeft: "8px" }}
                >
                  <OTPInput
                    className="well"
                    value={OTP2}
                    onChange={setOTP2}
                    autoFocus
                    OTPLength={6}
                  />
                </div>
                <div id="successForNumber" style={{ display: "none" }}>
                  <Icon.Smile className="text-success" size="5rem" />
                  <h1 className="text-success">Success</h1>
                </div>
                <br />
                <div
                  id="OTPAllBtn_forNumber"
                  className="d-flex justify-content-between"
                  style={{ display: "none" }}
                >
                  <Button
                    className="mt-2"
                    color="relief-primary"
                    onClick={verifyNumber}
                    style={{ display: successforMobile ? "none" : "block" }}
                  >
                    Verify Number
                  </Button>
                  <Button
                    className="mt-2"
                    color="relief-primary"
                    onClick={onResendOTP_forMobile}
                    style={{
                      display: successforMobile
                        ? "none"
                        : countForMob >= 30 && countForMob <= 59
                        ? "block"
                        : "none",
                    }}
                  >
                    Resend-OTP
                  </Button>
                  <Button
                    className="mt-2"
                    color="relief-danger"
                    onClick={onCallOTP_Mobile}
                    style={{
                      display:
                        countForMob === 60 || countForMob > 60
                          ? "block"
                          : "none",
                    }}
                  >
                    Call now
                  </Button>
                </div>
              </div>
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
                  {seconds}
                </label>
              </div>
              <p className="fw-bold text-primary">Resend OTP After</p>
            </div>
          </div>
        </ModalBody>
        ;
      </Modal>
    </div>
  );
};
export default SignUpVerificationModel;
