export const CategoryTable = ({ categories, onEdit, onDelete }) => {
    if (!categories?.length) {
        return <p className="text-gray-500">No hay categorias registradas.</p>;
    }

    return (
        <table className="w-full border mt-4">
            <thead>
                <tr className="bg-gray-100">
                    <th className="p-2 border">Nombre</th>
                    <th className="p-2 border">Descripcion</th>
                </tr>
            </thead>
            <tbody>
                {providers.map((cat) => (
                    <tr key={cat.id} className="text-center">
                        <td className="p-2 border">{cat.name}</td>
                        <td className="p-2 border space-x-2">
                            <button
                                onClick={() => onEdit(cat)}
                                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => onDelete({ id: cat.id })}
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