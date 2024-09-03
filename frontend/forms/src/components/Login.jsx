import { useState } from 'react';
import './styles/Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const login = (event) => {
    event.preventDefault();
    console.log('Logging in');
    const data = {
      username: username,
      password: password
    }
    setUsername('');
    setPassword('');
    console.log(data);
  }	
    return (
      <div className='main-login'>
        <h1>Iniciar sesión</h1>
        <form onSubmit={login}>
          <div>
            <label htmlFor="username">Username</label>
            <br />
            <input type="username" id="username" name="username" value={username} onChange={handleUsernameChange} />
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