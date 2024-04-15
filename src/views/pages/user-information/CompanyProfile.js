import { useState, useEffect } from "react";
import { Label, Button, Form, Input, FormGroup } from "reactstrap";
import country_code from "../../../country_code.json";
import useJwt from "@src/dashboard/jwt/useJwt";
import { Controller, useForm } from "react-hook-form";


const CompanyProfile = ({ stepper, counter, setCounter }) => {
  const date = new Date().getFullYear();
  const [defaultData, setDefaultData] = useState();
  const [showParent, setShowparent] = useState(false);
  const [billAdress, setBillAdresss] = useState(false);
  const [billingData, setBillingData] = useState({
    streetaddress: "",
    housenumber: "",
    zipcode: "",
    city: "",
    state: "",
    country: "",
  });

  const {
    control,
    setError,
    reset,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ defaultValues: defaultData });

  useEffect(() => {
    useJwt.getcompanyprofile().then((res) => {
      if (res.status === 200 && res.data.length > 0) {
        localStorage.setItem("application_id", res.data[0].application.uid);
        setDefaultData({ ...res.data[0] });
        reset(res.data[0]);
      }
    });
  }, [reset, counter]);

  // useEffect(()=>{
  //   if(uid != undefined){
  //   useJwt.companyprofileQuery(uid).then((res)=>{
  //     if(res.status === 206){
  //       res.data.cp.map((fields, idx)=>{
  //         setError(fields,)
  //       })
  //     }
  //   })
  // }
  // },[uid])


  const creatYearArr = (arr) => {
    for (let i = 1900; i <= date; i++) {
      arr.push(i);
    }
    return arr;
  };
  const yearlist = creatYearArr([]);
  const Year = yearlist.map((e, i) => {
    return <option key={i}>{e}</option>;
  });
  // title array
  const title = ["---Select Option---", "Mr", "Mrs", "Miss", "Ms", "Dr"];
  // aboutLocktrust array
  const lockTrustAbout = [
    "---Choose one---",
    "Daily newspaper",
    "IT magazine",
    "Business magazine",
    "Consumer magazine",
    "Internet",
    "UK Online for Business",
    "Business Link /  Chamber of  Commerce",
  ];
  const typeCompanyList = [
    "---Choose one---",
    "Registered Charity",
    "Non-profit organisation",
    "Limited Company",
    "Public Limited Company",
    "Sole Trader",
    "Partnership",
    "Other",
  ];

  // aboutLocktrust select
  const aboutLocktrustfunc = lockTrustAbout.map((e, i) => {
    return <option key={i}>{e}</option>;
  });
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
  // paid currency function
  const currencyList = paidCurrencyList.map((e, i) => {
    return <option key={i}>{e}</option>;
  });
  
  //select country function
  const country = country_code.map((e, i) => {
    return <option key={i}>{e.name}</option>;
  });

  const yearList = () => {
    let yearStore = [];
    for (let i = 1900; i <= year; i++) {
      yearStore.push(<option>{i}</option>);
    }
    return yearStore;
  };


  const red = {
    color: "red",
  };
  const ScrollToTop = () => {
    return window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const onSubmit = (data) => {
    if (!showParent) delete data["parent_company_detail"];
    if (!billAdress) {
      data.billing_street_address = data.registered_street_address;
      data.billing_house_no = data.house_number;
      data.billing_post_code = "";
      data.billing_city = data.city;
      data.billing_state = data.state;
      data.billing_country = data.country;
    }
    if (!data?.uid) {
      useJwt
        .companyprofile(data)
        .then((res) => {
          if (res?.status === 201) {
            localStorage.setItem("application_id", res?.data?.application?.uid);
            stepper.next();
            setCounter(counter + 1);
            ScrollToTop();
          }
        })
    } else {
      data.application_id = localStorage.getItem("application_id");
      useJwt
        .putcompanyprofile(data.uid, data)
        .then((res) => {
          if (res?.status === 200) {
            window.scrollTo({ top: 0, behavior: "smooth" });
            stepper.next();
            setCounter(counter + 1);
          }
        })
        .catch((err) => console.log(err?.massege));
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-center mb-3">
        <h1 className="text-primary " style={{ fontWeight: "bold" }}>
          Company Profile
        </h1>
      </div>
      <Form className="container-None" onSubmit={handleSubmit(onSubmit)}>
        <h4 className="" style={{ fontWeight: "bold" }}>
          Answering the following questions will help us process your
          application. We'll also know how to contact you should you need any
          help.
        </h4>
        <div hidden>
          <Controller
            id="uid"
            name="uid"
            control={control}
            render={({ field }) => {
              return (
                <Input
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
        <div
          className="row"
          style={{ display: "flex", alignItems: "baseline" }}
        >
          <div className="mt-3 mb-2">
            <Label className="form-label" for="having_parent_company">
              Is Applying Company owned by a Parent Company?
            </Label>
            <br />
            <Controller
              id="having_parent_company"
              name="having_parent_company"
              control={control}
              render={({ field: { value, onChange } }) => {
                if (value == true) {
                  setShowparent(true);
                } else {
                  setShowparent(false);
                }
                return (
                  <div className="form-switch form-check-primary">
                    <Input
                      type="switch"
                      name="icon-primary"
                      onChange={onChange}
                      checked={value}
                    />
                  </div>
                );
              }}
            />
          </div>
          <div className="id col-lg-6 mt-1 ">
            <Label className="form-label" for="company_registration_no">
              Company registration number?
              {showParent && <span>(Details of Applying Company)</span>}
            </Label>
            <Controller
              id="company_registration_no"
              name="company_registration_no"
              control={control}
              render={({ field }) => {
                return (
                  <Input
                    control={control}
                    name="company_registration_no"
                    type="number"
                    invalid={errors.company_registration_no && true}
                    {...field}
                    required
                  ></Input>
                );
              }}
            />
          </div>
          {showParent && (
            <div className="company_registration_no col-lg-6 mt-1  ">
              <Label className="form-label" for="company_registration_no">
                Company registration number?<span style={red}>*</span>
                {showParent && <span>(Details of Parent Company)</span>}
              </Label>
              <Controller
                id="company_registration_no"
                name="parent_company_detail.company_registration_no"
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      control={control}
                      name="parent_company_detail.company_registration_no"
                      type="number"
                      invalid={errors.company_registration_no && true}
                      {...field}
                    ></Input>
                  );
                }}
              />
            </div>
          )}

          <div className="legal_name_company col-lg-6 mt-1 ">
            <Label className="form-label" for="legal_company_name">
              Legal name of company?<span style={red}>*</span>
              {showParent && <span>(Details of Applying Company)</span>}
            </Label>
            <Controller
              id="legal_company_name"
              name="legal_company_name"
              control={control}
              render={({ field }) => (
                <Input
                  control={control}
                  name="legal_company_name"
                  type="text"
                  invalid={errors.legal_company_name && true}
                  {...field}
                ></Input>
              )}
            />
          </div>
          {showParent && (
            <div className="legal_name_company col-lg-6 mt-1">
              <Label className="form-label" for="legal_company_name">
                Legal name of company?<span style={red}>*</span>
                <span>(Details of Parent Company)</span>
              </Label>
              <Controller
                id="legal_company_name"
                name="parent_company_detail.legal_company_name"
                control={control}
                render={({ field }) => (
                  <Input
                    control={control}
                    name="parent_company_detail.legal_company_name"
                    type="text"
                    invalid={errors.legal_company_name && true}
                    {...field}
                  ></Input>
                )}
              />
            </div>
          )}

          <div className="Registered_DBA col-lg-6 mt-1 ">
            <Label className="form-label" for="About-registrationNumber">
              Registered DBA/trade name (if other than legal name)
              {showParent && <span>(Details of Applying Company)</span>}
            </Label>
            <Controller
              id="trade_name"
              name="trade_name"
              control={control}
              render={({ field }) => (
                <Input
                  control={control}
                  name="trade_name"
                  type="text"
                  invalid={errors.trade_name && true}
                  {...field}
                ></Input>
              )}
            />
          </div>
          {showParent && (
            <div className="Registered_DBA   col-lg-6 mt-1 ">
              <Label className="form-label" for="trade_name_p">
                Registered DBA/trade name (if other than legal name)
                {showParent && <span>(Details of Parent Company)</span>}
              </Label>
              <Controller
                id="trade_name"
                name="parent_company_detail.trade_name"
                control={control}
                render={({ field }) => (
                  <Input
                    control={control}
                    name="parent_company_detail.trade_name"
                    type="text"
                    invalid={errors.trade_name && true}
                    {...field}
                  ></Input>
                )}
              />
            </div>
          )}

          <div className="Type_of_business col-lg-6 mt-1 ">
            <Label className="form-label" for="business_type">
              Type of business
              {showParent && <span>(Details of Applying Company)</span>}
            </Label>
            <Controller
              id="business_type"
              name="business_type"
              control={control}
              render={({ field }) => (
                <Input
                  control={control}
                  name="business_type"
                  type="text"
                  invalid={errors.business_type && true}
                  {...field}
                ></Input>
              )}
            />
          </div>
          {showParent && (
            <div className="Type_of_business col-lg-6 mt-1 ">
              <Label className="form-label" for="business_type">
                Type of business
                {showParent && <span>(Details of Parent Company)</span>}
              </Label>
              <Controller
                id="business_type"
                name="parent_company_detail.business_type"
                control={control}
                render={({ field }) => (
                  <Input
                    control={control}
                    name="parent_company_detail.business_type"
                    type="text"
                    invalid={errors.business_type && true}
                    {...field}
                  ></Input>
                )}
              />
            </div>
          )}

          <div className="Registered_street_address col-lg-6 mt-1 ">
            <Label className="form-label" for="registered_street_address">
              Street address
              {showParent && <span>(Details of Applying Company)</span>}
            </Label>
            <Controller
              id="registered_street_address"
              name="registered_street_address"
              control={control}
              render={({ field }) => {
                return (
                  <Input
                    control={control}
                    name="registered_street_address"
                    type="text"
                    invalid={errors.registered_street_address && true}
                    {...field}
                  ></Input>
                );
              }}
            />
          </div>
          {showParent && (
            <div className="Registered_street_address col-lg-6 mt-1 ">
              <Label className="form-label" for="registered_street_address">
                Street address
                {showParent && <span>(Details of Parent Company)</span>}
              </Label>
              <Controller
                id="registered_street_address"
                name="parent_company_detail.registered_street_address"
                control={control}
                render={({ field }) => (
                  <Input
                    control={control}
                    name="parent_company_detail.registered_street_address"
                    type="text"
                    invalid={errors.registered_street_address && true}
                    {...field}
                  ></Input>
                )}
              />
            </div>
          )}

          <div className="House_number col-lg-6 mt-1 ">
            <Label className="form-label" for="house_number">
              Office / House number
              {showParent && <span>(Details of Applying Company)</span>}
            </Label>
            <Controller
              id="house_number"
              name="house_number"
              control={control}
              render={({ field }) => {
                return (
                  <Input
                    control={control}
                    name="house_number"
                    type="text"
                    invalid={errors.house_number && true}
                    {...field}
                  ></Input>
                );
              }}
            />
          </div>
          {showParent && (
            <div className="col-lg-6 mt-1 ">
              <Label className="form-label" for="house_number">
                Office / House number
                {showParent && <span>(Details of Parent Company)</span>}
              </Label>
              <Controller
                id="house_number"
                name="parent_company_detail.house_number"
                control={control}
                render={({ field }) => (
                  <Input
                    control={control}
                    name="parent_company_detail.house_number"
                    type="text"
                    invalid={errors.house_number && true}
                    {...field}
                  ></Input>
                )}
              />
            </div>
          )}

          <div className="Post_and_zip col-lg-6 mt-1 ">
            <Label className="form-label" for="zip_code">
              Postcode / zip code
              {showParent && <span>(Details of Applying Company)</span>}
            </Label>
            <Controller
              id="zip_code"
              name="zip_code"
              control={control}
              render={({ field }) => {
                return (
                  <Input
                    control={control}
                    name="zip_code"
                    type="text"
                    invalid={errors.zip_code && true}
                    {...field}
                  ></Input>
                );
              }}
            />
          </div>
          {showParent && (
            <div className="col-lg-6 mt-1 ">
              <Label className="form-label" for="zip_code">
                Postcode / zip code
                {showParent && <span>(Details of Parent Company)</span>}
              </Label>
              <Controller
                id="zip_code"
                name="parent_company_detail.zip_code"
                control={control}
                render={({ field }) => (
                  <Input
                    control={control}
                    name="parent_company_detail.zip_code"
                    type="text"
                    invalid={errors.zip_code && true}
                    {...field}
                  ></Input>
                )}
              />
            </div>
          )}

          <div className="City col-lg-6 mt-1 ">
            <Label className="form-label" for="city">
              City
              {showParent && <span>(Details of Applying Company)</span>}
            </Label>
            <Controller
              id="city"
              name="city"
              control={control}
              render={({ field }) => {
                return (
                  <Input
                    control={control}
                    name="city"
                    type="text"
                    invalid={errors.city && true}
                    {...field}
                  ></Input>
                );
              }}
            />
          </div>
          {showParent && (
            <div className="col-lg-6 mt-1 ">
              <Label className="form-label" for="city">
                City
                {showParent && <span>(Details of Parent Company)</span>}
              </Label>
              <Controller
                id="city"
                name="parent_company_detail.city"
                control={control}
                render={({ field }) => (
                  <Input
                    control={control}
                    name="city"
                    type="text"
                    invalid={errors.city && true}
                    {...field}
                  ></Input>
                )}
              />
            </div>
          )}

          <div className="col-lg-6">
            <Label className="form-label" for="state">
              State
              {showParent && <span>(Details of Applying Company)</span>}
            </Label>
            <Controller
              id="state"
              name="state"
              control={control}
              render={({ field }) => {
                return (
                  <Input
                    control={control}
                    name="state"
                    type="text"
                    invalid={errors.state && true}
                    {...field}
                  ></Input>
                );
              }}
            />
          </div>
          {showParent && (
            <div className="State col-lg-6">
              <Label className="form-label" for="state ">
                State
                {showParent && <span>(Details of Parent Company)</span>}
              </Label>
              <Controller
                id="state "
                name="parent_company_detail.state "
                control={control}
                render={({ field }) => (
                  <Input
                    control={control}
                    name="state "
                    type="text"
                    invalid={errors.state && true}
                    {...field}
                  ></Input>
                )}
              />
            </div>
          )}

          <div className="Country col-lg-6 mt-1 ">
            <Label className="form-label" for="country">
              Country
              {showParent && <span>(Details of Applying Company)</span>}
            </Label>
            <br />
            <Controller
              id="country"
              name="country"
              control={control}
              render={({ field }) => {
                return (
                  <Input
                    control={control}
                    name="country"
                    type="select"
                    invalid={errors.country && true}
                    {...field}
                  >
                    <option>Select Country</option>
                    {country}
                  </Input>
                );
              }}
            />
          </div>
          {showParent && (
            <div className="Country col-lg-6 mt-1 ">
              <Label className="form-label" for="country">
                Country
                {showParent && <span>(Details of Parent Company)</span>}
              </Label>
              <br />
              <Controller
                id="country"
                name="parent_company_detail.country"
                control={control}
                render={({ field }) => (
                  <Input
                    control={control}
                    name="parent_company_detail.country"
                    type="select"
                    invalid={errors.country && true}
                    {...field}
                  >
                    <option>Select Country</option>
                    {country}
                  </Input>
                )}
              />
            </div>
          )}

          <div className="Telephone col-lg-6 mt-1 ">
            <Label className="form-label" for="telephone_number">
              Telephone number<span style={red}>*</span>
              {showParent && <span>(Details of Applying Company)</span>}
            </Label>
            <Controller
              id="telephone_number"
              name="telephone_number"
              control={control}
              render={({ field }) => (
                <Input
                  control={control}
                  name="telephone_number"
                  type="text"
                  invalid={errors.telephone_number && true}
                  {...field}
                ></Input>
              )}
            />
          </div>
          {showParent && (
            <div className="Telephone-p col-lg-6 mt-1 ">
              <Label className="form-label" for="telephone_number ">
                Telephone number<span style={red}>*</span>
                {showParent && <span>(Details of Parent Company)</span>}
              </Label>
              <Controller
                id="telephone_number "
                name="parent_company_detail.telephone_number "
                control={control}
                render={({ field }) => (
                  <Input
                    control={control}
                    name="parent_company_detail.telephone_number "
                    type="text"
                    invalid={errors.telephone_number && true}
                    {...field}
                  ></Input>
                )}
              />
            </div>
          )}

          <div className="Fax col-lg-6 mt-1 ">
            <Label className="form-label" for="fax_number">
              Fax number<span style={red}>*</span>
              {showParent && <span>(Details of Applying Company)</span>}
            </Label>
            <Controller
              id="fax_number"
              name="fax_number"
              control={control}
              render={({ field }) => (
                <Input
                  control={control}
                  name="fax_number"
                  type="text"
                  invalid={errors.fax_number && true}
                  {...field}
                ></Input>
              )}
            />
          </div>
          {showParent && (
            <div className="Fax-p col-lg-6 mt-1 ">
              <Label className="form-label" for="fax_number ">
                Fax number<span style={red}>*</span>
                {showParent && <span>(Details of Parent Company)</span>}
              </Label>
              <Controller
                id="fax_number "
                name="parent_company_detail.fax_number "
                control={control}
                render={({ field }) => (
                  <Input
                    control={control}
                    name="fax_number "
                    type="text"
                    invalid={errors.fax_number && true}
                    {...field}
                  ></Input>
                )}
              />
            </div>
          )}

          <div id="DropYearMonth" className="Turnover_last_year col-lg-6 mt-1">
            <div className="container-none">
              <Label className="form-label" for="turnover_last_year mb-1">
                Turnover last year
                {showParent && <span>(Details of Applying Company)</span>}
              </Label>
              <div className="row g-2">
                <div className="col-6">
                  <div className="">
                    <Controller
                      id="turnover_last_year"
                      name="turnover_last_year"
                      control={control}
                      render={({ field }) => (
                        <Input
                          control={control}
                          name="turnover_last_year"
                          type="text"
                          invalid={errors.turnover_last_year && true}
                          {...field}
                        ></Input>
                      )}
                    />
                  </div>
                </div>
                <div className="col-6">
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
                        <option>---currency---</option>
                        {currencyList}
                      </Input>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
          {showParent && (
            <div
              id="DropYearMonth"
              className="Turnover_last_year  col-lg-6 mt-1"
            >
              <div className="container-none">
                <Label className="form-label" for="turnover_last_year  mb-1">
                  Turnover last year
                  {showParent && <p>(Details of Parent Company)</p>}
                </Label>
                <div className="row g-2">
                  <div className="col-6">
                    <div className="">
                      <Controller
                        id="turnover_last_year "
                        name="parent_company_detail.turnover_last_year "
                        control={control}
                        render={({ field }) => (
                          <Input
                            control={control}
                            name="parent_company_detail.turnover_last_year "
                            type="text"
                            invalid={errors.turnover_last_year && true}
                            {...field}
                          ></Input>
                        )}
                      />
                    </div>
                  </div>
                  <div className="col-6">
                    <Controller
                      id="currency "
                      name="parent_company_detail.currency "
                      control={control}
                      render={({ field }) => (
                        <Input
                          control={control}
                          name="currency "
                          type="select"
                          invalid={errors.currency && true}
                          {...field}
                        >
                          <option>---currency---</option>
                          {currencyList}
                        </Input>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className=" incorporation_date col-lg-6 mt-1 ">
            <Label className="form-label" for="incorporation_date">
              Incorporation Date<span style={red}>*</span>
              {showParent && <span>(Details of Applying Company)</span>}
            </Label>
            <Controller
              id="incorporation_date"
              name="incorporation_date"
              control={control}
              requird
              render={({ field }) => (
                <Input
                  control={control}
                  name="incorporation_date"
                  type="date"
                  invalid={errors.incorporation_date && true}
                  {...field}
                ></Input>
              )}
            />
          </div>
          {showParent && (
            <div className=" incorporation_date col-lg-6 mt-1 ">
              <Label className="form-label" for="incorporation_date">
                Incorporation Date<span style={red}>*</span>
                {showParent && <span>(Details of Parent Company)</span>}
              </Label>
              <Controller
                id="incorporation_date"
                name="parent_company_detail.incorporation_date"
                control={control}
                render={({ field }) => (
                  <Input
                    control={control}
                    name="parent_company_detail.incorporation_date"
                    type="date"
                    invalid={errors.incorporation_date && true}
                    {...field}
                  ></Input>
                )}
              />
            </div>
          )}

          <div className="VAT_Tax col-lg-6 mt-1 ">
            <Label className="form-label" for="tax_identification_number">
              VAT / Tax Identification number ³<span style={red}>*</span>
              {showParent && <span>(Details of Applying Company)</span>}
            </Label>
            <Controller
              id="tax_identification_number"
              name="tax_identification_number"
              control={control}
              render={({ field }) => (
                <Input
                  control={control}
                  name="tax_identification_number"
                  type="text"
                  invalid={errors.tax_identification_number && true}
                  {...field}
                ></Input>
              )}
            />
          </div>
          {showParent && (
            <div className=" VAT_Tax  col-lg-6 mt-1 ">
              <Label className="form-label" for="tax_identification_number ">
                VAT / Tax Identification number ³<span style={red}>*</span>
                {showParent && <span>(Details of Parent Company)</span>}
              </Label>
              <Controller
                id="tax_identification_number "
                name="parent_company_detail.tax_identification_number "
                control={control}
                render={({ field }) => (
                  <Input
                    control={control}
                    name="parent_company_detail.tax_identification_number "
                    type="text"
                    invalid={errors.tax_identification_number && true}
                    {...field}
                  ></Input>
                )}
              />
            </div>
          )}

          <div className="listed_on_stock col-lg-6 mt-1 ">
            <Label className="form-label" for="stock_exchange">
              Is company publicly listed on a stock exchange?
              {showParent && <span>(Details of Applying Company)</span>}
            </Label>
            <br />
            <Controller
              id="stock_exchange"
              name="stock_exchange"
              control={control}
              render={({ field: { value, onChange } }) => {
                return (
                  <div className="form-switch form-check-primary">
                    <Input
                      type="switch"
                      name="icon-primary"
                      onChange={onChange}
                      checked={value}
                    />
                  </div>
                );
              }}
            />
          </div>
          {showParent && (
            <div className="listed_on_stock  col-lg-6 mt-1 ">
              <Label className="form-label" for="stock_exchange">
                Is company publicly listed on a stock exchange?<br></br>
                <span>(Details of Parent Company)</span>
              </Label>
              <br />
              <Controller
                id="parent_company_detail.stock_exchange"
                name="parent_company_detail.stock_exchange"
                control={control}
                render={({ field: { value, onChange } }) => {
                  return (
                    <div className="form-switch form-check-primary">
                      <Input
                        type="switch"
                        name="icon-primary"
                        onChange={onChange}
                        checked={value}
                      />
                    </div>
                  );
                }}
              />
            </div>
          )}

          <div className="company_registered_organization col-lg-6 mt-1 ">
            <Label className="form-label" for="not_for_profit">
              Is company a registered ‘not-for-profit’ organization?
              {showParent && <span>(Details of Applying Company)</span>}
            </Label>
            <br />
            <Controller
              id="not_for_profit"
              name="not_for_profit"
              control={control}
              render={({ field: { value, onChange } }) => {
                return (
                  <div className="form-switch form-check-primary">
                    <Input
                      type="switch"
                      name="icon-primary"
                      onChange={onChange}
                      checked={value}
                    />
                  </div>
                );
              }}
            />
          </div>
          {showParent && (
            <div className="company_registered_organization col-lg-6 mt-1 ">
              <Label className="form-label" for="not_for_profit  ">
                Is company a registered ‘not-for-profit’ organization?
                {showParent && <span>(Details of Parent Company)</span>}
              </Label>
              <br />
              {/* <Controller
              id="not_for_profit  "
              name="parent_company_detail.not_for_profit "
              control={control}
              render={({ field }) => (
                <div
                  control={control}
                  name="not_for_profit  "
                  invalid={errors.not_for_profit && true}
                  {...field}
                >
                  <Input type="radio" value="Yes" name="not_for_profit  " />
                  Yes <Input type="radio" value="No" name="not_for_profit  " />
                  No
                </div>
              )}
            /> */}
              <Controller
                id="parent_company_detail.not_for_profit"
                name="parent_company_detail.not_for_profit"
                control={control}
                render={({ field: { value, onChange } }) => {
                  return (
                    <div className="form-switch form-check-primary">
                      <Input
                        type="switch"
                        name="icon-primary"
                        onChange={onChange}
                        checked={value}
                      />
                    </div>
                  );
                }}
              />
            </div>
          )}

          <div className="Billing col-lg-6 mt-1 ">
            <Label className="form-label" for="billing_registered_address">
              Is billing address different from registered address?
            </Label>
            <br />
            <Controller
              id="billing_registered_address"
              name="billing_registered_address"
              control={control}
              render={({ field: { value, onChange } }) => {
                if (value === true) {
                  setBillAdresss(true);
                } else {
                  setBillAdresss(false);
                }
                return (
                  <div className="form-switch form-check-primary">
                    <Input
                      type="switch"
                      name="icon-primary"
                      onChange={onChange}
                      checked={value}
                    />
                  </div>
                );
              }}
            />
          </div>
          {billAdress && (
            <div className="container-none pt-2 mt-2">
              <div
                className="row bg-light p-1 gy-1 gx-1"
                style={{
                  boxShadow:
                    " rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
                }}
              >
                <Label>
                  <h4>BILLING ADDRESS</h4>
                </Label>
                <div className="col-sm-6">
                  <Label className="form-label" for="billing_street_address">
                    Street address<span style={red}>*</span>
                  </Label>
                  <Controller
                    id="billing_street_address"
                    name="billing_street_address"
                    control={control}
                    render={({ field }) => {
                      return (
                        <Input
                          control={control}
                          name="billing_street_address"
                          type="text"
                          invalid={errors.billing_street_address && true}
                          {...field}
                        ></Input>
                      );
                    }}
                  />
                </div>
                <div className="col-sm-6">
                  <Label className="form-label" for="billing_house_no">
                    Office / House number<span style={red}>*</span>
                  </Label>
                  <Controller
                    id="billing_house_no"
                    name="billing_house_no"
                    control={control}
                    render={({ field }) => (
                      <Input
                        control={control}
                        name="billing_house_no"
                        type="text"
                        invalid={errors.billing_house_no && true}
                        {...field}
                      ></Input>
                    )}
                  />
                </div>
                <div className="col-sm-6">
                  <Label className="form-label" for="billing_post_code">
                    Postcode / zip code<span style={red}>*</span>
                  </Label>
                  <Controller
                    id="billing_post_code"
                    name="billing_post_code"
                    control={control}
                    render={({ field }) => (
                      <Input
                        control={control}
                        name="billing_post_code"
                        type="text"
                        invalid={errors.billing_post_code && true}
                        {...field}
                      ></Input>
                    )}
                  />
                </div>
                <div className="col-sm-6">
                  <Label className="form-label" for="billing_city">
                    City<span style={red}>*</span>
                  </Label>
                  <Controller
                    id="billing_city"
                    name="billing_city"
                    control={control}
                    render={({ field }) => (
                      <Input
                        control={control}
                        name="billing_city"
                        type="text"
                        invalid={errors.billing_city && true}
                        {...field}
                      ></Input>
                    )}
                  />
                </div>
                <div className="col-sm-6">
                  <Label className="form-label" for="billing_state">
                    State
                  </Label>
                  <Controller
                    id="billing_state"
                    name="billing_state"
                    control={control}
                    render={({ field }) => (
                      <Input
                        control={control}
                        name="billing_state"
                        type="text"
                        invalid={errors.billing_state && true}
                        {...field}
                      ></Input>
                    )}
                  />
                </div>
                <div className="col-lg-6 mt-1 ">
                  <Label className="form-label" for="billing_country">
                    Country
                  </Label>
                  <br />
                  <Controller
                    id="billing_country"
                    name="billing_country"
                    control={control}
                    render={({ field }) => (
                      <Input
                        control={control}
                        name="billing_country"
                        type="select"
                        invalid={errors.billing_country && true}
                        {...field}
                      >
                        <option>Select Country</option>
                        {country}
                      </Input>
                    )}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="d-flex justify-content-end mt-1">
         <Button type="submit" color="primary" >
             Next
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CompanyProfile;

/*
    "billing_registered_address": true,
    "billing_street_address": "Rushiraj House, college road, Nashik",
    "billing_house_no": "201",
    "billing_post_code": "420003",
    "billing_city": "Nashik",
    "billing_state": "Maharashtra",
    "billing_country": "India"
*/
