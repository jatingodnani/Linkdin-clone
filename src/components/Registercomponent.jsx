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
      if(credential.name!=""){
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
      else{
        toast.error("Enter all detail!")
      }
    }
   
  return (
    
    <>
    <header style={{marginLeft:"33%",marginTop:"3%"}} >
        <h1 style={{fontWeight:500,fontSize:"25px",marginBottom:"10px"}}>Make The Most of Your Proffesional Life</h1>
    
    </header>
    <div className="classname2">
    <label htmlFor='name'>Name</label>
    <input 
    type="text"
    id="name"
     placeholder="Name"
     name="name"
     onChange={change}
     required
    />
     <label htmlFor='ema'>Email</label>
    <input 
    type="email"
     placeholder="Email or Phone"
     name="email"
     onChange={change}
    />
    <label htmlFor='pass'>Password</label>
    <input 
    type="password"
    placeholder=' Password'
    name="password"
    onChange={change}
 
    />
      
    <button className='hlo' onClick={signup}>Agree & join</button>
    </div>
    <div className="footer1">
   

    <p > Are You Already Sign-in?<Link to="/" className='join'>
    Login-now</Link></p>
   </div>
   


</>
  )
}

export default Registercomponent