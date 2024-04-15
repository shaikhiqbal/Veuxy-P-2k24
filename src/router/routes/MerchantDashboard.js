import { lazy } from "react";

const CreatApplication = lazy(() =>
  import("../../views/pages/application-form/merchant-creat-application")
);

const MerchantState = lazy(() =>
  import("../../views/pages/merchant-dashboard/MerchantState")
);
// const CompanyProfile = lazy(() =>
//   import("../../views/pages/merchant-dashboard/component/application-form/Cp")
// );
const CompanyProfile = lazy(() =>
  import(
    "../../views/pages/application-form/merchant-creat-application/CompanyProfile"
  )
);

const CompanyOwners = lazy(() =>
  import(
    "../../views/components/application-7forms/company-owner-ship/CompanyOwners"
  )
);

// const BusinessProfile = lazy(() =>
//   import("../../views/pages/merchant-dashboard/component/application-form/Bp")
// );

const BusinessProfile = lazy(() =>
  import(
    "../../views/components/application-7forms/business-profile/BusinessProfile"
  )
);

// const SecurityMeasure = lazy(() =>
//   import("../../views/pages/merchant-dashboard/component/application-form/Sm")
// );

const SecurityMeasure = lazy(() =>
  import(
    "../../views/components/application-7forms/security-measure/SecurityMeasure"
  )
);

// const SettlementBank = lazy(() =>
//   import("../../views/pages/merchant-dashboard/component/application-form/Sbd")
// );
const SettlementBank = lazy(() =>
  import("../../views/components/application-7forms/settlement-bank/Settlement")
);

// const MerchantContact = lazy(() =>
//   import("../../views/pages/merchant-dashboard/component/application-form/Mc")
// );
// const Document = lazy(() =>
//   import("../../views/pages/merchant-dashboard/component/application-form/Doc")
// );
// const Document = lazy(() =>
//   import("../../views/components/application-7forms/document/Document")
// );


const MerchantDashboards = [
  {
    path: "/merchant-status",
    element: <MerchantState />,
  },
  {
    path: "/application-form",
    element: <CreatApplication />,
  },
  {
    path: "/merchant/cp-application",
    element: <CompanyProfile />,
  },
  {
    path: "/merchant/company-owners-application",
    element: <CompanyOwners />,
  },
  {
    path: "/merchant/business-profile-application",
    element: <BusinessProfile />,
  },
  {
    path: "/merchant/security-measure-application",
    element: <SecurityMeasure />,
  },
  {
    path: "merchant/settlebank-application",
    element: <SettlementBank />,
  },
  // {
  //   path: "/merchant/merchant-contact-application",
  //   element: <MerchantContact />,
  // },
  // {
  //   path: "/merchant/document-application",
  //   element: <Document />,
  // },
];
export default MerchantDashboards;
