// ** Navigation imports
import apps from "./apps";
import pages from "./pages";
import forms from "./forms";
import tables from "./tables";
import charts from "./charts";
import dashboards from "./dashboards";
import uiElements from "./ui-elements";
import admin from './admin-dashboard';
import IsoDashboard from "./iso-dashboard";
import underWriterDashboard from "./underwriter-dashboard";
import formquerys from "./form-querys";
import Dashboard from './Dashboard'
import approvedMerchant from './approvedMerchant'


// ** Merge & Export
export default [
  ...admin,
  // ...UserInformationForms,
  ...dashboards,
  ...formquerys,
  ...IsoDashboard,
  ...underWriterDashboard,
  ...apps,
  ...pages,
  ...uiElements,
  ...forms,
  ...tables,
  ...charts,
  ...Dashboard,
  ... approvedMerchant
];
