import { element } from "prop-types";
import { lazy } from "react";

const ApplicationForm = lazy(() =>
  import("../../views/pages/application-form")
);
const CreateQueryTemplate = lazy(() =>
  import("../../views/pages/common-component/CreatQueryTemplate")
);
const ViewQuery = lazy(() =>
  import("../../views/pages/common-component/view-query")
);

const ApplicationFormView = lazy(() =>
  import("../../views/pages/application-7form-view/ApplicationFormView")
);

const MerchantRates=lazy(()=>import('../../views/components/merchant-rates-form/MerchantRates'));

const MerchantRatesView=lazy(()=>import('../../views/components/merchant-rates-form/MerchantRatesView'))

const Dashboard = [
  {
    path: "/dashboard/application-form",
    element: <ApplicationForm />,
  },
  {
    path: "/creat-query-template",
    element: <CreateQueryTemplate />,
  },
  {
    path: "/view-query",
    element: <ViewQuery />,
  },
  {
    path: "/application-form-view",
    element: <ApplicationFormView />,
  },
  {
    path: "/merchant-rates",
    element: <MerchantRates />,
  },
  {
    path: "/merchant-rates-view",
    element: <MerchantRatesView />,
  },

];
export default Dashboard;
