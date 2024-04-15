import React, { useContext } from "react";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import Charts from "../../../components/merchant-dashboard-2/sales/Charts";
import ItemsSalesTable from "../../../components/merchant-dashboard-2/sales/ItemsSalesTable";
// ** Context
import { ThemeColors } from "@src/utility/context/ThemeColors";

// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/react/libs/charts/recharts.scss";
const fakeDb = [
  {
    item: "jeans",
    sku: "JEANS-001",
    category: "clothing",
    item_sold: 50,
    gross_sale: 1000,
  },
  {
    item: "t-shirt",
    sku: "TSHIRT-001",
    category: "clothing",
    item_sold: 100,
    gross_sale: 2000,
  },
  {
    item: "sneakers",
    sku: "SNEAKERS-001",
    category: "footwear",
    item_sold: 30,
    gross_sale: 1500,
  },
  {
    item: "backpack",
    sku: "BACKPACK-001",
    category: "accessories",
    item_sold: 20,
    gross_sale: 800,
  },
  {
    item: "watch",
    sku: "WATCH-001",
    category: "accessories",
    item_sold: 10,
    gross_sale: 500,
  },
];

const ItemsSales = () => {
  const { colors } = useContext(ThemeColors);
console.log({colors})
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
      <CardHeader></CardHeader>
      <CardBody>
        <Row>
          <Col sm={"12"}>
            <Charts warning={colors.warning.main} name={"Items Sales"} />
          </Col>
          <Col sm={"12"}>
            <ItemsSalesTable data={fakeDb} />
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default ItemsSales;
