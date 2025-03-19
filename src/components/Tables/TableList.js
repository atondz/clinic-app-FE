import React from "react";
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { toast } from "react-toastify"; // 🚀 Import toastify

const TableList = ({ data, navigate, setPatients }) => {
  const handleDelete = async () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa bệnh nhân này không?")) {
      fetch(`http://localhost:5001/api/patients/${data.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
        .then((res) => {
          if (res.ok) {
            
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
            <DropdownItem onClick={() => navigate(`/patients/${data.id}/edit`)}>Chỉnh sửa</DropdownItem>
            <DropdownItem onClick={handleDelete}>Xóa</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </td>
    </tr>
  );
};

export default TableList;
