import React from "react";
import Flatpickr from 'react-flatpickr';
import {Card, CardHeader} from 'reactstrap';
import {Calendar} from 'react-feather';
import TaxesTable from '../../../components/merchant-dashboard-2/sales/TaxesTable';
const fakeData = [
  {
    tax_name: "Net Total",
    taxable_amount: "$32",
    tax_collect: "$45"
  },
  {
    tax_name: "Sales Tax",
    taxable_amount: "$28",
    tax_collect: "$3.36"
  },
  {
    tax_name: "City Tax",
    taxable_amount: "$28",
    tax_collect: "$1.68"
  },
  {
    tax_name: "County Tax",
    taxable_amount: "$28",
    tax_collect: "$1.40"
  },
  {
    tax_name: "State Tax",
    taxable_amount: "$28",
    tax_collect: "$2.52"
  }
];

const Taxes = () => {
  return (
    <Card className="p-2">
     <CardHeader>Taxes</CardHeader>
        <TaxesTable data={fakeData}/>
    </Card>
  );
};

export default Taxes;
