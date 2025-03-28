import { useSelector } from 'react-redux';
import axios from 'axios';
import Header from './../components/Headers/Header';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Modal } from 'react-bootstrap';
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
  Alert
} from 'reactstrap';

const DoctorDashboard = () => {
  const [user, setUser] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedRegistration, setSelectedRegistration] = useState(null);
  const [prescriptionData, setPrescriptionData] = useState({
    medicines: [{ name: "", dosage: "" }],
    notes: ""
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
        const res = await axios.get("http://localhost:5001/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(res.data);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (!user || user.role !== 'doctor') return;

    if (!authToken) {
      setError("Vui lòng đăng nhập để tiếp tục.");
      navigate("/login");
      return;
    }

    const fetchRegistrations = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/registerExam/doctor/${user._id}`, {
          headers: {
            "Authorization": `Bearer ${authToken}`,
          },
        });
        setRegistrations(response.data);
      } catch (error) {
        console.error('Lỗi tải danh sách đăng ký:', error);
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

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      // Nếu searchTerm rỗng, load lại danh sách ban đầu
      try {
        const response = await axios.get(`http://localhost:5001/api/registerExam/doctor/${user._id}`, {
          headers: {
            "Authorization": `Bearer ${authToken}`,
          },
        });
        setRegistrations(response.data);
        setError("");
      } catch (error) {
        console.error('Lỗi tải danh sách đăng ký:', error);
        setError("Lỗi tải danh sách đăng ký, vui lòng thử lại.");
      }
      return;
    }

    try {
      let response;
      if (searchType === "name") {
        response = await axios.get(`http://localhost:5001/api/registerExam/by-name/${searchTerm}`, {
          headers: {
            "Authorization": `Bearer ${authToken}`,
          },
        });
      } else {
        response = await axios.get(`http://localhost:5001/api/registerExam/by-idcard/${searchTerm}`, {
          headers: {
            "Authorization": `Bearer ${authToken}`,
          },
        });
      }
      setRegistrations(response.data);
      setError("");
      if (response.data.length === 0) {
        setError("Không tìm thấy bệnh nhân phù hợp.");
      }
    } catch (error) {
      console.error('Lỗi tìm kiếm bệnh nhân:', error);
      setError("Không tìm thấy bệnh nhân phù hợp.");
      setRegistrations([]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleCreatePrescription = (registration) => {
    setSelectedRegistration(registration);
    setPrescriptionData({ medicines: [{ name: "", dosage: "" }], notes: "" });
    setShowModal(true);
  };

  const handleAddMedicine = () => {
    setPrescriptionData(prev => ({
      ...prev,
      medicines: [...prev.medicines, { name: "", dosage: "" }],
    }));
  };

  const handleRemoveMedicine = (index) => {
    setPrescriptionData(prev => {
      const newMedicines = [...prev.medicines];
      newMedicines.splice(index, 1);
      return { ...prev, medicines: newMedicines };
    });
  };

  const handleMedicineNameChange = (e, index) => {
    const newMedicines = [...prescriptionData.medicines];
    newMedicines[index].name = e.target.value;
    setPrescriptionData({ ...prescriptionData, medicines: newMedicines });
  };

  const handleMedicineDosageChange = (e, index) => {
    const newMedicines = [...prescriptionData.medicines];
    newMedicines[index].dosage = e.target.value;
    setPrescriptionData({ ...prescriptionData, medicines: newMedicines });
  };

  const handleNotesChange = (e) => {
    setPrescriptionData({ ...prescriptionData, notes: e.target.value });
  };

  const handleSubmitPrescription = async () => {
    try {
      await axios.post(
        'http://localhost:5001/api/registerExam/prescriptions',
        {
          patient_id: selectedRegistration.patient_id._id,
          registration_id: selectedRegistration._id,
          doctor_id: user._id,
          medicines: prescriptionData.medicines,
          notes: prescriptionData.notes,
        },
        {
          headers: {
            "Authorization": `Bearer ${authToken}`,
          },
        }
      );
      setShowModal(false);
      setSuccessMessage('Tạo đơn thuốc thành công!');
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error('Lỗi tạo đơn thuốc:', error);
      if (error.response?.status === 401) {
        setError("Phiên đăng nhập hết hạn, vui lòng đăng nhập lại.");
        navigate("/login");
      } else {
        setError("Lỗi tạo đơn thuốc, vui lòng thử lại.");
      }
    }
  };

  if (!user || user.role !== 'doctor') {
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
            <h1 className="display-4 text-dark mb-0">🩺 Danh Sách Phiếu Khám</h1>
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
                        placeholder={searchType === "name" ? "Nhập tên bệnh nhân..." : "Nhập mã thẻ..."}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
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
                <Button color="primary" size="sm" onClick={() => window.location.reload()}>
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
                  <th scope="col" className="text-right">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {registrations.length > 0 ? (
                  registrations.map((reg, index) => (
                    <tr key={reg._id}>
                      <td>{reg.order_number}</td>
                      <td>{reg.medical_code}</td>
                      <td>{reg.patient_id?.name || 'N/A'}</td>
                      <td>{reg.symptoms}</td>
                      <td>{reg.note || 'Không có'}</td>
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

        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton className="border-0 pb-0">
            <Modal.Title className="display-4">Tạo đơn thuốc</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedRegistration && (
              <div className="mb-4">
                <h5 className="text-muted">Bệnh nhân: {selectedRegistration.patient_id?.name}</h5>
                <h6 className="text-muted">Mã khám: {selectedRegistration.medical_code}</h6>
              </div>
            )}
            <Form>
              <Form.Group className="mb-3">
                <Form.Label className="font-weight-bold">Thuốc và liều lượng</Form.Label>
                {prescriptionData.medicines.map((medicine, index) => (
                  <div key={index} className="d-flex align-items-center mb-2">
                    <Form.Control
                      type="text"
                      value={medicine.name}
                      placeholder="Tên thuốc"
                      onChange={(e) => handleMedicineNameChange(e, index)}
                      className="mr-2"
                    />
                    <Form.Control
                      type="text"
                      value={medicine.dosage}
                      placeholder="Liều lượng"
                      onChange={(e) => handleMedicineDosageChange(e, index)}
                      className="mr-2"
                    />
                    {index > 0 && (
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleRemoveMedicine(index)}
                        className="btn-icon"
                      >
                        <i className="fas fa-times"></i>
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={handleAddMedicine}
                  className="mt-2"
                >
                  <i className="fas fa-plus mr-1"></i> Thêm thuốc
                </Button>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="font-weight-bold">Ghi chú</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={prescriptionData.notes}
                  placeholder="Nhập ghi chú..."
                  onChange={handleNotesChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer className="border-0 pt-0">
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Hủy bỏ
            </Button>
            <Button variant="primary" onClick={handleSubmitPrescription}>
              <i className="fas fa-save mr-1"></i> Lưu đơn thuốc
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </>
  );
};

export default DoctorDashboard;