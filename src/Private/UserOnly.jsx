import { Navigate, useLocation } from "react-router-dom"; // use "react-router-dom", not "react-router"

export default function UserOnly({ children }) {
  const location = useLocation();
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children; // ✅ return directly, not in {}
}
