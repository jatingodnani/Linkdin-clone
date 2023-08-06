import React, { useEffect,useState } from 'react'
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import "../scss/Connection.scss"
import {getconnected,connectbyuser} from '../api/firestore'

const Connectioncard = ({user,currentuser}) => {
  const [connected,setconnected]=useState(false);
  
  const giveid =(user)=>{
    connectbyuser(user.id,currentuser[0]?.id);
   
  }
  useEffect(()=>{
   getconnected(user.id,currentuser[0]?.id,setconnected)
   
  },[user.id,currentuser[0]?.id])

  return connected?(<></>):(
    <div className="connecters" style={{display:connected?"none":"block"}} >
    <img className="image" src={user.url} />     
    <p className="name">{user.name}</p>
    <p className="headline">{user.headline}</p>
    <button onClick={()=>giveid(user)}><AiOutlineUsergroupAdd size={20}/>Connect</button>
    </div>
  )
}

export default Connectioncard;








