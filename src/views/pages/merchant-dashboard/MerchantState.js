import React, { useEffect, useState } from "react";

import useJwt from "@src/dashboard/jwt/useJwt";
import { useNavigate } from "react-router-dom";

import StatusCard from "../../components/merchant-management/StatusCard";

// ** Styles
import "@styles/react/libs/tables/react-dataTable-component.scss";

const MerchantDashboard = () => {
  const [isApplictionCreated, setIsApplicationCreated] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    useJwt.getApplication().then((res) => {
      if (res?.status === 200 && res?.data?.length) {
        setIsApplicationCreated(true);
      } else {
        console.log(res);
        // navigate("/application-create");
        navigate("/application-form");
      }
    });
  }, []);

  return <>{isApplictionCreated ? <StatusCard /> : "Wait"}</>;
};

export default MerchantDashboard;
