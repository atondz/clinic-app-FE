import React, { useState } from "react";
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
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../components/Headers/Header"; // Sửa lại đường dẫn Header nếu cần

const AddMedicineTypes = () => {
    const navigate = useNavigate();
    const [medicineType, setMedicineType] = useState({
        medicine_type_code: "",
        medicine_type_name: "",
    });

    const [loading, setLoading] = useState(false); // Trạng thái loading

    // Xử lý thay đổi input
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMedicineType({ ...medicineType, [name]: value });
    };

    // Gửi dữ liệu lên API
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(
                "http://localhost:5001/api/medicineTypes",
                medicineType,
                { headers: { "Content-Type": "application/json" } }
            );

            if (response.status === 201) {
                toast.success("🎉 Thêm loại thuốc thành công!", { position: "top-right", autoClose: 1000 });
                setTimeout(() => navigate("/medicine-types"), 1100); // Chờ toast xong mới chuyển trang
            }
        } catch (err) {
            toast.error("❌ Lỗi: Không thể thêm loại thuốc!", { position: "top-right", autoClose: 3000 });
            console.error("Error adding medicine type:", err.response?.data || err.message);
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
                        <h3 className="text-dark">Thêm Loại Thuốc</h3>
                        <p className="text-muted">Quản Lý Loại Thuốc / Thêm Loại Thuốc</p>
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
                                            value={medicineType.medicine_type_code}
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
                                            value={medicineType.medicine_type_name}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </FormGroup>
                                    <Button color="success" type="submit" className="mr-2" disabled={loading}>
                                        {loading ? "Đang lưu..." : "Lưu Lại"}
                                    </Button>
                                    <Button color="danger" onClick={() => navigate("/medicine-types")}>
                                        Quay lại
                                    </Button>
                                </Form>
                            </Col>
                            <Col md="6"></Col>
                        </Row>
                    </CardBody>
                </Card>
            </Container>

            <ToastContainer />
        </>
    );
};

export default AddMedicineTypes;
