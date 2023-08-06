import {React,useState,useEffect} from 'react'
import { useNavigate } from 'react-router';
import {BsFillPencilFill} from "react-icons/bs"
import {RiDeleteBin6Line} from "react-icons/ri"
import { LikeButton } from "./likebuttn/like.jsx";
import { 
  profilediff,
   deletepost,
   getconnected,
   } from '../api/firestore';

export const Postcard = ({item,edit,alluser,data}) => {
    const navigate=useNavigate();
    const [fte,setft]=useState("");
    const [connected,setconnected]=useState()
    const handleemail=(item)=>{
        if(item.email!==localStorage.getItem('userEmail')){
          profilediff(item.uniqueid,setft);
        }
      }
      useEffect(() => {
        if (fte !== "") {
          navigate("/profile", { state: fte });
        }
        }, 
        [fte,navigate]);



        useEffect(()=>{
       getconnected(item.useerid,data[0]?.id,setconnected)
        },[data[0]?.id,item.userid])
    
  return connected || item.email===localStorage.getItem("userEmail") ?(
    <div className='posts1' key={item.id}>
    <div className="row">
          <div className="imgname">
          <img src={alluser.filter((user)=>user.email===item.email).map((item)=>item.url)[0]} className='chotaprofile'/>
           <p className='name' onClick={()=>handleemail(item)}>{item.name}</p>
          <p className='head2'>{alluser.filter((user)=>user.email===item.email).map((item)=>item.headline)[0]}</p>
          </div>
          {
            item.email===localStorage.getItem("userEmail")?
          <div className="icons">
            <BsFillPencilFill size={20} onClick={()=>edit(item)}/>
            <RiDeleteBin6Line  size={20} onClick={()=>deletepost(item.id)}/>
          </div>:<></>
           }
          </div>
           <p className='time'>{item.time}</p>
             <p className='data'>{item.first}</p>
             {item.seturl && <img className='pos' src={item.seturl}/>}
             <LikeButton item={item}/>
             </div>
  ):<></>
}
