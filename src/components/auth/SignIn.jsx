import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import "./auth.css";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSignUp, setIsSignUp] = useState(false); // New state for sign-up mode
  const [loginSuccess, setLoginSuccess] = useState(false); // New state for login success
  const navigate = useNavigate();

  useEffect(() => {
    setErrorMessage("");
  }, []);

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
  };

  const handleAuth = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage("Please provide both email and password.");
      return;
    }

    if (isSignUp) {
      // Sign up
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(userCredential);
          // Handle sign-up success here
          setLoginSuccess(true); // Automatically log in after successful sign-up
          navigate("/grid");
        })
        .catch((error) => {
          console.error(error);
          setErrorMessage("An error occurred. Please try again later.");
        });
    } else {
      // Sign in
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(userCredential);
          setLoginSuccess(true);
          navigate("/grid");
        })
        .catch((error) => {
          switch (error.code) {
            case "auth/user-not-found":
              setErrorMessage("User not found. Please sign up.");
              break;
            case "auth/wrong-password":
              setErrorMessage("Wrong email or password.");
              break;
            default:
              setErrorMessage("An error occurred. Please try again later.");
              break;
          }
          console.error(error);
        });
    }
  };

  return (
    <div className="sign-in-container">
      <img
        src="https://res.cloudinary.com/dg8os5pul/image/upload/v1695286237/The%20Image/gallery_dmc9hq.png"
        height={75}
        width={75}
      />
      <h2>Image gallery</h2>
      <h4>Your Favorite Image manager</h4>
      <div className="logreg">
        <span className={isSignUp ? "" : "active"} onClick={toggleMode}>
          Login
        </span>
        <span className={isSignUp ? "active" : ""} onClick={toggleMode}>
          Register
        </span>
      </div>
      <form onSubmit={handleAuth}>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="remember">
          <input type="checkbox" />
          <span>Remember me</span>
        </div>
        <button type="submit">{isSignUp ? "Sign Up" : "Login"}</button>
        {loginSuccess ? (
          <p className="success-message">Login successful!</p>
        ) : (
          errorMessage && <p className="error-message">{errorMessage}</p>
        )}
      </form>
    </div>
  );
};

export default Auth;
