import React from "react";
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

const MedicalCertificateRow = ({ data }) => {
  return (
    <tr>
      <td>{data.patientName}</td>
      <td>{data.code}</td>
      <td>{data.title}</td> {/* Sửa gender -> title */}
      <td>{data.clinic}</td> {/* Sửa phone -> clinic */}
      <td>{data.doctor}</td> {/* Sửa dob -> doctor */}
      <td>{data.date}</td> {/* Sửa address -> date */}
      <td>
        <Badge color={data.statusColor} className="badge-dot">
          <i className={`bg-${data.statusColor}`} /> {data.status}
        </Badge>
      </td>
      <td>
        <Badge color={data.paymentColor} className="badge-dot">
          <i className={`bg-${data.paymentColor}`} /> {data.paymentStatus}
        </Badge>
      </td>
      <td className="text-right">
        <UncontrolledDropdown>
          <DropdownToggle className="btn-icon-only text-light" role="button" size="sm" color="">
            <i className="fas fa-ellipsis-v" />
          </DropdownToggle>
          <DropdownMenu className="dropdown-menu-arrow" right>
            <DropdownItem>Chi tiết</DropdownItem>
            <DropdownItem>Chỉnh sửa</DropdownItem>
            <DropdownItem>Xóa</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </td>
    </tr>
  );
};

export default MedicalCertificateRow;
