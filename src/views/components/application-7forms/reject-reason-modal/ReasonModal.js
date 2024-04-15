import React, { useEffect, useRef, useState } from "react";
import {
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Button,
} from "reactstrap";

const ReasonModal = ({ open = false, onSubmit, setIsRejected }) => {
  const [formModal, setFormModal] = useState(open);
  const [value, setValue] = useState("");
  const inputRef = useRef(null);

  const modaleToggle = () => {
    setFormModal(!formModal);
    setIsRejected(!formModal);
  };
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  useEffect(() => setFormModal(open), [open]);
  return (
    <Modal
      isOpen={formModal}
      toggle={modaleToggle}
      className="modal-dialog-centered"
    >
      <ModalHeader toggle={modaleToggle}>
        Reason for rejecting application specify belowe
        <span className="text-danger">*</span>
      </ModalHeader>
      <ModalBody>
        <Input
          type="textarea"
          name="text"
          id="exampleText"
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </ModalBody>
      <ModalFooter>
        <Button
          color="success"
          onClick={() => {
            onSubmit(value);
            setFormModal(!formModal);
            setIsRejected(!formModal);
          }}
        >
          Submit
        </Button>{" "}
      </ModalFooter>
    </Modal>
  );
};

export default ReasonModal;
