import React, { useContext } from "react";
import { CardTitle, Col, Row } from "reactstrap";

// ** Context
import { ThemeColors } from "@src/utility/context/ThemeColors";

// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/react/libs/charts/recharts.scss";

import DailyGrossSalesChart from "../../../components/merchant-dashboard-2/sales/DailyGrossSalesChart";
import WeeklyGrossSalesChart from "../../../components/merchant-dashboard-2/sales/WeeklyGrossSalesChart";
import YearGrossSalesChart from "../../../components/merchant-dashboard-2/sales/YearGrossSalesChart";

const SalesTrends = () => {
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
        <div>
          <CardTitle tag="h4">Daily Gross Sales</CardTitle>
          <small className="text-muted">
            Sales so far are the same as the closest Friday in 2023.
          </small>
        </div>
        <DailyGrossSalesChart warning={colors.danger.main} />
      </Col>
      <Col sm="12">
        <div>
          <CardTitle tag="h4">Weekly Gross Sales</CardTitle>
          <small className="text-muted">
            Sales so far are the same as in 2023.
          </small>
        </div>
        <WeeklyGrossSalesChart warning={colors.info.main} />
      </Col>
      <Col sm="12">
        <YearGrossSalesChart warning={colors.secondary.main} />
      </Col>
    </Row>
  );
};

export default SalesTrends;
