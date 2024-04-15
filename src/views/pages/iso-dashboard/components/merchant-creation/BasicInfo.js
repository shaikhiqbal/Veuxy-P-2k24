import React, { useState } from "react";

// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Col,
  Input,
  Form,
  Button,
  Label,
  Row,
  FormFeedback,
  Spinner,
} from "reactstrap";

// ** React Select
import Select from "react-select";

//** React Hook Form
import { Controller, useForm } from "react-hook-form";

//** Country Code Data
import country_code from "../../../../../country_code.json";
import ReactCountryFlag from "react-country-flag";

//** jwt
import useJwt from "@src/dashboard/jwt/useJwt";

// ** Sweet Alert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// ** Navigate
import { useNavigate } from "react-router-dom";

// ** Application Upload
import ModalApplicatioPdfUpload from "./ModalApplicatioPdfUpload";
//**  Third Party
const MySwal = withReactContent(Swal);

const handleTopEnd = () => {
  return MySwal.fire({
    position: "top-end",
    icon: "success",
    title: "Your work has been saved",
    showConfirmButton: false,
    timer: 1500,
  });
};

const BasicInfo = () => {
  //**  React-Hook-Form
  const {
    register,
    control,
    setError,
    reset,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const [isOpen, setIsOpen] = useState(false);
  const [userUid, setUserUid] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const handleConfirmNavigate = (uid) => {
    return MySwal.fire({
      title: "Merchant is Created",
      text: "merchant is created pleas choose application fill or application upload",
      icon: "success",
      showCancelButton: true,
      confirmButtonText: "Application Fill",
      cancelButtonText: "Application Upload",
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-danger ms-1",
      },
      buttonsStyling: false,
    }).then(function (result) {
      if (result.value) {
        navigate("/application-create", { state: { application_id: uid } });
      } else if (result.dismiss === MySwal.DismissReason.cancel) {
        // navigate("/applicationform", { state: uid });
        setUserUid(uid);
        setIsOpen(!isOpen);
      }
    });
  };
  const country =
    country_code &&
    country_code.map((data, idx) => {
      return {
        value: data.dial_code,
        label: ` ${data.code}`,
        name: data.name,
        flag: <ReactCountryFlag key={idx} countryCode={data.code} svg />,
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

  // ** Post Data
  const post = (data) => {
    // setLoader(true)
    useJwt
      .postUserInfoAdmin(data)
      .then((res) => {
        if (res?.status === 201) {
          // navigate("/applicationform", { state: res?.data?.uid });
          handleConfirmNavigate(res?.data?.uid);
        }
      })
      .catch((err) => {
        setLoader(false);
        if (err?.response?.status === 400) {
          for (let key in err?.response?.data) {
            setError(key, {
              type: "manual",
              message: (msg) => ` ${err?.response?.data[key]}`,
            });
          }
        }
      });
  };

  // ** Submit Information

  const handleCountrySelect = (selectedOption) => {
    if (selectedOption.value === "Select Country") {
      setError("country_code", {
        type: "manual",
        message: "Please select a country",
      });
    } else {
      setValue("country_code", selectedOption.value);
    }
  };

  function isValidString(inputString) {
    const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    const hasSpecialChars = specialChars.test(inputString);
    const hasIntegers = /\d/.test(inputString);
    return !hasSpecialChars && !hasIntegers;
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const checkDeatils = (data) => {
    let flag = true;
    for (const key in data) {
      if (data[key]?.length == 0 || !data[key]?.length) {
        // console.log(flag);
        flag = false;
        setError(key, {
          type: "manual",
          message: `This above feild is required`,
        });
      }
    }
    if (flag) {
      if (!isValidString(data.first_name)) {
        flag = false;
        setError("first_name", {
          type: "manual",
          message: `Invalid First name`,
        });
      }
      if (!isValidString(data.last_name)) {
        flag = false;
        setError("last_name", {
          type: "manual",
          message: `Invalid Last name`,
        });
      }
      if (!isValidEmail(data.email)) {
        flag = false;
        setError("email", {
          type: "manual",
          message: `Invalid Email`,
        });
      }
      if (data?.mobile?.length > 15 || data?.mobile?.length < 7) {
        flag = false;
        setError("mobile", {
          type: "manual",
          message: `Invalid Mobile number`,
        });
      }
    }

    return flag;
  };

  //** Submit Form
  const onSubmit = (data) => {
    setLoader(true);
    const storeData = { ...data };
    const isValidData = checkDeatils(storeData);
    if (isValidData) {
      const { country_code, mobile } = data;
      delete data.mobile;
      data.mobile = country_code + mobile;
      data.user_type = 5;
      // setTimeout(()=>setLoader(false),1000)
      post(data);
    } else setLoader(false);
  };
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">Merchant Information</CardTitle>
        </CardHeader>

        <CardBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className="mb-1">
              <Label sm="3" htmlFor="first_name">
                First Name
              </Label>
              <Col sm="9">
                <Controller
                  id="first_name"
                  name="first_name"
                  control={control}
                  render={({ field }) => (
                    <Input
                      control={control}
                      name="first_name"
                      type="text"
                      placeholder="First Name"
                      invalid={errors.first_name && true}
                      {...field}
                    />
                  )}
                />
                <FormFeedback>{errors?.first_name?.message}</FormFeedback>
              </Col>
            </Row>

            <Row className="mb-1">
              <Label sm="3" htmlFor="last_name">
                Last Name
              </Label>
              <Col sm="9">
                <Controller
                  id="last_name"
                  name="last_name"
                  control={control}
                  render={({ field }) => (
                    <Input
                      control={control}
                      name="last_name"
                      type="text"
                      placeholder="Last Name"
                      invalid={errors.last_name && true}
                      {...field}
                    />
                  )}
                />
                <FormFeedback>{errors?.last_name?.message}</FormFeedback>
              </Col>
            </Row>

            <Row className="mb-1">
              <Label sm="3" htmlFor="Email">
                Email
              </Label>
              <Col sm="9">
                <Controller
                  id="email"
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input
                      control={control}
                      name="email"
                      type="email"
                      placeholder="Email"
                      invalid={errors.email && true}
                      {...field}
                    />
                  )}
                />
                {errors.email ? (
                  <small className="text-danger">{errors.email.message}</small>
                ) : null}
              </Col>
            </Row>

            <Row className="mb-1">
              <Label sm="3" htmlFor="mobile">
                Country
              </Label>
              <Col sm="9">
                {/* <Select
                  outline={false}
                  options={country}
                  defaultValue={"Select Country"}
                  formatOptionLabel={formOptionLabel}
                  onChange={(e) => setValue("country_code", e.value)}
                /> */}

                <Select
                  {...register("country_code")}
                  outline={false}
                  options={country}
                  defaultValue={"Select Country"}
                  formatOptionLabel={formOptionLabel}
                  onChange={handleCountrySelect}
                />
                {errors.country_code && (
                  <span className="error text-danger">
                    {errors.country_code.message}
                  </span>
                )}
              </Col>
            </Row>

            <Row className="mb-1">
              <Label sm="3" htmlFor="mobile">
                Mobile
              </Label>
              <Col sm="9">
                <Controller
                  id="mobile"
                  name="mobile"
                  control={control}
                  render={({ field }) => (
                    <Input
                      control={control}
                      name="mobile"
                      type="number"
                      placeholder="Mobile"
                      invalid={errors.mobile && true}
                      {...field}
                    />
                  )}
                />
                {errors.mobile ? (
                  <FormFeedback>{errors?.mobile?.message}</FormFeedback>
                ) : null}
              </Col>
            </Row>

            <Row>
              <Col className="d-flex" md={{ size: 9, offset: 3 }}>
                <Button
                  className="me-1"
                  color="success"
                  type="submit"
                  disabled={loader}
                >
                  {loader ? (
                    <>
                      <Spinner color="white" size="sm" type="grow" />
                      <span className="ms-50">Loading...</span>
                    </>
                  ) : (
                    "Create"
                  )}
                </Button>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
      <ModalApplicatioPdfUpload
        open={isOpen}
        setOpen={setIsOpen}
        uid={userUid}
      />
    </div>
  );
};
export default BasicInfo;
// const onSubmit = (data) => {
//   let temp = { ...data };
//   if (Object.values(temp).every((value) => value?.length > 0)) {
//     const { country_code, mobile } = data;
//     delete data.mobile;
//     data.mobile = country_code + mobile;
//     data.user_type = 5;

//     // ** Post Data
//     post(data);
//   } else {
//     setLoader(false);
//     for (var key in temp) {
//       if (data[key]?.length == 0 || !temp[key]?.length) {
//         setError(key, {
//           type: "manual",
//           message: (msg) => `This ${msg} feild is required`,
//         });
//       }
//     }
//   }
// };
