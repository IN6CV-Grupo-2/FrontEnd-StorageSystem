import { useState, useEffect } from "react";
import { useRegister } from "../../shared/hooks/useRegister";
import { useUsers } from "../../shared/hooks/useUser"; // asegurarse de que este hook esté correcto

export const UserForm = ({ initialData, onFinish }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { register, isLoading: isRegistering } = useRegister();
  const { updateUser, isLoading: isUpdating } = useUsers();

  useEffect(() => {
    if (initialData) {
      setUsername(initialData.username || "");
      setEmail(initialData.email || "");
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (initialData) {
      // Modo edición: actualizar usuario
      await updateUser({ username, email }, initialData.id);
    } else {
      // Modo creación: registrar nuevo usuario
      await register(email, password, username);
    }

    // Limpiar campos y notificar finalización
    setUsername("");
    setEmail("");
    setPassword("");
    if (onFinish) onFinish(); // útil para resetear edición en la página
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
