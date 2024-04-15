import { useState } from "react";
import {
  Row,
  Col,
  CardTitle,
  CardText,
  Label,
  Button,
  Form,
  Input,
  FormFeedback,
  DropdownToggle,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  ButtonDropdown,
  Progress,
} from "reactstrap";
import country_code from "../../../country_code.json";
import useJwt from "@src/dashboard/jwt/useJwt";

const editUserMerchant = () => {
  const country = country_code.map((e, i) => {
    return <option key={i}>{e.name}</option>;
  });
  const [companyOther, setCompanyOther] = useState("its not Work");
  const typeCompanyList = [
    "choose other",
    "Limited partnership",
    "Corporation",
    "sole properiaot",
    "Other",
  ];
  const companyTyps = typeCompanyList.map((i) => {
    return <option>{i}</option>;
  });

  const red = {
    color: "red",
  };
  return (
    <div className="container-none">
      <div className="row">
        <h4>Credit reference Agencies</h4>
        <h6>
          We and the Royal Bank of Scotland plc and its affiliates ('RBSG
          Group') may obtain information about you and your business (and any
          principals of the business you name later in this process) from credit
          reference agencies and our or RBSG Group records to check your credit
          status and identity. The agencies will record our enquiries which may
          be seen by other companies who make their own credit enquiries. We and
          RBSG Group may use credit scoring. Your information may be linked to,
          and your application assessed using credit reference agency records
          relating to anyone with whom you have a joint account or similar
          financial association. If false or inaccurate information is provided
          and fraud is identified or suspected, details may be passed to fraud
          prevention agencies.
        </h6>
        <div className="col-lg-6 mt-2 ">
          <Label className="form-label" for="setUp-Company-Name">
            Company Name<span style={red}>*</span>
          </Label>
          <Input id="setUp-Company-Name" />
        </div>
        <div className="form-group col-lg-6 mt-1">
          <label htmlFor="exampleFormControlTextarea1">
            Company Address<span style={red}>*</span>
          </label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="2"
          />
        </div>
        <div className="col-lg-6 mt-1 ">
          <Label className="form-label" for="About-application">
            Yes, this is also our trading name application
          </Label>
          <br />
          <Input type="checkbox" name="radioDefault" className="me-1" />
          Yes
        </div>

        <div className="col-lg-6 mt-1 ">
          <Label className="form-label" for="setUp-Town/City">
            Town/City<span style={red}>*</span>
          </Label>
          <Input id="setUp-Town/City" />
        </div>
        <div className="col-lg-6 mt-1 ">
          <Label className="form-label" for="setUp-Zip-code">
            ZIP Code<span style={red}>*</span>
          </Label>
          <Input id="setUp-Zip-code" />
        </div>
        <div className="col-lg-6 mt-1 ">
          <Label className="form-label" for="About-application">
            Is ur business located in channel Island
          </Label>
          <br />
          <Input type="checkbox" name="radioDefault" className="me-1" />
          Yes
        </div>
        <div className="col-lg-6 mt-1 ">
          <Label className="form-label" for="About-application">
            Yes, this also the registered address.
          </Label>
          <br />
          <Input type="radio" name="radioDefault" className="me-1" />
          <Label>Yes</Label>
          <br />
          <Input type="radio" name="radioDefault" className="mt-1 me-1" />
          <Label className="mt-1">No</Label>
        </div>
        <div className="col-lg-6 mt-1 ">
          <Label className="form-label" for="setUp-Fax-num">
            Fax number<span style={red}>*</span>
          </Label>
          <Input id="setUp-Fax-num" />
        </div>
        <div className="col-lg-6 mt-1 ">
          <Label className="form-label" for="setUp-Services-num">
            Customer services phone number<span style={red}>*</span>
          </Label>
          <Input id="setUp-Services-num" />
        </div>
        <div className="col-lg-6 mt-1 ">
          <Label className="form-label" for="setUp-Company-type">
            Type of company
          </Label>
          <Input id="setUp-Company-type" type="select">
            {companyTyps}
          </Input>
        </div>
        <div className="col-lg-6 mt-1 ">
          <Label className="form-label" for="setUp-Other-specify">
            If 'Other', please specify<span style={red}>*</span>
          </Label>
          <Input
            id="setUp-Other-specify"
            placeholder="its painding show on other"
          />
        </div>
        <div className="col-lg-6 mt-1 ">
          <Label className="form-label" for="setUp-Website-Url">
            Website URL<span style={red}>*</span>
          </Label>
          <Input id="setUp-Website-Url" />
        </div>
        <div className="form-group col-lg-6 mt-1">
          <label htmlFor="exampleFormControlTextarea1">
            Registered Address<span style={red}>*</span>
          </label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="2"
          />
        </div>
        <div className="col-lg-6 mt-1 ">
          <Label className="form-label" for="setUp-Town/City">
            Town/City<span style={red}>*</span>
          </Label>
          <Input id="setUp-Town/City" />
        </div>
        <div className="col-lg-6 mt-1 ">
          <Label className="form-label" for="setUp-Post-Code">
            Post Code<span style={red}>*</span>
          </Label>
          <Input id="setUp-Post-Code" />
        </div>
        <div className="col-lg-6 mt-1 ">
          <Label className="form-label" for="About-postCode">
            Country<span style={red}>*</span>
          </Label>
          <br />
          <Input type="select">
            <option>Select Country</option>
            {country}
          </Input>
        </div>
        <div className="col-lg-6 mt-1"></div>
        <div className="col-lg-6 mt-1">
          <Button outline>Previous</Button>
          <Button
            color="primary"
            className="ms-2"
            style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
export default editUserMerchant;
