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
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
} from "reactstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Maps = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [clinics, setClinics] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingClinic, setEditingClinic] = useState({
    _id: "",
    code: "",
    name: "",
  });

  // Fetch danh sách phòng khám từ API
  useEffect(() => {
    const fetchClinics = async () => {
      try {
        const response = await axios.get(
          "https://clinic-app-be.onrender.com/api/clinics"
        );
        setClinics(response.data);
      } catch (error) {
        console.error("Lỗi khi fetch danh sách phòng khám:", error);
        toast.error("Không thể tải danh sách phòng khám!");
      }
    };
    fetchClinics();
  }, []);

  // Xử lý tìm kiếm
  const filteredClinics = clinics.filter((clinic) =>
    clinic.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Xử lý xóa phòng khám
  const handleDelete = async (_id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa phòng khám này không?")) {
      return;
    }
    try {
      await axios.delete(
        `https://clinic-app-be.onrender.com/api/clinics/${_id}`
      );
      setClinics(clinics.filter((clinic) => clinic._id !== _id));
      toast.success("Xóa phòng khám thành công!");
    } catch (error) {
      console.error("Lỗi khi xóa phòng khám:", error);
      toast.error("Xóa phòng khám thất bại!");
    }
  };

  // Mở modal chỉnh sửa
  const handleEdit = (clinic) => {
    setEditingClinic({
      _id: clinic._id,
      code: clinic.code,
      name: clinic.name,
    });
    setShowModal(true);
  };

  // Lưu thông tin sau khi chỉnh sửa
  const handleSave = async () => {
    try {
      const response = await axios.put(
        `https://clinic-app-be.onrender.com/api/clinics/${editingClinic._id}`,
        {
          code: editingClinic.code,
          name: editingClinic.name,
        }
      );

      setClinics(
        clinics.map((clinic) =>
          clinic._id === editingClinic._id ? response.data : clinic
        )
      );

      setShowModal(false);
      toast.success("Cập nhật phòng khám thành công!");
    } catch (error) {
      console.error("Lỗi khi cập nhật phòng khám:", error);
      toast.error("Cập nhật phòng khám thất bại!");
    }
  };

  return (
    <>
      <Header />
      <ToastContainer />
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
              </tr>
            </thead>
            <tbody>
              {filteredClinics.length > 0 ? (
                filteredClinics.map((clinic, index) => (
                  <tr key={clinic._id}>
                    <td>{index + 1}</td>
                    <td>{clinic.code}</td>
                    <td>{clinic.name}</td>
                    <td>
                      <Button
                        color="primary"
                        size="sm"
                        onClick={() => handleEdit(clinic)}
                      >
                        Sửa
                      </Button>
                      <Button
                        color="danger"
                        size="sm"
                        className="ml-2"
                        onClick={() => handleDelete(clinic._id)}
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

        {/* Modal chỉnh sửa */}
        <Modal isOpen={showModal} toggle={() => setShowModal(false)}>
          <ModalHeader toggle={() => setShowModal(false)}>
            Chỉnh sửa thông tin phòng khám
          </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="clinicCode">Mã phòng khám</Label>
                <Input
                  type="text"
                  id="clinicCode"
                  value={editingClinic.code}
                  onChange={(e) =>
                    setEditingClinic({ ...editingClinic, code: e.target.value })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label for="clinicName">Tên phòng khám</Label>
                <Input
                  type="text"
                  id="clinicName"
                  value={editingClinic.name}
                  onChange={(e) =>
                    setEditingClinic({ ...editingClinic, name: e.target.value })
                  }
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={() => setShowModal(false)}>
              Hủy
            </Button>
            <Button color="primary" onClick={handleSave}>
              Lưu thay đổi
            </Button>
          </ModalFooter>
        </Modal>
      </Container>
    </>
  );
};

export default Maps;
