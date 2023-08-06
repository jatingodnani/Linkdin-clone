import Topbar from "../components/Topbar";
import "../scss/Connection.scss"
import {connectbyuser, getDataFromFirestore, getDataalluseropersonal} from "../api/firestore"
import { useEffect, useState } from "react";
import Connectioncard from "../components/Connectedcard"

const Connection = () => {
  const [alluser,setalluser]=useState([]);
  const [currentuser,setcurrentuser]=useState([]);

  useEffect(()=>{
    getDataFromFirestore(setcurrentuser)
    getDataalluseropersonal(setalluser);
   
  },[]);
  
  if(currentuser.length===0){
    return <div className="load">loading....</div>
  }
  
  return (
   <div className="connect">
   <Topbar/>
   
   <div className="main">
    {
   alluser.map((user)=>{ 
    return user.id===currentuser[0]?.id?<></>:
    <Connectioncard user={user} currentuser={currentuser}/>
})
   }
   </div>
    </div>
  )
}

export default Connection;