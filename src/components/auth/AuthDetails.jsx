import React, {useEffect, useState} from 'react'
import { auth } from '../../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import "./auth.css"

const AuthDetails = () => {

   const [authUser, setAuthUser] = useState(null);

   useEffect(()=>{
     const listen = onAuthStateChanged(auth, (user) => {
         if(user){
            setAuthUser(user)
         }else{
            setAuthUser(null)
         }
     });
     
     return () => {
        listen()
     }

   }, []);

   const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("sign out successful");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  

  return (
    <div className='signout'>{authUser ?<> <p>{`Signed In as ${authUser.email}`}</p><button onClick={userSignOut}>Signed OUt</button></> : <p>Signed Out</p>}</div>
  )
}

export default AuthDetails