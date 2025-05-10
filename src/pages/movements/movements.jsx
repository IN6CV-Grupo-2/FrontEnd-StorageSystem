import { Route, Routes } from 'react-router-dom';
import { useEffect } from "react";
import { useMovements } from "../../shared/hooks/useMovement.jsx";
import { useProducts } from "../../shared/hooks/useProducts.jsx";
//import { useEmployees } from "../../shared/hooks/useEmployees.jsx";
import MovementList from "../../components/movements/MovementList.jsx";
import MovementForm from "../../components/movements/MovementForm.jsx";
import MovementDetails from "../../components/movements/MovementDetails.jsx";
import { LoadingSpinner } from "../../components/LoadingSpinner.jsx";
import Sidebar from '../../components/dashboard/sidebar';
//import Navbar from '../../components/navbars/navbar';
import './movements.css';

const MovementsPage = () => {
    const { getMovements, movements, isLoading, createMovement } = useMovements();
    const { getProducts, allProducts } = useProducts();
    //const { getEmployees, allEmployees } = useEmployees();

    useEffect(() => {
        getMovements();
        getProducts();
        //getEmployees();
    }, []);

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="movements-layout">
            <Sidebar />
              
            <div className="movements-content">
                <Routes>
                    <Route
                        path="/"
                        element={<MovementList movements={movements} />}
                    />
                    <Route
                        path="/new"
                        element={
                            <MovementForm
                                products={allProducts}
                                //employees={allEmployees}
                                onSubmit={createMovement}
                            />
                        }
                    />
                    <Route
                        path="/:id"
                        element={<MovementDetails />}
                    />
                </Routes>
            </div>
        </div>
    );
};

export default MovementsPage;