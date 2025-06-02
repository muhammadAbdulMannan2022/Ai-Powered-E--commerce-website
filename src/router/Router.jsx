import { createBrowserRouter } from "react-router";
import App from "../App";
import Login from "../pages/login/Login";
import Signup from "../pages/signup/Signup";

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
]);
export default router;
