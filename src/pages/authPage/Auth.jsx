import React from 'react'
import SignIn from '../../components/auth/SignIn'
// import SignUp from '../../components/auth/SignUp'
import img from "../../assets/img11.jpg"
// import AuthDetails from '../../components/auth/AuthDetails'
import "./auth.css"

const Auth = () => {
  return (
    <div className='section'>
      <div className='img'>
        <img src={img} width={800} height={730}/>
         </div>
        <div className='container'>
        <SignIn/>
        {/* <SignUp/> */}
        {/* <AuthDetails/> */}
        </div>
       
    </div>
  )
}

export default Auth