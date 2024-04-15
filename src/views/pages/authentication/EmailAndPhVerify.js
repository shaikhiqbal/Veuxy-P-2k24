import { Fragment, useState } from "react";

// ** Reactstrap Imports
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Row,
  Col,
  InputGroup,
  InputGroupText,
  Input,
} from "reactstrap";
import { Mail } from "react-feather";
import { Link } from "react-router-dom";
import React from "react";

function EmailAndPhVerify({ canvasOpen, setCanvasOpen, email }) {
  return (
    <div className="vertically-centered-modal">
      <Modal
        isOpen={canvasOpen}
        toggle={() => setCanvasOpen(!canvasOpen)}
        className="modal-dialog-centered"
      >
        <ModalHeader toggle={() => setCanvasOpen(!canvasOpen)}>
          Your Are Already Register With Below Email
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col sm="12">
              <Label className="form-label" for="EmailVerticalIcons">
                Email
              </Label>
              <InputGroup className="input-group-merge mb-1">
                <InputGroupText>
                  <Mail size={15} />
                </InputGroupText>
                <Input
                  type="email"
                  name="Email"
                  id="EmailVerticalIcons"
                  placeholder="Email"
                  value={email}
                  disabled
                />
              </InputGroup>
              <div className="d-flex justify-content-between">
                <Button className="btn-sm btn-info ">
                  <Link to="/forgot-password">
                    <small className="text-white">Forgot Password?</small>
                  </Link>
                </Button>
              </div>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              setCanvasOpen(!canvasOpen)((window.location = "/login"));
              clearImmediate;
            }}
          >
            Sign-in
          </Button>{" "}
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default EmailAndPhVerify;
