import { useState, useEffect } from 'react';

const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('user');
    window.location.href = '/'; // o redirige al login si existe
  };

  return { user, logout, setUser };
};

export default useAuth;
