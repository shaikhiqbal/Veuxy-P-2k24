// ** React Imports
import { useEffect, useRef, useState } from "react";

// ** Custom Components
import Wizard from "@components/wizard";
import useJwt from "@src/dashboard/jwt/useJwt";

// ** Steps
import BankSetting from "./steps/BankSetting";
import MerchantService from "./steps/MerchantServices";
import Rates from "./steps/Rates";
import Gateway from "./steps/Gateway";
import Loading from "../../../../../@core/components/spinner/Loading-spinner";

const WizardHorizontal = () => {
  // ** states
  const [dynamicOptions, setDynamicOptions] = useState({});
  const [scroll, setScroll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mechentSerivesFields, setMechentSerivesFields] = useState({
    acuiringFields: {},
    paymentServicesField: [],
    cardType: [],
    maximum_ticket_size: "",
    minimum_ticket_size: "",
  });
  // ** Ref
  const ref = useRef(null);
  // ** State
  const [stepper, setStepper] = useState(null);

  // ** Form steps
  const steps = [
    {
      id: "account-details",
      title: "Acquiring Bank Setting",
      subtitle: "Enter Required Details.",
      content: (
        <BankSetting
          dynamicOptions={dynamicOptions}
          setMechentSerivesFields={setMechentSerivesFields}
          stepper={stepper}
          scrollTop={setScroll}
        />
      ),
    },
    {
      id: "merchant-services",
      title: "Merchant Services",
      subtitle: "Enter Services Details",
      content: (
        <MerchantService
          stepper={stepper}
          dynamiceFields={mechentSerivesFields}
          scrollTop={setScroll}
        />
      ),
    },
    {
      id: "rates",
      title: "Rates",
      subtitle: "Enter Bank Rate and Sale Rate Detials",
      content: <Rates stepper={stepper} scrollTop={setScroll} />,
    },
    {
      id: "social-links",
      title: "Gateway services",
      subtitle: "Enter Gateway Details",
      content: <Gateway stepper={stepper} scrollTop={setScroll} />,
    },
  ];

  // ** Required Endpoints
  const endpoints = [
    "acquiringBank",
    "merchantCategory",
    "merchantType",
    "settlement",
    "creditCard",
    "paymentServices",
    "currency",
  ];

  // ** Fetch API
  useEffect(() => {
    const fetchData = async () => {
      // {{debugger}}
      const results = {};
      for (let i = 0; i < endpoints.length; i++) {
        try {
          const response = await useJwt[endpoints[i]]();
          results[endpoints[i]] = response.data;
        } catch (error) {
          console.log(error);
        }
        if (i == endpoints.length - 1) {
            setLoading(false);
        }
      }
      if (results) setDynamicOptions({ ...results });
    };
    fetchData();
  }, []);

  const scrollTopView = () => {
    const element = document.getElementById("top-div");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  // ** Scroll Top
  useEffect(() => scrollTopView(), [scroll]);

  if (loading) {
    return (
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: "80vh", width: "100%" }}
      >
        <Loading />
      </div>
    );
  }
  
  return (
    <>
      <div id="top-div" />
      <div className="horizontal-wizard">
        <Wizard instance={(el) => setStepper(el)} ref={ref} steps={steps} />
      </div>
    </>
  );
};

export default WizardHorizontal;
