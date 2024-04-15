// ** React Imports
import { useState, Fragment, useMemo, useEffect } from "react";

// ** Third Party Components
import Flatpickr from "react-flatpickr";
import ReactPaginate from "react-paginate";
import { ChevronDown, Edit, Plus, Trash2 } from "react-feather";
import DataTable from "react-data-table-component";

// ** Temp User List
import tempDblist from "./tempDblist";

// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Input,
  Label,
  Row,
  Col,
  Button,
} from "reactstrap";

// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";

// ** Custom Form Component
import AddNewCustomer from "./AddNewCustomer";

const CustomerList = () => {
  // ** States
  const [Picker, setPicker] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchPost, setSearchPost] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [searchEmail, setSearchEmail] = useState("");
  const [searchSalary, setSearchSalary] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [tdata, setTData] = useState([...tempDblist]);
  const [offCanvas, setOffCanvas] = useState(false);

  // ** Function to handle Pagination
  const handlePagination = (page) => setCurrentPage(page.selected);

  // ** Handle OffCanvas
  const toggle = () => setOffCanvas(!offCanvas);

  // ** Table Adv Search Column
  const advSearchColumns = [
    {
      name: "Customer Name",
      sortable: true,
      minWidth: "200px",
      selector: (row) => row.full_name,
    },
    {
      name: "Customer Email",
      sortable: true,
      minWidth: "250px",
      selector: (row) => row.email,
    },
    {
      name: "Customer Phone",
      sortable: true,
      minWidth: "150px",
      selector: (row) => row.city,
    },
    {
      name: "Action",
      sortable: true,
      minWidth: "100px",
      cell: (row) => (
        <div className="d-flex">
          <Edit
            size={16}
            className="me-1 cursor-pointer"
            onClick={() => {
              setOffCanvas(!offCanvas);
            }}
          />
          <Trash2 size={16} className="cursor-pointer" />
        </div>
      ),
    },
  ];
  // ** Table  tdata  to render
  const dataToRender = () => {
    if (
      searchName.length ||
      searchPost.length ||
      searchEmail.length ||
      searchCity.length ||
      searchSalary.length ||
      Picker.length
    ) {
      return filteredData;
    } else {
      return tdata;
    }
  };

  // ** Custom Pagination
  const CustomPagination = () => (
    <ReactPaginate
      previousLabel={""}
      nextLabel={""}
      forcePage={currentPage}
      onPageChange={(page) => handlePagination(page)}
      pageCount={Math.ceil(dataToRender().length / 7) || 1}
      breakLabel={"..."}
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
      containerClassName={
        "pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1"
      }
    />
  );

  // ** Function to handle name filter
  const handleNameFilter = (e) => {
    const value = e.target.value;
    let updatedData = [];
    const dataToFilter = () => {
      if (
        searchEmail.length ||
        searchPost.length ||
        searchCity.length ||
        searchSalary.length ||
        Picker.length
      ) {
        return filteredData;
      } else {
        return tdata;
      }
    };

    setSearchName(value);

    if (value.length) {
      updatedData = dataToFilter().filter((item) => {
        const startsWith = item.full_name
          .toLowerCase()
          .startsWith(value.toLowerCase());

        const includes = item.full_name
          .toLowerCase()
          .includes(value.toLowerCase());

        if (startsWith) {
          return startsWith;
        } else if (!startsWith && includes) {
          return includes;
        } else return null;
      });
      setFilteredData([...updatedData]);
      setSearchName(value);
    }
  };

  // ** Function to handle email filter
  const handleEmailFilter = (e) => {
    const value = e.target.value;
    let updatedData = [];
    const dataToFilter = () => {
      if (
        searchName.length ||
        searchPost.length ||
        searchCity.length ||
        searchSalary.length ||
        Picker.length
      ) {
        return filteredData;
      } else {
        return tdata;
      }
    };

    setSearchEmail(value);
    if (value.length) {
      updatedData = dataToFilter().filter((item) => {
        const startsWith = item.email
          .toLowerCase()
          .startsWith(value.toLowerCase());

        const includes = item.email.toLowerCase().includes(value.toLowerCase());

        if (startsWith) {
          return startsWith;
        } else if (!startsWith && includes) {
          return includes;
        } else return null;
      });
      setFilteredData([...updatedData]);
      setSearchEmail(value);
    }
  };

  // ** Function to handle post filter
  const handlePostFilter = (e) => {
    const value = e.target.value;
    let updatedData = [];
    const dataToFilter = () => {
      if (
        searchEmail.length ||
        searchName.length ||
        searchCity.length ||
        searchSalary.length ||
        Picker.length
      ) {
        return filteredData;
      } else {
        return tdata;
      }
    };

    setSearchPost(value);
    if (value.length) {
      updatedData = dataToFilter().filter((item) => {
        const startsWith = item.post
          .toLowerCase()
          .startsWith(value.toLowerCase());

        const includes = item.post.toLowerCase().includes(value.toLowerCase());

        if (startsWith) {
          return startsWith;
        } else if (!startsWith && includes) {
          return includes;
        } else return null;
      });
      setFilteredData([...updatedData]);
      setSearchPost(value);
    }
  };

  // ** Function to handle city filter
  const handleCityFilter = (e) => {
    const value = e.target.value;
    let updatedData = [];
    const dataToFilter = () => {
      if (
        searchEmail.length ||
        searchName.length ||
        searchPost.length ||
        searchSalary.length ||
        Picker.length
      ) {
        return filteredData;
      } else {
        return tdata;
      }
    };

    setSearchCity(value);
    if (value.length) {
      updatedData = dataToFilter().filter((item) => {
        const startsWith = item.city
          .toLowerCase()
          .startsWith(value.toLowerCase());

        const includes = item.city.toLowerCase().includes(value.toLowerCase());

        if (startsWith) {
          return startsWith;
        } else if (!startsWith && includes) {
          return includes;
        } else return null;
      });
      setFilteredData([...updatedData]);
      setSearchCity(value);
    }
  };

  // ** Function to handle salary filter
  const handleSalaryFilter = (e) => {
    const value = e.target.value;
    let updatedData = [];
    const dataToFilter = () => {
      if (
        searchEmail.length ||
        searchName.length ||
        searchPost.length ||
        searchCity.length ||
        Picker.length
      ) {
        return filteredData;
      } else {
        return tdata;
      }
    };

    setSearchSalary(value);
    if (value.length) {
      updatedData = dataToFilter().filter((item) => {
        const startsWith = item.salary
          .toLowerCase()
          .startsWith(value.toLowerCase());

        const includes = item.salary
          .toLowerCase()
          .includes(value.toLowerCase());

        if (startsWith) {
          return startsWith;
        } else if (!startsWith && includes) {
          return includes;
        } else return null;
      });
      setFilteredData([...updatedData]);
      setSearchSalary(value);
    }
  };

  // ** Function to handle date filter
  const handleDateFilter = (range) => {
    const arr = [];
    let updatedData = [];
    const dataToFilter = () => {
      if (
        searchEmail.length ||
        searchName.length ||
        searchPost.length ||
        searchCity.length ||
        searchSalary.length
      ) {
        return filteredData;
      } else {
        return tdata;
      }
    };

    range.map((i) => {
      const date = new Date(i);

      const year = date.getFullYear();

      let month = (1 + date.getMonth()).toString();
      month = month.length > 1 ? month : `0${month}`;

      let day = date.getDate().toString();
      day = day.length > 1 ? day : `0${day}`;

      arr.push(`${month}/${day}/${year}`);
      return true;
    });

    setPicker(range);

    if (range.length) {
      updatedData = dataToFilter().filter((item) => {
        return (
          new Date(item.start_date).getTime() >= new Date(arr[0]).getTime() &&
          new Date(item.start_date).getTime() <= new Date(arr[1]).getTime()
        );
      });
      setFilteredData([...updatedData]);
      setPicker(range);
    }
  };

  // ** AddCustomer Memoization
  const addCustomer = useMemo(() => {
    return <AddNewCustomer open={offCanvas} toggle={toggle} />;
  }, [offCanvas]);

  return (
    <Fragment>
      <div className="mb-3 d-flex justify-content-end">
        <Button color="relief-primary" onClick={toggle}>
          <Plus size={14} /> Search Customer
        </Button>
      </div>
      <Card>
        <CardHeader className="border-bottom">
          <CardTitle tag="h4">Advance Search</CardTitle>
        </CardHeader>
        <CardBody>
          <Row className="mt-1 mb-50">
            <Col lg="4" md="6" className="mb-1">
              <Label className="form-label" for="name">
                Name:
              </Label>
              <Input
                id="name"
                placeholder="Bruce Wayne"
                value={searchName}
                onChange={handleNameFilter}
              />
            </Col>
            <Col lg="4" md="6" className="mb-1">
              <Label className="form-label" for="email">
                Email:
              </Label>
              <Input
                type="email"
                id="email"
                placeholder="Bwayne@email.com"
                value={searchEmail}
                onChange={handleEmailFilter}
              />
            </Col>
            <Col lg="4" md="6" className="mb-1">
              <Label className="form-label" for="post">
                Post:
              </Label>
              <Input
                id="post"
                placeholder="Web Designer"
                value={searchPost}
                onChange={handlePostFilter}
              />
            </Col>
            <Col lg="4" md="6" className="mb-1">
              <Label className="form-label" for="city">
                City:
              </Label>
              <Input
                id="city"
                placeholder="San Diego"
                value={searchCity}
                onChange={handleCityFilter}
              />
            </Col>
            <Col lg="4" md="6" className="mb-1">
              <Label className="form-label" for="date">
                Date:
              </Label>
              <Flatpickr
                className="form-control"
                id="date"
                value={Picker}
                options={{ mode: "range", dateFormat: "m/d/Y" }}
                onChange={(date) => handleDateFilter(date)}
              />
            </Col>
            <Col lg="4" md="6" className="mb-1">
              <Label className="form-label" for="salary">
                Salary:
              </Label>
              <Input
                id="salary"
                placeholder="10000"
                value={searchSalary}
                onChange={handleSalaryFilter}
              />
            </Col>
          </Row>
        </CardBody>
        <div className="react-dataTable">
          <DataTable
            noHeader
            pagination
            columns={advSearchColumns}
            paginationPerPage={7}
            className="react-dataTable"
            sortIcon={<ChevronDown size={10} />}
            paginationDefaultPage={currentPage + 1}
            paginationComponent={CustomPagination}
            data={dataToRender()}
          />
        </div>
      </Card>
      {addCustomer}
    </Fragment>
  );
};

export default CustomerList;
