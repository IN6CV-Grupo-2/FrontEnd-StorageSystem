import { useState, useEffect } from "react";

export const CustomerForm = ({ onSave, initialData }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [dpi, setDpi] = useState("");

    useEffect(() => {
        if (initialData?.name) {
        setName(initialData.name);
        }
        if (initialData?.email) {
        setEmail(initialData.email);
        }
        if (initialData?.phone) {
        setPhone(initialData.phone);
        }
        if (initialData?.address) {
        setAddress(initialData.address);
        }
        if (initialData?.dpi) {
        setDpi(initialData.dpi);
        }
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ name, email, phone, address, dpi });
        setName("");
        setEmail("");
        setPhone("");
        setAddress("");
        setDpi("");
    };

    return (
        <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow mb-6 space-y-4"
        >
        <div>
            <div>
                <label htmlFor="customerName" className="block font-semibold mb-1">
                Nombre del cliente:
                </label>
                <input
                id="customerName"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Ej. Juan Gabriel"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                />
            </div>

            <div>
                <label htmlFor="customerEmail" className="block font-semibold mb-1">
                Correo del cliente:
                </label>
                <input
                id="customerEmail"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="ejemplo@correo.com"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label htmlFor="customerPhone" className="block font-semibold mb-1">
                Telefono del cliente:
                </label>
                <input
                id="customerPhone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                placeholder="Ej. +502 1234 5678"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label htmlFor="customerAddress" className="block font-semibold mb-1">Dirección:</label>
                <input
                  id="customerAddress"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Ej. calle x, zona x, ciudad x"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                />
            </div>

            <div>
                <label htmlFor="customerDpi" className="block font-semibold mb-1">DPI (opcional):</label>
                <input
                  id="customerDpi"
                  type="text"
                  value={dpi}
                  onChange={(e) => setDpi(e.target.value)}
                  placeholder="Ej. 1234 5678 9012"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
        </div>
        
        <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
            {initialData ? "Actualizar" : "Agregar"} cliente
        </button>
        </form>
    );
};