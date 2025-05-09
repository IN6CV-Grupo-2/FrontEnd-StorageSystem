import { useState, useEffect } from "react";
import { useCustomers } from "../../shared/hooks/useCustomers.jsx";
import "./CustomerForm.css";

export const CustomerForm = ({ onSave, initialData, onCancel }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const { createCustomer, editCustomer } = useCustomers();

    useEffect(() => {
        if (initialData?.name) setName(initialData.name);
        if (initialData?.email) setEmail(initialData.email);
        if (initialData?.phone) setPhone(initialData.phone);
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (initialData) {
            editCustomer({ name, email, phone }, initialData.uid);
        } else {
            createCustomer({ name, email, phone });
        }

        setName("");
        setEmail("");
        setPhone("");
        onSave();
    };

    return (
        <form onSubmit={handleSubmit} className="customer-form">
            <h2 className="text-2xl font-bold text-[#134BF2]">
                {initialData ? "Editar cliente" : "Agregar nuevo cliente"}
            </h2>

            <div>
                <label htmlFor="customerName" className="block font-semibold mb-1 text-[#134BF2]">
                    Nombre del cliente:
                </label>
                <input
                    id="customerName"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="..."
                    className="w-full border border-[#B8BBBF] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1BA0F2] bg-white shadow-sm transition"
                />
            </div>

            <div>
                <label htmlFor="customerEmail" className="block font-semibold mb-1 text-[#134BF2]">
                    Correo del cliente:
                </label>
                <input
                    id="customerEmail"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="correo@ejemplo.com"
                    className="w-full border border-[#B8BBBF] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1BA0F2] bg-white shadow-sm transition"
                />
            </div>

            <div>
                <label htmlFor="customerPhone" className="block font-semibold mb-1 text-[#134BF2]">
                    Teléfono del cliente:
                </label>
                <input
                    id="customerPhone"
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    placeholder="+502 "
                    className="w-full border border-[#B8BBBF] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1BA0F2] bg-white shadow-sm transition"
                />
            </div>

            <button type="submit" className={`text-white font-semibold px-6 py-2 rounded-lg shadow-md transition-transform duration-300 hover:scale-105
                 ${initialData
                        ? "bg-[#0C87F2] hover:bg-[#1BA0F2]"
                        : "bg-[#134BF2] hover:bg-[#0C87F2]"
                    }`}
            >
                {initialData ? "Actualizar cliente" : "Agregar cliente"}
            </button>

            <button
                type="button"
                onClick={onCancel}
                className="bg-gray-400 hover:bg-gray-500 text-white font-semibold px-6 py-2 rounded-lg transition"
            >
                Cancelar
            </button>
        </form>
    );
};