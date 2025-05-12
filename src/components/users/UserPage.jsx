import { useEffect, useState } from "react";
import { useUsers } from "../../shared/hooks/useUsers.jsx";
import { UserTable } from "./UserTable.jsx";
import { useRegister } from "../../shared/hooks/useRegister.jsx";

export const UserPage = () => {
  const { users, getUsers, editUser, removeUser, isLoading } = useUsers();
  const { register } = useRegister(getUsers);  // Pasamos getUsers al hook useRegister

  const [editingUser, setEditingUser] = useState(null);
  const [username, setUsername] = useState(""); 
  const [email, setEmail] = useState(""); 

  useEffect(() => {
    getUsers(); 
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = { username, email };

    if (editingUser) {
      await editUser(userData, editingUser.id);
    } else {
      await register(email, "password123", username);  
    }

    setEditingUser(null);
    setUsername("");
    setEmail("");
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setUsername(user.username);
    setEmail(user.email);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Gestión de Usuarios</h1>

      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          placeholder="Nombre del usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="border p-2 rounded w-full mb-2"
        />
        <input
          type="email"
          placeholder="Correo del usuario"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border p-2 rounded w-full mb-2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editingUser ? "Actualizar" : "Agregar"} Usuario
        </button>
      </form>

      {isLoading ? (
        <p>Cargando usuarios...</p>
      ) : (
        <UserTable
          users={users}
          onEdit={handleEdit}
          onDelete={removeUser}
        />
      )}
    </div>
  );
};
