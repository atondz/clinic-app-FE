import React, { useState, useEffect } from "react";
import { Form, Button, Col, Row, Spinner } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Headers/Header";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const EditDrug = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [drug, setDrug] = useState({
        medicine_code: "",
        medicine_name: "",
        medicine_type_id: "",
        price: "",
        unit: "",
        description: "",
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchMedicine();
            } catch (error) {
                console.error("Error loading data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const fetchMedicine = async () => {
        try {
            const response = await axios.get(`http://localhost:5001/api/medicine/${id}`);
            if (response.data) {
                setDrug({
                    medicine_code: response.data.medicine_code || "",
                    medicine_name: response.data.medicine_name || "",
                    medicine_type_id: response.data.medicine_type_id ? response.data.medicine_type_id.toString() : "",
                    price: response.data.price ? response.data.price.toString() : "",
                    unit: response.data.unit || "",
                    description: response.data.description || "",
                });
            } else {
                setError("Dữ liệu thuốc không hợp lệ.");
            }
        } catch (error) {
            setError("Không tìm thấy thuốc hoặc có lỗi khi tải dữ liệu.");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDrug((prev) => ({ ...prev, [name]: value }));
    };

    const handleDescriptionChange = (value) => {
        setDrug((prev) => ({ ...prev, description: value }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!drug.medicine_code || !drug.medicine_name || !drug.medicine_type_id || !drug.price || !drug.unit || !drug.description) {
            alert("Vui lòng điền đầy đủ các trường bắt buộc!");
            return;
        }

        setIsSaving(true);
        try {
            const updateData = {
                medicine_code: drug.medicine_code,
                medicine_name: drug.medicine_name,
                medicine_type_id: parseInt(drug.medicine_type_id),
                price: parseInt(drug.price),
                unit: drug.unit,
                description: drug.description,
            };

            await axios.put(`http://localhost:5001/api/medicine/${id}`, updateData);
            alert("Cập nhật thành công!");
            navigate("/drug");
        } catch (error) {
            alert(`Cập nhật thất bại! Lỗi: ${error.response?.data?.message || error.message}`);
        } finally {
            setIsSaving(false);
        }
    };

    const handleCancel = () => {
        navigate("/drug");
    };

    if (loading) {
        return (
            <>
                <Header />
                <div className="container mt-4 text-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Đang tải...</span>
                    </Spinner>
                    <p>Đang tải dữ liệu thuốc...</p>
                </div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <Header />
                <div className="container mt-4">
                    <div className="alert alert-danger">{error}</div>
                    <Button variant="primary" onClick={() => navigate("/drug")}>
                        Quay lại danh sách thuốc
                    </Button>
                </div>
            </>
        );
    }

    return (
        <>
            <Header />
            <div className="container mt-4">
                <h4 className="mb-4" style={{ fontSize: "28px", fontWeight: "bold" }}>Chỉnh sửa thuốc</h4>
                <Form onSubmit={handleUpdate}>
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
                                    value={drug.medicine_code}
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
                                    value={drug.medicine_name}
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
                                    value={drug.medicine_type_id}
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
                                    value={drug.price}
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
                                    value={drug.unit}
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
                            value={drug.description}
                            onChange={handleDescriptionChange}
                            placeholder="Nhập mô tả..."
                            style={{ height: '200px', marginBottom: '50px' }}
                            required
                        />
                    </Form.Group>
                    <div className="d-flex justify-content-end mt-5">
                        <Button
                            variant="danger"
                            onClick={handleCancel}
                            className="me-2"
                            disabled={isSaving}
                        >
                            Quay lại
                        </Button>
                        <Button
                            variant="primary"
                            type="submit"
                            disabled={isSaving}
                        >
                            {isSaving ? (
                                <>
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                    {' '}Đang lưu...
                                </>
                            ) : 'Lưu lại'}
                        </Button>
                    </div>
                </Form>
            </div>
        </>
    );
};

export default EditDrug;