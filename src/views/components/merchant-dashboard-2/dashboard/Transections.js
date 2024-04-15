import React, { Fragment, useState } from "react";
import {
  Activity,
  Check,
  RefreshCcw,
  Shield,
  Slash,
  XOctagon,
} from "react-feather";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import TransctionTable from "./TransctionTable";
const Tablist = [
  {
    title: "Last 10 All Transction",
    icon: <Shield size={14} />,
    table: <TransctionTable />,
  },
  {
    title: "Last 10 Approved Transction",
    icon: <Check size={14} />,
    table: <TransctionTable />,
  },
  {
    title: "Last 10 Declined Transction",
    icon: <XOctagon size={14} />,
    table: <TransctionTable />,
  },
  {
    title: "Last 10 PreAuth Transction",
    icon: <Activity size={14} />,
    table: <TransctionTable />,
  },
  {
    title: "Last 10 Void Transction",
    icon: <Slash size={14} />,
    table: <TransctionTable />,
  },
  {
    title: "Last 10 Refund Transction",
    icon: <RefreshCcw size={14} />,
    table: <TransctionTable />,
  },
];
const fakeDb = [
  {
    start_date: "18/10/12",
    id: "424",
    full_name: "Iqbal",
    product_amt: "23$",
    contact_num: "789363737",
  },
];
const Transections = () => {
  const [active, setActive] = useState("1");
  const [tabContent, setTabContent] = useState(
    tabContentFunc({ active, title:"Last 10 All Transction" })
  );

  const toggle = (tab,title) => {
    if (active !== tab) {
      setActive(tab);
      setTabContent(tabContentFunc({ active: tab, title }));
    }
  };

  function tabContentFunc(details) {
    const { active,title } = details;
    return (
      <TabPane tabId={active + ""}>
        <TransctionTable data={[...fakeDb]} title={title} />
      </TabPane>
    );
  }
  //   console.log(active)
  return (
    <Fragment>

      <Nav tabs>
        {Tablist.map((tab, idx) => (
          <NavItem>
            <NavLink
              active={active == (idx + 1).toString()}
              onClick={() => {
                toggle((idx + 1).toString(),tab.title);
              }}
            >
              {tab.icon}
              <span className="align-middle">{tab.title}</span>
            </NavLink>
          </NavItem>
        ))}
      </Nav>
      <TabContent className="py-50" activeTab={active}>
        {tabContent}
      </TabContent>
      {/* <TabContent className='py-50' activeTab={active}>
    <TabPane tabId='1'>
      <p>
        Candy canes donut chupa chups candy canes lemon drops oat cake wafer. Cotton candy candy canes marzipan
        carrot cake. Sesame snaps lemon drops candy marzipan donut brownie tootsie roll. Icing croissant bonbon
        biscuit gummi bears. Pudding candy canes sugar plum cookie chocolate cake powder croissant.
      </p>
      <p>
        Carrot cake tiramisu danish candy cake muffin croissant tart dessert. Tiramisu caramels candy canes
        chocolate cake sweet roll liquorice icing cupcake. Candy cookie sweet roll bear claw sweet roll.
      </p>
    </TabPane>
    <TabPane tabId='2'>
      <p>
        Dragée jujubes caramels tootsie roll gummies gummies icing bonbon. Candy jujubes cake cotton candy. Jelly-o
        lollipop oat cake marshmallow fruitcake candy canes toffee. Jelly oat cake pudding jelly beans brownie lemon
        drops ice cream halvah muffin. Brownie candy tiramisu macaroon tootsie roll danish.
      </p>
      <p>
        Croissant pie cheesecake sweet roll. Gummi bears cotton candy tart jelly-o caramels apple pie jelly danish
        marshmallow. Icing caramels lollipop topping. Bear claw powder sesame snaps.
      </p>
    </TabPane>
    <TabPane tabId='3'>
      <p>
        Gingerbread cake cheesecake lollipop topping bonbon chocolate sesame snaps. Dessert macaroon bonbon carrot
        cake biscuit. Lollipop lemon drops cake gingerbread liquorice. Sweet gummies dragée. Donut bear claw pie
        halvah oat cake cotton candy sweet roll. Cotton candy sweet roll donut ice cream.
      </p>
      <p>
        Halvah bonbon topping halvah ice cream cake candy. Wafer gummi bears chocolate cake topping powder. Sweet
        marzipan cheesecake jelly-o powder wafer lemon drops lollipop cotton candy.
      </p>
    </TabPane>
  </TabContent> */}
    </Fragment>
  );
};
export default Transections;

