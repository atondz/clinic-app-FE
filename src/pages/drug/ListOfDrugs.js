//ListOfDrugs

import Header from "../../components/Headers/Header";
import React, { useState } from "react";
import { Table, Button, Form, InputGroup, Modal } from "react-bootstrap";
import { FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const ListOfDrugs = () => {
  const [drugs, setDrugs] = useState([
    {
      id: 1,
      code: "T000004",
      name: "abc11",
      type: "Kháng sinh",
      price: 50000,
      unit: "VNĐ",
      description: "Thuốc dùng để kháng khuẩn.",
    },
    {
      id: 2,
      code: "T000006",
      name: "abc12",
      type: "Kháng sinh",
      price: 60000,
      unit: "VNĐ",
      description: "Thuốc dùng để điều trị nhiễm khuẩn.",
    },
    {
      id: 3,
      code: "T000007",
      name: "abc13",
      type: "Thuốc thử",
      price: 70000,
      unit: "VNĐ",
      description: "Thuốc dùng để thử nghiệm trong phòng thí nghiệm.",
    },
    {
      id: 4,
      code: "T000008",
      name: "Healing",
      type: "Kháng sinh",
      price: 0,
      unit: "VNĐ",
      description: "Thuốc dùng để chữa bệnh lành tính.",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [editingDrug, setEditingDrug] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Xử lý tìm kiếm
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Xử lý mở Modal chỉnh sửa
  const handleEdit = (drug) => {
    setEditingDrug({ ...drug });
    setShowModal(true);
  };

  // Xử lý lưu chỉnh sửa
  const handleSave = () => {
    setDrugs((prevDrugs) =>
      prevDrugs.map((d) => (d.id === editingDrug.id ? editingDrug : d))
    );
    setShowModal(false);
    setEditingDrug(null);
  };

  // Xử lý xóa
  const handleDelete = (id) => {
    setDrugs((prevDrugs) => prevDrugs.filter((drug) => drug.id !== id));
  };

  // Lọc danh sách theo tìm kiếm
  const filteredDrugs = drugs.filter(
    (drug) =>
      drug.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      drug.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Header />
      <div className="container mt-4">
        <h4 className="mb-4">Danh Sách Thuốc</h4>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <InputGroup className="w-50">
            <Form.Control
              placeholder="Nhập tên hoặc mã thuốc"
              value={searchTerm}
              onChange={handleSearch}
            />
            <Button variant="success">
              <FaSearch className="me-2" />
              Tìm kiếm
            </Button>
          </InputGroup>
          <Link to="/addDrugForm" className="btn btn-success">
            + Thêm thuốc
          </Link>
        </div>
        <Table striped bordered hover>
          <thead>
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
            {filteredDrugs.map((drug, index) => (
              <tr key={drug.id}>
                <td>{index + 1}</td>
                <td>{drug.code}</td>
                <td>{drug.name}</td>
                <td>{drug.type}</td>
                <td>{drug.price.toLocaleString()}</td>
                <td>{drug.unit}</td>
                <td>{drug.description}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEdit(drug)}
                  >
                    Sửa
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(drug.id)}
                  >
                    Xóa
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

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
                  value={editingDrug.name}
                  onChange={(e) =>
                    setEditingDrug({ ...editingDrug, name: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Loại thuốc</Form.Label>
                <Form.Control
                  value={editingDrug.type}
                  onChange={(e) =>
                    setEditingDrug({ ...editingDrug, type: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Giá (VNĐ)</Form.Label>
                <Form.Control
                  type="number"
                  value={editingDrug.price}
                  onChange={(e) =>
                    setEditingDrug({ ...editingDrug, price: +e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Mô tả</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={editingDrug.description}
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
    </>
  );
};

export default ListOfDrugs;
