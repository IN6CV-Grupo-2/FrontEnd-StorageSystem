import React, { useEffect, useState } from "react";
import MovementList from "./MovementList";
import MovementForm from "./MovementForm";
import MovementDetails from "./MovementDetails";
import { useMovements } from "../../shared/hooks/useMovement.jsx";
import { useProducts } from "../../shared/hooks/useProducts.jsx";
// import { useEmployees } from "../../shared/hooks/useEmployees";
import "./MovementsPage.css";

const MovementsPage = () => {
    const { getMovements, allMovements, createMovement } = useMovements();
    const { getProducts, allProducts } = useProducts();
    const [showForm, setShowForm] = useState(false);
    const [formKey, setFormKey] = useState(0);
    const [selectedMovement, setSelectedMovement] = useState(null);
    // const { getEmployees, allEmployees } = useEmployees();

    useEffect(() => {
        getMovements();
        getProducts();
        // getEmployees();
    }, []);

    const handleCreateMovement = async (formData) => {
        await createMovement(formData);
        getMovements();
        setSelectedMovement(null);
        setShowForm(false);
    };

    return (
        <div className="movements-page">
            <div className="form-section">
                {showForm && (
                    <div className="modal-overlay" onClick={() => setShowForm(false)}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <MovementForm
                                key={formKey}
                                products={allProducts}
                                // employees={allEmployees}
                                onSubmit={handleCreateMovement}
                            />
                            <button className="close-button" onClick={() => setShowForm(false)}>×</button>
                        </div>
                    </div>
                )}
            </div>

            <div className="list-section">
                <MovementList
                    movements={allMovements}
                    onSelect={(movement) => {
                        setSelectedMovement(movement);
                        setShowForm(false);
                    }}
                    onAdd={() => {
                        setSelectedMovement(null);
                        setShowForm(true);
                        setFormKey(prev => prev + 1);
                    }}
                />
                {selectedMovement && (
                    <MovementDetails movement={selectedMovement} />
                )}
            </div>
        </div>
    );
};

export default MovementsPage;