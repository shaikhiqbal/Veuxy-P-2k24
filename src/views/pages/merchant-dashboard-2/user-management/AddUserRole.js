import React, { useState } from "react";

import UserRoleForm from "../../../components/merchant-dashboard-2/user-management/user-role-form/UserRoleForm";

const AddUserRoleForm = () => {

  // ** State
  const [defaultData,setDefaultData]=useState({})

  
  return <UserRoleForm defaultData={defaultData}/>;
};

export default AddUserRoleForm;
