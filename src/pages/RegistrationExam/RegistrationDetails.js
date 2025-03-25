import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Card,
  Badge,
  Row,
  Col,
  Table,
  Spinner,
} from "react-bootstrap";
import axios from "axios";
import Header from "components/Headers/Header";

const MedicalRecordModal = ({ registration, show, onHide }) => {
  if (!registration) return null;

  const handlePrint = () => {
    const printContent = document.getElementById("printable-area").innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton className="bg-light">
        <Modal.Title className="text-primary">
          <i className="fas fa-file-medical me-2"></i>
          PHIẾU ĐĂNG KÝ KHÁM BỆNH
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-4">
        {/* Phần chỉ hiển thị khi xem, không in ra */}
        <div className="d-none d-print-block">
          <div id="printable-area">
            <div className="text-center mb-4">
              <h2 className="mb-1">PHÒNG KHÁM ĐA KHOA XYZ</h2>
              <h4 className="text-danger">PHIẾU ĐĂNG KÝ KHÁM BỆNH</h4>
              <div className="border-top border-bottom py-2 my-2">
                <h1 className="display-4 fw-bold text-primary">
                  Số: {registration.order_number}
                </h1>
              </div>
            </div>

            <div className="mb-4">
              <h5 className="border-bottom pb-2">THÔNG TIN BỆNH NHÂN</h5>
              <p>
                <strong>Họ tên:</strong> {registration.patient_id?.name}
              </p>
            </div>

            <div className="mb-4">
              <h5 className="border-bottom pb-2">THÔNG TIN KHÁM BỆNH</h5>
              <Row>
                <Col md={6}>
                  <p>
                    <strong>Phòng khám:</strong> {registration.clinic_id?.name}
                  </p>
                </Col>
                <Col md={6}>
                  <p>
                    <strong>Bác sĩ:</strong> {registration.doctor_id?.name}
                  </p>
                </Col>
              </Row>
            </div>

            <div className="text-center mt-5">
              <p>
                Ngày{" "}
                {new Date(registration.registration_date).toLocaleDateString()}
              </p>
              <div className="d-flex justify-content-around mt-4">
                <div>
                  <p className="border-top text-center pt-2">BỆNH NHÂN</p>
                </div>
                <div>
                  <p className="border-top text-center pt-2">
                    NHÂN VIÊN TIẾP ĐÓN
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Phần hiển thị bình thường */}
        <div className="d-print-none">
          <Card className="shadow-sm mb-4">
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0">
                <i className="fas fa-info-circle me-2"></i>
                Thông tin chung
              </h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={4}>
                  <p className="mb-2">
                    <strong>Mã KCB:</strong> {registration.medical_code}
                  </p>
                  <p className="mb-2">
                    <strong>Số thứ tự:</strong> {registration.order_number}
                  </p>
                </Col>
                <Col md={4}>
                  <p className="mb-2">
                    <strong>Ngày đăng ký:</strong>{" "}
                    {registration.registration_date
                      ? new Date(
                          registration.registration_date
                        ).toLocaleString()
                      : ""}
                  </p>
                  <p className="mb-2">
                    <strong>Ưu tiên:</strong>
                    <Badge
                      bg={registration.priority ? "danger" : "secondary"}
                      className="ms-2"
                    >
                      {registration.priority ? "CÓ" : "KHÔNG"}
                    </Badge>
                  </p>
                </Col>
                <Col md={4}>
                  <p className="mb-2">
                    <strong>Phòng khám:</strong> {registration.clinic_id?.name}
                  </p>
                  <p className="mb-2">
                    <strong>Bác sĩ:</strong> {registration.doctor_id?.name}
                  </p>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          <Card className="shadow-sm mb-4">
            <Card.Header className="text-white">
              <h5 className="mb-0">
                <i className="fas fa-user me-2"></i>
                Thông tin bệnh nhân
              </h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <p className="mb-2">
                    <strong>Họ tên:</strong> {registration.patient_id?.name}
                  </p>
                  <p className="mb-2">
                    <strong>Giới tính:</strong>{" "}
                    {registration.patient_id?.gender ? "Nam" : "Nữ"}
                  </p>
                  <p className="mb-2">
                    <strong>Ngày sinh:</strong>{" "}
                    {registration.patient_id?.birth_date
                      ? new Date(
                          registration.patient_id.birth_date
                        ).toLocaleDateString()
                      : ""}
                  </p>
                </Col>
                <Col md={6}>
                  <p className="mb-2">
                    <strong>CMND:</strong> {registration.patient_id?.id_card}
                  </p>
                  <p className="mb-2">
                    <strong>Điện thoại:</strong>{" "}
                    {registration.patient_id?.phone}
                  </p>
                  <p className="mb-2">
                    <strong>Địa chỉ:</strong> {registration.patient_id?.address}
                  </p>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          <Card className="shadow-sm">
            <Card.Header className=" text-dark">
              <h5 className="mb-0">
                <i className="fas fa-notes-medical me-2"></i>
                Thông tin khám bệnh
              </h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <p className="mb-2">
                    <strong>Triệu chứng:</strong>
                  </p>
                  <div className="p-3 bg-light rounded">
                    {registration.symptoms}
                  </div>
                </Col>
                <Col md={6}>
                  <p className="mb-2">
                    <strong>Ghi chú:</strong>
                  </p>
                  <div className="p-3 bg-light rounded">
                    {registration.note}
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </div>
      </Modal.Body>
      <Modal.Footer className="bg-light d-print-none">
        <Button variant="secondary" onClick={onHide}>
          <i className="fas fa-times me-2"></i>Đóng
        </Button>
        <Button variant="primary" onClick={handlePrint}>
          <i className="fas fa-print me-2"></i>In phiếu
        </Button>
      </Modal.Footer>

      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-area,
          #printable-area * {
            visibility: visible;
          }
          #printable-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 20px;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>
    </Modal>
  );
};

