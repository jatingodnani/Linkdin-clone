import React, { useState } from 'react'
import { Authapi } from '../api/Authapi';
import "../scss/login.scss";
import GoogleButton from 'react-google-button'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { Home } from '../pages1/home';

const auth=getAuth();
const provider= new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export default function LoginCompo(){
 const navigate=useNavigate()
    const [credential,setCredential]=useState({
        email:"",
        password:""
    })
    const change=(e)=>{
        setCredential({
            ...credential,
            [e.target.name]:e.target.value
        })
    }
    console.log(credential)
    const login=async()=>{
      try{
const hlo=await Authapi(credential.email ,credential.password);
console.log(hlo.user)

 localStorage.setItem('userEmail',hlo.user.email)
 toast.success("successfully sign to linkdin!");
navigate('/Home')
}catch(error){
   toast.error("pls check your credential")
      }
    
    }
    const hyy=async ()=>{
     
   
        try {
          const result = await signInWithPopup(auth,provider);
          const credential = GoogleAuthProvider.credential(result);
          const token = credential.accessToken;
          const user = result.user;
          localStorage.setItem('userEmail',hlo.user.email)
         toast.success("successful signed")
        } catch (error) {
          console.log("Error:", error);
        }
     
    
  }
  return (
    
    <>
    <header style={{marginLeft:"30%",width:"100%"}} >
    <h1 style={{fontWeight:500,fontSize:"25px"}}>Sign in</h1>
    <h4 style={{fontWeight:"lighter",marginTop:'-15px'}}>Stay updated on your professional world</h4>
    </header>
    <div className="classname">
    
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
    <button className='hlo' onClick={login}>Sign in</button>
 
    </div>
    <div className="footer">
    <div style={{width: "100%", height: "20px", textAlign: "center",marginBottom:"10px"}}>
  <span style={{fontSize: "16px", backgroundColor: "#F3F5F6",padding: "0 10px"}}>
    OR
  </span>
</div>
<div className="google" style={{width:"100%",marginTop:"10px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
    {/* <button name="google"onClick={(e)=>hyy(e)}>Sign with Goggle</button> */}
   <GoogleButton onClick={(e)=>hyy(e)}  style={{borderRadius:"15px",width:"80%",paddingLeft:"15px"}} />
    <p style={{marginRight:"100px",marginBottom:"15px"}}> Are You A New User?<Link to="/register" className='join'>Join now</Link></p>
 </div>
</div>
   
</>
  )
}

