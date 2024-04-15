import { lazy } from "react";

// const Admin =lazy(()=>import('../../views/pages/admin'));
const UserManagement=lazy(()=>import('../../views/pages/admin/component/UserManagement'));
// const UserManagement = lazy(() =>
//   import("../../views/pages/admin-management/user-role-managment/UsersTable")
// );
const Application = lazy(() =>
  import("../../views/pages/admin/component/Application")
);
const Setting = lazy(() => import("../../views/pages/admin/component/Setting"));
const Rates = lazy(() => import("../../views/pages/admin/component/rates"));
const RatesPreview=lazy(()=>import('../../views/pages/admin-management/underwrite-by-approved/AprovedByUW'))

const Admindashboard = [
  {
    path: "/admin/usermanagement",
    element: <UserManagement />,
  },
  // {
  //   path: "/rateform",
  //   element: <Rates />,
  // },
  {
    path: "/admin/setting",
    element: <Setting />,
  },
  {
    path: "/admin/preview",
    element: <RatesPreview />,
  },
];

export default Admindashboard;
