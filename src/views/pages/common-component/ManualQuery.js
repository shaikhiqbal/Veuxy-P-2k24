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

const ManualQuery = (props) => {
  const { open, setOpen, info } = props;
  const [templateIndex, setTemplateIndex] = useState(-1);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [templateData, setTemplateData] = useState([]);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  console.log({info})
  const navigate = useNavigate();

  const templateSelect = () => {
    if (!templateData) return [];
    const index = parseInt(templateIndex);
    return templateData.map((i, idx) => (
      <option key={idx} value={idx}>
        {i.title}
      </option>
    ));
  };

  const validateForm = () => {
    var s = convertToRaw(editorState.getCurrentContent());
    return s.blocks[0].text.trim().length > 0;
  };

  const toggle = () => {
    setEditorState(() => EditorState.createEmpty());
    setOpen(!open);
  };

  const onSend = () => {
    let values = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    return values;
  };
  const handleTopEnd = () => {
    return MySwal.fire({
      position: "top-end",
      icon: "success",
      title: "Your Query's has been succesfully sended",
      showConfirmButton: false,
      timer: 1500,
    });
  };
  const onSubmit = () => {
    const values = onSend();
    const data = {
      application_id: info.application_id,
      query_rest: values,
    };
    useJwt
      .postNote(data)
      .then((res) => {
        if (res.status === 200) {
          handleTopEnd();
          setEditorState(() => EditorState.createEmpty());
          setOpen(!open);
        }
      })
      .catch((err) => {
        console.log(err?.response?.status);
      });
  };
  // useEffect(() => {
  //   //**  get template List
  //   useJwt
  //     .getmanualQueryTemplate()
  //     .then((response) => {
  //       const data = response.data;
  //       setTemplateData([...data]);
  //       const index = data.findIndex(
  //         (element) => element.uid == info.template_uid
  //       );
  //       setTemplateIndex(index);
  //     })
  //     .catch((error) => {
  //       console.log({ error: error?.response });
  //     });
  // }, [info]);

  const setDataInEditBody = (idx = "") => {
    const index = parseInt(idx);
    if (index < 0) {
        return setEditorState(() => EditorState.createEmpty());
    }
    if (templateData[index]) {
      const block = convertFromHTML(templateData[index]["descriptor"]);
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
  useEffect(() => {
    setDataInEditBody(templateIndex);
  }, [templateIndex]);
  return (
    <Modal
      className="modal-dialog-centered modal-lg"
      isOpen={open}
      toggle={toggle}
    >
      <ModalHeader toggle={toggle}>Generate Query</ModalHeader>
      <ModalBody className="h-75">
        <Row>
          <div className="d-flex justify-content-end">
            <Button
              color="danger"
              onClick={() =>
                navigate("/creat-query-template", {
                  state: { info: info, openModal: open, isEnter: false },
                })
              }
            >
              <Plus size="14" /> Create Template
            </Button>
          </div>
          <Col sm="12" className="mb-1">
            <Label>Merchant Name</Label>
            <Input value={info.name} />
          </Col>
          <Col sm="12" className="mb-1">
            <Label>Merchant Email</Label>
            <Input value={info.gmail} />
          </Col>
          <Col sm="12" className="mb-1">
            <Label>Query Type</Label>
            <Input
              defaultValue={"select"}
              value={templateIndex}
              onChange={(e) => setTemplateIndex(e.target.value)}
              type="select"
            >
              <option value={-1}>select-one</option>
              {templateSelect()}
            </Input>
          </Col>
        </Row>
        <div className="d-flex justify-content-end mb-1">
          <div>
            {templateData[templateIndex] && (
              <>
                <Button
                  onClick={() =>
                    navigate("/creat-query-template", {
                      state: {
                        info: {
                          ...info,
                          template_uid: templateData[templateIndex]?.uid,
                        },
                        openModal: open,
                        isEnter: false,
                      },
                    })
                  }
                  className="btn-sm"
                  color="warning"
                >
                  Edit <Edit id="edit-template" size={14} />
                </Button>

                <Tooltip
                  placement="top"
                  isOpen={tooltipOpen}
                  target="edit-template"
                  toggle={() => setTooltipOpen(!tooltipOpen)}
                >
                  Edit {templateData[templateIndex]?.title} Template
                </Tooltip>
              </>
            )}
          </div>
        </div>
        <Editor
          editorState={editorState}
          onEditorStateChange={(data) => setEditorState(data)}
        />
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

export default ManualQuery;
