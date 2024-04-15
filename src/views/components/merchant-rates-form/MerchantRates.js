// ** React Imports
import { useEffect, useRef, useState } from "react";

// ** Custom Components
import Wizard from "@components/wizard";
import useJwt from "@src/dashboard/jwt/useJwt";

// ** Loader
import Loading from "../../../@core/components/spinner/Loading-spinner";

import BankSetting from "./merchant-rates-management/BankSetting";
import MerchantService from "./merchant-rates-management/MerchantServices";
import Rates from "./merchant-rates-management/Rates";
import Gateway from "./merchant-rates-management/GateWay";
import Preview from "./merchant-rates-management/Preview";
import extractData from "./merchant-rates-management/extractData";

import { useLocation } from "react-router-dom";

const MerchantRates = () => {
  const location = useLocation();
  const userId = location?.state?.userId;
  const created_by = JSON.parse(sessionStorage.getItem("created_by"));

  // ** states
  const [dynamicOptions, setDynamicOptions] = useState({});
  const [scroll, setScroll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stepper, setStepper] = useState(null);
  const [previewData, setPreviewData] = useState({});
  const [gotData, setGotData] = useState({
    bankSetting: {},
    merchantServices: {},
    gateWay: {},
    buyRates: {},
    saleRates: {},
  });
  const [mechentSerivesFields, setMechentSerivesFields] = useState({
    acuiringFields: {},
    paymentServicesField: [],
    cardType: [],
    maximum_ticket_size: "",
    minimum_ticket_size: "",
  });

  // ** store all form Data
  const [bankSetting, setBankSetting] = useState({});
  const [merchantService, setMerchantService] = useState({});
  const [rates, setRates] = useState({});
  const [ratesData, setRatesData] = useState({});
  const [createdBy, setCreatedBy] = useState({});
  const [buyRateUid, setBuyRateUid] = useState(null);
  const [saleRateUid, setSaleRateUid] = useState(null);

  // ** Submit Form
  const onSubmit = (gateWay) => {
    const { buyRateData, saleRateData } = rates;


    const data = { ...bankSetting, ...gateWay, ...merchantService };

    setPreviewData({
      butRates: { ...data, ...buyRateData },
      saleRate: { ...data, ...saleRateData },
      method: buyRateData?.uid ? "Update" : "Post",
    });
  };

  // ** Ref
  const ref = useRef(null);

  // ** State
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
          storeData={setBankSetting}
          data={gotData["bankSetting"]}
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
          storeData={setMerchantService}
          data={gotData["merchantServices"]}
        />
      ),
    },
    {
      id: "rates",
      title: "Rates",
      subtitle: "Enter Bank Rate and Sale Rate Detials",
      content: (
        <Rates
          stepper={stepper}
          scrollTop={setScroll}
          storeData={setRates}
          data={gotData["rates"]}
        />
      ),
    },
    {
      id: "social-links",
      title: "Gateway services",
      subtitle: "Enter Gateway Details",
      content: (
        <Gateway
          stepper={stepper}
          scrollTop={setScroll}
          action={onSubmit}
          createdBy={createdBy}
          data={gotData["gateWay"]}
        />
      ),
    },
    {
      id: "pr",
      title: "Preview",
      subtitle: "Enter Gateway Details",
      content: <Preview data={previewData} userId={userId} stepper={stepper} />,
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
    fetchRatesDetails(userId);
  }, []);

  // ** Scroll Top Page
  const scrollTopView = () => {
    const element = document.getElementById("top-div");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const userCreatedBy = () => {
    try {
      const created_by = JSON.parse(sessionStorage.getItem("created_by"));
      const { full_name, uid, user_type } = created_by;
      setCreatedBy({
        name: full_name,
        iso_id: uid,
        user_type: user_type == 3 ? true : false,
      });
    } catch (e) {
      // console.log(e);
    }
  };

  useEffect(() => {
    if (!Object.keys(ratesData)?.length) return;
    extractData(ratesData, setGotData);
  }, [ratesData]);
  // console.log(gotData)
  // ** Scroll Top handle
  useEffect(() => {
    userCreatedBy();
    scrollTopView();
  }, [scroll]);

  const fetchRatesDetails = async (application_id) => {
    const endpoints = ["getBuyRate", "getSaleRate"];
    if (!application_id) return;
    const results = {};
    for (let i = 0; i < endpoints.length; i++) {
      try {
        const response = await useJwt[endpoints[i]](application_id);
        // results[endpoints[i]] = response.data;
        setRatesData((pre) => {
          return { ...pre, [endpoints[i]]: response.data };
        });
      } catch (error) {
        console.log({ [endpoints[i]]: error });
      }
    }
  };

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
        <Wizard
          instance={(el) => setStepper(el)}
          ref={ref}
          steps={steps}
          options={{
            linear: true,
          }}
        />
      </div>
    </>
  );
};

export default MerchantRates;
