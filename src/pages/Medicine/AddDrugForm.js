// AddDrugForm
import Header from "../../components/Headers/Header";
import React, { useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddDrugForm = () => {
  const [formData, setFormData] = useState({
    medicine_code: "",
    medicine_name: "",
    medicine_type_id: "",
    price: "",
    unit: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDescriptionChange = (value) => {
    setFormData({ ...formData, description: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.medicine_code ||
      !formData.medicine_name ||
      !formData.medicine_type_id ||
      !formData.price ||
      !formData.unit ||
      !formData.description
    ) {
      alert("Vui lòng điền đầy đủ các trường bắt buộc!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5001/api/medicine", {
        medicine_code: formData.medicine_code,
        medicine_name: formData.medicine_name,
        medicine_type_id: parseInt(formData.medicine_type_id),
        price: parseInt(formData.price),
        unit: formData.unit,
        description: formData.description,
      });
      alert("Thêm thuốc thành công!");
      setFormData({
        medicine_code: "",
        medicine_name: "",
        medicine_type_id: "",
        price: "",
        unit: "",
        description: "",
      });
      navigate("/drug");
    } catch (error) {
      console.error("Lỗi khi thêm thuốc:", error.response?.data || error.message);
      alert(
        `Thêm thuốc thất bại! Lỗi: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  const handleCancel = () => {
    navigate("/drug");
  };

  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="container mt-4">
        <h4 className="mb-4" style={{ fontSize: "28px", fontWeight: "bold" }}>
          Thêm thuốc
        </h4>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="medicineCode">
                <Form.Label>
                  Mã thuốc <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Mã thuốc (VD: MED002)"
                  name="medicine_code"
                  value={formData.medicine_code}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="medicineName">
                <Form.Label>
                  Tên thuốc <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Tên thuốc"
                  name="medicine_name"
                  value={formData.medicine_name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="medicineTypeId">
                <Form.Label>
                  ID loại thuốc <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  type="number"
                  placeholder="ID loại thuốc (VD: 1)"
                  name="medicine_type_id"
                  value={formData.medicine_type_id}
                  onChange={handleChange}
                  required
                />
                <Form.Text muted>
                  (Cần lấy ID từ danh sách loại thuốc trước)
                </Form.Text>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="drugPrice">
                <Form.Label>
                  Giá <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Giá (VNĐ)"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="drugUnit">
                <Form.Label>
                  Đơn vị <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Đơn vị (VD: viên)"
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="drugDescription" className="mb-4">
            <Form.Label>
              Mô tả <span style={{ color: "red" }}>*</span>
            </Form.Label>
            <ReactQuill
              theme="snow"
              value={formData.description}
              onChange={handleDescriptionChange}
              placeholder="Nhập mô tả..."
              required
            />
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button variant="danger" onClick={handleCancel}>
              Quay lại
            </Button>
            <Button variant="primary" type="submit">
              Lưu lại
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default AddDrugForm;