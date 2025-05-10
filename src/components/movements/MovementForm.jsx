import React, { useState } from "react";
import "./MovementForm.css";

const MovementForm = ({ onSubmit, products = [], employees = [] }) => {
    const [form, setForm] = useState({
        product: "",
        type: "entrada",
        quantity: "",
        reason: "",
        destination: "",
        employee: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const selectedProduct = products.find(p => p.name === form.product);
        const selectedEmployee = employees.find(e => e.name === form.employee);

        const finalForm = {
            ...form,
            product: selectedProduct?._id || "",
            employee: selectedEmployee?._id || ""
        };

        onSubmit(finalForm);
    };

    return (
        <form className="movement-form" onSubmit={handleSubmit}>
            <h2>Register Movement</h2>

            <label>
                Product:
                <input
                    list="products"
                    name="product"
                    onChange={handleChange}
                    value={form.product}
                    required
                />
                <datalist id="products">
                    {products.map((p) => (
                        <option key={p._id} value={p.name} />
                    ))}
                </datalist>
            </label>

            <label>
                Employee:
                <input
                    list="employees"
                    name="employee"
                    onChange={handleChange}
                    value={form.employee}
                    required
                />
                <datalist id="employees">
                    {employees.map((e) => (
                        <option key={e._id} value={e.name} />
                    ))}
                </datalist>
            </label>

            <label>
                Type:
                <select name="type" onChange={handleChange} value={form.type}>
                    <option value="entrada">Entrada</option>
                    <option value="salida">Salida</option>
                </select>
            </label>

            <label>
                Amount:
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
                        Reason:
                        <input
                            type="text"
                            name="reason"
                            onChange={handleChange}
                            value={form.reason}
                        />
                    </label>

                    <label>
                        Destination:
                        <input
                            type="text"
                            name="destination"
                            onChange={handleChange}
                            value={form.destination}
                        />
                    </label>
                </>
            )}

            <button type="submit">Save</button>
        </form>
    );
};

export default MovementForm;