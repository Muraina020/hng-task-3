// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4WDNbT3Uq2KAbvmMIiVt9BL_gC0iyotU",
  authDomain: "authentication-e465c.firebaseapp.com",
  projectId: "authentication-e465c",
  storageBucket: "authentication-e465c.appspot.com",
  messagingSenderId: "847070313291",
  appId: "1:847070313291:web:93ad1ede287cc6c40c86ce",
  measurementId: "G-L9QVHSD30Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authenticationy

export const auth = getAuth(app);