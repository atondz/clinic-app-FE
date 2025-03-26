import React from "react";

import Profile from "pages/profile/Profile.js";
import Maps from "pages/clinic/Maps";
import Register from "pages/auth/Register.js";
import Login from "pages/auth/Login.js";
import Tables from "views/examples/Tables.js";

import Home from "pages/home/index.tsx";
import WelcomePage from "pages/auth/WelcomePage.js";
<<<<<<< HEAD
=======
import PatientForm from "pages/patient/patientForm";
>>>>>>> 86fc312c54ddae2a718d1eeb94df1e2d008d9d9c
import Patient from "pages/patient/patient.js";
import NotFound from "pages/notFound";
import AddClinic from "pages/clinic/Addclinic.js";
import EditPatient from "./pages/patient/editPatient.js";

import MedicineTypes from "pages/MedicineTypes/MedicineTypes.js";
import AddMedicineTypes from "pages/MedicineTypes/AddMedicineTypes.js";

<<<<<<< HEAD
import PatientForm from "pages/patient/patientForm";
import ListOfDrugs from "pages/Medicine/ListOfDrugs.js";
import AddDrugForm from "pages/Medicine/AddDrugForm.js";
import Prescription from "pages/Prescription/Prescription";
import RegistrationSystem from "pages/RegistrationExam/RegistrationSystem";
import RegistrationDetails from "pages/RegistrationExam/RegistrationDetails.js";
import PrescriptionForm  from "pages/Prescription/PrescriptionForm.js";
import PatientDetail from "pages/Prescription/PatientDetail";
=======

>>>>>>> 86fc312c54ddae2a718d1eeb94df1e2d008d9d9c
var routes = [
  {
    path: "/home",
    name: "Home",
    icon: "fa fa-plus-square text-primary",
    component: <Home />,
    layout: "/admin",
  },
  {
    path: "/regisExam",
    name: "Đăng ký khám",
    icon: "fa fa-plus-square text-primary",
    component: <RegistrationSystem />,
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
    component: <PatientForm />,
    layout: "/admin",
  },
  {
    path: "/prescription",
    name: "Đơn Thuốc",
    icon: "fa fa-medkit text-orange",
    component: <Prescription />,
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
    path: "/drug",
    name: "Thuốc",
    icon: "ni ni-pin-3 text-orange",
    component: <ListOfDrugs />,
    layout: "/admin",
  },
  {
    path: "/addDrugForm",
    name: "AddDrugForm",
    icon: "ni ni-pin-3 text-orange",
    component: <AddDrugForm />,
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
    path: "/registrationDetails",
    name: "details",
    icon: "ni ni-single-02 text-yellow",
    component: <RegistrationDetails />,
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
<<<<<<< HEAD
    path: "/notFound",
    name: "404",
=======
    path: "/patient/new",
    name: "PatientForm",
    icon: "ni ni-circle-08 text-pink",
    component: <PatientForm />,
    layout: "/admin",
  },
  {
    path: "/patient/edit/:id",
    name: "Edit Patient",
>>>>>>> 86fc312c54ddae2a718d1eeb94df1e2d008d9d9c
    icon: "ni ni-circle-08 text-pink",
    component: <EditPatient />,
    layout: "/admin",
  },
<<<<<<< HEAD
=======
];
>>>>>>> 86fc312c54ddae2a718d1eeb94df1e2d008d9d9c

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
  {
    path: "/prescription/add-medical-certificate",
    name: "Thêm Giấy khám bệnh",
    icon: "fa fa-plus-circle text-success",
    component: <PrescriptionForm />,
    layout: "/admin",
  },
  {
    path: "/prescription/patientDetail",
    name: "Chi Tiết Bệnh Nhân ",
    icon: "fa fa-plus-circle text-success",
    component: <PatientDetail />,
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
  {
    path: "/regisExam",
    name: "Đăng ký khám",
    icon: "fa fa-plus-square text-primary",
    component: <RegistrationSystem />,
    layout: "/admin",
  },
  {
    path: "/prescription",
    name: "Giấy Khám Bệnh",
    icon: "fa fa-medkit text-orange",
    component: <Prescription />,
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
    path: "/drug",
    name: "Thuốc",
    icon: "fas fa-capsules fs-1 text-orange",
    component: <ListOfDrugs />,
    layout: "/admin",
  },
  {
    path: "/patient",
    name: "Danh Sách Bệnh Nhân",
    icon: "ni ni-circle-08 text-pink",
    component: <Patient />,
    layout: "/admin",
  },
<<<<<<< HEAD
  {
    path: "/medicine-types",
    name: "Loại Thuốc",
    icon: "fa fa-pills text-primary",
    component: <MedicineTypes />,
    layout: "/admin",
  },
  // {
  //   path: "/icons",
  //   name: "Đơn Thuốc",
  //   icon: "fa fa-medkit text-orange",
  //   component: <Icons />,
  //   layout: "/admin",
  // },
=======
 
   
>>>>>>> 86fc312c54ddae2a718d1eeb94df1e2d008d9d9c
];

export { routes, sidebarRoutes };

// Thêm dòng dưới để export mặc định (default export)
export default routes;