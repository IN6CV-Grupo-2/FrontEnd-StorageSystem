import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Navbar from "../src/components/navbars/navbar.jsx";
import Sidebar from "../src/components/dashboard/sidebar.jsx";
import AppRoutes from "./routes";
import Footer from "../src/components/footer/footer.jsx";
import "bootstrap/dist/css/bootstrap.min.css";


const App = () => {
  return (
    <BrowserRouter>
      <div className="layout d-flex flex-column">
        <Navbar />
        <Sidebar />
        <div className="content p-3 flex-grow-1">
          <AppRoutes />
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;