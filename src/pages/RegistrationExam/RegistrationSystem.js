import React, { useState, useEffect } from "react";
import {
  Table,
  Pagination,
  Form,
  Button,
  Row,
  Col,
  Alert,
  Card,
} from "react-bootstrap";
import Header from "./../../components/Headers/Header";
import { useNavigate } from "react-router-dom"; // Thêm để chuyển hướng

const RegistrationSystem = () => {
  const [registrations, setRegistrations] = useState([]);
  const [clinics, setClinics] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken") || "");
  const [formData, setFormData] = useState({
    isNewPatient: true,
    patient_id: null,
    patientData: {
      id_card: "",
      name: "",
      gender: "male",
      birth_date: "",
      phone: "",
      address: "",
    },
    clinic_id: "",
    doctor_id: "",
    priority: false,
    symptoms: "",
    note: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // Dùng để chuyển hướng

  useEffect(() => {
    if (!authToken) {
      setErrorMessage("Vui lòng đăng nhập để tiếp tục.");
      navigate("/login"); // Chuyển hướng nếu chưa đăng nhập
      return;
    }

    const fetchData = async () => {
      try {
        const headers = {
          "Authorization": `Bearer ${authToken}`,
        };

        const clinicsRes = await fetch("http://localhost:5001/api/clinics", { headers });
        if (!clinicsRes.ok) throw new Error("Không thể tải danh sách phòng khám.");
        const clinicsData = await clinicsRes.json();
        setClinics(clinicsData || []);

        const doctorsRes = await fetch("http://localhost:5001/api/users/doctors", { headers });
        if (!doctorsRes.ok) throw new Error("Không thể tải danh sách bác sĩ.");
        const doctorsData = await doctorsRes.json();
        setDoctors(doctorsData || []);

        await loadRegistrations(currentPage);
      } catch (error) {
        console.error("Error fetching data:", error);
        setErrorMessage("Lỗi khi tải dữ liệu, vui lòng thử lại hoặc đăng nhập lại.");
      }
    };
    fetchData();
  }, [currentPage, authToken, navigate]);

  const loadRegistrations = async (page) => {
    try {
      const res = await fetch(
        `http://localhost:5001/api/registerExam?page=${page}&limit=10`,
        {
          headers: {
            "Authorization": `Bearer ${authToken}`,
          },
        }
      );
      if (!res.ok) throw new Error("Không thể tải danh sách đăng ký.");
      const data = await res.json();
      setRegistrations(data.docs);
      setTotalPages(data.totalPages);
      setCurrentPage(data.page);
    } catch (error) {
      console.error("Error loading registrations:", error);
      setErrorMessage("Lỗi khi tải danh sách đăng ký, vui lòng thử lại.");
    }
  };

  const validateIdCard = (idCard) => {
    const regex = /^[0-9]{9,12}$/;
    return regex.test(idCard);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("patientData")) {
      const field = name.split(".")[1];
      setFormData({
        ...formData,
        patientData: {
          ...formData.patientData,
          [field]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleCheckBoxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  const validateForm = () => {
    if (!formData.clinic_id || !formData.doctor_id || !formData.symptoms) {
      return "Vui lòng chọn phòng khám, bác sĩ và nhập triệu chứng.";
    }
    if (formData.isNewPatient) {
      const { id_card, name, birth_date, phone, address } = formData.patientData;
      if (!id_card || !name || !birth_date || !phone || !address) {
        return "Vui lòng nhập đầy đủ thông tin bệnh nhân.";
      }
      if (!validateIdCard(id_card)) {
        return "Số CMND không hợp lệ.";
      }
    } else {
      if (!formData.patient_id) {
        return "Không tìm thấy bệnh nhân.";
      }
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorMessage = validateForm();
    if (errorMessage) {
      setErrorMessage(errorMessage);
      return;
    }

    try {
      const checkRes = await fetch(`http://localhost:5001/api/patients/id_card/${formData.patientData.id_card}`, {
        headers: {
          "Authorization": `Bearer ${authToken}`,
        },
      });
      const checkData = await checkRes.json();
      const patientExists = checkData && checkData.id_card;

      let payload = {
        clinic_id: formData.clinic_id,
        doctor_id: formData.doctor_id,
        priority: formData.priority,
        symptoms: formData.symptoms,
        note: formData.note,
      };

      if (patientExists) {
        setFormData((prev) => ({
          ...prev,
          isNewPatient: false,
          patient_id: checkData._id,
        }));
        payload.isNewPatient = false;
        payload.selectedPatientId = checkData._id;
      } else if (formData.isNewPatient) {
        payload.isNewPatient = true;
        payload.patientData = formData.patientData;
      } else {
        payload.isNewPatient = false;
        payload.selectedPatientId = formData.patient_id;
      }

      const response = await fetch("http://localhost:5001/api/registerExam", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`,
        },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();

      if (response.ok) {
        await loadRegistrations(currentPage);
        setFormData({
          isNewPatient: true,
          patient_id: null,
          patientData: {
            id_card: "",
            name: "",
            gender: "male",
            birth_date: "",
            phone: "",
            address: "",
          },
          clinic_id: "",
          doctor_id: "",
          priority: false,
          symptoms: "",
          note: "",
        });
        setErrorMessage("");
        alert("Đăng ký khám thành công!");
      } else {
        setErrorMessage(responseData.message || "Đăng ký thất bại, vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      setErrorMessage("Có lỗi xảy ra khi gửi form, vui lòng thử lại.");
    }
  };

  const handleSearchPatient = async () => {
    const idCard = formData.patientData.id_card;
    if (!validateIdCard(idCard)) {
      setErrorMessage("Số CMND không hợp lệ.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5001/api/patients/id_card/${idCard}`, {
        headers: {
          "Authorization": `Bearer ${authToken}`,
        },
      });
      const data = await res.json();
      console.log("API Response:", data);

      const patient = Array.isArray(data) && data.length > 0 ? data[0] : data;
      if (patient && patient.id_card) {
        setFormData((prev) => ({
          ...prev,
          patient_id: patient._id || patient.id,
          patientData: {
            id_card: patient.id_card || "",
            name: patient.name || "",
            gender: patient.gender || "male",
            birth_date: patient.birth_date ? patient.birth_date.slice(0, 10) : "",
            phone: patient.phone || "",
            address: patient.address || "",
          },
          isNewPatient: false,
        }));
        setErrorMessage("");
      } else {
        setErrorMessage("Không tìm thấy bệnh nhân với CMND này.");
        setFormData((prev) => ({
          ...prev,
          patientData: {
            ...prev.patientData,
            name: "",
            gender: "male",
            birth_date: "",
            phone: "",
            address: "",
          },
          patient_id: null,
          isNewPatient: true,
        }));
      }
    } catch (error) {
      console.error("Lỗi tìm kiếm bệnh nhân:", error);
      setErrorMessage(`Lỗi hệ thống khi tìm kiếm bệnh nhân: ${error.message}`);
    }
  };

  const renderPagination = () => (
    <Pagination>
      <Pagination.Prev
        disabled={currentPage === 1}
        onClick={() => loadRegistrations(currentPage - 1)}
      />
      {Array.from({ length: totalPages }, (_, i) => (
        <Pagination.Item
          key={i + 1}
          active={i + 1 === currentPage}
          onClick={() => loadRegistrations(i + 1)}
        >
          {i + 1}
        </Pagination.Item>
      ))}
      <Pagination.Next
        disabled={currentPage === totalPages}
        onClick={() => loadRegistrations(currentPage + 1)}
      />
    </Pagination>
  );

  return (
    <>
      <Header />
      
      <div className="container mt-4">
        {errorMessage && (
          <Alert variant="danger" onClose={() => setErrorMessage("")} dismissible>
            {errorMessage}
          </Alert>
        )}
        <Form onSubmit={handleSubmit}>
          <Card className="mb-4">
            <Card.Header>Thông tin người đăng ký</Card.Header>
            <Card.Body>
              <Row>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Số CMND</Form.Label>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <Form.Control
                        type="text"
                        name="patientData.id_card"
                        value={formData.patientData.id_card}
                        onChange={handleInputChange}
                        required
                        style={{ flex: 1, borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                      />
                      <Button
                        variant="primary"
                        onClick={handleSearchPatient}
                        style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                      >
                        Tìm kiếm
                      </Button>
                    </div>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Họ tên</Form.Label>
                    <Form.Control
                      type="text"
                      name="patientData.name"
                      value={formData.patientData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Ngày sinh</Form.Label>
                    <Form.Control
                      type="date"
                      name="patientData.birth_date"
                      value={formData.patientData.birth_date}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Số điện thoại</Form.Label>
                    <Form.Control
                      type="tel"
                      name="patientData.phone"
                      value={formData.patientData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Giới tính</Form.Label>
                    <div>
                      <Form.Check
                        inline
                        label="Nam"
                        type="radio"
                        name="patientData.gender"
                        value="male"
                        checked={formData.patientData.gender === "male"}
                        onChange={handleInputChange}
                      />
                      <Form.Check
                        inline
                        label="Nữ"
                        type="radio"
                        name="patientData.gender"
                        value="female"
                        checked={formData.patientData.gender === "female"}
                        onChange={handleInputChange}
                      />
                    </div>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Địa chỉ</Form.Label>
                    <Form.Control
                      type="text"
                      name="patientData.address"
                      value={formData.patientData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Header>Thông tin đăng ký</Card.Header>
            <Card.Body>
              <Row>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Phòng khám</Form.Label>
                    <Form.Select
                      name="clinic_id"
                      value={formData.clinic_id}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Chọn phòng khám</option>
                      {clinics.map((clinic) => (
                        <option key={clinic._id} value={clinic._id}>
                          {clinic.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Bác sĩ</Form.Label>
                    <Form.Select
                      name="doctor_id"
                      value={formData.doctor_id}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Chọn bác sĩ</option>
                      {doctors.map((doctor) => (
                        <option key={doctor._id} value={doctor._id}>
                          {doctor.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Triệu chứng</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="symptoms"
                      value={formData.symptoms}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Ghi chú</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="note"
                      value={formData.note}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Ưu tiên</Form.Label>
                    <Form.Check
                      type="switch"
                      name="priority"
                      label="Khẩn cấp"
                      checked={formData.priority}
                      onChange={handleCheckBoxChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          <div className="text-center">
            <Button variant="primary" type="submit">
              Đăng ký
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default RegistrationSystem;