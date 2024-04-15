import React from "react";

import * as Icon from "react-feather";
import { Label, Button, Form, Input, FormGroup, CardText } from "reactstrap";

export default function OverdeuMerchant() {
  const divStyles = {
    boxShadow: "1px 2px 9px #53BDC1",
    margin: "4em",
  };
  const Thead = {
    backgroundColor: "#53BDC1",
    fontSize: "1.2rem",
    color: "white",
    textAlign: "left",
  };
  const containerShadow = {
    boxShadow:
      "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
  };
  return (
    <div className="p-3">
      {" "}
      <div className="container-none border  " style={containerShadow}>
        <div className="p-2">
          <h1>Overdeu Merchant List</h1>
        </div>
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
                    <div> Name </div>
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
                    <div> Mobile </div>
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
                <th>
                  <div className="d-flex align-items-center justify-content-between ps-1 pe-1">
                    <div> Timeline</div>
                    <div>
                      <i className="fa fa-angle-up" aria-hidden="true" />
                      <br />
                      <i className="fa fa-angle-down" />
                    </div>
                  </div>
                </th>
                <th>
                  <div className="d-flex align-items-center justify-content-between ps-1 pe-1">
                    <div> View</div>
                    <div>
                      <i className="fa fa-angle-up" aria-hidden="true" />
                      <br />
                      <i className="fa fa-angle-down" />
                    </div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="text-left">
              <tr className="border-bottom">
                <td className="ps-2">1</td>
                <td>Admin</td>
                <td>admin@gmail.com</td>
                <td>+917773932895</td>

                <td>Form ISO-(isocc)</td>
                <td>
                  <Button color="relief-primary">Notes</Button>
                </td>
                <td>
                  <Button color="relief-primary">Timeline</Button>
                </td>
                <td className="p-2">
                  <Icon.Eye size={"1.5rem"}></Icon.Eye>
                </td>
              </tr>
              <tr className="border-bottom">
                <td className="ps-2">1</td>
                <td>Admin</td>
                <td>admin@gmail.com</td>
                <td>+917773932895</td>

                <td>Form ISO-(isocc)</td>
                <td>
                  <Button color="relief-primary">Notes</Button>
                </td>
                <td>
                  <Button color="relief-primary">Timeline</Button>
                </td>
                <td className="p-2">
                  <Icon.Eye size={"1.5rem"}></Icon.Eye>
                </td>
              </tr>
              <tr className="border-bottom">
                <td className="ps-2">1</td>
                <td>Admin</td>
                <td>admin@gmail.com</td>
                <td>+917773932895</td>

                <td>Form ISO-(isocc)</td>
                <td>
                  <Button color="relief-primary">Notes</Button>
                </td>
                <td>
                  <Button color="relief-primary">Timeline</Button>
                </td>
                <td className="p-2">
                  <Icon.Eye size={"1.5rem"}></Icon.Eye>
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
      {/* <AdminAdd /> */}
    </div>
  );
}
