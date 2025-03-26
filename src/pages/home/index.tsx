import React, { useEffect, useState } from "react";
import Header from "../../components/Headers/Header";
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

const Home = () => {
  const [stats, setStats] = useState({
    medicalRecords: 0,
    prescriptions: 0,
    patients: 0,
  });

  const [userInfo, setUserInfo] = useState({
    name: "",
    location: "",
    avatar: ""
  });

  const getInitials = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  useEffect(() => {
    fetch("https://api.example.com/clinic-stats")
      .then((response) => response.json())
      .then((data) => {
        setStats({
          medicalRecords: data.medicalRecords || 0,
          prescriptions: data.prescriptions || 0,
          patients: data.patients || 0,
        });
      })
      .catch((error) => console.error("Error fetching stats:", error));

    fetch("http://localhost:5001/api/users/users")
      .then((res) => res.json())
      .then((data) => {
        const user = data.user || data[0] || {}; // fallback lấy user đầu tiên nếu có
        setUserInfo({
          name: user.name || "Phạm Quốc Toàn ",
          location: user.location || "Tuy Phước",
          avatar: user.avatar || ""
        });
      })
      .catch((error) => console.error("Error fetching user info:", error));
  }, []);

  return (
    <>
      <Header />
      <Container className="mt-4">
        <Row>
          {/* Cột trái: Thông tin người dùng */}
          <Col lg="4">
            <Card className="text-center shadow">
              <CardBody style={{ paddingTop: "4rem" }}>
                <div
                  className="card-profile-image"
                  style={{ marginTop: "-60px", display: "flex", justifyContent: "center" }}
                >
                  {userInfo.avatar ? (
                    <img
                      src={userInfo.avatar}
                      alt="avatar"
                      className="rounded-circle shadow"
                      style={{
                        width: "120px",
                        height: "120px",
                        objectFit: "cover",
                        border: "4px solid white"
                      }}
                    />
                  ) : (
                    <div
                      className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center shadow"
                      style={{
                        width: "120px",
                        height: "120px",
                        fontSize: "32px",
                        fontWeight: "bold",
                        border: "4px solid white"
                      }}
                    >
                      {getInitials(userInfo.name)}
                    </div>
                  )}
                </div>

                <h4 className="mt-3">{userInfo.name}</h4>
                <p className="text-muted">{userInfo.location}</p>
              </CardBody>
            </Card>
          </Col>

          {/* Cột phải: Thống kê */}
          <Col lg="8">
            <Row>
              <Col md="6" xl="4">
                <Card className="card-stats mb-4">
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

              <Col md="6" xl="4">
                <Card className="card-stats mb-4">
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

              <Col md="6" xl="4">
                <Card className="card-stats mb-4">
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
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
