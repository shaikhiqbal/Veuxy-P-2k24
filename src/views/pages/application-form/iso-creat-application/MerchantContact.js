import React, { useState, useEffect } from "react";

import ContactForm from "../../../components/application-7forms/merchant-contact/Contacts";

import useJwt from "@src/dashboard/jwt/useJwt";

import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

const MerchantContact = (props) => {
  //** Props  */
  const { id } = props;

  const { role } = useSelector((store) => store.auth.userData);

  // ** Role Path
  const rolePath = {
    merchant: "/merchant-status",
    iso: "/iso/merchant",
  };

  // ** Navigate User

  const navigate = useNavigate();

  // ** State
  const [defaultData, setDefaultData] = useState({});
  const [loader, setLoader] = useState(false);

  // ** Data Creat
  function creatData(data = {}) {
    return new Promise((resolve, reject) => {
      useJwt
        .postmerchantcontact({ ...data })
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
        .putmerchantcontact(data["mc"][0].uid, data)
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
        .getmerchantcontact({ application_id: id })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  // ** Creat Data
  async function handleSend(data) {
    setLoader(!loader);
    const test = {
      1: true,
      2: true,
      3: true,
      4: true,
    };
    data["mc"].forEach((element) => {
      if (test[element.contact_type]) {
        element.application_id = id;
        delete test[element.contact_type];
      }
    });
    if (Object.keys(test).length > 0) {
      const remain = [];
      Object.keys(test).forEach((ele) =>
        remain.push({ ...data["mc"][0], contact_type: ele })
      );
      data["mc"] = [...data["mc"], ...remain];
    }
    try {
      if (data["mc"][0]?.["uid"]) {
        const res = await updateData(data);
        setLoader(false);
        navigate(rolePath[role]);
      } else {
        const res = await creatData(data);
        setLoader(false);
        navigate(rolePath[role]);
      }
    } catch (err) {
      alert("Oop server Problem");
      setLoader(false);
    }
  }

  // ** Geting Data
  useEffect(() => {
    getData(id).then((res) => {
      setDefaultData({ mc: res?.data });
    });
  }, []);

  return (
    <>
      <ContactForm
        defaultData={defaultData}
        loader={loader}
        handleSend={handleSend}
        id={id}
      />
    </>
  );
};

export default MerchantContact;
