import React, { useEffect, useMemo,useState } from 'react'
import Topbar from '../components/Topbar'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../firebaseconfig';
import { useNavigate } from 'react-router';
import { Makepost } from '../assets1/makepost';
import { getdetail } from '../api/firestore';



export const Home = () => {
  const navigate=useNavigate();
  useEffect(()=>{
    return(onAuthStateChanged(auth,(user)=>{
    if(!user?.accessToken){
        console.log("hlo")
        navigate('/')
      }
    
     }))
    })
    
    
    const [detail,setdetail]=useState([]);

    useMemo(()=>{
      getdetail(setdetail)
    },[])

  return <div className='home' style={{display:"relative",zIndex:'1'}}>
  <Topbar detail={detail}/>
  <Makepost detail={detail} />
  </div>
    

  }

