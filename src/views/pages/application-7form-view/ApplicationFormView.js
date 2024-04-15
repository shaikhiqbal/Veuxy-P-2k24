// ** React Imports
import { useRef, useState, useEffect } from "react";

// ** Custom Components
import Wizard from "@components/wizard";

import { useLocation } from "react-router-dom";

import useJwt from "@src/dashboard/jwt/useJwt";

// ** Steps
import CompanyProfileView from "../../components/application-7forms/company-profile/CompanyProfileView";
import CompanyOwnershipView from "../../components/application-7forms/company-owner-ship/CompanyOwnershipView";
import BusinessProfileView from "../../components/application-7forms/business-profile/BusinessProfileView";
import SecurityMeasureView from "../../components/application-7forms/security-measure/SecurityMeasureView";
import SettlementBankView from "../../components/application-7forms/settlement-bank/SettlementBankView";
import DocumentView from "../../components/application-7forms/document/DocumentView";
import ContactView from "../../components/application-7forms/merchant-contact/ContactView";



// ** Application Action
import UnderWriterAction from "../underwriter-management/actions-on-application/ApplicationFormAction";
import AdminAction from "../admin-management/applicationform-action/ApplicationFormAction";

const ApplicationFormView = () => {
  // ** Ref
  const ref = useRef(null);
  const location = useLocation();

  let userInfo = localStorage.getItem("userData");
  userInfo = JSON.parse(userInfo);

  // ** State
  const [stepper, setStepper] = useState(null);
  const [userId, setUserId] = useState(location?.state?.application_id);
  const [applicationFormsDetails, setApplicationFormsDetails] = useState("");
  const [userRole, setUser] = useState(userInfo?.role);
  const [loader, setLoader] = useState(true);

  const onNext = (action) => {
    return action == "next" ? stepper.next() : stepper.previous();
  };

  const ActionOnForm = () => {
    try {
      if (userInfo?.role == "under_writer") {
        return <UnderWriterAction id={userId} />;
      } else if (userInfo?.role == "admin") {
        return <AdminAction id={userId} />;
      }
    } catch (err) {
      throw Error("you are not authorized");
    }
  };

  const steps = [
    {
      id: "company-profile-view",
      title: "Company Profile",
      subtitle: "Details Of User Company Profile ",
      content: (
        <CompanyProfileView
          setpper={onNext}
          type="wizard-vertical"
          data={applicationFormsDetails?.company_profile}
        />
      ),
    },
    {
      id: "company-ownership-view",
      title: "Company Ownership",
      subtitle: "Details Of User Company Ownership",
      content: (
        <CompanyOwnershipView
          setpper={onNext}
          type="wizard-vertical"
          data={applicationFormsDetails?.company_ownership}
        />
      ),
    },
    {
      id: "business-profile-view",
      title: "Business Profile",
      subtitle: "Details Of User Business Profile",
      content: (
        <BusinessProfileView
          setpper={onNext}
          type="wizard-vertical"
          data={applicationFormsDetails?.business_profile}
        />
      ),
    },
    {
      id: "security-measure-view",
      title: "Security Measure",
      subtitle: "Details Of User Security Measure",
      content: (
        <SecurityMeasureView
          setpper={onNext}
          type="wizard-vertical"
          data={applicationFormsDetails?.security_measure}
        />
      ),
    },
    {
      id: "settlement-bank-view",
      title: "Settlement Bank",
      subtitle: "Details Of User Settlement Bank",
      content: (
        <SettlementBankView
          setpper={onNext}
          type="wizard-vertical"
          data={applicationFormsDetails?.settlement_bank}
        />
      ),
    },
    {
      id: "document-view",
      title: "Document",
      subtitle: "Details Of User Document",
      content: (
        <DocumentView
          setpper={onNext}
          type="wizard-vertical"
          data={applicationFormsDetails?.document}
        />
      ),
    },
    {
      id: "contacts-views",
      title: "Contacts",
      subtitle: "Details Of User Contacts",
      content: (
        <ContactView
          setpper={stepper}
          type="wizard-vertical"
          data={applicationFormsDetails?.contacts}
          action={ActionOnForm}
        />
      ),
    },
  ];

  useEffect(() => {
    if (!userId) return;
    useJwt
      .application_for_dashboard(userId)
      .then((res) => {
        if (res?.status === 200 && res?.data) {
          const {
            bp_application,
            cop_application,
            cp_application,
            mc_application,
            sbd_application,
            sm_application,
            uploadeddocument_application,
          } = res?.data;
          setApplicationFormsDetails({
            business_profile: bp_application || [],
            company_ownership: cop_application || [],
            company_profile: cp_application || [],
            contacts: mc_application || [],
            settlement_bank: sbd_application || [],
            security_measure: sm_application || [],
            document: uploadeddocument_application || [],
          });
        }
        setLoader(!loader);
      })
      .catch((err) => {
        if (err?.response?.status) {
          setLoader(false);
          console.log(err?.response?.data?.message);
        }
      });
  }, [userId]);

  return (
    <div className="vertical-wizard">
      <Wizard
        type="vertical"
        ref={ref}
        steps={steps}
        options={{
          linear: false,
        }}
        instance={(el) => setStepper(el)}
      />
    </div>
  );
};

export default ApplicationFormView;
