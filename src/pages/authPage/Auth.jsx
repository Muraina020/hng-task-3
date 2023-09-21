import React from 'react'
import SignIn from '../../components/auth/SignIn'
import SignUp from '../../components/auth/SignUp'
import AuthDetails from '../../components/auth/AuthDetails'
import "./auth.css"

const Auth = () => {
  return (
    <div className='section'>
        <div className='container'>
        <SignIn/>
        <SignUp/>
        <AuthDetails/>
        </div>
    </div>
  )
}

export default Auth