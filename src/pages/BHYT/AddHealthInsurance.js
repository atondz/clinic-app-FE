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

const HealthInsuranceAdd = () => {
    const navigate = useNavigate();
    const [healthInsurance, setHealthInsurance] = useState({
        code: "",
        fullName: "",
        placeOfRegistration: "",
        validity: "",
        serialNumber: "",
        issueDate: "",
        placeOfIssue: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setHealthInsurance({ ...healthInsurance, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Health Insurance Submitted:", healthInsurance);
        navigate("/bhyt");
    };

    return (
        <>
            <Header />
            <Container fluid className="mt-4">
                <Row>
                    <Col>
                        <h3 className="text-dark">Thêm Thẻ BHYT</h3>
                        <p className="text-muted">Quản Lý Thẻ BHYT / Thêm Thẻ BHYT</p>
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
                                        <Label for="code">Mã BHYT <span className="text-danger">*</span></Label>
                                        <Input type="text" id="code" name="code" placeholder="Nhập mã BHYT" value={healthInsurance.code} onChange={handleInputChange} required />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="fullName">Họ và Tên <span className="text-danger">*</span></Label>
                                        <Input type="text" id="fullName" name="fullName" placeholder="Nhập họ và tên" value={healthInsurance.fullName} onChange={handleInputChange} required />
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

export default HealthInsuranceAdd;
