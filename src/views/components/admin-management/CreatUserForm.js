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
} from "reactstrap";

//** React Hook Form
import { Controller, useForm } from "react-hook-form";

//** Country Code Data
// import country_code from "../../../../../country_code.json";
import country_code from '../../../../../src/country_code.json'
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
  if (!userData.country_code) return 0;
  let { country_code } = userData;
  let idx = country.findIndex((i) => i.dial_code === country_code);

  return idx;
};

const AddUserForm = (props) => {
  let { open, setOpen, userData } = props;

  //** Api Error
  const [backError, setBackError] = useState("");
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

  //** Submit Form
  const onSubmit = (data) => {
    let temp = { ...data };

delete temp.company_name;
    delete temp.is_block;

    if (Object.values(temp).every((value) => value?.length > 0)) {
      const { country_code, mobile } = data;
      delete data.mobile;
      data.mobile = country_code + mobile;

      if (defaultValues.uid) {
        useJwt
          .putUserInfoAdmin(defaultValues.uid, data)
          .then((res) => {
            if (res?.status === 200) {
              setOpen(!open);
              handleTopEnd();
              defaultValues = {};
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
          });
      } else {
        useJwt
          .postUserInfoAdmin(data)
          .then((res) => {
            if (res?.status === 201) {
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
          });
      }
    } else {
      for (var key in temp) {
        if (data[key]?.length == 0 || !temp[key]?.length) {
          setError(key, {
            type: "manual",
            message: (msg) => `This ${msg} feild is required`,
          });
        }
      }
    }
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

  let countryIdx = findCountryIdx(userData, country_code);

  const start = <span className="text-danger">*</span>;

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
            <Label className="form-label" for="full-name">
              Full Name {start}
            </Label>
            <InputGroup>
              <InputGroupText>
                <User size={15} />
              </InputGroupText>
              <Controller
                id="full_name"
                name="full_name"
                control={control}
                render={({ field }) => (
                  <Input
                    control={control}
                    name="full_name"
                    type="text"
                    invalid={errors.full_name && true}
                    {...field}
                  />
                )}
              />
              <FormFeedback>
                {errors?.full_name?.message("Full Name")}
              </FormFeedback>
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
                <FormFeedback>{errors.email.message("Email")}</FormFeedback>
              ) : null}
            </InputGroup>
          </div>
          {/* <div className='mb-1'>
          <Label className='form-label' for='joining-date'>
            Country Code {start}
          </Label>
              <Select

                    outline={false}
                    options={country}
                    defaultValue={country[countryIdx]}
                    formatOptionLabel={formOptionLabel}
                    onChange={(e) => setValue("country_code", e.value)}
                  />
                 

          <Label>Mobile</Label>
         <Controller
              id="mobile"
              name="mobile"
              control={control}
              render={({ field }) => (
                  <Input
                    control={control}
                    name="mobile"
                    type="number"
                    invalid={errors.mobile && true}
                    {...field}
                  />
              )}
            />
             {errors.mobile ? (
                    <FormFeedback>{errors?.mobile?.message('Mobile')}</FormFeedback>
                  ) : null}
            </span>
            </span>
        </div> */}
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
                    name="mobile"
                    type="number"
                    invalid={errors.mobile && true}
                    {...field}
                  />
                )}
              />
              {errors.mobile ? (
                <FormFeedback>{errors?.mobile?.message("Mobile")}</FormFeedback>
              ) : null}
              <p id="mobile_id" />
              {errors.mobile ? (
                <FormFeedback>{errors.mobile.message}</FormFeedback>
              ) : null}
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
                <FormFeedback>
                  {errors?.user_type?.message("User Type")}
                </FormFeedback>
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
          <Button className="me-1" color="primary" type="submit">
            Submit
          </Button>
          <Button
            color="secondary"
            onClick={() => {
              reset(defaultValues);
              setOpen(!open);
            }}
            outline
          >
            Cancel
          </Button>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default AddUserForm;
