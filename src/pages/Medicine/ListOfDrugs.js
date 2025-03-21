import Header from "../../components/Headers/Header";
import React, { useState, useEffect } from "react";
import { Table, Button, Form, InputGroup, Modal } from "react-bootstrap";
import { FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const ListOfDrugs = () => {
  const [drugs, setDrugs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch drug list from API when component mounts
  useEffect(() => {
    fetchDrugs();
  }, []);

  const fetchDrugs = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:5001/api/medicine");
      setDrugs(response.data.data || []);
      console.log("Drug list:", response.data.data);
    } catch (error) {
      console.error("Error fetching drug list:", error);
      setError("Cannot load drug list. Please check server or console.");
    } finally {
      setLoading(false);
    }
  };

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle edit - navigate to edit page with drug ID
  const handleEdit = (drugId) => {
    navigate(`/editDrug/${drugId}`);
  };

  // Handle delete (send DELETE request)
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this drug?")) {
      try {
        await axios.delete(`http://localhost:5001/api/medicine/${id}`);
        setDrugs((prevDrugs) => prevDrugs.filter((drug) => drug.id !== id));
        alert("Drug deleted successfully!");
      } catch (error) {
        console.error("Error deleting drug:", error);
        alert("Failed to delete drug. Please try again.");
      }
    }
  };

  // Filter list based on search
  const filteredDrugs = drugs.filter(
    (drug) =>
      (drug.medicine_name &&
        drug.medicine_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (drug.medicine_code &&
        drug.medicine_code.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (drug.medicine_type_name &&
        drug.medicine_type_name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <>
      <Header />
      <div className="container mt-4">
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
                    <tr key={drug.id}>
                      <td>{index + 1}</td>
                      <td>{drug.medicine_code}</td>
                      <td>{drug.medicine_name}</td>
                      <td>{drug.medicine_type_name}</td>
                      <td>{drug.price.toLocaleString()}</td>
                      <td>{drug.unit}</td>
                      <td>{drug.description}</td>
                      <td>
                        <Button
                          variant="warning"
                          size="sm"
                          className="me-2"
                          onClick={() => handleEdit(drug.id)}
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
          </>
        )}
      </div>
    </>
  );
};

export default ListOfDrugs;