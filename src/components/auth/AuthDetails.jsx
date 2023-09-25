import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase';

import { onAuthStateChanged, signOut } from 'firebase/auth';
import './auth.css';
import { useNavigate } from 'react-router-dom';

const AuthDetails = () => {
  const [authUser, setAuthUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => {
      listen();
    };
  }, []);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        setAuthUser(null); // Clear the user state
        console.log("Sign out successful");
      })
      .catch((error) => {
        console.log(error);
      });
    navigate("/");
  };

  return (
    <div className='signout'>
      {authUser ? (
        <>
          {/* <p>{`Signed In as ${authUser.email}`}</p> */}
          <button onClick={userSignOut}>Log Out</button>
        </>
      ) : (
        <p><span></span>Signed Out</p>
      )}
    </div>
  );
};

export default AuthDetails;
