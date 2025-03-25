import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Container,
  Row,
  Col,
  Input,
  Button,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
  CardHeader,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
} from "reactstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "components/Headers/Header.js";

const MedicineTypes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [medicineTypes, setMedicineTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedDescriptions, setExpandedDescriptions] = useState(new Set());
  const [showModal, setShowModal] = useState(false);
  const [editingType, setEditingType] = useState(null);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchMedicineTypes = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/medicineTypes");
        if (!response.ok) throw new Error("Không thể lấy dữ liệu");
        const { data } = await response.json();
        setMedicineTypes(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMedicineTypes();
  }, []);

  const toggleDescription = (_id) => {
    setExpandedDescriptions((prev) => {
      const newSet = new Set(prev);
      newSet.has(_id) ? newSet.delete(_id) : newSet.add(_id);
      return newSet;
    });
  };

  const truncateText = (text, maxLength = 30) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  const filteredMedicineTypes = medicineTypes.filter((type) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      type.medicine_type_code.toLowerCase().includes(searchLower) ||
      type.medicine_type_name.toLowerCase().includes(searchLower)
    );
  });

  const handleDelete = async (_id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xoá loại thuốc này không?")) {
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:5001/api/medicineTypes/${_id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Xóa thất bại. Vui lòng thử lại!");
      }
      setMedicineTypes((prev) => prev.filter((type) => type._id !== _id));
      toast.success("Xoá thành công!", { autoClose: 1000 });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleEdit = (type) => {
    setEditingType({
      _id: type._id,
      medicine_type_code: type.medicine_type_code,
      medicine_type_name: type.medicine_type_name,
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!editingType._id) {
      toast.error("Không tìm thấy ID của loại thuốc để cập nhật.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5001/api/medicineTypes/${editingType._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            medicine_type_code: editingType.medicine_type_code,
            medicine_type_name: editingType.medicine_type_name,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Cập nhật thất bại. Vui lòng thử lại!");
      }
      const updatedType = await response.json();
      setMedicineTypes((prev) =>
        prev.map((type) =>
          type._id === editingType._id ? { ...type, ...updatedType.data } : type
        )
      );
      setShowModal(false);
      setEditingType(null);
      toast.success("Cập nhật thành công!", { autoClose: 1000 });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredMedicineTypes.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredMedicineTypes.length / itemsPerPage);

  return (
    <>
      <Header />
      <Container className="mt-4" fluid>
        <Row className="mb-4 align-items-center">
          <Col md={6}>
            <h3 className="mb-0">Danh Sách Loại Thuốc</h3>
          </Col>
          <Col md={3}>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="fas fa-search" />
                </InputGroupText>
              </InputGroupAddon>
              <Input
                type="text"
                placeholder="Tìm kiếm loại thuốc..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </Col>
          <Col md={3} className="text-right">
            <Button
              tag={Link}
              to="/add-medicine-types"
              color="primary"
              className="w-100"
            >
              + Thêm loại thuốc
            </Button>
          </Col>
        </Row>

        {loading ? (
          <div>Đang tải...</div>
        ) : error ? (
          <div className="text-danger">{error}</div>
        ) : (
          <Card className="shadow">
            <CardHeader className="bg-light border-0">
              <h4 className="text-dark mb-0">Danh sách các loại thuốc</h4>
            </CardHeader>
            <CardBody className="p-0">
              <Table hover responsive className="mb-0">
                <thead className="thead-light">
                  <tr>
                    <th>STT</th>
                    <th>Mã Loại Thuốc</th>
                    <th>Tên Loại Thuốc</th>
                    <th>Hành Động</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((type, index) => {
                    const isExpanded = expandedDescriptions.has(type._id);
                    const showText = isExpanded
                      ? type.medicine_type_name
                      : truncateText(type.medicine_type_name);

                    return (
                      <tr key={`medicine-type-${type._id}-${index}`}>
                        <td>{indexOfFirstItem + index + 1}</td>
                        <td>{type.medicine_type_code}</td>
                        <td style={{
                            maxWidth: "300px",
                            whiteSpace: isExpanded ? "pre-wrap" : "nowrap",
                            wordBreak: "break-word",
                          }}>
                          {showText}
                          {type.medicine_type_name.length > 30 && (
                            <Button
                              color="link"
                              size="sm"
                              onClick={() => toggleDescription(type._id)}
                              className="p-0 ml-2"
                            >
                              {isExpanded ? "[Thu gọn]" : "[Xem thêm]"}
                            </Button>
                          )}
                        </td>
                        <td>
                          <Button
                            color="primary"
                            size="sm"
                            onClick={() => handleEdit(type)}
                          >
                            Sửa
                          </Button>
                          <Button
                            color="danger"
                            size="sm"
                            className="ml-2"
                            onClick={() => handleDelete(type._id)}
                          >
                            Xoá
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>

              {filteredMedicineTypes.length === 0 && (
                <div className="text-center py-4 text-muted">
                  Không tìm thấy kết quả phù hợp
                </div>
              )}
            </CardBody>
          </Card>
        )}

        {totalPages > 1 && (
          <Pagination className="mt-3 justify-content-center">
            <PaginationItem disabled={currentPage === 1}>
              <PaginationLink
                previous
                onClick={() => handlePageChange(currentPage - 1)}
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem 
                active={index + 1 === currentPage} 
                key={`page-${index}`}
              >
                <PaginationLink onClick={() => handlePageChange(index + 1)}>
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem disabled={currentPage === totalPages}>
              <PaginationLink
                next
                onClick={() => handlePageChange(currentPage + 1)}
              />
            </PaginationItem>
          </Pagination>
        )}

        <Modal isOpen={showModal} toggle={() => setShowModal(false)}>
          <ModalHeader toggle={() => setShowModal(false)}>
            Chỉnh sửa loại thuốc
          </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="medicineTypeCode">Mã loại thuốc</Label>
                <Input
                  type="text"
                  id="medicineTypeCode"
                  value={editingType?.medicine_type_code || ""}
                  onChange={(e) =>
                    setEditingType({
                      ...editingType,
                      medicine_type_code: e.target.value,
                    })
                  }
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="medicineTypeName">Tên loại thuốc</Label>
                <Input
                  type="text"
                  id="medicineTypeName"
                  value={editingType?.medicine_type_name || ""}
                  onChange={(e) =>
                    setEditingType({
                      ...editingType,
                      medicine_type_name: e.target.value,
                    })
                  }
                  required
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={() => setShowModal(false)}>
              Hủy
            </Button>
            <Button color="primary" onClick={handleSave}>
              Lưu
            </Button>
          </ModalFooter>
        </Modal>
      </Container>
    </>
  );
};

export default MedicineTypes;