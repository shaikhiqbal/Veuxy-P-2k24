// ** React Imports
import { useEffect, useRef, useState } from "react";

// ** Application Forms
import CompanyProfile from "./CompanyProfile";
import BusinessProfile from "../iso-creat-application/BusinessProfile";
import CompnayOwnership from "../iso-creat-application/CompnayOwnership";
import Settlement from "../iso-creat-application/Settlement";
import SecurityMeasure from "../iso-creat-application/SecurityMeasure";
import Document from "../iso-creat-application/Document";


// ** Custom Components
import Wizard from "@components/wizard";

//**  Icon
import { FileText } from "react-feather";

// ** Loction Router
import { useLocation } from "react-router-dom";

const index = () => {
  // ** Ref
  const ref = useRef(null);

  const appId = useLocation().state?.application_id;

  // ** State
  const [stepper, setStepper] = useState(null);
  const [id, setId] = useState(appId ? appId : "");
  const [cop_document, setCop_Document] = useState(false);

  const steps = [
    {
      id: "company-profile",
      title: "Company Profile",
      subtitle: "Enter Your Comapny Details.",
      icon: <FileText size={18} />,
      content: (
        <CompanyProfile
          id={id}
          setId={setId}
          stepper={stepper}
          type="wizard-modern"
        />
      ),
    },
    {
      id: "business-profile",
      title: "Business Profile",
      subtitle: "Enter Your Business Details.",
      icon: <FileText size={18} />,
      content: (
        <BusinessProfile id={id} stepper={stepper} type="wizard-modern" />
      ),
    },
    {
      id: "company-owner",
      title: "Company OwnerShip",
      subtitle: "Enter Company Owner's Details.",
      icon: <FileText size={18} />,
      content: (
        <CompnayOwnership id={id} stepper={stepper} type="wizard-modern" setCop_Document={setCop_Document}/>
      ),
    },
    {
      id: "settlement",
      title: "Settlement Bank",
      subtitle: "Enter Bank Details.",
      icon: <FileText size={18} />,
      content: <Settlement id={id} stepper={stepper} type="wizard-modern" />,
    },
    {
      id: "security-measure",
      title: "Security Measure",
      subtitle: "Enter Security Details.",
      icon: <FileText size={18} />,
      content: (
        <SecurityMeasure id={id} stepper={stepper} type="wizard-modern" />
      ),
    },
    {
      id: "document",
      title: "Document",
      subtitle: "upload required Document.",
      icon: <FileText size={18} />,
      content: <Document id={id} stepper={stepper} cop_document={cop_document} type="wizard-modern" />,
    },
  ];

  return (
    <>
      <Wizard
        type="modern-horizontal"
        ref={ref}
        steps={steps}
        options={{
          linear: false,
        }}
        instance={(el) => setStepper(el)}
      />
    </>
  );
};

export default index;
