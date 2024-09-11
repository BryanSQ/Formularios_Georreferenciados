import { useState } from 'react';
import './styles/Login.css';
import { login } from '../services/userServices';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const submitlogin = (event) => {
    event.preventDefault();
    //console.log('Logging in');
    const data = {
      email: email,
      password: password
    }
    login(data).then(() => {
      console.log('Logged in');
      setPassword('');
      setEmail('');
    }).catch((error) => {
      console.error('Error logging in', error);
    });
  }

  return (
      <div className='main-login'>
        <h1>Iniciar sesión</h1>
        <form onSubmit={submitlogin}>
          <div>
            <label htmlFor="email">Email</label>
            <br />
            <input type="email" id="email" name="email" value={email} onChange={handleEmailChange} />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <br />
            <input type="password" id="password" name="password" value={password} onChange={handlePasswordChange} />
          </div>
          <button type="submit">Iniciar sesión</button>
        </form>
      </div>
    );
}

export default Login;