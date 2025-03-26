// Sidebar.js
import React, { useState } from "react";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
import PropTypes from "prop-types";

import {
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";

const Sidebar = (props) => {
  const [collapseOpen, setCollapseOpen] = useState(false);

  // Kiểm tra active route (nếu cần dùng cho việc đánh dấu link)
  const activeRoute = (routeName) => {
    return props.location && props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };

  // Toggle mở/đóng collapse
  const toggleCollapse = () => {
    setCollapseOpen((prev) => !prev);
  };

  // Đóng collapse khi click vào 1 link
  const closeCollapse = () => {
    setCollapseOpen(false);
  };

  // Tạo danh sách link từ mảng sidebarRoutes
  const createLinks = (routes) => {
    return routes.map((prop, key) => {
      return (
        <NavItem key={key}>
          <NavLink
            to={(prop.layout !== "/admin" ? prop.layout : "") + prop.path}
            tag={NavLinkRRD}
            onClick={closeCollapse}
            className={activeRoute(prop.path)}
          >
            <i className={prop.icon} />
            {prop.name}
          </NavLink>
        </NavItem>
      );
    });
  };

  // Sử dụng prop sidebarRoutes thay vì routes
  const { bgColor, sidebarRoutes, logo } = props;
  let navbarBrandProps = {};

  if (logo && logo.innerLink) {
    navbarBrandProps = {
      to: logo.innerLink,
      tag: Link,
    };
  } else if (logo && logo.outterLink) {
    navbarBrandProps = {
      href: logo.outterLink,
      target: "_blank",
    };
  }

  return (
    <Navbar
      className="navbar-vertical fixed-left navbar-dark bg-dark"
      expand="md"
      id="sidenav-main"
    >
      <Container fluid>
        {/* Nút Toggle */}
        <button className="navbar-toggler" type="button" onClick={toggleCollapse}>
          <span className="navbar-toggler-icon" />
        </button>
        {/* Brand/Logo */}
        {logo ? (
          <NavbarBrand className="pt-0" {...navbarBrandProps}>
            
          </NavbarBrand>
        ) : null}
        {/* User info cho Mobile */}
        <Nav className="align-items-center d-md-none">
          <UncontrolledDropdown nav>
            <DropdownToggle nav className="nav-link-icon">
              <i className="ni ni-bell-55" />
            </DropdownToggle>
            <DropdownMenu
              aria-labelledby="navbar-default_dropdown_1"
              className="dropdown-menu-arrow"
              right
            >
              <DropdownItem>Action</DropdownItem>
              <DropdownItem>Another action</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Something else here</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <UncontrolledDropdown nav>
            <DropdownToggle nav>
              <Media className="align-items-center">
               
              </Media>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-arrow" right>
              <DropdownItem className="noti-title" header tag="div">
                <h6 className="text-overflow m-0">Welcome!</h6>
              </DropdownItem>
              <DropdownItem to="/user-profile" tag={Link}>
                <i className="ni ni-single-02" />
                <span>Tài Khoản</span>
              </DropdownItem>
              <DropdownItem to="/user-profile" tag={Link}>
                <i className="ni ni-settings-gear-65" />
                <span>Cài Đặt</span>
              </DropdownItem>
              <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-calendar-grid-58" />
                <span>Activity</span>
              </DropdownItem>
              <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-support-16" />
                <span>Support</span>
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                <i className="ni ni-user-run" />
                <span>Logout</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        {/* Nội dung Collapse */}
        <Collapse navbar isOpen={collapseOpen}>
          {/* Header của Collapse dành cho Mobile */}
          <div className="navbar-collapse-header d-md-none">
            <Row>
              {logo ? (
                <Col className="collapse-brand" xs="6">
                  {logo.innerLink ? (
                    <Link to={logo.innerLink}>
                      <img alt={logo.imgAlt} src={logo.imgSrc} />
                    </Link>
                  ) : (
                    <a href={logo.outterLink}>
                      <img alt={logo.imgAlt} src={logo.imgSrc} />
                    </a>
                  )}
                </Col>
              ) : null}
              <Col className="collapse-close" xs="6">
                <button className="navbar-toggler" type="button" onClick={toggleCollapse}>
                  <span />
                  <span />
                </button>
              </Col>
            </Row>
          </div>
          {/* Form tìm kiếm dành cho Mobile */}
          <Form className="mt-4 mb-3 d-md-none">
            <InputGroup className="input-group-rounded input-group-merge">
              <Input
                aria-label="Search"
                className="form-control-rounded form-control-prepended"
                placeholder="Search"
                type="search"
              />
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <span className="fa fa-search" />
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </Form>
          {/* Navigation links */}
          <Nav navbar>{createLinks(sidebarRoutes)}</Nav>
          <hr className="my-3" />
          {/* Heading bổ sung (nếu có) */}
          <Nav className="mb-md-3" navbar>
            <NavItem className="active-pro active">
              {/* Ví dụ: link nâng cao */}
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};

Sidebar.defaultProps = {
  sidebarRoutes: [{}],
};

Sidebar.propTypes = {
  // Các link được hiển thị trên sidebar
  sidebarRoutes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    innerLink: PropTypes.string,
    outterLink: PropTypes.string,
    imgSrc: PropTypes.string.isRequired,
    imgAlt: PropTypes.string.isRequired,
  }),
};

export default Sidebar;
