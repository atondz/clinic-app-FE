import React, { useEffect, useState } from "react";
import Header from "components/Headers/Header";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  Table,
} from "reactstrap";
import axios from "axios";
import moment from "moment";
import BillDetail from "./Detail";
import { PAYMENT_STATUS } from "config/constant";
import { PAYMENT_STATUS_MAPPING_VALUE } from "config/constant";

const Bill = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [openDetail, setOpenDetail] = useState(false);
  const [billDetail, setBillDetail] = useState(null);
  const authToken = localStorage.getItem("authToken");

  const getPrescritions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5001/api/prescriptions"
      );
      console.log("response.data.data", response.data);
      setPrescriptions(response.data || []);
    } catch (error) {}
  };
  const formatDate = (isoString) => moment(isoString).format("DD-MM-YY");

  const cancelPayment = async (id) => {
    const res = await fetch(
      `http://localhost:5001/api/prescriptions/cancel/${id}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    if (res && res.status === 200) {
      alert("Huỷ thành công!");
      getPrescritions();
    }
  };

  const selectBillDetail = (bill) => {
    setOpenDetail(true);
    setBillDetail(bill);
  };

  const onCloseBillDetail = () => {
    setOpenDetail(false);
    setBillDetail(null);
  };

  useEffect(() => {
    if (!prescriptions.length) {
      getPrescritions();
    }
  }, []);

  return (
    <div>
      <Header />
      <Container className="mt-2" fluid>
        <Card className="shadow">
          <CardHeader className="bg-transparent">
            <h3 className="mb-0">Đơn Thuốc</h3>
          </CardHeader>
          <Table className="align-items-center table-flush" responsive>
            <thead className="thead-light">
              <tr>
                <th scope="col">Tên bệnh nhân</th>
                <th scope="col">Ngày khám</th>
                <th scope="col">Bác sĩ</th>
                <th scope="col">Tổng hoá đơn</th>
                <th scope="col">Trạng thái</th>
                <th scope="col">Hành động</th>
                <th scope="col" />
              </tr>
            </thead>
            <tbody>
              {prescriptions.length &&
                prescriptions.map((prescription) => {
                  return (
                    <tr>
                      <th scope="row">{prescription.patient_name || "-"}</th>
                      <td>
                        {prescription?.date_created
                          ? formatDate(prescription?.date_created)
                          : "-"}
                      </td>
                      <td>{prescription.doctor_id?.name || "-"}</td>
                      <td>
                        {prescription.total_price
                          ? `${prescription.total_price} VNĐ`
                          : "-"}
                      </td>
                      <td>
                        {prescription?.status ? (
                          <Badge
                            color={
                              PAYMENT_STATUS_MAPPING_VALUE[prescription?.status]
                                .color
                            }
                          >
                            {
                              PAYMENT_STATUS_MAPPING_VALUE[prescription?.status]
                                .name
                            }
                          </Badge>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td>
                        <Button
                          color="info"
                          size="sm"
                          type="button"
                          onClick={() => selectBillDetail(prescription)}
                        >
                          Xem Hoá Đơn
                        </Button>
                        <Button
                          color={
                            prescription?.status === PAYMENT_STATUS.WAITING
                              ? "danger"
                              : "secondary"
                          }
                          size="sm"
                          disabled={
                            prescription?.status !== PAYMENT_STATUS.WAITING
                          }
                          type="button"
                          onClick={() => cancelPayment(prescription?._id)}
                        >
                          Huỷ
                        </Button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </Card>
      </Container>
      <BillDetail
        open={openDetail}
        onClose={() => onCloseBillDetail()}
        data={billDetail}
        onReload={() => {
          getPrescritions();
        }}
      ></BillDetail>
    </div>
  );
};

export default Bill;
