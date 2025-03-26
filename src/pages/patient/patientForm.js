import React, { useState } from "react";
import Header from "../../components/Headers/Header";
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
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PatientForm = () => {
  const [formData, setFormData] = useState({
    id_card: "",
    patient_id: "",
    name: "",
    gender: "Nam",
    birth_date: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // ✅ Kiểm tra CMND/CCCD đúng 12 số
    if (!/^\d{12}$/.test(formData.id_card)) {
      toast.error("❌ CMND/CCCD phải gồm đúng 12 chữ số!");
      setLoading(false);
      return;
    }

    const formattedData = {
      id_card: formData.id_card,
      patient_id: formData.patient_id || `PAT${Date.now()}`,
      name: formData.name,
      gender: formData.gender === "Nam" ? true : false,
      birth_date: formData.birth_date,
      phone: formData.phone,
      address: formData.address,
    };

    try {
      const response = await axios.post(
        "http://localhost:5001/api/patients",
        formattedData,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 201) {
        toast.success("🎉 Thêm bệnh nhân thành công!", {
          position: "top-right",
          autoClose: 1500,
        });
        setTimeout(() => navigate("/patient"), 1600);
      }
    } catch (err) {
      setError("Có lỗi xảy ra khi thêm bệnh nhân. Vui lòng thử lại.");
      toast.error("❌ Lỗi: Không thể thêm bệnh nhân!", {
        position: "top-right",
        autoClose: 1500,
      });
      console.error("Error adding patient:", err.response?.data || err.message);
    } finally {
      setLoading(false);
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
                    <Label for="id_card">
                      CMND/CCCD <span className="text-danger">*</span>
                    </Label>
                    <Input
                      type="text"
                      id="id_card"
                      name="id_card"
                      value={formData.id_card}
                      onChange={handleChange}
                      placeholder="Nhập CMND/CCCD"
                      pattern="\d{12}"
                      title="CMND/CCCD phải gồm đúng 12 chữ số"
                      required
                      maxLength={12}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="patient_id">
                      Mã bệnh nhân <span className="text-danger">*</span>
                    </Label>
                    <Input
                      type="text"
                      id="patient_id"
                      name="patient_id"
                      value={formData.patient_id}
                      onChange={handleChange}
                      placeholder="Nhập mã bệnh nhân (hoặc để trống để tự tạo)"
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
                      required
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
                      required
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
                    <Label for="birth_date">
                      Ngày sinh <span className="text-danger">*</span>
                    </Label>
                    <Input
                      type="date"
                      id="birth_date"
                      name="birth_date"
                      value={formData.birth_date}
                      onChange={handleChange}
                      required
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
                      required
                    />
                  </FormGroup>

                  {error && <p className="text-danger">{error}</p>}

                  <Button color="success" className="mr-2" type="submit" disabled={loading}>
                    {loading ? "Đang lưu..." : "Lưu lại"}
                  </Button>
                  <Button color="light" onClick={() => navigate("/patient")}>
                    Quay lại
                  </Button>
                </Form>
              </Col>

              <Col md="6">
                {/* Bạn có thể thêm nội dung phụ bên phải tại đây */}
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Container>

      <ToastContainer />
    </>
  );
};

export default PatientForm;
