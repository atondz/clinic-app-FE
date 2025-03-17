import React, { useState } from "react";
import Header from "../../components/Headers/Header"; // Giả sử Header có sẵn
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios"; // Import axios

const PatientForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "Nam",
    dob: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(false); // Để kiểm tra trạng thái loading
  const [error, setError] = useState(""); // Để hiển thị lỗi nếu có

  const navigate = useNavigate(); // Sử dụng hook useNavigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Bắt đầu trạng thái loading
    setError(""); // Reset lỗi

    try {
      // Gửi dữ liệu form đến API (Sử dụng URL của bạn và thêm id nếu có)
      const response = await axios.post("http://localhost:5001/api/patients", formData);
      
      // Kiểm tra phản hồi từ server
      if (response.status === 201) {
        console.log("Patient added successfully:", response.data);
        navigate("/patients"); // Chuyển hướng đến trang danh sách bệnh nhân
      }
    } catch (err) {
      // Xử lý lỗi nếu có
      setError("Có lỗi xảy ra khi thêm bệnh nhân. Vui lòng thử lại.");
      console.error("Error adding patient:", err);
    } finally {
      setLoading(false); // Kết thúc trạng thái loading
    }
  };

  return (
    <>
      <Header />
      <Container fluid className="mt-4">
        <Row>
          <Col>
            <h3 className="text-dark">Thêm bệnh nhân</h3>
            <p className="text-muted">Quản lý bệnh nhân / Thêm bệnh nhân</p>
          </Col>
        </Row>

        <Card className="mt-4">
          <CardBody>
            <Row>
              <Col md="6">
                <h4 className="text-dark">Thông tin bệnh nhân</h4>
                <p className="text-muted">Điền tất cả thông tin bên dưới</p>
                <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="name">
                      ID <span className="text-danger">*</span>
                    </Label>
                    <Input
                      type="text"
                      id="id"
                      name="id"
                      value={formData.id}
                      onChange={handleChange}
                      placeholder="Nhập id "
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="name">
                      Họ và tên <span className="text-danger">*</span>
                    </Label>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Nhập họ và tên"
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="phone">
                      Số điện thoại <span className="text-danger">*</span>
                    </Label>
                    <Input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Nhập số điện thoại"
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="gender">
                      Giới tính <span className="text-danger">*</span>
                    </Label>
                    <div>
                      <Label className="mr-4">
                        <Input
                          type="radio"
                          name="gender"
                          value="Nam"
                          checked={formData.gender === "Nam"}
                          onChange={handleChange}
                        />
                        Nam
                      </Label>
                      <Label>
                        <Input
                          type="radio"
                          name="gender"
                          value="Nữ"
                          checked={formData.gender === "Nữ"}
                          onChange={handleChange}
                        />
                        Nữ
                      </Label>
                    </div>
                  </FormGroup>

                  <FormGroup>
                    <Label for="dob">
                      Ngày sinh <span className="text-danger">*</span>
                    </Label>
                    <Input
                      type="date"
                      id="dob"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="address">
                      Địa chỉ <span className="text-danger">*</span>
                    </Label>
                    <Input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Nhập địa chỉ"
                    />
                  </FormGroup>

                  {error && <p className="text-danger">{error}</p>} {/* Hiển thị lỗi nếu có */}

                  <Button color="success" className="mr-2" type="submit" disabled={loading}>
                    {loading ? "Đang lưu..." : "Lưu lại"}
                  </Button>
                  <Button color="btn btn-light" onClick={() => navigate("/patient")}>
                    Quay lại
                  </Button>
                </Form>
              </Col>

              <Col md="6">
                {/* Có thể thêm thông tin khác ở đây nếu cần */}
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Container>
    </>
  );
};

export default PatientForm;