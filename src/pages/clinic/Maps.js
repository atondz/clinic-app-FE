import Header from "../../components/Headers/Header";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  InputGroup,
  Input,
  Button,
  Table,
  Card,
  CardBody,
  CardHeader,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import axios from "axios"; // Thêm thư viện axios để gọi API
import { ToastContainer, toast } from "react-toastify"; // Import thư viện toast
import "react-toastify/dist/ReactToastify.css"; // Import CSS

const Maps = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [clinics, setClinics] = useState([]); // Khởi tạo state clinics rỗng

  // Fetch danh sách phòng khám từ API
  useEffect(() => {
    const fetchClinics = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/clinics"); // Gọi API
        setClinics(response.data); // Cập nhật state clinics
      } catch (error) {
        console.error("Lỗi khi fetch danh sách phòng khám:", error);
        toast.error("Không thể tải danh sách phòng khám!"); // Thông báo lỗi
      }
    };

    fetchClinics();
  }, []);

  // Xử lý tìm kiếm
  const filteredClinics = clinics.filter((clinic) =>
    clinic.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Xử lý xóa phòng khám
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/clinics/${id}`); // Gọi API xóa
      setClinics(clinics.filter((clinic) => clinic.id !== id)); // Cập nhật state
      toast.success("Xóa phòng khám thành công!"); // Thông báo thành công
    } catch (error) {
      console.error("Lỗi khi xóa phòng khám:", error);
      toast.error("Xóa phòng khám thất bại!"); // Thông báo lỗi
    }
  };

  // Xử lý sửa phòng khám
  const handleEdit = (id) => {
    // Chuyển hướng đến trang chỉnh sửa với ID của phòng khám
    window.location.href = `/editclinic/${id}`;
  };

  return (
    <>
      <Header />
      <ToastContainer /> {/* Thêm ToastContainer vào đây */}
      <Container className="mt-4" fluid>
        <Row className="mb-4">
          <Col md="6">
            <h3 className="text-dark">Danh sách phòng khám</h3>
          </Col>
          <Col md="3">
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="fas fa-search" />
                </InputGroupText>
              </InputGroupAddon>
              <Input
                type="text"
                placeholder="Tìm kiếm phòng khám..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </Col>
          <Col md="3" className="text-right">
            <Button
              tag={Link}
              to="/addclinic"
              color="primary"
              className="w-100"
            >
              + Thêm Phòng khám
            </Button>
          </Col>
        </Row>

        <Card className="shadow">
          <CardHeader className="bg-light border-0">
            <h4 className="text-dark mb-0">Danh sách phòng khám</h4>
          </CardHeader>
          <Table className="align-items-center" responsive>
            <thead className="thead-light">
              <tr>
                <th scope="col">STT</th>
                <th scope="col">Mã</th>
                <th scope="col">Tên phòng khám</th>
                <th scope="col">Hành động</th>
                <th scope="col" />
              </tr>
            </thead>
            <tbody>
              {filteredClinics.length > 0 ? (
                filteredClinics.map((clinic, index) => (
                  <tr key={clinic.id}>
                    <td>{index + 1}</td>
                    <td>{clinic.code}</td>
                    <td>{clinic.name}</td>
                    <td>
                      <Button
                        color="primary"
                        size="sm"
                        onClick={() => handleEdit(clinic.id)}
                      >
                        Sửa
                      </Button>
                      <Button
                        color="danger"
                        size="sm"
                        className="mr-2"
                        onClick={() => handleDelete(clinic.id)}
                      >
                        Xóa
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center text-muted">
                    Không tìm thấy phòng khám
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card>
      </Container>
    </>
  );
};

export default Maps;