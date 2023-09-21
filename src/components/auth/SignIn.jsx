import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import './auth.css';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false); // New state for login success
  const navigate = useNavigate()
  useEffect(() => {
    setErrorMessage('');
  }, []);

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        // If the userCredential is present, login was successful
        if (userCredential) {
          setLoginSuccess(true);
          navigate("/grid")
        }
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/user-not-found':
            setErrorMessage('User not found. Please sign up.');
            break;
          case 'auth/wrong-password':
            setErrorMessage('Wrong email or password.');
            break;
          default:
            setErrorMessage('An error occurred. Please try again later.');
            break;
        }
        console.error(error);
      });
  };

  return (
    <div className="sign-in-container">
      <form onSubmit={signIn}>
        <h1>Log in to your account</h1>
        
        <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Log in</button>
        {loginSuccess ? (
          <p className="success-message">Login successful!</p>
        ) : (
          errorMessage && <p className="error-message">{errorMessage}</p>
        )}
      </form>
    </div>
  );
};

export default SignIn;
