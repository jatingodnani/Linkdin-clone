import { useEffect, useState } from "react";
import "../assets1/profile.scss"
import {AiOutlineEdit} from 'react-icons/ai';
import { dataprofilepost, getDataFromFirestore,getdetail,profileinfo } from "../api/firestore";
import { useLocation } from "react-router";
import { LikeButton } from "./likebuttn/like.jsx"
import { uploadeImg } from "../api/storage";
import { Filemodal } from "../components/filemodal";
const Profile = ({data,setdata,setEdit}) => {
    const location = useLocation();
    const state=location.state;
    console.log(state)
    const [url,seturl]=useState(null)
    const [modal2Open, setModal2Open] = useState(false);
    const [progress,setprogress] = useState(0)
    const [personalpost,setpersonalpost]=useState([]);
 
   const getimg=(e)=>{
   seturl(e.target.files[0]);
 
  }
  
const upload=(url)=>{
uploadeImg(data[0]?.id,url,setModal2Open,setprogress);

 }



useEffect(()=>{
    if(state===null){ 
      getDataFromFirestore(setdata);
      getdetail(setpersonalpost);
    }
    else{
       
       dataprofilepost(state.email,setpersonalpost)
       profileinfo(state.email,setdata);
      
    }
   
   
   },[state])
   
  
   if (data.length === 0) {
    return <div className="loading"></div>;
  }
  
  return (
  <div className="profile">
    <div className='card'>
   <Filemodal    
   url={url}
   getimg={getimg}
   upload={upload}
   setModal2Open={setModal2Open}
   modal2Open={modal2Open}
   urlname={url?.name}
   progress={progress}
   />
 
    <img
      src={data[0]?.url}
      className="img" 
      alt="not found"
      onClick={()=>setModal2Open(prev=>!prev)}
      />
     {
     data[0]?.email===localStorage.getItem("userEmail")?
      <div className="edit"  onClick={() => setEdit(prev=>!prev)}>
    <AiOutlineEdit />
    </div>
    :<></>
    }
      
      
  
      <>
     
    <h3 className="name1">{data[0].name}</h3>
     
     <p className="headline">{data[0].headline}</p>
     <p className="location">{data[0].location}</p>
     <a className="website" href={data[0].website}>{data[0].website}</a>
     <p className="aboutme">{data[0].about}</p>
     {data[0].skills?
     <p className="skills">
      <span> Skills:</span>{data[0].skills}</p>:null
    }
     <div className="both">
     <p className="collage">{data[0].collage}</p>
     <p className="company">{data[0].company}</p>

     </div>
   
</>
    
        </div>
       
        { 
      personalpost.map((item)=>(
      <div className='posts1' key={item.id}>
       <div class="imagename">
        <img src={data[0]?.url} className="chotaprofile" />
      <p className='name'>{item.name}</p>
          </div>
           <p className='time'>{item.time}</p>
       
        <p className='data'>{item.first}</p>
        <LikeButton item={item}/>
     
       
        </div>
      
      ))
}
        
    </div>
  )
}

export default Profile;