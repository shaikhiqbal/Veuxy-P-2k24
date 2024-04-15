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
import country_code from "../../../../country_code.json";
import country_currency from "../../../../country_currency.json";

// ** Thirdparty Input
// ** Utils
import { selectThemeColors } from "@utils";

// ** JWT
import useJwt from "@src/dashboard/jwt/useJwt";

import "../style/style.css";
import { useNavigate } from "react-router-dom";
import Stepper from "bs-stepper";

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
    // convertStrToArray(userData[i]?.processing_currency, bucket[i], option);
  }
  setUserData([...bucket]);
};

const SettlementBank = (props) => {
  const { setpper, data } = props;

  // ** States
  const [isPut, setPut] = useState(false);
  const [putData, setPutData] = useState([]);
  const [isPost, setPost] = useState(false);
  const [postData, setPostData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [isAccepted, setIsAccepted] = useState(true);
  const [bankDetailFeild, setBankDetailFeild] = useState([{ ...formTemplate }]);
  const [processing_currency, setProcessing_currency] = useState([[]]);
  const [callGet, setCallGet] = useState(false);
  const applicationID = localStorage.getItem("application_id");
  const navigate = useNavigate();

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
    console.log(selectedOption, idx, value);
    let keySkill = "";
    let tempValue = [...value];
    for (var option of selectedOption) {
      keySkill += option["label"] + ",";
    }
    tempValue[idx] = selectedOption;
    setProcessing_currency([...tempValue]);
    bankDetailFeild[idx].processing_currency = keySkill;
  };

  // ** set Processing Currency Data;
  const processingCurrencyData = (str = "", value = []) => {
    if (!str) return (value = []);
    const categoryFilter = (val) => {
      let label = option.filter((el) => el.label === val);
      return label;
    };

    let processing_data = Array.prototype.concat.apply(
      [],
      str?.split(",").map((val) => categoryFilter(val))
    );
    return (value = [...processing_data]);
  };

  // ** Add Feilds
  const AddFeild = (setUser, template) => {
    const value = { ...template };
    setUser((previous) => [...previous, value]);
    setProcessing_currency((previous) => [...previous, []]);
  };

  // ** Remove Feild
  const removeFeild = (index, users, setUser) => {
    const tempUserData = [...users];
    const tempArr = [...processing_currency];
    if (tempUserData.length === 1 && index === 0) {
      return alert("pleas fill atleast one bank details");
    }
    tempUserData.splice(index, 1);
    tempArr.splice(index, 1);
    setProcessing_currency(tempArr);
    setUser(tempUserData);
  };
  // ** Handle Change
  const handleChange = (index, event) => {
    const values = [...bankDetailFeild];
    values[index][event.target.name] = event.target.value;
    setBankDetailFeild(values);
  };

  // ** Get API Data
  useEffect(() => {
    if (data) {
      setBankDetailFeild([]);
      setBankDetailFeild(data);
      setProcessing_currency([]);
      setupProcessingCurrency(setProcessing_currency, data, option);
    }
  }, [data]);

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
                    disabled={isAccepted}
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
                    readOnly={isAccepted}
                    value={processing_currency[index]}
                    name="colors"
                    // options={option}
                    handleChange
                    className="react-select"
                    onChange={(evt) =>
                      handleSelect(evt, index, processing_currency)
                    }
                    classNamePrefix="select"
                  />
                </Col>
                <Col md="6" sm="12" className="mb-1">
                  <Label className="form-label" htmlFor="bank_account_holder">
                    Bank account holder
                  </Label>
                  <Input
                    type="text"
                    className="form-bank_account_holder"
                    id="bank_account_holder"
                    name="bank_account_holder"
                    value={i.bank_account_holder}
                    onChange={(event) => handleChange(index, event)}
                    readOnly={isAccepted}
                  />
                </Col>
                <Col md="6" sm="12" className="mb-1">
                  <Label className="form-label" for="bank_name">
                    Bank Name
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="bank_name"
                    name="bank_name"
                    value={i.bank_name}
                    onChange={(event) => handleChange(index, event)}
                    readOnly={isAccepted}
                  />
                </Col>
                <Col md="6" sm="12" className="mb-1">
                  <Label className="form-label" for="bank_account_number">
                    Bank account number
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="bank_account_number"
                    name="bank_account_number"
                    value={i.bank_account_number}
                    onChange={(event) => handleChange(index, event)}
                    readOnly={isAccepted}
                  />
                </Col>
                <Col md="6" sm="12" className="mb-1">
                  <Label className="form-label" for="routing_number">
                    Reference / ABA / routing number
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="routing_number"
                    name="routing_number"
                    value={i.routing_number}
                    onChange={(event) => handleChange(index, event)}
                    readOnly={isAccepted}
                  />
                </Col>
                <Col md="6" sm="12" className="mb-1">
                  <Label className="form-label" for="bank_address">
                    Bank Address
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="bank_address"
                    name="bank_address"
                    value={i.bank_address}
                    onChange={(event) => handleChange(index, event)}
                    readOnly={isAccepted}
                  />
                </Col>
                <Col md="6" sm="12" className="mb-1">
                  <Label className="form-label" for="bic_code">
                    BIC/SWIFT code
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="bic_code"
                    name="bic_code"
                    value={i.bic_code}
                    onChange={(event) => handleChange(index, event)}
                    readOnly={isAccepted}
                  />
                </Col>
                <Col md="6" sm="12" className="mb-1">
                  <Label className="form-label" for="zip_code">
                    Postcode / zip code
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="zip_code"
                    name="zip_code"
                    value={i.zip_code}
                    onChange={(event) => handleChange(index, event)}
                    readOnly={isAccepted}
                  ></Input>
                </Col>
                <Col md="6" sm="12" className="mb-1">
                  <Label className="form-label" for="iban_number">
                    IBAN number
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="iban_number"
                    name="iban_number"
                    value={i.iban_number}
                    onChange={(event) => handleChange(index, event)}
                    readOnly={isAccepted}
                  />
                </Col>
                <Col md="6" sm="12" className="mb-1">
                  <Label className="form-label" for="city">
                    City
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="city"
                    name="city"
                    value={i.city}
                    onChange={(event) => handleChange(index, event)}
                    readOnly={isAccepted}
                  />
                </Col>
                <Col md="6" sm="12" className="mb-1">
                  <Label className="form-label" for="bank_sort_code">
                    Bank sort code
                  </Label>
                  <Input
                    type="text"
                    className="form-bank_sort_code"
                    id="bank_sort_code"
                    name="bank_sort_code"
                    value={i.bank_sort_code}
                    onChange={(event) => handleChange(index, event)}
                    readOnly={isAccepted}
                  />
                </Col>
                <Col md="6" sm="12" className="mb-1">
                  <Label className="form-label" for="social_security_number">
                    Country
                  </Label>
                  <Input
                    type="select"
                    className="form-control"
                    id="country"
                    name="country"
                    value={i.country}
                    onChange={(event) => handleChange(index, event)}
                    readOnly={isAccepted}
                  >
                    <option>---select---</option>
                    {country}
                  </Input>
                </Col>
                <Col md="6" sm="12" className="mb-1">
                  <Label className="form-label" for="bank_telephone_number">
                    Bank Telephone number
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="bank_telephone_number"
                    name="bank_telephone_number"
                    value={i.bank_telephone_number}
                    onChange={(event) => handleChange(index, event)}
                    readOnly={isAccepted}
                  />
                </Col>
              </Row>
            );
          })}
      </CardBody>
      <CardFooter className="d-flex justify-content-between mt-3">
        <Button
          color="secondry btn-outline-secondary"
          onClick={() => setpper("previous")}
        >
          Previous
        </Button>
        <Button color="primary" onClick={() => setpper("next")}>
          Next
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SettlementBank;
