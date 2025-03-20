//maps
import Header from "../../components/Headers/Header";
import React, { useState } from "react";
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

const Maps = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [clinics, setClinics] = useState([
    { id: 1, code: "ABC000", name: "Phòng tai mũi họng" },
    { id: 2, code: "ABC001", name: "Phòng nội soi" },
    { id: 3, code: "BBC002", name: "Phòng xét nghiệm" },
  ]);

  const filteredClinics = clinics.filter((clinic) =>
    clinic.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    setClinics(clinics.filter((clinic) => clinic.id !== id));
  };

  const handleEdit = (id) => {
    alert(`Chỉnh sửa phòng khám với ID: ${id}`);
  };

  return (
    <>
      <Header />
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
            <h4 className="text-dark mb-0">Danh phòng khám</h4>
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
