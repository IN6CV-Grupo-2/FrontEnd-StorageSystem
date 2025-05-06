import { useState, useEffect } from "react";
import { useProviders } from "../../shared/hooks/useProviders.jsx";
import "./ProviderForm.css";

export const ProviderForm = ({ onSave, initialData }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const { createProvider, editProvider } = useProviders();

    // Cargar los datos iniciales cuando se edita un proveedor
    useEffect(() => {
        if (initialData?.name) setName(initialData.name);
        if (initialData?.email) setEmail(initialData.email);
        if (initialData?.phone) setPhone(initialData.phone);
    }, [initialData]);

    // Manejar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        // Si el formulario no tiene errores, se pasa directamente los datos
        if (initialData) {
            // Editar proveedor
            editProvider({ name, email, phone }, initialData.uid);
        } else {
            // Crear proveedor
            createProvider({ name, email, phone });
        }

        // Limpiar el formulario y notificar a la página principal
        setName("");
        setEmail("");
        setPhone("");
        onSave();
    };

    return (
        <form onSubmit={handleSubmit} className="provider-form">
            <h2 className="text-2xl font-bold text-[#134BF2]">
                {initialData ? "Editar proveedor" : "Agregar nuevo proveedor"}
            </h2>

            <div>
                <label htmlFor="providerName" className="block font-semibold mb-1 text-[#134BF2]">
                    Nombre del proveedor:
                </label>
                <input
                    id="providerName"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Ej. Fedex, DHL..."
                    className="w-full border border-[#B8BBBF] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1BA0F2] bg-white shadow-sm transition"
                />
            </div>

            <div>
                <label htmlFor="providerEmail" className="block font-semibold mb-1 text-[#134BF2]">
                    Correo del proveedor:
                </label>
                <input
                    id="providerEmail"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="correo@ejemplo.com"
                    className="w-full border border-[#B8BBBF] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1BA0F2] bg-white shadow-sm transition"
                />
            </div>

            <div>
                <label htmlFor="providerPhone" className="block font-semibold mb-1 text-[#134BF2]">
                    Teléfono del proveedor:
                </label>
                <input
                    id="providerPhone"
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    placeholder="Ej. 1234567890"
                    className="w-full border border-[#B8BBBF] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1BA0F2] bg-white shadow-sm transition"
                />
            </div>

            <button
                type="submit"
                className={`text-white font-semibold px-6 py-2 rounded-lg shadow-md transition-transform duration-300 hover:scale-105
                 ${initialData
                        ? "bg-[#0C87F2] hover:bg-[#1BA0F2]"
                        : "bg-[#134BF2] hover:bg-[#0C87F2]"
                    }`}
            >
                {initialData ? "Actualizar proveedor" : "Agregar proveedor"}
            </button>
        </form>
    );
};