import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// ProtectedRoute component để bảo vệ route cho bác sĩ
const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.user); // Lấy thông tin người dùng từ Redux store

  // Kiểm tra nếu user không phải là bác sĩ hoặc không có user thì điều hướng về trang "không có quyền"
  if (!user || user.role !== 'doctor') {
    return <Navigate to="/home" />; // Hoặc có thể redirect đến trang đăng nhập
  }

  return children; // Nếu người dùng là bác sĩ, render component con
};

export default ProtectedRoute;
