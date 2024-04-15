import React from "react";
import { Col } from "reactstrap";
import { Eye } from "react-feather";
import StatsVertical from "@components/widgets/stats/StatsVertical";
const paymentStatus = [
  { usd: `$${0}`, state: "Today Approve",color:"success" },
  { usd: `$${0}`, state: "Today On Hold",color:"warning" },
  { usd: `$${0}`, state: "Today Declined",color:"danger"  },
  { usd: `$${0}`, state: "Today Charge Back",color:"info" },
];
const styles={
  
}
const PaymentUpdates = () => {
  return paymentStatus.map((state) => (
    <Col sm="6">
      <StatsVertical
        icon={<Eye size={21} />}
        color={state.color}
        stats={state.usd}
        statTitle={state.state}
      />
    </Col>
  ));
};

export default PaymentUpdates;
