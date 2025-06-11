import { createBrowserRouter } from "react-router";
import App from "../App";
import Login from "../pages/login/Login";
import Signup from "../pages/signup/Signup";
import ForgotPassword from "../pages/ForgotPassword";
import VerifyMail from "../pages/VerifyMail";
import NewPassword from "../pages/NewPassword";
import Landing from "../pages/Landing/Landing";
import About from "../pages/about/About";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
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
  {
    path: "/new-password",
    element: <NewPassword />,
  },
]);
export default router;
