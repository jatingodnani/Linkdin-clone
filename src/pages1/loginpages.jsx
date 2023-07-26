import React, { useEffect } from 'react'
import LoginCompo from '../components/logincompo'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebaseconfig';
import { useNavigate } from 'react-router';

export const Login = () => {
    const navigate=useNavigate();
    useEffect(()=>{
      console.log("hii")
     return(onAuthStateChanged(auth,(user)=>{
        if(user?.accessToken){
          console.log("hlo")
          navigate('/home')
        }
      
       }))
      })
  return (
    <>
<LoginCompo />
    </>
  )
}
