import React, { useState } from "react";
import { Button, Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import UserList from "../../../components/merchant-dashboard-2/user-management/add-user-form/UserList";
import { useNavigate } from "react-router-dom";
import { Plus } from "react-feather";

const User = () => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader className="d-flex justify-content-end">

          <Button
            onClick={() => navigate("/add-user", { state: { uid: null } })}
            className="btn-sm btn-warning"
          >
            <Plus size={14} /> Add User
          </Button>

      </CardHeader>
      <CardBody>
        <UserList data={[]} />
      </CardBody>
    </Card>
  );
};

export default User;
