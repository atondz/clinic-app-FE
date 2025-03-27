import Header from "../../components/Headers/Header";
import React, { useState, useEffect } from "react";
import { Table, Button, Form, InputGroup, Modal } from "react-bootstrap";
import { FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container } from "reactstrap";


const ListOfDrugs = () => {
  const [drugs, setDrugs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingDrug, setEditingDrug] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingTypes, setLoadingTypes] = useState(true);
  const [errorTypes, setErrorTypes] = useState(null);
  const [medicineTypes, setMedicineTypes] = useState([]);

  useEffect(() => {
    fetchDrugs();
  }, []);

  useEffect(() => {
    const fetchMedicineTypes = async () => {
      setLoadingTypes(true);
      setErrorTypes(null);
      try {
        const response = await axios.get("http://localhost:5001/api/medicineTypes");
        const typesData = response.data.data || response.data || [];
        if (!Array.isArray(typesData)) {
          throw new Error("Dữ liệu loại thuốc không phải là mảng");
        }
        setMedicineTypes(typesData);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách loại thuốc:", error.response?.data || error.message);
        setErrorTypes(error.message);
        toast.error(`Lỗi khi tải loại thuốc: ${error.message}`);
      } finally {
        setLoadingTypes(false);
      }
    };
    fetchMedicineTypes();
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
      setError("Không thể tải danh sách thuốc.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleEdit = (drug) => {
    const drugId = drug._id || drug.id;
    setEditingDrug({
      ...drug,
      id: drugId,
      medicine_type_id: drug.medicine_type_id.id || drug.medicine_type_id._id,
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!editingDrug.id) {
      toast.error("Không tìm thấy ID của thuốc để cập nhật.");
      return;
    }

    const updatedDrug = {
      medicine_code: editingDrug.medicine_code,
      medicine_name: editingDrug.medicine_name,
      medicine_type_id: editingDrug.medicine_type_id,
      price: editingDrug.price,
      unit: editingDrug.unit,
      description: editingDrug.description,
    };

    try {
      const response = await axios.put(
        `http://localhost:5001/api/medicine/${editingDrug.id}`,
        updatedDrug
      );
      const updatedMedicine = response.data.data || response.data;
      setDrugs((prevDrugs) =>
        prevDrugs.map((d) =>
          (d._id || d.id) === editingDrug.id ? { ...d, ...updatedMedicine } : d
        )
      );
      setShowModal(false);
      setEditingDrug(null);
      toast.success("Cập nhật thuốc thành công!");
    } catch (error) {
      console.error("Lỗi khi cập nhật thuốc:", error);
      const errorMessage = error.response?.data?.message || "Lỗi không xác định";
      toast.error(`Cập nhật thất bại: ${errorMessage}`);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa thuốc này?")) {
      try {
        await axios.delete(`http://localhost:5001/api/medicine/${id}`);
        setDrugs((prevDrugs) => prevDrugs.filter((drug) => (drug._id || drug.id) !== id));
        toast.success("Xóa thuốc thành công!");
      } catch (error) {
        console.error("Lỗi khi xóa thuốc:", error);
        toast.error("Xóa thất bại.");
      }
    }
  };

  const filteredDrugs = drugs.filter(
    (drug) =>
      (drug.medicine_name?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (drug.medicine_code?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (drug.medicine_type_id?.medicine_type_name?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <Container className="min-vh-100" fluid>
      <Header />
      <div className=" mt-4">
        <h4 className="mb-4">Danh Sách Thuốc</h4>
        {loading && <p>Đang tải dữ liệu...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!loading && !error && (
          <>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <InputGroup className="w-50">
                <Form.Control
                  placeholder="Nhập tên, mã hoặc loại thuốc"
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <Button variant="primary">
                  <FaSearch className="me-2" />
                  Tìm kiếm
                </Button>
              </InputGroup>
              <Link to="/addDrugForm" className="btn btn-primary">
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
                {filteredDrugs.length > 0 ? (
                  filteredDrugs.map((drug, index) => (
                    <tr key={drug._id || drug.id}>
                      <td>{index + 1}</td>
                      <td>{drug.medicine_code}</td>
                      <td>{drug.medicine_name}</td>
                      <td>{drug.medicine_type_id?.medicine_type_name}</td>
                      <td>{drug.price?.toLocaleString()}</td>
                      <td>{drug.unit}</td>
                      <td>{drug.description}</td>
                      <td>
                        <Button
                          variant="warning"
                          size="sm"
                          className="me-2"
                          onClick={() => handleEdit(drug)}
                        >
                          <FaEdit /> Sửa
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(drug._id || drug.id)}
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
          </>
        )}
      </div>

      {editingDrug && (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Chỉnh sửa thuốc</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Mã thuốc</Form.Label>
                <Form.Control
                  type="text"
                  value={editingDrug.medicine_code || ""}
                  onChange={(e) =>
                    setEditingDrug({ ...editingDrug, medicine_code: e.target.value })
                  }
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Tên thuốc</Form.Label>
                <Form.Control
                  type="text"
                  value={editingDrug.medicine_name || ""}
                  onChange={(e) =>
                    setEditingDrug({ ...editingDrug, medicine_name: e.target.value })
                  }
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Loại thuốc</Form.Label>
                {loadingTypes ? (
                  <Form.Select disabled>
                    <option>Đang tải loại thuốc...</option>
                  </Form.Select>
                ) : errorTypes ? (
                  <Form.Select disabled>
                    <option>Lỗi: {errorTypes}</option>
                  </Form.Select>
                ) : (
                  <Form.Select
                    value={editingDrug.medicine_type_id || ""}
                    onChange={(e) =>
                      setEditingDrug({ ...editingDrug, medicine_type_id: e.target.value })
                    }
                    required
                  >
                    <option value="">Chọn loại thuốc</option>
                    {medicineTypes.map((type) => (
                      <option key={type.id || type._id} value={type.id || type._id}>
                        {type.medicine_type_name}
                      </option>
                    ))}
                  </Form.Select>
                )}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Giá (VNĐ)</Form.Label>
                <Form.Control
                  type="number"
                  value={editingDrug.price || 0}
                  onChange={(e) =>
                    setEditingDrug({ ...editingDrug, price: +e.target.value })
                  }
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Đơn vị tính</Form.Label>
                <Form.Control
                  type="text"
                  value={editingDrug.unit || ""}
                  onChange={(e) =>
                    setEditingDrug({ ...editingDrug, unit: e.target.value })
                  }
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Mô tả</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={editingDrug.description || ""}
                  onChange={(e) =>
                    setEditingDrug({ ...editingDrug, description: e.target.value })
                  }
                  required
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
      <ToastContainer />
    </Container>
  );
};

export default ListOfDrugs;