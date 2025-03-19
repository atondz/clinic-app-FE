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
} from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import Header from "components/Headers/Header.js";

const HealthInsuranceEdit = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Lấy ID từ URL

    const [healthInsurance, setHealthInsurance] = useState({
        code: "",
        fullName: "",
        placeOfRegistration: "",
        validity: "",
        serialNumber: "",
        issueDate: "",
        placeOfIssue: "",
    });

    // Giả lập API lấy dữ liệu thẻ BHYT theo ID
    useEffect(() => {
        const fetchHealthInsurance = async () => {
            try {
                // Giả lập dữ liệu lấy từ backend
                const fakeData = [
                    { id: "1", code: "BHYT001", fullName: "Nguyễn Văn A", placeOfRegistration: "Hà Nội", validity: "2025-12-31", serialNumber: "123456", issueDate: "2025-01-01", placeOfIssue: "Hà Nội" },
                    { id: "2", code: "BHYT002", fullName: "Trần Thị B", placeOfRegistration: "TP. HCM", validity: "2024-11-30", serialNumber: "654321", issueDate: "2024-05-10", placeOfIssue: "TP. HCM" }
                ];

                const selected = fakeData.find(item => item.id === id);
                if (selected) {
                    setHealthInsurance(selected);
                } else {
                    alert("Không tìm thấy thẻ BHYT!");
                    navigate("/bhyt");
                }
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu thẻ BHYT:", error);
            }
        };

        fetchHealthInsurance();
    }, [id, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setHealthInsurance({ ...healthInsurance, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Cập nhật thẻ BHYT:", healthInsurance);
        // Gửi dữ liệu cập nhật đến API (nếu có backend)
        navigate("/bhyt");
    };

    return (
        <>
            <Header />
            <Container fluid className="mt-4">
                <Row>
                    <Col>
                        <h3 className="text-dark">Chỉnh Sửa Thẻ BHYT</h3>
                        <p className="text-muted">Quản Lý Thẻ BHYT / Chỉnh Sửa Thẻ BHYT</p>
                    </Col>
                </Row>
                <Card className="mt-4">
                    <CardBody>
                        <Row>
                            <Col md="6">
                                <h4 className="text-dark">Thông tin cơ bản</h4>
                                <p className="text-muted">Cập nhật thông tin bên dưới</p>
                                <Form onSubmit={handleSubmit}>
                                    <FormGroup>
                                        <Label for="code">Mã BHYT</Label>
                                        <Input type="text" id="code" name="code" value={healthInsurance.code} onChange={handleInputChange} required />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="fullName">Họ và Tên</Label>
                                        <Input type="text" id="fullName" name="fullName" value={healthInsurance.fullName} onChange={handleInputChange} required />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="placeOfRegistration">Nơi đăng ký khám</Label>
                                        <Input type="text" id="placeOfRegistration" name="placeOfRegistration" value={healthInsurance.placeOfRegistration} onChange={handleInputChange} required />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="validity">Giá trị sử dụng</Label>
                                        <Input type="text" id="validity" name="validity" value={healthInsurance.validity} onChange={handleInputChange} required />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="serialNumber">Mã số</Label>
                                        <Input type="text" id="serialNumber" name="serialNumber" value={healthInsurance.serialNumber} onChange={handleInputChange} required />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="issueDate">Ngày cấp</Label>
                                        <Input type="date" id="issueDate" name="issueDate" value={healthInsurance.issueDate} onChange={handleInputChange} required />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="placeOfIssue">Nơi cấp</Label>
                                        <Input type="text" id="placeOfIssue" name="placeOfIssue" value={healthInsurance.placeOfIssue} onChange={handleInputChange} required />
                                    </FormGroup>
                                    <Button color="success" type="submit" className="mr-2">Lưu Lại</Button>
                                    <Button color="danger" onClick={() => navigate("/bhyt")}>Quay lại</Button>
                                </Form>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Container>
        </>
    );
};

export default HealthInsuranceEdit;
