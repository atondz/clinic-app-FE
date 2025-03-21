import Header from "../../components/Headers/Header";
import React, { useState, useEffect } from "react";
import { Table, Button, Form, InputGroup, Modal } from "react-bootstrap";
import { FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardHeader,
  Input,
  InputGroupAddon,
  InputGroupText,
  Col,
  Row,
  Container,
} from "reactstrap";

const ListOfDrugs = () => {
  const [drugs, setDrugs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingDrug, setEditingDrug] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedRows, setExpandedRows] = useState({}); // Trạng thái cho các hàng mở rộng
  const maxDescriptionLength = 50; // Độ dài tối đa cho mô tả bị cắt

  // Lấy danh sách thuốc từ API khi component mount
  useEffect(() => {
    fetchDrugs();
  }, []);

  const fetchDrugs = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:5001/api/medicine");
      setDrugs(response.data.data || []);
      console.log("Danh sách thuốc:", response.data.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách thuốc:", error);
      setError(
        "Không thể tải danh sách thuốc. Vui lòng kiểm tra server hoặc console."
      );
    } finally {
      setLoading(false);
    }
  };

  // Xử lý tìm kiếm
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Xử lý mở Modal chỉnh sửa
  const handleEdit = (drug) => {
    setEditingDrug({ ...drug });
    setShowModal(true);
  };

  // Xử lý lưu chỉnh sửa (gửi PUT request)
  const handleSave = async () => {
    try {
      await axios.put(
        `http://localhost:5001/api/medicine/${editingDrug.id}`,
        editingDrug
      );
      setDrugs((prevDrugs) =>
        prevDrugs.map((d) => (d.id === editingDrug.id ? editingDrug : d))
      );
      setShowModal(false);
      setEditingDrug(null);
    } catch (error) {
      console.error("Lỗi khi cập nhật thuốc:", error);
    }
  };

  // Xử lý xóa (gửi DELETE request)
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/medicine/${id}`);
      setDrugs((prevDrugs) => prevDrugs.filter((drug) => drug.id !== id));
    } catch (error) {
      console.error("Lỗi khi xóa thuốc:", error);
    }
  };

  // Xử lý mở rộng/thu gọn mô tả
  const toggleExpand = (id) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Lọc danh sách theo tìm kiếm
  const filteredDrugs = drugs.filter(
    (drug) =>
      (drug.medicine_name &&
        drug.medicine_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (drug.medicine_code &&
        drug.medicine_code.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (drug.medicine_type_name &&
        drug.medicine_type_name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()))
  );

  return (
    <>
      <Header />
      <Container className="mt-4" fluid>
        <div className="mb-4 d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Danh Sách Thuốc</h4>
          <div className="d-flex align-items-center w-50">
            <InputGroup className="flex-grow-1" style={{ marginRight: "1rem" }}>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="fas fa-search" />
                </InputGroupText>
              </InputGroupAddon>
              <Input
                type="text"
                placeholder="Tìm kiếm thuốc..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>

            <div style={{ marginLeft: "1rem" }}>
              <Link
                to="/addDrugForm"
                className="btn btn-primary"
                style={{ whiteSpace: "nowrap" }}
              >
                + Thêm thuốc
              </Link>
            </div>
          </div>
        </div>

        {loading && <p>Đang tải dữ liệu...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!loading && !error && (
          <>
            <Card className="shadow">
              <CardHeader className="bg-light border-0">
                <h4 className="text-dark mb-0">Danh sách thuốc</h4>
              </CardHeader>
              <Table className="align-items-center" responsive>
                <thead className="thead-light">
                  <tr>
                    <th>STT</th>
                    <th>Mã</th>
                    <th>Tên thuốc</th>
                    <th>Loại thuốc</th>
                    <th>Giá (VNĐ)</th>
                    <th>Đơn vị tính</th>
                    <th>Mô tả</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDrugs.length > 0 ? (
                    filteredDrugs.map((drug, index) => (
                      <tr key={drug.id}>
                        <td>{index + 1}</td>
                        <td>{drug.medicine_code}</td>
                        <td>{drug.medicine_name}</td>
                        <td>{drug.MedicineType?.medicine_type_name}</td>
                        <td>{drug.price?.toLocaleString()}</td>
                        <td>{drug.unit}</td>
                        <td style={{ maxWidth: "200px", whiteSpace: "normal" }}>
                          {expandedRows[drug.id] ||
                          (drug.description &&
                            drug.description.length <= maxDescriptionLength)
                            ? drug.description || "Chưa có mô tả"
                            : `${(drug.description || "").substring(
                                0,
                                maxDescriptionLength
                              )}...`}
                          {drug.description &&
                            drug.description.length > maxDescriptionLength && (
                              <Button
                                variant="link"
                                size="sm"
                                onClick={() => toggleExpand(drug.id)}
                                style={{ padding: 0, marginLeft: "5px" }}
                              >
                                {expandedRows[drug.id] ? "Thu gọn" : "Xem thêm"}
                              </Button>
                            )}
                        </td>
                        <td>
                          <Button
                            variant="primary"
                            size="sm"
                            className="me-2"
                            onClick={() => handleEdit(drug)}
                          >
                            <FaEdit /> Sửa
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDelete(drug.id)}
                          >
                            <FaTrash /> Xóa
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8">Không có dữ liệu thuốc.</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card>
          </>
        )}

        {/* Modal Chỉnh Sửa */}
        {editingDrug && (
          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Chỉnh sửa thuốc</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Tên thuốc</Form.Label>
                  <Form.Control
                    value={editingDrug.medicine_name || ""}
                    onChange={(e) =>
                      setEditingDrug({
                        ...editingDrug,
                        medicine_name: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Loại thuốc</Form.Label>
                  <Form.Control
                    value={editingDrug.medicine_type_name || ""}
                    onChange={(e) =>
                      setEditingDrug({
                        ...editingDrug,
                        medicine_type_name: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Giá (VNĐ)</Form.Label>
                  <Form.Control
                    type="number"
                    value={editingDrug.price || 0}
                    onChange={(e) =>
                      setEditingDrug({
                        ...editingDrug,
                        price: +e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Mô tả</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={editingDrug.description || ""}
                    onChange={(e) =>
                      setEditingDrug({
                        ...editingDrug,
                        description: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Hủy
              </Button>
              <Button variant="primary" onClick={handleSave}>
                Lưu
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </Container>
    </>
  );
};

export default ListOfDrugs;