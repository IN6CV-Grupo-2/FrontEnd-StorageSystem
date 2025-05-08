import React from "react";
import Navbar from '../../components/navbars/navbar';
import Sidebar from "../../components/dashboard/sidebar";
import { PieInventoryActive } from '../../components/Reports/ReportInvetoryPieTotalValue';
import { PieQuantityTotal } from '../../components/Reports/ReportPieQuantityTotal';

const Reports = () => {



  return (
    <div>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <main style={{ flex: 1, padding: "20px" }}>
          <PieInventoryActive />
        </main>
      </div>
      <div style={{display: "flex"}}>
      <Sidebar />
        <main style={{ flex: 1, padding: "20px" }}>
          <PieQuantityTotal />
        </main>
      </div>
    </div>
  );
};

export default Reports;