import Header from "../../components/Headers/Header";
import React, { useState, useEffect } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddDrugForm = () => {
  const [formData, setFormData] = useState({
    medicine_code: "",
    medicine_name: "",
    medicine_type_id: "",
    price: "",
    unit: "",
    description: "",
  });
  const [medicineTypes, setMedicineTypes] = useState([]);
  const [loadingTypes, setLoadingTypes] = useState(true);
  const [errorTypes, setErrorTypes] = useState(null);
  const navigate = useNavigate();

  // Lấy danh sách loại thuốc khi component mount
  useEffect(() => {
    const fetchMedicineTypes = async () => {
      setLoadingTypes(true);
      setErrorTypes(null);
      try {
        const response = await axios.get(
          "https://clinic-app-be.onrender.com/api/medicineTypes"
        );
        const typesData = response.data.data || response.data || [];
        if (!Array.isArray(typesData)) {
          throw new Error("Dữ liệu loại thuốc không phải là mảng");
        }
        setMedicineTypes(typesData);
      } catch (error) {
        console.error(
          "Lỗi khi lấy danh sách loại thuốc:",
          error.response?.data || error.message
        );
        setErrorTypes(error.message);
        toast.error(`Lỗi khi tải loại thuốc: ${error.message}`);
      } finally {
        setLoadingTypes(false);
      }
    };
    fetchMedicineTypes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
      toast.error("Vui lòng điền đầy đủ các trường bắt buộc!", {
        autoClose: 2000,
      });
      return;
    }

    try {
      console.log("Dữ liệu gửi lên:", formData);
      const response = await axios.post(
        "https://clinic-app-be.onrender.com/api/medicine",
        {
          medicine_code: formData.medicine_code,
          medicine_name: formData.medicine_name,
          medicine_type_id: formData.medicine_type_id,
          price: parseInt(formData.price),

          unit: formData.unit,
          description: formData.description,
        }
      );

      toast.success("Thêm thuốc thành công!", {
        autoClose: 2000,
        onClose: () => navigate("/drug"),
      });

      setFormData({
        medicine_code: "",
        medicine_name: "",
        medicine_type_id: "",
        price: "",
        unit: "",
        description: "",
      });
    } catch (error) {
      console.error("Lỗi khi thêm thuốc:", error);
      const errorMessage =
        error.response?.data?.message || "Lỗi không xác định";
      toast.error(`Thêm thuốc thất bại: ${errorMessage}`, {
        autoClose: 4000,
      });
    }
  };

  const handleCancel = () => {
    navigate("/drug");
  };

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
                  Loại thuốc <span style={{ color: "red" }}>*</span>
                </Form.Label>
                {loadingTypes ? (
                  <Form.Control as="select" disabled>
                    <option>Đang tải loại thuốc...</option>
                  </Form.Control>
                ) : errorTypes ? (
                  <Form.Control as="select" disabled>
                    <option>Lỗi: {errorTypes}</option>
                  </Form.Control>
                ) : (
                  <Form.Select
                    name="medicine_type_id"
                    value={formData.medicine_type_id}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Chọn loại thuốc</option>
                    {medicineTypes.map((type) => (
                      <option key={type._id} value={type._id}>
                        {`${type.medicine_type_code} - ${type.medicine_type_name}`}
                      </option>
                    ))}
                  </Form.Select>
                )}
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

            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Nhập mô tả..."
              name="description"
              value={formData.description}
              onChange={handleChange}
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
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default AddDrugForm;
