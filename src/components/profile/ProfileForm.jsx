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

    try {
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
          const response = await onSubmit(dataToSend);
          if (response?.error) {
            toast.error(response.msg || "Error al actualizar el perfil.");
          } else {
            toast.success("Perfil actualizado correctamente.");
          }
          setIsSubmitting(false);
        }
      }

      if (section === "password") {
        if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
          return toast.error("Todos los campos son obligatorios.");
        }

        if (formData.newPassword !== formData.confirmPassword) {
          return toast.error("Las contraseñas no coinciden.");
        }

        const dataToSend = {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        };

        if (window.confirm("¿Estás seguro de que deseas cambiar tu contraseña?")) {
          setIsSubmitting(true);
          const response = await onSubmit(dataToSend);
          if (response?.error) {
            toast.error(response.msg || "Error al cambiar la contraseña.");
          } else {
            toast.success("Contraseña actualizada correctamente.");
          }
          setIsSubmitting(false);
        }
      }
    } catch (error) {
      console.error("Error en el envío del formulario:", error);
      toast.error("Ocurrió un error. Intenta de nuevo.");
      setIsSubmitting(false);
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
