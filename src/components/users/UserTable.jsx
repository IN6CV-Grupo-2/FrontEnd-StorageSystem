export const UserTable = ({ users, onEdit, onDelete }) => {
  console.log('Usuarios en UserTable:', users);

  if (!users?.length) {
    return <p className="text-gray-500">No hay usuarios registrados.</p>;
  }

  return (
    <table className="w-full border mt-4">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2 border">Nombre de usuario</th>
          <th className="p-2 border">Correo</th>
          <th className="p-2 border">Rol</th>
          <th className="p-2 border">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id} className="text-center">
            <td className="p-2 border">{user.username}</td>
            <td className="p-2 border">{user.email}</td>
            <td className="p-2 border">{user.role}</td>
            <td className="p-2 border space-x-2">
              <button
                onClick={() => onEdit(user)} // Pasar el usuario al formulario
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Editar
              </button>
              <button
                onClick={() => onDelete(user)} // Pasar el usuario completo
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

