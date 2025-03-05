import React, { useState } from "react";
import {
    Card,
    CardBody,
    Container,
    Row,
    Col,
    InputGroup,
    Input,
    Button,
    Table,
} from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import Header from "components/Headers/Header.js";

const MedicineTypes = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [medicineTypes, setMedicineTypes] = useState([
        { id: 1, code: "ABC001", name: "Kháng sinh" },
        { id: 2, code: "ABC002", name: "Giảm đau" },
        { id: 3, code: "ABC003", name: "Kháng viêm" },
    ]);

    // Filter medicine types based on search term
    const filteredMedicineTypes = medicineTypes.filter(
        (type) =>
            type.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            type.code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handle delete medicine type
    const handleDelete = (id) => {
        setMedicineTypes(medicineTypes.filter((type) => type.id !== id));
    };

    // Handle edit medicine type
    const handleEdit = (id) => {
        navigate(`/admin/edit-medicine-type/${id}`);
    };

    // Navigate to add medicine type page
    const handleAddMedicineType = () => {
        navigate("/admin/add-medicine-types");
    };

    return (
        <>
            <Header />
            <Container className="mt-4" fluid>
                <Row className="mb-4">
                    <Col md="6">
                        <h3 className="text-dark">Danh Sách Loại Thuốc</h3>
                    </Col>
                    <Col md="3">
                        <InputGroup>
                            <Input
                                type="text"
                                placeholder="Tìm kiếm loại thuốc"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </InputGroup>
                    </Col>
                    <Col md="3" className="text-right">
                        <Link to="/add-medicine-types" className="btn btn-success">
                            + Thêm loại thuốc
                        </Link>
                    </Col>
                </Row>

                <Card>
                    <CardBody>
                        <Table bordered hover responsive>
                            <thead className="thead-light">
                                <tr>
                                    <th>STT</th>
                                    <th>Mã Loại Thuốc</th>
                                    <th>Tên Loại Thuốc</th>
                                    <th>Hành Động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredMedicineTypes.length > 0 ? (
                                    filteredMedicineTypes.map((type, index) => (
                                        <tr key={type.id}>
                                            <td>{index + 1}</td>
                                            <td>{type.code}</td>
                                            <td>{type.name}</td>
                                            <td>
                                                <Button
                                                    color="danger"
                                                    size="sm"
                                                    className="mr-2"
                                                    onClick={() => handleDelete(type.id)}
                                                >
                                                    Xoá
                                                </Button>
                                                <Button
                                                    color="success"
                                                    size="sm"
                                                    onClick={() => handleEdit(type.id)}
                                                >
                                                    Sửa
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="text-center text-muted">
                                            Không tìm thấy loại thuốc
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </CardBody>
                </Card>
            </Container>
        </>
    );
};

export default MedicineTypes;
