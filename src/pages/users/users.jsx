import { useState, useEffect } from "react";
import { useUsers } from "../../shared/hooks/useUser.jsx";
import { UserForm } from "../../components/users/UserForm.jsx"; 
import { UserTable } from "../../components/users/UserTable.jsx"; 
import "./users.css";

const User = () => {
  const {
    users,
    isLoading,
    getUsers,
    editUser,
    removeUser,
  } = useUsers(); 

  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getUsers();
  }, []);

  const handleSave = async (data) => {
    if (editingUser) {
        if (window.confirm(`¿Estás seguro de que deseas actualizar al usuario "${editingUser.username}"?`)) {
            await editUser(data, editingUser.id); // Editar el usuario seleccionado
            await getUsers(); // Recargar la tabla después de confirmar la edición
        }
    } else {
        if (window.confirm("¿Estás seguro de que deseas agregar este usuario?")) {
            await register(data.email, data.password, data.username, data.role); // Crear un nuevo usuario
            await getUsers(); // Recargar la tabla después de confirmar el agregado
        }
    }
    setEditingUser(null); // Limpiar el estado de edición
  };

  const handleEdit = (user) => {
    setEditingUser(user); // Solo establece el usuario en edición
  };

  const handleDelete = (user) => {
    if (!user.id) {
        console.error("El ID del usuario es undefined:", user);
        return;
    }

    if (window.confirm(`¿Estás seguro de que deseas eliminar al usuario "${user.username}"?`)) {
        removeUser(user.id); // Enviar el ID al backend
    }
  };

  const filteredUsers = searchTerm
    ? users.filter((usr) =>
        usr.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (usr.id && usr.id.toString().includes(searchTerm))
    )
    : users;

  return (
    <div className="user-container">
      <h1 className="user-title">Gestión de Usuarios</h1>

      <UserForm onFinish={handleSave} initialData={editingUser} /> {/* Asumí que UserForm existe */}

      <input
        type="text"
        placeholder="Buscar usuario por nombre o ID"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="user-search"
      />

      {isLoading ? (
        <p className="text-gray-500">Cargando usuarios...</p>
      ) : (
        <UserTable
          users={filteredUsers} 
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default User;
