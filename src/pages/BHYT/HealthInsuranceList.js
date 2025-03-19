import React, { useState } from "react";
import { Card, CardBody, Container, Row, Col, InputGroup, Input, Button, Table } from "reactstrap";
import { useNavigate } from "react-router-dom";
import Header from "components/Headers/Header.js";

const HealthInsuranceList = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [healthInsurances, setHealthInsurances] = useState([
        { id: 1, code: "BHYT003", fullName: "Nguyễn Văn A", placeOfRegistration: "Hà Nội", validity: "1/2/2025", serialNumber: "123456", issueDate: "1/2/2025", placeOfIssue: "Hà Nội" },
        { id: 2, code: "BHYT004", fullName: "Nguyễn Văn B", placeOfRegistration: "HCM", validity: "1/2/2024", serialNumber: "654321", issueDate: "1/2/2024", placeOfIssue: "HCM" },
    ]);

    const filteredHealthInsurances = healthInsurances.filter(item =>
        item.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = (id) => {
        setHealthInsurances(healthInsurances.filter(item => item.id !== id));
    };

    return (
        <>
            <Header />
            <Container fluid className="mt-4">
                <Row className="mb-4">
                    <Col md="6">
                        <h3>Danh Sách Thẻ BHYT</h3>
                    </Col>
                    <Col md="3">
                        <InputGroup>
                            <Input
                                type="text"
                                placeholder="Tìm kiếm thẻ BHYT"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </InputGroup>
                    </Col>
                    <Col md="3" className="text-right">
                        <Button color="success" onClick={() => navigate("/add-bhyt")}>+ Thêm BHYT</Button>
                    </Col>
                </Row>
                <Card>
                    <CardBody>
                        <Table bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Mã</th>
                                    <th>Họ và tên</th>
                                    <th>Nơi đăng kí khám</th>
                                    <th>Giá trị sử dụng</th>
                                    <th>Mã số</th>
                                    <th>Ngày cấp</th>
                                    <th>Nơi cấp</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredHealthInsurances.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>{index + 1}</td>
                                        <td>{item.code}</td>
                                        <td>{item.fullName}</td>
                                        <td>{item.placeOfRegistration}</td>
                                        <td>{item.validity}</td>
                                        <td>{item.serialNumber}</td>
                                        <td>{item.issueDate}</td>
                                        <td>{item.placeOfIssue}</td>
                                        <td>
                                            <Button color="danger" size="sm" onClick={() => handleDelete(item.id)}>Xoá</Button>
                                            <Button color="success" size="sm">Sửa</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </CardBody>
                </Card>
            </Container>
        </>
    );
};

export default HealthInsuranceList;