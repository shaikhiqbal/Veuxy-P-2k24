import React, { useEffect, useState } from "react";

import CompanyProfileForm from "../../../components/application-7forms/company-profile/CompanyProfile";

import useJwt from "@src/dashboard/jwt/useJwt";

const CompanyProfile = (props) => {
  //** Props  */
  const { id, stepper } = props;

  // ** State
  const [defaultData, setDefaultData] = useState({});
  const [loader, setLoader] = useState(false);

  // ** Data Creat
  function creatData(data = {}) {
    console.log(data);
    return new Promise((resolve, reject) => {
      useJwt
        .companyprofile({ ...data })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  // ** Data Update
  function updateData(data = {}) {
    return new Promise((resolve, reject) => {
      useJwt
        .putcompanyprofile(data.uid, data)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  // ** Fetch Data
  function getData(id) {
    return new Promise((resolve, reject) => {
      useJwt
        .getcompanyprofile({ application_id: id })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  function handleCreat(data) {
    console.log({ ...data, application_id: id });
    setLoader(!loader);
    creatData({ ...data, application_id: id })
      .then((res) => {
        return getData(id);
      })
      .then((res) => {
        setDefaultData(res?.data[0]);
        // stepper.next();
      })
      .catch((err) => {
        if (err?.response?.status == 500)
          // alert("Pleas Try some time later,Server Problem!");
          console.error(err);
      });
    setLoader(!loader);
    stepper.next();
  }
  function handleUpdate(data) {
    updateData({ ...data, application_id: id })
      .then((res) => {
        return getData(id);
      })
      .then((res) => {
        setDefaultData(res?.data[0]);
        // stepper.next();
      })
      .catch((err) => {
        if (err?.response?.status == 500)
          // alert("Pleas Try some time later,Server Problem!");
          console.error(err);
      });
    stepper.next();
  }

  useEffect(() => {
    getData(id).then((res) => setDefaultData(res?.data[0]));
  }, []);

  return (
    <>
      <CompanyProfileForm
        creat={handleCreat}
        update={handleUpdate}
        defaultData={defaultData}
        loader={loader}
      />
    </>
  );
};

export default CompanyProfile;
