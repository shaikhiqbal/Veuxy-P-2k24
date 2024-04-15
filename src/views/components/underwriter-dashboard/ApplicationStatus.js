// ** React Imports
import { Fragment, useState, React, useEffect } from "react";

// ** Third Party Components
import ReactPaginate from "react-paginate";
import DataTable from "react-data-table-component";
import { ChevronDown, Eye } from "react-feather";
import { Badge } from "reactstrap";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Input,
  Label,
  Button,
  CardTitle,
  CardHeader,
} from "reactstrap";

// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss";
import { useLocation, useNavigate } from "react-router-dom";

const userType = {
  1: "Admin",
  2: "FRT",
  3: "ISO",
  4: "Under Writer",
  5: "Merchant",
};

const status = {
  P: { state: "Pending", color: "light-warning" },
  R: { state: "Rejected", color: "light-danger" },
  A: { state: "Approved", color: "light-success" },
  MQ: { state: "Query Genrated", color: "light-secondary" },
  AUW: { state: "Underwiter Appr.", color: "light-secondary" },
  REJ: { state: "Underwiter Appr.", color: "light-danger" },
  INC: { state: "Incomplited", color: "light-danger" },
};

const ApplicationView = ({ list, title }) => {
  // ** States
  const [queryModel, setQueryModel] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState(0);
  const [userInfo, setUserInfo] = useState({
    name: "",
    gmail: "",
    application_id: "",
    template_uid: "",
  });
  //** Store Data
  const [data, setData] = useState(list?.length ? [...list] : []);

  // ** Navigate
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;
  //** Columns
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
      selector: (row) => userType[row?.created_by?.user_type],
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
      name: "Rates",
      sortable: true,
      minWidth: "150px",
      cell: (row) => (
        <Button
          className="btn-sm"
          color="info"
          onClick={() =>
            navigate("/merchant-rates", {
              state: { userId: row.uid },
            })
          }
        >
          Details
        </Button>
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
      selector: (row) => userType[row?.created_by?.user_type],
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
            sessionStorage.setItem("created_by",JSON.stringify(row?.created_by))
            navigate("/application-form-view", {
              state: { application_id: row?.uid },
            });
          }}
          size="14"
        />
      ),
    },
  ];

  const columns = (data) => {
    if (!data?.length) return [];
    switch (data[0].status) {
      case "AUW":
      case "AA":
        return columns1;
      default:
        return columns2;
    }
    // list[0] && list[0]?.status == ("AUW" || "AA")
    // ? columns1
    // : columns2
  };
  const openPreviouseUserModal = (data = {}) => {
    if (!data?.info) return;
    if (data?.openModal) {
      setQueryModel(data?.openModal);
      setUserInfo({
        name: data.info.name,
        gmail: data.info.gmail,
        application_id: data.info.application_id,
        template_uid: data.info.template_uid,
      });
    }
  };

  useEffect(() => {
    openPreviouseUserModal(state);
    navigate(location.pathname, { replace: true });
  }, [state]);

  // ** Function to handle Modal toggle
  // useEffect(() => {
  //   useJwt
  //     .application_view("P&status=MQ")
  //     .then((res) => {
  //       setData([...res?.data]);
  //     })
  //     .catch((err) => {
  //       console.log(err?.response);
  //     });
  // }, []);
  
  // ** Function to handle filter
  const handleFilter = (e) => {
    const value = e.target.value;
    let updatedData = [];
    setSearchValue(value);

    const status = {
      1: { title: "Current", color: "light-primary" },
      2: { title: "Professional", color: "light-success" },
      3: { title: "Rejected", color: "light-danger" },
      4: { title: "Resigned", color: "light-warning" },
      5: { title: "Applied", color: "light-info" },
    };

    if (value.length) {
      updatedData = data.filter((item) => {
        const startsWith =
          item.full_name.toLowerCase().startsWith(value.toLowerCase()) ||
          item.post.toLowerCase().startsWith(value.toLowerCase()) ||
          item.email.toLowerCase().startsWith(value.toLowerCase()) ||
          item.age.toLowerCase().startsWith(value.toLowerCase()) ||
          item.salary.toLowerCase().startsWith(value.toLowerCase()) ||
          item.start_date.toLowerCase().startsWith(value.toLowerCase()) ||
          status[item.status].title
            .toLowerCase()
            .startsWith(value.toLowerCase());

        const includes =
          item.full_name.toLowerCase().includes(value.toLowerCase()) ||
          item.post.toLowerCase().includes(value.toLowerCase()) ||
          item.email.toLowerCase().includes(value.toLowerCase()) ||
          item.age.toLowerCase().includes(value.toLowerCase()) ||
          item.salary.toLowerCase().includes(value.toLowerCase()) ||
          item.start_date.toLowerCase().includes(value.toLowerCase()) ||
          status[item.status].title.toLowerCase().includes(value.toLowerCase());

        if (startsWith) {
          return startsWith;
        } else if (!startsWith && includes) {
          return includes;
        } else return null;
      });
      setFilteredData(updatedData);
      setSearchValue(value);
    }
  };

  // ** Function to handle Pagination
  const handlePagination = (page) => {
    setCurrentPage(page.selected);
  };

  // ** Custom Pagination
  const CustomPagination = () => (
    <ReactPaginate
      previousLabel=""
      nextLabel=""
      forcePage={currentPage}
      onPageChange={(page) => handlePagination(page)}
      pageCount={
        searchValue.length
          ? Math.ceil(filteredData.length / 7)
          : Math.ceil(data.length / 7) || 1
      }
      breakLabel="..."
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
      activeClassName="active"
      pageClassName="page-item"
      breakClassName="page-item"
      nextLinkClassName="page-link"
      pageLinkClassName="page-link"
      breakLinkClassName="page-link"
      previousLinkClassName="page-link"
      nextClassName="page-item next-item"
      previousClassName="page-item prev-item"
      containerClassName="pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1"
    />
  );

  return (
    <Fragment>
      <Card>
        {/* <button className='w-25' onClick={()=>setData(x=>x+1)}>Call Data</button> */}
        <CardHeader className="flex-md-row flex-column align-md-items-center align-items-start border-bottom">
          <CardTitle tag="h4">{title}</CardTitle>
        </CardHeader>
        <Row className="justify-content-end mx-0">
          <Col
            className="d-flex align-items-center justify-content-end mt-1"
            md="6"
            sm="12"
          >
            <Label className="me-1" for="search-input">
              Search
            </Label>
            <Input
              className="dataTable-filter mb-50"
              type="text"
              bsSize="sm"
              id="search-input"
              value={searchValue}
              disabled
              onChange={handleFilter}
            />
          </Col>
        </Row>
        <div className="react-dataTable">
          <DataTable
            fixedHeader
            pagination
            highlightOnHover
            columns={columns(list)}
            fixedHeaderScrollHeight={"400rem"}
            paginationPerPage={7}
            className="react-dataTable"
            sortIcon={<ChevronDown size={10} />}
            paginationDefaultPage={currentPage + 1}
            paginationComponent={CustomPagination}
            // data={searchValue.length ? filteredData : data}
            data={list}
          />
        </div>
        {/* <ManualQuery
          open={queryModel}
          setOpen={setQueryModel}
          info={userInfo}
        /> */}
      </Card>
    </Fragment>
  );
};

export default ApplicationView;
