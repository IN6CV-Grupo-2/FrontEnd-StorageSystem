import { useState, useEffect } from "react";

export const ProviderForm = ({ onSave, initialData }) => {
    const [name, setName] = useState("");

    useEffect(() => {
        if (initialData?.name) {
            setName(initialData.name);
        }
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ name });
        setName("");
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
                <input
                    id="providerName"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Ej. Distribuidora X"
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
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