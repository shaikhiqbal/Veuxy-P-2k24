import { BarChart2, Edit, Home,Users } from "react-feather";

export default [
  {
    header: "ISO Dashboard",
  },
  {
    id: "iso-dahsboard",
    title: "Dashboard",
    icon:<Home />,
    navLink: "/isodashboard",
    action:'read',
    resource:"Agent"

  },
  {
    id: "merchants-list-iso-created",
    title: "Merchants",
    icon:<Edit />,
    navLink: "/iso/merchant",
    action:'read',
    resource:"Agent"

  },
  {
    id: "iso-report-and-statement",
    title: "Report & Statement",
    icon:<BarChart2 />,
    navLink: "/report-and-statement",
    action:'read',
    resource:"Agent"

  },
  {
    id: "user-management",
    title: "User Management",
    icon:<Users />,
    navLink: "/user-management",
    action:'read',
    resource:"Agent"

  },
];
