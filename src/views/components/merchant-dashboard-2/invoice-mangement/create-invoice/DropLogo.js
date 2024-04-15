import { useState, useCallback, useMemo, useEffect } from "react";

import { useDropzone } from "react-dropzone";
import { Plus, Upload, X } from "react-feather";
import { Modal, ModalHeader, ModalBody, Button } from "reactstrap";

export const Dropzone = (props) => {
  // ** State
  const [url, setUrl] = useState(null);
  const [open, setOpen] = useState(false);

  // ** Drop File Handler
  const onDrop = useCallback((acceptedFiles) => {
    const reader = new FileReader();
    reader.onload = () => {
      const urlLink = reader.result;
      //   props.url(url);
      setUrl(urlLink);
    };
    reader.readAsDataURL(acceptedFiles[0]);
  }, []);

  // ** Drop-Zone Hook
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      onDrop,
      accept: ["image/jpeg", ".jpeg", ".png"],
    });

  // ** Styles
  const baseStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out",
  };

  const focusedStyle = {
    borderColor: "#53bdc0",
  };

  const acceptStyle = {
    borderColor: "#00e676",
  };

  const rejectStyle = {
    borderColor: "#ff1744",
  };
  // ** Style Handlers
  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const toggleModal = () => {
    setOpen(!open);
    props.close(!open);
  };

  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  const handleUpload = () => {
    props.url(url);
    setOpen(!open);
    props.close(!open);
  };
  return (
    <Modal className={"modal-dialog-centered modal-sm"} isOpen={open}>
      <ModalHeader toggle={() => toggleModal()}></ModalHeader>
      <ModalBody className="">
        {!url ? (
          <div {...getRootProps({ style })}>
            <input {...getInputProps()} />
            <Plus size={20} />
            <small>Drop Logo here or click to upload</small>
          </div>
        ) : (
          <div className="d-flex  justify-content-center  py-1">
            <div className="position-relative">
              <img src={url} alt="logo.." width={"150px"} />
            </div>
          </div>
        )}

        <div className="mt-1 d-flex justify-content-center">
          <Button
            disabled={url ? false : true}
            className="text-uppercase btn-sm me-1"
            color="success"
            onClick={handleUpload}
          >
            <Upload size={15} /> upload
          </Button>
          <Button
            className={`text-uppercase btn-sm ${
              url ? "d-inline-block" : "d-none"
            } `}
            color="danger"
            onClick={() => setUrl(null)}
          >
            <X size={15} /> Remove
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export const DisplayLogo = (props) => {
  const [editorDivStyle, setEditorDivStyle] = useState({
    background: "rgba(255, 255, 255, 0.25)",
    backdropFilter: "blur(4px)",
    WebkitBackdropFilter: "blur(4px)",
    width: "100%",
    height: "100%",
    positoin: "absolute",
    cursor: "pointer",
    transform: "translate(100%, -100%)",
  });

  const handleOnMouseEnter = () => {
    setEditorDivStyle({
      ...editorDivStyle,
      transform: "translate(0, 0)",
    });
  };

  const handleOnMouseLeave = () => {
    setEditorDivStyle({
      ...editorDivStyle,
      transform: "translate(100%, -100%)",
    });
  };

  return (
    <>
      <div className="logo-wrapper">
        <div
          className="rounded  position-relative overflow-hidden"
          style={{
            width: "150px",
            height: "150px",
            transition: "all 0.5s", // Move transition here
          }}
        >
          <div className="position-absolute" onMouseEnter={handleOnMouseEnter}>
            <img
              src={props.url}
              alt="logo..."
              style={{ width: "150px", height: "150px" }}
            />
          </div>
          <div
            className="d-flex flex-column justify-content-center align-items-center text-dark"
            onMouseLeave={handleOnMouseLeave}
            style={editorDivStyle}
            onClick={props.open}
          >
            <span>
              <Plus />
            </span>
            <span>Edit</span>
          </div>
        </div>
        {/* <h3 className="text-primary invoice-logo">Vuexy</h3> */}
      </div>
    </>
  );
};
