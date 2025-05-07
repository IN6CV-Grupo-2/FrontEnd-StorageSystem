import React from "react";
import Navbar from '../../components/navbars/navbar';
import Sidebar from "../../components/dashboard/sidebar";
import { PieInventoryActive } from '../../components/Reports/ReportInvetoryPie';

const Reports = () => {



  return (
    <div>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <main style={{ flex: 1, padding: "20px" }}>
          <PieInventoryActive />
        </main>
      </div>
    </div>
  );
};

export default Reports;