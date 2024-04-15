import React, { useState } from "react";
import { Button, Card, CardBody, Col, Collapse, Label, Row } from "reactstrap";

import ProductForm from "../../../../components/merchant-dashboard-2/pos/product-management/new-product/ProductForm";
import ManagementListTable from "../../../../components/merchant-dashboard-2/inventry-management/ManagementListTable";

import CategoryForm from "../../../../components/merchant-dashboard-2/pos/product-management/product-category/CategoryForm";
import CategoryList from "../../../../components/merchant-dashboard-2/pos/product-management/product-category/CategoryList";

import TaxForm from "../../../../components/merchant-dashboard-2/pos/product-management/product-taxes/TaxForm";
import TaxList from "../../../../components/merchant-dashboard-2/pos/product-management/product-taxes/TaxList";

const catDetails = [
  { id: 1, category: "Income", taxname: "Income Tax", tax_amt: 1000 },
  { id: 2, category: "Property", taxname: "Property Tax", tax_amt: 500 },
  { id: 3, category: "Sales", taxname: "Sales Tax", tax_amt: 200 },
  { id: 4, category: "Corporate", taxname: "Corporate Tax", tax_amt: 1500 },
];

import DataTable from "react-data-table-component";

// ** Third Party Components
import Select from "react-select";

// ** Utils
import { selectThemeColors } from "@utils";

const options = [
  { label: "New Product", value: "" },
  { label: "Product Category", value: "" },
  { label: "Product Taxes", value: "" },
];

// ** Temporary Data **
const products = [
  {
    id: "4",
    product_name: "Suit",
    category: "women cloth",
    product_img:
      "https://cdn.shopify.com/s/files/1/0486/0634/7416/products/4_20Way_20Stretch_20LivIn_20Jacket_20-_20Pink_L1_1300x.jpg?v=1615467941",
    product_tax: "0.3$",
    product_stock: "5",
  },
  {
    id: "2",
    product_name: "T-Shirt",
    category: "men cloth",
    product_img:
      "https://images.meesho.com/images/products/185763150/oquzi_512.webp",
    product_tax: "0.1$",
    product_stock: "20",
  },
  {
    id: "1",
    product_name: "Jeans",
    category: "men cloth",
    product_img:
      "https://assets.vogue.com/photos/6303e996be0e9b0e8c9fc4d9/3:4/w_1280%2Cc_limit/slide_17.jpg",
    product_tax: "0.2$",
    product_stock: "12",
  },
  {
    id: "3",
    product_name: "Dress",
    category: "women cloth",
    product_img: "https://m.media-amazon.com/images/I/71FjZ5K-J1S._UY550_.jpg",
    product_tax: "0.25$",
    product_stock: "8",
  },

  {
    id: "5",
    product_name: "Skirt",
    category: "women cloth",
    product_img:
      "https://cdn.shopify.com/s/files/1/0486/0634/7416/products/Pleated_20Flared_20Midi_20Skirt_20-_20White_L1_1300x.jpg?v=1615469832",
    product_tax: "0.15$",
    product_stock: "15",
  },
];

// Creating an array of tax objects
const taxDetails = [
  { id: "1", taxname: "Income Tax", tax_amt: 1000 },
  { id: "2", taxname: "Property Tax", tax_amt: 500 },
  { id: "3", taxname: "Sales Tax", tax_amt: 200 },
  { id: "4", taxname: "Corporate Tax", tax_amt: 1500 },
];
// const ProductList = () => {
//   return (
//     <Card>
//       <CardBody className="mb-2">
//         <Row>
//           <Col sm="10" lg="10" md="10">
//             <Select
//               theme={selectThemeColors}
//               className="react-select"
//               classNamePrefix="select"
//               name="clear"
//               options={options}
//               isClearable
//             />
//           </Col>
//           <Col sm="2" lg="2" md="2" className="d-flex justify-content-center">
//             <Button color="primary">Add</Button>
//           </Col>
//         </Row>
//       </CardBody>
//       <CardBody>
//         <ProductForm />
//       </CardBody>
//     </Card>
//   );
// };

// export default ProductList;

import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import { ArrowLeft, Plus } from "react-feather";

const PillCentered = () => {
  const [active, setActive] = useState("1");
  const [addprd, setAddPrd] = useState(false);
  const [addctg, setAddCtg] = useState(false);
  const [addtx, setAddTx] = useState(false);

  const toggle = (tab) => {
    setActive(tab);
  };
  return (
    <React.Fragment>
      <Nav className="justify-content-center" pills>
        <NavItem>
          <NavLink
            active={active === "1"}
            onClick={() => {
              toggle("1");
            }}
          >
            New Product
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            active={active === "2"}
            onClick={() => {
              toggle("2");
            }}
          >
            Product Category
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            active={active === "3"}
            onClick={() => {
              toggle("3");
            }}
          >
            Product Taxes
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent className="py-50" activeTab={active}>
        <TabPane tabId="1">
          <div className="d-flex justify-content-between">
            <h1>Products</h1>
            <div className="mb-2 border-bottom py-2">
              {addprd ? (
                <Button.Ripple
                  className="btn-icon"
                  color="flat-success"
                  onClick={() => setAddPrd(!addprd)}
                >
                  <ArrowLeft size={16} />
                </Button.Ripple>
              ) : (
                <Button
                  color="info"
                  className="btn-sm"
                  onClick={() => setAddPrd(!addprd)}
                >
                  <Plus size={12} />
                  Add New Products
                </Button>
              )}
            </div>
          </div>
          <Collapse isOpen={!addprd}>
            <ManagementListTable data={products} title={"Product List"} />
          </Collapse>
          <Collapse isOpen={addprd}>
            <ProductForm />
          </Collapse>
        </TabPane>
        <TabPane tabId="2">
          <div className="d-flex justify-content-between">
            <h1>Product Category</h1>
            <div className="mb-2 border-bottom py-2">
              {addprd ? (
                <Button.Ripple
                  className="btn-icon"
                  color="flat-success"
                  onClick={() => setAddCtg(!addctg)}
                >
                  <ArrowLeft size={16} />
                </Button.Ripple>
              ) : (
                <Button
                  color="info"
                  className="btn-sm"
                  onClick={() => setAddCtg(!addctg)}
                >
                  <Plus size={12} />
                  Add Product Category
                </Button>
              )}
            </div>
          </div>
          <Collapse isOpen={!addctg}>
            {/* <CategoryList data={products} title={"Product List"} /> */}
            <CategoryList data={catDetails} title="Category List" />
          </Collapse>
          <Collapse isOpen={addctg}>
            <CategoryForm />
          </Collapse>
        </TabPane>
        <TabPane tabId="3">
          <div className="d-flex justify-content-between">
            <h1>Product Taxes</h1>
            <div className="mb-2 border-bottom py-2">
              {addtx ? (
                <Button.Ripple
                  className="btn-icon"
                  color="flat-success"
                  onClick={() => setAddTx(!addtx)}
                >
                  <ArrowLeft size={16} />
                </Button.Ripple>
              ) : (
                <Button
                  color="info"
                  className="btn-sm"
                  onClick={() => setAddTx(!addtx)}
                >
                  <Plus size={12} />
                  Add Product Tax
                </Button>
              )}
            </div>
          </div>
          <Collapse isOpen={!addtx}>
            {/* <CategoryList data={products} title={"Product List"} /> */}
            <TaxList data={taxDetails} title="Tax List" />
          </Collapse>
          <Collapse isOpen={addtx}>
            <TaxForm />
          </Collapse>
        </TabPane>
      </TabContent>
    </React.Fragment>
  );
};
export default PillCentered;
