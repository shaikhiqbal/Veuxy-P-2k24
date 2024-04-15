import { useState, Fragment, useEffect } from "react";
import { Label, Button, Form, Input, FormGroup, Table } from "reactstrap";
import useJwt from "@src/dashboard/jwt/useJwt";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { data } from "jquery";
import { ArrowLeft, ArrowRight } from "react-feather";

const BusinessProfile = ({ stepper, counter, setCounter }) => {
  const [preMonth, setPreMonth] = useState("");
  const [cap, setCap] = useState(false);
  const [otherTakePlace, setOtherTakePlace] = useState(false);
  const [defaultData, setDefaultData] = useState({ card_type: [] });
  const [affiliateDetails, setAffiliateDetails] = useState(false);

  const {
    control,
    setError,
    reset,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ defaultValues: defaultData });
  const [isBeta, setIsBeta] = useState(false);
  const [betaFeild, setBetaFeild] = useState([
    {
      beta_website: "",
      username: "",
      password: "",
    },
  ]);

  const addBetaTemplate = () => {
    const values = [...betaFeild];
    values.push({
      url: "",
      username: "",
      password: "",
    });
    setBetaFeild(values);
  };

  // paid currency Arry
  const paidCurrencyList = [
    "Pounds SterLing",
    "US Dollar",
    "Australian Dollar",
    "Canadian Dollar",
    "Danish Krone",
    "Euro",
    "Hong Kong Dollar",
    "Japenese Yen",
    "New Zealand Dollar",
    "Norwegian Krone",
    "Singapore Dollar",
    "South African Rand",
    "Swedish Krona",
  ];
  const removeBetaTemplate = (index) => {
    const values = [...betaFeild];
    values.splice(index, 1);
    setBetaFeild(values);
  };

  const handleBetaInputChange = (index, event) => {
    const values = [...betaFeild];
    values[index][event.target.name] = event.target.value;
    setBetaFeild(values);
  };

  // paid currency function
  const currencyList = paidCurrencyList.map((e, i) => {
    return <option key={i}>{e}</option>;
  });

  const space = {
    borderCollapse: "collapse",
    margin: "25px 0",
    fontSize: "0.9rem",
    minWidth: "400px",
  };

  const borderB = { borderBottom: "1px solid lightgray" };
  const [bankruptcyDate, setBankruptcyDate] = useState(false);
  const [creditCardMonth, setCreditCardMonth] = useState(false);
  const [violation, setViolation] = useState(false);
  const [cardType, setCardType] = useState(false);
  // const [cardTypeValue, setCardTypeValues] = useState([]);

  useEffect(() => {
    useJwt.cardtype().then((res) => {
      if (res.status === 200) {
        setCardType(res.data);
      }
    });
  }, []);

  useEffect(() => {
    useJwt
      .getbusinessprofile()
      .then((res) => {
        if (res.status === 200) {
          setDefaultData(res.data[0]);
          reset(res.data[0]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [reset, counter]);

  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const handleChangeboxes = (e, id) => {
    const findIdx = selectedCheckboxes.indexOf(id);
    if (findIdx > -1) {
      selectedCheckboxes.splice(findIdx, 1);
    } else {
      selectedCheckboxes.push(id);
    }

    setSelectedCheckboxes(selectedCheckboxes);
  };

  const onSubmit = (data) => {
    data.application_id = localStorage.getItem("application_id");
    data.card_type = selectedCheckboxes;
    if (data.uid === undefined) {
      useJwt.postbusinessprofile(data).then((res) => {
        if (res.status === 201) {
          stepper.next();
          setCounter(counter + 1);
        }
      });
    } else {
      useJwt
        .putbusinessprofile(data.uid, data)
        .then((res) => {
          if (res.status === 200) {
            stepper.next();
            setCounter(counter + 1);
          }
        })
        .catch((errors) => {
          console.log(errors);
        });
    }
  };

  return (
    <div>
      <div
        style={{ display: "flex", justifyContent: "center", margin: "20px" }}
      >
        <h1 className="text-primary" style={{ fontWeight: "bold" }}>
          Business Profile
        </h1>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div hidden>
          <Controller
            id="uid"
            name="uid"
            control={control}
            render={({ field }) => {
              return (
                <Input
                  // defaultValue={0}
                  control={control}
                  name="uid"
                  type="number"
                  invalid={errors.uid && true}
                  {...field}
                />
              );
            }}
          />
        </div>
        <div className="container-none">
          <div className="row">
            <div className="col-6">
              <Label htmlFor="description_of_products">
                Detailed description of products/ services sold (explainbusiness
                model)
              </Label>
              <br />
              <Controller
                id="description_of_products"
                name="description_of_products"
                control={control}
                render={({ field }) => (
                  <Input
                    control={control}
                    name="description_of_products"
                    type="textarea"
                    invalid={errors.description_of_products && true}
                    {...field}
                  />
                )}
              />
            </div>
            <div className="col-6">
              <Label htmlFor="length_of_time_business">
                Length of time in business (in months)
              </Label>
              <br />
              <Controller
                id="length_of_time_business"
                name="length_of_time_business"
                control={control}
                render={({ field }) => (
                  <Input
                    control={control}
                    name="length_of_time_business"
                    type="month"
                    invalid={errors.length_of_time_business && true}
                    {...field}
                  />
                )}
              />
            </div>
            <div className="col-6">
              <Label htmlFor="website">
                Website(s) (please separate by , comma)
              </Label>
              <br />
              <Controller
                id="website"
                name="website"
                control={control}
                render={({ field }) => (
                  <Input
                    control={control}
                    name="website"
                    type="textarea"
                    invalid={errors.website && true}
                    {...field}
                  />
                )}
              />
            </div>
            <div className="col-6">
              <Label>
                Beta website(s)
                <span style={{ color: "gray" }}>(if applicable)</span>
              </Label>
              {/* <div
                name="login_details"
                onChange={(e) => {
                  e.target.value =="true" ? setIsBeta(true) : setIsBeta(false);
                }}
              >
                <Input type="radio" value={"true"} name="BetaWebSite" />
                Yes
                <Input type="radio" value={"false"} name="BetaWebSite" />
                No
              </div> */}
              <Controller
                id="login_details"
                name="login_details"
                control={control}
                render={({ field: { value, onChange } }) => {
                  const st = {
                    fontWeight: "bolder",
                    margin: " 2px 1px",
                  };
                  if (value == true) setIsBeta(true);
                  else setIsBeta(false);
                  const boolean = (value) => {
                    if (value) return <p style={st}>Yes</p>;
                    else return <p style={st}>No</p>;
                  };
                  return (
                    <div className="form-switch form-check-primary d-flex">
                      <Input
                        type="switch"
                        name="icon-primary"
                        onChange={onChange}
                        checked={value}
                      />
                      {boolean(value)}
                    </div>
                  );
                }}
              />
            </div>
            <div
              className="col-6"
              style={{ display: isBeta ? "block" : "none" }}
            >
              <div className="container-none">
                <div className="row  m-1 p-1">
                  {betaFeild.map((inputField, index) => (
                    <Fragment key={`${inputField}${index}`}>
                      <div className="Form-Group col-sm-6">
                        <Label className="form-label" htmlFor="beta_website">
                          url
                        </Label>
                        <Input
                          type="text"
                          className="form-control"
                          id="urlbeta_website"
                          name="urlbeta_website"
                          value={inputField.urlbeta_website}
                          onChange={(event) =>
                            handleBetaInputChange(index, event)
                          }
                        />
                      </div>

                      <div className="Form-Group col-sm-6">
                        <Label className="form-label" htmlFor="username">
                          User Name
                        </Label>
                        <Input
                          type="text"
                          className="form-control"
                          id="username"
                          name="username"
                          value={inputField.username}
                          onChange={(event) =>
                            handleBetaInputChange(index, event)
                          }
                        />
                      </div>

                      <div className="Form-Group col-sm-6">
                        <Label className="form-label" htmlFor="password">
                          Password
                        </Label>
                        <Input
                          type="password"
                          className="form-control"
                          id="password"
                          name="password"
                          value={inputField.password}
                          onChange={(event) =>
                            handleBetaInputChange(index, event)
                          }
                        />
                      </div>
                      <div className="Form-Group col-sm-6 d-flex justify-content-end align-items-center">
                        <div>
                          <Button.Ripple
                            disabled={index === 0}
                            className="btn-icon me-2"
                            color="danger"
                            onClick={() => removeBetaTemplate(index)}
                          >
                            -
                          </Button.Ripple>
                          <Button.Ripple
                            className="btn-icon"
                            color="primary"
                            onClick={() => addBetaTemplate()}
                          >
                            +
                          </Button.Ripple>
                        </div>
                      </div>
                    </Fragment>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-6">
              <Label htmlFor="descriptor">
                Descriptor (to appear on customers’ credit card statement; max
                22 characters, for example: website or company name)
              </Label>
              <br />
              <Controller
                id="descriptor"
                name="descriptor"
                control={control}
                render={({ field }) => (
                  <Input
                    control={control}
                    name="descriptor"
                    type="textarea"
                    invalid={errors.descriptor && true}
                    {...field}
                  />
                )}
              />
            </div>
            <div className="col-6">
              <Label htmlFor="city_field bg-white">
                DBA/City field (second line of DBA_City. Max 12 characters, for
                example: city or customer service phone number)
              </Label>
              <br />
              <Controller
                id="city_field"
                name="city_field"
                control={control}
                render={({ field }) => (
                  <Input
                    control={control}
                    name="city_field"
                    type="textarea"
                    invalid={errors.city_field && true}
                    {...field}
                  />
                )}
              />
            </div>
            <div className="col-lg-6 mt-1">
              <Label htmlFor="dynamic_descriptors">
                Will you use ‘Dynamic Descriptors’?
              </Label>
              <br />
              <Controller
                id="dynamic_descriptors"
                name="dynamic_descriptors"
                control={control}
                render={({ field: { value, onChange } }) => {
                  const st = {
                    fontWeight: "bolder",
                    margin: " 2px 1px",
                  };
                  const boolean = (value) => {
                    if (value) return <p style={st}>Yes</p>;
                    else return <p style={st}>No</p>;
                  };
                  return (
                    <div className="form-switch form-check-primary d-flex">
                      <Input
                        type="switch"
                        name="icon-primary"
                        onChange={onChange}
                        checked={value}
                      />
                      {boolean(value)}
                    </div>
                  );
                }}
              />
            </div>

            {/* -------------start-------------- */}
            <div id="login_details" className="col-6 mt-1">
              <div className="container-none">
                <div className="row g-2">
                  <div className="col-6">
                    <div className="">
                      <Label htmlFor="field_for_bankruptcy">
                        Have you ever filed for field_for_bankruptcy?
                      </Label>
                      <Controller
                        id="field_for_bankruptcy"
                        name="field_for_bankruptcy"
                        control={control}
                        render={({ field: { value, onChange } }) => {
                          if (value === true) setBankruptcyDate(true);
                          else setBankruptcyDate(false);
                          const st = {
                            fontWeight: "bolder",
                            margin: " 2px 1px",
                          };
                          const boolean = (value) => {
                            if (value) return <p style={st}>Yes</p>;
                            else return <p style={st}>No</p>;
                          };
                          return (
                            <div className="form-switch form-check-primary d-flex">
                              <Input
                                type="switch"
                                name="icon-primary"
                                onChange={onChange}
                                checked={value}
                              />
                              {boolean(value)}
                            </div>
                          );
                        }}
                      />
                    </div>
                  </div>
                  <div
                    className="col-6"
                    style={{ display: bankruptcyDate ? "block" : "none" }}
                  >
                    <Label className="text-danger fw-bold">
                      {/* {""}
                      <small
                        style={{
                          color:"red",
                          display: bankruptcyDate ?"inline-block" :"none",
                        }}
                      >
                        when?
                      </small>{""} */}
                      Date
                    </Label>
                    <Controller
                      id="bankruptcy_date"
                      name="bankruptcy_date"
                      control={control}
                      render={({ field }) => (
                        <Input
                          control={control}
                          name="bankruptcy_date"
                          type="date"
                          invalid={errors.bankruptcy_date && true}
                          {...field}
                        />
                      )}
                    />
                    {""}
                  </div>
                </div>
              </div>
            </div>
            <div id="" className="col-6 mt-1">
              <div className="container-none">
                <div className="row g-2">
                  <div className="col-6">
                    <div className="">
                      <Label htmlFor="card_scheme_program">
                        Have you ever flagged or been in violation of any card
                        scheme program (e.g. Excessive Chargebacks, BRAM
                        violation, Account Data Compromise)?
                      </Label>
                      <Controller
                        id="card_scheme_program"
                        name="card_scheme_program"
                        control={control}
                        render={({ field: { value, onChange } }) => {
                          if (value === true) {
                            setViolation(true);
                          } else {
                            setViolation(false);
                          }
                          return (
                            <div className="form-switch form-check-primary d-flex w-50">
                              <Input
                                type="switch"
                                name="icon-primary"
                                onChange={onChange}
                                checked={value}
                              />
                              {violation ? (
                                <p
                                  className="fw-bolder"
                                  style={{ margin: "2px 1px" }}
                                >
                                  Yes
                                </p>
                              ) : (
                                <p
                                  className="fw-bolder"
                                  style={{ margin: "2px 1px" }}
                                >
                                  No
                                </p>
                              )}
                            </div>
                          );
                        }}
                      />
                    </div>
                  </div>
                  <div
                    className="col-6"
                    style={{ display: violation ? "block" : "none" }}
                  >
                    <Label>Provide details please</Label>
                    <Controller
                      id="card_schema_detail"
                      name="card_schema_detail"
                      control={control}
                      render={({ field }) => (
                        <Input
                          control={control}
                          name="card_schema_detail"
                          type="textarea"
                          invalid={errors.card_schema_detail && true}
                          {...field}
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div id="login_details" className="col-6 mt-1">
              <div className="container-none">
                <div className="row g-2">
                  <div className="col-6">
                    <div className="">
                      <Label htmlFor="accepted_credit_cards">
                        Have you previously accepted credit cards?
                      </Label>
                      {/* <Controller
                        id=" accepted_credit_cards"
                        name="accepted_credit_cards"
                        control={control}
                        render={({ field }) => (
                          <div
                            style={{ width:"max-content" }}
                            control={control}
                            name="accepted_credit_cards"
                            onClick={(e) => {
                              if (e.target.value ==="Yes") {
                                setCreditCardMonth(true);
                              } else {
                                setCreditCardMonth(false);
                              }
                            }}
                            invalid={errors.accepted_credit_cards && true}
                            {...field}
                          >
                            <Input type="radio" value="Yes" name="Yes" />
                            <Label>
                              Yes{""}
                              <small
                                style={{
                                  display: creditCardMonth
                                    ?"inline-block"
                                    :"none",
                                  color:"red",
                                }}
                              >
                                (For how long in month)
                              </small>
                            </Label>
                            <br />
                            <Input type="radio" value="No" name="Yes" />
                            No
                          </div>
                        )}
                      /> */}
                      <Controller
                        id="accepted_credit_cards"
                        name="accepted_credit_cards"
                        control={control}
                        render={({ field: { value, onChange } }) => {
                          if (value === true) setCreditCardMonth(true);
                          else setCreditCardMonth(false);

                          const st = {
                            fontWeight: "bolder",
                            margin: " 2px 1px",
                          };

                          const boolean = (value) => {
                            if (value) return <p style={st}>Yes</p>;
                            else return <p style={st}>No</p>;
                          };
                          return (
                            <div className="form-switch form-check-primary d-flex">
                              <Input
                                type="switch"
                                name="icon-primary"
                                onChange={onChange}
                                checked={value}
                              />
                              {boolean(value)}
                            </div>
                          );
                        }}
                      />
                    </div>
                  </div>
                  <div
                    className="col-6"
                    style={{ display: creditCardMonth ? "block" : "none" }}
                  >
                    <Label>Month</Label>
                    <Controller
                      id="credit_card_months"
                      name="credit_card_months"
                      control={control}
                      render={({ field }) => {
                        return (
                          <Input
                            control={control}
                            name="credit_card_months"
                            type="number"
                            placeholder="month"
                            invalid={errors.credit_card_months && true}
                            {...field}
                            onChange={(e) => {
                              field.onChange(
                                setPreMonth(parseInt(e.target.value))
                              );
                            }}
                          />
                        );
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* painding */}
        <div
          className="container-none mt-3 mb-2 col-12 "
          style={{ display: preMonth > 0 ? "block" : "none" }}
        >
          <div className="row p-2">
            <div className="flex-column">
              <div className="">
                <h1>
                  Please provide {preMonth > 6 ? 6 : preMonth} months of most
                  recent processing history below
                </h1>
                <p>
                  (Clearly showing transactions, chargebacks and refunds per
                  month)
                </p>
              </div>
              <div className="w-50">
                <p>Applicable currency for the volumes specified below</p>
              </div>
            </div>
            <div className="col-12 d-flex justify-content-center">
              <Table className="trow" responsive>
                <thead className="bg-black text-primary">
                  <tr>
                    <th className="p-1">
                      <span>CREDIT CARD PROCESSING HISTORY</span>
                    </th>
                    <th
                      className="ms-1 p-1 text-centar"
                      style={{
                        fontSize: "15px",
                        display: preMonth >= 6 || preMonth >= 1 ? null : "none",
                      }}
                    >
                      Last month
                    </th>
                    <th
                      className="ms-1 p-1"
                      style={{
                        fontSize: "15px",
                        display: preMonth >= 6 || preMonth >= 2 ? null : "none",
                      }}
                    >
                      2 months ago
                    </th>
                    <th
                      className="ms-1 p-1"
                      style={{
                        fontSize: "15px",
                        display: preMonth >= 6 || preMonth >= 3 ? null : "none",
                      }}
                    >
                      3 months ago
                    </th>
                    <th
                      className="ms-1 p-1"
                      style={{
                        fontSize: "15px",
                        display: preMonth >= 6 || preMonth >= 4 ? null : "none",
                      }}
                    >
                      4 months ago
                    </th>
                    <th
                      className="ms-1 p-1"
                      style={{
                        fontSize: "15px",
                        display: preMonth >= 6 || preMonth >= 5 ? null : "none",
                      }}
                    >
                      5 months ago
                    </th>
                    <th
                      className="ms-1 p-1"
                      style={{
                        fontSize: "15px",
                        display: preMonth >= 6 ? null : "none",
                      }}
                    >
                      6 months ago
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <div hidden>
                    <Controller
                      name="credit_card_history[0].months_ago"
                      control={control}
                      render={({ field }) => (
                        <Input
                          control={control}
                          name="credit_card_history[0].months_ago"
                          type="number"
                          value={1}
                          invalid={errors.number_of_transaction && true}
                          {...field}
                        />
                      )}
                    />
                    <Controller
                      name="credit_card_history[1].months_ago"
                      control={control}
                      render={({ field }) => (
                        <Input
                          control={control}
                          name="credit_card_history[1].months_ago"
                          type="number"
                          value={2}
                          invalid={errors.number_of_transaction && true}
                          {...field}
                        />
                      )}
                    />
                    <Controller
                      name="credit_card_history[2].months_ago"
                      control={control}
                      render={({ field }) => (
                        <Input
                          control={control}
                          name="credit_card_history[2].months_ago"
                          type="number"
                          value={3}
                          invalid={errors.number_of_transaction && true}
                          {...field}
                        />
                      )}
                    />
                    <Controller
                      name="credit_card_history[3].months_ago"
                      control={control}
                      render={({ field }) => (
                        <Input
                          control={control}
                          name="credit_card_history[3].months_ago"
                          type="number"
                          value={4}
                          invalid={errors.number_of_transaction && true}
                          {...field}
                        />
                      )}
                    />
                    <Controller
                      name="credit_card_history[4].months_ago"
                      control={control}
                      render={({ field }) => (
                        <Input
                          control={control}
                          name="credit_card_history[4].months_ago"
                          type="number"
                          value={5}
                          invalid={errors.number_of_transaction && true}
                          {...field}
                        />
                      )}
                    />
                    <Controller
                      name="credit_card_history[5].months_ago"
                      control={control}
                      render={({ field }) => (
                        <Input
                          control={control}
                          name="credit_card_history[5].months_ago"
                          type="number"
                          value={6}
                          invalid={errors.number_of_transaction && true}
                          {...field}
                        />
                      )}
                    />
                  </div>
                  <tr>
                    <td>Number of transactions</td>
                    <td
                      style={{
                        display: preMonth >= 6 || preMonth >= 1 ? null : "none",
                      }}
                    >
                      <Controller
                        id="credit_card_history[0].number_of_transaction"
                        name="credit_card_history[0].number_of_transaction"
                        control={control}
                        render={({ field }) => (
                          <Input
                            control={control}
                            name="credit_card_history[0].number_of_transaction"
                            type="text"
                            invalid={errors.number_of_transaction && true}
                            {...field}
                          />
                        )}
                      />
                    </td>
                    <td
                      style={{
                        display: preMonth >= 6 || preMonth >= 2 ? null : "none",
                      }}
                    >
                      <Controller
                        id="credit_card_history[1].number_of_transaction"
                        name="credit_card_history[1].number_of_transaction"
                        control={control}
                        render={({ field }) => (
                          <Input
                            control={control}
                            name="credit_card_history[1].number_of_transaction"
                            type="text"
                            invalid={errors.number_of_transaction && true}
                            {...field}
                          />
                        )}
                      />
                    </td>
                    <td
                      style={{
                        display: preMonth >= 6 || preMonth >= 3 ? null : "none",
                      }}
                    >
                      {""}
                      <Controller
                        id="credit_card_history[2].number_of_transaction"
                        name="credit_card_history[2].number_of_transaction"
                        control={control}
                        render={({ field }) => (
                          <Input
                            control={control}
                            name="credit_card_history[2].number_of_transaction"
                            type="text"
                            invalid={errors.number_of_transaction && true}
                            {...field}
                          />
                        )}
                      />
                    </td>
                    <td
                      style={{
                        display: preMonth >= 6 || preMonth >= 4 ? null : "none",
                      }}
                    >
                      {""}
                      <Controller
                        id="credit_card_history[3].number_of_transaction"
                        name="credit_card_history[3].number_of_transaction"
                        control={control}
                        render={({ field }) => (
                          <Input
                            control={control}
                            name="credit_card_history[3].number_of_transaction"
                            type="text"
                            invalid={errors.number_of_transaction && true}
                            {...field}
                          />
                        )}
                      />
                    </td>
                    <td
                      style={{
                        display: preMonth >= 6 || preMonth >= 5 ? null : "none",
                      }}
                    >
                      {""}
                      <Controller
                        id="credit_card_history[4].number_of_transaction"
                        name="credit_card_history[4].number_of_transaction"
                        control={control}
                        render={({ field }) => (
                          <Input
                            control={control}
                            name="credit_card_history[4].number_of_transaction"
                            type="text"
                            invalid={errors.number_of_transaction && true}
                            {...field}
                          />
                        )}
                      />
                    </td>
                    <td style={{ display: preMonth >= 6 ? null : "none" }}>
                      {""}
                      <Controller
                        id="credit_card_history[5].number_of_transaction"
                        name="credit_card_history[5].number_of_transaction"
                        control={control}
                        render={({ field }) => (
                          <Input
                            control={control}
                            name="credit_card_history[5].number_of_transaction"
                            type="text"
                            invalid={errors.number_of_transaction && true}
                            {...field}
                          />
                        )}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Transaction volume</td>
                    <td
                      style={{
                        display: preMonth >= 6 || preMonth >= 1 ? null : "none",
                      }}
                    >
                      <Controller
                        id="credit_card_history[0].transaction_volume"
                        name="credit_card_history[0].transaction_volume"
                        control={control}
                        render={({ field }) => (
                          <Input
                            control={control}
                            name="credit_card_history[0].transaction_volume"
                            type="text"
                            invalid={
                              errors.Transaction_volume_lastMonth && true
                            }
                            {...field}
                          />
                        )}
                      />
                    </td>
                    <td
                      style={{
                        display: preMonth >= 6 || preMonth >= 2 ? null : "none",
                      }}
                    >
                      <Controller
                        id="credit_card_history[1].transaction_volume"
                        name="credit_card_history[1].transaction_volume"
                        control={control}
                        render={({ field }) => (
                          <Input
                            control={control}
                            name="credit_card_history[1].transaction_volume"
                            type="text"
                            invalid={errors.Transaction_volume_2month && true}
                            {...field}
                          />
                        )}
                      />
                    </td>
                    <td
                      style={{
                        display: preMonth >= 6 || preMonth >= 3 ? null : "none",
                      }}
                    >
                      {""}
                      <Controller
                        id="credit_card_history[2].transaction_volume"
                        name="credit_card_history[2].transaction_volume"
                        control={control}
                        render={({ field }) => (
                          <Input
                            control={control}
                            name="credit_card_history[2].transaction_volume"
                            type="text"
                            invalid={errors.Transaction_volume_3month && true}
                            {...field}
                          />
                        )}
                      />
                    </td>
                    <td
                      style={{
                        display: preMonth >= 6 || preMonth >= 4 ? null : "none",
                      }}
                    >
                      {""}
                      <Controller
                        id="credit_card_history[3].transaction_volume"
                        name="credit_card_history[3].transaction_volume"
                        control={control}
                        render={({ field }) => (
                          <Input
                            control={control}
                            name="credit_card_history[3].transaction_volume"
                            type="text"
                            invalid={errors.Transaction_volume_4month && true}
                            {...field}
                          />
                        )}
                      />
                    </td>
                    <td
                      style={{
                        display: preMonth >= 6 || preMonth >= 5 ? null : "none",
                      }}
                    >
                      {""}
                      <Controller
                        id="credit_card_history[4].transaction_volume"
                        name="credit_card_history[4].transaction_volume"
                        control={control}
                        render={({ field }) => (
                          <Input
                            control={control}
                            name="credit_card_history[4].transaction_volume"
                            type="text"
                            invalid={errors.Transaction_volume_5month && true}
                            {...field}
                          />
                        )}
                      />
                    </td>
                    <td style={{ display: preMonth >= 6 ? null : "none" }}>
                      {""}
                      <Controller
                        id="credit_card_history[5].transaction_volume"
                        name="credit_card_history[5].transaction_volume"
                        control={control}
                        render={({ field }) => (
                          <Input
                            control={control}
                            name="credit_card_history[5].transaction_volume"
                            type="text"
                            invalid={errors.Transaction_volume_6month && true}
                            {...field}
                          />
                        )}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Number of chargebacks</td>
                    <td
                      style={{
                        display: preMonth >= 6 || preMonth >= 1 ? null : "none",
                      }}
                    >
                      <Controller
                        id="Number_of_chargebacks_lastMonth"
                        name="credit_card_history[0].number_of_chargeback"
                        control={control}
                        render={({ field }) => (
                          <Input
                            control={control}
                            name="credit_card_history[0].number_of_chargeback"
                            type="text"
                            invalid={
                              errors.Number_of_chargebacks_lastMonth && true
                            }
                            {...field}
                          />
                        )}
                      />
                    </td>
                    <td
                      style={{
                        display: preMonth >= 6 || preMonth >= 2 ? null : "none",
                      }}
                    >
                      <Controller
                        id="Number_of_chargebacks_2month"
                        name="credit_card_history[1].number_of_chargeback"
                        control={control}
                        render={({ field }) => (
                          <Input
                            control={control}
                            name="credit_card_history[1].number_of_chargeback"
                            type="text"
                            invalid={
                              errors.Number_of_chargebacks_2month && true
                            }
                            {...field}
                          />
                        )}
                      />
                    </td>
                    <td
                      style={{
                        display: preMonth >= 6 || preMonth >= 3 ? null : "none",
                      }}
                    >
                      {""}
                      <Controller
                        id="Number_of_chargebacks_3month"
                        name="credit_card_history[2].number_of_chargeback"
                        control={control}
                        render={({ field }) => (
                          <Input
                            control={control}
                            name="credit_card_history[2].number_of_chargeback"
                            type="text"
                            invalid={
                              errors.Number_of_chargebacks_3month && true
                            }
                            {...field}
                          />
                        )}
                      />
                    </td>
                    <td
                      style={{
                        display: preMonth >= 6 || preMonth >= 4 ? null : "none",
                      }}
                    >
                      {""}
                      <Controller
                        id="Number_of_chargebacks_4month"
                        name="credit_card_history[3].number_of_chargeback"
                        control={control}
                        render={({ field }) => (
                          <Input
                            control={control}
                            name="credit_card_history[3].number_of_chargeback"
                            type="text"
                            invalid={
                              errors.Number_of_chargebacks_4month && true
                            }
                            {...field}
                          />
                        )}
                      />
                    </td>
                    <td
                      style={{
                        display: preMonth >= 6 || preMonth >= 5 ? null : "none",
                      }}
                    >
                      {""}
                      <Controller
                        id="Number_of_chargebacks_5month"
                        name="credit_card_history[4].number_of_chargeback"
                        control={control}
                        render={({ field }) => (
                          <Input
                            control={control}
                            name="credit_card_history[4].number_of_chargeback"
                            type="text"
                            invalid={
                              errors.Number_of_chargebacks_5month && true
                            }
                            {...field}
                          />
                        )}
                      />
                    </td>
                    <td style={{ display: preMonth >= 6 ? null : "none" }}>
                      {""}
                      <Controller
                        id="Number_of_chargebacks_6month"
                        name="credit_card_history[5].number_of_chargeback"
                        control={control}
                        render={({ field }) => (
                          <Input
                            control={control}
                            name="credit_card_history[5].number_of_chargeback"
                            type="text"
                            invalid={
                              errors.Number_of_chargebacks_6month && true
                            }
                            {...field}
                          />
                        )}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Chargeback volume</td>
                    <td
                      style={{
                        display: preMonth >= 6 || preMonth >= 1 ? null : "none",
                      }}
                    >
                      <Controller
                        id="Chargeback_volume_lastMonth"
                        name="credit_card_history[0].chargeback_volume"
                        control={control}
                        render={({ field }) => (
                          <Input
                            control={control}
                            name="credit_card_history[0].chargeback_volume"
                            type="text"
                            invalid={errors.Chargeback_volume_lastMonth && true}
                            {...field}
                          />
                        )}
                      />
                    </td>
                    <td
                      style={{
                        display: preMonth >= 6 || preMonth >= 2 ? null : "none",
                      }}
                    >
                      <Controller
                        id="Chargeback_volume_2month"
                        name="credit_card_history[1].chargeback_volume"
                        control={control}
                        render={({ field }) => (
                          <Input
                            control={control}
                            name="credit_card_history[1].chargeback_volume"
                            type="text"
                            invalid={errors.Chargeback_volume_2month && true}
                            {...field}
                          />
                        )}
                      />
                    </td>
                    <td
                      style={{
                        display: preMonth >= 6 || preMonth >= 3 ? null : "none",
                      }}
                    >
                      {""}
                      <Controller
                        id="Chargeback_volume_3month"
                        name="credit_card_history[2].chargeback_volume"
                        control={control}
                        render={({ field }) => (
                          <Input
                            control={control}
                            name="credit_card_history[2].chargeback_volume"
                            type="text"
                            invalid={errors.Chargeback_volume_3month && true}
                            {...field}
                          />
                        )}
                      />
                    </td>
                    <td
                      style={{
                        display: preMonth >= 6 || preMonth >= 4 ? null : "none",
                      }}
                    >
                      {""}
                      <Controller
                        id="Chargeback_volume_4month"
                        name="credit_card_history[3].chargeback_volume"
                        control={control}
                        render={({ field }) => (
                          <Input
                            control={control}
                            name="credit_card_history[3].chargeback_volume"
                            type="text"
                            invalid={errors.Chargeback_volume_4month && true}
                            {...field}
                          />
                        )}
                      />
                    </td>
                    <td
                      style={{
                        display: preMonth >= 6 || preMonth >= 5 ? null : "none",
                      }}
                    >
                      {""}
                      <Controller
                        id="Chargeback_volume_5month"
                        name="credit_card_history[4].chargeback_volume"
                        control={control}
                        render={({ field }) => (
                          <Input
                            control={control}
                            name="credit_card_history[4].chargeback_volume"
                            type="text"
                            invalid={errors.Chargeback_volume_5month && true}
                            {...field}
                          />
                        )}
                      />
                    </td>
                    <td style={{ display: preMonth >= 6 ? null : "none" }}>
                      {""}
                      <Controller
                        id="Chargeback_volume_6month"
                        name="credit_card_history[5].chargeback_volume"
                        control={control}
                        render={({ field }) => (
                          <Input
                            control={control}
                            name="credit_card_history[5].chargeback_volume"
                            type="text"
                            invalid={errors.Chargeback_volume_6month && true}
                            {...field}
                          />
                        )}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Number of refunds</td>
                    <td
                      style={{
                        display: preMonth >= 6 || preMonth >= 1 ? null : "none",
                      }}
                    >
                      <Controller
                        id="Number_of_refunds_lastMonth"
                        name="credit_card_history[0].number_of_refunds"
                        control={control}
                        render={({ field }) => (
                          <Input
                            control={control}
                            name="credit_card_history[0].number_of_refunds"
                            type="text"
                            invalid={errors.Number_of_refunds_lastMonth && true}
                            {...field}
                          />
                        )}
                      />
                    </td>
                    <td
                      style={{
                        display: preMonth >= 6 || preMonth >= 2 ? null : "none",
                      }}
                    >
                      <Controller
                        id="Number_of_refunds_2month"
                        name="credit_card_history[1].number_of_refunds"
                        control={control}
                        render={({ field }) => (
                          <Input
                            control={control}
                            name="credit_card_history[1].number_of_refunds"
                            type="text"
                            invalid={errors.Number_of_refunds_2month && true}
                            {...field}
                          />
                        )}
                      />
                    </td>
                    <td
                      style={{
                        display: preMonth >= 6 || preMonth >= 3 ? null : "none",
                      }}
                    >
                      {""}
                      <Controller
                        id="Number_of_refunds_3month"
                        name="credit_card_history[2].number_of_refunds"
                        control={control}
                        render={({ field }) => (
                          <Input
                            control={control}
                            name="credit_card_history[2].number_of_refunds"
                            type="text"
                            invalid={errors.Number_of_refunds_3month && true}
                            {...field}
                          />
                        )}
                      />
                    </td>
                    <td
                      style={{
                        display: preMonth >= 6 || preMonth >= 4 ? null : "none",
                      }}
                    >
                      {""}
                      <Controller
                        id="Number_of_refunds_4month"
                        name="credit_card_history[3].number_of_refunds"
                        control={control}
                        render={({ field }) => (
                          <Input
                            control={control}
                            name="credit_card_history[3].number_of_refunds"
                            type="text"
                            invalid={errors.Number_of_refunds_4month && true}
                            {...field}
                          />
                        )}
                      />
                    </td>
                    <td
                      style={{
                        display: preMonth >= 6 || preMonth >= 5 ? null : "none",
                      }}
                    >
                      {""}
                      <Controller
                        id="Number_of_refunds_5month"
                        name="credit_card_history[4].number_of_refunds"
                        control={control}
                        render={({ field }) => (
                          <Input
                            control={control}
                            name="credit_card_history[4].number_of_refunds"
                            type="text"
                            invalid={errors.Number_of_refunds_5month && true}
                            {...field}
                          />
                        )}
                      />
                    </td>
                    <td style={{ display: preMonth >= 6 ? null : "none" }}>
                      {""}
                      <Controller
                        id="Number_of_refunds_6month"
                        name="credit_card_history[5].number_of_refunds"
                        control={control}
                        render={({ field }) => (
                          <Input
                            control={control}
                            name="credit_card_history[5].number_of_refunds"
                            type="text"
                            invalid={errors.Number_of_refunds_6month && true}
                            {...field}
                          />
                        )}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Refund volume</td>
                    <td
                      style={{
                        display: preMonth >= 6 || preMonth >= 1 ? null : "none",
                      }}
                    >
                      <Controller
                        id="Refund_volume_lastMonth"
                        name="credit_card_history[0].refund_volume"
                        control={control}
                        render={({ field }) => (
                          <Input
                            control={control}
                            name="credit_card_history[0].refund_volume"
                            type="text"
                            invalid={errors.Refund_volume_lastMonth && true}
                            {...field}
                          />
                        )}
                      />
                    </td>
                    <td
                      style={{
                        display: preMonth >= 6 || preMonth >= 2 ? null : "none",
                      }}
                    >
                      <Controller
                        id="Refund_volume_2month"
                        name="credit_card_history[1].refund_volume"
                        control={control}
                        render={({ field }) => (
                          <Input
                            control={control}
                            name="credit_card_history[1].refund_volume"
                            type="text"
                            invalid={errors.Refund_volume_2month && true}
                            {...field}
                          />
                        )}
                      />
                    </td>
                    <td
                      style={{
                        display: preMonth >= 6 || preMonth >= 3 ? null : "none",
                      }}
                    >
                      {""}
                      <Controller
                        id="Refund_volume_3month"
                        name="credit_card_history[2].refund_volume"
                        control={control}
                        render={({ field }) => (
                          <Input
                            control={control}
                            name="credit_card_history[2].refund_volume"
                            type="text"
                            invalid={errors.Refund_volume_3month && true}
                            {...field}
                          />
                        )}
                      />
                    </td>
                    <td
                      style={{
                        display: preMonth >= 6 || preMonth >= 4 ? null : "none",
                      }}
                    >
                      {""}
                      <Controller
                        id="Refund_volume_4month"
                        name="credit_card_history[3].refund_volume"
                        control={control}
                        render={({ field }) => (
                          <Input
                            control={control}
                            name="credit_card_history[3].refund_volume"
                            type="text"
                            invalid={errors.Refund_volume_4month && true}
                            {...field}
                          />
                        )}
                      />
                    </td>
                    <td
                      style={{
                        display: preMonth >= 6 || preMonth >= 5 ? null : "none",
                      }}
                    >
                      {""}
                      <Controller
                        id="Refund_volume_5month"
                        name="credit_card_history[4].refund_volume"
                        control={control}
                        render={({ field }) => (
                          <Input
                            control={control}
                            name="credit_card_history[4].refund_volume"
                            type="text"
                            invalid={errors.Refund_volume_5month && true}
                            {...field}
                          />
                        )}
                      />
                    </td>
                    <td style={{ display: preMonth >= 6 ? null : "none" }}>
                      {""}
                      <Controller
                        id="Refund_volume_6month"
                        name="credit_card_history[5].refund_volume"
                        control={control}
                        render={({ field }) => (
                          <Input
                            control={control}
                            name="credit_card_history[5].refund_volume"
                            type="text"
                            invalid={errors.Refund_volume_6month && true}
                            {...field}
                          />
                        )}
                      />
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
        </div>
        <div className=" container-none  p-2">
          <div className="row">
            <div className="col-12">
              <Label>Current/previous Payment Service Provider / gateway</Label>
              <Controller
                id="previous_payment_service_provider"
                name="previous_payment_service_provider"
                control={control}
                render={({ field }) => (
                  <Input
                    control={control}
                    name="previous_payment_service_provider"
                    type="textarea"
                    invalid={errors.previous_payment_service_provider && true}
                    {...field}
                  />
                )}
              />
            </div>
            <div className="col-12">
              <Label>Current/previous acquirer</Label>
              <Controller
                id="previous_acquirer"
                name="previous_acquirer"
                control={control}
                render={({ field }) => (
                  <Input
                    control={control}
                    name="previous_acquirer"
                    type="text"
                    invalid={errors.previous_acquirer && true}
                    {...field}
                  />
                )}
              />
            </div>
            <div className="col-12">
              <Label>Reason for leaving current acquirer</Label>
              <Controller
                id="leaving_current_acquirer"
                name="leaving_current_acquirer"
                control={control}
                render={({ field }) => (
                  <Input
                    control={control}
                    name="leaving_current_acquirer"
                    type="text"
                    invalid={errors.leaving_current_acquirer && true}
                    {...field}
                  />
                )}
              />
            </div>
            <div id="Estimated" className="col-12 mt-1">
              <Label className="form-label" htmlFor="monthly_sales_volume">
                Estimated monthly sales volume
              </Label>

              <Controller
                id="monthly_sales_volume"
                name="monthly_sales_volume"
                control={control}
                render={({ field }) => (
                  <Input
                    control={control}
                    name="monthly_sales_volume"
                    type="number"
                    invalid={errors.monthly_sales_volume && true}
                    {...field}
                  />
                )}
              />
            </div>
            <div id="avg_transaction_value" className="col-12 mt-1">
              <Label className="form-label" htmlFor="avg_transaction_value">
                Average transaction value
              </Label>
              <Controller
                id="avg_transaction_value"
                name="avg_transaction_value"
                control={control}
                render={({ field }) => (
                  <Input
                    control={control}
                    name="avg_transaction_value"
                    type="number"
                    invalid={errors.avg_transaction_value && true}
                    {...field}
                  />
                )}
              />
            </div>
            <div id="Highest_transaction_value" className="col-12 mt-1">
              <Label className="form-label" htmlFor="highest_transaction_value">
                Highest transaction value
              </Label>

              <Controller
                id="highest_transaction_value"
                name="highest_transaction_value"
                control={control}
                render={({ field }) => (
                  <Input
                    control={control}
                    name="highest_transaction_value"
                    type="number"
                    invalid={errors.highest_transaction_value && true}
                    {...field}
                  />
                )}
              />
            </div>
            <div id="currncy" className="col-12 mt-1">
              <Label className="currencu" htmlFor="currency">
                Currency
              </Label>

              <Controller
                id="currency"
                name="currency"
                control={control}
                render={({ field }) => (
                  <Input
                    control={control}
                    name="currency"
                    type="select"
                    invalid={errors.currency && true}
                    {...field}
                  >
                    <option>---select---</option>
                    {currencyList}
                  </Input>
                )}
              />
            </div>
            <div
              id="Highest_transaction_value"
              className="col-12 mt-1"
              style={borderB}
            >
              <div className="container-none">
                <h4 htmlFor="Highest_transaction_value">
                  Origin of transactions
                </h4>
                <p>
                  (where do cardholders come from) (total should equal 100%)
                </p>
                <div className="row g-1 ">
                  <div className="col-sm-3">
                    <Controller
                      id="domestic"
                      name="domestic"
                      control={control}
                      render={({ field }) => (
                        <Input
                          control={control}
                          name="domestic"
                          type="text"
                          placeholder="%"
                          invalid={errors.domestic && true}
                          {...field}
                        />
                      )}
                    />
                    <p>Domestic (from merchant’s own country) </p>
                  </div>
                  <div className="col-sm-3">
                    <Controller
                      id="europe"
                      name="europe"
                      control={control}
                      render={({ field }) => (
                        <Input
                          control={control}
                          name="europe"
                          type="text"
                          placeholder="%"
                          invalid={errors.europe && true}
                          {...field}
                        />
                      )}
                    />
                    <p>Europe</p>
                  </div>
                  <div className="col-sm-3">
                    <Controller
                      id="usa"
                      name="usa"
                      control={control}
                      render={({ field }) => (
                        <Input
                          control={control}
                          name="usa"
                          type="text"
                          placeholder="%"
                          invalid={errors.usa && true}
                          {...field}
                        />
                      )}
                    />
                    <p>USA</p>
                  </div>
                  <div className="col-sm-3">
                    <Controller
                      id="asia"
                      name="asia"
                      control={control}
                      render={({ field }) => (
                        <Input
                          control={control}
                          name="asia"
                          type="text"
                          placeholder="%"
                          invalid={errors.asia && true}
                          {...field}
                        />
                      )}
                    />
                    <p>Asia</p>
                  </div>
                  <div className="col-sm-3">
                    <Controller
                      id="rest_of_world"
                      name="rest_of_world"
                      control={control}
                      render={({ field }) => (
                        <Input
                          control={control}
                          name="rest_of_world"
                          type="text"
                          placeholder="%"
                          invalid={errors.rest_of_world && true}
                          {...field}
                        />
                      )}
                    />
                    <p>Rest of world</p>
                  </div>
                </div>
              </div>
            </div>

            {/* heavy painding */}
            <div className="container_none col-12  p-1" style={borderB}>
              <div className="row g-1">
                <h4>Card types applying for:</h4>
                {cardType &&
                  cardType.map((res, id) => {
                    let data = defaultData && defaultData.card_type;
                    if (data && data.length > 0) {
                      const index = res.id;
                      const x = document.getElementById(`card_types_${res.id}`);
                      if (data) {
                        for (let i = 0; i < data.length; i++) {
                          if (x !== null && data[i] === index) {
                            x.setAttribute("checked", true);
                            break;
                          }
                        }
                      }
                    }
                    return (
                      <div className="col-3" key={id}>
                        <Input
                          id={`card_types_${res.id}`}
                          type="checkbox"
                          name={res.card_type}
                          onChange={(e) => handleChangeboxes(e, res.id)}
                          selected={selectedCheckboxes.includes(id)}
                        />
                        {res.card_type}
                      </div>
                    );
                  })}

                <div className="col-6">
                  <Controller
                    id="Other_applying_explain"
                    name="Other_applying_explain"
                    control={control}
                    render={({ field }) => (
                      <Input
                        control={control}
                        name="Other_applying_explain"
                        invalid={errors.Other_applying_explain && true}
                        {...field}
                        type="text"
                      />
                    )}
                  />
                </div>
              </div>
            </div>
            <div id="Method_Acceptance" className="col-12 mt-1" style={borderB}>
              <div className="container-none">
                <h4 htmlFor="Method_Acceptance">Method of acceptance.</h4>
                <p>(total should equal 100%)</p>
                <div className="row g-1 ">
                  <div className="col-sm-3">
                    <Controller
                      id="e_commerce"
                      name="e_commerce"
                      control={control}
                      render={({ field }) => (
                        <Input
                          control={control}
                          name="e_commerce"
                          type="text"
                          placeholder="%"
                          invalid={errors.e_commerce && true}
                          {...field}
                        />
                      )}
                    />
                    <p>E-commerce</p>
                  </div>
                  <div className="col-sm-3">
                    <Controller
                      id="card_present"
                      name="card_present"
                      control={control}
                      render={({ field }) => (
                        <Input
                          control={control}
                          name="card_present"
                          type="text"
                          placeholder="%"
                          invalid={errors.card_present && true}
                          {...field}
                        />
                      )}
                    />
                    <p>Card Present (Point-Of-Sale)</p>
                  </div>
                  <div className="col-sm-3">
                    <Controller
                      id="m_pos"
                      name="m_pos"
                      control={control}
                      render={({ field }) => (
                        <Input
                          control={control}
                          name="m_pos"
                          type="text"
                          placeholder="%"
                          invalid={errors.m_pos && true}
                          {...field}
                        />
                      )}
                    />
                    <p>M-Pos (Mobile POS)</p>
                  </div>
                  <div className="col-sm-3">
                    <Controller
                      id="m_commerce"
                      name="m_commerce"
                      control={control}
                      render={({ field }) => (
                        <Input
                          control={control}
                          name="m_commerce"
                          type="text"
                          placeholder="%"
                          invalid={errors.m_commerce && true}
                          {...field}
                        />
                      )}
                    />
                    <p>M-Commerce (Mobile payments)</p>
                  </div>
                  <div className="col-sm-3">
                    <Controller
                      id="moto"
                      name="moto"
                      control={control}
                      render={({ field }) => (
                        <Input
                          control={control}
                          name="moto"
                          type="text"
                          placeholder="%"
                          invalid={errors.moto && true}
                          {...field}
                        />
                      )}
                    />
                    <p>MOTO (Mail-order/Telephone-order)</p>
                  </div>
                  <div className="col-sm-3">
                    <Controller
                      id="in_app_commerce"
                      name="in_app_commerce"
                      control={control}
                      render={({ field }) => (
                        <Input
                          control={control}
                          name="in_app_commerce"
                          type="text"
                          placeholder="%"
                          invalid={errors.in_app_commerce && true}
                          {...field}
                        />
                      )}
                    />
                    <p>In-App commerce</p>
                  </div>
                </div>
              </div>
            </div>
            <div
              id="Payment_place"
              className="col-12 mt-2 mb-2 p-1"
              style={borderB}
            >
              <div className="container-none">
                <div className="row g-4">
                  <h4>When does payment take place?</h4>
                  <div className="col-3 d-flex">
                    {""}
                    {/* <Controller
                      id="upon_purchase"
                      name="upon_purchase"
                      control={control}
                      render={({ field }) => (
                        <div
                          control={control}
                          name="upon_purchase"
                          invalid={errors.upon_purchase && true}
                          {...field}
                        >
                          <Input type="checkbox" /> 
                        </div>
                      )}
                    /> */}
                    <Label className="fw-bolder fs-5">Upon purchase:-</Label>
                    <Controller
                      id="upon_purchase"
                      name="upon_purchase"
                      control={control}
                      render={({ field: { value, onChange } }) => {
                        const st = {
                          fontWeight: "bolder",
                          margin: " 2px 1px",
                        };
                        const boolean = (value) => {
                          if (value) return <p style={st}>Yes</p>;
                          else return <p style={st}>No</p>;
                        };
                        return (
                          <div className="form-switch form-check-primary d-flex">
                            <Input
                              type="switch"
                              name="icon-primary"
                              onChange={onChange}
                              checked={value}
                            />
                            {boolean(value)}
                          </div>
                        );
                      }}
                    />
                  </div>
                  <div className="col-3 d-flex">
                    {""}
                    {/* <Controller
                      id="with_download"
                      name="with_download"
                      control={control}
                      render={({ field }) => (
                        <div
                          control={control}
                          name="with_download"
                          invalid={errors.with_download && true}
                          {...field}
                        >
                          <Input type="checkbox" value={true} /> With download
                        </div>
                      )}
                    /> */}
                    <Label className="fw-bolder fs-5">With download:-</Label>
                    <Controller
                      id="with_download"
                      name="with_download"
                      control={control}
                      render={({ field: { value, onChange } }) => {
                        const st = {
                          fontWeight: "bolder",
                          margin: " 2px 1px",
                        };
                        const boolean = (value) => {
                          if (value) return <p style={st}>Yes</p>;
                          else return <p style={st}>No</p>;
                        };
                        return (
                          <div className="form-switch form-check-primary d-flex">
                            <Input
                              type="switch"
                              name="icon-primary"
                              onChange={onChange}
                              checked={value}
                            />
                            {boolean(value)}
                          </div>
                        );
                      }}
                    />
                  </div>
                  <div className="col-3 d-flex">
                    {""}
                    {/* <Controller
                      id="on_delivery"
                      name="on_delivery"
                      control={control}
                      render={({ field }) => (
                        <div
                          control={control}
                          name="on_delivery"
                          invalid={errors.on_delivery && true}
                          {...field}
                        >
                          <Input type="checkbox" value={true} /> On delivery
                        </div>
                      )}
                    /> */}
                    <Label className="fw-bolder fs-5">On delivery:-</Label>
                    <Controller
                      id="on_delivery"
                      name="on_delivery"
                      control={control}
                      render={({ field: { value, onChange } }) => {
                        const st = {
                          fontWeight: "bolder",
                          margin: " 2px 1px",
                        };
                        const boolean = (value) => {
                          if (value) return <p style={st}>Yes</p>;
                          else return <p style={st}>No</p>;
                        };
                        return (
                          <div className="form-switch form-check-primary d-flex">
                            <Input
                              type="switch"
                              name="icon-primary"
                              onChange={onChange}
                              checked={value}
                            />
                            {boolean(value)}
                          </div>
                        );
                      }}
                    />
                  </div>
                  <div className="col-4 d-flex">
                    {""}
                    {/* <Controller
                      id="others"
                      name="others"
                      control={control}
                      render={({ field }) => (
                        <div
                          control={control}
                          name="others"
                          invalid={errors.others && true}
                          {...field}
                        >
                          <Input type="checkbox" value={true} /> Other
                        </div>
                      )}
                    /> */}
                    <Label className="fw-bolder fs-5">Other:-</Label>
                    <Controller
                      id="others"
                      name="others"
                      control={control}
                      render={({ field: { value, onChange } }) => {
                        setOtherTakePlace(value);
                        const st = {
                          fontWeight: "bolder",
                          margin: " 2px 1px",
                        };
                        const boolean = (value) => {
                          if (value) return <p style={st}>Yes</p>;
                          else return <p style={st}>No</p>;
                        };
                        return (
                          <div className="form-switch form-check-primary d-flex">
                            <Input
                              type="switch"
                              name="icon-primary"
                              onChange={onChange}
                              checked={value}
                            />
                            {boolean(value)}
                          </div>
                        );
                      }}
                    />
                  </div>
                  {otherTakePlace ? (
                    <div className="col-3">
                      {""}
                      <Controller
                        id="other_detail"
                        name="other_detail"
                        control={control}
                        render={({ field }) => (
                          <div className="mb-1">
                            <Input
                              control={control}
                              name="other_detail"
                              placeholder="if other specify"
                              invalid={errors.other_detail && true}
                              {...field}
                              type="text"
                            />
                            {""}
                          </div>
                        )}
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            <div id="Payment_frequency" className="col-6 mt-1">
              <div className="container-none">
                <h1 className="form-label fs-3" htmlFor="Payment_frequency">
                  Payment frequency
                </h1>
                <br />
                <br />
                <div className="row g-3 mb-2">
                  <div className="col-6">
                    <Controller
                      id="one_time_payment"
                      name="one_time_payment"
                      control={control}
                      render={({ field }) => {
                        let id = document.getElementById("one_time_payment");
                        if (field.value === true) {
                          if (id) {
                            id.setAttribute("checked", true);
                          }
                        } else if (!field.value && id !== null) {
                          id.removeAttribute("checked");
                        }
                        return (
                          <div>
                            <Input
                              control={control}
                              name="one_time_payment"
                              invalid={errors.one_time_payment && true}
                              {...field}
                              id="one_time_payment"
                              type="checkbox"
                            />
                            One-time payment
                          </div>
                        );
                      }}
                    />
                  </div>
                  <div className="col-6">
                    {/* <Controller
                      id="recurring_payment"
                      name="recurring_payment"
                      control={control}
                      render={({ field }) => (
                        <div
                          control={control}
                          name="recurring_payment"
                          invalid={errors.recurring_payment && true}
                          {...field}
                        >
                          <Input type="checkbox" checked />
                          Recurring payment (subscription)
                        </div>
                      )}
                    /> */}
                    <Controller
                      id="recurring_payment"
                      name="recurring_payment"
                      control={control}
                      render={({ field }) => {
                        let id = document.getElementById("recurring_payment");
                        if (field.value === true) {
                          if (id) {
                            id.setAttribute("checked", true);
                          }
                        } else if (!field.value && id !== null) {
                          id.removeAttribute("checked");
                        }
                        return (
                          <div>
                            <Input
                              control={control}
                              name="recurring_payment"
                              invalid={errors.recurring_payment && true}
                              {...field}
                              id="recurring_payment"
                              type="checkbox"
                            />
                            <span style={{ width: "max-content" }}>
                              Recurring payment (subscription)
                            </span>
                          </div>
                        );
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* write here */}
            <div
              id="delivery_time_for_good"
              className="col-12 mt-1"
              style={borderB}
            >
              <div className="container-none">
                <h4 htmlFor="delivery_time_for_good">
                  Delivery time for goods/services
                </h4>
                <p>(upon purchase) (total should equal 100%)</p>
                <div className="row g-1">
                  <div className="col-sm-3">
                    <Controller
                      id="immediately"
                      name="immediately"
                      control={control}
                      render={({ field }) => (
                        <Input
                          control={control}
                          name="immediately"
                          type="text"
                          placeholder="%"
                          invalid={errors.immediately && true}
                          {...field}
                        />
                      )}
                    />
                    <p>Immediately</p>
                  </div>
                  <div className="col-sm-3">
                    <Controller
                      id="within_four_weeks"
                      name="within_four_weeks"
                      control={control}
                      render={({ field }) => (
                        <Input
                          control={control}
                          name="within_four_weeks"
                          type="text"
                          placeholder="%"
                          invalid={errors.within_four_weeks && true}
                          {...field}
                        />
                      )}
                    />
                    <p>Within 4 weeks</p>
                  </div>
                  <div className="col-sm-3">
                    <Controller
                      id="within_5_14_weeks"
                      name="within_5_14_weeks"
                      control={control}
                      render={({ field }) => (
                        <Input
                          control={control}
                          name="within_5_14_weeks"
                          type="text"
                          placeholder="%"
                          invalid={errors.within_5_14_weeks && true}
                          {...field}
                        />
                      )}
                    />
                    <p>Within 5-14 weeks</p>
                  </div>
                  <div className="col-sm-3">
                    <Controller
                      id="more_than_14_weeks"
                      name="more_than_14_weeks"
                      control={control}
                      render={({ field }) => (
                        <Input
                          control={control}
                          name="more_than_14_weeks"
                          type="text"
                          placeholder="%"
                          invalid={errors.more_than_14_weeks && true}
                          {...field}
                        />
                      )}
                    />
                    <p>More than 14 weeks</p>
                  </div>
                </div>
              </div>
            </div>
            <div
              id="delivery_time_for_good"
              className="col-12 mt-1"
              style={borderB}
            >
              <div className="container_none mb-3">
                <div className="row">
                  <div className="col-sm-6">
                    <Label>
                      Do you offer / make use of affiliate programs?
                    </Label>
                    <Controller
                      id="do_you_offer"
                      name="do_you_offer"
                      control={control}
                      render={({ field: { value, onChange } }) => {
                        setAffiliateDetails(value);
                        const st = {
                          fontWeight: "bolder",
                          margin: " 2px 1px",
                        };
                        const boolean = (value) => {
                          if (value) return <p style={st}>Yes</p>;
                          else return <p style={st}>No</p>;
                        };
                        return (
                          <div className="form-switch form-check-primary d-flex">
                            <Input
                              type="switch"
                              name="icon-primary"
                              onChange={onChange}
                              checked={value}
                            />
                            {boolean(value)}
                          </div>
                        );
                      }}
                    />
                  </div>
                  {affiliateDetails && (
                    <div className="col-sm-6">
                      <Controller
                        id="provide_details"
                        name="provide_details"
                        control={control}
                        render={({ field }) => (
                          <>
                            <Input
                              control={control}
                              name="provide_details"
                              type="text"
                              invalid={errors.provide_details && true}
                              {...field}
                            />
                            <p>(please provide details)</p>
                          </>
                        )}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div
          className="mt-2 mb-b  d-flex justify-content-end"
          style={{ width: "90%" }}
        >
          <Button
            onClick={() => {
              stepper.previous();
              setCounter(counter + 1);
            }}
            color="secondry btn-outline-secondary"
          >
            Previouse
          </Button>

          <Button type="submit" color="primary ms-2">
            Next
          </Button>
        </div> */}
        <div className="d-flex justify-content-between mt-3">
          <Button
            onClick={() => {
              stepper.previous();
              setCounter(counter + 1);
            }}
            color="secondry btn-outline-secondary"
          >
            <ArrowLeft
              size={14}
              className="align-middle me-sm-25 me-0"
            ></ArrowLeft>
            <span className="align-middle d-sm-inline-block d-none">
              Previous
            </span>
          </Button>
          <Button
            color="primary"
            className="btn-next"
            type="submit"
            onClick={() => stepper.next()}
          >
            <span className="align-middle d-sm-inline-block d-none">Next</span>
            <ArrowRight
              size={14}
              className="align-middle ms-sm-25 ms-0"
            ></ArrowRight>
          </Button>
        </div>
      </Form>
    </div>
  );
};
export default BusinessProfile;
