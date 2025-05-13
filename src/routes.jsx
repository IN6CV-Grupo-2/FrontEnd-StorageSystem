import { Routes, Route, Navigate } from "react-router-dom";
import MainPage from "../src/pages/mainPage/mainPage.jsx";
import ProductsPage from "../src/pages/products/products.jsx";
import UsersPage from "../src/pages/users/users.jsx";
import SuppliersPage from "../src/pages/suppliers/suppliers.jsx";
import ReportsPage from "../src/pages/reports/reports.jsx";
import MovementsPage from "./pages/movements/movements.jsx";
import { Auth } from "./pages/auth/Auth.jsx";


const AppRoutes = () => {
  
  return (
    <Routes>
      <Route path="/" element={<Navigate to={"/auth"}/>} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="/products/*" element={<ProductsPage />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="/suppliers" element={<SuppliersPage />} />
      <Route path="/reports" element={<ReportsPage />} />
      <Route path="/movements/*" element={<MovementsPage />} />
    </Routes>
  );
};

export default AppRoutes;