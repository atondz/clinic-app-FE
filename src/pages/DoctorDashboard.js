import axios from "axios";
import Header from "./../components/Headers/Header";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Table, Button, Form, Modal } from "react-bootstrap";
import {
  Container,
  Card,
  CardHeader,
  Row,
  Col,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormGroup,
  Label,
  Alert,
} from "reactstrap";

const DoctorDashboard = () => {
  const [user, setUser] = useState(null);
  const [allRegistrations, setAllRegistrations] = useState([]); // Lưu tất cả dữ liệu
  const [filteredRegistrations, setFilteredRegistrations] = useState([]); // Dữ liệu đã lọc
  const [showModal, setShowModal] = useState(false);
  const [selectedRegistration, setSelectedRegistration] = useState(null);
  const [prescriptionData, setPrescriptionData] = useState({
    medicines: [{ name: "", dosage: "" }],
    notes: "",
  });
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("name");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  // Lấy token từ localStorage
  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        console.error("Token không tồn tại!");
        return;
      }

      try {
        const res = await axios.get(
          "https://clinic-app-be.onrender.com/api/users/me",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setUser(res.data);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (!user || user.role !== "doctor") return;

    if (!authToken) {
      setError("Vui lòng đăng nhập để tiếp tục.");
      navigate("/login");
      return;
    }

    const fetchRegistrations = async () => {
      try {
        const response = await axios.get(
          `https://clinic-app-be.onrender.com/api/registerExam/doctor/${user._id}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        setAllRegistrations(response.data);
        setFilteredRegistrations(response.data); // Ban đầu hiển thị tất cả
      } catch (error) {
        console.error("Lỗi tải danh sách đăng ký:", error);
        if (error.response?.status === 401) {
          setError("Phiên đăng nhập hết hạn, vui lòng đăng nhập lại.");
          navigate("/login");
        } else {
          setError("Lỗi tải danh sách đăng ký, vui lòng thử lại.");
        }
      }
    };
    fetchRegistrations();
  }, [user, authToken, navigate, successMessage]);

  const handleCreateDiagnosis = (registration) => {
    navigate(
      `/diagnosis/${registration?._id}/${registration?.patient_id?._id}/${user._id}`
    );
  };

  // Hàm tìm kiếm trên client-side
  const handleSearch = () => {
    if (!searchTerm.trim()) {
      // Nếu không có từ khóa tìm kiếm, hiển thị tất cả
      setFilteredRegistrations(allRegistrations);
      setError("");
      return;
    }

    const term = searchTerm.toLowerCase();
    let results = [];

    if (searchType === "name") {
      results = allRegistrations.filter((reg) =>
        reg.patient_id?.name?.toLowerCase().includes(term)
      );
    } else {
      results = allRegistrations.filter((reg) =>
        reg.patient_id?.id_card?.toLowerCase().includes(term)
      );
    }

    setFilteredRegistrations(results);

    if (results.length === 0) {
      setError("Không tìm thấy bệnh nhân phù hợp.");
    } else {
      setError("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleCreatePrescription = (registration) => {
    navigate(
      `/prescritions/${registration?._id}/${registration?.patient_id?._id}/${registration?.doctor_id}`
    );
  };

  if (!user || user.role !== "doctor") {
    return (
      <>
        <Header />
        <div className="container mt-4">
          Bạn không có quyền truy cập trang này.
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <>
        <Row className="mb-4">
          <Col lg="6">
            <h1 className="display-4 text-dark mb-0">
              🩺 Danh Sách Phiếu Khám
            </h1>
          </Col>
          <Col lg="6">
            <Card className="shadow-sm border-0">
              <CardHeader className="bg-transparent border-0 p-3">
                <Row className="align-items-center">
                  <Col md="4" className="pr-0">
                    <FormGroup className="mb-0">
                      <Input
                        type="select"
                        id="searchType"
                        value={searchType}
                        onChange={(e) => setSearchType(e.target.value)}
                        className="form-control-alternative"
                      >
                        <option value="name">Tên bệnh nhân</option>
                        <option value="id_card">Mã thẻ bệnh nhân</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md="6" className="px-0">
                    <InputGroup>
                      <Input
                        placeholder={
                          searchType === "name"
                            ? "Nhập tên bệnh nhân..."
                            : "Nhập mã thẻ..."
                        }
                        value={searchTerm}
                        onChange={(e) => {
                          setSearchTerm(e.target.value);
                          // Tìm kiếm ngay khi nhập (debounce có thể thêm nếu cần)
                          handleSearch();
                        }}
                        onKeyPress={handleKeyPress}
                        className="form-control-alternative"
                      />
                      <InputGroupAddon addonType="append">
                        <Button color="primary" onClick={handleSearch}>
                          <i className="fas fa-search mr-1" /> Tìm
                        </Button>
                      </InputGroupAddon>
                    </InputGroup>
                  </Col>
                </Row>
              </CardHeader>
            </Card>
          </Col>
        </Row>

        {error && (
          <Alert color="danger" className="mt-3">
            {error}
          </Alert>
        )}

        {successMessage && (
          <Alert color="success" className="mt-3">
            {successMessage}
          </Alert>
        )}

        <Card className="shadow">
          <CardHeader className="bg-light border-0">
            <Row className="align-items-center">
              <Col>
                <h3 className="mb-0">Danh sách phiếu khám</h3>
              </Col>
              <Col className="text-right">
                <Button
                  color="primary"
                  size="sm"
                  onClick={() => {
                    setSearchTerm("");
                    setSearchType("name");
                    setFilteredRegistrations(allRegistrations);
                    setError("");
                  }}
                >
                  <i className="fas fa-sync-alt mr-1"></i> Làm mới
                </Button>
              </Col>
            </Row>
          </CardHeader>
          <div className="table-responsive">
            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
                <tr>
                  <th scope="col">STT</th>
                  <th scope="col">Mã khám</th>
                  <th scope="col">Tên bệnh nhân</th>
                  <th scope="col">Triệu chứng</th>
                  <th scope="col">Ghi chú</th>
                  <th scope="col">Ưu tiên</th>
                  <th scope="col" className="text-right">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredRegistrations.length > 0 ? (
                  filteredRegistrations.map((reg, index) => (
                    <tr key={reg._id}>
                      <td>{reg.order_number}</td>
                      <td>{reg.medical_code}</td>
                      <td>{reg.patient_id?.name || "N/A"}</td>
                      <td>{reg.symptoms}</td>
                      <td>{reg.note || "Không có"}</td>
                      <td>
                        <span
                          style={{
                            color: reg.priority ? "red" : "gray",
                            fontWeight: reg.priority ? "bold" : "normal",
                          }}
                        >
                          {reg.priority ? "ƯU TIÊN" : "THƯỜNG"}
                        </span>
                      </td>
                      <td className="text-right">
                        <Button
                          variant="info"
                          size="sm"
                          onClick={() => handleCreateDiagnosis(reg)}
                          className="btn-icon btn-2 mr-2"
                        >
                          <span className="btn-inner--icon">
                            <i className="fas fa-stethoscope"></i>
                          </span>
                          <span className="btn-inner--text">Chẩn đoán</span>
                        </Button>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleCreatePrescription(reg)}
                          className="btn-icon btn-2"
                        >
                          <span className="btn-inner--icon">
                            <i className="fas fa-file-prescription"></i>
                          </span>
                          <span className="btn-inner--text">Đơn thuốc</span>
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      {error ? "" : "Không có dữ liệu phiếu khám"}
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Card>
      </>
    </>
  );
};

export default DoctorDashboard;
