import { lazy } from "react";

const CompanyProfile = lazy(() =>
  import("../../views/pages/user-information/CompanyProfile")
);
const COP = lazy(() =>
  import("../../views/pages/user-information/ CompanyOwnershipProfileDirector")
);
const BusinessProfile = lazy(() =>
  import("../../views/pages/user-information/BusinessProfile")
);
const SecurityMeasures = lazy(() =>
  import("../../views/pages/user-information/SecurityMeasures")
);
const SBD = lazy(() =>
  import("../../views/pages/user-information/SettlementBankDetails")
);
const MerchanContact = lazy(() =>
  import("../../views/pages/user-information/AllContact")
);
const DocumentUpload = lazy(() =>
  import("../../views/pages/user-information/FileUpload")
);

const MerchantForms = [
  {
    path: "/companyprofile",
    element: <CompanyProfile />,
  },
  {
    path: "/companyownershipprofile",
    element: <COP />,
  },
  {
    path: "/businessprofile",
    element: <BusinessProfile />,
  },
  {
    path: "/securitymeasures",
    element: <SecurityMeasures />,
  },
  {
    path: "/settlementbankdetail",
    element: <SBD />,
  },
  {
    path: "/merchantcontact",
    element: <MerchanContact />,
  },
  {
    path: "/documentupload",
    element: <DocumentUpload />,
  },
];
export default MerchantForms;
