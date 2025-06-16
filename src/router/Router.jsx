import { createBrowserRouter } from "react-router";
import App from "../App";
import Login from "../pages/login/Login";
import Signup from "../pages/signup/Signup";
import ForgotPassword from "../pages/ForgotPassword";
import VerifyMail from "../pages/VerifyMail";
import NewPassword from "../pages/NewPassword";
import Landing from "../pages/Landing/Landing";
import About from "../pages/about/About";
import Gallery from "../pages/gallery/Gallery";
import ContactUs from "../pages/Contactus/ContactUs";
import Products from "../pages/products/Products";
import Fencing from "../pages/products/Fencing";
import ProductsByCategory from "../pages/products/ProductsByCategory";
import FreeSamples from "../pages/FreeSamples/FreeSamples";
import Policy from "../pages/policy/Policy";
import Cart from "../pages/Cart/Cart";
import CartHome from "../pages/Cart/CartHome";
import Profile from "../pages/Profile/Profile";

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
      {
        path: "/gallery",
        element: <Gallery />,
      },
      {
        path: "/contact",
        element: <ContactUs />,
      },
      {
        path: "/products",
        element: <Products />,
        children: [
          {
            path: "fencing_list",
            element: <Fencing />,
          },
          {
            path: "allProductByCategory",
            element: <ProductsByCategory />,
          },
        ],
      },
      {
        path: "/free_samples",
        element: <FreeSamples />,
      },
      {
        path: "/policy",
        element: <Policy />,
      },
      {
        path: "/cart",
        element: <CartHome />,
      },
    ],
  },
  {
    path: "/profile",
    element: <Profile />,
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
