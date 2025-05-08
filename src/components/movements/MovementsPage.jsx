import React, { useEffect, useState } from "react";
import MovementList from "./MovementList";
import MovementForm from "./MovementForm";
import MovementDetails from "./MovementDetails";
import { useMovements } from "../../hooks/useMovements";
import { useProducts } from "../../hooks/useProducts";
import { useEmployees } from "../../shared/hooks/useEmployees";
import "./MovementsPage.css";

const MovementsPage = () => {
    const { getMovements, allMovements, createMovement } = useMovements();
    const { getProducts, allProducts } = useProducts();
    const { getEmployees, allEmployees } = useEmployees();
    const [selectedMovement, setSelectedMovement] = useState(null);

    useEffect(() => {
        getMovements();
        getProducts();
        getEmployees();
    }, []);

    const handleCreateMovement = async (formData) => {
        await createMovement(formData);
        getMovements();
        setSelectedMovement(null);
    };

    return (
        <div className="movements-page">
            <div className="form-section">
                <MovementForm
                    products={allProducts}
                    employees={allEmployees}
                    onSubmit={handleCreateMovement}
                />
            </div>
            <div className="list-section">
                <MovementList
                    movements={allMovements}
                    onSelect={(movement) => setSelectedMovement(movement)}
                />
                <MovementDetails movement={selectedMovement} />
            </div>
        </div>
    );
};

export default MovementsPage;