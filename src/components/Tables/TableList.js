import React from "react";
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Badge } from "reactstrap";


const TableList = ({ data }) => {
  return (
    <tr>
      <td>{data.patientName}</td>
      <td>{data.code}</td>
      <td>{data.gender}</td>
      <td>{data.phone}</td>
      <td>{data.dob}</td>      {/* Ngày sinh */}
      <td>{data.address}</td>  {/* Địa chỉ */}
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

export default TableList;
