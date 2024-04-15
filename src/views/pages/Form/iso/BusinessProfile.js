import React, { useEffect, useState } from "react";

import Form from "../../../components/application-7forms/business-profile/BusinessProfile";

import useJwt from "@src/dashboard/jwt/useJwt";

const BusinessProfile = ({ next, previous, id }) => {
  const [defaultData, setDefaultData] = useState({});
  const [loader, setLoader] = useState(false);

  function creatData(data = {}) {
    return new Promise((resolve, reject) => {
      useJwt
        .postbusinessprofile({ ...data, application_id: id })
        .then((res) => {
          if (res?.status === 201) resolve(res);
        })
        .catch((err) => reject({ METHOD: "CREAT", ERORR: err }));
    });
  }

  function updateData(data = {}) {
    return new Promise((resolve, reject) => {
      useJwt
        .putbusinessprofile(data.uid, { ...data, application_id: id })
        .then((res) => {
          if (res?.status === 200) {
            resolve(res);
          }
        })
        .catch((err) => {
          console.log("Error");
          reject({ METHOD: "UPDATE", ERORR: err });
        });
    });
  }

  function getData() {
    return new Promise((resolve, reject) => {
      useJwt
        .getbusinessprofile({ application_id: id })
        .then((res) => {
          if (res?.status === 200) {
            resolve(res);
          }
        })
        .catch((err) => reject({ METHOD: "GET", ERORR: err }));
    });
  }

  function creat(data) {
    setLoader(true);
    creatData(data)
      .then((res) => {
        console.log(res);
        return getData(id);
      })
      .then((res) => {
        setDefaultData({});
        next();
        setLoader(false);
      })
      .catch((err) => {
        setLoader(!loader);
        console.error(err);
      });
  }

  function update(data) {
    setLoader(true);
    updateData(data)
      .then((res) => {
        return getData(id);
      })
      .then((res) => {
        setDefaultData({ ...res?.data[0] });
        next();
        setLoader(false);
      })
      .catch((err) => {
        console.log("Enter");
        setLoader(false);
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

export default BusinessProfile;
