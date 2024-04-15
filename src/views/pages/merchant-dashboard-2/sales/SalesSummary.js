import React, { useContext } from "react";
import { Card, CardBody, CardTitle, Col, Row } from "reactstrap";

// ** Context
import { ThemeColors } from "@src/utility/context/ThemeColors";

// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/react/libs/charts/recharts.scss";

import DailyGrossSalesChart from "../../../components/merchant-dashboard-2/sales/DailyGrossSalesChart";
import WeeklyGrossSalesChart from "../../../components/merchant-dashboard-2/sales/WeeklyGrossSalesChart";
import YearGrossSalesChart from "../../../components/merchant-dashboard-2/sales/YearGrossSalesChart";

const SalesSummary = () => {
  const { colors } = useContext(ThemeColors);

  // ** Vars
  const donut = {
    series1: "#ffe700",
    series2: "#00d4bd",
    series3: "#826bf8",
    series4: "#2b9bf4",
    series5: "#FFA1A1",
  };

  return (
    <Row>
      <Col sm="12">
        <Card>
          <CardBody>
            <CardTitle>Year Of Day</CardTitle>
            <YearGrossSalesChart warning={colors.secondary.main} />
          </CardBody>
        </Card>
      </Col>
      <Col sm="12" md="4" lg="4">
        <Card>
          <CardBody>
            <CardTitle>Day Of Week</CardTitle>
            <WeeklyGrossSalesChart warning={colors.info.main} />
          </CardBody>
        </Card>
      </Col>
      <Col sm="12" md="8" lg="8">
        <Card>
          <CardBody>
            <CardTitle>Day Of Week</CardTitle>
            <DailyGrossSalesChart warning={colors.danger.main} />
          </CardBody>
        </Card>
      </Col>
      <Col sm="12"></Col>
    </Row>
  );
};

export default SalesSummary;
