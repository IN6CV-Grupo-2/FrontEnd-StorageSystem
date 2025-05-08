import { useState, useEffect } from "react";
import { useProviders } from "../../shared/hooks/useProviders.jsx";
import "./ProviderForm.css";

export const ProviderForm = ({ onSave, initialData, onCancel }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const { createProvider, editProvider } = useProviders();

    useEffect(() => {
        if (initialData?.name) setName(initialData.name);
        if (initialData?.email) setEmail(initialData.email);
        if (initialData?.phone) setPhone(initialData.phone);
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (initialData) {
            editProvider({ name, email, phone }, initialData.uid);
        } else {
            createProvider({ name, email, phone });
        }

        setName("");
        setEmail("");
        setPhone("");
        onSave();
    };


    return (
        <form onSubmit={handleSubmit} className="provider-form">
            <h2 className="text-2xl font-bold text-[#134BF2]">
                {initialData ? "Edit supplier" : "Add new supplier"}
            </h2>

            <div>
                <label htmlFor="providerName" className="block font-semibold mb-1 text-[#134BF2]">

                    Supplier name:
                </label>
                <input
                    id="providerName"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="..."
                    className="w-full border border-[#B8BBBF] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1BA0F2] bg-white shadow-sm transition"
                />
            </div>

            <div>
                <label htmlFor="providerEmail" className="block font-semibold mb-1 text-[#134BF2]">
                    Supplier email:
                </label>
                <input
                    id="providerEmail"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="email@example.com"
                    className="w-full border border-[#B8BBBF] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1BA0F2] bg-white shadow-sm transition"
                />
            </div>

            <div>
                <label htmlFor="providerPhone" className="block font-semibold mb-1 text-[#134BF2]">
                    Provider's phone:
                </label>
                <input
                    id="providerPhone"
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    placeholder="+502 "
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
                {initialData ? "Update provider" : "Add supplier"}
            </button>

            <button
                type="button"
                onClick={onCancel}
                className="bg-gray-400 hover:bg-gray-500 text-white font-semibold px-6 py-2 rounded-lg transition"
            >
                Cancel
            </button>
        </form>
    );
};