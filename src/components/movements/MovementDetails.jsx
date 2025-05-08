import React from "react";
import "./MovementDetails.css";

const MovementDetails = ({ movement }) => {
    if (!movement) return <p>No hay movimiento seleccionado.</p>;

    return (
        <div className="movement-details">
            <h3>Detalles del Movimiento</h3>
            <p><strong>Producto:</strong> {movement.product?.name}</p>
            <p><strong>Tipo:</strong> {movement.type}</p>
            <p><strong>Cantidad:</strong> {movement.quantity}</p>
            <p><strong>Fecha:</strong> {new Date(movement.date).toLocaleString()}</p>
            <p><strong>Empleado:</strong> {movement.employee?.name}</p>
            <p><strong>Razón:</strong> {movement.reason || "N/A"}</p>
            <p><strong>Destino:</strong> {movement.destination || "N/A"}</p>
        </div>
    );
};

export default MovementDetails;