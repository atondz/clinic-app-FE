import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth";
import WelcomePage  from 'pages/auth/WelcomePage.js';

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>

      {/* Chuyển hướng trang mặc định đến /auth/Welcome */}
      <Route path="/" element={<Navigate to="/auth/Welcome" />} />
      
      {/* Định tuyến cho /auth/Welcome */}
      <Route path="/auth/Welcome" element={<WelcomePage />} />
      
      {/* Các route khác cho AuthLayout */}
      <Route path="/auth/*" element={<AuthLayout />} />
      
      {/* Định tuyến cho AdminLayout (nếu có) */}
      <Route path="/*" element={<AdminLayout />} />

    </Routes>
  </BrowserRouter>
);
