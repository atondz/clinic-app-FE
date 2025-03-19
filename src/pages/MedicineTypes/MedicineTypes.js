import React, { useState } from "react";
import { Card, CardBody, Container, Row, Col, Button, Table, Input, InputGroup, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label } from "reactstrap";
import { useNavigate } from "react-router-dom";
import Header from "components/Headers/Header.js";

const MedicineTypesList = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [medicineTypes, setMedicineTypes] = useState([
        { id: 1, code: "MT001", name: "Thuốc giảm đau" },
        { id: 2, code: "MT002", name: "Thuốc kháng sinh" },
    ]);

    // State cho popup chỉnh sửa
    const [editModal, setEditModal] = useState(false);
    const [currentMedicine, setCurrentMedicine] = useState(null);

    // Mở popup sửa
    const handleEdit = (medicine) => {
        setCurrentMedicine({ ...medicine });
        setEditModal(true);
    };

    // Đóng popup sửa
    const toggleEditModal = () => {
        setEditModal(false);
    };

    // Lưu chỉnh sửa
    const handleSave = () => {
        setMedicineTypes((prevTypes) =>
            prevTypes.map((type) =>
                type.id === currentMedicine.id ? currentMedicine : type
            )
        );
        setEditModal(false);
    };

    const filteredMedicineTypes = medicineTypes.filter((type) =>
        type.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <Header />
            <Container fluid className="mt-4">
                <Row className="mb-3 align-items-center">
                    <Col md="6">
                        <h3 className="text-dark">Danh Sách Loại Thuốc</h3>
                    </Col>
                    <Col md="4">
                        <InputGroup>
                            <Input
                                type="text"
                                placeholder="Tìm kiếm loại thuốc"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </InputGroup>
                    </Col>
                    <Col md="2" className="text-right">
                        <Button color="success" onClick={() => navigate("/add-medicine-types")}>
                            + Thêm loại thuốc
                        </Button>
                    </Col>
                </Row>
                <Card>
                    <CardBody>
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Mã</th>
                                    <th>Tên Loại Thuốc</th>
                                    <th>Hành động</th>
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
                                                <Button color="danger" size="sm" className="mr-2">
                                                    Xóa
                                                </Button>
                                                <Button color="success" size="sm" onClick={() => handleEdit(type)}>
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

            {/* Popup chỉnh sửa loại thuốc */}
            <Modal isOpen={editModal} toggle={toggleEditModal}>
                <ModalHeader toggle={toggleEditModal}>Chỉnh sửa loại thuốc</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="medicineCode">Mã loại thuốc</Label>
                            <Input
                                type="text"
                                id="medicineCode"
                                value={currentMedicine?.code || ""}
                                disabled
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="medicineName">Tên loại thuốc</Label>
                            <Input
                                type="text"
                                id="medicineName"
                                value={currentMedicine?.name || ""}
                                onChange={(e) =>
                                    setCurrentMedicine((prev) => ({ ...prev, name: e.target.value }))
                                }
                            />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggleEditModal}>
                        Thoát
                    </Button>
                    <Button color="primary" onClick={handleSave}>
                        Lưu
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
};

export default MedicineTypesList;
