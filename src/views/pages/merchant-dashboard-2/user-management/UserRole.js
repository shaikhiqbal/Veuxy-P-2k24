import React, { useState } from "react";

// ** Reactstrap
import { Button, Card, CardBody, CardHeader, CardTitle } from "reactstrap";

// ** Table List
import UserRoleList from "../../../components/merchant-dashboard-2/user-management/user-role-form/UserRoleList";

// ** Icons
import { Plus } from "react-feather";

// ** Navigate
import { useNavigate } from "react-router-dom";

//add-user-role
const UserRole = () => {
  
  // ** Navigate Page
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader className="d-flex justify-content-end">
        <Button
          onClick={() => navigate("/add-user-role", { state: { uid: null } })}
          color="primary"
        >
          <Plus size={14} /> Add User Role
        </Button>
      </CardHeader>
      <CardBody>
        <UserRoleList data={[]} />
      </CardBody>
      {/* <UserForm canvasOpen={canvasOpen} handleCanvas={handleForm}/> */}
    </Card>
  );
};

export default UserRole;
