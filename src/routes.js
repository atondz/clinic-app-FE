
import Index from "views/Index.js";
import Profile from "pages/profile/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "pages/auth/Register.js";
import Login from "pages/auth/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import Home from "pages/home/index.tsx";
import WelcomePage from "pages/auth/WelcomePage.js";


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
    name: "nigga",
    icon: "fa fa-plus-square text-primary",
    component: <WelcomePage />,
    layout: "/auth",
  },
  {
    path: "/index",
    name: "Giấy Khám Bệnh",
    icon: "fa fa-plus-square text-primary",
    component: <Index />,
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
];
export default routes;
