import React, { useState } from "react";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { toast } from "react-toastify";
import PatientEditModal from "pages/patient/PatientEditModel";

const TableList = ({ data, navigate, setPatients }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleDelete = async () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa bệnh nhân này không?")) {
      try {
        const response = await fetch(
          `https://clinic-app-be.onrender.com/api/patients/${data._id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          setPatients((prev) =>
            prev.filter((patient) => patient._id !== data._id)
          );
          toast.success("Xóa bệnh nhân thành công!", {
            position: "top-right",
            autoClose: 1000,
          });
        } else {
          const errorData = await response.json();
          toast.error(errorData.message || "Lỗi khi xóa bệnh nhân!");
        }
      } catch (error) {
        toast.error("Lỗi kết nối đến server!");
        console.error(error);
      }
    }
  };

  const handleSavePatient = (updatedPatient) => {
    setPatients((prev) =>
      prev.map((patient) =>
        patient._id === updatedPatient._id ? updatedPatient : patient
      )
    );
  };

  return (
    <>
      <tr>
        <td>{data.patient_id}</td>
        <td>{data.id_card}</td>
        <td>{data.name}</td>
        <td>{data.gender ? "Nam" : "Nữ"}</td>
        <td>{data.phone}</td>
        <td>{new Date(data.birth_date).toLocaleDateString()}</td>
        <td>{data.address}</td>
        <td className="text-right">
          <UncontrolledDropdown>
            <DropdownToggle
              className="btn-icon-only text-light"
              role="button"
              size="sm"
              color=""
            >
              <i className="fas fa-ellipsis-v" />
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-arrow" right>
              <DropdownItem onClick={() => setIsEditModalOpen(true)}>
                Chỉnh sửa
              </DropdownItem>
              <DropdownItem
                onClick={() =>
                  navigate("/medical-history", {
                    state: { patientId: data._id },
                  })
                }
              >
                Lịch sử khám bệnh
              </DropdownItem>
              <DropdownItem onClick={handleDelete}>Xóa</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </td>
      </tr>

      <PatientEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        patient={data}
        onSave={handleSavePatient}
      />
    </>
  );
};

export default TableList;
