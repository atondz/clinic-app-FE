import React, { useState } from "react";
import {
  Card, CardHeader, Table, Container, Row, Button, Input, 
  Form, FormGroup, Label, InputGroup, InputGroupAddon, InputGroupText, Col, Pagination, PaginationItem, PaginationLink
} from "reactstrap";
import TableRow from "./MedicalCertificateRow.js"; // Import component hàng
import { useNavigate } from "react-router-dom"; // Import useNavigate để điều hướng

const MedicalCertificate = () => {
  const [patients, setPatients] = useState([
    { id: 1, patientName: "Nguyễn Văn A", code: "BN001", title: "Khám tổng quát", clinic: "Phòng 101", doctor: "Bác sĩ B", date: "20/02/2025", status: "Đã khám", statusColor: "success", paymentStatus: "Đã thanh toán", paymentColor: "info" },
    { id: 2, patientName: "Trần Thị B", code: "BN002", title: "Nội soi", clinic: "Phòng 102", doctor: "Bác sĩ C", date: "21/02/2025", status: "Chưa khám", statusColor: "warning", paymentStatus: "Đã thanh toán", paymentColor: "success" },
    { id: 3, patientName: "Lê Văn C", code: "BN003", title: "Xét nghiệm máu", clinic: "Phòng 103", doctor: "Bác sĩ D", date: "22/02/2025", status: "Đã khám", statusColor: "success", paymentStatus: "Đã thanh toán", paymentColor: "danger" },
    { id: 4, patientName: "Phạm Thị D", code: "BN004", title: "Siêu âm", clinic: "Phòng 104", doctor: "Bác sĩ E", date: "23/02/2025", status: "Chưa khám", statusColor: "warning", paymentStatus: "Chưa thanh toán", paymentColor: "danger" },
    { id: 5, patientName: "Đặng Văn E", code: "BN005", title: "Xét nghiệm nước tiểu", clinic: "Phòng 105", doctor: "Bác sĩ F", date: "24/02/2025", status: "Đã khám", statusColor: "success", paymentStatus: "Đã thanh toán", paymentColor: "success" },
    { id: 6, patientName: "Ngô Thị G", code: "BN006", title: "Đo huyết áp", clinic: "Phòng 106", doctor: "Bác sĩ G", date: "25/02/2025", status: "Chưa khám", statusColor: "warning", paymentStatus: "Chưa thanh toán", paymentColor: "danger" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const patientsPerPage = 5;

  const navigate = useNavigate(); // Hook để điều hướng

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
      <Row className="mb-4 d-flex justify-content-between align-items-center">
        <Col md="6">
          <h3 className="text-dark mb-0">🩺 Danh Sách Giấy Khám Bệnh</h3>
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
          <Button color="primary" onClick={() => navigate("/prescription/add-medical-certificate")}>+ Thêm Giấy Khám Bệnh</Button> {/* Điều hướng đến trang form */}
        </Col>
      </Row>

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
                  <th scope="col">Tiêu đề</th>
                  <th scope="col">Phòng Khám</th>
                  <th scope="col">Bác sĩ</th>
                  <th scope="col">Ngày khám</th>
                  <th scope="col">Trạng thái</th>
                  <th scope="col">Thanh Toán</th>
                  <th scope="col" />
                </tr>
              </thead>
              <tbody>
                {currentPatients.length > 0 ? (
                  currentPatients.map((patient) => (
                    <TableRow key={patient.id} data={patient} />
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center text-muted">Không tìm thấy bệnh nhân</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Card>

          {/* Pagination */}
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
        </div>
      </Row>
    </Container>
  );
};

export default MedicalCertificate;
