import React, { useEffect, useState } from "react";

import ApplicationForm from "./application-pages";
import { useLocation } from "react-router-dom";

const Application = (props) => {
  const { application_id } = props;

  return (
    <div className="w-100 p-2">
      <ApplicationForm application_id={application_id} />
    </div>
  );
};

export default Application;
