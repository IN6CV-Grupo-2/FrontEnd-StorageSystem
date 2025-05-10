import React from "react";
import "./MovementDetails.css";

const MovementDetails = ({ movement }) => {
    if (!movement) return <p>No move selected.</p>;

    return (
        <div className="movement-details">
            <h3>Movement Details</h3>
            <p><strong>Product:</strong> {movement.product?.name}</p>
            <p><strong>Type:</strong> {movement.type}</p>
            <p><strong>Amount:</strong> {movement.quantity}</p>
            <p><strong>Date:</strong> {new Date(movement.date).toLocaleString()}</p>
            <p><strong>Employee:</strong> {movement.employee?.name}</p>
            <p><strong>Reason:</strong> {movement.reason || "N/A"}</p>
            <p><strong>Destination:</strong> {movement.destination || "N/A"}</p>
        </div>
    );
};

export default MovementDetails;