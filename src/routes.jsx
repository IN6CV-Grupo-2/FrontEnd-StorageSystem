import { Routes, Route } from "react-router-dom";
import MainPage from "../src/pages/mainPage/mainPage.jsx";
import ProductsPage from "../src/pages/products/products.jsx";
import UsersPage from "../src/pages/users/users.jsx";
import SuppliersPage from "../src/pages/suppliers/suppliers.jsx";
import ReportsPage from "../src/pages/reports/reports.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="/suppliers" element={<SuppliersPage />} />
      <Route path="/reports" element={<ReportsPage />} />
    </Routes>
  );
};

export default AppRoutes;