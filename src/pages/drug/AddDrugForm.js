//AddDrugForm

import Header from "../../components/Headers/Header";
import React, { useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";

const AddDrugForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    type: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.price ||
      !formData.type ||
      !formData.unit ||
      !formData.description
    ) {
      alert("Vui lòng điền đầy đủ các trường bắt buộc!");
      return;
    }

    // Lưu dữ liệu vào localStorage
    const storedDrugs = JSON.parse(localStorage.getItem("drugs")) || [];
    localStorage.setItem("drugs", JSON.stringify([...storedDrugs, formData]));
    alert("Lưu thành công!");
    console.log("Form Data:", formData);
    // Reset form
    setFormData({
      name: "",
      price: "",
      type: "",
      unit: "",
      description: "",
    });
  };

  const handleCancel = () => {
    console.log("Cancel clicked");
    // Xử lý khi nhấn Quay lại
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
              <Form.Group controlId="drugName">
                <Form.Label>
                  Tên thuốc <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Tên thuốc"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="drugPrice">
                <Form.Label>
                  Giá <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Giá"
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
              <Form.Group controlId="drugType">
                <Form.Label>
                  Loại thuốc <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Loại thuốc"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="drugUnit">
                <Form.Label>
                  Đơn vị <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Đơn vị"
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
            <Button color="danger" onClick={() => navigate("/drug")}>
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
