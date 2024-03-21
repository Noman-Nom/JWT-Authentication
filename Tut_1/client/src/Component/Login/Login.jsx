import React, { useState } from 'react';
import './Login.scss';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Login = () => {
  const [values, setValues] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate(); // useNavigate for redirection

  const handleChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: values.username,
          password: values.password,
        }),
      });

      const data = await response.json();
      if (response.status === 200) {
        alert('Logged in successfully');
        navigate('/home', { state: { username: values.username, isAdmin: data.isAdmin } });
      } else {
        alert(data.message || 'Failed to login');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>{/* Add form submission handler */}
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
              <label htmlFor="username">Username</label><br />
              <input onChange={handleChange} type="text" name="username" id="username" placeholder='Enter your username'/>
            </div>

            <div className='input'>
              <label htmlFor="password">Password</label><br />
              <input onChange={handleChange} type="password" name="password" id="password" placeholder='Enter your password'/>
            </div>

            {/* The rest of your component */}
            <button type="submit" className='login'>Log in</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
