// // ** React Imports
// import { Fragment, useState, React, useEffect } from "react";

// // ** Add New Modal Component
// import BasicInfoModal from "../merchant-creation/BasicInfoModal";

// // ** Third Party Components
// import ReactPaginate from "react-paginate";
// import DataTable from "react-data-table-component";
// import { ChevronDown, Plus, Edit } from "react-feather";

// //** Api
// import useJwt from "@src/dashboard/jwt/useJwt";

// // ** Reactstrap Imports
// import {
//   Row,
//   Col,
//   Card,
//   Badge,
//   Input,
//   Label,
//   Button,
//   CardTitle,
//   CardHeader,
// } from "reactstrap";

// // ** Styles
// import "@styles/react/libs/flatpickr/flatpickr.scss";
// import "@styles/react/libs/tables/react-dataTable-component.scss";
// import { useNavigate } from "react-router-dom";

// const status = {
//   S: { title: "Accepted", color: "light-primary" },
//   P: { title: "Pending", color: "light-warning" },
//   R: { title: "Rejected", color: "light-danger" },
// };
// const DataTableWithButtons = () => {
//   // ** States
//   const [modal, setModal] = useState(false);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [searchValue, setSearchValue] = useState("");
//   const [filteredData, setFilteredData] = useState(0);

//   //** Store Data
//   const [data, setData] = useState([]);
//   const [editData, setEditData] = useState({});
//   const [block, setBlock] = useState(false);
//   const navigate = useNavigate();

//   //** Unblock User Hit
//   const unBlock = (uid) => {
//     useJwt
//       .unBlockUser(uid)
//       .then((res) => {
//         if (res?.status === 200) {
//           setBlock(!block);
//         }
//       })
//       .catch((err) => {
//         alert(err?.response?.data?.detail);
//       });
//   };

//   //** Block User Hit
//   const blockUser = (uid) => {
//     useJwt
//       .blockUserData(uid)
//       .then((res) => {
//         if (res.status == 204) {
//           setBlock(!block);
//         }
//       })
//       .catch((err) => {
//         alert(err?.response?.data?.detail || "Somthing Wrong");
//       });
//   };

//   //** Columns
//   const columns = [
//     {
//       name: "#",
//       sortable: true,
//       minWidth: "5px",
//       selector: (row) => row.uid.slice(0, 4),
//       selector: (row) => row.uid,
//     },
//     {
//       name: "Name",
//       sortable: true,
//       selector: (row) => row.user.full_name,
//     },
//     {
//       name: "E-mail",
//       sortable: true,
//       minWidth: "250px",
//       selector: (row) => row.user.email,
//     },
//     {
//       name: "Phone",
//       sortable: true,
//       minWidth: "max-content",
//       selector: (row) => row.user.mobile,
//     },
//     {
//       name: "Status",
//       sortable: true,
//       cell: (row) => {
//         return (
//           <Badge color={status[row.status]?.color} pill>
//             {status[row.status]?.title}
//           </Badge>
//         );
//       },
//     },
//     {
//       name: "Note",
//       sortable: true,
//       cell: (row) => {
//         return (
//           <Button
//             color="primary"
//             size="sm"
//             onClick={() =>
//               navigate("/note", {
//                 state: { application_id: row?.uid, user_type: "merchant" },
//               })
//             }
//           >
//             Note
//           </Button>
//         );
//       },
//     },
//     {
//       name: "Timeline",
//       sortable: true,
//       minWidth: "max-content",
//       selector: (row) => (
//         <Button.Ripple
//           onClick={() => navigate("/timeline", { state: row?.uid })}
//           outline
//           color="primary"
//           size="sm"
//         >
//           Timeline
//         </Button.Ripple>
//       ),
//     },
//     {
//       name: "Block",
//       sortable: true,
//       minWidth: "100px",
//       cell: (row) => {
//         return (
//           <div className="form-switch form-check-primary">
//             <Input
//               type="switch"
//               name="icon-primary"
//               onClick={() => {
//                 if (row?.user?.is_active) {
//                   unBlock(row?.user?.uid);
//                 } else {
//                   blockUser(row?.user?.uid);
//                 }
//               }}
//               checked={row.is_active}
//             />
//           </div>
//         );
//       },
//     },
//     {
//       name: "Actions",
//       allowOverflow: true,
//       cell: (row) => {
//         return (
//           <div className="d-flex  justify-content-between">
//             <Edit
//               onClick={() => navigate("/applicationform", { state: row?.uid })}
//               className="ms-1"
//               size={15}
//             />
//           </div>
//         );
//       },
//     },
//   ];

//   // ** Function to handle Modal toggle
//   const handleModal = () => navigate("/basicinformation");

//   // ** Function to handle filter
//   const handleFilter = (e) => {
//     const value = e.target.value;
//     let updatedData = [];
//     setSearchValue(value);

//     const status = {
//       1: { title: "Current", color: "light-primary" },
//       2: { title: "Professional", color: "light-success" },
//       3: { title: "Rejected", color: "light-danger" },
//       4: { title: "Resigned", color: "light-warning" },
//       5: { title: "Applied", color: "light-info" },
//     };

