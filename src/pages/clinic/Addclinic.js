import Header from "../../components/Headers/Header";
import React from "react";
import {
  Container,Row,Col,
  Card,
  CardBody,
  Form, Button,
  FormGroup,Label,Input,
 } from "reactstrap";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const AddClinic = () => {
  const navigate = useNavigate(); // Sử dụng hook useNavigate

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

        <Card className="mt-4">
          <CardBody>
            <Row>
              <Col md="6">
                <h4 className="text-dark">Thông tin cơ bản</h4>
                <p className="text-muted">Điền tất cả thông tin bên dưới</p>
                <Form>
                  <FormGroup>
                    <Label for="clinicName">
                      Tên phòng khám <span className="text-danger">*</span>
                    </Label>
                    <Input
                      type="text"
                      id="clinicName"
                      placeholder="Tên phòng khám"
                    />
                  </FormGroup>

                  <Button color="success" className="mr-2">
                    Lưu lại
                  </Button>
                  <Button color="danger" onClick={() => navigate("/maps")}>
                    Quay lại
                  </Button>
                </Form>
              </Col>

              <Col md="6"></Col>
            </Row>
          </CardBody>
        </Card>
      </Container>
    </>
  );
};

export default AddClinic;
