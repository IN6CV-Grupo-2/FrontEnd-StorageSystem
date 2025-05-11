import React, { useState, useEffect } from "react";
import { useMovements } from '../../shared/hooks/useMovement.jsx'
import "./MovementsT.css";

const MovementsT = ({ movements, products = [], users = [], onSubmit, onDelete, onEdit }) => {
    const [showModal, setShowModal] = useState(false);
    const [editingMovement, setEditingMovement] = useState(null);
    const [form, setForm] = useState({
        product: "",
        type: "entrada",
        quantity: "",
        reason: "",
        destination: "",
        user: "",
    });

    useEffect(() => {
        if (editingMovement) {
            setForm({
                product: editingMovement.product?.uid || editingMovement.product,
                type: editingMovement.type,
                quantity: editingMovement.quantity,
                reason: editingMovement.reason || "",
                destination: editingMovement.destination || "",
                user: editingMovement.user?.uid || editingMovement.user,
            });
        } else {
            setForm({
                product: "",
                type: "entrada",
                quantity: "",
                reason: "",
                destination: "",
                user: "",
            });
        }
    }, [editingMovement]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.product) {
            alert("Debe seleccionar un producto válido.");
            return;
        }

        if (editingMovement) {
            await onEdit(editingMovement.uid, form);
        } else {
            await onSubmit(form);
        }

        setShowModal(false);
        setEditingMovement(null);
    };

    return (
        <div className="movement-list-container">
            <div className="list-header">
                <h2>Registered Movements</h2>
                <button className="add-button" onClick={() => {
                    setEditingMovement(null);
                    setShowModal(true);
                }}>
                    Nuevo Movimiento
                </button>
            </div>

            <table className="movement-table">
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Tipo</th>
                        <th>Cantidad</th>
                        <th>Fecha</th>
                        <th>Empleado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {movements?.map((movement) => (
                        <tr key={movement.uid} className={`movement-item ${movement.type}`}>
                            <td>{movement.product?.name}</td>
                            <td>{movement.type}</td>
                            <td>{movement.quantity}</td>
                            <td>{new Date(movement.date).toLocaleDateString()}</td>
                            <td>{movement.user?.name || movement.user?._id || "-"}</td>
                            <td>
                                <button
                                    className="edit-button"
                                    onClick={() => {
                                        setEditingMovement(movement);
                                        setShowModal(true);
                                    }}
                                >
                                    Editar
                                </button>
                                <button
                                    className="delete-button"
                                    onClick={() => onDelete(movement.uid)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3>Registrar Movimiento</h3>
                        <form className="movement-form" onSubmit={handleSubmit}>
                            <label>
                                Producto:
                                <select
                                    name="product"
                                    onChange={handleChange}
                                    value={form.product}
                                    required
                                >
                                    <option value="">Seleccione un producto</option>
                                    {products.map((p) => (
                                        <option key={p.uid} value={p.uid}>
                                            {p.name}
                                        </option>
                                    ))}
                                </select>
                            </label>

                            <label>
                                Tipo:
                                <select name="type" onChange={handleChange} value={form.type}>
                                    <option value="entrada">Entrada</option>
                                    <option value="salida">Salida</option>
                                </select>
                            </label>

                            <label>
                                Cantidad:
                                <input
                                    type="number"
                                    name="quantity"
                                    onChange={handleChange}
                                    value={form.quantity}
                                    required
                                />
                            </label>

                            {form.type === "salida" && (
                                <>
                                    <label>
                                        Razón:
                                        <input
                                            type="text"
                                            name="reason"
                                            onChange={handleChange}
                                            value={form.reason}
                                        />
                                    </label>

                                    <label>
                                        Destino:
                                        <input
                                            type="text"
                                            name="destination"
                                            onChange={handleChange}
                                            value={form.destination}
                                        />
                                    </label>
                                </>
                            )}

                            <div className="modal-buttons">
                                <button type="submit">Guardar</button>
                                <button
                                    type="button"
                                    className="cancel-button"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MovementsT;