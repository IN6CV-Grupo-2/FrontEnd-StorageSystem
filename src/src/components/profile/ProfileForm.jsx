import { useState } from "react";

const ProfileForm = ({ user, onSubmit }) => {
  if (!user) return <p>Cargando usuario...</p>;

  const [formData, setFormData] = useState({
    email: user.email,
    username: user.username,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <div className="mb-3">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label>Username actual: {user.username}</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <button type="submit" className="btn btn-primary">Actualizar</button>
    </form>
  );
};

export default ProfileForm;
