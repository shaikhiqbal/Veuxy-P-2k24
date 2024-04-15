// ** React Imports
import { useEffect, useState } from "react";

// ** Custom Components
import country_code from "../../../../../country_code.json";

// ** Icons
import { Trash } from "react-feather";

// ** Jwt
import useJwt from "@src/dashboard/jwt/useJwt";

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
// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardText,
  Form,
  Label,
  Input,
  Button,
  CardFooter,
  Spinner,
  FormFeedback,
} from "reactstrap";

import "./style/style.css";
import { useNavigate } from "react-router-dom";

const directorTemplate = {
  application_id: localStorage.getItem("application_id"),
  first_name: "",
  last_name: "",
  date_of_birth: "",
  house_number: "",
  street_address: "",
  zip_code: "",
  city: "",
  country: "",
  telephone_number: "",
  passport: "",
  social_security_number: "",
  cop_type: 1,
};
const uboTemplate = {
  application_id: localStorage.getItem("application_id"),
  first_name: "",
  last_name: "",
  date_of_birth: "",
  house_number: "",
  street_address: "",
  zip_code: "",
  city: "",
  country: "",
  telephone_number: "",
  passport: "",
  social_security_number: "",
  cop_type: 2,
};

const CompanyOwner = (props) => {
  const { application_id, next ,renderDocument} = props;
  const directorErrorrTemplate = {
    first_name: { message: "" },
    last_name: { message: "" },
    date_of_birth: { message: "" },
    house_number: { message: "" },
    street_address: { message: "" },
    zip_code: { message: "" },
    city: { message: "" },
    country: { message: "" },
    telephone_number: { message: "" },
    passport: { message: "" },
    social_security_number: { message: "" },
  };
  const uboErrorTemplate = {
    first_name: { message: "" },
    last_name: { message: "" },
    date_of_birth: { message: "" },
    house_number: { message: "" },
    street_address: { message: "" },
    zip_code: { message: "" },
    city: { message: "" },
    country: { message: "" },
    telephone_number: { message: "" },
    passport: { message: "" },
    social_security_number: { message: "" },
  };

  // ** State
  const [directorFeild, setDirectorFeild] = useState([{ ...directorTemplate }]);
  const [uboFeild, setUboFeild] = useState([{ ...uboTemplate }]);
  const [directorError, setDirectorError] = useState([
    { ...directorErrorrTemplate },
  ]);
  const [uboError, setUboError] = useState([{ ...uboErrorTemplate }]);
  const [anyUBO, setAnyUBO] = useState(false);
  const [loader, setLoader] = useState(false);
  const [isAccepted, setAccepted] = useState(false);
  const [isPosted, setIsPosted] = useState(false);
  const [postedData, setPostedData] = useState([]);
  const [updatedData, setUpdatedData] = useState([]);
  const [isUpdated, setIsUdated] = useState(false);
  const [callGet, setCallGet] = useState(false);
  const applicationID = localStorage.getItem("application_id");
  const navigate = useNavigate();
  // ** Add User
  const AddUser = (setUser, template, formType) => {
    const value = { ...template };
    if (formType === "director") {
      setDirectorError((previous) => [
        ...previous,
        { ...directorErrorrTemplate },
      ]);
    } else if (formType === "ubo") {
      setUboError((previous) => [...previous, { ...uboErrorTemplate }]);
    }
    setUser((previous) => [...previous, value]);
  };

  // ** Remove User
  const removeFeild = (index, users, setUser, usertype) => {
    // cop_delete

    function remove(t) {
      const temp = [...users];
      if (temp.length === 1 && index === 0 && t) {
        return alert("pleas fill atleast one director details");
      }
      if (usertype === "director") {
        const error = [...directorError];
        error.splice(index, 1);
        setDirectorError([...error]);
      }
      if (usertype === "ubo") {
        const error = [...uboError];
        error.splice(index, 1);
        setUboError([...error]);
      }
      temp.splice(index, 1);
      setUser([...temp]);
    }

    if (users[index]["uid"]) {
      useJwt.cop_delete(users[index]["uid"]).then((res) => {
        if (res.status === 204) {
          remove(false);
        }
      });
    } else {
      remove(true);
    }
  };
  // ** Country
  const country = country_code.map((e, i) => {
    return <option key={i}>{e.name}</option>;
  });

  const handleDirectorValues = (index, event, users, setUsers, max) => {
    const values = [...users];
    const message = `value should be less than ${max}`;
    values[index][event.target.name] = event.target.value;
    if (values[index].cop_type === 1) {
      if (values[index][event.target.name]?.length > max) {
        const errorsForm = [...directorError];
        errorsForm[index][event.target.name].message = message;
        setDirectorError([...errorsForm]);
      } else {
        const errorsForm = [...directorError];
        errorsForm[index][event.target.name].message = "";
        setDirectorError([...errorsForm]);
      }
    } else if (values[index].cop_type === 2) {
      // validation(index, event.target.name, uboError, setUboError, message);
      if (values[index][event.target.name]?.length > max) {
        const errorsForm = [...uboError];
        errorsForm[index][event.target.name].message = message;
        setUboError([...errorsForm]);
      } else {
        const errorsForm = [...uboError];
        errorsForm[index][event.target.name].message = "";
        setUboError([...errorsForm]);
      }
    }
    setUsers([...values]);
  };
  //** post data
  const postData = (data) => {
    useJwt
      .postcompanyownershipprofile(data)
      .then((res) => {
        if (res?.status === 201) {
          renderDocument((pre) => !pre);
          setLoader(false);
        }
      })
      .catch((err) => {
        if (err?.response?.status === 406) {
          alert(err?.response);
        }
      });
  };

  //** updata data
  const updateData = (uid, data) => {
    useJwt
      .putCompanyownershipprofile(uid, data)
      .then((res) => {
        if (res.status === 200) {
          setLoader(false);
        }
      })
      .catch((err) => alert(err?.response?.status));
  };
  // ** Filter Data
  const filterData = (post = [], put = [], data = []) => {
    if (!data.length) return;
    let application_id = localStorage.getItem("application_id");
    for (let i = 0; i < data.length; i++) {
      if (data[i]?.date_of_birth?.length == 0) {
        delete data[i]?.date_of_birth;
      }
      if (data[i]?.uid) {
        put.push({
          ...data[i],
          application_id: localStorage.getItem("application_id"),
        });
      } else if (!data[i]?.uid) {
        post.push(data[i]);
      }
    }
  };

  const landNextpage = (post = [], put = []) => {
    // {{debugger}}
    if (!post.length && !put.length) return;
    if (put.length > 0 && isUpdated && post.length > 0 && isPosted) {
      next("3");
      setLoader(false);
      setCallGet((prev) => !prev);
      setIsPosted(!isPosted);
      setIsUdated(!isUpdated);
    } else if (put.length === 0 && !isUpdated && post.length > 0 && isPosted) {
      setCallGet((prev) => !prev);
      setLoader(false);
      next("3");
      setIsPosted(!isPosted);
    } else if (put.length > 0 && isUpdated && post.length == 0 && !isPosted) {
      setCallGet((prev) => !prev);
      next("3");
      setLoader(false);
      setIsUdated(!isUpdated);
    }
    // console.log(put.length > 0 && isUpdated && post.length === 0 && !isPosted);
  };

  const onSubmit = () => {
    setLoader(true);
    if (applicationID == "undefined") {
      handleWarning();
      next("1");
    } else {
      let merged;
      if (anyUBO) {
        merged = directorFeild.concat(uboFeild);
      } else {
        merged = directorFeild;
      }
      const post = [];
      const put = [];

      filterData(post, put, merged);

      if (post.length) {
        postData({ cop: post });
        setIsPosted(true);
      }
      if (put.length) {
        updateData(put[0].uid, { cop: put });
        setIsUdated(true);
      }
      setPostedData([...post]);
      setUpdatedData([...put]);
    }
  };

  const setGetData = (data) => {
    if (!data) return;
    setDirectorFeild([]);

    const cp1 = [];
    const cp2 = [];
    const errorCp1 = [];
    const errorCp2 = [];

    for (let i = 0; i < data.length; i++) {
      if (data[i].cop_type === 2) {
        setUboFeild([]);
        setAnyUBO(true);
        break;
      }
    }
    for (let i = 0; i < data.length; i++) {
      if (data[i]["cop_type"] === 1) {
        cp1.push(data[i]);
        errorCp1.push({ ...directorErrorrTemplate });
      } else if (data[i]["cop_type"] === 2) {
        cp2.push(data[i]);
        errorCp2.push({ ...uboErrorTemplate });
      }
    }
    if (cp1.length > 0) {
      for (let i = 0; i < cp1.length; i++) {
        for (let key of Object.keys(cp1[i])) {
          if (!cp1[i][key]) {
            if (errorCp1[i][key]) {
              errorCp1[i][key].message = "Empty feild";
            }
          }
        }
      }
      setDirectorError([...errorCp1]);
    }
    if (cp2.length > 0) {
      for (let i = 0; i < cp2.length; i++) {
        for (let key of Object.keys(cp2[i])) {
          if (!cp2[i][key]) {
            if (errorCp2[i][key]) {
              errorCp2[i][key].message = "Empty feild";
            }
          }
        }
      }
      setUboError([...errorCp2]);
    }

    if (cp1.length > 0) setDirectorFeild([...cp1]);
    if (cp2.length > 0) setUboFeild([...cp2]);
  };

  useEffect(() => {
    landNextpage(postedData, updatedData);
  }, [postedData, updatedData, isPosted, isUpdated]);

  useEffect(() => {
    useJwt.cop_get_view({ application_id: application_id }).then((res) => {
      if (res?.status === 200 && res.data.length > 0) {
        setGetData(res?.data);
      }
    });
  }, [callGet, application_id]);

  return (
    <Card className="application-container">
      <CardHeader>
        <div className="content-header">
          <h5 className="card-title">Company Ownership</h5>
          <small className="text-muted">Add Owners Details.</small>
        </div>
      </CardHeader>
      <CardBody>
        {/* Director Template  */}
        {directorFeild.map((i, index) => (
          <Row id="director-template" className="dynamic-form-template">
            <div className="content-header dynamic-form-header mb-3">
              <div className="card-form-title">
                <span>{index + 1}:Director</span>
              </div>
              <button
                className="trash"
                onClick={() =>
                  removeFeild(
                    index,
                    directorFeild,
                    setDirectorFeild,
                    "director"
                  )
                }
              >
                <Trash size={16} />
              </button>
            </div>
            <Col md="6" sm="12" className="mb-1">
              <Label className="form-label" htmlFor="first_name">
                First Name
              </Label>
              <Input
                readOnly={isAccepted}
                className={`${
                  directorError[index]["first_name"]?.message
                    ? "inputError"
                    : null
                }`}
                type="text"
                name="first_name"
                value={i.first_name}
                onChange={(event) =>
                  handleDirectorValues(
                    index,
                    event,
                    directorFeild,
                    setDirectorFeild,
                    10
                  )
                }
              />

              {directorError[index]?.first_name?.message ? (
                <small className="text-danger">
                  {directorError[index]?.first_name?.message}
                </small>
              ) : null}
            </Col>
            <Col md="6" sm="12" className="mb-1">
              <Label className="form-label" htmlFor="last_name">
                Last Name
              </Label>
              <Input
                readOnly={isAccepted}
                className={`${
                  directorError[index]["last_name"]?.message
                    ? "inputError"
                    : null
                }`}
                type="text"
                name="last_name"
                value={i.last_name}
                onChange={(event) =>
                  handleDirectorValues(
                    index,
                    event,
                    directorFeild,
                    setDirectorFeild,
                    10
                  )
                }
              />
              {directorError[index]?.last_name?.message ? (
                <small className="text-danger">
                  {directorError[index]?.last_name?.message}
                </small>
              ) : null}
            </Col>
            <Col md="6" sm="12" className="mb-1">
              <Label className="form-label" htmlFor="date_of_birth">
                Date of Birth
              </Label>
              <Input
                readOnly={isAccepted}
                className={`${
                  directorError[index]["date_of_birth"]?.message
                    ? "inputError"
                    : null
                }`}
                type="date"
                id="date_of_birth"
                name="date_of_birth"
                value={i.date_of_birth}
                onChange={(event) =>
                  handleDirectorValues(
                    index,
                    event,
                    directorFeild,
                    setDirectorFeild
                  )
                }
              />
              {directorError[index]?.date?.message ? (
                <small className="text-danger">
                  {directorError[index]?.date?.message}
                </small>
              ) : null}
            </Col>
            <Col md="6" sm="12" className="mb-1">
              <Label className="form-label" for="street_address">
                Street Address
              </Label>
              <Input
                readOnly={isAccepted}
                className={`${
                  directorError[index]["street_address"]?.message
                    ? "inputError"
                    : null
                }`}
                type="text"
                name="street_address"
                value={i.street_address}
                onChange={(event) =>
                  handleDirectorValues(
                    index,
                    event,
                    directorFeild,
                    setDirectorFeild
                  )
                }
              />
              {directorError[index]?.street_address?.message ? (
                <small className="text-danger">
                  {directorError[index]?.street_address?.message}
                </small>
              ) : null}
            </Col>
            <Col md="6" sm="12" className="mb-1">
              <Label className="form-label" for="house_number">
                Office / House number
              </Label>
              <Input
                readOnly={isAccepted}
                className={`${
                  directorError[index]["house_number"]?.message
                    ? "inputError"
                    : null
                }`}
                type="text"
                name="house_number"
                value={i.house_number}
                onChange={(event) =>
                  handleDirectorValues(
                    index,
                    event,
                    directorFeild,
                    setDirectorFeild,
                    10
                  )
                }
              />
              {directorError[index]?.house_number?.message ? (
                <small className="text-danger">
                  {directorError[index]?.house_number?.message}
                </small>
              ) : null}
            </Col>
            <Col md="6" sm="12" className="mb-1">
              <Label className="form-label" for="zip_code">
                Postcode / zip code
              </Label>
              <Input
                readOnly={isAccepted}
                className={`${
                  directorError[index]["zip_code"]?.message
                    ? "inputError"
                    : null
                }`}
                type="text"
                name="zip_code"
                value={i.zip_code}
                onChange={(event) =>
                  handleDirectorValues(
                    index,
                    event,
                    directorFeild,
                    setDirectorFeild,
                    10
                  )
                }
              />
              {directorError[index]?.zip_code?.message ? (
                <small className="text-danger">
                  {directorError[index]?.zip_code?.message}
                </small>
              ) : null}
            </Col>
            <Col md="6" sm="12" className="mb-1">
              <Label className="form-label" for="city">
                City
              </Label>
              <Input
                readOnly={isAccepted}
                className={`${
                  directorError[index]["city"]?.message ? "inputError" : null
                }`}
                type="text"
                name="city"
                value={i.city}
                onChange={(event) =>
                  handleDirectorValues(
                    index,
                    event,
                    directorFeild,
                    setDirectorFeild,
                    10
                  )
                }
              />
              {directorError[index]?.city?.message ? (
                <small className="text-danger">
                  {directorError[index]?.city?.message}
                </small>
              ) : null}
            </Col>
            <Col md="6" sm="12" className="mb-1">
              <Label className="form-label" for="country">
                Country
              </Label>
              <Input
                readOnly={isAccepted}
                className={`${
                  directorError[index]["country"]?.message ? "inputError" : null
                }`}
                type="select"
                name="country"
                value={i.country}
                onChange={(event) =>
                  handleDirectorValues(
                    index,
                    event,
                    directorFeild,
                    setDirectorFeild
                  )
                }
              >
                <option>---select---</option>
                {country}
              </Input>
              {directorError[index]?.country?.message ? (
                <small className="text-danger">
                  {directorError[index]?.country?.message}
                </small>
              ) : null}
            </Col>
            <Col md="6" sm="12" className="mb-1">
              <Label className="form-label" for="telephone_number">
                Telephone Number
              </Label>
              <Input
                readOnly={isAccepted}
                className={`${
                  directorError[index]["telephone_number"]?.message
                    ? "inputError"
                    : null
                }`}
                type="text"
                name="telephone_number"
                value={i.telephone_number}
                onChange={(event) =>
                  handleDirectorValues(
                    index,
                    event,
                    directorFeild,
                    setDirectorFeild,
                    10
                  )
                }
              />
              {directorError[index]?.telephone_number?.message ? (
                <small className="text-danger">
                  {directorError[index]?.telephone_number?.message}
                </small>
              ) : null}
            </Col>
            <Col md="6" sm="12" className="mb-1">
              <Label className="form-label" for="passport">
                Passport ID/Number
              </Label>
              <Input
                readOnly={isAccepted}
                className={`${
                  directorError[index]["passport"]?.message
                    ? "inputError"
                    : null
                }`}
                type="text"
                name="passport"
                value={i.passport}
                onChange={(event) =>
                  handleDirectorValues(
                    index,
                    event,
                    directorFeild,
                    setDirectorFeild,
                    10
                  )
                }
              />
              {directorError[index]?.passport?.message ? (
                <small className="text-danger">
                  {directorError[index]?.passport?.message}
                </small>
              ) : null}
            </Col>
            <Col md="6" sm="12" className="mb-1">
              <Label className="form-label" for="social_security_number">
                Social Security Number
              </Label>
              <Input
                readOnly={isAccepted}
                className={`${
                  directorError[index]["social_security_number"]?.message
                    ? "inputError"
                    : null
                }`}
                type="text"
                name="social_security_number"
                value={i.social_security_number}
                onChange={(event) =>
                  handleDirectorValues(
                    index,
                    event,
                    directorFeild,
                    setDirectorFeild,
                    10
                  )
                }
              />
              {directorError[index]?.social_security_number?.message ? (
                <small className="text-danger">
                  {directorError[index]?.social_security_number?.message}
                </small>
              ) : null}
            </Col>
          </Row>
        ))}
        <CardText className="d-flex justify-content-center add-more-btn mb-2">
          <button
            className="add-more-btn"
            onClick={() =>
              AddUser(setDirectorFeild, directorTemplate, "director")
            }
          >
            Add More Director's
          </button>
        </CardText>
        <CardText className=" fw-bold">
          Are there Ultimate Beneficial Owner owning 10% or more of the company{" "}
          <div className="form-switch form-check-primary">
            <Input
              readOnly={isAccepted}
              type="switch"
              name="icon-primary"
              onChange={() => {
                setAnyUBO(!anyUBO);
              }}
              checked={anyUBO}
            />
          </div>
        </CardText>
        {anyUBO &&
          uboFeild.map((i, index) => (
            <Row id="ubo-template" className="dynamic-form-template">
              <div className="content-header dynamic-form-header mb-3">
                <div className="card-form-title">
                  <span>{index + 1}:Ultimate Beneficial Owner</span>
                </div>
                <button
                  className="trash"
                  onClick={() =>
                    removeFeild(index, uboFeild, setUboFeild, "ubo")
                  }
                >
                  <Trash size={16} />
                </button>
              </div>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" htmlFor="first_name">
                  First Name
                </Label>
                <Input
                  readOnly={isAccepted}
                  className={`${
                    uboError[index]["first_name"]?.message ? "inputError" : null
                  }`}
                  type="text"
                  id="first_name"
                  name="first_name"
                  value={i.first_name}
                  onChange={(event) =>
                    handleDirectorValues(
                      index,
                      event,
                      uboFeild,
                      setUboFeild,
                      10
                    )
                  }
                />
                {uboError[index]?.first_name?.message ? (
                  <small className="text-danger">
                    {uboError[index]?.first_name?.message}
                  </small>
                ) : null}
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" htmlFor="last_name">
                  Last Name
                </Label>
                <Input
                  readOnly={isAccepted}
                  className={`${
                    uboError[index]["last_name"]?.message ? "inputError" : null
                  }`}
                  type="text"
                  id="last_name"
                  name="last_name"
                  value={i.last_name}
                  onChange={(event) =>
                    handleDirectorValues(
                      index,
                      event,
                      uboFeild,
                      setUboFeild,
                      10
                    )
                  }
                />
                {uboError[index]?.last_name?.message ? (
                  <small className="text-danger">
                    {uboError[index]?.last_name?.message}
                  </small>
                ) : null}
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" htmlFor="date_of_birth">
                  Date of Birth
                </Label>
                <Input
                  readOnly={isAccepted}
                  className={`${
                    uboError[index]["date_of_birth"]?.message
                      ? "inputError"
                      : null
                  }`}
                  type="date"
                  id="date_of_birth"
                  name="date_of_birth"
                  value={i.date_of_birth}
                  onChange={(event) =>
                    handleDirectorValues(index, event, uboFeild, setUboFeild)
                  }
                />
                {uboError[index]?.date_of_birth?.message ? (
                  <small className="text-danger">
                    {uboError[index]?.date_of_birth?.message}
                  </small>
                ) : null}
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="street_address">
                  Street Address
                </Label>
                <Input
                  readOnly={isAccepted}
                  className={`${
                    uboError[index]["street_address"]?.message
                      ? "inputError"
                      : null
                  }`}
                  type="text"
                  id="street_address"
                  name="street_address"
                  value={i.street_address}
                  onChange={(event) =>
                    handleDirectorValues(
                      index,
                      event,
                      uboFeild,
                      setUboFeild,
                      10
                    )
                  }
                />
                {uboError[index]?.street_address?.message ? (
                  <small className="text-danger">
                    {uboError[index]?.street_address?.message}
                  </small>
                ) : null}
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="house_number">
                  Office / House number
                </Label>
                <Input
                  readOnly={isAccepted}
                  className={`${
                    uboError[index]["house_number"]?.message
                      ? "inputError"
                      : null
                  }`}
                  type="text"
                  id="house_number"
                  name="house_number"
                  value={i.house_number}
                  onChange={(event) =>
                    handleDirectorValues(
                      index,
                      event,
                      uboFeild,
                      setUboFeild,
                      10
                    )
                  }
                />
                {uboError[index]?.house_number?.message ? (
                  <small className="text-danger">
                    {uboError[index]?.house_number?.message}
                  </small>
                ) : null}
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="zip_code">
                  Postcode / zip code
                </Label>
                <Input
                  readOnly={isAccepted}
                  className={`${
                    uboError[index]["zip_code"]?.message ? "inputError" : null
                  }`}
                  type="text"
                  id="zip_code"
                  name="zip_code"
                  value={i.zip_code}
                  onChange={(event) =>
                    handleDirectorValues(
                      index,
                      event,
                      uboFeild,
                      setUboFeild,
                      10
                    )
                  }
                />
                {uboError[index]?.zip_code?.message ? (
                  <small className="text-danger">
                    {uboError[index]?.zip_code?.message}
                  </small>
                ) : null}
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="city">
                  City
                </Label>
                <Input
                  readOnly={isAccepted}
                  className={`${
                    uboError[index]["city"]?.message ? "inputError" : null
                  }`}
                  type="text"
                  id="city"
                  name="city"
                  value={i.city}
                  onChange={(event) =>
                    handleDirectorValues(
                      index,
                      event,
                      uboFeild,
                      setUboFeild,
                      10
                    )
                  }
                />
                {uboError[index]?.city?.message ? (
                  <small className="text-danger">
                    {uboError[index]?.city?.message}
                  </small>
                ) : null}
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="country">
                  Country
                </Label>
                <Input
                  readOnly={isAccepted}
                  className={`${
                    uboError[index]["country"]?.message ? "inputError" : null
                  }`}
                  type="select"
                  id="country"
                  name="country"
                  value={i.country}
                  onChange={(event) =>
                    handleDirectorValues(index, event, uboFeild, setUboFeild)
                  }
                >
                  <option>---select---</option>
                  {country}
                </Input>
                {uboError[index]?.country?.message ? (
                  <small className="text-danger">
                    {uboError[index]?.country?.message}
                  </small>
                ) : null}
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="telephone_number">
                  Telephone Number
                </Label>
                <Input
                  readOnly={isAccepted}
                  className={`${
                    uboError[index]["telephone_number"]?.message
                      ? "inputError"
                      : null
                  }`}
                  type="text"
                  id="telephone_number"
                  name="telephone_number"
                  value={i.telephone_number}
                  onChange={(event) =>
                    handleDirectorValues(
                      index,
                      event,
                      uboFeild,
                      setUboFeild,
                      10
                    )
                  }
                />
                {uboError[index]?.telephone_number?.message ? (
                  <small className="text-danger">
                    {uboError[index]?.telephone_number?.message}
                  </small>
                ) : null}
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="passport">
                  Passport ID/Number
                </Label>
                <Input
                  readOnly={isAccepted}
                  className={`${
                    uboError[index]["passport"]?.message ? "inputError" : null
                  }`}
                  type="text"
                  id="passport"
                  name="passport"
                  value={i.passport}
                  onChange={(event) =>
                    handleDirectorValues(
                      index,
                      event,
                      uboFeild,
                      setUboFeild,
                      10
                    )
                  }
                />
                {uboError[index]?.passport?.message ? (
                  <small className="text-danger">
                    {uboError[index]?.passport?.message}
                  </small>
                ) : null}
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="social_security_number">
                  Social Security Number
                </Label>
                <Input
                  readOnly={isAccepted}
                  className={`${
                    uboError[index]["social_security_number"]?.message
                      ? "inputError"
                      : null
                  }`}
                  type="text"
                  id="social_security_number"
                  name="social_security_number"
                  value={i.social_security_number}
                  onChange={(event) =>
                    handleDirectorValues(
                      index,
                      event,
                      uboFeild,
                      setUboFeild,
                      10
                    )
                  }
                />
                {uboError[index]?.social_security_number?.message ? (
                  <small className="text-danger">
                    {uboError[index]?.social_security_number?.message}
                  </small>
                ) : null}
              </Col>
            </Row>
          ))}
        {/* Ubo Template  */}
        {anyUBO && (
          <CardText className="d-flex justify-content-center add-more-btn mb-2">
            {" "}
            <button
              className="add-more-btn"
              onClick={() => AddUser(setUboFeild, uboTemplate, "ubo")}
            >
              Add More Ultimate Beneficial Owners
            </button>
          </CardText>
        )}
      </CardBody>
      <CardFooter className="d-flex justify-content-between mt-3">
        <Button
          onClick={() => {
            next("1");
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
            onClick={onSubmit}
          >
            Next
          </button>
          <button
            color="primary"
            className={`btn-next ${loader ? "d-block" : "d-none"}`}
            disabled
          >
            <Spinner size={"md"} />
          </button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CompanyOwner;
