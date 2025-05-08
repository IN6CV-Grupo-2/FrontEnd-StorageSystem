import React from "react";
import "./MovementList.css";

const MovementList = ({ movements, onSelect }) => {
    return (
        <div className="movement-list-container">
            <h2>Movimientos Registrados</h2>
            <ul>
                {movements?.map((movement) => (
                    <li key={movement._id} onClick={() => onSelect(movement)}>
                        <div className={`movement-item ${movement.type}`}>
                            <p><strong>Producto:</strong> {movement.product?.name}</p>
                            <p><strong>Tipo:</strong> {movement.type}</p>
                            <p><strong>Cantidad:</strong> {movement.quantity}</p>
                            <p><strong>Fecha:</strong> {new Date(movement.date).toLocaleDateString()}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MovementList;