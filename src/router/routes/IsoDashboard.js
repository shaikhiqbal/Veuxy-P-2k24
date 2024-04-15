import { lazy } from "react";

const IsoDashboard = lazy(() =>
  import("../../views/pages/iso-dashboard/components/Dashboard")
);
const IsoMerchant = lazy(() =>
  import("../../views/pages/iso-dashboard/components/Merchant")
);
const ReportAndStatement = lazy(() =>
  import("../../views/pages/iso-dashboard/components/Report")
);
const UserManagement = lazy(() =>
  import("../../views/pages/iso-dashboard/components/Usermanagement")
);
const ApplicationForm = lazy(() =>
  import(
    "../../views/pages/iso-dashboard/components/merchant-creation/ApplicationForms"
  )
);
const BasicInfo = lazy(() =>
  import(
    "../../views/pages/iso-dashboard/components/merchant-creation/BasicInfo"
  )
);
const Timeline = lazy(() =>
  import("../../views/pages/iso-dashboard/components/timeline")
);
const MerchantCard = lazy(() =>
  import("../../views/components/merchant-management/StatusCard")
);
const IsoApplicationForm = lazy(() =>
  import("../../views/pages/application-form/iso-creat-application")
);
const ISODashboard = [
  {
    path: "/isodashboard",
    element: <IsoDashboard />,
  },
  {
    path: "/iso/merchant",
    element: <IsoMerchant />,
  },
  {
    path: "/report-and-statement",
    element: <ReportAndStatement />,
  },
  {
    path: "/user-management",
    element: <UserManagement />,
  },
  {
    path: "/applicationform",
    element: <ApplicationForm />,
  },
  {
    path: "/basicinformation",
    element: <BasicInfo />,
  },
  {
    path: "/timeline",
    element: <Timeline />,
  },
  {
    path: "/details",
    element: <MerchantCard />,
  },
  {
    path: "/application-create",
    element: <IsoApplicationForm />,
  },
];

export default ISODashboard;
