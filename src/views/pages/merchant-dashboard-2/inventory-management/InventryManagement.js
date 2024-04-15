// ** React
import React from "react";

// ** Third Party Components **
import { Button, Card, CardBody, CardHeader, CardTitle } from "reactstrap";

// ** Navigat
import { useNavigate } from "react-router-dom";

// ** Table of Product
import ManagementListTable from "../../../components/merchant-dashboard-2/inventry-management/ManagementListTable";

// ** Temporary Data **
const products = [
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
    id: "2",
    product_name: "T-Shirt",
    category: "men cloth",
    product_img:
      "https://images.meesho.com/images/products/185763150/oquzi_512.webp",
    product_tax: "0.1$",
    product_stock: "20",
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
    id: "4",
    product_name: "Suit",
    category: "women cloth",
    product_img:
      "https://cdn.shopify.com/s/files/1/0486/0634/7416/products/4_20Way_20Stretch_20LivIn_20Jacket_20-_20Pink_L1_1300x.jpg?v=1615467941",
    product_tax: "0.3$",
    product_stock: "5",
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

const InventryManagement = () => {
  const navigate = useNavigate();
  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Inventory Product</CardTitle>{" "}
      </CardHeader>
      <CardBody>
        <div className="d-flex justify-content-end">
          <Button
            className="btn-sm btn-info"
            onClick={() => navigate("/merchant/add-product")}
          >
            Add Product
          </Button>
        </div>
        <ManagementListTable data={products} title={"Product List"} />
      </CardBody>
    </Card>
  );
};

export default InventryManagement;
