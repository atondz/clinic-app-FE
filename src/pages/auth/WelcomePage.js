
import {
    Card, Row,
    Col
  } from "reactstrap";
  import { NavLink } from "react-router-dom";
  const Login = () => {
    return (
      <>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
           
           
          </Card>
          <Row className="mt-3">
            <Col xs="6">
              <a
                className="text-light"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <small>Forgot password?</small>
              </a>
            </Col>
            <Col className="text-right" xs="6">
              <a
                className="text-light"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
               <small>
          <NavLink 
            to="/auth/register" 
          >
            Create new account
          </NavLink>
        </small>
  
              </a>
            </Col>
          </Row>
        </Col>
      </>
    );
  };
  
  export default Login;
  