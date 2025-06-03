import { Outlet } from "react-router";
import TopBar from "./Shared/Navbar/TopBar";
import Navbar from "./Shared/Navbar/Navbar";
import Footer from "./Shared/Footer/Footer";

export default function App() {
  return (
    <div>
      <TopBar />
      <Navbar />
      {/* all the content will be here */}
      <Outlet />
      <Footer />
    </div>
  );
}
