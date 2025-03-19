import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col
} from "reactstrap";
import { NavLink } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();

  // Trạng thái lưu dữ liệu form
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Cập nhật dữ liệu khi người dùng nhập vào ô input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Gửi dữ liệu lên API khi nhấn "Sign in"
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5001/api/users/login", formData);
      const token = response.data.token;

      // Lưu token vào localStorage
      localStorage.setItem("authToken", token);

      toast.success("Đăng nhập thành công! Chuyển hướng đến trang chính...");
      
      // Chuyển hướng sau 0.2 giây
      setTimeout(() => {
        navigate("/home");
      }, 200);
    } catch (error) {
      toast.error("Email hoặc mật khẩu không chính xác.");
      console.error(error);
    }
  };

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="text-center">
            <h2 className="mb-0">Đăng nhập</h2>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <Form role="form" onSubmit={handleSubmit}>
              {/* Email */}
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </InputGroup>
              </FormGroup>

              {/* Mật khẩu */}
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Mật khẩu"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </InputGroup>
              </FormGroup>

              {/* Ghi nhớ đăng nhập */}
              <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id="customCheckLogin"
                  type="checkbox"
                />
                <label className="custom-control-label" htmlFor="customCheckLogin">
                  <span className="text-muted">Ghi nhớ đăng nhập</span>
                </label>
              </div>

              {/* Nút Đăng nhập */}
              <div className="text-center">
                <Button className="my-4" color="primary" type="submit">
                  Đăng nhập
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>

        {/* Liên kết Quên mật khẩu và Đăng ký */}
        <Row className="mt-3">
          <Col xs="6">
            <a className="text-light" href="#pablo" onClick={(e) => e.preventDefault()}>
              <small>Quên mật khẩu?</small>
            </a>
          </Col>
          <Col className="text-right" xs="6">
            <NavLink to="/auth/register" className="text-light">
              <small>Tạo tài khoản mới</small>
            </NavLink>
          </Col>
        </Row>
      </Col>

      {/* ToastContainer để hiển thị thông báo */}
      <ToastContainer />
    </>
  );
};

export default Login;
