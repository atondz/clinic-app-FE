// src/utils/auth.js
export const isAuthenticated = () => {
    const token = localStorage.getItem("authToken");
    return !!token; // Trả về true nếu có token, false nếu không có
  };
  // src/utils/auth.js

// Kiểm tra người dùng có đăng nhập không


// Hàm đăng xuất
export const logout = (navigate) => {
  localStorage.removeItem("authToken"); // Xóa token
  localStorage.removeItem("roleAccess");
  navigate("/auth/login"); // Chuyển hướng về trang đăng nhập
};
