import Header from "../../components/Headers/Header";
import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Form,
  Button,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios"; // Thêm thư viện axios để gọi API
import { ToastContainer, toast } from "react-toastify"; // Import thư viện toast
import "react-toastify/dist/ReactToastify.css"; // Import CSS


const AddClinic = () => {
  const navigate = useNavigate(); // Sử dụng hook useNavigate
  const [clinicCode, setClinicCode] = useState(""); // State cho mã phòng khám
  const [clinicName, setClinicName] = useState(""); // State cho tên phòng khám

  // Xử lý khi form được submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5001/api/clinics", {
        code: clinicCode,
        name: clinicName,
      });
      toast.success("Thêm phòng khám thành công!",{autoClose: 1000});
      navigate("/maps"); // Chuyển hướng về trang danh sách
    } catch (error) {
      console.error("Lỗi khi thêm phòng khám:", error);
      toast.success("Thêm phòng khám thất bại!",{autoClose: 1000});
    }
  };

  return (
    <>
      <Header />
      <Container fluid className="mt-4">
        <Row>
          <Col>
            <h3 className="text-dark">Thêm phòng khám</h3>
            <p className="text-muted">Quản lí phòng khám / Thêm phòng khám</p>
          </Col>
        </Row>

        <Card className="mt-4 shadow">
          <CardHeader className="bg-light border-0">
            <h4 className="text-dark mb-0">Thông tin cơ bản</h4>
          </CardHeader>
          <CardBody>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <Label for="clinicCode">
                      Mã phòng khám <span className="text-danger">*</span>
                    </Label>
                    <InputGroup>
                      <Input
                        type="text"
                        id="clinicCode"
                        placeholder="Nhập mã phòng khám"
                        value={clinicCode}
                        onChange={(e) => setClinicCode(e.target.value)}
                        required
                      />
                      <InputGroupAddon addonType="append">
                        <InputGroupText>
                          <i className="fas fa-barcode" />
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                  </FormGroup>

                  <FormGroup>
                    <Label for="clinicName">
                      Tên phòng khám <span className="text-danger">*</span>
                    </Label>
                    <InputGroup>
                      <Input
                        type="text"
                        id="clinicName"
                        placeholder="Nhập tên phòng khám"
                        value={clinicName}
                        onChange={(e) => setClinicName(e.target.value)}
                        required
                      />
                      <InputGroupAddon addonType="append">
                        <InputGroupText>
                          <i className="fas fa-clinic-medical" />
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                  </FormGroup>

                  <Button color="success" className="mr-2" type="submit">
                    Lưu lại
                  </Button>
                  <Button color="danger" onClick={() => navigate("/maps")}>
                    Quay lại
                  </Button>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
        <ToastContainer /> 
      </Container>
    </>
  );
};

export default AddClinic;