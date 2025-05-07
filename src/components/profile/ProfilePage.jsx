import { useState } from "react";
import { updateUser } from "../../services";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ProfileForm from "./ProfileForm";
import LogoutButton from "./LogoutButton";
import ProfileCard from "./ProfileCard";

export const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const handleUpdate = async (formData) => {
    const response = await updateUser(formData, user.uid);

    if (response.error) {
      return toast.error("Error al actualizar el perfil");
    }

    const updatedData = response.data;
    const newUser = { ...user, ...updatedData };
    localStorage.setItem("user", JSON.stringify(newUser));
    setUser(newUser);

    toast.success("Perfil actualizado correctamente");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast.success("Sesión cerrada");
    navigate("/login");
  };

  if (!user) return <p>No hay datos del usuario</p>;

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Mi Perfil</h2>
      <ProfileCard user={user} />
      <ProfileForm user={user} onSubmit={handleUpdate} />
      <LogoutButton onLogout={handleLogout} />
    </div>
  );
};

