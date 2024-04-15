import React, { Fragment, useMemo, useState } from "react";
import { Plus } from "react-feather";

// ** Third Party Library
import { Row, Col, Button, Card } from "reactstrap";

// ** Customer List Component
import CustomerList from "../../../../components/merchant-dashboard-2/pos/customer-management/CustomerList";

const CustomerManagment = () => {
  return (
    <Fragment>
      <CustomerList />
    </Fragment>
  );
};

export default CustomerManagment;
