import { useState, Fragment, useEffect } from "react";
import { Trash } from "react-feather";
// ** third party
import {
  Label,
  Button,
  Input,
  CardFooter,
  Spinner,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardText,
} from "reactstrap";
import Select from "react-select";

// ** Country Api
import country_code from "../../../../../country_code.json";
import country_currency from "../../../../../country_currency.json";

// ** Thirdparty Input
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

// ** Utils
import { selectThemeColors } from "@utils";

// ** JWT
import useJwt from "@src/dashboard/jwt/useJwt";

import "./style/style.css";

const formTemplate = {
  application_id: localStorage.getItem("application_id"),
  settlement_currency: "",
  processing_currency: "",
  bank_account_holder: "",
  bank_name: "",
  bank_account_number: "",
  bank_address: "",
  bic_code: "",
  zip_code: "",
  iban_number: "",
  city: "",
  bank_sort_code: "",
  country: "",
  routing_number: "",
  bank_telephone_number: "",
};
const setupProcessingCurrency = (setUserData, userData = [], option) => {
  let bucket = [];
  let length = userData.length;
  for (let i = 0; i < length; i++) {
    bucket.push([]);
  }
  for (let i = 0; i < length; i++) {
    let str = userData[i]?.processing_currency;
    if (!str) continue;
    else {
      const categoryFilter = (val) => {
        let label = option.filter((el) => el.label === val);
        return label;
      };
      let processing_data = Array.prototype.concat.apply(
        [],
        str?.split(",").map((val) => categoryFilter(val))
      );
      bucket[i] = [...processing_data];
    }
  }
  setUserData([...bucket]);
};

