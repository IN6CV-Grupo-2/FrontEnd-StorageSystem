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

  const handleSave = (data) => {
    if (editingUser) {
      editUser(data, editingUser.id);
    }
    setEditingUser(null);
  };

  const handleEdit = (user) => setEditingUser(user);
  const handleDelete = (user) => removeUser({ id: user.id });

  const filteredUsers = searchTerm
    ? users.filter((usr) =>
        usr.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        usr.id.toString().includes(searchTerm)
      )
    : users;

  return (
    <div className="user-container">
      <h1 className="user-title">Gestión de Usuarios</h1>

      <UserForm onSave={handleSave} initialData={editingUser} /> {/* Asumí que UserForm existe */}

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
