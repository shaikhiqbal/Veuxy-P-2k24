import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import useJwt from "@src/dashboard/jwt/useJwt";
import {
  Label,
  Row,
  Input,
  InputGroup,
  InputGroupText,
  Col,
  Button,
  Card,
  CardHeader,
  CardBody,
} from "reactstrap";

import Select from "react-select";
import { selectThemeColors } from "@utils";

import "./merchant-rates-management/styles/styles.css";

const feilds = {
//   acquiring_bank: { name: "Acquiring Bank", type: "text" },
  load_balancing: { name: "Load Balancing", type: "radio" },
  payment_services_field: "kmw",
  batch_upload: { name: "Batch Upload", type: "usd" },
  fraud_scrub_fees: { name: "Fraud Scrub Fees", type: "usd" },
  wire_international: { name: "Wire International", type: "usd" },
  gateway_fees: { name: "Gateway Fees", type: "usd" },
  return_charges: { name: "Check Return Charges", type: "usd" },
  gateway_monthly_fees: { name: "Gateway Monthly Fees", type: "usd" },
  setup_charge: { name: "Setup Charges", type: "usd" },
  monthly_fees: { name: "Monthly Fees", type: "usd" },
  reserve_rate: { name: "Reserve Rate", type: "usd" },
  refund_charge: { name: "Refund Charge", type: "usd" },
  transaction_fees: { name: "Transaction Fees", type: "usd" },
  verification_fees: { name: "Check Verification Fees", type: "usd" },
  wire_domestic_fees: { name: "Wire Domestic Fees", type: "usd" },
  maximum_ticket_size: { namee: "Maximum Ticket Size", type: "text" },
  block_type: { name: "Block Type", type: "radio" },
  merchant_category_code: { name: "Merchant Category", type: "text" },
  merchant_type: { name: "Merchant Type", type: "text" },
  minimum_ticket_size: { name: "Minimum Ticket Size", type: "text" },
  virtual_terminal: { name: "Virtual Terminal", type: "radio" },
  currency: { name: "Currency", type: "multiSelect" },
  payment_services: { name: "Payment Services", type: "multiSelect" },
  settlement: { name: "Settlement", type: "text" },
  split_rates: { name: "Split Rates", type: "text" },
  value: { name: "ISO Commission", type: "text" },
  cash_discount: { name: "Cash Discount", type: "radio" },
  charge_back: "",
};

//   acquiring_bank_field: {
//     name: "Authorized.net",
//     fields: {}
//   }

// ** Convert Key to Label
const convertKeyToLabel = (str) => {
  let key = str;
  let label = key
    .split("_")
    .map((substring) => substring.charAt(0).toUpperCase() + substring.slice(1))
    .join(" ");
  return label;
};

const InputFields = ({ type, value, name }) => {
  switch (type) {
    case "usd":
      return (
        <Col sm="12" md="6" lg="6" className="mb-1">
          <Label>{name}</Label>
          <InputGroup className="input-group-merge">
            <Input type="text" value={value} />
            <InputGroupText>USD</InputGroupText>
          </InputGroup>
        </Col>
      );
    case "multiSelect":
      return (
        <Col sm="12" md="6" lg="6" className="mb-1">
          <Label>{name}</Label>
          <Select
            defaultValue={value}
            isMulti
            isClearable={false}
            theme={selectThemeColors}
            id="payment_services"
            name="colors"
            classNamePrefix="select"
          />
        </Col>
      );
    case "percent":
      return (
        <Col sm="12" md="6" lg="6" className="mb-1">
          <Label>{name}</Label>
          <InputGroup className="input-group-merge">
            <Input type="text" value={value} />
            <InputGroupText>%</InputGroupText>
          </InputGroup>
        </Col>
      );
    case "radio":
      return (
        <Col sm="12" md="6" lg="6" className="mb-1">
          <Label>{name}</Label>
          <div className="form-switch form-check-primary">
            <Input id="alw" type="switch" name="icon-primary" checked={value} />
          </div>
        </Col>
      );
    default:
      return (
        <Col sm="12" md="6" lg="6" className="mb-1">
          <Label>{name}</Label>
          <Input type="text" value={value} />
        </Col>
      );
  }
};

const acuiringBankField = (data) => {
  if (!data) return;
  try {
    const inputKeysValues = JSON.parse(data);
    const { fields } = inputKeysValues;
    if (Object.keys(fields))
      Object.keys(feilds).map((keys, index) => (
        <InputFields
          key={index}
          type={"text"}
          value={fields?.[keys]}
          name={convertKeyToLabel(keys)}
        />
      ));
  } catch (e) {}
};

const paymentServicesFields = (data) => {
  const paymentServicesFieldsDetails = (data) => {
    if (data.name == "Card Type") cardTypeTable(data);
    const nameKeys = Object.keys(data.fields);
    return (
      <>
        <InputFields
          type={"percent"}
          value={data.fields?.[nameKeys[0]]}
          name={convertKeyToLabel(nameKeys[0])}
        />
        <InputFields
          type={"usd"}
          value={data.fields?.[nameKeys[1]]}
          name={convertKeyToLabel(nameKeys[1])}
        />
      </>
    );
  };

  if (!data) return;
  let dataParse = [];
  try {
    dataParse = JSON.parse(data);
  } catch (e) {
    dataParse = [];
  }

  if (!dataParse.length) return;
  return dataParse.map((data) => {
    switch (data?.name) {
      case "Card Type":
        return cardTypeTable(JSON.parse(data.fields));
      default:
        return paymentServicesFieldsDetails(data);
    }
  });
};

