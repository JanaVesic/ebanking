import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [ime, setIme] = useState('');
  const [prezime, setPrezime] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('KORISNIK');
  const [poruka, setPoruka] = useState('');

  const roles = ['KORISNIK', 'ADMIN'];
  const register = () => {
    const userData = {
      ime,
      prezime,
      username,
      email,
      password,
      role
    };

    axios({
      method: 'post',
      url: '/api/v1/auth/register',
      baseURL: 'http://localhost:8080',
      data: userData
    }).then((response) => {
      console.log(response);
      localStorage.setItem('token', response.data.token);
      
      localStorage.setItem('token', response.data.token)
      navigate('/createAccount')
    }, (error) => {
      console.log(error);
      // alert(error)
      setPoruka(error.response.data);
    })
  };


  return (
    <div className="register">
      <h2>Register</h2>
        <div className="form-row">
        <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" onChange={(event) => setUsername(event.target.value)}/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" onChange={(event) => setPassword(event.target.value)}/>
          </div>
        </div>
        <div className="form-row">
        <div className="form-group">
            <label htmlFor="fullName">Ime:</label>
            <input type="text" id="fullName" onChange={(event) => setIme(event.target.value)}/>
          </div>
          <div className="form-group">
            <label htmlFor="prezime">Prezime:</label>
            <input type="prezime" id="prezime" onChange={(event) => setPrezime(event.target.value)}/>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" onChange={(event) => setEmail(event.target.value)}/>
          </div>
          <div className="form-group">
          <label htmlFor="role">Role:</label>
            <select
              id="role"
              value={role}
              onChange={(event) => setRole(event.target.value)}
            >
              {roles.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-row">
          
          <div className="form-group">
            <Link to="/login">Already have an account? Log in</Link>
          </div>
        </div>
        <button onClick={() => register()}>Register</button>
        <p style={{color: 'red'}}>{poruka}</p>
    </div>
  );
};

export default Register;
