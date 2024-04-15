import React, { useEffect, useState } from "react";

import CompanyProfileForm from "../../../components/application-7forms/company-profile/CompanyProfile";

import useJwt from "@src/dashboard/jwt/useJwt";

const CompanyProfile = (props) => {
  //** Props  */
  const { id, stepper, setId } = props;

  // ** State
  const [defaultData, setDefaultData] = useState({});
  const [loader, setLoader] = useState(false);

  // ** Data Creat
  function creatData(data = {}) {
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
        .getcompanyprofile()
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  function handleCreat(data) {
    setLoader(!loader);
    creatData({ ...data })
      .then((res) => {
        console.log(res);
        return getData(res?.data.application_id);
      })
      .then((res) => {
        setDefaultData(res?.data[0]);
        stepper.next();
      })
      .catch((err) => {
        if (err?.response?.status == 500)
          // alert("Pleas Try some time later,Server Problem!");
          console.error(err);
      });
    setLoader(false);
    stepper.next();
  }
  function handleUpdate(data) {
    updateData({ ...data, application_id: id })
      .then((res) => {
        return getData(id);
      })
      .then((res) => {
        setDefaultData(res?.data[0]);
        stepper.next();
      })
      .catch((err) => {
        if (err?.response?.status == 500)
          alert("Pleas Try some time later,Server Problem!");
        console.error(err);
      });
    setLoader(false);
  }

  useEffect(() => {
    getData(id).then((res) => {
      if (!id) setId(res?.data[0]?.application?.uid);
      setDefaultData(res?.data[0]);
    });
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
