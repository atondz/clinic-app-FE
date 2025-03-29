import axios from "axios";
import Header from "components/Headers/Header";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import {
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Card,
  CardHeader,
  Container,
  CardBody,
  Row,
} from "reactstrap";

const PrescriptionOrder = () => {
  const [drugs, setDrugs] = useState([]);
  const authToken = localStorage.getItem("authToken");
  const { registration_id, patient_id, doctor_id } = useParams();

  const [dropdownOpen, setDropdownOpen] = useState([]);
  const [prescriptionData, setPrescriptionData] = useState({
    medicines: [{ name: "", medicine_id: "", dosage: "", quantity: 0 }],
    notes: "",
  });

  const toggleDropdown = (index) => {
    setDropdownOpen((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const handleAddMedicine = () => {
    setPrescriptionData((prev) => ({
      ...prev,
      medicines: [...prev.medicines, { name: "", dosage: "" }],
    }));
    setDropdownOpen((prev) => [...prev, false]);
  };

  const handleRemoveMedicine = (index) => {
    setPrescriptionData((prev) => {
      const newMedicines = [...prev.medicines];
      newMedicines.splice(index, 1);
      return { ...prev, medicines: newMedicines };
    });
  };

  const fetchDrugs = async () => {
    try {
      const response = await axios.get(
        "https://clinic-app-be.onrender.com/api/medicine"
      );
      setDrugs(response.data.data || []);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách thuốc:", error);
    }
  };

  useEffect(() => {
    if (!drugs.length) {
      fetchDrugs();
    }
  }, []);

  const handleSelectDrug = (index, selectedDrug) => {
    setPrescriptionData((prev) => {
      const newMedicines = [...prev.medicines];
      newMedicines[index] = {
        ...newMedicines[index],
        medicine_id: selectedDrug?._id,
        name: selectedDrug?.medicine_name,
      };
      return { ...prev, medicines: newMedicines };
    });
  };

  const handleSubmitPrescription = async () => {
    try {
      await axios.post(
        "https://clinic-app-be.onrender.com/api/prescriptions",
        {
          patient_id: patient_id,
          registration_id: registration_id,
          doctor_id: doctor_id,
          medicines: prescriptionData.medicines,
          notes: prescriptionData.notes,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      //   setShowModal(false);
      alert("Tạo đơn thuốc thành công!");
    } catch (error) {
      //   console.error("Lỗi tạo đơn thuốc:", error);
      if (error.response?.status === 401) {
        // setError("Phiên đăng nhập hết hạn, vui lòng đăng nhập lại.");
        // navigate("/login");
      } else {
        // setError("Lỗi tạo đơn thuốc, vui lòng thử lại.");
      }
    }
  };
  const handleNotesChange = (e) => {
    setPrescriptionData({ ...prescriptionData, notes: e.target.value });
  };

  return (
    <>
      <Header />
      <Container className="mt-2" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">Bill</h3>
              </CardHeader>
              <CardBody>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Thuốc và liều lượng</Form.Label>
                    {prescriptionData.medicines.map((medicine, index) => (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          gap: "10px",
                          marginBottom: "10px",
                        }}
                      >
                        {/* Dropdown riêng cho từng index */}
                        <Dropdown
                          isOpen={dropdownOpen[index] || false}
                          toggle={() => toggleDropdown(index)}
                        >
                          <DropdownToggle caret>
                            {medicine?.name || "Chọn thuốc"}
                          </DropdownToggle>
                          <DropdownMenu>
                            {drugs.length > 0 &&
                              drugs.map((drug) => (
                                <DropdownItem
                                  key={drug.medicine_id}
                                  onClick={() => handleSelectDrug(index, drug)}
                                >
                                  {drug.medicine_name}
                                </DropdownItem>
                              ))}
                          </DropdownMenu>
                        </Dropdown>
                        <Form.Control
                          type="text"
                          value={medicine.dosage}
                          onChange={(e) => {
                            const value = e.target.value;
                            setPrescriptionData((prev) => {
                              const newMedicines = [...prev.medicines];
                              newMedicines[index] = {
                                ...newMedicines[index],
                                dosage: value,
                              };
                              return { ...prev, medicines: newMedicines };
                            });
                          }}
                          placeholder="Nhập liều lượng"
                          style={{ flex: 1 }}
                        />
                        <Form.Control
                          type="number"
                          value={medicine.quantity}
                          onChange={(e) => {
                            const value = e.target.value;
                            setPrescriptionData((prev) => {
                              const newMedicines = [...prev.medicines];
                              newMedicines[index] = {
                                ...newMedicines[index],
                                quantity: value,
                              };
                              return { ...prev, medicines: newMedicines };
                            });
                          }}
                          placeholder="Số lượng"
                          style={{ flex: 1 }}
                        />
                        {index > 0 && (
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleRemoveMedicine(index)}
                          >
                            Xóa
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={handleAddMedicine}
                    >
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
                  <Button variant="primary" onClick={handleSubmitPrescription}>
                    Lưu
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default PrescriptionOrder;
