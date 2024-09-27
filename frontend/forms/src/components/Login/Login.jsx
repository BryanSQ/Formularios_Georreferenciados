
import './Login.css';

import { login } from '../../services/userServices';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
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
    }    
  }

  return (
      <div className='main-login'>
        <h1>Iniciar sesión</h1>
        <form onSubmit={submitLogin}>
          <div>
            <label htmlFor="email">Email</label>            
            <input type="email" id="email" name="email"/>
          </div>
          <div>
            <label htmlFor="password">Password</label>            
            <input type="password" id="password" name="password"/>
          </div>
          <button type="submit">Iniciar sesión</button>
        </form>
      </div>
    );
};