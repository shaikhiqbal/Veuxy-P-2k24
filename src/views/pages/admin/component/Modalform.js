// ** React Imports
import { useState, useEffect } from "react";
import Select from "react-select";

// ** Third Party Components
import { User, Calendar, Mail, X, Trello } from "react-feather";

// ** Reactstrap Imports
import {
  Modal,
  Input,
  Label,
  Button,
  ModalHeader,
  ModalBody,
  InputGroup,
  InputGroupText,
  Form,
  FormFeedback,
  Col,
  Spinner,
} from "reactstrap";

//** React Hook Form
import { Controller, useForm } from "react-hook-form";

//** Country Code Data
// import country_code from "../../../../../country_code.json";
import country_code from "../../../../../src/country_code.json";
import ReactCountryFlag from "react-country-flag";

// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss";

//** Api
import useJwt from "@src/dashboard/jwt/useJwt";

// ** Third Party Components
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

// ** Finding user Coutry Index
const findCountryIdx = (userData, country) => {
  if (!userData.country_code) {
    return country.findIndex((i) => i.dial_code === "+91");
  }
  let { country_code } = userData;
  return country.findIndex((i) => i.dial_code === country_code);
};

const AddUserForm = (props) => {
  let { open, setOpen, userData } = props;

  //** Api Error
  const [backError, setBackError] = useState("");
  const [loader, setLoader] = useState(false);
  //**
  const [defaultValues, setDefaultValues] = useState({});

  useEffect(() => {
    let { country_code, mobile } = userData;

    // ** set Mobile
    let cl = country_code?.length;
    let ml = mobile?.length;

    let temp = mobile && mobile.slice(cl, ml);

    if (userData) {
      delete userData.mobile;
      userData.mobile = temp;
      setDefaultValues(userData);
    }
  }, [userData]);

  //**  useForm
  const {
    control,
    setError,
    reset,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ defaultValues });

  useEffect(() => {
    reset(defaultValues);

    return () => {};
  }, [defaultValues]);

  // ** Custom close btn
  const CloseBtn = (
    <X className="cursor-pointer" size={15} onClick={() => setOpen(!open)} />
  );

  //** User type
  const userTypes = ["FRT", "ISO", "Under_Writer", "Merchant"];

  //** Sweet Alert
  const handleTopEnd = () => {
    return MySwal.fire({
      position: "top-end",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  //** Option for Select
  const option = userTypes.map((i, idx) => (
    <option key={idx} value={idx + 2}>
      {i}
    </option>
  ));

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
      if (key == "company_name" || key == "is_block") continue;
      else if (data[key]?.length == 0 || !data[key]?.length) {
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
      if (data?.mobile?.length > 10) {
        flag = false;
        setError("mobile", {
          type: "manual",
          message: `Invalid Mobile number`,
        });
      }
    }

    return flag;
  };

  const updateData = (uid, data) => {
    useJwt
      .putUserInfoAdmin(uid, data)
      .then((res) => {
        if (res?.status === 200) {
          setLoader(false);
          setOpen(!open);
          handleTopEnd();
          defaultValues = {};
        }
      })
      .catch((err) => {
        if (err?.response?.status === 400) {
          setLoader(!loader);
          for (let key in err?.response?.data) {
            setError(key, {
              type: "manual",
              message: ` ${err?.response?.data[key]}`,
            });
          }
        }
        setLoader(false);
      });
  };

  const postData = (data) => {
    useJwt
      .postUserInfoAdmin(data)
      .then((res) => {
        if (res?.status === 201) {
          setLoader(false);
          handleTopEnd();
          setOpen(!open);
        }
      })
      .catch((err) => {
        if (err?.response?.status === 400) {
          for (let key in err?.response?.data) {
            setError(key, {
              type: "manual",
              message: (msg) => ` ${err?.response?.data[key]}`,
            });
          }
        }
        setLoader(false);
      });
  };

  //** Submit Form
  const onSubmit = (data) => {
    setLoader(true);
    const storeData = { ...data };
    const isValidData = checkDeatils(storeData);
    if (isValidData) {
      storeData.mobile = storeData.country_code + storeData.mobile;
      if (storeData?.uid) updateData(storeData?.uid, storeData);
      else postData(storeData);
    } else setLoader(false);
  };

  //** Country Setup 1
  const country =
    country_code &&
    country_code.map((data, idx) => {
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

  //** default Country Index;

  const countryIdx = findCountryIdx(userData, country_code);

  const start = <span className="text-danger">*</span>;

  useEffect(() => {
    if (!open) setDefaultValues({});
  }, [open]);

  return (
    <Modal
      isOpen={open}
      toggle={() => setOpen(!open)}
      className="sidebar-xl"
      modalClassName="modal-slide-in"
      contentClassName="pt-0"
    >
      <ModalHeader
        className="mb-1"
        toggle={() => setOpen(!open)}
        close={CloseBtn}
        tag="div"
      >
        <h5 className="modal-title">Fill User Details</h5>
      </ModalHeader>
      <ModalBody className="flex-grow-1">
        <Form onSubmit={handleSubmit(onSubmit)}>
          {backError}
          <div className="mb-1">
            <Label className="form-label" for="first_name">
              First Name {start}
            </Label>
            <InputGroup>
              <InputGroupText>
                <User size={15} />
              </InputGroupText>
              <Controller
                id="first_name"
                name="first_name"
                control={control}
                render={({ field }) => (
                  <Input
                    control={control}
                    name="first_name"
                    type="text"
                    invalid={errors.first_name && true}
                    {...field}
                  />
                )}
              />
              <FormFeedback>{errors?.first_name?.message}</FormFeedback>
            </InputGroup>
          </div>
          <div className="mb-1">
            <Label className="form-label" for="last_name">
              Last Name {start}
            </Label>
            <InputGroup>
              <InputGroupText>
                <User size={15} />
              </InputGroupText>
              <Controller
                id="last_name"
                name="last_name"
                control={control}
                render={({ field }) => (
                  <Input
                    control={control}
                    name="last_name"
                    type="text"
                    invalid={errors.last_name && true}
                    {...field}
                  />
                )}
              />
              <FormFeedback>{errors?.last_name?.message}</FormFeedback>
            </InputGroup>
          </div>
          <div className="mb-1">
            <Label className="form-label" for="email">
              Email {start}
            </Label>
            <InputGroup>
              <InputGroupText>
                <Mail size={15} />
              </InputGroupText>
              <Controller
                id="email"
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    control={control}
                    name="email"
                    type="text"
                    invalid={errors.email && true}
                    {...field}
                  />
                )}
              />
              {errors.email ? (
                <FormFeedback>{errors.email.message}</FormFeedback>
              ) : null}
            </InputGroup>
          </div>
          <div className="d-flex justify-content-between mb-1">
            <Col sm="4">
              <Label className="form-label" for="joining-date">
                Country Code {start}
              </Label>
              <Select
                outline={false}
                options={country}
                defaultValue={country[countryIdx]}
                formatOptionLabel={formOptionLabel}
                onChange={(e) => setValue("country_code", e.value)}
              />
            </Col>
            <div className="col-lg-8">
              <Label>Mobile {start}</Label>
              <Controller
                id="mobile"
                name="mobile"
                control={control}
                render={({ field }) => (
                  <Input
                    control={control}
                    type="number"
                    invalid={errors.mobile && true}
                    {...field}
                  />
                )}
              />
              {errors.mobile ? (
                <FormFeedback>{errors?.mobile?.message}</FormFeedback>
              ) : null}
              <p id="mobile_id" />
            </div>
          </div>
          <div className="mb-1">
            <Label className="form-label" for="joining-date">
              User Type {start}
            </Label>
            <InputGroup>
              <InputGroupText>
                <User size={15} />
              </InputGroupText>
              <Controller
                id="user_type"
                name="user_type"
                control={control}
                render={({ field }) => (
                  <Input
                    control={control}
                    name="user_type"
                    type="select"
                    invalid={errors.user_type && true}
                    {...field}
                  >
                    <option value="none" selected disabled>
                      Select an Option
                    </option>
                    {option}
                  </Input>
                )}
              />
              {errors.user_type ? (
                <FormFeedback>{errors?.user_type?.message}</FormFeedback>
              ) : null}
            </InputGroup>
          </div>

          <div className="mb-1">
            <Label className="form-label" for="salary">
              Company Name
            </Label>
            <InputGroup>
              <InputGroupText>
                <Trello size={15} />
              </InputGroupText>
              <Controller
                id="company_name"
                name="company_name"
                control={control}
                render={({ field }) => (
                  <Input
                    control={control}
                    name="company_name"
                    type="text"
                    invalid={errors.company_name && true}
                    {...field}
                  />
                )}
              />
            </InputGroup>
          </div>
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
        </Form>
      </ModalBody>
    </Modal>
  );
};
export default AddUserForm;
