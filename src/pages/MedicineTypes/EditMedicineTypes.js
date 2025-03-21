import React, { useState, useEffect } from "react";
import {
    Card,
    CardBody,
    Container,
    Row,
    Col,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Spinner
} from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Headers/Header";

const EditMedicineType = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Lấy ID loại thuốc từ URL
    const [medicineType, setMedicineType] = useState({
        medicine_type_code: "",
        medicine_type_name: "",
    });
    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(true);
    const [error, setError] = useState(null); // To store error messages

    // Fetch dữ liệu loại thuốc để chỉnh sửa
    useEffect(() => {
        const fetchMedicineType = async () => {
            setFetchLoading(true);
            try {
                const response = await axios.get(
                    `http://localhost:5001/api/medicineTypes/${id}`
                );
                if (response.data && response.data.data) {
                    setMedicineType(response.data.data);
                } else {
                    setError("Không tìm thấy dữ liệu loại thuốc");
                }
            } catch (err) {
                console.error("Error fetching medicine type:", err);
                setError("Không thể tải dữ liệu loại thuốc. " + (err.response?.data?.message || err.message));
            } finally {
                setFetchLoading(false);
            }
        };

        if (id) {
            fetchMedicineType();
        }
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMedicineType({ ...medicineType, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null); // Reset previous errors

        if (!medicineType.medicine_type_code || !medicineType.medicine_type_name) {
            setError("Vui lòng điền đầy đủ thông tin!");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.put(
                `http://localhost:5001/api/medicineTypes/${id}`,
                medicineType
            );
            if (response.status === 200) {
                alert("Cập nhật loại thuốc thành công!");
                navigate("/medicine-types");
            }
        } catch (err) {
            console.error("Error updating medicine type:", err);
            setError(`Cập nhật thất bại! Lỗi: ${err.response?.data?.message || err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        navigate("/medicine-types");
    };

    if (fetchLoading) {
        return (
            <>
                <Header />
                <Container fluid className="mt-4">
                    <div className="text-center">
                        <Spinner color="primary" />
                        <p>Đang tải dữ liệu loại thuốc...</p>
                    </div>
                </Container>
            </>
        );
    }

    return (
        <>
            <Header />
            <Container fluid className="mt-4">
                <Row>
                    <Col>
                        <h3 className="text-dark">Chỉnh Sửa Loại Thuốc</h3>
                        <p className="text-muted">Quản Lý Loại Thuốc / Chỉnh Sửa Loại Thuốc</p>
                    </Col>
                </Row>

                <Card className="mt-4">
                    <CardBody>
                        <Row>
                            <Col md="6">
                                <h4 className="text-dark">Thông tin cơ bản</h4>
                                <p className="text-muted">Điền tất cả thông tin bên dưới</p>
                                <Form onSubmit={handleSubmit}>
                                    <FormGroup>
                                        <Label for="medicine_type_code">
                                            Mã Loại Thuốc <span className="text-danger">*</span>
                                        </Label>
                                        <Input
                                            type="text"
                                            id="medicine_type_code"
                                            name="medicine_type_code"
                                            placeholder="Nhập mã loại thuốc"
                                            value={medicineType.medicine_type_code || ""}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="medicine_type_name">
                                            Tên Loại Thuốc <span className="text-danger">*</span>
                                        </Label>
                                        <Input
                                            type="text"
                                            id="medicine_type_name"
                                            name="medicine_type_name"
                                            placeholder="Nhập tên loại thuốc"
                                            value={medicineType.medicine_type_name || ""}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </FormGroup>
                                    <div className="d-flex">
                                        <Button color="primary" type="submit" className="mr-2" disabled={loading}>
                                            {loading ? (
                                                <>
                                                    <Spinner size="sm" /> Đang lưu...
                                                </>
                                            ) : (
                                                "Lưu Lại"
                                            )}
                                        </Button>
                                        <Button
                                            color="danger"
                                            onClick={handleCancel}
                                            className="ml-2"
                                            style={{ marginLeft: '10px' }}
                                        >
                                            Quay lại
                                        </Button>
                                    </div>
                                </Form>
                                {error && (
                                    <div className="alert alert-danger mt-3" role="alert">
                                        {error}
                                    </div>
                                )}
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Container>
        </>
    );
};

export default EditMedicineType;