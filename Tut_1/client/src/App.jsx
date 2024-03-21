import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Component/Login/Login'
import Signup from './Component/Signup/Signup'
import Home from './Component/Home/Home'
import LoginTest from './LoginTest'
import Welcome from './Welcome'


const App = () => {

  const [user, setUser] = useState(null);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };
  return (
    <div>
      {/* <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}  />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/home" element={<Home/>} />
        </Routes>
      
      </BrowserRouter> */}

      <div>
      {!user ? (
        <LoginTest onLoginSuccess={handleLoginSuccess} />
      ) : (
        <Welcome user={user} />
      )}
    </div>
    </div>
  )
}

export default App
