import React, { useEffect, useState } from "react";
import Header from "../../components/Headers/Header";
// import { Card, CardBody, CardTitle, Row, Col, Container, CardHeader, Nav, NavItem } from "reactstrap";
// import { NavLink } from "react-router-dom";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
  Badge,
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "./chart";
import axios from "axios";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const groupByMonth = (data) => {
  return data.reduce((acc, item) => {
    const date = new Date(item.createdAt);
    const monthIndex = date.getMonth(); // Lấy chỉ số tháng (0 - 11)
    const monthName = months[monthIndex];

    if (!acc[monthName]) {
      acc[monthName] = [];
    }

    acc[monthName].push(item);
    return acc;
  }, {});
};
const Home = () => {
  
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");
  const [groupedData, setGroupedData] = useState({});
  const [totalCharged, setTotalCharged] = useState(10)
  const [total, setTotal] = useState(10)
  const [chartData, setChartData] = useState({
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              callback: function (value) {
                if (!(value % 10)) {
                  //return '$' + value + 'k'
                  return value;
                }
              },
            },
          },
        ],
      },
      tooltips: {
        callbacks: {
          label: function (item, data) {
            var label = data.datasets[item.datasetIndex].label || "";
            var yLabel = item.yLabel;
            var content = "";
            if (data.datasets.length > 1) {
              content += label;
            }
            content += yLabel;
            return content;
          },
        },
      },
    },
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [
        {
          label: "Sales",
          data: [0, 20, 10, 30, 0, 20, 5, 25, 10, 30, 15, 40, 40],
          maxBarThickness: 10,
        },
      ],
    },
  })

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const convertToArray = (data) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return months.map(month => data[month] || 0);
}
  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };
  const [stats, setStats] = useState({
    medicalRecords: 0,
    prescriptions: 0,
    patients: 0,
  });

  const [prescriptions, setPrescriptions] = useState([]);
  const getPrescritions = async () => {
    try {
      const response = await axios.get(
        "https://clinic-app-be.onrender.com/api/prescriptions"
      );
      console.log("response.data.data", response.data);
      setPrescriptions(response.data || []);
    } catch (error) {}
  };
  const calculateTotalCharged = () => {
    const total = prescriptions
      .filter((item) => item.status === "CHARGED")
      .reduce((sum, item) => sum + (item.total_price || 0), 0);
    setTotalCharged(total);

    console.log('ta',prescriptions
      )
  };
  useEffect(() => {
    if (!prescriptions?.length) {
      console.log("test")
      getPrescritions();
    }
    if (prescriptions.length) {
      console.log("test")
      calculateTotalCharged();
    }
  }, [prescriptions])

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

  const countMonthlyData = (data) => {
    const result = {};
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    months.forEach(month => {
        result[month] = data?.[month]?.length || 0;
    });

    return result;
}

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://clinic-app-be.onrender.com/api/registerExam"
      );
      // const data = await response.json();
      const grouped = groupByMonth(response.data);

      console.log("g", grouped)
      setGroupedData(grouped);
      setTotal(response?.data?.length)

      const newData = countMonthlyData(grouped);
    
      const dataUpdate = convertToArray(newData)
      console.log("newData", dataUpdate)


      const chartUpdateNew = {
        ...chartData,
        data: {
          ...chartData.data,
          datasets: chartData.data.datasets.map((dataset, index) => ({
            ...dataset,
            data: dataUpdate,
          })),
        },
      };
      console.log("newData", chartUpdateNew)

      setChartData(chartUpdateNew);
    };

    fetchData();
  }, []);
  return (
    <>
    <>
      <Header />
      {/* Page content */}
      <Container className="mt-2" fluid>
        <Row>
        <Col xl="6">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                Thống Kê
              </CardHeader>
              <CardBody>
                {/* Chart */}
                
                {totalCharged &&  <Badge
              color='success'
            >
              {'Số tiền đã được thanh toán: ' + totalCharged + ' VNĐ'}
            </Badge>}
            
            {total &&  <>
            <br/>
              <Badge
              color='warning'
            >
              {'Tổng phiếu khám: ' + total + ' phiếu'}
            </Badge></>}
              </CardBody>
            </Card>
          </Col>
          <Col xl="6">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Đăng ký khám theo tháng
                    </h6>
                    <h2 className="mb-0">Tổng số lượng</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  <Bar
                    data={chartData.data}
                    options={chartData.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        {/* <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Page visits</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      See all
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Page name</th>
                    <th scope="col">Visitors</th>
                    <th scope="col">Unique users</th>
                    <th scope="col">Bounce rate</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">/argon/</th>
                    <td>4,569</td>
                    <td>340</td>
                    <td>
                      <i className="fas fa-arrow-up text-success mr-3" /> 46,53%
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">/argon/index.html</th>
                    <td>3,985</td>
                    <td>319</td>
                    <td>
                      <i className="fas fa-arrow-down text-warning mr-3" />{" "}
                      46,53%
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">/argon/charts.html</th>
                    <td>3,513</td>
                    <td>294</td>
                    <td>
                      <i className="fas fa-arrow-down text-warning mr-3" />{" "}
                      36,49%
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">/argon/tables.html</th>
                    <td>2,050</td>
                    <td>147</td>
                    <td>
                      <i className="fas fa-arrow-up text-success mr-3" /> 50,87%
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">/argon/profile.html</th>
                    <td>1,795</td>
                    <td>190</td>
                    <td>
                      <i className="fas fa-arrow-down text-danger mr-3" />{" "}
                      46,53%
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card>
          </Col>
          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Social traffic</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      See all
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Referral</th>
                    <th scope="col">Visitors</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Facebook</th>
                    <td>1,480</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">60%</span>
                        <div>
                          <Progress
                            max="100"
                            value="60"
                            barClassName="bg-gradient-danger"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Facebook</th>
                    <td>5,480</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">70%</span>
                        <div>
                          <Progress
                            max="100"
                            value="70"
                            barClassName="bg-gradient-success"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Google</th>
                    <td>4,807</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">80%</span>
                        <div>
                          <Progress max="100" value="80" />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Instagram</th>
                    <td>3,678</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">75%</span>
                        <div>
                          <Progress
                            max="100"
                            value="75"
                            barClassName="bg-gradient-info"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">twitter</th>
                    <td>2,645</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">30%</span>
                        <div>
                          <Progress
                            max="100"
                            value="30"
                            barClassName="bg-gradient-warning"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row> */}
      </Container>
    </>
    </>
  );
};

export default Home;
