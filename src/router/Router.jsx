import { createBrowserRouter } from "react-router";
import App from "../App";
import Login from "../pages/login/Login";
import Signup from "../pages/signup/Signup";
import ForgotPassword from "../pages/ForgotPassword";
import VerifyMail from "../pages/VerifyMail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/verify-mail",
    element: <VerifyMail />,
  },
]);
export default router;
