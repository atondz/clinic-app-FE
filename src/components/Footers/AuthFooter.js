
import { NavItem, NavLink, Nav, Container, Row, Col } from "reactstrap";

const Login = () => {
  return (
    <>
      <footer className="py-5">
        <Container>
          <Row className="align-items-center justify-content-xl-between">
            <Col xl="6">
              <div className="copyright text-center text-xl-left text-muted">
           
            
                 PQToàn
                
              </div>
            </Col>
            <Col xl="6">
              <Nav className="nav-footer justify-content-center justify-content-xl-end">
                <NavItem>
                  <NavLink
                    href="https://www.creative-tim.com?ref=adr-auth-footer"
                    target="_blank"
                  >
                   PQ Toàn
                   </NavLink>
               </NavItem>
                <NavItem>
                  <NavLink   >
                    About Us
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink>
                    Blog
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink >
                    WDP
                  </NavLink>
                </NavItem>
              </Nav>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default Login;
