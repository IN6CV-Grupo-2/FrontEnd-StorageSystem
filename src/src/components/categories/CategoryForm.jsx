import { useState, useEffect } from "react";

export const CategoryForm = ({ onSave, initialData }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (initialData?.name) {
      setName(initialData.name);
    }
    if (initialData?.description) {
      setDescription(initialData.description);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ name, description });
    setName("");
    setDescription("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow mb-6 space-y-4"
    >
      <div>
        <label htmlFor="categoryName" className="block font-semibold mb-1">
          Nombre de la categoría:
        </label>
        <input
          id="categoryName"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Ej. Categoría X"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="categoryDescription" className="block font-semibold mb-1">
          Descripción de la categoría:
        </label>
        <input
          id="categoryDescription"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          placeholder="Ej. Productos de limpieza"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        {initialData ? "Actualizar" : "Agregar"} categoría
      </button>
    </form>
  );
};
