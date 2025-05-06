export const ProviderTable = ({ providers, onEdit, onDelete }) => {
    if (!providers?.length) {
        return <p className="text-gray-500">No hay proveedores registrados.</p>;
    }

    return (
        <table className="w-full border mt-4">
            <thead>
                <tr className="bg-gray-100">
                    <th className="p-2 border">Nombre</th>
                    <th className="p-2 border">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {providers.map((prov) => (
                    <tr key={prov.id} className="text-center">
                        <td className="p-2 border">{prov.name}</td>
                        <td className="p-2 border space-x-2">
                            <button
                                onClick={() => onEdit(prov)}
                                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => onDelete({ id: prov.id })}
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