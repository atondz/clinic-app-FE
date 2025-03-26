import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // 🚀 Điều hướng khi chỉnh sửa
import {
  Card, CardHeader, Table, Container, Row, Button, Input,
  InputGroup, InputGroupAddon, InputGroupText, Col, Pagination, PaginationItem, PaginationLink
} from "reactstrap";

import { toast } from "react-toastify"; // 🚀 Hiển thị thông báo
import "react-toastify/dist/ReactToastify.css"; // Import CSS của toast

import TableList from "./TableList"; // Import hàng dữ liệu

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const patientsPerPage = 5;
  const navigate = useNavigate(); // 🚀 Điều hướng trang

  // Fetch API khi component mount
  useEffect(() => {
    fetch("http://localhost:5001/api/patients", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPatients(data);
        } else {
          toast.error("Dữ liệu không hợp lệ hoặc không phải mảng.");
        }
      })
      .catch((err) => {
        console.error("Lỗi khi fetch bệnh nhân:", err);
        toast.error("Có lỗi xảy ra khi tải danh sách bệnh nhân.");
      });
  }, []);

  // Lọc bệnh nhân theo tìm kiếm
  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Phân trang
  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = filteredPatients.slice(indexOfFirstPatient, indexOfLastPatient);
  const totalPages = Math.ceil(filteredPatients.length / patientsPerPage);

  // Chuyển trang
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <Container className="mt-4" fluid>
      {/* Thanh tìm kiếm và nút thêm */}
      <Row className="mb-4 d-flex justify-content-between align-items-center">
        <Col md="6">
          <h3 className="text-dark mb-0">🩺 Danh Sách Bệnh Nhân</h3>
        </Col>
        <Col md="3">
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className="fas fa-search" />
              </InputGroupText>
            </InputGroupAddon>
            <Input
              type="text"
              placeholder="Tìm kiếm bệnh nhân..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </Col>

        <Col md="3" className="text-right">
          <Button color="primary" onClick={() => navigate("/patient/new")}>+ Thêm Bệnh Nhân</Button>
        </Col>
      </Row>

      {/* Bảng danh sách bệnh nhân */}
      <Row>
        <div className="col">
          <Card className="shadow">
            <CardHeader className="bg-light border-0">
              <h4 className="text-dark mb-0">Danh sách bệnh nhân</h4>
            </CardHeader>
            <Table className="align-items-center" responsive>
              <thead className="thead-light">
                <tr>
                 <th scope="col">Mã</th>
                  <th scope="col">Tên Bệnh nhân</th>
                  <th scope="col">Giới Tính</th>
                  <th scope="col">SDT</th>
                  <th scope="col">Ngày Sinh</th>
                  <th scope="col">Địa Chỉ</th>
                  <th scope="col" className="text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {currentPatients.length > 0 ? (
                  currentPatients.map((patient) => (
                    <TableList key={patient.id} data={patient} navigate={navigate} setPatients={setPatients} />
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center text-muted">Không tìm thấy bệnh nhân</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Card>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination className="mt-3 justify-content-center">
              <PaginationItem disabled={currentPage === 1}>
                <PaginationLink previous onClick={() => handlePageChange(currentPage - 1)} />
              </PaginationItem>
              {[...Array(totalPages)].map((_, index) => (
                <PaginationItem active={index + 1 === currentPage} key={index}>
                  <PaginationLink onClick={() => handlePageChange(index + 1)}>
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem disabled={currentPage === totalPages}>
                <PaginationLink next onClick={() => handlePageChange(currentPage + 1)} />
              </PaginationItem>
            </Pagination>
          )}
        </div>
      </Row>
    </Container>
  );
};

export default PatientList;
