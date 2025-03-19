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
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Label,
} from "reactstrap";
import { Link } from "react-router-dom";
import Header from "components/Headers/Header.js";

const MedicineTypes = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [medicineTypes, setMedicineTypes] = useState([
        { id: 1, code: "ABC001", name: "Kháng sinh" },
        { id: 2, code: "ABC002", name: "Giảm đau" },
        { id: 3, code: "ABC003", name: "Kháng viêm" },
    ]);

    // State quản lý modal chỉnh sửa
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [currentMedicineType, setCurrentMedicineType] = useState({
        id: null,
        code: "",
        name: "",
    });

    // Lọc danh sách theo tìm kiếm
    const filteredMedicineTypes = medicineTypes.filter(
        (type) =>
            type.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            type.code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Xóa loại thuốc
    const handleDelete = (id) => {
        setMedicineTypes(medicineTypes.filter((type) => type.id !== id));
    };

    // Mở popup chỉnh sửa
    const handleEdit = (medicineType) => {
        setCurrentMedicineType(medicineType);
        setEditModalOpen(true);
    };

    // Xử lý thay đổi trong form sửa
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentMedicineType({ ...currentMedicineType, [name]: value });
    };

    // Lưu thay đổi và cập nhật danh sách
    const handleSaveEdit = () => {
        setMedicineTypes(
            medicineTypes.map((type) =>
                type.id === currentMedicineType.id ? currentMedicineType : type
            )
        );
        setEditModalOpen(false);
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
                                                    onClick={() => handleEdit(type)}
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

                {/* Popup sửa thông tin loại thuốc */}
                <Modal isOpen={editModalOpen} toggle={() => setEditModalOpen(!editModalOpen)}>
                    <ModalHeader toggle={() => setEditModalOpen(!editModalOpen)}>
                        Chỉnh Sửa Loại Thuốc
                    </ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="code">Mã Loại Thuốc</Label>
                                <Input
                                    type="text"
                                    id="code"
                                    name="code"
                                    value={currentMedicineType.code}
                                    onChange={handleInputChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="name">Tên Loại Thuốc</Label>
                                <Input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={currentMedicineType.name}
                                    onChange={handleInputChange}
                                />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={handleSaveEdit}>
                            Lưu
                        </Button>{" "}
                        <Button color="secondary" onClick={() => setEditModalOpen(false)}>
                            Thoát
                        </Button>
                    </ModalFooter>
                </Modal>
            </Container>
        </>
    );
};

export default MedicineTypes;