//     if (value.length) {
//       updatedData = data.filter((item) => {
//         const startsWith =
//           item.full_name.toLowerCase().startsWith(value.toLowerCase()) ||
//           item.post.toLowerCase().startsWith(value.toLowerCase()) ||
//           item.email.toLowerCase().startsWith(value.toLowerCase()) ||
//           item.age.toLowerCase().startsWith(value.toLowerCase()) ||
//           item.salary.toLowerCase().startsWith(value.toLowerCase()) ||
//           item.start_date.toLowerCase().startsWith(value.toLowerCase()) ||
//           status[item.status].title
//             .toLowerCase()
//             .startsWith(value.toLowerCase());

//         const includes =
//           item.full_name.toLowerCase().includes(value.toLowerCase()) ||
//           item.post.toLowerCase().includes(value.toLowerCase()) ||
//           item.email.toLowerCase().includes(value.toLowerCase()) ||
//           item.age.toLowerCase().includes(value.toLowerCase()) ||
//           item.salary.toLowerCase().includes(value.toLowerCase()) ||
//           item.start_date.toLowerCase().includes(value.toLowerCase()) ||
//           status[item.status].title.toLowerCase().includes(value.toLowerCase());

//         if (startsWith) {
//           return startsWith;
//         } else if (!startsWith && includes) {
//           return includes;
//         } else return null;
//       });
//       setFilteredData(updatedData);
//       setSearchValue(value);
//     }
//   };

//   // ** Function to handle Pagination
//   const handlePagination = (page) => {
//     setCurrentPage(page.selected);
//   };

//   // ** Custom Pagination
//   const CustomPagination = () => (
//     <ReactPaginate
//       previousLabel=""
//       nextLabel=""
//       forcePage={currentPage}
//       onPageChange={(page) => handlePagination(page)}
//       pageCount={
//         searchValue.length
//           ? Math.ceil(filteredData.length / 7)
//           : Math.ceil(data.length / 7) || 1
//       }
//       breakLabel="..."
//       pageRangeDisplayed={2}
//       marginPagesDisplayed={2}
//       activeClassName="active"
//       pageClassName="page-item"
//       breakClassName="page-item"
//       nextLinkClassName="page-link"
//       pageLinkClassName="page-link"
//       breakLinkClassName="page-link"
//       previousLinkClassName="page-link"
//       nextClassName="page-item next-item"
//       previousClassName="page-item prev-item"
//       containerClassName="pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1"
//     />
//   );

//   const getApplication = async () => {
//     try {
//       const res = await useJwt.application_view();
//       if (res?.status) {
//         setData(res?.data);
//         console.log(res.data);
//       }
//     } catch (err) {
//       // alert(err?.response?.status);
//       console.log(err?.response?.status);
//     }
//   };
//   useEffect(() => {
//     getApplication();
//     // getTableData();
//   }, [modal, block]);
//   return (
//     <Fragment>
//       <Card>
//         <CardHeader className="flex-md-row flex-column align-md-items-center align-items-start border-bottom">
//           <CardTitle tag="h4">Merchant Management</CardTitle>
//           <div className="d-flex mt-md-0 mt-1">
//             <Button className="ms-2" color="primary" onClick={handleModal}>
//               <Plus size={15} />
//               <span className="align-middle ms-50">Add Merchant</span>
//             </Button>
//           </div>
//         </CardHeader>
//         <Row className="justify-content-end mx-0">
//           <Col
//             className="d-flex align-items-center justify-content-end mt-1"
//             md="6"
//             sm="12"
//           >
//             <Label className="me-1" for="search-input">
//               Search
//             </Label>
//             <Input
//               className="dataTable-filter mb-50"
//               type="text"
//               bsSize="sm"
//               id="search-input"
//               value={searchValue}
//               disabled
//               onChange={handleFilter}
//             />
//           </Col>
//         </Row>
//         <div className="react-dataTable">
//           <DataTable
//             fixedHeader
//             pagination
//             highlightOnHover
//             columns={columns}
//             fixedHeaderScrollHeight={"400rem"}
//             paginationPerPage={7}
//             className="react-dataTable"
//             sortIcon={<ChevronDown size={10} />}
//             paginationDefaultPage={currentPage + 1}
//             paginationComponent={CustomPagination}
//             data={searchValue.length ? filteredData : data}
//           />
//         </div>
//       </Card>
//       <BasicInfoModal open={modal} setOpen={setModal} userData={editData} />
//     </Fragment>
//   );
// };

// export default DataTableWithButtons;

import React from "react";
import MerchantManagmentTable from "../../../../components/iso-management/MerchantManagmentTable";
import BasicInfoModal from "../merchant-creation/BasicInfoModal";

const DataTableWithButtons = () => {
  return (
    <div>
      <MerchantManagmentTable BasicInfoModal={BasicInfoModal} />
    </div>
  );
};

export default DataTableWithButtons;
