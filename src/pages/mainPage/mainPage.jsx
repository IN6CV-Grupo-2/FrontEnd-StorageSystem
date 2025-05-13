import React from "react";
import Sidebar from "../../components/dashboard/sidebar";
import Navbar from "../../components/navbars/navbar";

const MainPage = () => {

  return (
    <div>
      <div className="layout d-flex flex-column">
        <Sidebar/>
        <Navbar/>
      </div>
      <h1>Main Page</h1>
    </div>
  );
};

export default MainPage;