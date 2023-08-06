import React, { useEffect } from 'react'
import "../likebuttn/like.scss";
import moment, { updateLocale } from "moment/moment";
import {AiFillLike,AiOutlineLike} from "react-icons/ai";
import {BsThreeDotsVertical} from "react-icons/bs";
import {FaRegCommentDots} from "react-icons/fa"
import { useMemo,useState } from 'react';
import {useNavigate}from "react-router-dom";
import { getDataFromFirestore, likesystembyid,likebyuser, postcomment, showcomment } from '../../api/firestore';
const time = moment().format('LLL');
export const LikeButton = ({item}) => {

  const [current,setcurrent]=useState({});
  const [likeuser,setlikebyuser]=useState([]);
  const [islike,setliked]=useState();
  const [commentshow,setcommentshow]=useState(false);
 const [commentva,setcommentvalue]=useState("");
 const [comment,setcomment]=useState([]);
   const [checkprofinavi,setprofilenavi]=useState("");
 useMemo(()=>{
    getDataFromFirestore(setcurrent);
   },[])

  useEffect(()=>{
     likebyuser(item.uniqueid,current[0]?.id,setlikebyuser,setliked);
     showcomment(item.uniqueid,setcomment)
    },[current[0]?.id,item.uniqueid])
//for checkprofile

///for comment
   const getcommennt=()=>{
  
    postcomment(item.uniqueid,current[0]?.id,commentva,time,
      current[0]?.name,current[0]?.headline,current[0]?.email);
     showcomment(item.uniqueid,setcomment)
     setcommentvalue("")
   }
   
//for likes
  const handlelikes=(item)=>{
   likesystembyid(current[0]?.id,item.uniqueid,islike);
   likebyuser(item.uniqueid,current[0]?.id,setlikebyuser,setliked);
}

  return (
    <div className='likebutton'>
      <div className="likebyuseno">
      <p className='likep'>
      {islike
        ? `Like by you and ${likeuser} others`
        : `Like by ${likeuser}`}
     </p>
      </div>


      <hr style={{marginRight:"20px"}}/>

      <div className="jdh">
        <div className='jdh1'>
         <div className="like1" onClick={()=>handlelikes(item)}>
      {
        islike?<AiFillLike size={20} color="#0a66c2"/>:<AiOutlineLike size={20}/>
      }
        </div>
           <p  className="hi">Like</p>
      </div>
        <div className='jdh1'>
        
        <div className="like1" onClick={()=>setcommentshow(prev=>!prev)}>
         <FaRegCommentDots  color={commentshow?"#0a66c2":"black"}/>
         </div>
       
        
       <p  className="hi" style={{color:commentshow?"#0a66c2":"black"}}>Comments</p>
     

     </div>
      </div>
      {
        commentshow?<div className="both">

       <input 
       type="text" 
       className='comment'
       onChange={(e)=>{
         setcommentvalue(e.target.value)
       }} 
       value={commentva}
       placeholder='Add a comment'/>
     {
      commentva?<button className='cmment' onClick={getcommennt}>Add comment</button>:null
     }
       </div>:null
}
     {
      comment.length>0 && commentshow ?comment.map((item)=>
      <div className="comment-card">
      <div className="name23" onClick={navi}>{item.name}</div>
      <div className="time"> {item.timestamp}{item.email===current[0]?.email?<BsThreeDotsVertical className="three" size={13}/>:<></>}</div>
      <div className="head">{item.headline}</div>
      <div className="comment23">{item.comment}</div>
    </div>):<></>
     }
  </div>
  )
}
