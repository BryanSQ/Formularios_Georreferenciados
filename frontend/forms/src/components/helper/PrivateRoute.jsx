import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { isLoggedIn } from '../../services/userServices';

const PrivateRoute = ({ children }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await isLoggedIn();
        console.log(response);
        setAuth(response);
      } catch (error) {
        console.error('Error al verificar la sesión:', error);
        setAuth(false);
      }
    };

    checkAuth();
  }, []);

  if (auth === null) {
    return <div>Cargando...</div>; 
  }

  return auth ? children : <Navigate to="/login" />;
};

export default PrivateRoute;