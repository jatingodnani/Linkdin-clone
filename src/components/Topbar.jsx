import React from 'react'
import "../scss/topebar.scss";
import { AiOutlineHome,
  AiOutlineUserSwitch,
  AiOutlineSearch,
  AiOutlineBell
  ,AiOutlineMessage} from 'react-icons/ai'
import {FaBriefcase} from "react-icons/fa";

import link from "../images1/link.png"
import MenuProvider from '../assets1/Menu1';
import { useNavigate } from 'react-router';



const Topbar = () => {
  const navigate=useNavigate();
  return (
    <>
   <div className="topbar">
    <img src={link} alt="logo" className='hlo' />
    <div className="react-icons">
    <AiOutlineSearch size={35} className='icon'/>
    <AiOutlineHome size={30} onClick={()=>navigate('/home')} className='icon'/>
    <AiOutlineUserSwitch size={30} className='icon' />
 <FaBriefcase size={30} className='icon' />
 
 <AiOutlineMessage size={30} className='icon'/>
 <AiOutlineBell size={30} className='icon'/>
    </div>
  
<MenuProvider classi="hlo1" />
   </div>
   </> 
  )
}

export default Topbar