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
  Col,
} from "reactstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const navigate = useNavigate();

  // Trạng thái lưu dữ liệu form
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "staff",
  });

  // Cập nhật dữ liệu khi người dùng nhập vào ô input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Gửi dữ liệu lên API khi nhấn "Create Account"
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra nếu mật khẩu không khớp
    if (formData.password !== formData.confirmPassword) {
      toast.error("Mật khẩu không khớp. Vui lòng nhập lại.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5001/api/users/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      toast.success("Đăng ký thành công! Chuyển hướng đến trang đăng nhập...");
      console.log(response.data);

      // Chuyển sang trang đăng nhập sau 2 giây
      setTimeout(() => {
        navigate("/auth/login");
      }, 2000);
    } catch (error) {
      toast.error("Lỗi: Không thể đăng ký tài khoản.");
      console.error(error);
    }
  };

  return (
    <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="text-center">
            <h2 className="mb-0">Đăng ký tài khoản</h2>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <Form role="form" onSubmit={handleSubmit}>
              {/* Tên */}
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </InputGroup>
              </FormGroup>

              {/* Email */}
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
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
                    placeholder="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </InputGroup>
              </FormGroup>

              {/* Xác nhận mật khẩu */}
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </InputGroup>
              </FormGroup>

              {/* Vai trò */}
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-badge" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="select"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                  >
                    <option value="doctor">Bác sĩ</option>
                    <option value="staff">Nhân viên</option>
                    <option value="admin">Quản trị viên</option>
                  </Input>
                </InputGroup>
              </FormGroup>

              {/* Điều khoản sử dụng */}
              <Row className="my-4">
                <Col xs="12">
                  <div className="custom-control custom-control-alternative custom-checkbox">
                    <input
                      className="custom-control-input"
                      id="customCheckRegister"
                      type="checkbox"
                      required
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="customCheckRegister"
                    >
                      <span className="text-muted">
                        Tôi đồng ý với{" "}
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                          Chính sách bảo mật
                        </a>
                      </span>
                    </label>
                  </div>
                </Col>
              </Row>

              {/* Nút Đăng ký */}
              <div className="text-center">
                <Button className="mt-4" color="primary" type="submit">
                  Đăng ký
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>

      {/* ToastContainer để hiển thị thông báo */}
      <ToastContainer />
    </>
  );
};

export default Register;
