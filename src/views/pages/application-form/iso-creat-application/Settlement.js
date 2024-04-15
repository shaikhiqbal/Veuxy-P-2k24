import React, { useEffect, useState } from "react";

import SettlementForm from "../../../components/application-7forms/settlement-bank/Settlement";

import useJwt from "@src/dashboard/jwt/useJwt";

const Settlement = (props) => {
  // ** Props Value
  const { id, stepper } = props;

  // ** States
  const [defaultData, setDefaultData] = useState({
    data: [
      {
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
    ],
  });
  const [loader, setLoader] = useState(false);

  // ** Data Creat
  function creatData(data = {}) {
    return new Promise((resolve, reject) => {
      useJwt
        .postsettlementbankdetails(data)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  // ** Data Update
  function updateData(uid, data = {}) {
    return new Promise((resolve, reject) => {
      useJwt
        .putsettlementbankdetails(uid, data)
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
        .sbd_get_view({ application_id: id })
        .then((res) => {
          resolve(res);
          if (res?.data.length > 0) {
            // handleGetData(res?.data);
            setDefaultData({ data: res?.data });
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  // ** Filter Data for Creat And Update
  function filterData(data) {
    // console.log(data);
    const { data: dataArray } = data;
    const updatedData = { post: [], put: [] };

    const isValidData = (element) =>
      Object.values(element).some(
        (element) => typeof element === "string" && element.length > 0
      );

    dataArray.forEach((element) => {
      console.log(element);
      if (!isValidData(element)) return;
      element.application_id = id;
      if (element.uid) updatedData.put.push(element);
      else updatedData.post.push(element);
    });
    if (updatedData.post.length == 0 && updatedData.put.length == 0) {
      updatedData.post.push({ application_id: id });
    }
    return updatedData;
  }

  // ** Handle Post and Update
  async function handleSendData(data) {
    setLoader(true);
    try {
      const { post, put } = filterData(data);
      if (post.length > 0) {
        await creatData({ sbd: post });
      }
      if (put.length > 0) {
        await updateData(put[0].uid, { sbd: put });
      }
      await getData(id);
      stepper.next();
    } catch (err) {
      if (err?.response?.status === 500) {
        alert("Please try again later. Server problem!");
      }
      setLoader(false);
    }
    stepper.next();
  }

  useEffect(() => {
    getData(id);
  }, []);
  // ** Handle Get data

  const previous = () => stepper.previous();
  return (
    <>
      <SettlementForm
        sendData={handleSendData}
        defaultData={defaultData}
        loader={loader}
        previous={previous}
      />
    </>
  );
};

export default Settlement;
