import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Header from './../components/Headers/Header';
import { useNavigate } from 'react-router-dom'; // Thêm để chuyển hướng

const DoctorDashboard = () => {
  const [user, setUser] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedRegistration, setSelectedRegistration] = useState(null);
  const [prescriptionData, setPrescriptionData] = useState({
    medicines: [{ name: "", dosage: "" }],
    notes: ""
  });
  const [error, setError] = useState(""); // Thêm state để hiển thị lỗi
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
    if (!user || user.role !== 'doctor') return; // Không fetch nếu không phải doctor
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
  }, [user, authToken, navigate]);

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
      alert('Tạo đơn thuốc thành công!');
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
    <div className="container mt-4">
      <Header />
      <h2>Danh sách phiếu khám của bác sĩ</h2>
      {error && (
        <div className="alert alert-danger" onClick={() => setError("")}>
          {error}
        </div>
      )}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>STT</th>
            <th>Mã khám</th>
            <th>Tên bệnh nhân</th>
            <th>Triệu chứng</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {registrations.map((reg, index) => (
            <tr key={reg._id}>
              <td>{index + 1}</td>
              <td>{reg.medical_code}</td>
              <td>{reg.patient_id.name}</td>
              <td>{reg.symptoms}</td>
              <td>
                <Button variant="primary" onClick={() => handleCreatePrescription(reg)}>
                  Tạo đơn thuốc
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Tạo đơn thuốc</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Thuốc và liều lượng</Form.Label>
              {prescriptionData.medicines.map((medicine, index) => (
                <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                  <Form.Control
                    type="text"
                    value={medicine.name}
                    placeholder="Nhập tên thuốc"
                    onChange={(e) => handleMedicineNameChange(e, index)}
                    style={{ flex: 1 }}
                  />
                  <Form.Control
                    type="text"
                    value={medicine.dosage}
                    placeholder="Nhập liều lượng"
                    onChange={(e) => handleMedicineDosageChange(e, index)}
                    style={{ flex: 1 }}
                  />
                  {index > 0 && (
                    <Button variant="danger" size="sm" onClick={() => handleRemoveMedicine(index)}>
                      Xóa
                    </Button>
                  )}
                </div>
              ))}
              <Button variant="primary" size="sm" onClick={handleAddMedicine}>
                Thêm thuốc
              </Button>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Ghi chú</Form.Label>
              <Form.Control
                as="textarea"
                value={prescriptionData.notes}
                placeholder="Nhập ghi chú"
                onChange={handleNotesChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleSubmitPrescription}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DoctorDashboard;