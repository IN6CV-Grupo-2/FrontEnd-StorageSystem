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
          <th className="p-2 border">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={user.id || user.username || index} className="text-center">
            <td className="p-2 border">{user.username}</td>
            <td className="p-2 border space-x-2">
              <button
                onClick={() => onEdit(user)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Editar
              </button>
              <button
                onClick={() => onDelete({ id: user.id })}
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

