import { Navigate } from 'react-router-dom';

const isAuthenticated = () => {
  const token = localStorage.getItem('authToken');
  return token !== null; // Trả về true nếu có token, false nếu không
};

const ProtectedRoute = ({ children }) => {
  const isAuth = isAuthenticated();
  return isAuth ? children : <Navigate to="/auth/Welcome" />;
};

export default ProtectedRoute;
