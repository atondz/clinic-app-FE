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
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify"; // Import Toast
import "react-toastify/dist/ReactToastify.css"; // Import CSS của Toastify

const MedicalRecordForm = () => {
  const [formData, setFormData] = useState({
    medicalRecordId: "",
    patientId: "",
    doctor: "",
    symptoms: "",
    diagnosis: "",
    medication: "",
    notes: "",
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

    const formattedData = {
      medicalRecordId: formData.medicalRecordId || `MR${Date.now()}`,
      patientId: formData.patientId,
      doctor: formData.doctor,
      symptoms: formData.symptoms,
      diagnosis: formData.diagnosis,
      medication: formData.medication,
      notes: formData.notes,
    };

    try {
      const response = await axios.post(
        "http://localhost:5001/api/medicalRecords", // Đảm bảo URL API chính xác
        formattedData,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 201) {
        toast.success("🎉 Thêm giấy khám bệnh thành công!", { position: "top-right", autoClose: 1500 });
        setTimeout(() => navigate("/medical-records"), 1600); // Chuyển trang sau 1.6 giây
      }
    } catch (err) {
      setError("Có lỗi xảy ra khi thêm giấy khám bệnh. Vui lòng thử lại.");
      toast.error("❌ Lỗi: Không thể thêm giấy khám bệnh!", { position: "top-right", autoClose: 1500 });
      console.error("Error adding medical record:", err.response?.data || err.message);
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
            <h3 className="text-dark">Thêm giấy khám bệnh</h3>
            <p className="text-muted">Quản lý giấy khám bệnh / Thêm giấy khám bệnh</p>
          </Col>
        </Row>

        <Card className="mt-4">
          <CardBody>
            <Row>
              <Col md="6">
                <h4 className="text-dark">Thông tin giấy khám bệnh</h4>
                <p className="text-muted">Điền tất cả thông tin bên dưới</p>
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label for="medicalRecordId">
                      Mã giấy khám bệnh <span className="text-danger">*</span>
                    </Label>
                    <Input
                      type="text"
                      id="medicalRecordId"
                      name="medicalRecordId"
                      value={formData.medicalRecordId}
                      onChange={handleChange}
                      placeholder="Nhập mã giấy khám bệnh"
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="patientId">
                      Mã bệnh nhân <span className="text-danger">*</span>
                    </Label>
                    <Input
                      type="text"
                      id="patientId"
                      name="patientId"
                      value={formData.patientId}
                      onChange={handleChange}
                      placeholder="Nhập mã bệnh nhân"
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="doctor">
                      Bác sĩ <span className="text-danger">*</span>
                    </Label>
                    <Input
                      type="text"
                      id="doctor"
                      name="doctor"
                      value={formData.doctor}
                      onChange={handleChange}
                      placeholder="Nhập tên bác sĩ"
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="symptoms">
                      Triệu chứng <span className="text-danger">*</span>
                    </Label>
                    <Input
                      type="text"
                      id="symptoms"
                      name="symptoms"
                      value={formData.symptoms}
                      onChange={handleChange}
                      placeholder="Nhập triệu chứng"
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="diagnosis">
                      Chẩn đoán <span className="text-danger">*</span>
                    </Label>
                    <Input
                      type="text"
                      id="diagnosis"
                      name="diagnosis"
                      value={formData.diagnosis}
                      onChange={handleChange}
                      placeholder="Nhập chẩn đoán"
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="medication">
                      Thuốc chỉ định <span className="text-danger">*</span>
                    </Label>
                    <Input
                      type="text"
                      id="medication"
                      name="medication"
                      value={formData.medication}
                      onChange={handleChange}
                      placeholder="Nhập thuốc chỉ định"
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="notes">
                      Ghi chú
                    </Label>
                    <Input
                      type="text"
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="Nhập ghi chú"
                    />
                  </FormGroup>

                  {error && <p className="text-danger">{error}</p>} {/* Hiển thị lỗi nếu có */}

                  <Button color="success" className="mr-2" type="submit" disabled={loading}>
                    {loading ? "Đang lưu..." : "Lưu lại"}
                  </Button>
                  <Button color="light" onClick={() => navigate("/prescription")}>
                    Quay lại
                  </Button>
                </Form>
              </Col>

              <Col md="6">
                {/* Nếu muốn thêm nội dung bên phải */}
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Container>

      {/* Đặt ToastContainer ở cuối */}
      <ToastContainer />
    </>
  );
};

export default MedicalRecordForm;
