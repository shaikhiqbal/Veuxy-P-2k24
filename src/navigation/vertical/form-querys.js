// ** Icons Import
import { Circle, Hexagon } from "react-feather";

export default [
  {
    header: "Querys",
  },
  {
    id: "querys",
    title: "Query's",
    icon: <Hexagon size={20} />,
    badge: "light-warning",
    badgeText: "2",
    children: [
      {
        id: "company-profile",
        title: "Company Profile",
        icon: <Circle size={12} />,
        navLink: "/companyprofile",
      },
    ],
  },
];

// {
//     companyprofile
//     companyownershipprofile
//     businessprofile
//     securitymeasures
//     settlementbankdetail
//     merchantcontactdocumentupload
// }
