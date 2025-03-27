import { NavLink } from "react-router-dom";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Container
} from "reactstrap";

const Welcome = () => {
  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center min-vh-100"
      style={{
        backgroundColor: "#3498db", // Màu xanh dương
        padding: "0",
        margin: "0",
      }}
    >
      <Card 
        className="shadow border-0"
        style={{
          width: "400px", // Chiều rộng cố định để tạo khối vuông
          maxWidth: "100%", // Đảm bảo không vượt quá màn hình nhỏ
          backgroundColor: "#ffffff", // Nền trắng cho card
        }}
      >
        <CardHeader className="text-center bg-white border-0">
          <h2 className="mb-0">Chào mừng</h2>
        </CardHeader>
        <CardBody className="px-5 py-5">
          <div className="text-center">
            <p className="mb-4">
              Vui lòng chọn một tùy chọn để tiếp tục
            </p>
            
            {/* Nút Đăng nhập */}
            <NavLink to="/auth/login" className="text-decoration-none">
              <Button 
                className="mb-3 w-100" 
                color="primary"
                type="button"
              >
                Đăng nhập
              </Button>
            </NavLink>

            {/* Nút Đăng ký */}
            <NavLink to="/auth/register" className="text-decoration-none">
              <Button 
                className="w-100" 
                color="secondary"
                type="button"
              >
                Tạo tài khoản mới
              </Button>
            </NavLink>

            {/* Liên kết bổ sung */}
            <div className="mt-3">
              <NavLink to="/auth/register" className="text-muted">
                <small>Chưa có tài khoản? Đăng ký ngay</small>
              </NavLink>
            </div>
          </div>
        </CardBody>
      </Card>
    </Container>
  );
};

export default Welcome;