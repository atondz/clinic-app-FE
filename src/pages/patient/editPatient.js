import React, { useState, useEffect } from "react";
import Header from "../../components/Headers/Header";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditPatient = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    gender: "Nam",
    dob: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🟢 Load dữ liệu bệnh nhân khi vào trang
  useEffect(() => {
    axios
      .get(`http://localhost:5001/api/patients/${id}`)
      .then((response) => {
        setFormData(response.data);
      })
      .catch(() => {
        setError("Không thể tải dữ liệu bệnh nhân.");
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.put(`http://localhost:5001/api/patients/${id}`, formData);
      navigate("/patients");
    } catch (err) {
      setError("Có lỗi xảy ra khi cập nhật bệnh nhân.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <Container fluid className="mt-4">
        <Row>
          <Col>
            <h3 className="text-dark">Chỉnh sửa bệnh nhân</h3>
            <p className="text-muted">Quản lý bệnh nhân / Chỉnh sửa</p>
          </Col>
        </Row>

        <Card className="mt-4">
          <CardBody>
            <Row>
              <Col md="6">
                <h4 className="text-dark">Thông tin bệnh nhân</h4>
                <p className="text-muted">Cập nhật thông tin bệnh nhân</p>
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label>ID</Label>
                    <Input type="text" name="id" value={formData.id} disabled />
                  </FormGroup>
                  <FormGroup>
                    <Label>Họ và tên</Label>
                    <Input type="text" name="name" value={formData.name} onChange={handleChange} />
                  </FormGroup>
                  <FormGroup>
                    <Label>Số điện thoại</Label>
                    <Input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
                  </FormGroup>
                  <FormGroup>
                    <Label>Giới tính</Label>
                    <div>
                      <Label className="mr-4">
                        <Input type="radio" name="gender" value="Nam" checked={formData.gender === "Nam"} onChange={handleChange} /> Nam
                      </Label>
                      <Label>
                        <Input type="radio" name="gender" value="Nữ" checked={formData.gender === "Nữ"} onChange={handleChange} /> Nữ
                      </Label>
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <Label>Ngày sinh</Label>
                    <Input type="date" name="dob" value={formData.dob} onChange={handleChange} />
                  </FormGroup>
                  <FormGroup>
                    <Label>Địa chỉ</Label>
                    <Input type="text" name="address" value={formData.address} onChange={handleChange} />
                  </FormGroup>

                  {error && <p className="text-danger">{error}</p>}

                  <Button color="success" type="submit" disabled={loading}>
                    {loading ? "Đang lưu..." : "Lưu thay đổi"}
                  </Button>
                  <Button color="btn btn-light" onClick={() => navigate("/patients")}>
                    Quay lại
                  </Button>
                </Form>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Container>
    </>
  );
};

export default EditPatient;
