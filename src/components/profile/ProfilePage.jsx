import { useEffect, useState } from "react";
import { getUserProfile, updateUser } from "../../services/api.jsx";
import toast from "react-hot-toast";
import ProfileCard from "./ProfileCard";
import ProfileForm from "./ProfileForm";
import { useNavigate } from "react-router-dom";
import LogoutButton from "./LogoutButton";

export const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getUserProfile();
        if (response.error) {
          toast.error("Error al cargar el perfil.");
          navigate("/"); // Redirigir a la página principal si no se puede cargar el perfil
          return;
        }
        setUser(response.data.user);
      } catch (error) {
        toast.error("Error al cargar el perfil.");
        navigate("/"); // Redirigir a la página principal si ocurre un error
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleUpdateProfile = async (formData) => {
    try {
      const response = await updateProfile(formData);
      if (response.error) {
        toast.error(response.msg || "Error al actualizar el perfil.");
        return;
      }
      toast.success("Perfil actualizado correctamente.");

      const updatedUser = response.user;
      setUser((prev) => ({
        ...prev,
        username: updatedUser.username || prev.username,
        email: updatedUser.email || prev.email,
      }));
    } catch (error) {
      toast.error("Error al actualizar el perfil.");
    }
  };

  const handleUpdatePassword = async (formData) => {
    try {
      const response = await updateProfile(formData);
      if (response.error) {
        toast.error(response.msg || "Error al cambiar la contraseña.");
        return;
      }
      toast.success("Contraseña actualizada correctamente.");
    } catch (error) {
      toast.error("Error al cambiar la contraseña.");
    }
  };

  const handleLogout = () => {
    if (window.confirm("¿Estás seguro de que deseas cerrar sesión?")) {
      localStorage.removeItem("user");
      window.location.href = "/auth"; // Redirigir al login
    }
  };

  if (!user) return <p>Cargando datos del usuario...</p>;

  return (
    <div className="profile-container">
      <h2 className="profile-title">Mi Perfil</h2>
      <ProfileCard user={user} />
      <div className="profile-sections">
        <ProfileForm
          user={user}
          onSubmit={handleUpdateProfile}
          section="profile"
        />
        <ProfileForm
          user={user}
          onSubmit={handleUpdatePassword}
          section="password"
        />
      </div>
      <div className="logout-container">
        <LogoutButton onLogout={handleLogout} />
      </div>
    </div>
  );
};

