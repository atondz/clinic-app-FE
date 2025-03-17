
import React from "react";

import Index from "views/Index.js";
import Profile from "pages/profile/Profile.js";
import Maps from "pages/clinic/Maps";
import Register from "pages/auth/Register.js";
import Login from "pages/auth/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import Home from "pages/home/index.tsx";
import WelcomePage from "pages/auth/WelcomePage.js";
import Patient from "pages/patient/patient.js";
import NotFound from "pages/notFound";
import AddClinic from "pages/clinic/Addclinic.js";

import PatientForm from "pages/patient/patientForm";

import MedicineTypes from "pages/MedicineTypes/MedicineTypes.js";
import AddMedicineTypes from "pages/MedicineTypes/AddMedicineTypes.js";


var routes = [
  {
    path: "/home",
    name: "Home",
    icon: "fa fa-plus-square text-primary",
    component: <Home />,
    layout: "/admin",
  },
  {
    path: "/Welcome",
    name: "Welcome",
    icon: "fa fa-plus-square text-primary",
    component: <WelcomePage />,
    layout: "/auth",
  },
  {
    path: "/patient/new",
    name: "Thêm bệnh nhân",
    icon: "fa fa-plus-square text-primary",
    component: <PatientForm/>,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "Đơn Thuốc",
    icon: "fa fa-medkit text-orange",
    component: <Icons />,
    layout: "/admin",
  },
  {
    path: "/maps",
    name: "Phòng Khám",
    icon: "ni ni-pin-3 text-orange",
    component: <Maps />,
    layout: "/admin",
  },
  {
    path: "/addClinic",
    name: "Addclinic",
    icon: "ni ni-circle-08 text-pink",
    component: <AddClinic />,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: <Profile />,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Tables",
    icon: "ni ni-bullet-list-67 text-red",
    component: <Tables />,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: <Login />,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: <Register />,
    layout: "/auth",
  },
  {
    path: "/patient",
    name: "Patient",
    icon: "ni ni-circle-08 text-pink",
    component: <Patient />,
    layout: "/admin",
  },
  {
    path: "/notFound",
    name: "404",
    icon: "ni ni-circle-08 text-pink",
    component: <NotFound />,
    layout: "/admin",
  },
  {
    path: "/medicine-types",
    name: "Loại Thuốc",
    icon: "fa fa-pills text-primary",
    component: <MedicineTypes />,
    layout: "/admin",
  },
  {
    path: "/add-medicine-types",
    name: "Thêm Loại Thuốc",
    icon: "fa fa-plus-circle text-success",
    component: <AddMedicineTypes />,
    layout: "/admin",
  },

];


const sidebarRoutes = [
  {
    path: "/home",
    name: "Home",
    icon: "fa fa-plus-square text-primary",
    component: <Home />,
    layout: "/admin",
  },
  // {
  //   path: "/index",
  //   name: "Giấy Khám Bệnh",
  //   icon: "ni ni-collection",
  //   component: <Index />,
  //   layout: "/admin",
  // },
  {
    path: "/icons",
    name: "Đơn Thuốc",
    icon: "fa fa-medkit text-orange",
    component: <Icons />,
    layout: "/admin",
  },
  {
    path: "/maps",
    name: "Phòng Khám",
    icon: "ni ni-pin-3 text-orange",
    component: <Maps />,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: <Profile />,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Tables",
    icon: "ni ni-bullet-list-67 text-red",
    component: <Tables />,
    layout: "/admin",
  },
  {
    path: "/patient",
    name: "Patient",
    icon: "ni ni-circle-08 text-pink",
    component: <Patient />,
    layout: "/admin",
  },
  {
    path: "/medicine-types",
    name: "Loại Thuốc",
    icon: "fa fa-pills text-primary",
    component: <MedicineTypes />,
    layout: "/admin",
  },

];

export { routes, sidebarRoutes };

// Thêm dòng dưới để export mặc định (default export)
export default routes;
