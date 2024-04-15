import React, { useContext } from "react";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import Charts from "../../../components/merchant-dashboard-2/sales/Charts";
import CategorySalesTable from "../../../components/merchant-dashboard-2/sales/CategorySalesTable";

// ** Context
import { ThemeColors } from "@src/utility/context/ThemeColors";

// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/react/libs/charts/recharts.scss";

const data = [
  { category: "paint", items_sold: "3", gross_sold: "3.5$" },
  { category: "brush", items_sold: "2", gross_sold: "4.2$" },
  { category: "canvas", items_sold: "5", gross_sold: "12.5$" },
  { category: "easel", items_sold: "1", gross_sold: "25.0$" },
  { category: "palette", items_sold: "4", gross_sold: "6.8$" },
];

const CategorySales = () => {
  // ** Context
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
    <Card>
      <CardHeader>Category Sales</CardHeader>
      <CardBody>
        <Row>
          <Col sm="12">
            <Charts warning={colors.warning.main} name={"Category Sales"} />
          </Col>
          <Col sm="12">
            <CategorySalesTable data={data} />
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default CategorySales;
