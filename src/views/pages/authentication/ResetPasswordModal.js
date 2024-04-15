import React from "react";
import { SkipBack } from "react-feather";
import { Link } from "react-router-dom";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

function ResetPasswordModal({ open }) {
  return (
    <div>
      {" "}
      <Modal isOpen={open} className="modal-dialog-centered">
        <ModalHeader>item.title</ModalHeader>
        <ModalBody></ModalBody>
        <ModalFooter>
          <Link to={"/login"}>
            <Button color="success">
            Sign-in
            </Button>
          </Link>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ResetPasswordModal;
