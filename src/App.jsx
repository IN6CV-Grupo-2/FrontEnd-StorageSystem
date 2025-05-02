import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Navbar from '../src/components/navbars/navbar.jsx'
import Sidebar from '../src/components/dashboard/sidebar.jsx'
import AppRoutes from "./routes";

const App = () => {
  return (
    <BrowserRouter>
      <div className="layout">
        <Navbar />
        <div className="content">
          <Sidebar />
          <AppRoutes />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;