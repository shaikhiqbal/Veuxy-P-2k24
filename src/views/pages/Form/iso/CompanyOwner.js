import React, { useEffect, useState } from "react";

import Form from "../../../components/application-7forms/company-owner-ship/CompanyOwners";

import useJwt from "@src/dashboard/jwt/useJwt";

const CompanyOwner = ({ next, previous, id }) => {
  const [defaultData, setDefaultData] = useState({});
  const [loader, setLoader] = useState(false);

  function creatData(data = {}) {
    return new Promise((resolve, reject) => {
      useJwt
        .postcompanyownershipprofile(data)
        .then((res) => {
          if (res?.status === 201) resolve(res);
        })
        .catch((err) => reject({ METHOD: "CREAT", ERORR: err }));
    });
  }

  function updateData(data = {}) {
    return new Promise((resolve, reject) => {
      useJwt
        .putCompanyownershipprofile(id, data)
        .then((res) => {
          if (res?.status === 200) {
            resolve(res);
          }
        })
        .catch((err) => reject({ METHOD: "UPDATE", ERORR: err }));
    });
  }

  function getData() {
    return new Promise((resolve, reject) => {
      useJwt
        .cop_get_view({ application_id: id })
        .then((res) => {
          if (res?.status === 200) {
            setDefaultData(res?.data[0]);
            resolve(res);
          }
        })
        .catch((err) => reject({ METHOD: "GET", ERORR: err }));
    });
  }

  function deleteData(uid) {
    return new Promise((resolve, reject) => {
      useJwt
        .cop_delete(uid)
        .then((res) => {
          if (res?.status === 200) {
            setDefaultData(res?.data[0]);
            resolve(res);
          }
        })
        .catch((err) => reject({ METHOD: "GET", ERORR: err }));
    });
  }

  const handleData = (data) => {
    const { director, ubo } = { ...data };
    director.forEach((obj) => {
      obj.cop_type = 1;
      obj.application_id = id;
    });
    ubo.forEach((obj) => {
      obj.cop_type = 2;
      obj.application_id = id;
    });
    const { post, update } = [...director, ...ubo].reduce(
      (initialObj, ele) => {
        if (ele?.uid) initialObj.update.push(ele);
        else initialObj.obj.push(ele);
      },
      { post: [], update: [] }
    );

    return { post, update };
  };

  function sendData(data) {
    setLoader(true);
    const { post, update } = handleData(data);

    console.log({ post, update });

    // if (post.length > 0 && update.length > 0) {
    //   creatData({ cop: post })
    //     .then((res) => {
    //       return updateData({ cop: post });
    //     })
    //     .then((res) => {
    //       return getData(id);
    //     })
    //     .catch((err) => {
    //       console.error(err);
    //     });
    // } else if (post.length > 0) {
    //   creatData({ cop: post })
    //     .then((res) => {
    //       return getData(id);
    //     })
    //     .catch((err) => {
    //       console.error(err);
    //     });
    // } else {
    //   updateData({ cop: update }).then((res) => {
    //     return getData(id);
    //   });
    // }
    setLoader(!loader);
  }

  useEffect(() => {
    getData(id).then((res) => console.log(res));
  }, []);

  // return <Form defaultData={defaultData} sendData={sendData} loader={loader} />;
};

export default CompanyOwner;
