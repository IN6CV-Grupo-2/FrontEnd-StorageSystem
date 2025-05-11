import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from "react";
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
    const { getProducts, allProducts: products } = useProducts();
    const { getUsers, users } = useUsers();

    useEffect(() => {
        getMovements();
        getProducts();
        getUsers();

    }, []);

    const handleCreateMovement = async (data) => {
        await createMovement(data);
    };

    const handleEditMovement = async (id, data) => {
        const { type, quantity, reason, destination } = data;
        await updateMovement(id, { type, quantity, reason, destination });
    };

    const handleDeleteMovement = async (id) => {
        await deleteMovement(id);
    };

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
                                products={products}
                                users={users}
                                onSubmit={handleCreateMovement}
                                onDelete={handleDeleteMovement}
                                onEdit={handleEditMovement}
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