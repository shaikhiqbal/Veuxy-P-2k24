// import React from "react";
// import Bank from "./Bank";

// export default function DashBoardNavigation() {
//   return (
//     <div>
//       <div class="card text-center">
//         <div class="card-header">
//           <ul class="nav nav-tabs card-header-tabs">
//             <li class="nav-item">
//               <a class="nav-link active" aria-current="true" href="#">
//                 Active
//               </a>
//             </li>
//             <li class="nav-item">
//               <a class="nav-link" href="./bank">
//                 Link
//               </a>
//             </li>
//             <li class="nav-item">
//               <a class="nav-link" href="#">
//                 Link
//               </a>
//             </li>
//             <li class="nav-item">
//               <a class="nav-link" href="#">
//                 Link
//               </a>
//             </li>
//             <li class="nav-item">
//               <a class="nav-link" href="#">
//                 Link
//               </a>
//             </li>
//             <li class="nav-item">
//               <a
//                 class="nav-link disabled"
//                 href="#"
//                 tabindex="-1"
//                 aria-disabled="true"
//               >
//                 Disabled
//               </a>
//             </li>
//           </ul>
//         </div>
//         <div class="card-body">
//           <h5 class="card-title">Special title treatment</h5>
//           <p class="card-text">
//             With supporting text below as a natural lead-in to additional
//             content.
//           </p>
//           <a href="#" class="btn btn-primary">
//             Go somewhere
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// }

import { Home, Activity, ShoppingCart } from "react-feather";

export default [
  {
    id: "dashboards",
    title: "Dashboards",
    icon: <Home />,
    children: [
      {
        id: "analyticsDash",
        title: "Analytics",
        icon: <Activity />,
        navLink: "/dashboard/analytics",
      },
      {
        id: "eCommerceDash",
        title: "eCommerce",
        icon: <ShoppingCart />,
        navLink: "/dashboard/ecommerce",
      },
    ],
  },
];
