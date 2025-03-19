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
import Header from "components/Headers/Header.js";

const AddMedicineType = () => {
    const navigate = useNavigate();
    const [medicineType, setMedicineType] = useState({
        code: "",
        name: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMedicineType({ ...medicineType, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Medicine Type Submitted:", medicineType);
        navigate("/medicine-types");
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
                                        <Label for="code">Mã Loại Thuốc <span className="text-danger">*</span></Label>
                                        <Input type="text" id="code" name="code" placeholder="Nhập mã loại thuốc" value={medicineType.code} onChange={handleInputChange} required />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="name">Tên Loại Thuốc <span className="text-danger">*</span></Label>
                                        <Input type="text" id="name" name="name" placeholder="Nhập tên loại thuốc" value={medicineType.name} onChange={handleInputChange} required />
                                    </FormGroup>
                                    <Button color="success" type="submit" className="mr-2">Lưu Lại</Button>
                                    <Button color="danger" onClick={() => navigate("/admin/medicine-types")}>Quay lại</Button>
                                </Form>
                            </Col>
                            <Col md="6"></Col>
                        </Row>
                    </CardBody>
                </Card>
            </Container>
        </>
    );
};

export default AddMedicineType;
