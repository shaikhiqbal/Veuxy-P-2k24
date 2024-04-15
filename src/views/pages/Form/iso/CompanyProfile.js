import React, { useEffect, useState } from "react";

import Form from "../../../components/application-7forms/company-profile/CompanyProfile";

import useJwt from "@src/dashboard/jwt/useJwt";

const defaultValue = {
  company_registration_no: "",
  legal_company_name: "",
  trade_name: "",
  business_type: "",
  registered_street_address: "",
  house_number: "",
  zip_code: "",
  city: "",
  state: "",
  country: "",
  telephone_number: "",
  fax_number: "",
  turnover_last_year: "",
  incorporation_date: "",
  tax_identification_number: "",
  stock_exchange: "",
  not_for_profit: "",
  billing_registered_address: "",
  billing_street_address: "",
  billing_house_no: "",
  billing_post_code: "",
  billing_city: "",
  billing_state: "",
  billing_country: "",
};

const CompanyProfile = ({ next, previous, id }) => {
  const [defaultData, setDefaultData] = useState({ ...defaultValue });
  const [loader, setLoader] = useState(false);

  function creatData(data = {}) {
    return new Promise((resolve, reject) => {
      useJwt
        .companyprofile({ ...data })
        .then((res) => {
          if (res.status === 201) resolve(res);
        })
        .catch((err) => {
          if (err?.response?.status === 500) {
            alert("Server Side Problem. Try Again Later.");
          }
          reject({ METHOD: "CREAT", ERORR: err });
        });
    });
    // return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve("Data Created");
    //   }, 1000);
    // });
  }

  function updateData(uid, data) {
    return new Promise((resolve, reject) => {
      useJwt
        .putcompanyprofile(uid, { ...data, application_id: id })
        .then((res) => {
          if (res?.status === 200) {
            resolve(res);
          }
        })
        .catch((err) => {
          if (err?.response?.status === 500) {
            alert("Server Side Problem. Try Again Later.");
          }
          reject({ METHOD: "UPDATE", ERORR: err });
        });
    });

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("Get upDated");
      }, 1000);
    });
  }

  function getData() {
    return new Promise((resolve, reject) => {
      useJwt
        .getcompanyprofile({ application_id: id })
        .then((res) => {
          if (res?.status === 200) {
            resolve(res);
          }
        })
        .catch((err) => reject({ METHOD: "GET", ERORR: err }));
    });

    // return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve("Get Data");
    //   }, 1000);
    // });
  }

  function creat(data) {
    setLoader(true);
    creatData(data)
      .then((res) => {
        return getData(id);
      })
      .then((res) => {
        setDefaultData({ ...res?.data[0] });
        next();
        setLoader(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function update(data) {
    updateData(data.uid, data)
      .then((res) => {
        return getData(id);
      })
      .then((res) => {
        setDefaultData({ ...res?.data[0] });
        next();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  useEffect(() => {
    getData(id).then((res) => {
      setDefaultData({ ...res?.data[0] });
    });
  }, []);

  return (
    <Form
      defaultData={defaultData}
      creat={creat}
      update={update}
      loader={loader}
    />
  );
};

export default CompanyProfile;
