import React, { useEffect, useState, useMemo } from "react";
import { Plus, User } from "react-feather";
import { Button, Card, CardBody, CardHeader } from "reactstrap";

import UserForm from "../../../components/merchant-dashboard-2/user-management/add-user-form/UserForm";
import UserRoleList from "../../../components/merchant-dashboard-2/user-management/user-role-form/UserRoleList";
import UserList from "../../../components/merchant-dashboard-2/user-management/add-user-form/UserList";
import AddUserRoleModal from "../../../components/merchant-dashboard-2/user-management/user-role-form/AddUserRoleModal";

import useJwt from "@src/dashboard/jwt/useJwt";

import { useNavigate } from "react-router-dom";

const UserManagement = () => {
  // ** State

  const [accessControlModal, setAccessControlModal] = useState(false);

  // Navigate
  const navigate = useNavigate();

  // Access Control Modal
  const toggleAccessControlModal = () =>
    setAccessControlModal(!accessControlModal);

  // ** Role Permissions Modal
  const addRoleModal = useMemo(() => {
    return (
      <AddUserRoleModal
        open={accessControlModal}
        toggle={toggleAccessControlModal}
      />
    );
  }, [accessControlModal]);

  return (
    <>
      <Card>
        <CardHeader className="d-flex justify-content-between border-bottom">
          <div>
            <h3>User Management</h3>
          </div>
          <div>
            <Button.Ripple
              outline
              color="primary"
              className="me-1"
              onClick={toggleAccessControlModal}
            >
              <Plus size={14} />
              <span className="align-middle ms-25">Add New Role</span>
            </Button.Ripple>
            <Button
              onClick={() => navigate("/add-user", { state: { uid: null } })}
              color="info"
            >
              <User size={14} />
              <span>Add New User</span>
            </Button>
          </div>
        </CardHeader>
        <CardBody>
          <UserList data={[]} />
        </CardBody>
      </Card>
      {/* <AddUserRoleModal
        open={accessControlModal}
        toggle={toggleAccessControlModal}
      /> */}
      {addRoleModal}
    </>
  );
};

export default UserManagement;
