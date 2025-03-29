
import React from "react";
import { useLocation, Route, Routes, Navigate } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import { sidebarRoutes } from "routes.js";

import routes from "routes.js";
import { ROLE_ACCESS } from "config/constant";
// import notFound from './../pages/notFound';

const Admin = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();

  const roleAcces = localStorage.getItem("roleAccess");

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route path={prop.path} element={prop.component} key={key} />
        );
      } else {
        return null;
      }
    });
  };

  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        props?.location?.pathname.indexOf(routes[i].layout + routes[i].path) !==
        -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  const sidebarRouterByRole = sidebarRoutes.filter((sidebarRoute) => sidebarRoute.roleAcces === roleAcces?.toUpperCase() || sidebarRoute.roleAcces === ROLE_ACCESS.ALL);

  console.log("sidebarRouterByRole", sidebarRouterByRole, roleAcces?.toLowerCase())
  return (
    <>
   <Sidebar
  {...props}
  sidebarRoutes={sidebarRouterByRole}

/>


      <div className="main-content" ref={mainContent}>
        <AdminNavbar
          {...props}
          brandText={getBrandText(props?.location?.pathname)}
        />
        <Routes>
          {getRoutes(routes)}
          <Route path="*" element={<Navigate to="/notFound" replace />} />
        </Routes>
        <Container
  fluid
  style={{
    position: "fixed",
    bottom: 0,
    width: "85%",
    backgroundColor: "#f8f9fa",
    textAlign: "center",
  }}
>
  
</Container>

      </div>
    </>
  );
};

export default Admin;