//  <Fragment>
//   <Nav tabs>
//     <NavItem>
//       <NavLink
//         active={active === '1'}
//         onClick={() => {
//           toggle('1')
//         }}
//       >
//         <Home size={14} />
//         <span className='align-middle'>Home</span>
//       </NavLink>
//     </NavItem>
//     <NavItem>
//       <NavLink
//         active={active === '2'}
//         onClick={() => {
//           toggle('2')
//         }}
//       >
//         <Settings size={14} />
//         <span className='align-middle'>Service</span>
//       </NavLink>
//     </NavItem>
//     <NavItem>
//       <NavLink disabled>
//         <EyeOff size={14} />
//         <span className='align-middle'>Disabled</span>
//       </NavLink>
//     </NavItem>
//     <NavItem>
//       <NavLink
//         active={active === '3'}
//         onClick={() => {
//           toggle('3')
//         }}
//       >
//         <User size={14} />
//         <span className='align-middle'>Account</span>
//       </NavLink>
//     </NavItem>
//   </Nav>
//   <TabContent className='py-50' activeTab={active}>
//     <TabPane tabId='1'>
//       <p>
//         Candy canes donut chupa chups candy canes lemon drops oat cake wafer. Cotton candy candy canes marzipan
//         carrot cake. Sesame snaps lemon drops candy marzipan donut brownie tootsie roll. Icing croissant bonbon
//         biscuit gummi bears. Pudding candy canes sugar plum cookie chocolate cake powder croissant.
//       </p>
//       <p>
//         Carrot cake tiramisu danish candy cake muffin croissant tart dessert. Tiramisu caramels candy canes
//         chocolate cake sweet roll liquorice icing cupcake. Candy cookie sweet roll bear claw sweet roll.
//       </p>
//     </TabPane>
//     <TabPane tabId='2'>
//       <p>
//         Dragée jujubes caramels tootsie roll gummies gummies icing bonbon. Candy jujubes cake cotton candy. Jelly-o
//         lollipop oat cake marshmallow fruitcake candy canes toffee. Jelly oat cake pudding jelly beans brownie lemon
//         drops ice cream halvah muffin. Brownie candy tiramisu macaroon tootsie roll danish.
//       </p>
//       <p>
//         Croissant pie cheesecake sweet roll. Gummi bears cotton candy tart jelly-o caramels apple pie jelly danish
//         marshmallow. Icing caramels lollipop topping. Bear claw powder sesame snaps.
//       </p>
//     </TabPane>
//     <TabPane tabId='3'>
//       <p>
//         Gingerbread cake cheesecake lollipop topping bonbon chocolate sesame snaps. Dessert macaroon bonbon carrot
//         cake biscuit. Lollipop lemon drops cake gingerbread liquorice. Sweet gummies dragée. Donut bear claw pie
//         halvah oat cake cotton candy sweet roll. Cotton candy sweet roll donut ice cream.
//       </p>
//       <p>
//         Halvah bonbon topping halvah ice cream cake candy. Wafer gummi bears chocolate cake topping powder. Sweet
//         marzipan cheesecake jelly-o powder wafer lemon drops lollipop cotton candy.
//       </p>
//     </TabPane>
//   </TabContent>
// </Fragment>
