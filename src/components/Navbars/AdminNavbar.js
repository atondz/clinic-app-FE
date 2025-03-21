import { Link } from "react-router-dom";
// reactstrap components
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
import { useNavigate } from "react-router-dom";
import { logout } from "utils/auth";

const AdminNavbar = (props) => {
  const navigate = useNavigate();
  return (
    <>
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
                  <span className="avatar avatar-sm rounded-circle ">
                    <img
                      alt="..."
                      src={require("../../assets/img/theme/team-4-800x800.jpg")}
                    />
                  </span>
                  <Media className="ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm font-weight-bold">
                      Phạm Quốc Toàn
                    </span>
                  </Media>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem className="noti-title" header tag="div">
                  <h6 className="text-overflow m-0">Welcome!</h6>
                </DropdownItem>
                <DropdownItem to="/user-profile" tag={Link}>
                  <i className="ni ni-single-02" />
                  <span>Trang cá nhân</span>
                </DropdownItem>
                <DropdownItem to="/user-profile" tag={Link}>
                  <i className="ni ni-settings-gear-65" />
                  <span>Cài đặt</span>
                </DropdownItem>
                <DropdownItem to="/user-profile" tag={Link}>
                  <i className="ni ni-calendar-grid-58" />
                  <span>Lịch khám bệnh</span>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-support-16" />
                  <span>Hỗ trợ</span>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      width: "100%",
                    }}
                  >
                    <i className="ni ni-user-run" />

                    <nav>
                      <button
                        onClick={() => logout(navigate)}
                        style={{
                          background: "none",
                          border: "none",
                          color: "inherit",
                          fontSize: "inherit",
                          display: "flex",
                          alignItems: "end flex",
                          gap: "8px",
                          width: "100%",
                          padding: "10px 15px",
                          cursor: "pointer",
                          textAlign: "left",
                          borderRadius: "5px",
                        }}
                      >
                        Đăng Xuất
                      </button>
                    </nav>
                  </div>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;
