// Login.js

import React, { useState } from 'react';
import './Login.scss';
import { Link, Navigate } from 'react-router-dom'; // Import Navigate instead of Redirect
import axios from 'axios';

const Login = () => {
  const [value, setValue] = useState({
    username: '',
    password: ''
  });
  const [response, setResponse] = useState(null);
  const [redirect, setRedirect] = useState(false);

  const handleChange = (e) => {
    setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/login", value);
      setResponse(res.data);
      setRedirect(true); // Redirect the user after successful login
    } catch (error) {
      console.log(error);
    }
  };

  if (redirect) {
    return <Navigate to={{ pathname: "/home", state: { userData: response } }} />; // Use Navigate instead of Redirect
  }

  return (
    <div>
      <div className="main">
        <div className="left">
          <div>
            <h1 className='welcome'>Welcome to Family Tree</h1>
            <h1 className='app'>Application</h1>
          </div>
        </div>
        <div className="right">
          <div className="box">
            <div className="hed">
              <h3>Log in to your account</h3>
              <p>Welcome back! Please enter your details.</p>
            </div>
            <div className='input'>
              <label htmlFor="email">Email</label><br />
              <input onChange={handleChange} type="text" name="username" id="email" placeholder='Enter your username' />
            </div>
            <div className='input'>
              <label htmlFor="password">Password</label><br />
              <input onChange={handleChange} type="password" name="password" id="password" placeholder='Enter your password' />
            </div>
            <div id='remember'>
              <div>
                <input type="checkbox" name="remember me" />
                <label htmlFor="remember me">Remember Password</label> </div>
              <a href="#">Forgot Password?</a>
            </div>
            <button type='submit' onClick={handleSubmit} className='login'>Log in</button>
            <Link to="/signup"><button className='signup'>Sign up</button></Link>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Login;
