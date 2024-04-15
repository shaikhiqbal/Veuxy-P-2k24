import React, { useEffect, useState } from "react";
import BusinessProfileForm from "../../../components/application-7forms/business-profile/BusinessProfile";

import useJwt from "@src/dashboard/jwt/useJwt";

const BusinessProfile = (props) => {
  //** Props  */
  const { id, stepper } = props;
  // ** State
  const [defaultData, setDefaultData] = useState({
    card_type: [],
    credit_card_history: [],
  });
  const [loader, setLoader] = useState(false);

  // ** Data Creat
  function creatData(data = {}) {
    console.log(data);
    return new Promise((resolve, reject) => {
      useJwt
        .postbusinessprofile(data)
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
        .putbusinessprofile(data.uid, data)
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
        .getbusinessprofile({ application_id: id })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  // ** Handle Data Creation & Fetch
  function handleCreat(data) {
    setLoader(!loader);
    creatData({ ...data, application_id: id })
      .then((res) => {
        return getData(id);
      })
      .then((res) => {
        setDefaultData(res?.data[0]);
        setLoader(!loader);
        // stepper.next();
      })
      .catch((err) => {
        if (err?.response?.status == 500)
          // alert("Pleas Try some time later,Server Problem!");
          console.error(err);
        setLoader(!loader);
      });
    setLoader(!loader);
    stepper.next();
  }

  // ** Handle Data Update & Fetch
  function handleUpdate(data) {
    setLoader(!loader);
    updateData({ ...data, application_id: id })
      .then((res) => {
        return getData(id);
      })
      .then((res) => {
        setDefaultData(res?.data[0]);
        setLoader(!loader);
        // stepper.next();
      })
      .catch((err) => {
        if (err?.response?.status == 500)
          // alert("Pleas Try some time later,Server Problem!");
          console.error(err);
        setLoader(!loader);
      });
    setLoader(!loader);
    stepper.next();
  }

  useEffect(() => {
    getData(id).then((res) => {
      setDefaultData(
        res?.data[0]
          ? res?.data[0]
          : {
              card_type: [],
              credit_card_history: [],
            }
      );
    });
  }, []);

  const previous = () => stepper.previous();
  return (
    <>
      <BusinessProfileForm
        creat={handleCreat}
        update={handleUpdate}
        defaultData={defaultData}
        loader={loader}
        previous={previous}
      />
    </>
  );
};

export default BusinessProfile;
