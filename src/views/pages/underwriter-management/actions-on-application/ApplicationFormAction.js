import React, { useState } from "react";

import { Button, Input, Label } from "reactstrap";

import ReasonModal from "../../../components/application-7forms/reject-reason-modal/ReasonModal";

import useJwt from "@src/dashboard/jwt/useJwt";
import { useNavigate } from "react-router-dom";

const ApplicationFormAction = ({ id = "" }) => {
  // ** state
  const [state, setState] = useState("select");
  const [isRejected, setIsRejected] = useState(false);
  const [reasonForReject, setReasonForReject] = useState(null);

  // ** navigate
  const navigate = useNavigate();

  const currentState = {
    AUW: { color: "relief-success", name: "Approved" },
    INC: { color: "relief-warning", name: "Hold" },
    REJ: { color: "relief-danger", name: "Reject" },
  };

  const onState = () => state !== "select";
  const onSubmit = () => {
    if (state == "REJ") {
      if (!reasonForReject) {
        setIsRejected(!isRejected);
        return;
      }
    }
    useJwt
      .applicationApproved({uid: id,status: state,reason: reasonForReject,})
      .then((res) => {
        if (res?.status === 200) {
          switch (state) {
            case "AUW":
              navigate("/merchant-rates", { state: { userId: id } });
              break;
            default:
              navigate("/merchants-status");
          }
        }
      })
      .catch((err) => console.log(err?.response?.status));
  };

  const getReasoneForRejecting = (value) => setReasonForReject(value);
// console.log(currentState[state])
  //**  applicationAction
  return (
    <div className="d-flex gy-1">
      <Input
        type="select"
        value={state}
        onChange={(e) => setState(e.target.value)}
        className="mx-2"
        style={{ width: "100px" }}
      >
        <option defaultChecked disabled>
          select
        </option>
        <option value={"AUW"}>Approve</option>
        <option value={"INC"}>Hold</option>
        <option value={"REJ"}>Reject</option>
      </Input>

      <Button
        disabled={state === "select"}
        color={onState() ? currentState[state]["color"] : "relief-secondary"}
        onClick={onSubmit}
      >
        Action
      </Button>
      <ReasonModal
        open={isRejected}
        onSubmit={getReasoneForRejecting}
        setIsRejected={setIsRejected}
      />
    </div>
  );
};

export default ApplicationFormAction;
