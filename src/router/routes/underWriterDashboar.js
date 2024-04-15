import { lazy } from "react";

const ApplicationTab = lazy(() =>
  import(
    "../../views/pages/underwriter-management/application-status/ApplicationTab"
  )
);

const underWriter = [
  {
    path: "/merchants-status",
    element: <ApplicationTab />,
  },
];

export default underWriter;
