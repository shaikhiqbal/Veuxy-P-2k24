// ** React Imports
import { Fragment } from "react";

// ** Reactstrap Imports
import { Row, Col } from "reactstrap";

// ** Demo Components
// import WizardVertical from "./Wizard_Modern_Form";
import ApplicationForm from '../../../application-form'

const Wizard = () => {
  return (
    <div className="d-flex justify-content-center align-items-center " style={{height:"100vh"}} >
          {/* <WizardVertical /> */}
          <ApplicationForm/>
    </div>
  );
};
export default Wizard;
