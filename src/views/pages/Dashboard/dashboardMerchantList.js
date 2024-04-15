import React from "react";
import * as Icon from "react-feather";
import { Label, Button, Form, Input, FormGroup } from "reactstrap";

export default function DashboardMerchantList() {
  const divStyles = {
    boxShadow: "1px 2px 9px #53BDC1",
    margin: "4em",
  };
  const Thead = {
    backgroundColor: "#53BDC1",
    fontSize: "1.2rem",
    color: "white",
    textAlign: "center",
  };
  const containerShadow = {
    boxShadow:
      "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
  };
  return (
    <div className="p-3">
      {" "}
      <div className="container-none border  " style={containerShadow}>
        <h1 className="m-3">Merchant List</h1>
        <div className="row pt-2 pb-2" style={divStyles}>
          <div className="d-flex justify-content-end mb-2 align-items-baseline">
            <Input type="search" className="w-25"></Input>
            <Label style={{ fontWeight: "bolder", fontSize: "1rem" }}>
              <Icon.Search />
            </Label>
          </div>
          <table className="">
            <thead style={Thead}>
              <tr>
                <th>
                  <div className="d-flex align-items-center justify-content-between ps-2 pe-1">
                    <div> #</div>
                    <div>
                      <i className="fa fa-angle-up" aria-hidden="true" />
                      <br />
                      <i className="fa fa-angle-down" />
                    </div>
                  </div>
                </th>
                <th>
                  <div className="d-flex align-items-center justify-content-between ps-1 pe-1">
                    <div> Company Name </div>
                    <div>
                      <i className="fa fa-angle-up" aria-hidden="true" />
                      <br />
                      <i className="fa fa-angle-down" />
                    </div>
                  </div>
                </th>
                <th>
                  <div className="d-flex align-items-center justify-content-between ps-1 pe-1">
                    <div> Email</div>
                    <div>
                      <i className="fa fa-angle-up" aria-hidden="true" />
                      <br />
                      <i className="fa fa-angle-down" />
                    </div>
                  </div>
                </th>
                <th>
                  <div className="d-flex align-items-center justify-content-between ps-1 pe-1">
                    <div> Phone </div>
                    <div>
                      <i className="fa fa-angle-up" aria-hidden="true"></i>
                      <br />
                      <i className="fa fa-angle-down"></i>
                    </div>
                  </div>
                </th>
                <th>
                  <div className="d-flex align-items-center justify-content-between ps-1 pe-1">
                    <div> Source Form </div>
                    <div>
                      <i className="fa fa-angle-up" aria-hidden="true" />
                      <br />
                      <i className="fa fa-angle-down" />
                    </div>
                  </div>
                </th>
                <th>
                  <div className="d-flex align-items-center justify-content-between ps-1 pe-1">
                    <div> Note </div>
                    <div>
                      <i className="fa fa-angle-up" aria-hidden="true" />
                      <br />
                      <i className="fa fa-angle-down" />
                    </div>
                  </div>
                </th>
                <th>Status</th>
                <th>
                  <div className="d-flex align-items-center justify-content-between ps-1 pe-1">
                    <div> Veiw </div>
                    <div>
                      <i className="fa fa-angle-up" aria-hidden="true" />
                      <br />
                      <i className="fa fa-angle-down" />
                    </div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="text-center">
              <tr className="border-bottom">
                <td className=" pt-3 pb-3">1</td>
                <td>Dummy PVT LTD.</td>
                <td>shaikhiqbal80004@gmail.com</td>
                <td>+917773932895</td>
                <td>Direct</td>
                <td>Notes</td>
                <td>Under Writer Assigned</td>
                <td>
                  <Icon.Link />
                  <br />
                  <Icon.Eye />
                  <br />
                  <Icon.Link2 />
                </td>
              </tr>
              <tr className="border-bottom">
                <td className="mt-2 mb-2 pt-3 pb-3">2</td>
                <td>Dummy PVT LTD.</td>
                <td>shaikhiqbal80004@gmail.com</td>
                <td>+917773932895</td>
                <td>Direct</td>
                <td>Notes</td>
                <td>Under Writer Assigned</td>
                <td>
                  <Icon.Link />
                  <br />
                  <Icon.Eye />
                  <br />
                  <Icon.Link2 />
                </td>
              </tr>
              <tr className="border-bottom">
                <td className="mt-2 mb-2 pt-3 pb-3">3</td>
                <td>Dummy PVT LTD.</td>
                <td>swapnil.yashode123@gmail.comcom</td>
                <td>+919421215296</td>
                <td>Direct</td>
                <td>Notes</td>
                <td>Incomplete</td>
                <td>
                  <Icon.Calendar />
                  <br />
                  <Icon.Eye />
                  <br />
                  <Icon.Link2 />
                </td>
              </tr>
              <tr className="border-bottom">
                <td className="mt-2 mb-2 pt-3 pb-3">4</td>
                <td>Royal Pvt Lmt</td>
                <td>vaishnavidivekar46@gmail.com</td>
                <td>08412087456</td>
                <td>Direct</td>
                <td>Notes</td>
                <td>Under Writer Assigned</td>
                <td>
                  <br />
                  <Icon.Eye />
                  <br />
                  <Icon.Link2 />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col-lg-12 mt-1 d-flex justify-content-end">
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
}
