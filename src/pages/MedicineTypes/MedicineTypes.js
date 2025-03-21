import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Container,
  Row,
  Col,
  Input,
  Button,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
  CardHeader,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "components/Headers/Header.js";

const MedicineTypes = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [medicineTypes, setMedicineTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedDescriptions, setExpandedDescriptions] = useState(new Set()); // State để theo dõi các mục đã mở rộng
  const itemsPerPage = 5;

  // Fetch dữ liệu từ API
  useEffect(() => {
    const fetchMedicineTypes = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/medicineTypes");
        if (!response.ok) throw new Error("Không thể lấy dữ liệu");
        const { data } = await response.json();
        setMedicineTypes(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMedicineTypes();
  }, []);

  // Hàm xử lý thu gọn/mở rộng nội dung
  const toggleDescription = (id) => {
    setExpandedDescriptions((prev) => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

  // Hàm cắt ngắn nội dung
  const truncateText = (text, maxLength = 30) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  // Lọc dữ liệu theo từ khóa tìm kiếm
  const filteredMedicineTypes = medicineTypes.filter((type) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      type.medicine_type_code.toLowerCase().includes(searchLower) ||
      type.medicine_type_name.toLowerCase().includes(searchLower)
    );
  });

  // Xử lý xóa loại thuốc
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xoá loại thuốc này không?")) {
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:5001/api/medicineTypes/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Xóa thất bại. Vui lòng thử lại!");
      }
      setMedicineTypes((prev) => prev.filter((type) => type.id !== id));
      toast.success("Xoá thành công!", { autoClose: 1000 });
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Xử lý chỉnh sửa loại thuốc
  const handleEdit = (id) => {
    navigate(`/admin/edit-medicine-type/${id}`);
  };

  // Xử lý phân trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Tính toán dữ liệu cho trang hiện tại
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredMedicineTypes.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredMedicineTypes.length / itemsPerPage);

  return (
    <>
      <Header />
      <Container className="mt-4" fluid>
        <Row className="mb-4 align-items-center">
          <Col md={6}>
            <h3 className="mb-0">Danh Sách Loại Thuốc</h3>
          </Col>
          <Col md={3}>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="fas fa-search" />
                </InputGroupText>
              </InputGroupAddon>
              <Input
                type="text"
                placeholder="Tìm kiếm loại thuốc..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </Col>
          <Col md={3} className="text-right">
            <Button
              tag={Link}
              to="/add-medicine-types"
              color="primary"
              className="w-100"
            >
              + Thêm loại thuốc
            </Button>
          </Col>
        </Row>

        {loading ? (
          <div>Đang tải...</div>
        ) : error ? (
          <div className="text-danger">{error}</div>
        ) : (
          <Card className="shadow">
            <CardHeader className="bg-light border-0">
              <h4 className="text-dark mb-0">Danh sách các loại thuốc</h4>
            </CardHeader>
            <CardBody className="p-0">
              <Table hover responsive className="mb-0">
                <thead className="thead-light">
                  <tr>
                    <th>STT</th>
                    <th>Mã Loại Thuốc</th>
                    <th>Tên Loại Thuốc</th>
                    <th>Hành Động</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((type, index) => {
                    const isExpanded = expandedDescriptions.has(type.id);
                    const showText = isExpanded
                      ? type.medicine_type_name
                      : truncateText(type.medicine_type_name);

                    return (
                      <tr key={type.id}>
                        <td>{indexOfFirstItem + index + 1}</td>
                        <td>{type.medicine_type_code}</td>
                        <td
                          style={{
                            maxWidth: "300px",
                            whiteSpace: isExpanded ? "pre-wrap" : "nowrap",
                            wordBreak: "break-word",
                          }}
                        >
                          {showText}
                          {type.medicine_type_name.length > 30 && (
                            <Button
                              color="link"
                              size="sm"
                              onClick={() => toggleDescription(type.id)}
                              className="p-0 ml-2"
                            >
                              {isExpanded ? "[Thu gọn]" : "[Xem thêm]"}
                            </Button>
                          )}
                        </td>
                        <td>
                          <Button
                            color="primary"
                            size="sm"
                            onClick={() => handleEdit(type.id)}
                          >
                            Sửa
                          </Button>
                          <Button
                            color="danger"
                            size="sm"
                            className="mr-2"
                            onClick={() => handleDelete(type.id)}
                          >
                            Xoá
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>

              {!filteredMedicineTypes.length && (
                <div className="text-center py-4 text-muted">
                  Không tìm thấy kết quả phù hợp
                </div>
              )}
            </CardBody>
          </Card>
        )}

        {/* Phân trang */}
        {totalPages > 1 && (
          <Pagination className="mt-3 justify-content-center">
            <PaginationItem disabled={currentPage === 1}>
              <PaginationLink
                previous
                onClick={() => handlePageChange(currentPage - 1)}
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem active={index + 1 === currentPage} key={index}>
                <PaginationLink onClick={() => handlePageChange(index + 1)}>
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem disabled={currentPage === totalPages}>
              <PaginationLink
                next
                onClick={() => handlePageChange(currentPage + 1)}
              />
            </PaginationItem>
          </Pagination>
        )}
      </Container>
    </>
  );
};

export default MedicineTypes;