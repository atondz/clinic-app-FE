import React, { useState, useEffect } from 'react';
import { Table, Pagination, Form, Button, Row, Col, Alert, Card } from 'react-bootstrap';

const RegistrationSystem = () => {
  // State management
  const [registrations, setRegistrations] = useState([]);
  const [clinics, setClinics] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [formData, setFormData] = useState({
    isNewPatient: true,
    patientData: {
      id_card: '',
      name: '',
      gender: 'male',
      birth_date: '',
      phone: '',
      address: ''
    },
    clinic_id: '',
    doctor_id: '',
    priority: false,
    symptoms: '',
    note: ''
  });
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    // Giả lập dữ liệu hoặc gọi API lấy danh sách bệnh nhân
    setPatients([
      { _id: "1", name: "Nguyễn Văn A" },
      { _id: "2", name: "Trần Thị B" }
    ]);
  }, []);
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };


  // Error state for form submission
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch clinics
        const clinicsRes = await fetch('http://localhost:5001/api/clinics');
        const clinicsData = await clinicsRes.json();
        setClinics(clinicsData || []); // Default to empty array if no data

        // Fetch doctors
        const doctorsRes = await fetch('http://localhost:5001/api/users/doctors');
        const doctorsData = await doctorsRes.json();
        setDoctors(doctorsData || []); // Default to empty array if no data

        // Fetch registrations
        await loadRegistrations(currentPage);
      } catch (error) {
        console.error('Error fetching data:', error);
        setErrorMessage('Lỗi khi tải dữ liệu, vui lòng thử lại.');
      }
    };

    fetchData();
  }, [currentPage]);

  // Load registrations with pagination
  const loadRegistrations = async (page) => {
    try {
      const res = await fetch(`http://localhost:5001/api/registerExam?page=${page}&limit=10`);
      const data = await res.json();
      setRegistrations(data.docs);
      setTotalPages(data.totalPages);
      setCurrentPage(data.page);
    } catch (error) {
      console.error('Error loading registrations:', error);
      setErrorMessage('Lỗi khi tải danh sách đăng ký, vui lòng thử lại.');
    }
  };

  // Validate ID card format
  const validateIdCard = (idCard) => {
    const regex = /^[0-9]{9,12}$/;
    return regex.test(idCard);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateIdCard(formData.patientData.id_card)) {
      setErrorMessage('Số CMND không hợp lệ.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/api/registerExam', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await loadRegistrations(currentPage);
        setFormData({
          ...formData,
          patientData: {
            id_card: '',
            name: '',
            gender: 'male',
            birth_date: '',
            phone: '',
            address: ''
          },
          symptoms: '',
          note: ''
        });
        setErrorMessage('');
      } else {
        setErrorMessage('Đăng ký thất bại, vui lòng thử lại.');
      }
    } catch (error) {
      console.error('Registration failed:', error);
      setErrorMessage('Có lỗi xảy ra khi gửi form, vui lòng thử lại.');
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('patientData')) {
      const field = name.split('.')[1];
      setFormData({
        ...formData,
        patientData: {
          ...formData.patientData,
          [field]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // Pagination controls
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
    <div className="container mt-4">
      {/* Registration Table */}
      <h3>Danh sách đăng ký</h3>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>STT</th>
            <th>Mã KCB</th>
            <th>Mã BN</th>
            <th>Tên BN</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(registrations) && registrations.map((reg, index) => (
            <tr key={reg._id}>
              <td>{(currentPage - 1) * 10 + index + 1}</td>
              <td>{reg.medical_code}</td>
              <td>{reg.patient_id.patient_id}</td>
              <td>{reg.patient_id.name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {renderPagination()}

      <Form onSubmit={handleSubmit}>
        {/* Bảng 1: Thông tin người đăng ký */}
        <Card className="mb-4">
          <Card.Header>Thông tin người đăng ký</Card.Header>
          <Card.Body>
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Số CMND</Form.Label>
                  <Form.Control
                    type="text"
                    name="patientData.id_card"
                    value={formData.patientData.id_card}
                    onChange={handleInputChange}
                    required
                  />
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
                    name="patientData.dob"
                    value={formData.patientData.dob}
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
                      value="true"
                      checked={formData.patientData.gender === true}
                      onChange={() => setFormData({
                        ...formData,
                        patientData: { ...formData.patientData, gender: true }
                      })}
                    />
                    <Form.Check
                      inline
                      label="Nữ"
                      type="radio"
                      name="patientData.gender"
                      value="false"
                      checked={formData.patientData.gender === false}
                      onChange={() => setFormData({
                        ...formData,
                        patientData: { ...formData.patientData, gender: false }
                      })}
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

        {/* Bảng 2: Thông tin đăng ký */}
        <Card className="mb-4">
          <Card.Header>Thông tin đăng ký</Card.Header>
          <Card.Body>
            <Row>
              {/* Chọn bệnh nhân */}
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Bệnh nhân</Form.Label>
                  <Form.Select
                    name="selectedPatientId"
                    value={formData.selectedPatientId || ""}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Chọn bệnh nhân</option>
                    {Array.isArray(patients) && patients.length > 0 ? (
                      patients.map(patient => (
                        <option key={patient._id} value={patient._id}>
                          {patient.name}
                        </option>
                      ))
                    ) : (
                      <option disabled>Không có bệnh nhân</option>
                    )}
                  </Form.Select>
                </Form.Group>
              </Col>


              {/* Chọn phòng khám */}
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
                    {Array.isArray(clinics) && clinics.map(clinic => (
                      <option key={clinic._id} value={clinic._id}>
                        {clinic.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              {/* Chọn bác sĩ */}
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
                    {Array.isArray(doctors) && doctors.map(doctor => (
                      <option key={doctor._id} value={doctor._id}>
                        {doctor.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              {/* Triệu chứng */}
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

              {/* Ghi chú */}
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
              {/* Độ ưu tiên */}
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Ưu tiên</Form.Label>
                  <Form.Check
                    type="switch"
                    name="priority"
                    label="Khẩn cấp"
                    checked={formData.priority}
                    onChange={handleCheckboxChange}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
        </Card>


        {/* Nút Đăng ký */}
        <div className="text-center">
          <Button variant="primary" type="submit">
            Đăng ký
          </Button>
        </div>
      </Form>
    </div>
  )
}
export default RegistrationSystem;
