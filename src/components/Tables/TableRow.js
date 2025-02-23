import React from "react";
import { Badge, Media, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

const TableRow = ({ data }) => {
  return (
    <tr>
      <th scope="row">
        <Media className="align-items-center">
          <span className="mb-0 text-sm">{data.patientName}</span>
        </Media>
      </th>
      <td>{data.code}</td>
      <td>{data.title}</td>
      <td>{data.clinic}</td>
      <td>{data.doctor}</td>
      <td>{data.date}</td>
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

export default TableRow;
