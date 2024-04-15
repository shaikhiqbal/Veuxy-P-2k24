import React, { useEffect, useState } from "react";

import CompanyOwnersForm from "../../../components/application-7forms/company-owner-ship/CompanyOwners";

import useJwt from "@src/dashboard/jwt/useJwt";

const CompnayOwnership = (props) => {
  const { id, stepper, setCop_Document } = props;


  // ** State
  const [anyUboHave, setAnyUboHave] = useState(false);
  const [loader, setLoader] = useState(false);
  const [defaultData, setDefaultData] = useState({
    director: [
      {
        first_name: "",
        last_name: "",
        house_number: "",
        street_address: "",
        zip_code: "",
        city: "",
        country: "",
        telephone_number: "",
        passport: "",
        social_security_number: "",
      },
    ],
    ubo: [
      {
        first_name: "",
        last_name: "",
        house_number: "",
        street_address: "",
        zip_code: "",
        city: "",
        country: "",
        telephone_number: "",
        passport: "",
        social_security_number: "",
      },
    ],
  });

  // ** Data Creat
  function creatData(data = {}) {
    return new Promise((resolve, reject) => {
      useJwt
        .postcompanyownershipprofile(data)
        .then((res) => {
          console.log("Enter")
          resolve(res);
          setCop_Document((boolean) => !boolean);
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
        .putCompanyownershipprofile(uid, data)
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
        .cop_get_view({ application_id: id })
        .then((res) => {
          resolve(res);
          if (res?.data.length > 0) {
            handleGetData(res?.data);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  // ** Modified Data Post And Get;
  function handleModification(data) {
    const { director, ubo } = data;
    const updatedData = { post: [], put: [] };
    const isValidData = (element) =>
      Object.values(element).some(
        (element) => typeof element === "string" && element.length > 0
      );
    director.forEach((element) => {
      if (!isValidData(element)) return;
      element.cop_type = 1;
      element.application_id = id;
      if (element.uid) updatedData.put.push(element);
      else updatedData.post.push(element);
    });

    ubo.forEach((element) => {
      if (!isValidData(element)) return;
      element.cop_type = 2;
      element.application_id = id;
      if (element.uid) updatedData.put.push(element);
      else updatedData.post.push(element);
    });
    if (updatedData.post.length == 0 && updatedData.put.length == 0) {
      updatedData.post.push({ cop_type: 1, application_id: id });
    }
    return updatedData;
  }

  // ** Send Data TO Server
  // function handleSendData(data) {
  //   const { post, put } = handleModification({ ...data });
  //   if (post.length > 0 && put.length > 0) {
  //     updateData(put)
  //       .then((res) => {
  //         return creatData(post);
  //       })
  //       .then((res) => {
  //         getData(id);
  //       })
  //       .catch((err) => {
  //         if (err?.response?.status == 500)
  //           alert("Pleas Try some time later,Server Problem!");
  //         console.error(err);
  //       });
  //   } else if (put.length > 0) {
  //     updateData(put)
  //       .then((res) => {
  //         return getData(id);
  //       })
  //       .catch((err) => {
  //         if (err?.response?.status == 500)
  //           alert("Pleas Try some time later,Server Problem!");
  //         console.error(err);
  //       });
  //   } else {
  //     creatData(post)
  //       .then((res) => {
  //         return getData(id);
  //       })
  //       .catch((err) => {
  //         if (err?.response?.status == 500)
  //           alert("Pleas Try some time later,Server Problem!");
  //         console.error(err);
  //       });
  //   }
  // }

  async function handleSendData(data) {
    setLoader(true);
    try {
      const { post, put } = handleModification({ ...data });

      if (put.length > 0) {
        await updateData(put[0].uid, { cop: put });
      }

      if (post.length > 0) {
        await creatData({ cop: post });
      }
      await getData(id);

      setLoader(false);
      stepper.next();
    } catch (err) {
      if (err?.response?.status === 500) {
        alert("Please try again later. Server problem!");
      }
      setLoader(false);
    }
  }

  // ** Handle Get Data;
  function handleGetData(data) {
    const cop = [...data];
    const owners = { director: [], ubo: [] };
    cop.forEach((element) => {
      if (element.cop_type == 1) owners.director.push(element);
      else {
        setAnyUboHave(true);
        owners.ubo.push(element);
      }
    });
    if (!owners.ubo.length) {
      owners.ubo.push({
        first_name: "",
        last_name: "",
        house_number: "",
        street_address: "",
        zip_code: "",
        city: "",
        country: "",
        telephone_number: "",
        passport: "",
        social_security_number: "",
      });
    }
    setDefaultData({ ...owners });
  }

  useEffect(() => {
    getData(id);
  }, []);
  const previous = () => stepper.previous();
  return (
    <>
      <CompanyOwnersForm
        sendData={handleSendData}
        defaultData={defaultData}
        loader={loader}
        previous={previous}
        uboHave={anyUboHave}
      />
    </>
  );
};

export default CompnayOwnership;

// useJwt.cop_delete(users[index]["uid"]).then((res) => {
