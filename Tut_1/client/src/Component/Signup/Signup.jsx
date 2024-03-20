import React from 'react'
import './Signup.scss'
import { Link } from 'react-router-dom'
import { useState } from 'react'


const Signup = () => {


  const [value, setValue] = useState({

    name: "",
    email: "",
    password: ""
  })


  const handleChange = (e) => {
    setValue((prev)=>({...prev, [e.target.name]: e.target.value}))
    console.log("input",value);
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
            <h3>Sign up to your account</h3>
            <p>Welcome back! Please enter your details.</p>
            </div>

            <div className='input'>
            <label htmlFor="name">Name</label><br />
            <input onChange={handleChange} type="email" name="name" id="name" placeholder='Enter your name'/>
            </div>


            <div className='input'>
            <label htmlFor="email">Email</label><br />
            <input onChange={handleChange} type="email" name="email" id="email" placeholder='Enter your email'/>
            </div>

            
            <div className='input'>
            <label htmlFor="password">Password</label><br />
            <input onChange={handleChange} type="password" name="password" id="password" placeholder='Enter your password'/>
            </div>

             
            <Link to="/"> <button className='login'>Create Account</button></Link>

          </div>

        </div>
      </div>
    </div>
  )
    
  
}

export default Signup
