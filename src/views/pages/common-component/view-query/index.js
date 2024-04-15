import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "reactstrap";
import useJwt from "@src/dashboard/jwt/useJwt";
import "./style.css";
import { useLocation } from "react-router-dom";
import Avatar from "@components/avatar";
import message from "./message.svg";
import ManualQueryUW from "./ManualQueryUW";
import { CornerUpLeft, Send, X } from "react-feather";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const index = () => {
  // ** states
  const [loader, setLoader] = useState(true);
  const [queryList, setQueryList] = useState([]);
  const [headerContent, setHeaderContent] = useState(null);
  const [previousActiveId, setPreviousActiveId] = useState("");
  const [currentId, setCurrentId] = useState(null);
  const [createdBy, setCreatedBy] = useState({});
  const [queryRaised, setQueryRaised] = useState(false);
  const [htmlText, setHtmlText] = useState("");
  var currentUser = localStorage.getItem("userData");
  currentUser = JSON.parse(currentUser);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  // console.log(useLocation().state)
  const {application_id,info} = useLocation().state

  // ** All Type User Role
  const userType = {
    1: "admin",
    2: "frt",
    3: "iso",
    4: "under_writer",
    5: "merchant",
  };

  // ** store required data in state;
  const setQueryListing = (data = []) => {
    if (!data?.length) return;
    const list = [];
    for (let key of data) {
      if (key?.query_type == "manual") {
        list.push(key);
      }
    }
    if (list.length) {
      list.reverse();
      let flag = !loader;
      setLoader(flag);
      setQueryList([...list]);
    }
  };

  // ** message Header
  const headerView = () => (
    <div className="d-flex align-itmes-basline">
      <div className="me-1" style={{ paddingTop: "3px" }}>
        <Avatar color="light-danger" content={headerContent} initials />
      </div>
      <div className="" style={{ paddingTop: "8px" }}>
        <span className="fw-bold" style={{ fontSize: "15px" }}>
          {headerContent}
        </span>
      </div>
    </div>
  );
  // ** Empty body ui
  const emptyMessageBodyscreen = () => (
    <div className="blank-message-body w-100 h-100 d-flex justify-content-center align-content-center">
      <div
        className="blank-message-body"
        style={{ height: "min-content", margin: "auto" }}
      >
        <img src={message} style={{ width: "50%" }} />
        <div className="text-center">
          <span className="fs-1 fw-bold">
            Welcome! to Query Management
            <br />
            <small className="w-50">
              Send and receive your query related your application forms with
              under writer.
            </small>
          </span>
        </div>
      </div>
    </div>
  );
  // ** View message body ui
  const viewQueryMessage = () => (
    <div id="view-query-container" className="hide-content">
      <div className="view-query-body">
        <div id="view-content" />
        <div className="view-query-message-container">
          <Row>
            <Col
              className="d-flex flex-row border-bottom pb-1"
              style={{ margin: "20px 10px" }}
              sm={12}
            >
              <div className="me-1">
                <Avatar
                  color="light-danger"
                  content={"Under Writer"}
                  size="lg"
                  initials
                />
              </div>
              <div>
                <span className="fw-bolder fs-4">
                  {createdBy?.full_name}
                  <br />
                  <span className="text-muted" style={{ fontSize: "12px" }}>
                    {createdBy?.email}
                  </span>
                </span>
              </div>
              {userType[createdBy.user_type] !== currentUser?.role && (
                  <div></div>
                ) && (
                  <div className="btn-reply-container">
                    <button onClick={handleReply} className="reply-button">
                      <CornerUpLeft size={14} />
                    </button>
                  </div>
                )}
            </Col>
            <Col className="p-4" sm={12}>
              <div dangerouslySetInnerHTML={{ __html: htmlText }} />
            </Col>
          </Row>
        </div>
        <div id="compose-section" className="composeHide">
          {composeQuery(createdBy)}
        </div>
      </div>
    </div>
  );

  // ** Validation For Editor
  const validateForm = () => {
    var s = convertToRaw(editorState.getCurrentContent());
    for (let i = 0; i < s.blocks.length; i++) {
      if (s.blocks[i].text.length) {
        return true;
      }
    }
    return false;
  };
  // ** Handle Editor Value;
  const onSend = () => {
    let values = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    return values;
  };
  // ** Sweet alert for Sending Query
  const handleTopEnd = () => {
    return MySwal.fire({
      position: "top-end",
      icon: "success",
      title: "Your Query's has been succesfully sended",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  // ** Submit Query
  const onSubmit = () => {
    const values = onSend();
    const data = {
      application_id,
      query_rest: values,
    };
    useJwt
      .postNote(data)
      .then((res) => {
        if (res?.status === 200) {
          handleTopEnd();
          closeComposer();
          setQueryRaised(!queryRaised);
          setEditorState(() => EditorState.createEmpty());
        }
      })
      .catch((err) => {
        console.log(err?.response?.status);
      });
  };
  // ** compose query body
  const composeQuery = () => (
    <div id="compose-container" className="mt-2">
      <div className="editor-main-container">
        <div className="editor-header border-bottom">
          <div>
            <span className="text-danger">
              <CornerUpLeft className="me-2" size={14} /> {createdBy.email}
            </span>
          </div>
          <span onClick={closeComposer} className="icon-message">
            <X size={14} />
          </span>
        </div>
        <div id="message-editor">
          <Editor
            editorState={editorState}
            onEditorStateChange={setEditorState}
          />
          <div className="d-flex justify-content-end">
            <Button
              disabled={!validateForm()}
              color="success"
              className="my-3 me-3"
              onClick={() => onSubmit()}
            >
              Send <Send size={14} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  // ** Handle Compose Click
  const HandleComposeClick = () => {
    const element = document.getElementById("uw-compose-screen");
    if (element && element.classList.contains("hide-composeScreen")) {
      element.classList.remove("hide-composeScreen");
      element.classList.add("show-composeScreen");
    }
  };

  // ** Compose For UnderWriter
  const ComposeClickScreen = () => (
    <div
      id="uw-compose-screen"
      className="uw-compose-screen hide-composeScreen"
    >
      <div className="w-100 h-100 d-flex align-items-center justify-content-centerx overflow-scroll p-2">
        <ManualQueryUW info={{...info,application_id}} Id={"uw-compose-screen"} />
      </div>
    </div>
  );
  // ** Show Composer
  const handleReply = () => {
    const element = document.getElementById("compose-section");
    if (element.classList.contains("composeHide")) {
      element.classList.remove("composeHide");
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };
  // ** Close Composer
  const closeComposer = () => {
    const element = document.getElementById("compose-section");
    if (!element.classList.contains("composeHide")) {
      element.classList.add("composeHide");
      const veiwElement = document.getElementById("view-content");
      veiwElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };
  // ** seen for underwriter
  const readQueryByUnderWriter = () => {
    useJwt
      .markreadasunderwriter()
      .then((res) => {
        // to do somthing
      })
      .catch((error) => console.log(error?.response?.status));
  };
  // ** seen for merchant
  const readQueryByMerchant = () => {
    useJwt
      .markreadasmerchant()
      .then((res) => {
        // to do somthing
      })
      .catch((error) => console.log(error?.response?.status));
  };
  // ** Side bar active toggle
  const addAcitveClass = (id, user, text, data) => {
    if (!id) return;
    const { role } = currentUser;
    closeComposer();
    setHeaderContent(user);
    setCreatedBy(data?.created_by);
    setHtmlText(text);
    setCurrentId(id);
    const composeScreen = document.getElementById("uw-compose-screen");
    if (composeScreen.classList.contains("show-composeScreen")) {
      composeScreen.classList.remove("show-composeScreen");
      composeScreen.classList.add("hide-composeScreen");
    }
    const element = document.getElementById(id);
    if (previousActiveId !== id && previousActiveId) {
      const element = document.getElementById(previousActiveId);
      if (element) element.classList.remove("active-message");
    }
    if (element) {
      element.classList.add("active-message");
    }
    if (
      (data?.query_raised_by_underwriter && role == "merchant") ||
      ("iso" && !data?.mark_read_as_merchant)
    )
      readQueryByMerchant();
    else if (
      data?.query_raised_by_merchant &&
      role == "under_writer" &&
      !data?.mark_read_as_underwriter
    )
      readQueryByUnderWriter();

    const elementViewBody = document.getElementById("view-query-container");
    if (elementViewBody) elementViewBody.classList.add("show-content");
    setPreviousActiveId(id);
  };

  // ** setup required list in state
  const userSetup = (data, userType) => {
    const { role } = currentUser;
    const userRole = [
      "query_raised_by_admin",
      "query_raised_by_merchant",
      "query_raised_by_underwriter",
    ];
    let userIndex = -1;
    for (let i = 0; i < userRole.length; i++) {
      if (data[userRole[i]] == true) {
        userIndex = i;
        break;
      }
    }
    if (userType[userIndex]) {
      const key = Object.keys(userType[userIndex])[0];
      if (key == role) {
        // return userType[userIndex][key];
        return "You";
      } else if (key) {
        return userType[userIndex][key];
      } else {
        return "Unknown";
      }
    }
  };
  // ** Side List
  const sidebarList = (data) =>
    data.map((list, key) => {
      const userRole = {
        0: { admin: "Admin" },
        1: { merchant: "Merchant" },
        2: { under_writer: "Under Writer" },
        3: { iso: "ISO" },
      };
      const userType = userSetup(list, userRole);
      let date = new Date(list?.time).toLocaleDateString();
      if (date == new Date().toLocaleDateString()) date = "Today";
      const moonLanding = new Date(list?.time).toLocaleTimeString();
      return (
        <div
          key={key}
          id={`message-query-${key}`}
          onClick={() =>
            addAcitveClass(
              `message-query-${key}`,
              userType,
              list.query_rest,
              list
            )
          }
          className="message-query-list w-100 border-bottom"
        >
          <div className="d-flex align-itmes-basline">
            <div className="me-1" style={{ paddingTop: "3px" }}>
              <Avatar color="light-danger" content={userType} initials />
            </div>
            <div className="" style={{ paddingTop: "3px" }}>
              <span
                className="fw-bold"
                style={{ fontSize: "15px", whiteSpace: "nowrap" }}
              >
                {userType}
                <br />
                <span
                  className="text-body text-muted"
                  style={{ fontSize: "12px" }}
                >
                  message...
                </span>
              </span>
            </div>
          </div>
          <div className="time-and-date d-flex flex-nowrap">
            <span class="bullet bullet-success bullet-sm mx-50" />
            <span className="text-muted">{date}</span>
            <span className="text-muted">{moonLanding}</span>
          </div>
        </div>
      );
    });
  // ** geting list form be
  useEffect(() => {
    if (application_id) {
      useJwt
        .getNote({ application_id })
        .then((res) => {
          if (res?.status == 200 && res?.data?.length) {
            // ** set manula query list
            setQueryListing([...res?.data]);
          } else if (!res?.data?.length) {
            let flag = !loader;
            setLoader(flag);
          }
        })
        .catch((err) => {
          console.log(err?.response?.status);
        });
    }
  }, [application_id,queryRaised]);
// 
  return (
    <div
      className="veiw-query-container border d-flex "
      style={{ width: "calc(100vw-20px)", height: "80vh" }}
    >
      <div
        className="side-bar-query border-end position-relative h-100 overflow-scroll bg-white"
        style={{ flex: "25%" }}
      >
        <div
          className="side-bar-head p-1  d-flex justify-content-center align-items-center w-100  color-white position-absolute top-0"
          style={{ height: "65px" }}
        >
          {currentUser?.role == "under_writer" ? (
            <div>
              <Button onClick={HandleComposeClick} color="primary">
                Compose
              </Button>
            </div>
          ) : (
            <p
              className="fs-4 fw-bold text-center"
              style={{ whiteSpace: "nowrap" }}
            >
              Query Managment
            </p>
          )}
        </div>
        <div className="side-bar-list border-top">
          {queryList && sidebarList(queryList)}
        </div>
      </div>
      <div className="h-100" style={{ flex: "75%" }}>
        <div
          className="query-veiw-haed w-100 d-flex justify-content-between"
          style={{ height: "65px", padding: "10px" }}
        >
          {headerContent && headerView()}
        </div>
        <div
          className="message-body-container w-100"
          style={{ height: "calc(100% - 65px)" }}
        >
          {!headerContent && emptyMessageBodyscreen()}
          {/* {composeQu  ery()} */}
          {viewQueryMessage()}
          {ComposeClickScreen()}
        </div>
      </div>
    </div>
  );
};

export default index;

/*

 <>
      {" "}
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
          <Input value={info?.name} />
        </Col>
        <Col sm="12" className="mb-1">
          <Label>Merchant Email</Label>
          <Input value={info?.gmail} />
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
    </>

*/
