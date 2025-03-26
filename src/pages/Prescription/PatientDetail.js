import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, CardBody } from "reactstrap";

const PatientDetail = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const [patient, setPatient] = useState(null);

  // Giả sử bạn sẽ gọi API để lấy thông tin chi tiết của bệnh nhân
  useEffect(() => {
    // Giả sử bạn có API để lấy thông tin bệnh nhân
    // Thay '/api/patient/:id' bằng API thực tế của bạn
    fetch(`http://localhost:5001/api/patient/${id}`)
      .then((response) => response.json())
      .then((data) => setPatient(data))
      .catch((error) => console.error("Lỗi khi lấy dữ liệu bệnh nhân:", error));
  }, [id]);

  if (!patient) {
    return <div>Đang tải thông tin bệnh nhân...</div>;
  }

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <Card className="shadow">
            <CardBody>
              <h3>Chi Tiết Bệnh Nhân</h3>
              <p><strong>Tên Bệnh Nhân:</strong> {patient.name}</p>
              <p><strong>Mã Bệnh Nhân:</strong> {patient.code}</p>
              <p><strong>Tiêu Đề:</strong> {patient.title}</p>
              <p><strong>Phòng Khám:</strong> {patient.clinic}</p>
              <p><strong>Bác Sĩ:</strong> {patient.doctor}</p>
              <p><strong>Ngày Khám:</strong> {patient.date}</p>
              <p><strong>Trạng Thái:</strong> {patient.status}</p>
              <p><strong>Thanh Toán:</strong> {patient.paymentStatus}</p>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PatientDetail;
