import Header from "components/Headers/Header";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Container,
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Spinner,
  Badge,
  Button,
} from "reactstrap";
import {
  FaUserInjured,
  FaNotesMedical,
  FaFlask,
  FaHeartbeat,
  FaCalendarAlt,
  FaFileMedicalAlt,
} from "react-icons/fa";

const MedicalHistory = () => {
  const location = useLocation();
  const patientId = location.state?.patientId;
  const [medicalHistory, setMedicalHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [patientName, setPatientName] = useState("");
  const [expandedCard, setExpandedCard] = useState(null);

  useEffect(() => {
    if (!patientId) {
      setLoading(false);
      return;
    }

    // Fetch patient data
    fetch(`https://clinic-app-be.onrender.com/api/patients/${patientId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Không thể lấy dữ liệu bệnh nhân");
        return res.json();
      })
      .then((data) => {
        setPatientName(data.name || "Không xác định");
        const historyIds = data.medical_history || [];

        if (historyIds.length === 0) {
          setMedicalHistory([]);
          setLoading(false);
          return;
        }

        // Fetch diagnosis details
        Promise.all(
          historyIds.map((historyId) =>
            fetch(
              `https://clinic-app-be.onrender.com/api/diagnosis/${historyId}`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
              }
            )
              .then((res) => (res.ok ? res.json() : null))
              .catch(() => null)
          )
        ).then((historyData) => {
          setMedicalHistory(historyData.filter((item) => item !== null));
          setLoading(false);
        });
      })
      .catch((err) => {
        console.error("Lỗi khi fetch bệnh nhân:", err);
        setMedicalHistory([]);
        setLoading(false);
      });
  }, [patientId]);

  const toggleExpand = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Không xác định";
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      <Header />
      <>
        <Row className="mb-4">
          <Col>
            <h1 className="display-4 text-dark">
              <FaFileMedicalAlt className="mr-2 text-primary" />
              LỊCH SỬ KHÁM BỆNH{" "}
              {patientName && `- ${patientName.toUpperCase()}`}
            </h1>
          </Col>
        </Row>

        <Card className="shadow">
          <CardHeader className="bg-light border-0">
            <Row className="align-items-center">
              <Col>
                <h3 className="mb-0">
                  <FaUserInjured className="mr-2 text-primary" />
                  Chi tiết lịch sử khám bệnh
                </h3>
              </Col>
              <Col className="text-right">
                <Badge color="primary" pill>
                  {medicalHistory.length} lượt khám
                </Badge>
              </Col>
            </Row>
          </CardHeader>

          <CardBody>
            {loading ? (
              <div className="text-center py-5">
                <Spinner color="primary" />
                <p className="mt-3">Đang tải dữ liệu lịch sử khám bệnh...</p>
              </div>
            ) : medicalHistory.length > 0 ? (
              medicalHistory.map((history, index) => (
                <Card key={index} className="mb-4 border-0 shadow-sm">
                  <CardHeader
                    className="bg-light cursor-pointer"
                    onClick={() => toggleExpand(index)}
                  >
                    <Row className="align-items-center">
                      <Col>
                        <h5 className="mb-0">
                          <Badge color="info" className="mr-2">
                            #{index + 1}
                          </Badge>
                          Phiếu khám ngày {formatDate(history.date_created)}
                        </h5>
                      </Col>
                      <Col className="text-right">
                        <Button
                          size="sm"
                          color="link"
                          className="p-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleExpand(index);
                          }}
                        >
                          {expandedCard === index ? "Thu gọn" : "Xem chi tiết"}
                        </Button>
                      </Col>
                    </Row>
                  </CardHeader>

                  {expandedCard === index && (
                    <CardBody>
                      <Row>
                        <Col md={6}>
                          <div className="mb-4">
                            <h6 className="text-uppercase text-muted mb-3">
                              <FaNotesMedical className="mr-2 text-primary" />
                              Thông tin chẩn đoán
                            </h6>
                            <div className="pl-4">
                              <p>
                                <strong>Chẩn đoán chính:</strong>{" "}
                                <Badge color="danger">
                                  {history.primary_diagnosis ||
                                    "Chưa có thông tin"}
                                </Badge>
                              </p>
                              <p>
                                <strong>Triệu chứng:</strong>{" "}
                                {Array.isArray(history.symptoms) ? (
                                  <div className="mt-2">
                                    {history.symptoms.map((symptom, i) => (
                                      <Badge
                                        key={i}
                                        color="warning"
                                        className="mr-2 mb-2"
                                      >
                                        {symptom}
                                      </Badge>
                                    ))}
                                  </div>
                                ) : (
                                  "Không có"
                                )}
                              </p>
                            </div>
                          </div>

                          <div className="mb-4">
                            <h6 className="text-uppercase text-muted mb-3">
                              <FaHeartbeat className="mr-2 text-primary" />
                              Hướng điều trị
                            </h6>
                            <div className="pl-4">
                              <p>
                                {history.treatment_advice ||
                                  "Không có hướng dẫn điều trị cụ thể"}
                              </p>
                            </div>
                          </div>
                        </Col>

                        <Col md={6}>
                          <div className="mb-4">
                            <h6 className="text-uppercase text-muted mb-3">
                              <FaFlask className="mr-2 text-primary" />
                              Kết quả xét nghiệm
                            </h6>
                            <div className="pl-4">
                              <p>
                                {history.test_results ||
                                  "Không có kết quả xét nghiệm"}
                              </p>
                            </div>
                          </div>

                          <div>
                            <h6 className="text-uppercase text-muted mb-3">
                              <FaCalendarAlt className="mr-2 text-primary" />
                              Thông tin khác
                            </h6>
                            <div className="pl-4">
                              <p>
                                <strong>Tình trạng hiện tại:</strong>{" "}
                                <Badge
                                  color={
                                    history.current_condition
                                      ? "success"
                                      : "secondary"
                                  }
                                >
                                  {history.current_condition ||
                                    "Không xác định"}
                                </Badge>
                              </p>
                              <p>
                                <strong>Bác sĩ phụ trách:</strong>{" "}
                                {history.doctor_name || "Không xác định"}
                              </p>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  )}
                </Card>
              ))
            ) : (
              <div className="text-center py-5">
                <img
                  src="/img/theme/empty.svg"
                  alt="No data"
                  style={{ maxWidth: "200px", opacity: 0.7 }}
                  className="mb-4"
                />
                <h4 className="text-muted">Không có lịch sử khám bệnh</h4>
                <p className="text-muted">
                  Bệnh nhân chưa có thông tin khám bệnh nào được ghi nhận
                </p>
              </div>
            )}
          </CardBody>
        </Card>
      </>

      {/* Custom CSS */}
      <style jsx>{`
        .cursor-pointer {
          cursor: pointer;
        }
        .shadow-sm {
          box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
        }
        .bg-light {
          background-color: #f8f9fa !important;
        }
        .text-uppercase {
          letter-spacing: 0.5px;
          font-size: 0.8rem;
        }
        .pl-4 {
          padding-left: 1.5rem !important;
        }
        .border-0 {
          border: 0 !important;
        }
      `}</style>
    </>
  );
};

export default MedicalHistory;
