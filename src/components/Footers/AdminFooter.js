
import { Container, Row, Col, Nav, NavItem, NavLink } from "reactstrap";

const Footer = () => {
  return (
    <footer className="footer">
      <Row className="align-items-center justify-content-xl-between">
        <Col xl="6">
          <div className="copyright text-center text-xl-left text-muted">
          
              
            
          </div>
        </Col>

        <Col xl="6">
          <Nav className="nav-footer justify-content-center justify-content-xl-end">
            <NavItem>
              <NavLink
                
              >
                Clinic care
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink >
              
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink >
                
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink>
                
              </NavLink>
            </NavItem>
          </Nav>
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;
