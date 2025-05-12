import { useState, useEffect } from "react";
import { useRegister } from "../../shared/hooks/useRegister.jsx";
import { useUsers } from "../../shared/hooks/useUser.jsx";

export const UserForm = ({ initialData, onFinish }) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("USER_ROLE"); // Valor predeterminado

    const { register, isLoading: isRegistering } = useRegister();
    const { editUser, getUsers, isLoading: isUpdating } = useUsers();

    useEffect(() => {
        if (initialData) {
            setUsername(initialData.username || "");
            setEmail(initialData.email || "");
            setRole(initialData.role || "USER_ROLE");
        } else {
            setUsername("");
            setEmail("");
            setRole("USER_ROLE");
        }
    }, [initialData]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = { username, email, role };

        if (initialData) {
            // Editar usuario existente
            await editUser(userData, initialData.id);
        } else {
            // Crear un nuevo usuario
            await register(email, password, username, role);
        }

        // Limpiar el formulario después de guardar
        setUsername("");
        setEmail("");
        setPassword("");
        setRole("USER_ROLE");

        // Llamar a la función `onFinish` si se proporciona
        if (onFinish) onFinish(); // Ahora `onFinish` manejará la recarga de la tabla
    };

    const isLoading = isRegistering || isUpdating;

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 space-y-4">
            <div>
                <label className="block font-semibold mb-1">Nombre de usuario:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="w-full border px-3 py-2 rounded"
                />
            </div>

            <div>
                <label className="block font-semibold mb-1">Correo electrónico:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full border px-3 py-2 rounded"
                />
            </div>

            {!initialData && (
                <div>
                    <label className="block font-semibold mb-1">Contraseña:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>
            )}

            <div>
                <label className="block font-semibold mb-1">Rol:</label>
                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                >
                    <option value="USER_ROLE">Usuario</option>
                    <option value="ADMIN_ROLE">Administrador</option>
                </select>
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                {initialData ? "Actualizar" : "Crear"} usuario
            </button>
        </form>
    );
};
