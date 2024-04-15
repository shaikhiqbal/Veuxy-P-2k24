import { useNavigate } from "react-router-dom";
import { ChevronDown, Eye } from "react-feather";
import { Badge } from "reactstrap";

const status = {
  P: { state: "Pending", color: "light-warning" },
  R: { state: "Rejected", color: "light-danger" },
  A: { state: "Approved", color: "light-success" },
  MQ: { state: "Query Genrated", color: "light-secondary" },
  AUW: { state: "Underwiter Appr.", color: "light-secondary" },
};

const columnList = (state) => {
  const navigate = useNavigate();
  const columns1 = [
    {
      name: "Full Name",
      sortable: true,
      minWidth: "10rem",
      selector: (row) => row?.user?.full_name,
    },
    {
      name: "Email",
      sortable: true,
      minWidth: "20rem",
      selector: (row) => row?.user?.email,
    },
    {
      name: "Mobile",
      sortable: true,
      minWidth: "10rem",
      selector: (row) => row?.user?.mobile,
    },
    {
      name: "Source From",
      sortable: true,
      minWidth: "150px",
      selector: (row) => userType[row?.user?.user_type],
    },
    {
      name: "status",
      sortable: true,
      minWidth: "150px",
      selector: (row) => (
        <Badge pill color={status[row?.status]?.color}>
          {status[row?.status]?.state}
        </Badge>
      ),
    },
    {
      name: "View",
      sortable: true,
      minWidth: "150px",
      cell: (row) => (
        <Eye
          onClick={() => {
            navigate("/application-form-view", {
              state: { application_id: row?.uid },
            });
          }}
          size="14"
        />
      ),
    },
  ];

  const columns2 = [
    {
      name: "Full Name",
      sortable: true,
      minWidth: "10rem",
      selector: (row) => row?.user?.full_name,
    },
    {
      name: "Email",
      sortable: true,
      minWidth: "20rem",
      selector: (row) => row?.user?.email,
    },
    {
      name: "Mobile",
      sortable: true,
      minWidth: "10rem",
      selector: (row) => row?.user?.mobile,
    },
    {
      name: "Source From",
      sortable: true,
      minWidth: "150px",
      selector: (row) => userType[row?.user?.user_type],
    },
    {
      name: "status",
      sortable: true,
      minWidth: "150px",
      selector: (row) => (
        <Badge pill color={status[row?.status]?.color}>
          {status[row?.status]?.state}
        </Badge>
      ),
    },
    {
      name: "Query Management",
      sortable: true,
      minWidth: "15rem",
      cell: (row) => (
        <Button
          onClick={() => {
            navigate("/view-query", {
              state: {
                info: { name: row?.user?.full_name, gmail: row?.user?.email },
                application_id: row?.uid,
              },
            });
          }}
          className="btn-sm"
          color="info"
        >
          creat & send query
        </Button>
      ),
    },
    {
      name: "View",
      sortable: true,
      minWidth: "150px",
      cell: (row) => (
        <Eye
          onClick={() => {
            navigate("/application-form-view", {
              state: { application_id: row?.uid },
            });
          }}
          size="14"
        />
      ),
    },
  ];

  switch (state) {
    case "AUW" || "AA":
      return columns1;
    default:
      return columns2;
  }

//   P;
//   R;
//   A;
//   MQ;
};
export default columnList;
