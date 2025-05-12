import perfilImg from "../../assets/img/MeIcon.png";

const ProfileCard = ({ user }) => {
  return (
    <div className="profile-card">
      <img
        src={perfilImg}
        alt="Perfil"
        className="profile-image"
      />
      <div className="profile-details">
        <h2 className="profile-username">{user.username}</h2>
        <p className="profile-email">{user.email}</p>
      </div>
    </div>
  );
};

export default ProfileCard;
