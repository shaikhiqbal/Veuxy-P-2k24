import { CreditCard, File, PieChart, Settings, UserPlus} from "react-feather";
import Setting from "../../views/pages/admin/component/Setting";

  export default [
  {
    header: "Admin",
  },
  {
    id: "user-management",
    title: "User Management",
    icon: <UserPlus size={12} />,
    navLink: "/admin/usermanagement",
    action: "admin",
    resource: "owner",
  },
  {

    id: "application",
    title: "Application",
    icon: <File size={12} />,
    navLink: "/merchants-status",
    action: "admin",
    resource: "owner",
  },
  // {

  //   id: "rates",
  //   title: "Rates",
  //   icon: <PieChart size={12} />,
  //   navLink: "/rateform",
  //   action: "admin",
  //   resource: "owner",
  // },
  {
    id: "setting",
    title: "Setting",
    icon: <Settings size={12} />,
    navLink: "/admin/setting",
    action: "admin",
    resource: "owner",
  },
];
