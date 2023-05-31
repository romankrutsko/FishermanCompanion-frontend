import React, { useState } from 'react'
import LoginForm from '../components/auth/LoginForm'
import RegisterForm from '../components/auth/RegisterForm'

function Auth() {
  const [showLogin, setShowLogin] = useState(true)
  const authSwitchHandler = () => {
    setShowLogin(!showLogin)
  }
  return (
    <>
      {showLogin ? <LoginForm authSwitchHandler={authSwitchHandler} /> : <RegisterForm authSwitchHandler={authSwitchHandler} />}
    </>
  )
}

export default Auth