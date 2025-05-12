export const CategoryTable = ({ categories, onEdit, onDelete }) => {
    if (!categories?.length) {
        return <p className="text-gray-500">No hay categorías registradas.</p>;
    }

    return (
        <table className="w-full border mt-4">
            <thead>
                <tr className="bg-gray-100">
                    <th className="p-2 border">Nombre</th>
                    <th className="p-2 border">Descripción</th>
                    <th className="p-2 border">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {categories.map((cat) => (
                    <tr key={cat.uid || cat.id} className="text-center">
                        <td className="p-2 border">{cat.name}</td>
                        <td className="p-2 border">{cat.description || 'Sin descripción'}</td>
                        <td className="p-2 border space-x-2">
                            <button
                                onClick={() => onEdit(cat)}
                                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => {
                                    console.log("ID de la categoría a eliminar:", cat.id || cat.uid);
                                    onDelete(cat.id || cat.uid);
                                }}
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
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
