import React, { useEffect, useState } from "react";
import UserForm from "../../../components/merchant-dashboard-2/user-management/add-user-form/UserForm";
import { useLocation } from "react-router-dom";

const AddUserForm = () => {
  // ** State
  const [defaultData, setDefaultData] = useState({});
  const [uid, setUid] = useState(null);

  // ** Current Location Get Data
  const location = useLocation();

  useEffect(() => {
    // ** User Uid store in State
    const state = location;
  }, []);

  return <UserForm defaultData={defaultData} />;
};

export default AddUserForm;
