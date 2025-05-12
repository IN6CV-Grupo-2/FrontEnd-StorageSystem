import { Route, Routes } from 'react-router-dom';
import { useEffect } from "react";
import { useMovements } from "../../shared/hooks/useMovement.jsx";
import { useProducts } from "../../shared/hooks/useProducts.jsx";
import { useUsers } from "../../shared/hooks/useUser.jsx";
import MovementsT from "../../components/movements/MovementsT.jsx";
import MovementDetails from "../../components/movements/MovementDetails.jsx";
import { LoadingSpinner } from "../../components/LoadingSpinner.jsx";
import Sidebar from '../../components/dashboard/sidebar';
import './movements.css';

const MovementsPage = () => {
    const { getMovements, movements, isLoading, createMovement, updateMovement, deleteMovement } = useMovements();
    const { getProducts, allProducts } = useProducts();
    const { getUsers, users } = useUsers();


    useEffect(() => {
        getMovements();
        getProducts();
        getUsers();
    }, []);

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="movements-layout">
            <Sidebar />
            <div className="movements-content">
                <Routes>
                    <Route
                        path="/"
                        element={
                            <MovementsT
                                movements={movements}
                                onSubmit={createMovement}
                                products={allProducts}
                                users={users}
                                onEdit={updateMovement}
                                onDelete={deleteMovement}
                            />
                        }
                    />
                    <Route
                        path="/movements"
                        element={<MovementDetails />}
                    />
                </Routes>
            </div>
        </div>
    );
};

export default MovementsPage;