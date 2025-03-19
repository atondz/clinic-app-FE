import Header from "../../components/Headers/Header";
import React, { useState, useEffect } from "react";
import { Table, Button, Form, InputGroup, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

const initialServices = [
  {
    id: 1,
    code: "DV000008",
    name: "asadasdas",
    type: "Loại thường",
    room: "Phòng Nội Soi",
    price: 234,
  },
  {
    id: 2,
    code: "DV000006",
    name: "sadsad",
    type: "Loại cận lâm sàng",
    room: "Phòng Chụp X-Quang",
    price: 435635345,
  },
  {
    id: 3,
    code: "DV003",
    name: "abcd",
    type: "Loại cận lâm sàng",
    room: "Phòng Chụp X-Quang",
    price: 435635345,
  },
  {
    id: 4,
    code: "DV004",
    name: "aaaa",
    type: "Loại cận lâm sàng",
    room: "Phòng Chụp X-Quang",
    price: 435635345,
  },
  {
    id: 5,
    code: "DV005",
    name: "cdef",
    type: "Loại cận lâm sàng",
    room: "Phòng Chụp X-Quang",
    price: 435635345,
  },
];

const ServiceList = () => {
  const [services, setServices] = useState(initialServices);
  const [searchTerm, setSearchTerm] = useState("");
  const [editService, setEditService] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    const updatedServices = services.filter((service) => service.id !== id);
    setServices(updatedServices);
  };

  const handleEdit = (service) => {
    setEditService(service);
    setShowModal(true);
  };

  const handleSave = () => {
    const updatedServices = services.map((service) =>
      service.id === editService.id ? editService : service
    );
    setServices(updatedServices);
    setShowModal(false);
    setEditService(null);
  };

  return (
    <>
      <Header />
      <div className="p-4">
        <h4 className="mb-4">DANH SÁCH DỊCH VỤ KHÁM</h4>

        {/* Search Bar and Add Button */}
        <div className="d-flex justify-content-between mb-3">
          <InputGroup style={{ maxWidth: "400px" }}>
            <Form.Control
              placeholder="Nhập tên dịch vụ khám"
              value={searchTerm}
              onChange={handleSearch}
            />
            <Button variant="success">Tìm kiếm</Button>
          </InputGroup>
          <Link to="/serviceList" className="btn btn-success">
            + Thêm dịch vụ khám
          </Link>
        </div>

        {/* Table */}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>STT</th>
              <th>Mã</th>
              <th>Tên dịch vụ khám</th>
              <th>Loại dịch vụ</th>
              <th>Phòng khám</th>
              <th>Giá</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredServices.map((service, index) => (
              <tr key={service.id}>
                <td>{index + 1}</td>
                <td>{service.code}</td>
                <td>{service.name}</td>
                <td>{service.type}</td>
                <td>{service.room}</td>
                <td>{service.price}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEdit(service)}
                  >
                    Sửa
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(service.id)}
                  >
                    Xóa
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Edit Modal */}
      {editService && (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Chỉnh sửa dịch vụ</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Tên dịch vụ khám</Form.Label>
                <Form.Control
                  value={editService.name}
                  onChange={(e) =>
                    setEditService({ ...editService, name: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Loại dịch vụ</Form.Label>
                <Form.Control
                  value={editService.type}
                  onChange={(e) =>
                    setEditService({ ...editService, type: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Phòng khám</Form.Label>
                <Form.Control
                  value={editService.room}
                  onChange={(e) =>
                    setEditService({ ...editService, room: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Giá</Form.Label>
                <Form.Control
                  type="number"
                  value={editService.price}
                  onChange={(e) =>
                    setEditService({ ...editService, price: e.target.value })
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

export default ServiceList;
