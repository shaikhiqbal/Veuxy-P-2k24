import { useState, Fragment, useEffect } from "react";
import { Label, Button, Form, Input, FormGroup, Alert } from "reactstrap";
import useJwt from "@src/dashboard/jwt/useJwt";
import { Controller, useForm } from "react-hook-form";
import country_currency from "../../../country_currency.json";
import country_code from "../../../country_code.json";
import Select from "react-select";
import * as Icon from "react-feather";

const SettlementBankDetails = ({ stepper, setCounter, counter }) => {
  const [flag1, setFlag1] = useState(false);
  const [flag2, setFlag2] = useState(false);
  const [bankDetailFeild, setBankDetailFeild] = useState([
    {
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
    },
  ]);

  const country = country_code.map((e, i) => {
    return <option key={i}>{e.name}</option>;
  });

  const Data = Object.keys(country_currency).map((key, i) => {
    return (
      <option key={i}>
        {key} - {country_currency[key]}
      </option>
    );
  });




  let option = [];
  for (var key in country_currency) {
    option = [...option, { value: key, label: country_currency[key] }];
  }
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const Bold = { fontWeight: "bold" };

  const addDirectorFeild = () => {
    const values = [...bankDetailFeild];
    values.push({
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
      bank_telephone_number: ""
    });
    setBankDetailFeild(values);
  };

  const removeDirectorFeild = (index) => {
    const values = [...bankDetailFeild];
    values.splice(index, 1);
    setBankDetailFeild(values);
  };

  const handleChange = (index, event) => {
    const values = [...bankDetailFeild];
    values[index][event.target.name] = event.target.value;
    console.log(values[index][event.target.name] = event.target.value)
    setBankDetailFeild(values);
  };

  const handleSelect = (selectedOption, idx) => {
    let keySkill = "";
    for (var option of selectedOption) {
      keySkill += option["label"] + ",";
    }
bankDetailFeild[idx].processing_currency=keySkill;
  };

  //** post data
  const postData = (data) => {
    useJwt
      .postsettlementbankdetails(data)
      .then((res) => {
        if (res.status === 201) {
          setFlag1(true);
        }
      })
      .catch((err) => err.response);
  };

  //** updata data
  const updataData = (data, flag) => {
    useJwt
      .putsettlementbankdetails(data.sbd[0].uid, data)
      .then((res) => {
        if (res.status === 200) setFlag2(true);
      })
      .catch((err) => {
        console.log(err.massage);
      });
  };

  const onSubmit = () => {
    let post = [];
    let put = [];

    bankDetailFeild.filter((ele) => {
      if (!ele.uid) {
        post.push(ele);
      } else {
        put.push({
          ...ele,
          application_id: localStorage.getItem("application_id"),
        });
      }
    });
    if (post.length > 0) {
      postData({ sbd: post });
    }
    if (put.length > 0) {
      updataData({ sbd: put });
    }
  };

  useEffect(() => {
    useJwt.sbd_get_view().then((res) => {
      if (res.status === 200 && res.data.length > 0) {
        setBankDetailFeild([]);
        for (let i = 0; i < res.data.length; i++) {
          setBankDetailFeild((bankDetailFeild) => [
            ...bankDetailFeild,
            res.data[i],
          ]);
        }
      }
    });
  }, []);
  useEffect(() => {
    if (flag1 && flag2) {
      stepper.next();
      setCounter(counter + 1);
      setFlag1(false);
      setFlag2(false);
    } else if (flag1) {
      stepper.next();
      setCounter(counter + 1);
      setFlag1(false);
    } else if (flag2) {
      stepper.next();
      setCounter(counter + 1);
      setFlag2(false);
    }
  }, [flag1, flag2]);
  return (
    <div id="DirectorFeild" className="p-3 ">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1 className="text-primary" style={{ fontWeight: "bold" }}>
          Settlement Bank Details
        </h1>
      </div>
      <div
        className="container-none m-3"
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
          padding: "1rem",
        }}
      >
        <Form>
          <div hidden>
            <Input
              type="text"
              className="form-user"
              id="user"
              name="user"
              defaultValue={0}
            />
          </div>
          <div className="row  p-3  gy-1 gx-1">
            {bankDetailFeild &&
              bankDetailFeild.map((inputField, index) => {
                return (
                  <Fragment key={`${inputField}${index}`}>
                    <div className=" d-flex justify-content-between bg-primary ">
                      <span className="align-self-center">
                        {" "}
                        <Button
                          disabled={index === 0}
                          onClick={() => removeDirectorFeild(index)}
                          color="primary"
                        >
                          <Icon.Trash color="white" />
                        </Button>
                      </span>
                    </div>

                    <div className="Form-Group col-lg-6">
                      <Label
                        className="form-label"
                        htmlFor="settlement_currency"
                      >
                        SETTLEMENT CURRENCY <span>(select one)</span>
                      </Label>
                      <Input
                        onChange={(event) => handleChange(index, event)}
                        name="settlement_currency"
                        type="select"
                      >
                        <option>SELECT (one)</option>
                        {Data}
                      </Input>
                    </div>

                    <div className="Form-Group col-lg-6">
                      <Label
                        className="form-label"
                        htmlFor="processing_currency"
                      >
                        PROCESSING CURRENCY/IES
                        <p>CTRL and click to select multiple</p>
                      </Label>
                      <Select
                        name="processing_currency"
                        closeMenuOnSelect={false}
                        options={option}
                        onChange={(evt)=>handleSelect(evt, index)}
                        // onChange={(event) => handleChange(index, event)}
                        // onChange={(event) => handleChange(index, event)}
                        isMulti
                      />
                    </div>

                    <div className="Form-Group col-lg-6">
                      <Label
                        className="form-label"
                        htmlFor="bank_account_holder"
                      >
                        Bank account holder
                      </Label>
                      <Input
                        type="text"
                        className="form-bank_account_holder"
                        id="bank_account_holder"
                        name="bank_account_holder"
                        value={inputField.bank_account_holder}
                        onChange={(event) => handleChange(index, event)}
                      />
                    </div>

                    <div className="Form-Group col-lg-6">
                      <Label className="form-label" for="bank_name">
                        Bank Name
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="bank_name"
                        name="bank_name"
                        value={inputField.bank_name}
                        onChange={(event) => handleChange(index, event)}
                      />
                    </div>

                    <div className="Form-Group col-lg-6">
                      <Label className="form-label" for="bank_account_number">
                        Bank account number
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="bank_account_number"
                        name="bank_account_number"
                        value={inputField.bank_account_number}
                        onChange={(event) => handleChange(index, event)}
                        required
                      />
                    </div>
                    <div className="Form-Group col-lg-6">
                      <Label className="form-label" for="routing_number">
                        Reference / ABA / routing number
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="routing_number"
                        name="routing_number"
                        value={inputField.routing_number}
                        onChange={(event) => handleChange(index, event)}
                      />
                    </div>

                    <div className="Form-Group col-lg-6">
                      <Label className="form-label" for="bank_address">
                        Bank Address
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="bank_address"
                        name="bank_address"
                        value={inputField.bank_address}
                        onChange={(event) => handleChange(index, event)}
                      />
                    </div>

                    <div className="Form-Group col-lg-6">
                      <Label className="form-label" for="bic_code">
                        BIC/SWIFT code
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="bic_code"
                        name="bic_code"
                        value={inputField.bic_code}
                        onChange={(event) => handleChange(index, event)}
                      />
                    </div>

                    <div className="Form-Group col-lg-6">
                      <Label className="form-label" for="zip_code">
                        Postcode / zip code
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="zip_code"
                        name="zip_code"
                        value={inputField.zip_code}
                        onChange={(event) => handleChange(index, event)}
                      ></Input>
                    </div>

                    <div className="Form-Group col-lg-6">
                      <Label className="form-label" for="iban_number">
                        IBAN number
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="iban_number"
                        name="iban_number"
                        value={inputField.iban_number}
                        onChange={(event) => handleChange(index, event)}
                      />
                    </div>

                    <div className="Form-Group col-lg-6">
                      <Label className="form-label" for="city">
                        City
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="city"
                        name="city"
                        value={inputField.city}
                        onChange={(event) => handleChange(index, event)}
                      />
                    </div>

                    <div className="Form-Group col-lg-6">
                      <Label className="form-label" for="bank_sort_code">
                        Bank sort code
                      </Label>
                      <Input
                        type="text"
                        className="form-bank_sort_code"
                        id="bank_sort_code"
                        name="bank_sort_code"
                        value={inputField.bank_sort_code}
                        onChange={(event) => handleChange(index, event)}
                      />
                    </div>
                    <div className="Form-Group col-lg-6">
                      <Label
                        className="form-label"
                        for="social_security_number"
                      >
                        Country
                      </Label>
                      <Input
                        type="select"
                        className="form-control"
                        id="country"
                        name="country"
                        value={inputField.country}
                        onChange={(event) => handleChange(index, event)}
                      >
                        <option>---select---</option>
                        {country}
                      </Input>
                    </div>
                    <div className="Form-Group col-lg-6">
                      <Label className="form-label" for="bank_telephone_number">
                        Bank Telephone number
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="bank_telephone_number"
                        name="bank_telephone_number"
                        value={inputField.bank_telephone_number}
                        onChange={(event) => handleChange(index, event)}
                      />
                    </div>
                  </Fragment>
                );
              })}
          </div>
        </Form>
      </div>
      <div className="" style={{ display: "flex", justifyContent: "end" }}>
        <Button.Ripple
          className="btn-icon"
          outline
          color="primary"
          onClick={() => addDirectorFeild()}
        >
          Add more Bank <Icon.Plus />
        </Button.Ripple>
      </div>
      <div
        className="mt-2 mb-b  d-flex justify-content-end "
        style={{ width: "90%" }}
      >
        <Button
          onClick={() => {
            stepper.previous();
          }}
          color="secondry btn-outline-secondary "
        >
          Previouse
        </Button>

        <Button onClick={onSubmit} color="primary ms-2">
          Next
        </Button>
      </div>
    </div>
  );
};

export default SettlementBankDetails;
