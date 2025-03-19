import React, { useState } from "react";
import { Card, CardBody, Container, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import Header from "components/Headers/Header.js";

const AddHealthInsurance = ({ addHealthInsurance }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        code: "",
        fullName: "",
        placeOfRegistration: "",
        validity: "",
        serialNumber: "",
        issueDate: "",
        placeOfIssue: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addHealthInsurance(formData);
        navigate("/bhyt");
    };

    return (
        <>
            <Header />
            <Container fluid className="mt-4">
                <Row>
                    <Col lg="12">
                        <Card>
                            <CardBody>
                                <h3 className="mb-4">Thêm Thẻ BHYT</h3>
                                <Form onSubmit={handleSubmit}>
                                    <Row>
                                        <Col md="6">
                                            <FormGroup>
                                                <Label>Mã BHYT</Label>
                                                <Input type="text" name="code" value={formData.code} onChange={handleChange} required />
                                            </FormGroup>
                                        </Col>
                                        <Col md="6">
                                            <FormGroup>
                                                <Label>Họ và Tên</Label>
                                                <Input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="6">
                                            <FormGroup>
                                                <Label>Nơi đăng ký khám</Label>
                                                <Input type="text" name="placeOfRegistration" value={formData.placeOfRegistration} onChange={handleChange} required />
                                            </FormGroup>
                                        </Col>
                                        <Col md="6">
                                            <FormGroup>
                                                <Label>Giá trị sử dụng</Label>
                                                <Input type="date" name="validity" value={formData.validity} onChange={handleChange} required />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="6">
                                            <FormGroup>
                                                <Label>Mã số</Label>
                                                <Input type="text" name="serialNumber" value={formData.serialNumber} onChange={handleChange} required />
                                            </FormGroup>
                                        </Col>
                                        <Col md="6">
                                            <FormGroup>
                                                <Label>Ngày cấp</Label>
                                                <Input type="date" name="issueDate" value={formData.issueDate} onChange={handleChange} required />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="12">
                                            <FormGroup>
                                                <Label>Nơi cấp</Label>
                                                <Input type="text" name="placeOfIssue" value={formData.placeOfIssue} onChange={handleChange} required />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Button color="success" type="submit">Lưu lại</Button>
                                    <Button color="danger" className="ml-2" onClick={() => navigate("/admin/health-insurance-list")}>Quay lại</Button>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default AddHealthInsurance;