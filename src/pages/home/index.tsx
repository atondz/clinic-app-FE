import React from "react";
// core components
// import Header from "components/Headers/Header.js";
import Header from "./../../components/Headers/Header";
import PatientTable from "../../components/Tables/PatientTable";

// import {
//   Badge,
//   Card,
//   CardHeader,
//   CardFooter,
//   DropdownMenu,
//   DropdownItem,
//   UncontrolledDropdown,
//   DropdownToggle,
//   Media,
//   Pagination,
//   PaginationItem,
//   PaginationLink,
//   Progress,
//   Table,
//   Container,
//   Row,
//   UncontrolledTooltip,
// } from "reactstrap";
const Home = () => {
  return (
    <>
      <Header />
     
      <PatientTable />
      
    </>
  );
};

export default Home;
