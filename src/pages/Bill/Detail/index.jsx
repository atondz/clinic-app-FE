import { PAYMENT_STATUS } from "config/constant";
import { Box } from "lucide-react";
import React, { useRef } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table,
} from "reactstrap";

const BillDetail = ({
  open = false,
  onClose = () => {},
  data = null,
  onReload = () => {},
}) => {
  const printRef = useRef(null);
  const authToken = localStorage.getItem("authToken");
  const handlePrint = () => {
    const printContent = printRef.current.innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload(); // Load lại trang để tránh mất nội dung
  };

  const charge = async () => {
    const res = await fetch(
      `http://localhost:5001/api/prescriptions/charged/${data._id}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    if (res && res.status === 200) {
      alert("Thanh toán thành công!");

      onReload();
      onClose();
    }
  };

  return (
    <Modal isOpen={open} toggle={onClose}>
      <ModalHeader toggle={onClose}>Hoá Đơn</ModalHeader>
      <ModalBody>
        {data && (
          <div ref={printRef} id="printable-area">
            <Table bordered>
              <tbody>
                <tr>
                  <th>Mã hóa đơn</th>
                  <td>{data._id}</td>
                </tr>
                <tr>
                  <th>Bệnh nhân</th>
                  <td>{data.patient_name}</td>
                </tr>
                <tr>
                  <th>Bác sĩ</th>
                  <td>{data.doctor_id?.name}</td>
                </tr>
                <tr>
                  <th>Mã đăng ký</th>
                  <td>{data.registration_id}</td>
                </tr>
                <tr>
                  <th>Ghi chú</th>
                  <td>{data.notes}</td>
                </tr>
                <tr>
                  <th>Ngày tạo</th>
                  <td>
                    {new Date(data.date_created).toLocaleDateString("vi-VN")}
                  </td>
                </tr>
                <tr>
                  <th>Tổng tiền</th>
                  <td>{data.total_price.toLocaleString()} VND</td>
                </tr>
              </tbody>
            </Table>
            <h5>Danh sách thuốc</h5>
            <Table bordered>
              <thead>
                <tr>
                  <th>Tên thuốc</th>
                  <th>Liều lượng</th>
                  <th>Số lượng</th>
                  <th>Giá</th>
                </tr>
              </thead>
              <tbody>
                {data.medicines.map((med, index) => (
                  <tr key={index}>
                    <td>{med.name}</td>
                    <td>{med.dosage}</td>
                    <td>{med.quantity}</td>
                    <td>{med.price.toLocaleString()} VND</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handlePrint}>
          In
        </Button>
        <Button
          color={
            data?.status === PAYMENT_STATUS.WAITING ? "success" : "secondary"
          }
          disabled={data?.status !== PAYMENT_STATUS.WAITING}
          onClick={charge}
        >
          Thanh Toán
        </Button>
        <Button color="secondary" onClick={onClose}>
          Đóng
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default BillDetail;
