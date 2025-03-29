import React from "react";
import Profile from "pages/profile/Profile.js";
import Maps from "pages/clinic/Maps";
import Register from "pages/auth/Register.js";
import Login from "pages/auth/Login.js";
import Tables from "views/examples/Tables.js";
import Home from "pages/home/index.tsx";
import WelcomePage from "pages/auth/WelcomePage.js";
import Patient from "pages/patient/patient.js";
import NotFound from "pages/notFound";
import AddClinic from "pages/clinic/Addclinic.js";
import MedicineTypes from "pages/MedicineTypes/MedicineTypes.js";
import AddMedicineTypes from "pages/MedicineTypes/AddMedicineTypes.js";
import PatientForm from "pages/patient/patientForm";
import ListOfDrugs from "pages/Medicine/ListOfDrugs.js";
import AddDrugForm from "pages/Medicine/AddDrugForm.js";
import Prescription from "pages/Prescription/Prescription";
import RegistrationSystem from "pages/RegistrationExam/RegistrationSystem";
import RegistrationDetails from "pages/RegistrationExam/RegistrationDetails.js";
import DoctorDashboard from "pages/DoctorDashboard";
import PrescriptionOrder from 'pages/PrescriptionOrder'
import Bill from "pages/Bill";
import MedicalHistory from "pages/patient/MedicalHistory";
import { ROLE_ACCESS } from "config/constant";
import DiagnosisPage from "pages/Diagnosis/DiagnosisPage";

