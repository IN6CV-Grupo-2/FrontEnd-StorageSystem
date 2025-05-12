import { useState, useEffect } from "react";

export const CategoryForm = ({ onSave, initialData }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setDescription(initialData.description || "");
    } else {
      setName("");
      setDescription("");
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos enviados desde el formulario:", { name, description });
    onSave({ name, description });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        type="text"
        placeholder="Nombre de la categoría"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full border px-2 py-1"
      />
      <input
        type="text"
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border px-2 py-1"
      />
      <div className="flex gap-2">
        <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded">
          {initialData ? "Actualizar" : "Guardar"}
        </button>
        {initialData && (
          <button
            type="button"
            onClick={() => {
              setName("");
              setDescription("");
              onSave(null);
            }}
            className="bg-red-500 text-white px-4 py-1 rounded"
          >
            Cancelar edición
          </button>
        )}
      </div>
    </form>
  );
};
