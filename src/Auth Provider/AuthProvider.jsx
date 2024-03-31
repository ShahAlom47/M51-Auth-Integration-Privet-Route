import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import auth from "../firebase.config";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

export const AuthContext = createContext(null);

const AuthProvider = ({children}) => {

const [user, setUser]=useState(null);
const [loading,setLoading]=useState(true)

const creaeUser = (email,password)=>{
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
}
const loginUser = (email,password)=>{
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
}

const LogOut=()=>{
    setLoading(true)
    signOut(auth)
      
}

useEffect(()=>{
   const unSubscribe = onAuthStateChanged(auth, (CurrenUser) => {
        setUser(CurrenUser)
        setLoading(false)
        console.log(CurrenUser);
        
      });
      
      return ()=>unSubscribe();
},[])

// if(!user)

const authInfo= {user,creaeUser,loginUser,LogOut,loading}

    return (
        <AuthContext.Provider value={authInfo} >
            {children}
        </AuthContext.Provider >
            
        
    );
};

export default AuthProvider;
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}