import React, { useEffect, useState } from 'react'
import "../scss/topebar.scss";
import { AiOutlineHome,
  AiOutlineUserSwitch,
  AiOutlineSearch,
  AiOutlineBell
  ,AiOutlineMessage,AiOutlineFileSearch} from 'react-icons/ai'
import {FaBriefcase} from "react-icons/fa";

import link from "../images1/link.png"
import MenuProvider from '../assets1/Menu1';
import { useNavigate } from 'react-router';
import Searchuser from './searchuse';
import {  getDataalluseropersonal } from '../api/firestore';


const Topbar = () => {
  const [issearch,setissearch]=useState(false);
  const [searchinput,setsearchinput]=useState("");
  const [userarray,setuserarray]=useState([])
  const navigate=useNavigate();
  const [alluser,setalluser]=useState([]);
  

    useEffect(()=>{
      getDataalluseropersonal(setalluser)
    },[])
    
   
    const handleuser = () =>{
      if(searchinput!==""){
      let userforeachinput=alluser?.filter((user)=>{
        return user.name.
        replace(/\s+/g,'').toLowerCase().
        includes(searchinput.toLowerCase())
      })
     
      setuserarray(userforeachinput)
      }
      else{
        setuserarray(alluser)
      }
    }
    useEffect(()=>{
    let debouncingfunction=setTimeout(()=>{
     handleuser()
    },1000)
    return ()=>clearTimeout(debouncingfunction)
    },[searchinput])
   const openuser=(user)=>{
   navigate('/profile',{
    state:user
   })
   
   }
    

  return (
    <>
   <div className="topbar">
    <img src={link} alt="logo" className='hlo' />
    {
      issearch?<Searchuser setissearch={setissearch} setsearchinput={setsearchinput}/>: 
       <div className="react-icons">
        <AiOutlineSearch size={30} className='icon' onClick={()=>setissearch(prev=>!prev)}/>
      <AiOutlineHome size={30} onClick={()=>navigate('/home')} className='icon'/>
      <AiOutlineUserSwitch size={30} onClick={()=>navigate('/connections')}  className='icon' />
     <FaBriefcase size={30} className='icon' />
   
     <AiOutlineMessage size={30} className='icon'/>
     <AiOutlineBell size={30} className='icon'/>
      </div>
    }
  {
      searchinput.length===0?<></>:(
        <div className="searchbar">
           {
      userarray.length>0?
      
        userarray.map((user)=>{
          return(
          <div className="eachuse" onClick={()=>openuser(user)}>
         <img className="userimage" src={user.url}/>
         <div className="both">
         <p className='username'>{user.name}</p>
         <p className='userhead'> {user.headline}</p>
         </div>
        
          </div>)
        })
      :
       <div className='ser'><AiOutlineFileSearch style={{marginRight:"10px"}}size={30}/>
       <p>No user found!!!!</p></div> 
     }
          </div>

      )
    }
    
    <MenuProvider/>
    
   </div>
   </> 
  )



}

export default Topbar;