import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="text-xl text-gray-600 mt-4">Oops! Page not found.</p>
      <Link
        to="/home"
       
      >
       <p className="text-xl text-gray-600 mt-4">Go home!</p>
      </Link>
    </div>
  );
}
