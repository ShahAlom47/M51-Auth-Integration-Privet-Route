// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBE5Hw0I5UYPNmoOBMoNRZ8aax0m8x3hD0",
  authDomain: "auth-integration-privet-85dc5.firebaseapp.com",
  projectId: "auth-integration-privet-85dc5",
  storageBucket: "auth-integration-privet-85dc5.appspot.com",
  messagingSenderId: "465017639090",
  appId: "1:465017639090:web:c21152aae05908c23339ab"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth ;
