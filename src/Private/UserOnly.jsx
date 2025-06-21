import { Navigate, useLocation } from "react-router"; // use "react-router-dom", not "react-router"

export default function UserOnly({ children }) {
  const location = useLocation();
  const accessToken = localStorage.getItem("access_token");

  if (!accessToken) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
}
