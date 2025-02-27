import React, { useState } from "react";
import {
  Card, CardHeader, Table, Container, Row, Button, Input, 
  InputGroup, InputGroupAddon, InputGroupText, Col, Pagination, PaginationItem, PaginationLink
} from "reactstrap";
import TableList from "./TableList"; // Import component hàng

const PatientList = () => {
  const [patients, setPatients] = useState([
    { id: 1, patientName: "Nguyễn Văn A", code: "BN001", gender: "Nam", phone: "0901234567", dob: "12/03/1985", address: "Hà Nội" },
    { id: 2, patientName: "Trần Thị B", code: "BN002", gender: "Nữ", phone: "0912345678", dob: "05/07/1992", address: "Hồ Chí Minh" },
    { id: 3, patientName: "Lê Văn C", code: "BN003", gender: "Nam", phone: "0923456789", dob: "20/10/1980", address: "Đà Nẵng" },
    { id: 4, patientName: "Phạm Thị D", code: "BN004", gender: "Nữ", phone: "0934567890", dob: "15/04/1995", address: "Cần Thơ" },
    { id: 5, patientName: "Đặng Văn E", code: "BN005", gender: "Nam", phone: "0945678901", dob: "30/08/1987", address: "Hải Phòng" },
    { id: 6, patientName: "Ngô Thị G", code: "BN006", gender: "Nữ", phone: "0956789012", dob: "22/12/1990", address: "Bình Dương" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const patientsPerPage = 5;

  // Lọc bệnh nhân theo tìm kiếm
  const filteredPatients = patients.filter((patient) =>
    patient.patientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Xác định index của bệnh nhân hiển thị trên trang hiện tại
  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = filteredPatients.slice(indexOfFirstPatient, indexOfLastPatient);

  // Số lượng trang
  const totalPages = Math.ceil(filteredPatients.length / patientsPerPage);

  // Xử lý chuyển trang
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
          <Button color="primary">+ Thêm Bệnh Nhân</Button>
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
                  <th scope="col">Tên Bệnh nhân</th>
                  <th scope="col">Mã</th>
                  <th scope="col">Giới Tính</th>
                  <th scope="col">SDT</th>
                  <th scope="col">Ngày Sinh</th>
                  <th scope="col">Địa Chỉ</th>
                </tr>
              </thead>
              <tbody>
                {currentPatients.length > 0 ? (
                  currentPatients.map((patient) => (
                    <TableList key={patient.id} data={patient} />
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center text-muted">Không tìm thấy bệnh nhân</td>
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
