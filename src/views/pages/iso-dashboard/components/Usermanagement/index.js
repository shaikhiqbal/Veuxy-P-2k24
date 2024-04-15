import React, { useEffect, useState } from "react";

//** third party
import DataTable from "react-data-table-component";

//** fake db
import data from "../../fakedb/usermanagement_db";
import { Trash, Edit } from "react-feather";

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
      name: "User Name",
      selector: (row) => row.username,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="gy-3">
          <Trash size={15} />
          <br />
          <Edit size={15} />
        </div>
      ),
    },
  ];

  return (
    <div className="p2 m-5">
      <h2>User Management </h2>
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
