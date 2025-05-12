const LogoutButton = ({ onLogout }) => {
    return (
      <button onClick={onLogout} className="btn btn-danger">
        Cerrar Sesión
      </button>
    );
  };
  
  export default LogoutButton;
  