import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Tooltip,
} from "reactstrap";

// ** Third Party Components
import {
  EditorState,
  convertToRaw,
  ContentState,
  convertFromHTML,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { Markup } from "interweave";
import draftToHtml from "draftjs-to-html";
import { Edit, Plus, Send } from "react-feather";
import useJwt from "@src/dashboard/jwt/useJwt";

// ** style
import "@styles/react/libs/editor/editor.scss";
import { selectThemeColors } from "@utils";
import "./style/query-model.css";

import { useNavigate } from "react-router-dom";
// ** Third Party Components
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const ManualQuery = ({info}) => {
  const [templateName, setTemplateName] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [editTemplateData, setEditTempplateData] = useState({});
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );


  // const { info } = location.state;
  // console.log(info)
  const handlUserlanding = (uid, string) => {
    return MySwal.fire({
      title: `Template Successfully ${string}`,
      //   text: "",
      icon: "success",
      showCancelButton: true,
      confirmButtonText: "Go Back User Template",
      cancelButtonText: "Go Merchant Manage.",
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-danger ms-1",
      },
      buttonsStyling: false,
    }).then(function (result) {
      if (result.value) {
        // navigate("/underwriter/merchant-management", {
        //   state: { info: { ...info, template_uid: uid }, openModal: true },
        // });
      } else if (result.dismiss === MySwal.DismissReason.cancel) {
        // navigate("/underwriter/merchant-management", {
        //   state: { info: null, openModal: false },
        // });
      }
    });
  };

  // ** handle delete
  const handleConfirmText = (uid) => {
    return MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-outline-danger ms-1",
      },
      buttonsStyling: false,
    }).then(function (result) {
      if (result.value) {
        useJwt
          .deleteManualQueryTemplate(uid)
          .then((response) => {
            if (response?.status === 204) {
              // navigate("/underwriter/merchant-management", {
              //   state: {
              //     info: { ...info, template_uid: null },
              //     openModal: true,
              //   },
              // });
            }
          })
          .catch((error) => {
            MySwal.fire({
              icon: "danger",
              title: `${error?.response?.status}`,
              text: "Your file has not been deleted.",
              customClass: {
                confirmButton: "btn btn-info",
              },
            });
            error?.response?.status;
          });
      }
    });
  };
  const validateForm = () => {
    var s = convertToRaw(editorState.getCurrentContent());
    for (let i = 0; i < s.blocks.length; i++) {
      if (s.blocks[i].text.length) {
        return true;
      }
    }
    return false;
  };

  const onSend = () => {
    let values = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    return values;
  };
  const postData = (values) => {
    const data = {
      title: templateName,
      descriptor: values,
      application_id:info.application_id
    };
    useJwt
      .postmanualQueryTemplate(data)
      .then((res) => {
        if (res.status === 201) {
          handlUserlanding(res?.data?.uid, "Created");
          setEditorState(() => EditorState.createEmpty());
        }
      })
      .catch((err) => {
        console.log(err?.response?.status);
      });
  };
  const updateData = (data = {}, values = "") => {
    data.descriptor = values;
    useJwt.putmanualQueryTemplate(data.uid, data).then((response) => {
      if (response?.status == 200) {
        handlUserlanding(response?.data.uid, "Updated");
        setEditorState(() => EditorState.createEmpty());
      }
    });
  };
  const onSubmit = () => {
    if (!templateName) return;
    const values = onSend();
    isUpdate && editTemplateData?.uid
      ? updateData(editTemplateData, values)
      : postData(values);
  };
  const deleteTemplate = (uid) => handleConfirmText(uid);

  const handleEditDataBody = (data = [], uid = "") => {
    if (!data) return;
    const index = data.findIndex((i) => i.uid == uid);
    if (index >= 0) {
      setEditTempplateData(data[index]);
      setTemplateName(data[index].title);
      setIsUpdate(true);
      const block = convertFromHTML(data[index]["descriptor"]);
      setEditorState(
        EditorState.createWithContent(
          ContentState.createFromBlockArray(
            block.contentBlocks,
            block.entityMap
          )
        )
      );
    }
  };
  // useEffect(() => {
  //   if (info.template_uid) {
  //     useJwt.getmanualQueryTemplate().then((response) => {
  //       handleEditDataBody(response.data, info.template_uid);
  //     });
  //   }
  // }, []);
  return (
    <Modal
      className="modal-dialog-centered modal-lg"
      isOpen={open}
      toggle={toggle}
    >
      <ModalHeader toggle={toggle}>Generate Query</ModalHeader>
     <ModalBody>
     <Card style={{ height: "80vh" }}>
      <CardHeader>
        <h2>Create & Update Template</h2>
        {editTemplateData?.uid && (
          <Button
            className="btn-sm bg-white"
            color="danger"
            onClick={() => deleteTemplate(editTemplateData?.uid)}
          >
            <Trash size={14} />
          </Button>
        )}
      </CardHeader>
      <CardBody>
        <Row>
          <Col sm="12" className="mb-2">
            <Label>Template Name</Label>
            <Input
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
            />
          </Col>
          <Col sm="12" className="mb-2">
            <Label>Create Template</Label>
            <Editor
              editorState={editorState}
              onEditorStateChange={setEditorState}
            />
          </Col>
        </Row>
      </CardBody>
      <CardFooter>
        <Button
          disabled={!validateForm()}
          onClick={() => onSubmit()}
          color={`${isUpdate ? "info" : "success"}`}
        >
          {isUpdate ? "Update" : "Creat"} & Save
        </Button>
      </CardFooter>
    </Card>
     </ModalBody>
      <ModalFooter className="d-flex justify-content-start">
        <Button
          disabled={!validateForm()}
          color="success"
          className="w-25"
          onClick={() => onSubmit()}
        >
          Send <Send size={15} />
        </Button>
      </ModalFooter>
    </Modal>
  );
};


