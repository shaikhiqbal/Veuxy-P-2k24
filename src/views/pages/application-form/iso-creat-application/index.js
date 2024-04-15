// ** React Imports
import { useEffect, useRef, useState } from "react";

// ** Application Forms
import CompanyProfile from "./CompanyProfile";
import BusinessProfile from "./BusinessProfile";
import CompnayOwnership from "./CompnayOwnership";
import Settlement from "./Settlement";
import SecurityMeasure from "./SecurityMeasure";
import Document from "./Document";
import MerchantContact from './MerchantContact'

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
  const [id, setId] = useState(appId?appId:"2983748");
  const [cop_document, setCop_Document] = useState(false);



  const steps = [
    {
      id: "company-profile",
      title: "Company Profile",
      subtitle: "Enter Your Comapny Details.",
      icon: <FileText size={18} />,
      content: (
        <CompanyProfile id={id} stepper={stepper} type="wizard-modern" />
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
        <CompnayOwnership id={id} stepper={stepper} setCop_Document={setCop_Document} type="wizard-modern" />
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
      content: <Document id={id} stepper={stepper} type="wizard-modern" cop_document={cop_document}/>,
    },
    {
      id: "merchant-contact",
      title: "Contacts",
      subtitle: "Enter Contact Details.",
      icon: <FileText size={18} />,
      content: <MerchantContact id={id} stepper={stepper} type="wizard-modern" />,
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
