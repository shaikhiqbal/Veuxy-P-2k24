import React, { Fragment, useEffect, useState } from "react";
import {
  Alert,
  Button,
  CardText,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { Progress } from "reactstrap";
import CardLoader from "./CardLoader";
// ** Upload document
import DocumentUploadModal from "./DocumentUploadModal";

//** jwt
import useJwt from "@src/dashboard/jwt/useJwt";

// ** Custom Components
import UILoader from "@components/ui-loader";
import Spinner from "@components/spinner/Loading-spinner";

const ModalApplicatioPdfUpload = ({ open, setOpen, uid }) => {
  const [document, setDocument] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [block, setBlock] = useState(false);
  const [fetchData, setFetchData] = useState(false);

  const Loader = () => {
    return (
      <Fragment>
        <Spinner />
        <CardText className="mb-0 mt-1 text-white">
          Please Wait Pdf Extracting...
        </CardText>
      </Fragment>
    );
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    file ? setDocument(file) : setDocument(null);
  };
  const onSubmit = () => {
    setBlock(!block);
    // setTimeout(() => {
    //   setBlock(block);
    //   setFetchData(!fetchData);
    // }, 4000);
    if (!document) return "error";
    let form = new FormData();
    form.append("file", document);
    form.append("application_id", uid);
    useJwt
      .uploadAppication(form)
      .then((response) => {
        if (response?.status) {
          // setIsOpen(!isOpen);
          setBlock(false);
          setFetchData(!fetchData);
        }
      })
      .catch((error) => {
        alert(error?.response?.status);
        setBlock(false);
      });
  };


  return (
    <Modal
      isOpen={open}
      modalClassName={"modal-success"}
      className="modal-dialog-centered"
    >
      <UILoader blocking={block} loader={<Loader />}>
        {!fetchData && <ModalHeader>Application File Upload</ModalHeader>}
        {!fetchData && (
          <ModalBody>
            <Label>
              Application Form File <span className="text-danger">*</span>
            </Label>
            <Input type="file" onChange={handleChange} accept=".pdf" />
          </ModalBody>
        )}
        {fetchData && (
          <ModalBody>
            <CardLoader getData={fetchData} openDocument={setIsOpen} document={isOpen} />
          </ModalBody>
        )}
        {!fetchData && (
          <ModalFooter>
            <Button color={"success"} onClick={() => onSubmit()}>
              Submit
            </Button>
            {/* <Button color={"success"} onClick={() => setFetchData(!fetchData)}>
            Submit
          </Button> */}
          </ModalFooter>
        )}
        <DocumentUploadModal
          uid={uid}
          toggleModal={setIsOpen}
          toggle={isOpen}
        />
      </UILoader>
    </Modal>
  );
};

export default ModalApplicatioPdfUpload;
