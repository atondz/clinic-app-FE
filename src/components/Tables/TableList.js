import React from "react";
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { useNavigate } from "react-router-dom"; // 🛠 Import useNavigate
import { toast } from "react-toastify";

const TableList = ({ data, setPatients }) => {
  const navigate = useNavigate(); // 🚀 Lấy navigate từ useNavigate

  const handleDelete = async () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa bệnh nhân này không?")) {
      fetch(`http://localhost:5001/api/patients/${data.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
        .then((res) => {
          if (res.ok) {
<<<<<<< HEAD
            
=======
            toast.success("Xóa bệnh nhân thành công!");
>>>>>>> 86fc312c54ddae2a718d1eeb94df1e2d008d9d9c
            setPatients((prev) => prev.filter((patient) => patient.id !== data.id));
            toast.success("Xóa bệnh nhân thành công!" , {position: "top-right", autoClose: 1000 });
          } else {
            toast.error("Lỗi khi xóa bệnh nhân!");
          }
        })
        .catch(() => toast.error("Lỗi kết nối đến server!"));
    }
  };

  return (
    <tr>
    <td>{data.patient_id}</td>
      <td>{data.name}</td>
      
      <td>{data.gender ? "Nam" : "Nữ"}</td>
      <td>{data.phone}</td>
      <td>{new Date(data.birth_date).toLocaleDateString()}</td>
      <td>{data.address}</td>
      <td className="text-right">
        <UncontrolledDropdown>
          <DropdownToggle className="btn-icon-only text-light" role="button" size="sm" color="">
            <i className="fas fa-ellipsis-v" />
          </DropdownToggle>
          <DropdownMenu className="dropdown-menu-arrow" right>
          <DropdownItem onClick={() => navigate(`/patient/edit/${data.id}`)}>Chỉnh sửa</DropdownItem>
            <DropdownItem onClick={handleDelete}>Xóa</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </td>
    </tr>
  );
};

export default TableList;