import { useState, useEffect } from "react";

export const ProviderForm = ({ onSave, initialData }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        if (initialData?.name) {
            setName(initialData.name);
        }
        if(initialData?.email){
            setEmail(initialData.email);
        }
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ name, email });
        setName("");
        setEmail("")
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-4 rounded shadow mb-6 space-y-4"
        >
            <div>
                <label htmlFor="providerName" className="block font-semibold mb-1">
                    Nombre del proveedor:
                </label>
                <label htmlFor="providerEmail" className="block font0semibold mb-1">
                    Correo del Proveedor
                </label>
                <input
                    id="providerName"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Ej. Distribuidora X"
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    id="providerEmail"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Example@example.com"
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    
            </div>

            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
                {initialData ? "Actualizar" : "Agregar"} proveedor
            </button>
        </form>
    );
};