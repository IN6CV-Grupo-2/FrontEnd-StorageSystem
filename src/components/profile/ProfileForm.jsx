import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const ProfileForm = ({ user, onSubmit, section }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user && section === "profile") {
      setFormData((prev) => ({
        ...prev,
        username: user.username || "",
        email: user.email || "",
      }));
    }
  }, [user, section]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (section === "profile") {
      if (!formData.username.trim() || !formData.email.trim()) {
        return toast.error("Todos los campos son obligatorios.");
      }

      const dataToSend = {
        username: formData.username,
        email: formData.email,
      };

      if (window.confirm(`¿Estás seguro de que deseas actualizar tu nombre de usuario a "${formData.username}"?`)) {
        setIsSubmitting(true);
        await onSubmit(dataToSend);
        setIsSubmitting(false);
      }
    }

    if (section === "password") {
      if (!formData.newPassword || !formData.confirmPassword) {
        return toast.error("Todos los campos son obligatorios.");
      }

      if (formData.newPassword !== formData.confirmPassword) {
        return toast.error("Las contraseñas no coinciden.");
      }

      const dataToSend = {
        password: formData.newPassword,
      };

      if (window.confirm("¿Estás seguro de que deseas cambiar tu contraseña?")) {
        setIsSubmitting(true);
        await onSubmit(dataToSend);
        setIsSubmitting(false);
      }
    }
  };

  const handleUpdateProfile = async (formData) => {
    try {
      console.log("Datos enviados al backend para actualizar el perfil:", formData); // Verificar los datos enviados
      const response = await updateProfile(formData); // Usar updateProfile para actualizar el perfil
      console.log("Respuesta del backend al actualizar el perfil:", response); // Verificar la respuesta del backend
  
      if (response.error) {
        toast.error(response.msg || "Error al actualizar el perfil.");
        return;
      }
      toast.success("Perfil actualizado correctamente.");
  
      // Actualizar el estado del usuario con los datos más recientes del backend
      const updatedUser = response.data.user; // Asegúrate de que el backend devuelva el usuario actualizado
      setUser((prev) => ({
        ...prev,
        username: updatedUser.username || prev.username,
        email: updatedUser.email || prev.email,
      }));
    } catch (error) {
      console.error("Error al actualizar el perfil en el frontend:", error.message);
      toast.error("Error al actualizar el perfil.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="profile-form">
      {section === "profile" && (
        <>
          <div className="form-group">
            <label>Nombre de usuario:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="form-control"
              placeholder="Ingresa tu nuevo nombre de usuario"
            />
          </div>
          <div className="form-group">
            <span className="profile-email">{formData.email}</span>
          </div>
        </>
      )}
      {section === "password" && (
        <>
          <div className="form-group">
            <label>Contraseña actual:</label>
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              className="form-control"
              placeholder="Ingresa tu contraseña actual"
            />
          </div>
          <div className="form-group">
            <label>Nueva contraseña:</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="form-control"
              placeholder="Ingresa tu nueva contraseña"
            />
          </div>
          <div className="form-group">
            <label>Confirmar nueva contraseña:</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="form-control"
              placeholder="Confirma tu nueva contraseña"
            />
          </div>
        </>
      )}
      <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
        {section === "profile" ? "Actualizar Perfil" : "Cambiar Contraseña"}
      </button>
    </form>
  );
};

export default ProfileForm;
