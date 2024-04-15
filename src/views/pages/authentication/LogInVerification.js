import { useState, useEffect, useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import { AbilityContext } from "@src/utility/context/Can";
import {
  Modal,
  Form,
  ModalBody,
  Button,
  Card,
  CardBody,
  CardTitle,
  CardText,
} from "reactstrap";

import useJwt from "@src/auth/jwt/useJwt";

import { handleLogin } from "@store/authentication";

import { useDispatch } from "react-redux";
// ** Utils scxc
import { getHomeRouteForLoggedInUser } from "@utils";
// ** Third Party Components
import toast from "react-hot-toast";
// ** Custom Components
import Avatar from "@components/avatar";
import { Coffee, X } from "react-feather";

//** Third Party Input
import OTPInput from "otp-input-react";

import Messages from "./two-step-verification/SVG/Messages.gif";



const abilityList = {
  admin: [
    {
      action: "admin",
      subject: "owner",
    },
  ],
  merchant: [
    {
      action: "merchant",
      subject: "Customer",
    },
  ],
  iso: [
    {
      action: "read",
      subject: "Agent",
    },
  ],
  under_writer: [
    {
      action: "read",
      subject: "employe",
    },
  ],
};
const userType = {
  1: "Admin",
  2: "FRT",
  3: "ISO",
  4: "Under_Writer",
  5: "Merchant",
};

const ToastContent = ({ t, name, role }) => {
  return (
    <div className="d-flex">
      <div className="me-1">
        <Avatar size="sm" color="success" icon={<Coffee size={12} />} />
      </div>
      <div className="d-flex flex-column">
        <div className="d-flex justify-content-between">
          <h6>{name}</h6>
          <X
            size={12}
            className="cursor-pointer"
            onClick={() => toast.dismiss(t.id)}
          />
        </div>
        <span>
          You have successfully logged in as an {role} user to LockTrust. Now
          you can start to explore. Enjoy!
        </span>
      </div>
    </div>
  );
};

const LogInVerfication = ({
  open,
  token = null,
  data = null,
  mobile = "",
  code,
}) => {
code=code+""
  const {
    control,
    setError,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ token: token,otp:code?code:""});

  const ability = useContext(AbilityContext);

  const [basicModal, setBasicModal] = useState(false);

  const [counter, setCounter] = useState(30);

  const [tokenVal, setTokenVal] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [errorOTP, setErrorOTP] = useState("");

  //** Button Reqiure Resend or Call
  const [fetchTime, setFetchTime] = useState(0);
  const [resendBtn, setResendBtn] = useState(false);
  const [callBtn, setCallBtn] = useState(false);

  useEffect(() => {
    setValue("token", tokenVal);
  }, [tokenVal]);

  const setLocalHost = (res) => {
    const data = {
      ...res.data.userData,
      accessToken: res.data.access,
      refreshToken: res.data.refresh,
      fullName: res.data.user.full_name,
      role: userType[res.data.user.user_type].toLowerCase(),
      ability: abilityList[userType[res.data.user.user_type].toLowerCase()],
    };
    setBasicModal(!basicModal);
    dispatch(handleLogin(data));

    ability.update(data.ability);
    navigate(getHomeRouteForLoggedInUser(data.role));
    toast((t) => (
      <ToastContent
        t={t}
        role={data.role || "admin"}
        name={data.fullName || data.username || "John Doe"}
      />
    ));
  };

  const onCallOTP = () => {
    // old e nd poin
      // .login({ email: data.loginEmail, password: data.password, attempt: 3 })
    useJwt
      .resendOtp(token,{ attempt: 3 })
      .then((res) => {
        if (res.status === 202) {
          // setTokenVal(res.data.token);
          setCounter(30);
        }
      })

      .catch((err) => {
        if (err?.response?.status === 403) {
        }
        if (err && err.response && err.response.status === 429) {
          alert("your maximum login attempt exceed");
        }
      });
  };

  const onResendOTP = () => {
    // ** Old End Point
    // .login({ email: data.loginEmail, password: data.password, attempt: 2 })
    useJwt
      .resendOtp(token,{ attempt: 2 })
      .then((res) => {
        if (res.status === 202) {
          // setTokenVal(res.data.token);
          setCounter(30);
        }
      })
      .catch((err) => {
        if (err && err.response && err.response.status === 403) {
          setErrorOTP(err?.response?.data.detail);
        }
        if (err && err.response && err.response.status === 429) {
          return alert("your maximum login attempt exceed");
        }
      });
  };

  useEffect(() => {
    setBasicModal(open);
  }, [open]);

  useEffect(() => {
    setValue("token", token);
    setValue('otp',code)
  }, [token]);

  const onSubmit = (data) => {
    // console.log(data)
    if (Object.values(data).every((field) => field?.length > 0)) {
      useJwt
        .verifyOtp({ code_token: data.token, code: data.otp })
        .then((res) => {
          setLocalHost(res);
        })
        .catch((err) => {
          if (err?.response && err?.response.status === 403) {
            setErrorOTP(err && err?.response?.data?.detail);
            console.log(err?.response);
            alert(403);
          }
          setErrorOTP(err?.response?.detail);
        });
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

  useEffect(() => {
    const timer =
      counter > 0 &&
      setInterval(() => {
        setCounter((x) => x - 1);
        setFetchTime((x) => x + 1);
      }, 1000);
    return () => clearInterval(timer);
  }, [counter]);

  useEffect(() => {
    if (fetchTime >= 29 && fetchTime < 60) setResendBtn(true);
    else if (fetchTime >= 60 && fetchTime < 90) {
      setResendBtn(false);
      setCallBtn(true);
    } else {
      setResendBtn(false);
      setResendBtn(false);
    }
  }, [fetchTime]);
  return (
    <div>
      <Modal isOpen={basicModal} toggle={() => setBasicModal(!basicModal)}>
        <ModalBody className="d-flex align-items-center justify-content-center">
          <Card style={{ width: "400px", height: "650px" }}>
            <CardBody>
              <div className="d-flex justify-content-center">
                <img src={Messages} alt="this slowpoke moves" width="150" />
              </div>
              <CardTitle tag="h2" className="fw-bolder mb">
                Verify Your Mobile Number 💬
              </CardTitle>
              <CardText className="mb-75">
                We have sent a verification code to your mobile. Enter the code
                from the mobile in the field below.
              </CardText>
              <CardText className="fw-bolder text-primary">
                {`*********${mobile}`}
              </CardText>
              <Form className="mt-2" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-1" hidden>
                  {/* <Controller
                id="token"
                name="token"
                control={control}
                render={({ field }) => (
                  <Input
                    color="primary"
                    type="text"
                    placeholder="Token"
                    invalid={errors.token && true}
                    {...field}
                  />
                )}
              /> */}
                </div>
                <h6>Type your 6 digit security code</h6>

                <CardText className="fw-bold text-danger">{errorOTP}</CardText>
                <div className=" otpinput mb-1 mt-2">
                  <Controller
                    className="otp_input_login_verification"
                    name="otp"
                    control={control}
                    render={({ field }) => (
                      <OTPInput
                        autoFocus
                        OTPLength={7}
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
                  <span
                    style={{
                      transition: "all 0.5s",
                      opacity: resendBtn ? "1" : "0",
                    }}
                  >
                    <Button.Ripple
                      onClick={onResendOTP}
                      className="btn-sm"
                      color="info"
                      outline
                      disabled={fetchTime > 30 && true}
                    >
                      Resend
                    </Button.Ripple>
                  </span>
                  <span
                    style={{
                      transition: "all 0.5s",
                      opacity: callBtn ? "1" : "0",
                    }}
                  >
                    <Button.Ripple
                      onClick={onCallOTP}
                      className="btn-sm"
                      color="warning"
                      outline
                      disabled={fetchTime > 60 && true}
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
        </ModalBody>
      </Modal>
    </div>
  );
};

export default LogInVerfication;
