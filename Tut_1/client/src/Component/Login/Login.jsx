import React from 'react'
import './Login.scss'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const Login = () => {


  const [value, setValue] = useState({

    email: '',
    password: ''
  })


  const handleChange = (e) => {
setValue((prev)=>({...prev, [e.target.name]: e.target.value}))

 console.log("input",value);

  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("submit",value);

    try {
          const res = await axios.post("/login", value)


    } catch (error) {
      
    }
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
            <input onChange={handleChange} type="email" name="email" id="email" placeholder='Enter your email'/>
            </div>

            
            <div className='input'>
            <label htmlFor="password">Password</label><br />
            <input onChange={handleChange} type="password" name="password" id="password" placeholder='Enter your password'/>
            </div>

            <div id='remember'>
              <div>
              <input type="checkbox" name="remember me" />
              <label htmlFor="remember me">Remember Password</label> </div>
              <a href="#">Forgot Password?</a>
            </div>

          <Link to="/Home"><button onChange={handleSubmit} className='login'>Log in</button></Link>
            
          <Link to="/signup"><button className='signup'>Sign up</button></Link>  
          </div>

        </div>
      </div>
    </div>
  )
}

export default Login
