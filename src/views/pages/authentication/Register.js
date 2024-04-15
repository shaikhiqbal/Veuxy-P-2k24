// ** React Imports
import { createContext, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// ** Custom Hooks
import { useSkin } from "@hooks/useSkin";
import useJwt from "@src/auth/jwt/useJwt";

// ** Store & Actions
import { useDispatch } from "react-redux";

// ** Third Party Components
import { useForm, Controller } from "react-hook-form";
import { Facebook, Twitter, Mail, GitHub, Info } from "react-feather";
import Select from "react-select";
// ** Context
import { AbilityContext } from "@src/utility/context/Can";

// ** Custom Components
import InputPasswordToggle from "@components/input-password-toggle";
// import SpinnerComponent from "@core/components/spinner/Fall-spinner"
// ** Reactstrap Imports
import {
  Row,
  Col,
  CardTitle,
  CardText,
  Label,
  Button,
  Form,
  Input,
  FormFeedback,
  Progress,
  Spinner,
} from "reactstrap";

// ** Styles
import "@styles/react/pages/page-authentication.scss";
import ReactCountryFlag from "react-country-flag";
import country_code from "../../../country_code.json";
import RegistrationVerification from "./SignUpVerificationModel";
import RegistrationVerfication from "./SignUpVerificationModel";
import EmailAndPhoneExist from "./EmailAndPhVerify";

const defaultValues = {
  first_name: "",
  email: "",
  mobile: "",
  password: "",
  password2: "",
};
const progressColor = {
  33: "danger",
  65: "info",
  100: "info",
};
let num = 0;
let upper = 0;
let lowe = 0;
let symb = 0;
let char = 0;

const Register = () => {
  // ** Hooks
  const ability = useContext(AbilityContext);
  const { skin } = useSkin();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [progress, setProgress] = useState(0);
  const [passwordStrength, setpasswordStrength] = useState("Very Week");
  const [loader, setLoader] = useState(false);
  const [emailAddress, setEmailAddress] = useState("");
  //** store multiple email and number state to send SignUpVerification component;
  const [checkData, setCheckData] = useState({
    email: "",
    mobile: "",
    country: "",
  });

  const {
    control,
    setError,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [countryCode, setCountryCode] = useState(0);
  const [flag, setFlag] = useState("");
  const [open, setOpen] = useState(false);
  const [canvasOpen, setCanvasOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  // setpasswordStrength("Week");
  const colorVal = (val) => {
    if (val <= 33) {
      return "danger";
    } else if (val <= 65 && val >= 34) {
      return "warning";
    } else if (val <= 100 && val >= 66) {
      // setpasswordStrength("Strength");
      return "success";
    }
  };

  const illustration =
      skin === "dark" ? "register-v2-dark.svg" : "register-v2.svg",
    source = require(`@src/assets/images/pages/${illustration}`).default;

  const validatePassword = (data) => {
    const number = /[\d]/;
    const lowercase = /[a-z]/;
    const uppercase = /[A-Z]/;
    const specialsymbols = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    let passwordCardF = true;
    document.getElementById("passwordCard").style.display = "none";
    document.getElementById("passwordCard").style.transition = "all 2s ease";
    document.getElementById("passwordCard").style.height = "auto";
    document.getElementById("passwordCard").style.opacity = "1";
    if (number.test(data)) {
      document.getElementById("number").style.color = "green";
      document.getElementById("number").style.fontWeight = "900";
      const numberCheck = document.getElementById("number-x");
      numberCheck.classList.remove("fa-times");
      numberCheck.classList.add("fa-check");
      numberCheck.style.color = "green";
      num = 20;
    } else {
      document.getElementById("number").style.color = "red";
      document.getElementById("number").style.fontWeight = "900";
      const numberCheck = document.getElementById("number-x");
      numberCheck.classList.remove("fa-check");
      numberCheck.classList.add("fa-times");
      numberCheck.style.color = "red";
      passwordCardF = false;
      num = 0;
    }
    if (lowercase.test(data)) {
      document.getElementById("lowercase").style.color = "green";
      document.getElementById("lowercase").style.fontWeight = "900";
      const lowercaseCheck = document.getElementById("lowercase-x");
      lowercaseCheck.classList.remove("fa-times");
      lowercaseCheck.classList.add("fa-check");
      lowercaseCheck.style.color = "green";
      lowe = 20;
    } else {
      document.getElementById("lowercase").style.color = "red";
      document.getElementById("lowercase").style.fontWeight = "900";
      const lowercaseCheck = document.getElementById("lowercase-x");
      lowercaseCheck.classList.remove("fa-check");
      lowercaseCheck.classList.add("fa-times");
      lowercaseCheck.style.color = "red";
      passwordCardF = false;
      lowe = 0;
    }
    if (uppercase.test(data)) {
      document.getElementById("uppercase").style.color = "green";
      document.getElementById("uppercase").style.fontWeight = "900";
      const uppercaseCheck = document.getElementById("uppercase-x");
      uppercaseCheck.classList.remove("fa-times");
      uppercaseCheck.classList.add("fa-check");
      uppercaseCheck.style.color = "green";
      upper = 20;
    } else {
      document.getElementById("uppercase").style.color = "red";
      document.getElementById("uppercase").style.fontWeight = "900";
      const uppercaseCheck = document.getElementById("uppercase-x");
      uppercaseCheck.classList.remove("fa-check");
      uppercaseCheck.classList.add("fa-times");
      uppercaseCheck.style.color = "red";
      passwordCardF = false;
      upper = 0;
    }
    if (specialsymbols.test(data)) {
      document.getElementById("specialsymbols").style.color = "green";
      document.getElementById("specialsymbols").style.fontWeight = "900";
      const specialsymbolsCheck = document.getElementById("specialsymbols-x");
      specialsymbolsCheck.classList.remove("fa-times");
      specialsymbolsCheck.classList.add("fa-check");
      specialsymbolsCheck.style.color = "green";
      symb = 20;
    } else {
      document.getElementById("specialsymbols").style.color = "red";
      document.getElementById("specialsymbols").style.fontWeight = "900";
      const specialsymbolsCheck = document.getElementById("specialsymbols-x");
      specialsymbolsCheck.classList.remove("fa-check");
      specialsymbolsCheck.classList.add("fa-times");
      specialsymbolsCheck.style.color = "red";
      passwordCardF = false;
      symb = 0;
    }
    if (data.length <= 8) {
      document.getElementById("lengthofPassword").style.color = "red";
      document.getElementById("lengthofPassword-x").style.color = "red";
      document.getElementById("lengthofPassword").style.fontWeight = "900";
      const lengthofPasswordCheck =
        document.getElementById("lengthofPassword-x");
      lengthofPasswordCheck.classList.remove("fa-check");
      lengthofPasswordCheck.classList.add("fa-times");
      lengthofPasswordCheck.style.color = "red";
      passwordCardF = false;
      char = 0;
    } else {
      document.getElementById("lengthofPassword").style.color = "green";
      document.getElementById("lengthofPassword").style.fontWeight = "900";
      const lengthofPasswordCheck =
        document.getElementById("lengthofPassword-x");
      lengthofPasswordCheck.classList.remove("fa-times");
      lengthofPasswordCheck.classList.add("fa-check");
      lengthofPasswordCheck.style.color = "green";
      char = 20;
    }
    if (passwordCardF) {
      document.getElementById("passwordCard").style.display = "none";
    } else {
      document.getElementById("passwordCard").style.display = "block";
    }

    setPassword(data);
    if (confirm_password !== data && confirm_password != "") {
      document.getElementById("passwordNotMatch").style.display = "block";
    } else {
      document.getElementById("passwordNotMatch").style.display = "none";
    }
    let Strength = num + lowe + upper + symb + char;
    setProgress(Strength);
    if (Strength <= 33) {
      setpasswordStrength("Very Week");
      document.getElementById("strength").style.color = "#EA5354";
    } else if (Strength >= 34 && Strength <= 65) {
      document.getElementById("strength").style.color = "#FF9E43";
      setpasswordStrength("Week");
    } else if (Strength >= 66 && Strength <= 100) {
      setpasswordStrength("Strength");
      document.getElementById("strength").style.color = "#FF9E43";
    }
  };
  const validateConfirmPassword = (conf_password) => {
    setConfirmPassword(conf_password);
    if (conf_password !== password) {
      document.getElementById("passwordNotMatch").style.display = "block";
    } else {
      document.getElementById("passwordNotMatch").style.display = "none";
    }
  };

  const postInfo = (
    first_name,
    last_name,
    email,
    password,
    password2,
    mobile
  ) => {
    useJwt
      .register({ first_name, last_name, email, password, password2, mobile })
      .then((res) => {
        if (res?.status === 201) {
          setOpen(!open);
          setLoader((boolean) => !boolean);
        }
      })
      .catch((err) => {
        if (err?.response?.status === 400) {
          setLoader((boolean) => !boolean);
          setCanvasOpen(!canvasOpen);
          setEmailAddress(err?.response?.data?.email_address);
        }
      });
  };

  const checkEmptyFeild = (data) => {
    for (const key in data) {
      if (data[key].length === 0) {
        setError(key, {
          type: "manual",
          message: `Please enter a valid ${key}`,
        });
      }
      if (key === "terms" && data.terms === false) {
        setError("terms", {
          type: "manual",
        });
      }
    }
    setLoader((boolean) => !boolean);
  };
  const onSubmit = (data) => {
    setLoader((boolean) => !boolean);
    setCountryCode(data.country_code);
    const tempData = { ...data };
    let {
      first_name,
      last_name,
      email,
      password,
      password2,
      mobile,
      country_code,
    } = data;
    setCheckData(() => {
      let { email, mobile } = data;
      return {
        email,
        mobile,
        countryCode: country_code,
      };
    });

    mobile = country_code && country_code.toString() + mobile.toString();
    const mobileRegex = /^([+]\d{2,})\(?\d{3}\)?[\s.-]?\d{3}?[\s.-]?\d{4}$/gm;
    if (!mobile?.match(mobileRegex)) {
      document.getElementById("mobile_id").innerHTML = "Invalid mobile no.";
      document.getElementById("mobile_id").style.color = "red";
    } else {
      document.getElementById("mobile_id").style.display = "none";
    }
    if (Object.values(tempData).every((field) => field?.length > 0)) {
      if (password !== password2) return setLoader((boolean) => !boolean);
      postInfo(first_name, last_name, email, password, password2, mobile);
    } else {
      checkEmptyFeild(data);
    }
  };

  const country = country_code.map((data, idx) => {
    return {
      value: data.dial_code,
      label: ` ${data.code}`,
      name: data.name,
      flag: <ReactCountryFlag countryCode={data.code} svg />,
    };
  });

  const page = () => {
    if (open) {
      return <RegistrationVerfication open={open} checkData={checkData} />;
    }
  };

  const formOptionLabel = ({ value, label, name, flag }) => {
    return (
      <div style={{ display: "flex" }}>
        <div style={{ marginLeft: "10px" }}>
          {flag} {label} {value}
        </div>
      </div>
    );
  };

  const AlreadyExist = () => {
    if (canvasOpen)
      return (
        <EmailAndPhoneExist
          setCanvasOpen={setCanvasOpen}
          canvasOpen={canvasOpen}
          email={emailAddress}
        />
      );
  };

  function containsSpecialChars(str) {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (specialChars.test(str)) {
      setError("first_name", {
        message: "special characters are not allowed",
      });
    } else {
      clearErrors("first_name");
    }
    return str;
  }
  return (
    <div className="auth-wrapper auth-cover">
      {page()}
      {AlreadyExist()}
      <Row className="auth-inner m-0">
        <Link className="brand-logo" to="/" onClick={(e) => e.preventDefault()}>
          {/* <img
            src="../../../../src/"
            alt="LockTrustLogo"
            width="500"
            height="600"
          /> */}
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
            <CardTitle tag="h2" className="fw-bold mb-1">
              Adventure starts here 🚀
            </CardTitle>
            <CardText className="mb-2">
              Make your app management easy and fun!
            </CardText>

            <Form
              className="auth-register-form mt-2 d-flex flex-column align-items-basline"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="mb-1">
                <Label className="form-label" htmlFor="register-firstname">
                  First Name
                </Label>
                <Controller
                  id="first_name"
                  name="first_name"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Input
                      {...field}
                      autoFocus
                      placeholder="john"
                      invalid={errors.first_name && true}
                      onChange={(e) =>
                        field.onChange(containsSpecialChars(e.target.value))
                      }
                    />
                  )}
                />
                {errors.first_name ? (
                  <FormFeedback>{errors.first_name.message}</FormFeedback>
                ) : null}
              </div>
              <div className="mb-1">
                <Label className="form-label" htmlFor="register-lastname">
                  Last Name
                </Label>
                <Controller
                  id="last_name"
                  name="last_name"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Input
                      {...field}
                      autoFocus
                      placeholder="doe"
                      invalid={errors.last_name && true}
                      onChange={(e) =>
                        field.onChange(containsSpecialChars(e.target.value))
                      }
                    />
                  )}
                />
                {errors.last_name ? (
                  <FormFeedback>{errors.last_name.message}</FormFeedback>
                ) : null}
              </div>
              <div className="mb-1">
                <Label className="form-label" htmlFor="register-email">
                  Email
                </Label>
                <Controller
                  id="email"
                  name="email"
                  control={control}
                  defaultValue=""
                  required
                  render={({ field }) => (
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      invalid={errors.email && true}
                      {...field}
                    />
                  )}
                />
                <p id="email_id" />
                {errors.email ? (
                  <FormFeedback>{errors.email.message}</FormFeedback>
                ) : null}
              </div>
              <div className="d-flex justify-content-between mb-1">
                <Col sm="4">
                  <Label className="form-label" htmlFor="register-email">
                    Country Code
                  </Label>
                  <Select
                    options={country}
                    defaultValue={country[0]}
                    formatOptionLabel={formOptionLabel}
                    onChange={(e) => setValue("country_code", e.value)}
                  />
                </Col>
                <div className="col-lg-8">
                  <Label className="form-label" htmlFor="register-mobile">
                    Phone
                  </Label>
                  <Controller
                    id="mobile"
                    name="mobile"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Input
                        type="number"
                        placeholder="88xxxxxxxx"
                        invalid={errors.mobile && true}
                        {...field}
                      />
                    )}
                  />
                  <p id="mobile_id" />
                  {errors.mobile ? (
                    <FormFeedback>{errors.mobile.message}</FormFeedback>
                  ) : null}
                </div>
              </div>
              <div className="mb-1">
                <Label className="form-label" htmlFor="register-password">
                  Password
                </Label>
                <Controller
                  id="password"
                  name="password"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <InputPasswordToggle
                      className="input-group-merge"
                      invalid={errors.password && true}
                      onCopy="return false"
                      onPaste="return false"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        validatePassword(e.target.value);
                      }}
                    />
                  )}
                />
              </div>
              <div
                id="passwordCard"
                style={{
                  height: "%",
                  opacity: "0",
                  display: "none",
                }}
              >
                <div>
                  <p>
                    Password Strength:
                    <span id="strength" className="ms-1">
                      {passwordStrength}
                    </span>
                  </p>
                  <Progress color={colorVal(progress)} value={progress} />
                </div>
                <div className="d-flex align-items-baseline">
                  <i
                    id="uppercase-x"
                    className="fa fa-times me-1"
                    aria-hidden="true"
                  ></i>
                  <p id="uppercase">Atleast 1 uppercase</p>
                </div>
                <div className="d-flex align-items-baseline">
                  <i
                    id="lowercase-x"
                    className="fa fa-times me-1"
                    aria-hidden="true"
                  ></i>
                  <p id="lowercase">Atleast 1 lowercase</p>
                </div>
                <div className="d-flex align-items-baseline">
                  <i
                    id="specialsymbols-x"
                    className="fa fa-times me-1"
                    aria-hidden="true"
                  ></i>
                  <p id="specialsymbols">Atleast 1 special symbols</p>
                </div>
                <div className="d-flex align-items-baseline">
                  <i
                    id="number-x"
                    className="fa fa-times me-1"
                    aria-hidden="true"
                  ></i>
                  <p id="number">Atleast 1 number</p>
                </div>
                <div className="d-flex align-items-baseline">
                  <i
                    id="lengthofPassword-x"
                    className="fa fa-times me-1"
                    aria-hidden="true"
                  ></i>
                  <p id="lengthofPassword">Atleast 8 Characters</p>
                </div>
              </div>
              <div className="mb-1">
                <Label className="form-label" htmlFor="register-password">
                  Confirm Password
                </Label>
                <Controller
                  id="password2"
                  name="password2"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <InputPasswordToggle
                      className="input-group-merge"
                      invalid={errors.password2 && true}
                      {...field}
                      onCopy="return false"
                      onPaste="return false"
                      onChange={(e) => {
                        field.onChange(e);
                        validateConfirmPassword(e.target.value);
                      }}
                    />
                  )}
                />
              </div>
              <p
                id="passwordNotMatch"
                style={{ display: "none", color: "red" }}
              >
                password not matched
              </p>

              <RegistrationVerification data={checkData} />
              <span className="mt-2"></span>
              <Button type="submit" color="primary" disabled={loader}>
                Sign up{" "}
                <Spinner
                  color="light"
                  size="sm"
                  style={{ visibility: loader ? "visible" : "hidden" }}
                >
                  Loading...
                </Spinner>
              </Button>
              {/* <button type="submit" onClick={handleSubmit(onSubmit)}>Sing up</button> */}
            </Form>
            <div>
              <p className="text-center mt-2">
                <span className="me-25">Already have an account?</span>
                <Link to="/login">
                  <span>Sign in instead</span>
                </Link>
              </p>
            </div>
            {/* <div className="divider my-2">
              <div className="divider-text">or</div>
            </div> */}
            {/* <div className="auth-footer-btn d-flex justify-content-center">
              <Button color="facebook">
                <Facebook size={14} />
              </Button>
              <Button color="twitter">
                <Twitter size={14} />
              </Button>
              <Button color="google">
                <Mail size={14} />
              </Button>
            </div> */}
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default Register;
