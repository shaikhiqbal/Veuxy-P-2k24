import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardText,
  CardFooter,
  Row,
  Col,
  Form,
  Input,
  Label,
  Button,
  Spinner,
  FormFeedback,
} from "reactstrap";

import { Controller, useForm } from "react-hook-form";
import "./style/style.css";
// ** jwt
import useJwt from "@src/dashboard/jwt/useJwt";
import { useNavigate } from "react-router-dom";

// ** Third Party Components
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);
const handleWarning = () => {
  return MySwal.fire({
    title: "",
    text: " Please Fill Atleast Company Profile!",
    icon: "warning",
    customClass: {
      confirmButton: "btn btn-primary",
    },
    buttonsStyling: false,
  });
};

const MerchanContact = (props) => {
  const {application_id}=props
  // ** States
  const [defaultData, setDefaultData] = useState({});
  const [technical, setTechnical] = useState(false);
  const [financial, setFinancial] = useState(false);
  const [chargback, setChargback] = useState(false);
  const [loader, setLoader] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const [callGet, setCallGet] = useState(false);

  const navigate = useNavigate();

  // ** Forms
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    clearErrors,
  } = useForm({ defaultValues: defaultData });

  const applicatiodId = localStorage.getItem("application_id");

  // ** copay Data
  const copyData = (idx, data) => {
    let { first_name, last_name, email_address, telephone_number } = data.mc[0];
    const contact = {
      first_name: first_name,
      last_name: last_name,
      email_address: email_address,
      telephone_number: telephone_number,
      contact_type: idx + 1,
    };

    data.mc[idx] = contact;

    let application = localStorage.getItem("application_id");
    let temp = data.mc;
    for (let i = 0; i < temp.length; i++) {
      if (!temp[i]) {
        temp.splice(i, 1);
      } else {
        temp[i].application_id = application;
      }
    }

    return (data.mc = temp);
  };

  // ** Post Data
  const post = (data) => {
    useJwt
      .postmerchantcontact(data)
      .then((res) => {
        if (res?.status === 201) {
          navigate("/iso/merchant");
          setLoader(false);
          setCallGet((pre) => !pre);
        }
      })
      .catch((err) => alert(err?.response?.status));
  };

  // ** Update Data
  const update = (data, uid) => {
    useJwt
      .putmerchantcontact(uid, data)
      .then((res) => {
        if (res?.status === 200) {
          navigate("/iso/merchant");
          setLoader(false);
          setCallGet((pre) => !pre);
        }
      })
      .catch((err) => console.log(err?.response));
  };

  const onSubmit = (data) => {
    // {{debugger}}
    if (applicatiodId == "undefined") {
      handleWarning();
      navigate("1");
    } else {
      // ** Setup Uid and Data
      let application_id = localStorage.getItem("application_id");
      data.mc[0].application_id = application_id;
      data.mc[0].contact_type = 1;
      if (!technical && !data.mc[0]?.uid) copyData(1, data);
      else {
        data.mc[1].application_id = application_id;
        data.mc[1].contact_type = 2;
      }
      if (!financial && !data.mc[0]?.uid) copyData(2, data);
      else {
        data.mc[2].application_id = application_id;
        data.mc[2].contact_type = 3;
      }
      if (!chargback && !data.mc[0]?.uid) copyData(3, data);
      else {
        data.mc[3].application_id = application_id;
        data.mc[3].contact_type = 4;
      }

      const uid = data?.mc[0]?.uid;
      if (!uid) post(data);
      else update(data, uid);
    }
  };

  // JSON.stringify(Fruit1) === JSON.stringify(Fruit2)
  const handleData = (data) => {
    const allContactTypes = {
      2: false,
      3: false,
      4: false,
    };
    const feild = {
      email_address: "p",
      fax_number: "p",
      first_name: "p",
      last_name: "p",
      telephone_number: "p",
    };
    const generalContact = { ...data[0] };
    delete generalContact.contact_type;
    delete generalContact.fax_number;
    delete generalContact.uid;
    for (let i = 0; i < data.length; i++) {
      if (i > 0) {
        let temp = { ...data[i] };
        let contact_type = temp.contact_type;
        delete temp.contact_type;
        delete temp.fax_number;
        delete temp.uid;
        if (JSON.stringify(generalContact) === JSON.stringify(temp)) {
          continue;
        } else allContactTypes[contact_type] = true;
      }
      for (let key of Object.keys(data[i])) {
        if (!data[i][key]?.length) {
          if (feild[key]) {
            setError(`${key}_${i}`, { type: "custom", message: "empty feild" });
          }
        }
      }
    }
    setTechnical(allContactTypes[2]);
    setFinancial(allContactTypes[3]);
    setChargback(allContactTypes[4]);
  };
  // ** get Data
  useEffect(() => {
    useJwt.getmerchantcontact(application_id).then((res) => {
      if (res?.status === 200 && res?.data?.length) {
        setDefaultData((defaultData) => ({
          ...defaultData,
          mc: [...res?.data],
        }));
        reset({ mc: [...res?.data] });
        const data = [...res?.data];
        handleData(data);
      }
    });
  }, [reset]);

  const checkCharLength = (char, min, name) => {
    if (char?.length > min)
      setError(name, {
        type: "custom",
        message: `value must be lesser than ${min}`,
      });
    else clearErrors(name);
  };

  return (
    <Card className="application-container">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <CardHeader>
          <div className="content-header">
            <h5 className="card-title">Contact </h5>
            <small className="text-muted">Enter Contact Details.</small>
          </div>
        </CardHeader>
        <CardBody>
          <CardText className="text-primary fw-bold">General Contact</CardText>
          <Row id="general" className="border mb-1 p-1">
            <Col sm={12} hidden>
              <Controller
                id="uid1"
                name="mc[0].uid"
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      {...field}
                      control={control}
                      name="mc[0].uid"
                      readOnly={isAccepted}
                      type="text"
                      invalid={errors.uid_1 && true}
                    />
                  );
                }}
              />

              {errors.chargeback_handling ? (
                <FormFeedback>
                  {errors.chargeback_handling.message}
                </FormFeedback>
              ) : null}
            </Col>
            <Col sm={12} md={6}>
              <Label className="form-label" htmlFor="first_name">
                First Name
              </Label>
              <Controller
                id="first_name"
                name="mc[0].first_name"
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      {...field}
                      readOnly={isAccepted}
                      type="text"
                      invalid={errors.first_name_0 && true}
                      onChange={(e) => {
                        checkCharLength(e.target.value, 15, "first_name_0");
                        field.onChange(e.target.value);
                      }}
                    />
                  );
                }}
              />
              {errors.first_name_0 ? (
                <FormFeedback>{errors.first_name_0.message}</FormFeedback>
              ) : null}
            </Col>
            <Col sm={12} md={6}>
              <Label className="form-label" for="last_name">
                Last Name
              </Label>
              <Controller
                id="last_name"
                name="mc[0].last_name"
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      {...field}
                      control={control}
                      name="mc[0].last_name"
                      readOnly={isAccepted}
                      type="text"
                      invalid={errors.last_name_0 && true}
                      onChange={(e) => {
                        checkCharLength(e.target.value, 15, "last_name_0");
                        field.onChange(e.target.value);
                      }}
                    />
                  );
                }}
              />
              {errors.last_name_0 ? (
                <FormFeedback>{errors.last_name_0.message}</FormFeedback>
              ) : null}
            </Col>
            <Col sm={12} md={6}>
              <Label className="form-label" for="email_address">
                Email address
              </Label>
              <Controller
                id="email_address"
                name="mc[0].email_address"
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      {...field}
                      control={control}
                      name="mc[0].email_address"
                      readOnly={isAccepted}
                      type="text"
                      invalid={errors.email_address_0 && true}
                      onChange={(e) => {
                        checkCharLength(e.target.value, 30, "email_address_0");
                        field.onChange(e.target.value);
                      }}
                    />
                  );
                }}
              />
              {errors.email_address_0 ? (
                <FormFeedback>{errors.email_address_0.message}</FormFeedback>
              ) : null}
            </Col>
            <Col sm={12} md={6}>
              <Label className="form-label" for="telephone_number">
                Telephone number
              </Label>
              <Controller
                id="telephone_number"
                name="mc[0].telephone_number"
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      {...field}
                      control={control}
                      name="mc[0].telephone_number"
                      readOnly={isAccepted}
                      type="text"
                      invalid={errors.telephone_number_0 && true}
                      onChange={(e) => {
                        checkCharLength(
                          e.target.value,
                          15,
                          "telephone_number_0"
                        );
                        field.onChange(e.target.value);
                      }}
                    />
                  );
                }}
              />
              {errors.telephone_number_0 ? (
                <FormFeedback>{errors.telephone_number_0.message}</FormFeedback>
              ) : null}
            </Col>
            <Col sm={12} md={6}>
              <Label className="form-label" for="fax_number">
                Fax number
              </Label>
              <Controller
                id="fax_number"
                name="mc[0].fax_number"
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      {...field}
                      control={control}
                      name="mc[0].fax_number"
                      readOnly={isAccepted}
                      type="text"
                      invalid={errors.fax_number_0 && true}
                      onChange={(e) => {
                        checkCharLength(e.target.value, 15, "fax_number_0");
                        field.onChange(e.target.value);
                      }}
                    />
                  );
                }}
              />
              {errors.fax_number_0 ? (
                <FormFeedback>{errors.fax_number_0.message}</FormFeedback>
              ) : null}
            </Col>
          </Row>
          <CardText
            className={`${
              technical ? "text-primary" : "text-black"
            } fw-bold mb-2`}
          >
            Is <span className="text-primary">Technical Contact </span> Diffrent
            to General Contact ?
            <div className="form-switch form-check-primary">
              <Input
                type="switch"
                name="icon-primary"
                readOnly={isAccepted}
                onChange={() => setTechnical((x) => !x)}
                checked={technical}
              />
              {!technical ? (
                <span className="text-black">No</span>
              ) : (
                <span className="text-black">Yes</span>
              )}
            </div>
          </CardText>
          {technical && (
            <Row id="technical" className={`border mb-1 p-1`}>
              <Col sm={12} md={6}>
                <Label className="form-label" htmlFor="first_name">
                  First Name
                </Label>
                <Controller
                  id="first_name"
                  name="mc[1].first_name"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Input
                        {...field}
                        control={control}
                        name="mc[1].first_name"
                        readOnly={isAccepted}
                        type="text"
                        invalid={errors.first_name_1 && true}
                        onChange={(e) => {
                          checkCharLength(e.target.value, 15, "first_name_1");
                          field.onChange(e.target.value);
                        }}
                      />
                    );
                  }}
                />
                {errors.first_name_1 ? (
                  <FormFeedback>{errors.first_name_1.message}</FormFeedback>
                ) : null}
              </Col>
              <Col sm={12} md={6}>
                <Label className="form-label" for="last_name">
                  Last Name
                </Label>
                <Controller
                  id="last_name"
                  name="mc[1].last_name"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Input
                        {...field}
                        control={control}
                        name="mc[1].last_name"
                        readOnly={isAccepted}
                        type="text"
                        invalid={errors.last_name_1 && true}
                        onChange={(e) => {
                          checkCharLength(e.target.value, 15, "last_name_1");
                          field.onChange(e.target.value);
                        }}
                      />
                    );
                  }}
                />
                {errors.last_name_1 ? (
                  <FormFeedback>{errors.last_name_1.message}</FormFeedback>
                ) : null}
              </Col>
              <Col sm={12} md={6}>
                <Label className="form-label" for="email_address">
                  Email address
                </Label>
                <Controller
                  id="email_address"
                  name="mc[1].email_address"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Input
                        {...field}
                        control={control}
                        name="mc[1].email_address"
                        readOnly={isAccepted}
                        type="text"
                        invalid={errors.email_address_1 && true}
                        onChange={(e) => {
                          checkCharLength(
                            e.target.value,
                            30,
                            "email_address_1"
                          );
                          field.onChange(e.target.value);
                        }}
                      />
                    );
                  }}
                />
                {errors.email_address_1 ? (
                  <FormFeedback>{errors.email_address_1.message}</FormFeedback>
                ) : null}
              </Col>
              <Col sm={12} md={6}>
                <Label className="form-label" for="telephone_number">
                  Telephone number
                </Label>
                <Controller
                  id="telephone_number"
                  name="mc[1].telephone_number"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Input
                        {...field}
                        control={control}
                        name="mc[1].telephone_number"
                        readOnly={isAccepted}
                        type="text"
                        invalid={errors.telephone_number_1 && true}
                        onChange={(e) => {
                          checkCharLength(
                            e.target.value,
                            15,
                            "telephone_number_1"
                          );
                          field.onChange(e.target.value);
                        }}
                      />
                    );
                  }}
                />
                {errors.telephone_number_1 ? (
                  <FormFeedback>
                    {errors.telephone_number_1.message}
                  </FormFeedback>
                ) : null}
              </Col>
            </Row>
          )}
          <CardText
            className={`${
              financial ? "text-primary" : "text-black"
            } fw-bold mb-2`}
          >
            Is <span className="text-primary">Financial Contact</span> Diffrent
            to General Contact ?
            <div className="form-switch form-check-primary">
              <Input
                type="switch"
                name="icon-primary"
                readOnly={isAccepted}
                onChange={() => setFinancial((x) => !x)}
                checked={financial}
              />
              {!financial ? (
                <span className="text-black">No</span>
              ) : (
                <span className="text-black">Yes</span>
              )}
            </div>
          </CardText>
          {financial && (
            <Row id="financial" className={`border mb-1 p-1`}>
              <Col sm={12} md={6}>
                <Label className="form-label" htmlFor="first_name">
                  First Name
                </Label>
                <Controller
                  id="first_name"
                  name="mc[2].first_name"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      control={control}
                      name="mc[2].first_name"
                      readOnly={isAccepted}
                      type="text"
                      invalid={errors.first_name_2 && true}
                      onChange={(e) => {
                        checkCharLength(e.target.value, 15, "first_name_2");
                        field.onChange(e.target.value);
                      }}
                    />
                  )}
                />
                {errors.first_name_2 ? (
                  <FormFeedback>{errors.first_name_2.message}</FormFeedback>
                ) : null}
              </Col>
              <Col sm={12} md={6}>
                <Label className="form-label" for="last_name">
                  Last Name
                </Label>
                <Controller
                  id="last_name"
                  name="mc[2].last_name"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      control={control}
                      name="mc[2].last_name"
                      readOnly={isAccepted}
                      type="text"
                      invalid={errors.last_name_2 && true}
                      onChange={(e) => {
                        checkCharLength(e.target.value, 15, "last_name_2");
                        field.onChange(e.target.value);
                      }}
                    />
                  )}
                />
                {errors.last_name_2 ? (
                  <FormFeedback>{errors.last_name_2.message}</FormFeedback>
                ) : null}
              </Col>
              <Col sm={12} md={6}>
                <Label className="form-label" for="email_address">
                  Email address
                </Label>
                <Controller
                  id="email_address"
                  name="mc[2].email_address"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      control={control}
                      name="mc[2].email_address"
                      readOnly={isAccepted}
                      type="text"
                      invalid={errors.email_address_2 && true}
                      onChange={(e) => {
                        checkCharLength(e.target.value, 30, "email_address_2");
                        field.onChange(e.target.value);
                      }}
                    />
                  )}
                />
                {errors.email_address_2 ? (
                  <FormFeedback>{errors.email_address_2.message}</FormFeedback>
                ) : null}
              </Col>
              <Col sm={12} md={6}>
                <Label className="form-label" for="telephone_number">
                  Telephone number
                </Label>
                <Controller
                  id="telephone_number"
                  name="mc[2].telephone_number"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      control={control}
                      name="mc[2].telephone_number"
                      readOnly={isAccepted}
                      type="text"
                      invalid={errors.telephone_number_2 && true}
                      onChange={(e) => {
                        checkCharLength(
                          e.target.value,
                          30,
                          "telephone_number_2"
                        );
                        field.onChange(e.target.value);
                      }}
                    />
                  )}
                />
                {errors.telephone_number_2 ? (
                  <FormFeedback>
                    {errors.telephone_number_2.message}
                  </FormFeedback>
                ) : null}
              </Col>
            </Row>
          )}
          <CardText
            className={`${
              chargback ? "text-primary" : "text-black"
            } fw-bold mb-2`}
          >
            Is <span className="text-primary">Chargback Contact </span> Diffrent
            to General Contact ?
            <div className="form-switch form-check-primary">
              <Input
                type="switch"
                name="icon-primary"
                readOnly={isAccepted}
                onChange={() => setChargback((x) => !x)}
                checked={chargback}
              />
              {!chargback ? (
                <span className="text-black">No</span>
              ) : (
                <span className="text-black">Yes</span>
              )}
            </div>
          </CardText>
          {chargback && (
            <Row id="chargback" className={`border mb-1 p-1`}>
              <Col sm={12} md={6}>
                <Label className="form-label" htmlFor="first_name">
                  First Name
                </Label>
                <Controller
                  id="first_name"
                  name="mc[3].first_name"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      control={control}
                      name="mc[3].first_name"
                      readOnly={isAccepted}
                      type="text"
                      invalid={errors.first_name_3 && true}
                      onChange={(e) => {
                        checkCharLength(e.target.value, 15, "first_name_3");
                        field.onChange(e.target.value);
                      }}
                    />
                  )}
                />
                {errors.first_name_3 ? (
                  <FormFeedback>{errors.first_name_3.message}</FormFeedback>
                ) : null}
              </Col>
              <Col sm={12} md={6}>
                <Label className="form-label" for="last_name">
                  Last Name
                </Label>
                <Controller
                  id="last_name"
                  name="mc[3].last_name"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      control={control}
                      name="mc[3].last_name"
                      readOnly={isAccepted}
                      type="text"
                      invalid={errors.last_name_3 && true}
                      onChange={(e) => {
                        checkCharLength(e.target.value, 15, "last_name_3");
                        field.onChange(e.target.value);
                      }}
                    />
                  )}
                />
                {errors.last_name_3 ? (
                  <FormFeedback>{errors.last_name_3.message}</FormFeedback>
                ) : null}
              </Col>
              <Col sm={12} md={6}>
                <Label className="form-label" for="email_address">
                  Email address
                </Label>
                <Controller
                  id="email_address"
                  name="mc[3].email_address"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      control={control}
                      name="mc[3].email_address"
                      readOnly={isAccepted}
                      type="text"
                      invalid={errors.email_address_3 && true}
                      onChange={(e) => {
                        checkCharLength(e.target.value, 30, "email_address_3");
                        field.onChange(e.target.value);
                      }}
                    />
                  )}
                />
                {errors.email_address_3 ? (
                  <FormFeedback>{errors.email_address_3.message}</FormFeedback>
                ) : null}
              </Col>
              <Col sm={12} md={6}>
                <Label className="form-label" for="telephone_number">
                  Telephone number
                </Label>
                <Controller
                  id="telephone_number"
                  name="mc[3].telephone_number"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      control={control}
                      name="mc[3].telephone_number"
                      readOnly={isAccepted}
                      type="text"
                      invalid={errors.telephone_number_3 && true}
                      onChange={(e) => {
                        checkCharLength(
                          e.target.value,
                          30,
                          "telephone_number_3"
                        );
                        field.onChange(e.target.value);
                      }}
                    />
                  )}
                />
                {errors.telephone_number_3 ? (
                  <FormFeedback>
                    {errors.telephone_number_3.message}
                  </FormFeedback>
                ) : null}
              </Col>
            </Row>
          )}
        </CardBody>
        <CardFooter className="d-flex justify-content-between mt-3">
          <Button
            onClick={() => {
              navigate("/merchant-status");
            }}
            color="secondry btn-outline-secondary"
          >
            <span className="align-middle d-sm-inline-block d-none">
              Previous
            </span>
          </Button>
          <div>
            <button
              color="primary"
              className={`btn-next ${loader ? "d-none" : "d-block"}`}
              type="submit"
              onClick={() => clearErrors()}
            >
              Next
            </button>
            <button
              color="primary"
              className={`btn-next ${loader ? "d-block" : "d-none"}`}
              type="submit"
              disabled
            >
              <Spinner size={"md"} />
            </button>
          </div>
        </CardFooter>
      </Form>
    </Card>
  );
};

export default MerchanContact;
