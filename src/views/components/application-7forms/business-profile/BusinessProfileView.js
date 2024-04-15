import { useState, Fragment, useEffect } from "react";
import {
  Label,
  Button,
  Form,
  Input,
  Card,
  Table,
  Row,
  Col,
  Spinner,
  CardFooter,
  FormFeedback,
  CardHeader,
} from "reactstrap";
import useJwt from "@src/dashboard/jwt/useJwt";
import { Controller, useForm } from "react-hook-form";
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
import "../style/style.css";
// paid currency function
const currencyList = paidCurrencyList.map((e, i) => {
  return <option key={i}>{e}</option>;
});

const BusinessProfile = (props) => {
  const { setpper, data } = props;
  // ** States
  const [preMonth, setPreMonth] = useState("");
  const [cap, setCap] = useState(false);
  const [otherTakePlace, setOtherTakePlace] = useState(false);
  const [isAccepted, setIsAccepted] = useState(true);
  const [defaultData, setDefaultData] = useState({ card_type: [] });
  const [affiliateDetails, setAffiliateDetails] = useState(false);
  const [loader, setLoader] = useState(false);
  const [isBeta, setIsBeta] = useState(false);
  const [bankruptcyDate, setBankruptcyDate] = useState(false);
  const [creditCardMonth, setCreditCardMonth] = useState(false);
  const [violation, setViolation] = useState(false);
  const [cardType, setCardType] = useState(false);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [callGet, setCallGet] = useState(false);
  //**  Origin of transactions
  const [demesticTransition, setDemositicTransition] = useState(0);
  const [europeTransition, setEuropeTransition] = useState(0);
  const [usaTransition, setUsaTransition] = useState(0);
  const [asiaTransition, setAsiaTransition] = useState(0);
  const [restTransition, setRestTransition] = useState(0);
  const [transition, setTransition] = useState(false);

  // ** Navigater
  const navigate = useNavigate();

  // ** Method of acceptance.
  const [EC, setEC] = useState(0);
  const [POS, setPOS] = useState(0);
  const [MPOS, setMPOS] = useState(0);
  const [MP, setMP] = useState(0);
  const [MTO, setMTO] = useState(0);
  const [IAC, setIAC] = useState(0);
  const [method, setMethod] = useState(false);

  // ** Delivery time for goods/services
  const [immediately, setImmediately] = useState(0);
  const [f_week, setF_week] = useState(0);
  const [Ff_week, setFf_week] = useState(0);
  const [moreWeek, setMoreWeek] = useState(0);
  const [delivery, setDelivery] = useState(false);

  const applicationID = localStorage.getItem("application_id");

  const {
    control,
    setError,
    reset,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm({ defaultValues: defaultData });

  //**  Origin of transactions Validation
  useEffect(() => {
    useJwt.cardtype().then((res) => {
      if (res.status === 200) {
        setCardType(res.data);
      }
    });
  }, []);

  useEffect(() => {
    let total =
      demesticTransition +
      europeTransition +
      usaTransition +
      asiaTransition +
      restTransition;
    total > 100 ? setTransition(true) : setTransition(false);
  }, [
    demesticTransition,
    europeTransition,
    usaTransition,
    asiaTransition,
    restTransition,
  ]);

  // ** Method of acceptance.
  useEffect(() => {
    let total = EC + POS + MPOS + MP + MTO + IAC;
    total > 100 ? setMethod(true) : setMethod(false);
  }, [EC, POS, MPOS, MP, MTO, IAC]);

  useEffect(() => {
    let total = immediately + f_week + Ff_week + moreWeek + delivery;
    total > 100 ? setDelivery(true) : setDelivery(false);
  }, [immediately, f_week, Ff_week, moreWeek]);

  const checkMonth = (data = {}) => {
    if (data["credit_card_months"]) {
      setPreMonth(data["credit_card_months"]);
    }
  };

  const setPercentState = (data = {}) => {
    /*
      demesticTransition +
      europeTransition +
      usaTransition +
      asiaTransition +
      restTransition;
*/
    setDemositicTransition(dataAvailable(data?.domestic));
    setAsiaTransition(dataAvailable(data?.europe));
    setEuropeTransition(dataAvailable(data?.europe));
    setUsaTransition(dataAvailable(data?.usa));
    setRestTransition(dataAvailable(data?.rest_of_world));
    function dataAvailable(data) {
      return data ? data : 0;
    }
  };

  useEffect(() => {
    if (data) {
      setDefaultData(data);
      setPercentState(data);
      reset(data);
      setSelectedCheckboxes([]);
      checkMonth(data);
    }
  }, [reset, data]);

  const handleChangeboxes = (e, id) => {
    const findIdx = selectedCheckboxes.indexOf(id);
    if (findIdx > -1) {
      selectedCheckboxes.splice(findIdx, 1);
    } else {
      selectedCheckboxes.push(id);
    }
    setSelectedCheckboxes(selectedCheckboxes);
  };
 

  const checkCharLength = (char, min, name) => {
    if (char?.length > min)
      return setError(name, {
        type: "custom",
        message: `value must be lesser than ${min}`,
      });
    else return clearErrors(name);
  };

  return (
    <Card className="application-container">
      <CardHeader>
        <div className="content-header">
          <h5 className="card-title">Business Profile</h5>
          <small className="text-muted">Add Business Details.</small>
        </div>
      </CardHeader>
      <Form>
        <div hidden>
          <Controller
            id="uid"
            name="uid"
            control={control}
            readOnly={isAccepted}
            render={({ field }) => {
              return (
                <Input
                  {...field}
                  // defaultValue={0}
                  control={control}
                  readOnly={isAccepted}
                  name="uid"
                  type="number"
                  invalid={errors.uid && true}
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
                readOnly={isAccepted}
                render={({ field }) => (
                  <Input
                    {...field}
                    readOnly={isAccepted}
                    type="textarea"
                    invalid={errors.description_of_products && true}
                    onChange={(e) => {
                      checkCharLength(e.target.value, 20, field.name);
                      field.onChange(e.target.value);
                    }}
                  />
                )}
              />
              {errors.description_of_products ? (
                <FormFeedback>
                  {errors.description_of_products.message}
                </FormFeedback>
              ) : null}
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
                readOnly={isAccepted}
                render={({ field }) => (
                  <Input
                    {...field}
                    readOnly={isAccepted}
                    type="month"
                    invalid={errors.length_of_time_business && true}
                  />
                )}
              />
              {errors.length_of_time_business ? (
                <FormFeedback>
                  {errors.length_of_time_business.message}
                </FormFeedback>
              ) : null}
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
                readOnly={isAccepted}
                render={({ field }) => (
                  <Input
                    {...field}
                    control={control}
                    readOnly={isAccepted}
                    name="website"
                    type="textarea"
                    invalid={errors.website && true}
                    onChange={(e) => {
                      checkCharLength(e.target.value, 30, field.name);
                      field.onChange(e.target.value);
                    }}
                  />
                )}
              />
              {errors.website ? (
                <FormFeedback>{errors.website.message}</FormFeedback>
              ) : null}
            </div>
            <div className="col-6">
              <Label>
                Beta website(s)
                <span style={{ color: "gray" }}>(if applicable)</span>
              </Label>
              <Controller
                id="login_details"
                name="login_details"
                control={control}
                readOnly={isAccepted}
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
                        disabled={isAccepted}
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
              <Row>
                <div>
                  <Label className="form-label" htmlFor="beta_website">
                    url
                  </Label>
                  <Controller
                    id="url"
                    name="beta_website"
                    control={control}
                    readOnly={isAccepted}
                    render={({ field }) => (
                      <Input
                        {...field}
                        control={control}
                        readOnly={isAccepted}
                        name="beta_website"
                        type="text"
                        invalid={errors.beta_website && true}
                        onChange={(e) => {
                          checkCharLength(e.target.value, 20, field.name);
                          field.onChange(e.target.value);
                        }}
                      />
                    )}
                  />
                </div>

                <div className="Form-Group col-sm-6">
                  <Label className="form-label" htmlFor="username">
                    User Name
                  </Label>
                  <Controller
                    id="username"
                    name="username"
                    control={control}
                    readOnly={isAccepted}
                    render={({ field }) => (
                      <Input
                        {...field}
                        readOnly={isAccepted}
                        type="text"
                        invalid={errors.username && true}
                        onChange={(e) => {
                          checkCharLength(e.target.value, 20, field.name);
                          field.onChange(e.target.value);
                        }}
                      />
                    )}
                  />
                  {errors.username ? (
                    <FormFeedback>{errors.username.message}</FormFeedback>
                  ) : null}
                </div>

                <div className="Form-Group col-sm-6">
                  <Label className="form-label" htmlFor="password">
                    Password
                  </Label>
                  <Controller
                    id="password"
                    name="password"
                    control={control}
                    readOnly={isAccepted}
                    render={({ field }) => (
                      <Input
                        {...field}
                        readOnly={isAccepted}
                        type="password"
                        invalid={errors.password && true}
                        onChange={(e) => {
                          checkCharLength(e.target.value, 20, field.name);
                          field.onChange(e.target.value);
                        }}
                      />
                    )}
                  />
                  {errors.password ? (
                    <FormFeedback>{errors.password.message}</FormFeedback>
                  ) : null}
                </div>
              </Row>
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
                readOnly={isAccepted}
                render={({ field }) => (
                  <Input
                    {...field}
                    readOnly={isAccepted}
                    type="textarea"
                    invalid={errors.descriptor && true}
                  />
                )}
              />
              {errors.descriptor ? (
                <FormFeedback>{errors.descriptor.message}</FormFeedback>
              ) : null}
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
                readOnly={isAccepted}
                render={({ field }) => (
                  <Input
                    {...field}
                    readOnly={isAccepted}
                    type="textarea"
                    invalid={errors.city_field && true}
                    onChange={(e) => {
                      checkCharLength(e.target.value, 20, field.name);
                      field.onChange(e.target.value);
                    }}
                  />
                )}
              />
              {errors.city_field ? (
                <FormFeedback>{errors.city_field.message}</FormFeedback>
              ) : null}
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
                readOnly={isAccepted}
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
                        disabled={isAccepted}
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
                        readOnly={isAccepted}
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
                                disabled={isAccepted}
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
                    <Label className="fw-bold">Date</Label>
                    <Controller
                      id="bankruptcy_date"
                      name="bankruptcy_date"
                      control={control}
                      readOnly={isAccepted}
                      render={({ field }) => (
                        <Input
                          control={control}
                          readOnly={isAccepted}
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
                        readOnly={isAccepted}
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
                      readOnly={isAccepted}
                      render={({ field }) => (
                        <Input
                          control={control}
                          readOnly={isAccepted}
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
                      <Controller
                        id="accepted_credit_cards"
                        name="accepted_credit_cards"
                        control={control}
                        // readOnly={isAccepted}
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
                                disabled={isAccepted}
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
                      readOnly={isAccepted}
                      render={({ field }) => {
                        return (
                          <Input
                            {...field}
                            control={control}
                            readOnly={isAccepted}
                            name="credit_card_months"
                            type="number"
                            placeholder="month"
                            invalid={errors.credit_card_months && true}
                            onChange={(e) => {
                              setPreMonth(parseInt(e.target.value));
                              field.onChange(e.target.value);
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
                      readOnly={isAccepted}
                      render={({ field }) => (
                        <Input
                          {...field}
                          control={control}
                          readOnly={isAccepted}
                          name="credit_card_history[0].months_ago"
                          type="number"
                          value={1}
                          invalid={errors.number_of_transaction && true}
                        />
                      )}
                    />
                    <Controller
                      name="credit_card_history[1].months_ago"
                      control={control}
                      readOnly={isAccepted}
                      render={({ field }) => (
                        <Input
                          {...field}
                          control={control}
                          readOnly={isAccepted}
                          name="credit_card_history[1].months_ago"
                          type="number"
                          value={2}
                          invalid={errors.number_of_transaction && true}
                        />
                      )}
                    />
                    <Controller
                      name="credit_card_history[2].months_ago"
                      control={control}
                      readOnly={isAccepted}
                      render={({ field }) => (
                        <Input
                          {...field}
                          control={control}
                          readOnly={isAccepted}
                          name="credit_card_history[2].months_ago"
                          type="number"
                          value={3}
                          invalid={errors.number_of_transaction && true}
                        />
                      )}
                    />
                    <Controller
                      name="credit_card_history[3].months_ago"
                      control={control}
                      readOnly={isAccepted}
                      render={({ field }) => (
                        <Input
                          {...field}
                          control={control}
                          readOnly={isAccepted}
                          name="credit_card_history[3].months_ago"
                          type="number"
                          value={4}
                          invalid={errors.number_of_transaction && true}
                        />
                      )}
                    />
                    <Controller
                      name="credit_card_history[4].months_ago"
                      control={control}
                      readOnly={isAccepted}
                      render={({ field }) => (
                        <Input
                          {...field}
                          control={control}
                          readOnly={isAccepted}
                          name="credit_card_history[4].months_ago"
                          type="number"
                          value={5}
                          invalid={errors.number_of_transaction && true}
                        />
                      )}
                    />
                    <Controller
                      name="credit_card_history[5].months_ago"
                      control={control}
                      readOnly={isAccepted}
                      render={({ field }) => (
                        <Input
                          {...field}
                          control={control}
                          readOnly={isAccepted}
                          name="credit_card_history[5].months_ago"
                          type="number"
                          value={6}
                          invalid={errors.number_of_transaction && true}
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
                        readOnly={isAccepted}
                        render={({ field }) => (
                          <Input
                            {...field}
                            control={control}
                            readOnly={isAccepted}
                            name="credit_card_history[0].number_of_transaction"
                            type="text"
                            invalid={errors.number_of_transaction && true}
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
                        readOnly={isAccepted}
                        render={({ field }) => (
                          <Input
                            {...field}
                            control={control}
                            readOnly={isAccepted}
                            name="credit_card_history[1].number_of_transaction"
                            type="text"
                            invalid={errors.number_of_transaction && true}
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
                        readOnly={isAccepted}
                        render={({ field }) => (
                          <Input
                            {...field}
                            control={control}
                            readOnly={isAccepted}
                            name="credit_card_history[2].number_of_transaction"
                            type="text"
                            invalid={errors.number_of_transaction && true}
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
                        readOnly={isAccepted}
                        render={({ field }) => (
                          <Input
                            {...field}
                            control={control}
                            readOnly={isAccepted}
                            name="credit_card_history[3].number_of_transaction"
                            type="text"
                            invalid={errors.number_of_transaction && true}
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
                        readOnly={isAccepted}
                        render={({ field }) => (
                          <Input
                            {...field}
                            control={control}
                            readOnly={isAccepted}
                            name="credit_card_history[4].number_of_transaction"
                            type="text"
                            invalid={errors.number_of_transaction && true}
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
                        readOnly={isAccepted}
                        render={({ field }) => (
                          <Input
                            {...field}
                            control={control}
                            readOnly={isAccepted}
                            name="credit_card_history[5].number_of_transaction"
                            type="text"
                            invalid={errors.number_of_transaction && true}
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
                        readOnly={isAccepted}
                        render={({ field }) => (
                          <Input
                            {...field}
                            control={control}
                            readOnly={isAccepted}
                            name="credit_card_history[0].transaction_volume"
                            type="text"
                            invalid={
                              errors.Transaction_volume_lastMonth && true
                            }
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
                        readOnly={isAccepted}
                        render={({ field }) => (
                          <Input
                            {...field}
                            control={control}
                            readOnly={isAccepted}
                            name="credit_card_history[1].transaction_volume"
                            type="text"
                            invalid={errors.Transaction_volume_2month && true}
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
                        readOnly={isAccepted}
                        render={({ field }) => (
                          <Input
                            {...field}
                            control={control}
                            readOnly={isAccepted}
                            name="credit_card_history[2].transaction_volume"
                            type="text"
                            invalid={errors.Transaction_volume_3month && true}
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
                        readOnly={isAccepted}
                        render={({ field }) => (
                          <Input
                            {...field}
                            control={control}
                            readOnly={isAccepted}
                            name="credit_card_history[3].transaction_volume"
                            type="text"
                            invalid={errors.Transaction_volume_4month && true}
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
                        readOnly={isAccepted}
                        render={({ field }) => (
                          <Input
                            {...field}
                            control={control}
                            readOnly={isAccepted}
                            name="credit_card_history[4].transaction_volume"
                            type="text"
                            invalid={errors.Transaction_volume_5month && true}
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
                        readOnly={isAccepted}
                        render={({ field }) => (
                          <Input
                            {...field}
                            control={control}
                            readOnly={isAccepted}
                            name="credit_card_history[5].transaction_volume"
                            type="text"
                            invalid={errors.Transaction_volume_6month && true}
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
                        readOnly={isAccepted}
                        render={({ field }) => (
                          <Input
                            {...field}
                            control={control}
                            readOnly={isAccepted}
                            name="credit_card_history[0].number_of_chargeback"
                            type="text"
                            invalid={
                              errors.Number_of_chargebacks_lastMonth && true
                            }
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
                        readOnly={isAccepted}
                        render={({ field }) => (
                          <Input
                            {...field}
                            control={control}
                            readOnly={isAccepted}
                            name="credit_card_history[1].number_of_chargeback"
                            type="text"
                            invalid={
                              errors.Number_of_chargebacks_2month && true
                            }
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
                        readOnly={isAccepted}
                        render={({ field }) => (
                          <Input
                            {...field}
                            control={control}
                            readOnly={isAccepted}
                            name="credit_card_history[2].number_of_chargeback"
                            type="text"
                            invalid={
                              errors.Number_of_chargebacks_3month && true
                            }
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
                        readOnly={isAccepted}
                        render={({ field }) => (
                          <Input
                            {...field}
                            control={control}
                            readOnly={isAccepted}
                            name="credit_card_history[3].number_of_chargeback"
                            type="text"
                            invalid={
                              errors.Number_of_chargebacks_4month && true
                            }
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
                        readOnly={isAccepted}
                        render={({ field }) => (
                          <Input
                            {...field}
                            control={control}
                            readOnly={isAccepted}
                            name="credit_card_history[4].number_of_chargeback"
                            type="text"
                            invalid={
                              errors.Number_of_chargebacks_5month && true
                            }
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
                        readOnly={isAccepted}
                        render={({ field }) => (
                          <Input
                            {...field}
                            control={control}
                            readOnly={isAccepted}
                            name="credit_card_history[5].number_of_chargeback"
                            type="text"
                            invalid={
                              errors.Number_of_chargebacks_6month && true
                            }
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
                        readOnly={isAccepted}
                        render={({ field }) => (
                          <Input
                            {...field}
                            control={control}
                            readOnly={isAccepted}
                            name="credit_card_history[0].chargeback_volume"
                            type="text"
                            invalid={errors.Chargeback_volume_lastMonth && true}
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
                        readOnly={isAccepted}
                        render={({ field }) => (
                          <Input
                            {...field}
                            control={control}
                            readOnly={isAccepted}
                            name="credit_card_history[1].chargeback_volume"
                            type="text"
                            invalid={errors.Chargeback_volume_2month && true}
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
                        readOnly={isAccepted}
                        render={({ field }) => (
                          <Input
                            {...field}
                            control={control}
                            readOnly={isAccepted}
                            name="credit_card_history[2].chargeback_volume"
                            type="text"
                            invalid={errors.Chargeback_volume_3month && true}
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
                        readOnly={isAccepted}
                        render={({ field }) => (
                          <Input
                            {...field}
                            control={control}
                            readOnly={isAccepted}
                            name="credit_card_history[3].chargeback_volume"
                            type="text"
                            invalid={errors.Chargeback_volume_4month && true}
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
                        readOnly={isAccepted}
                        render={({ field }) => (
                          <Input
                            {...field}
                            control={control}
                            readOnly={isAccepted}
                            name="credit_card_history[4].chargeback_volume"
                            type="text"
                            invalid={errors.Chargeback_volume_5month && true}
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
                        readOnly={isAccepted}
                        render={({ field }) => (
                          <Input
                            {...field}
                            control={control}
                            readOnly={isAccepted}
                            name="credit_card_history[5].chargeback_volume"
                            type="text"
                            invalid={errors.Chargeback_volume_6month && true}
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
                        readOnly={isAccepted}
                        render={({ field }) => (
                          <Input
                            {...field}
                            control={control}
                            readOnly={isAccepted}
                            name="credit_card_history[0].number_of_refunds"
                            type="text"
                            invalid={errors.Number_of_refunds_lastMonth && true}
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
                        readOnly={isAccepted}
                        render={({ field }) => (
                          <Input
                            {...field}
                            control={control}
                            readOnly={isAccepted}
                            name="credit_card_history[1].number_of_refunds"
                            type="text"
                            invalid={errors.Number_of_refunds_2month && true}
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
                        readOnly={isAccepted}
                        render={({ field }) => (
                          <Input
                            {...field}
                            control={control}
                            readOnly={isAccepted}
                            name="credit_card_history[2].number_of_refunds"
                            type="text"
                            invalid={errors.Number_of_refunds_3month && true}
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
                        readOnly={isAccepted}
                        render={({ field }) => (
                          <Input
                            {...field}
                            control={control}
                            readOnly={isAccepted}
                            name="credit_card_history[3].number_of_refunds"
                            type="text"
                            invalid={errors.Number_of_refunds_4month && true}
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
                        readOnly={isAccepted}
                        render={({ field }) => (
                          <Input
                            {...field}
                            control={control}
                            readOnly={isAccepted}
                            name="credit_card_history[4].number_of_refunds"
                            type="text"
                            invalid={errors.Number_of_refunds_5month && true}
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
                        readOnly={isAccepted}
                        render={({ field }) => (
                          <Input
                            {...field}
                            control={control}
                            readOnly={isAccepted}
                            name="credit_card_history[5].number_of_refunds"
                            type="text"
                            invalid={errors.Number_of_refunds_6month && true}
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
                        readOnly={isAccepted}
                        render={({ field }) => (
                          <Input
                            {...field}
                            control={control}
                            readOnly={isAccepted}
                            name="credit_card_history[0].refund_volume"
                            type="text"
                            invalid={errors.Refund_volume_lastMonth && true}
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
                        readOnly={isAccepted}
                        render={({ field }) => (
                          <Input
                            {...field}
                            control={control}
                            readOnly={isAccepted}
                            name="credit_card_history[1].refund_volume"
                            type="text"
                            invalid={errors.Refund_volume_2month && true}
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
                        readOnly={isAccepted}
                        render={({ field }) => (
                          <Input
                            {...field}
                            control={control}
                            readOnly={isAccepted}
                            name="credit_card_history[2].refund_volume"
                            type="text"
                            invalid={errors.Refund_volume_3month && true}
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
                        readOnly={isAccepted}
                        render={({ field }) => (
                          <Input
                            {...field}
                            control={control}
                            readOnly={isAccepted}
                            name="credit_card_history[3].refund_volume"
                            type="text"
                            invalid={errors.Refund_volume_4month && true}
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
                        readOnly={isAccepted}
                        render={({ field }) => (
                          <Input
                            {...field}
                            control={control}
                            readOnly={isAccepted}
                            name="credit_card_history[4].refund_volume"
                            type="text"
                            invalid={errors.Refund_volume_5month && true}
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
                        readOnly={isAccepted}
                        render={({ field }) => (
                          <Input
                            {...field}
                            control={control}
                            readOnly={isAccepted}
                            name="credit_card_history[5].refund_volume"
                            type="text"
                            invalid={errors.Refund_volume_6month && true}
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
            <div className="col-md-6 col-sm-12">
              <Label>Current/previous Payment Service Provider / gateway</Label>
              <Controller
                id="previous_payment_service_provider"
                name="previous_payment_service_provider"
                control={control}
                readOnly={isAccepted}
                render={({ field }) => (
                  <Input
                    {...field}
                    readOnly={isAccepted}
                    type="textarea"
                    invalid={errors.previous_payment_service_provider && true}
                    onChange={(e) => {
                      checkCharLength(e.target.value, 20, field.name);
                      field.onChange(e.target.value);
                    }}
                  />
                )}
              />
              {errors.previous_payment_service_provider ? (
                <FormFeedback>
                  {errors.previous_payment_service_provider.message}
                </FormFeedback>
              ) : null}
            </div>
            <div className="col-md-6 col-sm-12">
              <Label>Current/previous acquirer</Label>
              <Controller
                id="previous_acquirer"
                name="previous_acquirer"
                control={control}
                readOnly={isAccepted}
                render={({ field }) => (
                  <Input
                    {...field}
                    readOnly={isAccepted}
                    type="text"
                    invalid={errors.previous_acquirer && true}
                    onChange={(e) => {
                      checkCharLength(e.target.value, 20, field.name);
                      field.onChange(e.target.value);
                    }}
                  />
                )}
              />
              {errors.previous_acquirer ? (
                <FormFeedback>{errors.previous_acquirer.message}</FormFeedback>
              ) : null}
            </div>
            <div className="col-md-6 col-sm-12">
              <Label>Reason for leaving current acquirer</Label>
              <Controller
                id="leaving_current_acquirer"
                name="leaving_current_acquirer"
                control={control}
                readOnly={isAccepted}
                render={({ field }) => (
                  <Input
                    {...field}
                    readOnly={isAccepted}
                    type="text"
                    invalid={errors.leaving_current_acquirer && true}
                    onChange={(e) => {
                      checkCharLength(e.target.value, 20, field.name);
                      field.onChange(e.target.value);
                    }}
                  />
                )}
              />
              {errors.leaving_current_acquirer ? (
                <FormFeedback>
                  {errors.leaving_current_acquirer.message}
                </FormFeedback>
              ) : null}
            </div>
            <div className="col-md-6 col-sm-12">
              <Label className="form-label" htmlFor="monthly_sales_volume">
                Estimated monthly sales volume
              </Label>

              <Controller
                id="monthly_sales_volume"
                name="monthly_sales_volume"
                control={control}
                readOnly={isAccepted}
                render={({ field }) => (
                  <Input
                    {...field}
                    control={control}
                    readOnly={isAccepted}
                    type="number"
                    invalid={errors.monthly_sales_volume && true}
                    onChange={(e) => {
                      checkCharLength(e.target.value, 5, field.name);
                      field.onChange(e.target.value);
                    }}
                  />
                )}
              />
              {errors.monthly_sales_volume ? (
                <FormFeedback>
                  {errors.monthly_sales_volume.message}
                </FormFeedback>
              ) : null}
            </div>
            <div className="col-md-6 col-sm-12">
              <Label className="form-label" htmlFor="avg_transaction_value">
                Average transaction value
              </Label>
              <Controller
                id="avg_transaction_value"
                name="avg_transaction_value"
                control={control}
                readOnly={isAccepted}
                render={({ field }) => (
                  <Input
                    {...field}
                    control={control}
                    readOnly={isAccepted}
                    name="avg_transaction_value"
                    type="number"
                    invalid={errors.avg_transaction_value && true}
                    onChange={(e) => {
                      checkCharLength(e.target.value, 5, field.name);
                      field.onChange(e.target.value);
                    }}
                  />
                )}
              />
              {errors.avg_transaction_value ? (
                <FormFeedback>
                  {errors.avg_transaction_value.message}
                </FormFeedback>
              ) : null}
            </div>
            <div
              id="Highest_transaction_value"
              className="col-md-6 col-sm-12 mt-1"
            >
              <Label className="form-label" htmlFor="highest_transaction_value">
                Highest transaction value
              </Label>

              <Controller
                id="highest_transaction_value"
                name="highest_transaction_value"
                control={control}
                readOnly={isAccepted}
                render={({ field }) => (
                  <Input
                    {...field}
                    control={control}
                    readOnly={isAccepted}
                    name="highest_transaction_value"
                    type="number"
                    invalid={errors.highest_transaction_value && true}
                    onChange={(e) => {
                      checkCharLength(e.target.value, 5, field.name);
                      field.onChange(e.target.value);
                    }}
                  />
                )}
              />
              {errors.highest_transaction_value ? (
                <FormFeedback>
                  {errors.highest_transaction_value.message}
                </FormFeedback>
              ) : null}
            </div>
            <div id="currncy" className="col-md-6 col-sm-12 mt-1">
              <Label className="currencu" htmlFor="currency">
                Currency
              </Label>

              <Controller
                id="currency"
                name="currency"
                control={control}
                readOnly={isAccepted}
                render={({ field }) => (
                  <Input
                    {...field}
                    control={control}
                    readOnly={isAccepted}
                    name="currency"
                    type="select"
                    invalid={errors.currency && true}
                  >
                    <option>---select---</option>
                    {currencyList}
                  </Input>
                )}
              />
            </div>
            <div
              className={`container-none mt-3 p-2 ${
                transition ? "border-danger" : "border"
              }`}
            >
              <h5
                className={`text-danger ${transition ? "d-block" : "d-none"}`}
              >
                Total should equal 100%
              </h5>
              <h4 htmlFor="Highest_transaction_value">
                Origin of transactions
              </h4>
              <p>(where do cardholders come from) (total should equal 100%)</p>
              <div className="row g-1 ">
                <div className="col-sm-3">
                  <Controller
                    id="domestic"
                    name="domestic"
                    control={control}
                    readOnly={isAccepted}
                    render={({ field }) => (
                      <Input
                        {...field}
                        readOnly={isAccepted}
                        type="number"
                        placeholder="%"
                        invalid={errors.domestic && true}
                        onChange={(e) => {
                          setDemositicTransition(parseInt(e.target.value));
                          field.onChange(e.target.value);
                        }}
                      />
                    )}
                  />
                  <Label>Domestic </Label>
                </div>
                <div className="col-sm-3">
                  <Controller
                    id="europe"
                    name="europe"
                    control={control}
                    readOnly={isAccepted}
                    render={({ field }) => (
                      <Input
                        {...field}
                        control={control}
                        readOnly={isAccepted}
                        name="europe"
                        type="number"
                        placeholder="%"
                        invalid={errors.europe && true}
                        onChange={(e) => {
                          setEuropeTransition(parseInt(e.target.value));
                          field.onChange(e.target.value);
                        }}
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
                    readOnly={isAccepted}
                    render={({ field }) => (
                      <Input
                        {...field}
                        control={control}
                        readOnly={isAccepted}
                        name="usa"
                        type="number"
                        placeholder="%"
                        invalid={errors.usa && true}
                        onChange={(e) => {
                          setUsaTransition(parseInt(e.target.value));
                          field.onChange(e.target.value);
                        }}
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
                    readOnly={isAccepted}
                    render={({ field }) => (
                      <Input
                        {...field}
                        control={control}
                        readOnly={isAccepted}
                        name="asia"
                        type="number"
                        placeholder="%"
                        invalid={errors.asia && true}
                        onChange={(e) => {
                          setAsiaTransition(parseInt(e.target.value));
                          field.onChange(e.target.value);
                        }}
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
                    readOnly={isAccepted}
                    render={({ field }) => (
                      <Input
                        {...field}
                        control={control}
                        readOnly={isAccepted}
                        name="rest_of_world"
                        type="number"
                        placeholder="%"
                        invalid={errors.rest_of_world && true}
                        onChange={(e) => {
                          setRestTransition(parseInt(e.target.value));
                          field.onChange(e.target.value);
                        }}
                      />
                    )}
                  />
                  <p>Rest of world</p>
                </div>
              </div>
            </div>

            <div className="mt-4 mb-2 border p-2">
              <Row className="g-1">
                <h5>Card types applying for</h5>
                {cardType &&
                  cardType.map((i, id) => {
                    // let data = defaultData?.card_type;
                    // if (data?.length > 0) {
                    //   const index = res.id;
                    //   const x = document.getElementById(`card_types_${i.id}`);
                    //   if (data) {
                    //     for (let i = 0; i < data.length; i++) {
                    //       if (x !== null && data[i] === index) {
                    //         x.setAttribute("checked", true);
                    //         break;
                    //       }
                    //     }
                    //   }
                    // }
                    return (
                      <Col md={3} sm={12} key={id}>
                        <Input
                          id={`card_types_${i.id}`}
                          type="checkbox"
                          name={i.card_type}
                          onChange={(e) => handleChangeboxes(e, i.id)}
                          // selected={selectedCheckboxes.includes(id)}
                          // checked={selectedCheckboxes.includes(id+1)}
                        />
                        <Label className="ms-1">{i.card_type}</Label>
                      </Col>
                    );
                  })}

                <Col md={3} sm={12} className="d-flex ">
                  <div className="d-flex align-items-center me-1">
                    <Label>specify</Label>
                  </div>
                  <Controller
                    id="other_detail"
                    name="other_detail"
                    control={control}
                    readOnly={isAccepted}
                    render={({ field }) => (
                      <Input
                        {...field}
                        control={control}
                        readOnly={isAccepted}
                        name="other_detail"
                        placeholder="if other pleas Explain"
                        invalid={errors.other_detail && true}
                        type="text"
                      />
                    )}
                  />
                </Col>
              </Row>
            </div>
            {/* <div id="Method_Acceptance" className="col-12 mt-1 border p-1 mb-3"> */}
            <div
              id="Method_Acceptance"
              className={`col-12 mt-1 border p-1 mb-3 ${
                method ? "border-danger" : "border"
              }`}
            >
              <h5
                className={`text-danger fw-bold ${
                  method ? "d-block" : "d-none"
                }`}
              >
                (total should equal 100%)
              </h5>
              <div className="container-none">
                <h4 htmlFor="Method_Acceptance">Method of acceptance.</h4>
                <p>(total should equal 100%)</p>
                <div className="row g-1 ">
                  <div className="col-sm-3">
                    <Controller
                      id="e_commerce"
                      name="e_commerce"
                      control={control}
                      readOnly={isAccepted}
                      render={({ field }) => (
                        <Input
                          {...field}
                          control={control}
                          readOnly={isAccepted}
                          name="e_commerce"
                          type="number"
                          placeholder="%"
                          invalid={errors.e_commerce && true}
                          onChange={(e) => {
                            setEC(parseInt(e.target.value));
                            field.onChange(e.target.value);
                          }}
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
                      readOnly={isAccepted}
                      render={({ field }) => (
                        <Input
                          {...field}
                          control={control}
                          readOnly={isAccepted}
                          name="card_present"
                          type="number"
                          placeholder="%"
                          invalid={errors.card_present && true}
                          onChange={(e) => {
                            setPOS(parseInt(e.target.value));
                            field.onChange(e.target.value);
                          }}
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
                      readOnly={isAccepted}
                      render={({ field }) => (
                        <Input
                          {...field}
                          control={control}
                          readOnly={isAccepted}
                          name="m_pos"
                          type="number"
                          placeholder="%"
                          invalid={errors.m_pos && true}
                          onChange={(e) => {
                            setMPOS(parseInt(e.target.value));
                            field.onChange(e.target.value);
                          }}
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
                      readOnly={isAccepted}
                      render={({ field }) => (
                        <Input
                          {...field}
                          control={control}
                          readOnly={isAccepted}
                          name="m_commerce"
                          type="number"
                          placeholder="%"
                          invalid={errors.m_commerce && true}
                          onChange={(e) => {
                            setMP(parseInt(e.target.value));
                            field.onChange(e.target.value);
                          }}
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
                      readOnly={isAccepted}
                      render={({ field }) => (
                        <Input
                          {...field}
                          control={control}
                          readOnly={isAccepted}
                          name="moto"
                          type="number"
                          placeholder="%"
                          invalid={errors.moto && true}
                          onChange={(e) => {
                            setMTO(parseInt(e.target.value));
                            field.onChange(e.target.value);
                          }}
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
                      readOnly={isAccepted}
                      render={({ field }) => (
                        <Input
                          {...field}
                          control={control}
                          readOnly={isAccepted}
                          name="in_app_commerce"
                          type="number"
                          placeholder="%"
                          invalid={errors.in_app_commerce && true}
                          onChange={(e) => {
                            setIAC(parseInt(e.target.value));
                            field.onChange(e.target.value);
                          }}
                        />
                      )}
                    />
                    <p>In-App commerce</p>
                  </div>
                </div>
              </div>
            </div>
            <div id="Payment_place" className="col-12 p-1 border">
              <h4>When does payment take place?</h4>

              <Row md="3" sm="2" xs="1">
                <Col className="  mb-1">
                  <Label>Upon purchase</Label>
                  <Controller
                    id="upon_purchase"
                    name="upon_purchase"
                    control={control}
                    readOnly={isAccepted}
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
                            disabled={isAccepted}
                          />
                          {boolean(value)}
                        </div>
                      );
                    }}
                  />
                </Col>
                <Col className="  mb-1">
                  <Label>With download</Label>
                  <Controller
                    id="with_download"
                    name="with_download"
                    control={control}
                    readOnly={isAccepted}
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
                            disabled={isAccepted}
                            checked={value}
                          />
                          {boolean(value)}
                        </div>
                      );
                    }}
                  />
                </Col>
                <Col className="  mb-1">
                  <Label>On delivery</Label>
                  <Controller
                    id="on_delivery"
                    name="on_delivery"
                    control={control}
                    readOnly={isAccepted}
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
                            disabled={isAccepted}
                            checked={value}
                          />
                          {boolean(value)}
                        </div>
                      );
                    }}
                  />
                </Col>
                <Col className="  mb-1">
                  <Label>Other</Label>
                  <Controller
                    id="others"
                    name="others"
                    control={control}
                    readOnly={isAccepted}
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
                            disabled={isAccepted}
                            checked={value}
                          />
                          {boolean(value)}
                        </div>
                      );
                    }}
                  />
                </Col>
                <Col
                  className={`  mb-1 ${otherTakePlace ? "d-block" : "d-none"}`}
                >
                  <Label>Explain</Label>
                  <Controller
                    id="other_detail"
                    name="other_detail"
                    control={control}
                    readOnly={isAccepted}
                    render={({ field }) => (
                      <div className="mb-1">
                        <Input
                          {...field}
                          control={control}
                          readOnly={isAccepted}
                          name="other_detail"
                          placeholder="if other specify"
                          invalid={errors.other_detail && true}
                          type="text"
                          onChange={(e) => {
                            checkCharLength(e.target.value, 20, field.name);
                            field.onChange(e.target.value);
                          }}
                        />
                        {errors.other_detail ? (
                          <FormFeedback>
                            {errors.other_detail.message}
                          </FormFeedback>
                        ) : null}
                      </div>
                    )}
                  />
                </Col>
              </Row>
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
                      readOnly={isAccepted}
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
                              {...field}
                              control={control}
                              readOnly={isAccepted}
                              name="one_time_payment"
                              invalid={errors.one_time_payment && true}
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
                    <Controller
                      id="recurring_payment"
                      name="recurring_payment"
                      control={control}
                      readOnly={isAccepted}
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
                              {...field}
                              control={control}
                              readOnly={isAccepted}
                              name="recurring_payment"
                              invalid={errors.recurring_payment && true}
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
              className={`col-12  mt-2 mb-2 pt-2 pb-2 ${
                delivery ? "border-danger" : "border"
              }`}
            >
              <div className="container-none">
                <h5
                  className={`text-danger ${delivery ? "d-block" : "d-none"}`}
                >
                  total should equal 100%
                </h5>
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
                      readOnly={isAccepted}
                      render={({ field }) => (
                        <Input
                          {...field}
                          control={control}
                          readOnly={isAccepted}
                          name="immediately"
                          type="text"
                          placeholder="%"
                          invalid={errors.immediately && true}
                          onChange={(e) => {
                            setImmediately(parseInt(e.target.value));
                            field.onChange(e.target.value);
                          }}
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
                      readOnly={isAccepted}
                      render={({ field }) => (
                        <Input
                          {...field}
                          control={control}
                          readOnly={isAccepted}
                          name="within_four_weeks"
                          type="text"
                          placeholder="%"
                          invalid={errors.within_four_weeks && true}
                          onChange={(e) => {
                            setF_week(parseInt(e.target.value));
                            field.onChange(e.target.value);
                          }}
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
                      readOnly={isAccepted}
                      render={({ field }) => (
                        <Input
                          {...field}
                          control={control}
                          readOnly={isAccepted}
                          name="within_5_14_weeks"
                          type="text"
                          placeholder="%"
                          invalid={errors.within_5_14_weeks && true}
                          onChange={(e) => {
                            setFf_week(parseInt(e.target.value));
                            field.onChange(e.target.value);
                          }}
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
                      readOnly={isAccepted}
                      render={({ field }) => (
                        <Input
                          {...field}
                          control={control}
                          readOnly={isAccepted}
                          name="more_than_14_weeks"
                          type="text"
                          placeholder="%"
                          invalid={errors.more_than_14_weeks && true}
                          onChange={(e) => {
                            setMoreWeek(parseInt(e.target.value));
                            field.onChange(e.target.value);
                          }}
                        />
                      )}
                    />
                    <p>More than 14 weeks</p>
                  </div>
                </div>
              </div>
            </div>
            <div id="delivery_time_for_good" className="col-12 mt-1">
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
                      readOnly={isAccepted}
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
                              disabled={isAccepted}
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
                        readOnly={isAccepted}
                        render={({ field }) => (
                          <>
                            <Input
                              control={control}
                              readOnly={isAccepted}
                              name="provide_details"
                              type="text"
                              invalid={errors.provide_details && true}
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
      </Form>
    </Card>
  );
};
export default BusinessProfile;
