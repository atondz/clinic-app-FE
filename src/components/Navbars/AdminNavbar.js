import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Navbar,
  Nav,
  Container,
  Media,
} from "reactstrap";
import { logout } from "utils/auth";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        console.error("Token không tồn tại!");
        return;
      }

      try {
        const res = await axios.get("http://localhost:5001/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(res.data);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
      }
    };

    fetchUserData();
  }, []);

  const getAvatarInitials = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .slice(0, 2)
      .map((word) => word.charAt(0).toUpperCase())
      .join("");
  };

  return (
    <Navbar className="navbar-top navbar-dark pt-2" expand="md" id="navbar-main">
      <Container fluid>
        <Link
          className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
          to="/home"
        >
          Clinic app
        </Link>

        <Nav className="align-items-center d-none d-md-flex pb-1" navbar>
          <UncontrolledDropdown nav>
            <DropdownToggle className="pr-0" nav>
              <Media className="align-items-center">
                <span
                  className="avatar avatar-sm rounded-circle bg-primary text-white d-flex align-items-center justify-content-center"
                >
                  {user ? getAvatarInitials(user.name) : ""}
                </span>
                <Media className="ml-2 d-none d-lg-block">
                  <span className="mb-0 text-sm font-weight-bold">
                    {user ? user.name : "Loading..."}
                  </span>
                </Media>
              </Media>
            </DropdownToggle>

            <DropdownMenu className="dropdown-menu-arrow" end>
              <DropdownItem className="noti-title" header tag="div">
                <h6 className="text-overflow m-0">Chào mừng!</h6>
              </DropdownItem>
              <DropdownItem to="/user-profile" tag={Link}>
                <i className="ni ni-single-02" />
                <span>Trang cá nhân</span>
              </DropdownItem>
              <DropdownItem to="/settings" tag={Link}>
                <i className="ni ni-settings-gear-65" />
                <span>Cài đặt</span>
              </DropdownItem>
              <DropdownItem to="/appointments" tag={Link}>
                <i className="ni ni-calendar-grid-58" />
                <span>Lịch khám bệnh</span>
              </DropdownItem>
              <DropdownItem to="/support" tag={Link}>
                <i className="ni ni-support-16" />
                <span>Hỗ trợ</span>
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={() => logout(navigate)}>
                <i className="ni ni-user-run" />
                <span>Đăng Xuất</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default AdminNavbar;
