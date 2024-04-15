// ** React Imports
import { main } from "@popperjs/core";
import { useState } from "react";
import { Aperture } from "react-feather";

// ** Reactstrap Imports
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";

// ** Application Pages
import {
  CompanyProfile,
  CompanyOwner,
  BusinessProfile,
  SecurityMeasure,
  SettlementBank,
  MerchanContact,
  Document,
} from "./steps-pages";

// ** styles
import "./style.css";

const TabsVerticalLeft = props => {
  const {application_id}=props
  // ** State
  const [active, setActive] = useState("1");
  const [renderDocument,setRenderDocument]=useState(false)

  const toggle = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  return (
    <div className="nav-vertical">
      <Nav tabs className="nav-left">
        <NavItem>
          <NavLink
            className="nav-link"
            active={active === "1"}
            onClick={() => {
              toggle("1");
            }}
          >
            <span className="number">1</span> Company Profile
          </NavLink>
        </NavItem>
        <NavItem >
          <NavLink
            className="nav-link-items"
            active={active === "2"}
            onClick={() => {
              toggle("2");
            }}
          >
            <span className="number">2</span> Company Owner
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className="nav-link"
            active={active === "3"}
            onClick={() => {
              toggle("3");
            }}
          >
            <span className="number">3</span>
            Business Profile
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className="nav-link"
            active={active === "4"}
            onClick={() => {
              toggle("4");
            }}
          >
            {" "}
            <span className="number">4</span>
            Security Measure
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className="nav-link"
            active={active === "5"}
            onClick={() => {
              toggle("5");
            }}
          >
            <span className="number">5</span>
            Settlement Bank
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className="nav-link"
            active={active === "6"}
            onClick={() => {
              toggle("6");
            }}
          >
            <span className="number">6</span>
            Document
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className="nav-link"
            active={active === "7"}
            onClick={() => {
              toggle("7");
            }}
          >
            <span className="number">7</span>
            Contact
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent className="ms-2" activeTab={active}>
        <TabPane next={toggle} tabId="1">
          <CompanyProfile application_id={application_id} next={toggle} />
        </TabPane>
        <TabPane tabId="2">
          <CompanyOwner renderDocument={setRenderDocument} application_id={application_id} next={toggle} />
        </TabPane>
        <TabPane tabId="3">
          <BusinessProfile application_id={application_id} next={toggle} />
        </TabPane>
        <TabPane tabId="4">
          <SecurityMeasure application_id={application_id} next={toggle} />
        </TabPane>
        <TabPane tabId="5">
          <SettlementBank application_id={application_id} next={toggle} />
        </TabPane>
        <TabPane tabId="6">
          <Document recallOwners={renderDocument} application_id={application_id} next={toggle} />
        </TabPane>
        <TabPane tabId="7">
          <MerchanContact application_id={application_id} next={toggle} />
        </TabPane>
      </TabContent>
    </div>
  );
};
export default TabsVerticalLeft;
