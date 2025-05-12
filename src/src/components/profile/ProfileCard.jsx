import perfilImg from '../../assets/img/MeIcon.png';

const ProfileCard = ({ user }) => {
    return (
      <div className="bg-white shadow-md rounded-2xl p-4 flex items-center space-x-4 mb-6">
        <img
          src={perfilImg}
          alt="Perfil"
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h2 className="text-lg font-semibold">{user.username}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>
    );
  };
  
  export default ProfileCard;
  