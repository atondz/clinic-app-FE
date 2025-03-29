import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  FormGroup,
  Label,
  Form,
} from "reactstrap";
import TableList from "./TableList";
import "react-toastify/dist/ReactToastify.css";

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("name"); // 'name' hoặc 'id_card'
  const [currentPage, setCurrentPage] = useState(1);
  const patientsPerPage = 5;
  const navigate = useNavigate();

  // Fetch API khi component mount
  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await fetch(
        "https://clinic-app-be.onrender.com/api/patients",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      const data = await response.json();
      setPatients(data);
    } catch (err) {
      console.error("Lỗi khi fetch bệnh nhân:", err);
    }
  };

  // Lọc bệnh nhân theo loại tìm kiếm
  const filteredPatients = patients.filter((patient) => {
    if (!searchTerm.trim()) return true;

    if (searchType === "name") {
      return patient.name.toLowerCase().includes(searchTerm.toLowerCase());
    } else {
      return patient.id_card?.toString().includes(searchTerm);
    }
  });

  // Phân trang
  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = filteredPatients.slice(
    indexOfFirstPatient,
    indexOfLastPatient
  );
  const totalPages = Math.ceil(filteredPatients.length / patientsPerPage);

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
        <Col md="6">
          <Card className="shadow-sm border-0">
            <CardHeader className="bg-transparent border-0 p-2">
              <Row className="align-items-center">
                <Col md="4" className="pr-0">
                  <FormGroup className="mb-0">
                    <Input
                      type="select"
                      id="searchType"
                      value={searchType}
                      onChange={(e) => {
                        setSearchType(e.target.value);
                        setSearchTerm(""); // Reset search term khi thay đổi loại tìm kiếm
                      }}
                      className="form-control-sm"
                    >
                      <option value="name">Tìm theo tên</option>
                      <option value="id_card">Tìm theo CCCD</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col md="6" className="px-0">
                  <InputGroup>
                    <Input
                      placeholder={
                        searchType === "name"
                          ? "Nhập tên bệnh nhân..."
                          : "Nhập số CCCD..."
                      }
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1); // Reset về trang 1 khi tìm kiếm
                      }}
                      className="form-control-sm"
                    />
                    <InputGroupAddon addonType="append">
                      <Button color="primary" size="sm">
                        <i className="fas fa-search mr-1" />
                      </Button>
                    </InputGroupAddon>
                  </InputGroup>
                </Col>
                <Col md="2" className="text-right pl-0">
                  <Button
                    color="primary"
                    size="sm"
                    onClick={() => navigate("/patient/new")}
                  >
                    <i className="fas fa-plus mr-1"></i> Thêm
                  </Button>
                </Col>
              </Row>
            </CardHeader>
          </Card>
        </Col>
      </Row>

      {/* Bảng danh sách bệnh nhân */}
      <Row>
        <div className="col">
          <Card className="shadow">
            <CardHeader className="bg-light border-0">
              <Row className="align-items-center">
                <Col>
                  <h4 className="mb-0">Danh sách bệnh nhân</h4>
                </Col>
                <Col className="text-right">
                  <small className="text-muted">
                    Tìm thấy {filteredPatients.length} bệnh nhân
                  </small>
                </Col>
              </Row>
            </CardHeader>
            <Table className="align-items-center" responsive hover>
              <thead className="thead-light">
                <tr>
                  <th scope="col">Mã</th>
                  <th scope="col">CCCD</th>
                  <th scope="col">Tên Bệnh nhân</th>
                  <th scope="col">Giới Tính</th>
                  <th scope="col">SDT</th>
                  <th scope="col">Ngày Sinh</th>
                  <th scope="col">Địa Chỉ</th>
                  <th scope="col" className="text-right">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentPatients.length > 0 ? (
                  currentPatients.map((patient) => (
                    <TableList
                      key={patient._id}
                      data={patient}
                      navigate={navigate}
                      setPatients={setPatients}
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-4 text-muted">
                      {searchTerm
                        ? "Không tìm thấy bệnh nhân phù hợp"
                        : "Không có dữ liệu bệnh nhân"}
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Card>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination className="mt-3 justify-content-center">
              <PaginationItem disabled={currentPage === 1}>
                <PaginationLink
                  previous
                  onClick={() => handlePageChange(currentPage - 1)}
                />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, i) => (
                <PaginationItem active={i + 1 === currentPage} key={i}>
                  <PaginationLink onClick={() => handlePageChange(i + 1)}>
                    {i + 1}
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
        </div>
      </Row>
    </Container>
  );
};

export default PatientList;
