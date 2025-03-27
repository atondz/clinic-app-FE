import React, { useEffect, useState } from "react";
import Header from "../../components/Headers/Header";
import { Card, CardBody, CardTitle, Row, Col } from "reactstrap";
const Home = () => {
  
  const [stats, setStats] = useState({
    medicalRecords: 0,
    prescriptions: 0,
    patients: 0,
  });

  useEffect(() => {
    // Thay thế URL API bằng API 
    fetch("https://api.example.com/clinic-stats")
      .then((response) => response.json())
      .then((data) => {
        setStats({
          medicalRecords: data.medicalRecords || 0,
          prescriptions: data.prescriptions || 0,
          patients: data.patients || 0,
        });
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <>
    <Header/>
 <Row>
            <Col lg="6" xl="3">
              <Card className="card-stats mb-4 mb-xl-0">
                <CardBody>
                  <Row>
                    <div className="col">
                      <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                        Giấy khám bệnh
                      </CardTitle>
                      <span className="h2 font-weight-bold mb-0">{stats.medicalRecords}</span>
                    </div>
                    <Col className="col-auto">
                      <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                        <i className="fas fa-chart-bar" />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col lg="6" xl="3">
              <Card className="card-stats mb-4 mb-xl-0">
                <CardBody>
                  <Row>
                    <div className="col">
                      <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                        Đơn Thuốc
                      </CardTitle>
                      <span className="h2 font-weight-bold mb-0">{stats.prescriptions}</span>
                    </div>
                    <Col className="col-auto">
                      <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                        <i className="fas fa-chart-pie" />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col lg="6" xl="3">
              <Card className="card-stats mb-4 mb-xl-0">
                <CardBody>
                  <Row>
                    <div className="col">
                      <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                        Bệnh nhân
                      </CardTitle>
                      <span className="h2 font-weight-bold mb-0">{stats.patients}</span>
                    </div>
                    <Col className="col-auto">
                      <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                        <i className="fas fa-users" />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
      
    </>
  );
};

export default Home;