const routes = [
  {
    path: "/home",
    name: "Home",
    icon: "fa fa-plus-square text-primary",
    component: <Home />,
    layout: "/admin",
    roleAcces:  ROLE_ACCESS?.ALL
  },
  {
    path: "/regisExam",
    name: "Đăng ký khám",
    icon: "fa fa-plus-square text-primary",
    component: <RegistrationSystem />,
    layout: "/admin",
    roleAcces:  ROLE_ACCESS?.ALL
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
    roleAcces:  ROLE_ACCESS?.ALL
  },
  {
    path: "/prescription",
    name: "Đơn Thuốc",
    icon: "fa fa-medkit text-orange",
    component: <Prescription />,
    layout: "/admin",
    roleAcces:  ROLE_ACCESS?.ALL
  },
  
  {
    path: "/maps",
    name: "Phòng Khám",
    icon: "ni ni-pin-3 text-orange",
    component: <Maps />,
    layout: "/admin",
    roleAcces:  ROLE_ACCESS?.ALL
  },
  {
    path: "/addClinic",
    name: "Addclinic",
    icon: "ni ni-circle-08 text-pink",
    component: <AddClinic />,
    layout: "/admin",
    roleAcces:  ROLE_ACCESS?.ALL
  },
  {
    path: "/drug",
    name: "Thuốc",
    icon: "ni ni-pin-3 text-orange",
    component: <ListOfDrugs />,
    layout: "/admin",
    roleAcces:  ROLE_ACCESS?.ALL
  },
  {
    path: "/addDrugForm",
    name: "AddDrugForm",
    icon: "ni ni-pin-3 text-orange",
    component: <AddDrugForm />,
    layout: "/admin",
    roleAcces:  ROLE_ACCESS?.ALL
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: <Profile />,
    layout: "/admin",
    roleAcces:  ROLE_ACCESS?.ALL
    
  },
  {
    path: "/medical-history",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: <MedicalHistory />,
    layout: "/admin",
    roleAcces:  ROLE_ACCESS?.ALL
    
  },
  {
    path: "/registrationDetails",
    name: "details",
    icon: "ni ni-single-02 text-yellow",
    component: <RegistrationDetails />,
    layout: "/admin",
    roleAcces:  ROLE_ACCESS?.ALL
  },
  {
    path: "/tables",
    name: "Tables",
    icon: "ni ni-bullet-list-67 text-red",
    component: <Tables />,
    layout: "/admin",
    roleAcces:  ROLE_ACCESS?.ALL
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
    roleAcces:  ROLE_ACCESS?.ALL
  },
  {
    path: "/notFound",
    name: "404",
    icon: "ni ni-circle-08 text-pink",
    component: <NotFound />,
    layout: "/admin",
    roleAcces:  ROLE_ACCESS?.ALL
  },

  {
    path: "/medicine-types",
    name: "Loại Thuốc",
    icon: "fa fa-pills text-primary",
    component: <MedicineTypes />,
    layout: "/admin",
    roleAcces:  ROLE_ACCESS?.ALL
  },
  {
    path: "/add-medicine-types",
    name: "Thêm Loại Thuốc",
    icon: "fa fa-plus-circle text-success",
    component: <AddMedicineTypes />,
    layout: "/admin",
    roleAcces:  ROLE_ACCESS?.ALL
  },
  {
    path: "/doctors",
    name: "Doctor",
    icon: "fa fa-plus-circle text-success",
    component: <DoctorDashboard />,
    layout: "/admin",
    roleAcces:  ROLE_ACCESS?.ALL
  },
  {
    path: "/prescritions/:registration_id/:patient_id/:doctor_id",
    name: "Bill",
    icon: "fa fa-plus-circle text-success",
    component: <PrescriptionOrder />,
    layout: "/admin",
    roleAcces:  ROLE_ACCESS?.ALL
  },
  {
    path: "/bill",
    name: "Đơn thuốc",
    icon: "fa fa-plus-circle text-success",
    component: <Bill />,
    layout: "/admin",
    roleAcces:  ROLE_ACCESS?.ALL
  },
  {
    path: "/diagnosis/:registrationId/:patientId/:doctorId",
    name: "Đơn thuốc",
    icon: "fa fa-plus-circle text-success",
    component: <DiagnosisPage />,
    layout: "/admin",
  },
  {
    path: "/diagnosis/:registrationId/:patientId/:doctorId",
    name: "Đơn thuốc",
    icon: "fa fa-plus-circle text-success",
    component: <DiagnosisPage />,
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
    roleAcces:  ROLE_ACCESS?.ALL
  },
  {
    path: "/regisExam",
    name: "Đăng ký khám",
    icon: "fa fa-plus-square text-primary",
    component: <RegistrationSystem />,
    layout: "/admin",
    roleAcces:  ROLE_ACCESS?.STAFF
  },

  {
    path: "/maps",
    name: "Phòng Khám",
    icon: "ni ni-pin-3 text-orange",
    component: <Maps />,
    layout: "/admin",
    roleAcces:  ROLE_ACCESS?.ALL
  },
  {
    path: "/drug",
    name: "Thuốc",
    icon: "fas fa-capsules fs-1 text-orange",
    component: <ListOfDrugs />,
    layout: "/admin",
    roleAcces:  ROLE_ACCESS?.ALL
  },
  {
    path: "/patient",
    name: "Danh Sách Bệnh Nhân",
    icon: "ni ni-circle-08 text-pink",
    component: <Patient />,
    layout: "/admin",
    roleAcces:  ROLE_ACCESS?.ALL
  },
  {
    path: "/medicine-types",
    name: "Loại Thuốc",
    icon: "fa fa-pills text-primary",
    component: <MedicineTypes />,
    layout: "/admin",
    roleAcces:  ROLE_ACCESS?.ALL
  },
  {
    path: "/registrationDetails",
    name: "Danh Sách Đăng Ký",
    icon: "ni ni-single-02 text-yellow",
    component: <RegistrationDetails />,
    layout: "/admin",
    roleAcces:  ROLE_ACCESS?.ALL
  },
  {
    path: "/doctors",
    name: "Doctor",
    icon: "fa fa-plus-circle text-success",
    component: <DoctorDashboard />,
    layout: "/admin",
    roleAcces:  ROLE_ACCESS?.DOCTOR
  },
  {
    path: "/bill",
    name: "Hoá Đơn",
    icon: "fa fa-plus-circle text-success",
    component: <Bill />,
    layout: "/admin",
    roleAcces:  ROLE_ACCESS?.STAFF
  },
 

];

export { routes, sidebarRoutes };

// Thêm dòng dưới để export mặc định (default export)
export default routes;
