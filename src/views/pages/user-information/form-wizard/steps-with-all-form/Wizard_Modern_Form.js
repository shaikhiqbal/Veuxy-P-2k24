// ** React Imports
import { useRef, useState } from "react";

// ** Custom Components
import Wizard from "../wizard";

// ** Steps
// import CompanyProfile from "../form-steps/Company_Profile";
import CompanyProfile from "../../CompanyProfile";
import CompanyownerProfile from "../../ CompanyOwnershipProfileDirector";
import BusinessProfile from "../../BusinessProfile";
import SecurityMeasure from "../../SecurityMeasures";
import SettlementBankDetail from "../../SettlementBankDetails";
import MerchantContact from "../../AllContact";
import FileUpload from "../../FileUpload";
// ** Icons Imports
import { FileText, User, MapPin, Link } from "react-feather";

const WizardModernVertical = () => {
  // ** Ref
  const ref = useRef(null);

  // ** State
  const [stepper, setStepper] = useState(null);
  const [counter, setCounter] = useState(0);
  const steps = [
    {
      id: "company-profile",
      title: "Company",
      // subtitle: "Enter Your Company Details.",
      // icon: <FileText size={18} />,
      content: (
        <CompanyProfile
          stepper={stepper}
          setCounter={setCounter}
          counter={counter}
          type="modern-vertical"
        />
      ),
    },
    {
      id: "company-owner-profile",
      title: " OwnerShip ",
      // subtitle: "Add Companay Ownership Info",
      // icon: <User size={18} />,
      content: (
        <CompanyownerProfile
          stepper={stepper}
          setCounter={setCounter}
          counter={counter}
          type="modern-vertical"
        />
      ),
    },
    {
      id: "business-profile",
      title: "Business",
      // subtitle: "Enter Business Profile Datails",
      // icon: <MapPin size={18} />,
      content: (
        <BusinessProfile
          stepper={stepper}
          setCounter={setCounter}
          counter={counter}
          type="modern-vertical"
        />
      ),
    },
    {
      id: "security-measure",
      title: "Security",
      // subtitle: "Add Social Links",
      // icon: <Link size={18} />,
      content: (
        <SecurityMeasure
          stepper={stepper}
          setCounter={setCounter}
          counter={counter}
          type="modern-vertical"
        />
      ),
    },
    {
      id: "sbd",
      title: "Settlement",
      // subtitle: "Add Settlement Bank Details ",
      // icon: <Link size={18} />,

      content: (
        <SettlementBankDetail
          stepper={stepper}
          setCounter={setCounter}
          counter={counter}
          type="modern-vertical"
        />
      ),
    },
    {
      id: "merchant-contant",
      title: "Contacts",
      // subtitle: "Enter All Type Contact ",
      // icon: <Link size={18} />,
      content: (
        <MerchantContact
          stepper={stepper}
          setCounter={setCounter}
          counter={counter}
          type="modern-vertical"
        />
      ),
    },
    {
      id: "post-file",
      title: "Documents",
      // subtitle: "Add Social Links",
      // icon: <Link size={18} />,
      content: (
        <FileUpload
          stepper={stepper}
          setCounter={setCounter}
          counter={counter}
          type="modern-vertical"
        />
      ),
    },
  ];

  return (
    <Wizard
      type="modern-horizontal"
      ref={ref}
      steps={steps}
      options={{
        linear: false,
      }}
      instance={(el) => setStepper(el)}
    />
  );
};
export default WizardModernVertical;
