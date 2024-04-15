import React, { useEffect, useState } from "react";

//** third party
import DataTable from "react-data-table-component";

//** fake db
import data from "../../fakedb/report_db";
import { Eye } from "react-feather";

export default function index() {
  const [merchant, setMerchant] = useState([]);

  useEffect(() => {
    setMerchant(data);
  }, [merchant]);

  const column = [
    {
      name: "#",
      selector: (row) => row.id,
    },
    {
      name: "Merchant Name",
      selector: (row) => row.merchantname,
    },
    {
      name: "Processe Amount",
      selector: (row) => row.process_amt,
    },
    {
      name: "Comission Estimation",
      selector: (row) => row.commision_est,
    },
  ];

  return (
    <div className="p2 m-5">
      <h2>Report And Statement </h2>
      <DataTable
        columns={column}
        data={merchant}
        pagination
        fixedHeader
        fixedHeaderScrollHeight={"400px"}
        highlightOnHover
      />
    </div>
  );
}
