import React from 'react'
import { useState } from 'react'
import {Regapi } from '../api/Authapi';
import "../scss/login.scss";


import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { Firestore, getuser } from '../api/firestore';

const  Registercomponent= () => {
    const navigate=useNavigate();
     const [credential,setCredential]=useState({
       name:"",
      email:"",
        password:""
    })
    const change=(e)=>{
        setCredential({
            ...credential,
            [e.target.name]:e.target.value
        })
    }
    
    const signup=async()=>{
      try{
const hlo=await Regapi(credential.email ,credential.password);
 const res= hlo.user;
localStorage.setItem('userEmail',hlo.user.email)
getuser(credential.name,credential.email)
 toast.success("successfully created!")
navigate('/home')

      }catch(error){
   toast.error("already exited account")
      }
    
    }
   
  return (
    
    <>
    <header style={{marginLeft:"30%",width:"100%",marginTop:"3%"}} >
        <h1 style={{fontWeight:500,fontSize:"25px"}}>Make The Most of Your Proffesional Life</h1>
    
    </header>
    <div className="classname">
    <input 
    type="text"
     placeholder="Name"
     name="name"
     onChange={change}
    />
    <input 
    type="email"
     placeholder="Email or Phone"
     name="email"
     onChange={change}
    />
    <input 
    type="password"
    placeholder=' Password'
    name="password"
    
    onChange={change}
 
    />
       <span style={{color:'#318CE7',marginRight:"200px"}}>Forget Password?</span>
    <button className='hlo' onClick={signup}>Agree & join</button>
  
</div>

</>
  )
}

export default Registercomponent