const cardTypeTable = (data) => {
  if (!data) return;

  return (
    <Col sm="12" md="12" lg="12" className="my-2">
      <table class="wp-table">
        <tr>
          <th>Active Cards</th>
          <th> Merchant Discount Rate</th>
          <th> Transaction Fees</th>
        </tr>
        {data.map((data, key) => {
          return (
            <tr key={key} className="">
              <td>
                <Label>{data.active_card}</Label>
              </td>

              <td>
                <InputFields
                  type={"percent"}
                  value={data.fields.discount_rate}
                  name={""}
                />
              </td>
              <td>
                <InputFields
                  type={"usd"}
                  value={data.fields.transaction_fees}
                  name={""}
                />
              </td>
            </tr>
          );
        })}
      </table>
    </Col>
  );
};

const chargeBackDetails = (zero, two, five) => {
  return (
    <Col md="12" sm="12" className="mb-1">
      <Label>Chargeback Charges</Label>
      <Row>
        <Col md="4" sm="12" className="mb-1">
          <InputGroup className="input-group-merge">
            <Input id="chargeback_charge_0_2" type="number" value={zero} />
            <InputGroupText>0% - 2%</InputGroupText>
          </InputGroup>
        </Col>
        <Col md="4" sm="12" className="mb-1">
          <InputGroup className="input-group-merge">
            <Input id="chargeback_charge_2_5" type="number" value={two} />
            <InputGroupText>2% - 5%</InputGroupText>
          </InputGroup>
        </Col>

        <Col md="4" sm="12" className="mb-1">
          <InputGroup className="input-group-merge">
            <Input id="chargeback_charge_5_10" type="number" value={five} />
            <InputGroupText>5% - 10%</InputGroupText>
          </InputGroup>
        </Col>
      </Row>
    </Col>
  );
};

const MerchantRatesView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const application_id = location?.state?.application_id;
  const userDetails = localStorage.getItem("userData");
  const [userRole, setUserRole] = useState("");
  const [ratesData, setRatesData] = useState([
    {
      payment_services_field: JSON.stringify([
        {
          name: "SEPA",
          fields: {
            sepa_merchant_discount_rate: "12",
            sepa_transaction_fees: "423",
          },
        },
        {
          name: "Remittance",
          fields: {
            remittance_merchant_discount_rate: "22",
            remittance_transaction_fees: "32",
          },
        },
        {
          name: "Card Type",
          fields: [
            {
              active_card: "Visa",
              fields: {
                discount_rate: "18",
                transaction_fees: "20",
              },
            },
            {
              active_card: "Amex",
              fields: {
                discount_rate: "34",
                transaction_fees: "45",
              },
            },
            {
              active_card: "Rupay",
              fields: {
                discount_rate: "14",
                transaction_fees: "15",
              },
            },
          ],
        },
      ]),
    },
  ]);
  const [loader, setLoader] = useState(true);

  const onSubmitApplication = () => {
    
    const role = {
      iso: { action: "approvedByIso", land: "/iso/merchant" },
      merchant: {
        action: "approvedByMerchant",
        land: "/merchant/payment-gateway",
      },
    };
    console.log(role[userRole]["action"])
    if (!application_id) return;
    useJwt[role[userRole]["action"]](application_id)
      .then((res) => {
        if (res?.status == 200) {
          navigate([role[userRole]["land"]]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (!application_id) return;
    useJwt
      .saleRateView(application_id)
      .then((res) => {
        setRatesData([...res?.data]);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
      });
    try {
      const details = JSON.parse(userDetails);
      setUserRole(details?.role);
    } catch (e) {}
  }, [application_id]);
  if (loader) return <p>Loading......</p>;
  return (
   <Card>
    <CardHeader></CardHeader>
    <CardBody> <Row>
      {ratesData &&
        Object.keys(feilds).map((key, index) => {
          if (key == "acquiring_bank_field") {
            return acuiringBankField(ratesData[0]?.[key]);
          } else if (key == "payment_services_field") {
            return paymentServicesFields(ratesData[0]?.[key]);
          } else if (key == "payment_services" || key == "currency") {
            const values = JSON.parse(ratesData[0]?.[key]).map((value) => ({
              value: value,
              label: value,
            }));
            // console.log(values);
            return (
              <InputFields
                value={values.length ? [...values] : []}
                name={feilds[key]["name"]}
                type={feilds[key]["type"]}
              />
            );
            // return null;
          } else if (key === "charge_back") {
            return chargeBackDetails(
              ratesData[0].chargeback_charge_0_2,
              ratesData[0].chargeback_charge_2_5,
              ratesData[0].chargeback_charge_5_10
            );
          } else {
            return (
              <InputFields
                value={ratesData[0]?.[key] ? ratesData[0][key] : ""}
                name={feilds[key]["name"]}
                type={feilds[key]["type"]}
              />
            );
          }
        })}
      <Col className="my-2 d-flex" sm="12" md="12" lg="12">
        <Button color="primary" onClick={() => onSubmitApplication()}>
          Accept
        </Button>
      </Col>
    </Row></CardBody>
   </Card>
  );
};

export default MerchantRatesView;
