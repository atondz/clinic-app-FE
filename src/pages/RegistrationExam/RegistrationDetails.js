import React, { useState } from 'react';
import { Modal, Button, Table } from 'react-bootstrap';

const RegistrationDetailModal = ({ registration, show, onHide }) => {
  if (!registration) return null;

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Chi tiết giấy đăng ký</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover>
          <tbody>
            <tr>
              <th>Mã KCB</th>
              <td>{registration.medical_code}</td>
            </tr>
            <tr>
              <th>Số thứ tự</th>
              <td>{registration.order_number}</td>
            </tr>
            <tr>
              <th>Bệnh nhân</th>
              <td>{registration.patient_id.name}</td>
            </tr>
            <tr>
              <th>CMND</th>
              <td>{registration.patient_id.id_card}</td>
            </tr>
            <tr>
              <th>Giới tính</th>
              <td>{registration.patient_id.gender ? 'Nam' : 'Nữ'}</td>
            </tr>
            <tr>
              <th>Ngày sinh</th>
              <td>{new Date(registration.patient_id.birth_date).toLocaleDateString()}</td>
            </tr>
            <tr>
              <th>Điện thoại</th>
              <td>{registration.patient_id.phone}</td>
            </tr>
            <tr>
              <th>Địa chỉ</th>
              <td>{registration.patient_id.address}</td>
            </tr>
            <tr>
              <th>Phòng khám</th>
              <td>{registration.clinic_id.name}</td>
            </tr>
            <tr>
              <th>Bác sĩ</th>
              <td>{registration.doctor_id.name}</td>
            </tr>
            <tr>
              <th>Ưu tiên</th>
              <td>{registration.priority ? 'Có' : 'Không'}</td>
            </tr>
            <tr>
              <th>Triệu chứng</th>
              <td>{registration.symptoms}</td>
            </tr>
            <tr>
              <th>Ghi chú</th>
              <td>{registration.note}</td>
            </tr>
            <tr>
              <th>Ngày đăng ký</th>
              <td>{new Date(registration.registration_date).toLocaleString()}</td>
            </tr>
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const RegistrationSystem = () => {
  const [selectedRegistration, setSelectedRegistration] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Dữ liệu mẫu
  const registrations = [
    {
      "_id": "67dffb7fc4cf735f7d5fa97b",
      "medical_code": "00000001",
      "order_number": 1,
      "patient_id": {
        "_id": "67dffb7fc4cf735f7d5fa977",
        "id_card": "010101010100",
        "patient_id": "PAT0005",
        "name": "Nguyễn Văn A",
        "gender": true,
        "birth_date": "2000-01-01T00:00:00.000Z",
        "phone": "0101010191",
        "address": "Huế",
        "createdAt": "2025-03-23T12:15:59.272Z",
        "updatedAt": "2025-03-23T12:15:59.272Z",
        "__v": 0
      },
      "clinic_id": {
        "_id": "67dfd79d880b73090cde5f7f",
        "code": "Cl002",
        "name": "Phòng Khám tổng Hợp",
        "createdAt": "2025-03-23T09:42:53.902Z",
        "updatedAt": "2025-03-23T09:42:53.902Z",
        "__v": 0
      },
      "doctor_id": {
        "_id": "67dffb22c4cf735f7d5fa970",
        "name": "Toan",
        "email": "doctor@gmail.com",
        "password": "$2a$10$/G7aybWXcYGdh4C3pP6.FOz157/P/XH5aaxbWZ7qBnHq1kQGalxae",
        "role": "doctor",
        "created_at": "2025-03-23T12:14:26.874Z",
        "updated_at": "2025-03-23T12:14:26.874Z",
        "__v": 0
      },
      "priority": true,
      "symptoms": "Đau đầu, mệt mỏi",
      "note": "Khẩn cấp",
      "registration_date": "2025-03-23T12:15:59.403Z",
      "createdAt": "2025-03-23T12:15:59.404Z",
      "updatedAt": "2025-03-23T12:15:59.404Z",
      "__v": 0
    }
  ];

  // Xử lý khi nhấn vào một hàng trong bảng
  const handleRowClick = (registration) => {
    setSelectedRegistration(registration);
    setShowModal(true);
  };

  return (
    <div className="container mt-4">
      <h3>Danh sách đăng ký</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>STT</th>
            <th>Mã KCB</th>
            <th>Tên bệnh nhân</th>
            <th>Phòng khám</th>
            <th>Bác sĩ</th>
          </tr>
        </thead>
        <tbody>
          {registrations.map((reg, index) => (
            <tr key={reg._id} onClick={() => handleRowClick(reg)} style={{ cursor: 'pointer' }}>
              <td>{index + 1}</td>
              <td>{reg.medical_code}</td>
              <td>{reg.patient_id.name}</td>
              <td>{reg.clinic_id.name}</td>
              <td>{reg.doctor_id.name}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal hiển thị chi tiết */}
      <RegistrationDetailModal
        registration={selectedRegistration}
        show={showModal}
        onHide={() => setShowModal(false)}
      />
    </div>
  );
};

export default RegistrationSystem;