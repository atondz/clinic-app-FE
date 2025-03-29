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
  Alert,
} from "react-bootstrap";
import axios from "axios";
import Header from "components/Headers/Header";
import {
  CardHeader,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

const MedicalRecordModal = ({ registration, show, onHide }) => {
  if (!registration) return null;

  const handlePrint = () => {
    const printContent = document.getElementById("printable-area").innerHTML;

    // Tạo một cửa sổ mới
    const printWindow = window.open("", "_blank");

    // Viết nội dung cần in vào cửa sổ mới
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>In bệnh án</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
            @media print {
              body { visibility: hidden; }
              .print-content { visibility: visible; position: absolute; top: 0; left: 0; }
              @page { size: A4; margin: 10mm; }
            }
          </style>
        </head>
        <body>
          <div class="print-content">${printContent}</div>
          <script>
            // Tự động in khi trang tải xong
            window.onload = function() {
              setTimeout(function() {
                window.print();
                // Đóng cửa sổ in sau 1 giây
                setTimeout(function() { window.close(); }, 1000);
              }, 200);
            };
          </script>
        </body>
      </html>
    `);

    // Đóng tài liệu để hoàn tất quá trình tải
    printWindow.document.close();
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
  const [successMessage, setSuccessMessage] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [registrationToDelete, setRegistrationToDelete] = useState(null);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://clinic-app-be.onrender.com/api/registerExam"
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

  // Xử lý hiển thị modal chi tiết
  const handleShowDetails = (registration) => {
    setSelectedRegistration(registration);
    setShowModal(true);
  };

  // Xử lý xác nhận xóa
  const handleConfirmDelete = (registration) => {
    setRegistrationToDelete(registration);
    setShowDeleteConfirm(true);
  };

  // Xử lý xóa
  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://clinic-app-be.onrender.com/api/registerExam/${registrationToDelete._id}`
      );
      setRegistrations(
        registrations.filter((reg) => reg._id !== registrationToDelete._id)
      );
      setSuccessMessage("Xóa phiếu đăng ký thành công!");
      setShowDeleteConfirm(false);
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error("Error deleting registration:", err);
      setError("Lỗi khi xóa phiếu đăng ký: " + err.message);
    }
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
      <>
        <Row className="mb-4">
          <div className="col">
            <h1 className="display-4 text-dark mb-0">
              <i className="fas fa-list-alt me-2" />
              DANH SÁCH ĐĂNG KÝ KHÁM BỆNH
            </h1>
          </div>
        </Row>

        {successMessage && (
          <Alert
            variant="success"
            onClose={() => setSuccessMessage(null)}
            dismissible
          >
            {successMessage}
          </Alert>
        )}

        {registrations.length === 0 ? (
          <div className="alert alert-info">Không có dữ liệu đăng ký</div>
        ) : (
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="bg-light border-0">
                  <Row className="align-items-center">
                    <Col>
                      <h3 className="mb-0">Danh sách đăng ký</h3>
                    </Col>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">STT</th>
                      <th scope="col">Mã KCB</th>
                      <th scope="col">Tên bệnh nhân</th>
                      <th scope="col">Phòng khám</th>
                      <th scope="col">Bác sĩ</th>
                      <th scope="col">Ưu tiên</th>
                      <th scope="col" className="text-right">
                        Hành động
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {registrations.map((reg, index) => (
                      <tr key={reg._id}>
                        <td>{index + 1}</td>
                        <td>{reg.medical_code}</td>
                        <td>{reg.patient_id?.name}</td>
                        <td>{reg.clinic_id?.name}</td>
                        <td>{reg.doctor_id?.name}</td>
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
                            className="mr-2"
                            onClick={() => handleShowDetails(reg)}
                          >
                            <i className="fas fa-eye mr-1"></i> Chi tiết
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleConfirmDelete(reg)}
                          >
                            <i className="fas fa-trash mr-1"></i> Xóa
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card>
            </div>
          </Row>
        )}

        {/* Modal chi tiết */}
        <MedicalRecordModal
          registration={selectedRegistration}
          show={showModal}
          onHide={() => setShowModal(false)}
        />

        {/* Modal xác nhận xóa */}
        <Modal
          show={showDeleteConfirm}
          onHide={() => setShowDeleteConfirm(false)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Xác nhận xóa</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Bạn có chắc chắn muốn xóa phiếu đăng ký của bệnh nhân{" "}
            <strong>{registrationToDelete?.patient_id?.name}</strong> (Mã KCB:{" "}
            {registrationToDelete?.medical_code}) không?
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowDeleteConfirm(false)}
            >
              Hủy bỏ
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Xác nhận xóa
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </>
  );
};

export default RegistrationSystem;
