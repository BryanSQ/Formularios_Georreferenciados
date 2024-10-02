
import './Login.css';

import { login } from '../../services/userServices';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo-UNED-vertical-siglas-azul.png';

export const Login = () => {
 // const [capsLockWarning, setCapsLockWarning] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const submitLogin = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    try{
      const response = await login(data);
      console.log(response);
      navigate('/admin');
    }
    catch(error){
      console.error(error);
      setErrorMessage(error.message);
    }    
  }

  const handleKeyDown = () => {
    setErrorMessage('');
  };

  return (
    <div className='main-login'>
      <img className='img' src={logo} alt='logo'/>
      <h1>Iniciar sesión</h1>
      <form onSubmit={submitLogin}>
        <div>
          <label className="input-label" htmlFor="email">Correo electrónico</label>
          <input type="email" id="email" name="email" onKeyDown={handleKeyDown}/>
        </div>
        <div>
          <label className="input-label" htmlFor="password">Contraseña</label>
          <input type="password" id="password" name="password" onKeyDown={handleKeyDown}/>
          {errorMessage && <p className='message-error'>{errorMessage}</p>}
        </div>
        <button className="login-button" type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
};    