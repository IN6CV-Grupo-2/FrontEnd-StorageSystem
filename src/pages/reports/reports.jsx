import React from "react";
import Navbar from '../../components/navbars/navbar';
import Sidebar from "../../components/dashboard/sidebar";
import { PieInventoryActive } from '../../components/Reports/ReportInvetoryPieTotalValue';
import { PieQuantityTotal } from '../../components/Reports/ReportPieQuantityTotal';
import { BarChartStatistics } from '../../components/Reports/ReportMoreMoved'
import { BarChartProducts } from "../../components/Reports/ReportValueUnitaryProducts";
import { BarChartMovements } from "../../components/Reports/ReportMovementePeriod";
import './reports.css';

const Reports = () => {



  return (
      <div className="dashboard-container">
      <Navbar />
      <div className="dashboard-body">
        <Sidebar />
        <main className="dashboard-main">
          <section className="dashboard-section">
            <PieInventoryActive />
          </section>

          <section className="dashboard-section">
            <PieQuantityTotal />
          </section>

          <section className="dashboard-section">
            <BarChartProducts/>
          </section>

          <section className="dashboard-section">
            <BarChartStatistics />
          </section>
          <section className="dashboard-section">
            <BarChartMovements/>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Reports;