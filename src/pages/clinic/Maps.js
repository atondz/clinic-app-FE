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
              <Input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </Col>
          <Col md="3" className="text-right">
           
            <Button tag={Link} to="/addclinic" color="primary" className="w-100">
                          + Thêm Phòng khám
                        </Button>
          </Col>
        </Row>

        <Card>
          <CardBody>
            <Table bordered hover responsive>
              <thead className="thead-light">
                <tr>
                  <th>STT</th>
                  <th>Mã</th>
                  <th>Tên phòng khám</th>
                  <th>Hành động</th>
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
                          color="danger"
                          size="sm"
                          className="mr-2"
                          onClick={() => handleDelete(clinic.id)}
                        >
                          Xóa
                        </Button>
                        <Button
                          color="success"
                          size="sm"
                          onClick={() => handleEdit(clinic.id)}
                        >
                          Sửa
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
          </CardBody>
        </Card>
      </Container>
    </>
  );
};

export default Maps;
