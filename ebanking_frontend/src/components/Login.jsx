import React, { useEffect, useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ setIsLoggedIn, setRole }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    localStorage.removeItem('token');
    setRole(null);
    setIsLoggedIn(false)
  }, [])

  const login = () => {
    const userData = {
      username,
      password
    };

    axios({
      method: 'post',
      url: '/api/v1/auth/login',
      baseURL: 'http://localhost:8080',
      data: userData
    }).then((response) => {
      console.log(response);
      
      localStorage.setItem('token', response.data.token)
      setIsLoggedIn(true)
      setRole(response.data.role)
      localStorage.setItem('role', response.data.role)
      navigate('/account')
    }, (error) => {
      console.log(error);
      alert(error)
      // setPoruka("Neispravno korisnicko ime ili sifra!");
    })
  };
  return (
    <div className="login">
      <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" style={{width:'200px'}} onChange={(event) => setUsername(event.target.value)}/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" style={{width:'200px'}} onChange={(event) => setPassword(event.target.value)}/>
        </div>
        <button onClick={() => login()}>Submit</button>
    </div>
  );
};

export default Login;