const RegistrationSystem = () => {
  const [registrations, setRegistrations] = useState([]);
  const [selectedRegistration, setSelectedRegistration] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5001/api/registerExam"
        );
        setRegistrations(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching registration data:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Xử lý khi nhấn vào một hàng trong bảng
  const handleRowClick = (registration) => {
    setSelectedRegistration(registration);
    setShowModal(true);
  };

  if (loading) {
    return (
      <div className="container mt-4 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p>Đang tải dữ liệu...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4 alert alert-danger">
        Lỗi khi tải dữ liệu: {error}
      </div>
    );
  }

  return (
    <>
      <Header />
      <h3 className="mb-4 text-primary">
        <i className="fas fa-list-alt me-2"></i>
        DANH SÁCH ĐĂNG KÝ KHÁM BỆNH
      </h3>

      {registrations.length === 0 ? (
        <div className="alert alert-info">Không có dữ liệu đăng ký</div>
      ) : (
        <>
          <Table
            striped
            bordered
            hover
            className="table-bordered border-primar"
            style={{
              width: "30%",
             
              fontSize: "14px",

              // điều chỉnh cỡ chữ
            }}
          >
            <thead className="bg-primary text-white">
              <tr>
                <th>STT</th>
                <th>Mã KCB</th>
                <th>Tên bệnh nhân</th>
                <th>Phòng khám</th>
                <th>Bác sĩ</th>
                <th>Ưu tiên</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((reg, index) => (
                <tr
                  key={reg._id}
                  onClick={() => handleRowClick(reg)}
                  style={{ cursor: "pointer" }}
                  className="hover-highlight"
                >
                  <td>{index + 1}</td>
                  <td>{reg.medical_code}</td>
                  <td>{reg.patient_id?.name}</td>
                  <td>{reg.clinic_id?.name}</td>
                  <td>{reg.doctor_id?.name}</td>
                  <td>
                    <Badge bg={reg.priority ? "primary" : "secondary"}> 
                      {reg.priority ? "ƯU TIÊN" : "THƯỜNG"}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <MedicalRecordModal
            registration={selectedRegistration}
            show={showModal}
            onHide={() => setShowModal(false)}
          />
        </>
      )}

      <style jsx>{`
        .hover-highlight:hover {
          background-color: #f8f9fa;
          transform: translateY(-1px);
          transition: all 0.2s ease;
        }
      `}</style>
    </>
  );
};

export default RegistrationSystem;
