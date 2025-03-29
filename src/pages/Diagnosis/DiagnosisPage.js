import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Row,
  Col,
  Alert,
  Badge,
  Spinner,
} from "reactstrap";
import Header from "components/Headers/Header";
import {
  FaStethoscope,
  FaUserInjured,
  FaNotesMedical,
  FaFlask,
  FaHeartbeat,
  FaCalendarAlt,
  FaArrowLeft,
} from "react-icons/fa";

const DiagnosisPage = () => {
  const { registrationId, patientId, doctorId } = useParams();
  const navigate = useNavigate();
  const [diagnosisData, setDiagnosisData] = useState({
    patient_id: patientId,
    registration_id: registrationId,
    doctor_id: doctorId,
    primary_diagnosis: "",
    symptoms: [],
    current_symptom: "",
    test_results: "",
    current_condition: "",
    treatment_advice: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [patientInfo, setPatientInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPatientLoading, setIsPatientLoading] = useState(true);

  useEffect(() => {
    const fetchPatientInfo = async () => {
      try {
        setIsPatientLoading(true);
        const response = await axios.get(
          `https://clinic-app-be.onrender.com/api/patients/${patientId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        setPatientInfo(response.data);
      } catch (err) {
        console.error("Error fetching patient info:", err);
        setError("Không thể tải thông tin bệnh nhân");
      } finally {
        setIsPatientLoading(false);
      }
    };

    fetchPatientInfo();
  }, [patientId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDiagnosisData({
      ...diagnosisData,
      [name]: value,
    });
  };

  const handleAddSymptom = () => {
    if (diagnosisData.current_symptom.trim()) {
      setDiagnosisData({
        ...diagnosisData,
        symptoms: [...diagnosisData.symptoms, diagnosisData.current_symptom],
        current_symptom: "",
      });
    }
  };

  const handleRemoveSymptom = (index) => {
    const newSymptoms = [...diagnosisData.symptoms];
    newSymptoms.splice(index, 1);
    setDiagnosisData({
      ...diagnosisData,
      symptoms: newSymptoms,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    if (!diagnosisData.primary_diagnosis) {
      setError("Vui lòng nhập chẩn đoán chính");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "https://clinic-app-be.onrender.com/api/diagnosis",
        diagnosisData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      if (response.status === 201) {
        setSuccess("Lưu chẩn đoán thành công!");
        setTimeout(() => {
          navigate(-1);
        }, 1500);
      }
    } catch (err) {
      console.error("Error submitting diagnosis:", err);
      setError(
        err.response?.data?.message || "Có lỗi xảy ra khi lưu chẩn đoán"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <>
        {/* Header Section */}
        <Row className="mb-4 align-items-center">
          <Col>
            <Button color="light" onClick={() => navigate(-1)} className="mr-3">
              <FaArrowLeft className="mr-2" />
              Quay lại
            </Button>
            <h1 className="d-inline-block mb-0 text-primary">
              <FaStethoscope className="mr-2" />
              KẾT LUẬN CHẨN ĐOÁN
            </h1>
          </Col>
        </Row>

        {/* Alerts */}
        {error && (
          <Alert color="danger" className="border-0 shadow-sm">
            <i className="fas fa-exclamation-circle mr-2"></i>
            {error}
          </Alert>
        )}

        {success && (
          <Alert color="success" className="border-0 shadow-sm">
            <i className="fas fa-check-circle mr-2"></i>
            {success}
          </Alert>
        )}

        {/* Patient Info Card */}
        <Card className="shadow mb-4 border-0">
          <CardHeader className="bg-white border-bottom">
            <h3 className="mb-0 text-primary">
              <FaUserInjured className="mr-2" />
              THÔNG TIN BỆNH NHÂN
            </h3>
          </CardHeader>
          <CardBody>
            {isPatientLoading ? (
              <div className="text-center py-4">
                <Spinner color="primary" />
              </div>
            ) : patientInfo ? (
              <Row>
                <Col md={4} className="mb-3">
                  <div className="bg-light p-3 rounded">
                    <h6 className="text-muted mb-2">Họ và tên</h6>
                    <h5 className="mb-0">{patientInfo.name}</h5>
                  </div>
                </Col>
                <Col md={4} className="mb-3">
                  <div className="bg-light p-3 rounded">
                    <h6 className="text-muted mb-2">Giới tính</h6>
                    <h5 className="mb-0">
                      {patientInfo.gender === "male" ? "Nam" : "Nữ"}
                    </h5>
                  </div>
                </Col>
                <Col md={4} className="mb-3">
                  <div className="bg-light p-3 rounded">
                    <h6 className="text-muted mb-2">Ngày sinh</h6>
                    <h5 className="mb-0">
                      {new Date(patientInfo.birth_date).toLocaleDateString()}
                    </h5>
                  </div>
                </Col>
                <Col md={4} className="mb-3">
                  <div className="bg-light p-3 rounded">
                    <h6 className="text-muted mb-2">Số CMND</h6>
                    <h5 className="mb-0">{patientInfo.id_card || "---"}</h5>
                  </div>
                </Col>
                <Col md={4} className="mb-3">
                  <div className="bg-light p-3 rounded">
                    <h6 className="text-muted mb-2">Số điện thoại</h6>
                    <h5 className="mb-0">{patientInfo.phone || "---"}</h5>
                  </div>
                </Col>
              </Row>
            ) : (
              <div className="text-center py-4 text-muted">
                Không tìm thấy thông tin bệnh nhân
              </div>
            )}
          </CardBody>
        </Card>

        {/* Diagnosis Form */}
        <Card className="shadow border-0">
          <CardHeader className="bg-white border-bottom">
            <h3 className="mb-0 text-primary">
              <FaNotesMedical className="mr-2" />
              THÔNG TIN CHẨN ĐOÁN
            </h3>
          </CardHeader>
          <CardBody>
            <Form onSubmit={handleSubmit}>
              <Row>
                {/* Primary Diagnosis */}
                <Col md={12} className="mb-4">
                  <FormGroup>
                    <Label for="primary_diagnosis" className="font-weight-bold">
                      <FaStethoscope className="mr-2 text-danger" />
                      CHẨN ĐOÁN CHÍNH
                    </Label>
                    <Input
                      type="text"
                      id="primary_diagnosis"
                      name="primary_diagnosis"
                      value={diagnosisData.primary_diagnosis}
                      onChange={handleInputChange}
                      placeholder="Nhập chẩn đoán chính..."
                      className="border-top-0 border-left-0 border-right-0 rounded-0 border-primary"
                      bsSize="lg"
                      required
                    />
                  </FormGroup>
                </Col>

                {/* Symptoms */}
                <Col md={12} className="mb-4">
                  <FormGroup>
                    <Label className="font-weight-bold">
                      <FaHeartbeat className="mr-2 text-warning" />
                      TRIỆU CHỨNG
                    </Label>
                    <div className="d-flex mb-2">
                      <Input
                        type="text"
                        id="current_symptom"
                        name="current_symptom"
                        value={diagnosisData.current_symptom}
                        onChange={handleInputChange}
                        placeholder="Nhập triệu chứng và nhấn Thêm..."
                        className="mr-2"
                      />
                      <Button
                        color="primary"
                        outline
                        onClick={handleAddSymptom}
                        type="button"
                      >
                        <i className="fas fa-plus mr-1"></i> Thêm
                      </Button>
                    </div>
                    <div className="d-flex flex-wrap">
                      {diagnosisData.symptoms.map((symptom, index) => (
                        <Badge
                          key={index}
                          color="info"
                          pill
                          className="mb-2 mr-2 d-flex align-items-center"
                          style={{ fontSize: "0.9rem", padding: "0.5em 0.8em" }}
                        >
                          {symptom}
                          <Button
                            close
                            className="ml-2 p-0"
                            style={{ fontSize: "1rem" }}
                            onClick={() => handleRemoveSymptom(index)}
                          />
                        </Badge>
                      ))}
                    </div>
                  </FormGroup>
                </Col>

                {/* Test Results */}
                <Col md={12} className="mb-4">
                  <FormGroup>
                    <Label for="test_results" className="font-weight-bold">
                      <FaFlask className="mr-2 text-success" />
                      KẾT QUẢ XÉT NGHIỆM
                    </Label>
                    <Input
                      type="textarea"
                      id="test_results"
                      name="test_results"
                      value={diagnosisData.test_results}
                      onChange={handleInputChange}
                      placeholder="Nhập kết quả xét nghiệm (nếu có)..."
                      rows={3}
                      className="border rounded"
                    />
                  </FormGroup>
                </Col>

                {/* Current Condition */}
                <Col md={12} className="mb-4">
                  <FormGroup>
                    <Label for="current_condition" className="font-weight-bold">
                      <FaHeartbeat className="mr-2 text-danger" />
                      TÌNH TRẠNG HIỆN TẠI
                    </Label>
                    <Input
                      type="textarea"
                      id="current_condition"
                      name="current_condition"
                      value={diagnosisData.current_condition}
                      onChange={handleInputChange}
                      placeholder="Mô tả tình trạng hiện tại của bệnh nhân..."
                      rows={3}
                      className="border rounded"
                    />
                  </FormGroup>
                </Col>

                {/* Treatment Advice */}
                <Col md={12} className="mb-4">
                  <FormGroup>
                    <Label for="treatment_advice" className="font-weight-bold">
                      <FaNotesMedical className="mr-2 text-primary" />
                      HƯỚNG ĐIỀU TRỊ
                    </Label>
                    <Input
                      type="textarea"
                      id="treatment_advice"
                      name="treatment_advice"
                      value={diagnosisData.treatment_advice}
                      onChange={handleInputChange}
                      placeholder="Nhập hướng điều trị và lời khuyên cho bệnh nhân..."
                      rows={4}
                      className="border rounded"
                    />
                  </FormGroup>
                </Col>

                {/* Form Actions */}
                <Col md={12} className="text-center mt-5">
                  <Button
                    color="primary"
                    type="submit"
                    disabled={isLoading}
                    className="px-5 py-2 mr-3"
                  >
                    {isLoading ? (
                      <>
                        <Spinner size="sm" className="mr-2" />
                        Đang lưu...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-save mr-2"></i>
                        LƯU CHẨN ĐOÁN
                      </>
                    )}
                  </Button>
                  <Button
                    color="secondary"
                    onClick={() => navigate(-1)}
                    className="px-5 py-2"
                  >
                    <i className="fas fa-times mr-2"></i>
                    HỦY BỎ
                  </Button>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </>

      {/* Custom CSS */}
      <style jsx>{`
        .border-primary {
          border-color: #5e72e4 !important;
        }
        .card {
          border-radius: 0.5rem;
        }
        .bg-light {
          background-color: #f8fafc !important;
        }
        .text-primary {
          color: #5e72e4 !important;
        }
      `}</style>
    </>
  );
};

export default DiagnosisPage;
