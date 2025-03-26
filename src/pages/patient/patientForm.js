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
<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify"; // Import Toast
import "react-toastify/dist/ReactToastify.css"; // Import CSS của Toastify
=======
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios"; // Import axios
>>>>>>> 86fc312c54ddae2a718d1eeb94df1e2d008d9d9c

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

<<<<<<< HEAD
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
=======
  const [loading, setLoading] = useState(false); // Để kiểm tra trạng thái loading
  const [error, setError] = useState(""); // Để hiển thị lỗi nếu có

  const navigate = useNavigate(); // Sử dụng hook useNavigate
>>>>>>> 86fc312c54ddae2a718d1eeb94df1e2d008d9d9c

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
<<<<<<< HEAD
    setLoading(true);
    setError("");

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
        toast.success("🎉 Thêm bệnh nhân thành công!", { position: "top-right", autoClose: 1500 });
        setTimeout(() => navigate("/patient"), 1600); // Chờ 3 giây rồi chuyển trang
      }
    } catch (err) {
      setError("Có lỗi xảy ra khi thêm bệnh nhân. Vui lòng thử lại.");
      toast.error("❌ Lỗi: Không thể thêm bệnh nhân!", { position: "top-right", autoClose: 1500 });
      console.error("Error adding patient:", err.response?.data || err.message);
    } finally {
      setLoading(false);
=======
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
>>>>>>> 86fc312c54ddae2a718d1eeb94df1e2d008d9d9c
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
<<<<<<< HEAD
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
                      required
=======
                <FormGroup>
                    <Label for="name">
                      ID <span className="text-danger">*</span>
                    </Label>
                    <Input
                      type="string"
                      id="id"
                      name="id"
                      value={formData.idid}
                      onChange={handleChange}
                      placeholder="Nhập id"
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
>>>>>>> 86fc312c54ddae2a718d1eeb94df1e2d008d9d9c
                    />
                  </FormGroup>

                  <FormGroup>
<<<<<<< HEAD
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
=======
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
>>>>>>> 86fc312c54ddae2a718d1eeb94df1e2d008d9d9c
                    />
                  </FormGroup>

                  <FormGroup>
<<<<<<< HEAD
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
=======
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
>>>>>>> 86fc312c54ddae2a718d1eeb94df1e2d008d9d9c
                    />
                  </FormGroup>

                  <FormGroup>
<<<<<<< HEAD
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
=======
>>>>>>> 86fc312c54ddae2a718d1eeb94df1e2d008d9d9c
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
<<<<<<< HEAD
                      required
=======
>>>>>>> 86fc312c54ddae2a718d1eeb94df1e2d008d9d9c
                    />
                  </FormGroup>

                  {error && <p className="text-danger">{error}</p>} {/* Hiển thị lỗi nếu có */}

                  <Button color="success" className="mr-2" type="submit" disabled={loading}>
                    {loading ? "Đang lưu..." : "Lưu lại"}
                  </Button>
<<<<<<< HEAD
                  <Button color="light" onClick={() => navigate("/patient")}>
=======
                  <Button color="btn btn-light" onClick={() => navigate("/patients")}>
>>>>>>> 86fc312c54ddae2a718d1eeb94df1e2d008d9d9c
                    Quay lại
                  </Button>
                </Form>
              </Col>

              <Col md="6">
<<<<<<< HEAD
                {/* Nếu muốn thêm nội dung bên phải */}
=======
                {/* Có thể thêm thông tin khác ở đây nếu cần */}
>>>>>>> 86fc312c54ddae2a718d1eeb94df1e2d008d9d9c
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Container>
<<<<<<< HEAD

      {/* Đặt ToastContainer ở cuối */}
      <ToastContainer />
=======
>>>>>>> 86fc312c54ddae2a718d1eeb94df1e2d008d9d9c
    </>
  );
};

export default PatientForm;