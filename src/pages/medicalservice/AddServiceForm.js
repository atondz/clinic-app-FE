import Header from "../../components/Headers/Header";
import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AddServiceForm = () => {
  const [formData, setFormData] = useState({
    serviceName: "",
    serviceType: "Loại thường",
    price: "",
    room: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Reset form after submission
    setFormData({
      serviceName: "",
      serviceType: "Loại thường",
      price: "",
      room: "",
    });
  };

  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="p-4">
        <h4 className="mb-4">THÊM DỊCH VỤ KHÁM</h4>
        <Form onSubmit={handleSubmit}>
          <h5>Thông tin cơ bản</h5>
          <p>Điền tất cả thông tin bên dưới</p>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="serviceName">
                <Form.Label>
                  Tên dịch vụ khám <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="serviceName"
                  placeholder="Tên dịch vụ khám"
                  value={formData.serviceName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="price">
                <Form.Label>
                  Giá <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  placeholder="Giá"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="serviceType">
                <Form.Label>
                  Loại dịch vụ <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  as="select"
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  required
                >
                  <option>Loại thường</option>
                  <option>Loại cận lâm sàng</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="room">
                <Form.Label>
                  Phòng khám <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="room"
                  placeholder="Phòng khám"
                  value={formData.room}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <div className="d-flex justify-content-end">
            <Button color="danger" onClick={() => navigate("/medicalservice")}>
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

export default AddServiceForm;
