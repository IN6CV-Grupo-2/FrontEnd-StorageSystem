export const CustomerTable = ({ customers, onEdit, onDelete }) => {
    if (!customers?.length) {
        return <p className="text-gray-500">No hay clientes registrados.</p>;
    }

    return (
        <table className="w-full border mt-4">
            <thead>
                <tr className="bg-gray-100">
                    <th className="p-2 border">Nombre</th>
                    <th className="p-2 border">Correo electrónico</th>
                    <th className="p-2 border">Teléfono</th>
                </tr>
            </thead>
            <tbody>
                {customers.map((cust) => (
                    <tr key={cust.id} className="text-center">
                        <td className="p-2 border">{cust.name}</td>
                        <td className="p-2 border">{cust.email}</td>
                        <td className="p-2 border">{cust.phone}</td>
                        <td className="p-2 border space-x-2">
                            <button
                                onClick={() => onEdit(cust)}
                                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => onDelete({ id: cust.id })}
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