const SettlementBank = (props) => {
  const { application_id, next } = props;
  const errorTemplate = {
    settlement_currency: { message: "" },
    processing_currency: { message: "" },
    bank_account_holder: { message: "" },
    bank_name: { message: "" },
    bank_account_number: { message: "" },
    bank_address: { message: "" },
    bic_code: { message: "" },
    zip_code: { message: "" },
    iban_number: { message: "" },
    city: { message: "" },
    bank_sort_code: { message: "" },
    country: { message: "" },
    routing_number: { message: "" },
    bank_telephone_number: { message: "" },
  };

  // ** States
  const [isPut, setPut] = useState(false);
  const [putData, setPutData] = useState([]);
  const [isPost, setPost] = useState(false);
  const [postData, setPostData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [recallGet, setRecallGet] = useState(false);
  const [bankDetailFeild, setBankDetailFeild] = useState([{ ...formTemplate }]);
  const [error, setError] = useState([{ ...errorTemplate }]);
  const [processing_currency, setProcessing_currency] = useState([[]]);
  const applicationID = localStorage.getItem("application_id");

  // ** Country-Code
  const country = country_code.map((e, i) => {
    return <option key={i}>{e.name}</option>;
  });

  // ** Dates
  const Data = Object.keys(country_currency).map((key, i) => {
    return (
      <option key={i}>
        {key} - {country_currency[key]}
      </option>
    );
  });

  // ** Country Currency
  let option = [];
  for (var key in country_currency) {
    option = [...option, { value: key, label: country_currency[key] }];
  }

  // ** Handle Select
  const handleSelect = (selectedOption, idx, value = []) => {
    let keySkill = "";
    let tempValue = [...value];
    for (var option of selectedOption) {
      keySkill += option["label"] + ",";
    }
    tempValue[idx] = selectedOption;
    setProcessing_currency([...tempValue]);
    bankDetailFeild[idx].processing_currency = keySkill;
  };

  // ** Add Feilds
  const AddFeild = (setUser, template) => {
    const value = { ...template };
    setUser((previous) => [...previous, value]);
    setProcessing_currency((previous) => [...previous, []]);
    setError((previous) => [...previous, { ...errorTemplate }]);
  };

  // ** Remove Feild
  const removeFeild = (index, users, setUser) => {
    const tempUserData = [...users];
    const errorValues = [...error];
    const tempArr = [...processing_currency];
    if (tempUserData.length === 1 && index === 0) {
      return alert("pleas fill atleast one bank details");
    }
    function remove(t) {
      const temp = [...users];

      if (temp.length === 1 && index === 0 && t) {
        return alert("pleas fill atleast one director details");
      }
      tempUserData.splice(index, 1);
      tempArr.splice(index, 1);
      errorValues.splice(index, 1);
      setProcessing_currency(tempArr);
      setUser(tempUserData);
      setError([...errorValues]);
    }
    if (users[index]["uid"]) {
      useJwt.sbd_delete(users[index]["uid"]).then((res) => {
        if (res.status === 204) {
          remove(false);
        }
      });
    } else {
      remove(true);
    }
  };
  // ** Handle Change
  const handleChange = (index, event, max) => {
    const values = [...bankDetailFeild];
    const errorValues = [...error];
    values[index][event.target.name] = event.target.value;
    if (values[index][event.target.name]?.length > max) {
      errorValues[index][
        event.target.name
      ].message = `value should be lesser than ${max}`;
    } else {
      errorValues[index][event.target.name].message = "";
    }
    setBankDetailFeild(values);
  };

  // ** Post
  const postTheData = (data) => {
    useJwt
      .postsettlementbankdetails(data)
      .then((res) => {
        if (res?.status === 201) {
          setPost(true);
          setLoader(false);
        }
      })
      .catch((err) => {
        alert(err?.response);
        setLoader(false);
      });
  };

  // ** Update
  const updateData = (data) => {
    useJwt
      .putsettlementbankdetails(data.sbd[0].uid, data)
      .then((res) => {
        if (res?.status === 200) setPut(true);
      })
      .catch((err) => {
        console.log(err?.massage);
        setLoader(false);
      });
  };

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

  // ** Submit
  const onSubmit = () => {
    setLoader(true);
    if (applicationID == "undefined") {
      handleWarning();
      next("1");
    } else {
      const put = [];
      const post = [];

      filterData(post, put, bankDetailFeild);
      setPostData(post);
      setPutData(put);
      if (put.length > 0) {
        updateData({ sbd: put });
      }
      if (post.length > 0) {
        postTheData({ sbd: post });
      }

      // if (put.length > 0 && isPut && post.length > 0 && isPost) {
      //   next("6");
      //   setLoader(false);
      // } else if (put.length > 0 && isPut && post.length === 0 && !isPost) {
      //   next("6");
      //   setLoader(false);
      // } else if (post.length > 0 && isPost && put.length == 0 && !isPut) {
      //   next("6");
      // }
    }
  };

  useEffect(() => {
    if (postData.length && isPost && !putData.length && !isPut) {
      next("6");
      setLoader(false);
      setRecallGet(!recallGet)
    } else if (postData.length && isPost && putData.length && isPut) {
      next("6");
      setLoader(false);
      setRecallGet(!recallGet)
    } else if (!postData.length && !isPost && putData.length && isPut) {
      next("6");
      setLoader(false);
      setRecallGet(!recallGet)
    }
  }, [isPost, isPut]);

  // ** Get API Data
  useEffect(() => {
    useJwt.sbd_get_view({ application_id }).then((res) => {
      if (res.status === 200 && res.data.length > 0) {
        setBankDetailFeild([]);
        setBankDetailFeild([...res?.data]);
        setProcessing_currency([]);
        setupProcessingCurrency(setProcessing_currency, res?.data, option);
        const errorValue = [];
        const data = res.data;
        data.forEach((i) => {
          errorValue.push({ ...errorTemplate });
        });
        for (let i = 0; i < data.length; i++) {
          for (let key of Object.keys(data[i])) {
            if (key === "bank_account_holder" || key === "bank_name") {
            }
            if (!data[i][key]?.length) {
              if (errorValue[i][key]) {
                errorValue[i][key].message = "Empty feild";
              }
            }
          }
        }
        setError([...errorValue]);
      }
    });
  }, [application_id,recallGet]);
  return (
    <Card className="application-container">
      <CardHeader>
        <div className="content-header">
          <h5 className="card-title">Settlement Bank </h5>
          <small className="text-muted">Enter Settlement Details.</small>
        </div>
      </CardHeader>
      <CardBody>
        {bankDetailFeild &&
          bankDetailFeild.map((i, index) => {
            return (
              <Row id="ubo-template" className="dynamic-form-template">
                <div className="content-header dynamic-form-header mb-3">
                  <div className="card-form-title">
                    <span>{index + 1}: Settlement Bank Details</span>
                  </div>
                  <button
                    className="trash"
                    onClick={() =>
                      removeFeild(index, bankDetailFeild, setBankDetailFeild)
                    }
                  >
                    <Trash size={16} />
                  </button>
                </div>
                <Col md="6" sm="12" className="mb-1">
                  <Label className="form-label" htmlFor="settlement_currency">
                    SETTLEMENT CURRENCY <span>(select one)</span>
                  </Label>
                  <Input
                    onChange={(event) => handleChange(index, event)}
                    className={`${
                      error[index]["date_of_birth"]?.message
                        ? "inputError"
                        : null
                    }`}
                    value={i.settlement_currency}
                    name="settlement_currency"
                    type="select"
                  >
                    <option>SELECT (one)</option>
                    {Data}
                  </Input>
                </Col>
                <Col md="6" sm="12" className="mb-1">
                  <Label className="form-label" htmlFor="processing_currency">
                    PROCESSING CURRENCY/IES
                    <p>CTRL and click to select multiple</p>
                  </Label>
                  <Select
                    isClearable={false}
                    theme={selectThemeColors}
                    isMulti
                    value={processing_currency[index]}
                    name="colors"
                    options={option}
                    handleChange
                    className="react-select"
                    onChange={(evt) =>
                      handleSelect(evt, index, processing_currency)
                    }
                    classNamePrefix="select"
                  />
                  {/* max 20 */}
                </Col>
                <Col md="6" sm="12" className="mb-1">
                  <Label className="form-label" htmlFor="bank_account_holder">
                    Bank account holder
                  </Label>
                  <Input
                    type="text"
                    name="bank_account_holder"
                    value={i.bank_account_holder}
                    onChange={(event) => handleChange(index, event, 32)}
                    className={`${
                      error[index]["bank_account_holder"]?.message
                        ? "inputError"
                        : null
                    }`}
                  />
                  {error[index]?.bank_account_holder?.message ? (
                    <small className="text-danger">
                      {error[index]?.bank_account_holder?.message}
                    </small>
                  ) : null}
                </Col>
                <Col md="6" sm="12" className="mb-1">
                  <Label className="form-label" for="bank_name">
                    Bank Name
                  </Label>
                  <Input
                    type="text"
                    name="bank_name"
                    value={i.bank_name}
                    onChange={(event) => handleChange(index, event, 20)}
                    className={`${
                      error[index]["bank_name"]?.message ? "inputError" : null
                    }`}
                  />
                  {error[index]?.bank_name?.message ? (
                    <small className="text-danger">
                      {error[index]?.bank_name?.message}
                    </small>
                  ) : null}
                </Col>
                <Col md="6" sm="12" className="mb-1">
                  <Label className="form-label" for="bank_account_number">
                    Bank account number
                  </Label>
                  <Input
                    type="text"
                    name="bank_account_number"
                    value={i.bank_account_number}
                    onChange={(event) => handleChange(index, event, 15)}
                    className={`${
                      error[index]["bank_account_number"]?.message
                        ? "inputError"
                        : null
                    }`}
                  />
                  {error[index]?.bank_account_number?.message ? (
                    <small className="text-danger">
                      {error[index]?.bank_account_number?.message}
                    </small>
                  ) : null}
                </Col>
                <Col md="6" sm="12" className="mb-1">
                  <Label className="form-label" for="routing_number">
                    Reference / ABA / routing number
                  </Label>
                  <Input
                    type="text"
                    name="routing_number"
                    value={i.routing_number}
                    onChange={(event) => handleChange(index, event, 20)}
                    className={`${
                      error[index]["routing_number"]?.message
                        ? "inputError"
                        : null
                    }`}
                  />
                  {error[index]?.routing_number?.message ? (
                    <small className="text-danger">
                      {error[index]?.routing_number?.message}
                    </small>
                  ) : null}
                </Col>
                <Col md="6" sm="12" className="mb-1">
                  <Label className="form-label" for="bank_address">
                    Bank Address
                  </Label>
                  <Input
                    type="text"
                    name="bank_address"
                    value={i.bank_address}
                    onChange={(event) => handleChange(index, event)}
                    className={`${
                      error[index]["bank_address"]?.message
                        ? "inputError"
                        : null
                    }`}
                  />
                  {error[index]?.bank_address?.message ? (
                    <small className="text-danger">
                      {error[index]?.bank_address?.message}
                    </small>
                  ) : null}
                </Col>
                <Col md="6" sm="12" className="mb-1">
                  <Label className="form-label" for="bic_code">
                    BIC/SWIFT code
                  </Label>
                  <Input
                    type="text"
                    name="bic_code"
                    value={i.bic_code}
                    onChange={(event) => handleChange(index, event, 20)}
                    className={`${
                      error[index]["bic_code"]?.message ? "inputError" : null
                    }`}
                  />
                  {error[index]?.bic_code?.message ? (
                    <small className="text-danger">
                      {error[index]?.bic_code?.message}
                    </small>
                  ) : null}
                </Col>
                <Col md="6" sm="12" className="mb-1">
                  <Label className="form-label" for="zip_code">
                    Postcode / zip code
                  </Label>
                  <Input
                    type="text"
                    name="zip_code"
                    value={i.zip_code}
                    onChange={(event) => handleChange(index, event, 20)}
                    className={`${
                      error[index]["zip_code"]?.message ? "inputError" : null
                    }`}
                  />
                  {error[index]?.zip_code?.message ? (
                    <small className="text-danger">
                      {error[index]?.zip_code?.message}
                    </small>
                  ) : null}
                </Col>
                <Col md="6" sm="12" className="mb-1">
                  <Label className="form-label" for="iban_number">
                    IBAN number
                  </Label>
                  <Input
                    type="text"
                    name="iban_number"
                    value={i.iban_number}
                    onChange={(event) => handleChange(index, event, 20)}
                    className={`${
                      error[index]["iban_number"]?.message ? "inputError" : null
                    }`}
                  />
                  {error[index]?.iban_number?.message ? (
                    <small className="text-danger">
                      {error[index]?.iban_number?.message}
                    </small>
                  ) : null}
                </Col>
                <Col md="6" sm="12" className="mb-1">
                  <Label className="form-label" for="city">
                    City
                  </Label>
                  <Input
                    type="text"
                    name="city"
                    value={i.city}
                    onChange={(event) => handleChange(index, event, 20)}
                    className={`${
                      error[index]["city"]?.message ? "inputError" : null
                    }`}
                  />
                  {error[index]?.city?.message ? (
                    <small className="text-danger">
                      {error[index]?.city?.message}
                    </small>
                  ) : null}
                </Col>
                <Col md="6" sm="12" className="mb-1">
                  <Label className="form-label" for="bank_sort_code">
                    Bank sort code
                  </Label>
                  <Input
                    type="text"
                    name="bank_sort_code"
                    value={i.bank_sort_code}
                    onChange={(event) => handleChange(index, event, 20)}
                    className={`${
                      error[index]["bank_sort_code"]?.message
                        ? "inputError"
                        : null
                    }`}
                  />
                  {error[index]?.bank_sort_code?.message ? (
                    <small className="text-danger">
                      {error[index]?.bank_sort_code?.message}
                    </small>
                  ) : null}
                </Col>
                <Col md="6" sm="12" className="mb-1">
                  <Label className="form-label" for="social_security_number">
                    Country
                  </Label>
                  <Input
                    type="select"
                    name="country"
                    value={i.country}
                    onChange={(event) => handleChange(index, event, 20)}
                    className={`${
                      error[index]["country"]?.message ? "inputError" : null
                    }`}
                  >
                    <option>---select---</option>
                    {country}
                  </Input>
                  {error[index]?.country?.message ? (
                    <small className="text-danger">
                      {error[index]?.country?.message}
                    </small>
                  ) : null}
                </Col>
                <Col md="6" sm="12" className="mb-1">
                  <Label className="form-label" for="bank_telephone_number">
                    Bank Telephone number
                  </Label>
                  <Input
                    type="text"
                    name="bank_telephone_number"
                    value={i.bank_telephone_number}
                    onChange={(event) => handleChange(index, event, 15)}
                    className={`${
                      error[index]["bank_telephone_number"]?.message
                        ? "inputError"
                        : null
                    }`}
                  />
                  {error[index]?.bank_telephone_number?.message ? (
                    <small className="text-danger">
                      {error[index]?.bank_telephone_number?.message}
                    </small>
                  ) : null}
                </Col>
              </Row>
            );
          })}
      </CardBody>

      <CardText className="d-flex justify-content-center add-more-btn mb-2">
        {" "}
        <button
          className="add-more-btn"
          onClick={() => AddFeild(setBankDetailFeild, formTemplate)}
        >
          Add Bank
        </button>
      </CardText>
      <CardFooter className="d-flex justify-content-between mt-3">
        <Button
          onClick={() => {
            next("4");
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

export default SettlementBank;
