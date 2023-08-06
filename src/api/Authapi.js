import {signInWithEmailAndPassword,createUserWithEmailAndPassword} from "firebase/auth"
import { getRedirectResult} from "firebase/auth";

import { auth } from "../../firebaseconfig";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";


export const Authapi = (email,password) => {
try{
   return signInWithEmailAndPassword(auth,email,password) 
}catch(error) {
    return error;
    // ..
  };
}
export const  Regapi = (email,password) => {
try{
  return   createUserWithEmailAndPassword(auth,email,password)
}catch(error){
  return error
}

 
 
}
export const Signout=()=>{
  try{
    return  signOut(auth)
    }
    catch(error){
      return error
    }
}
