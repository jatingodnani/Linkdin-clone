import { useEffect, useState } from "react";
import "../assets1/profile.scss"
import ProfileEdit from "./ProfileEdit.jsx";
import {AiOutlineEdit} from 'react-icons/ai';
import {BiArrowBack} from 'react-icons/bi';
import { getDataFromFirestore,getdetail } from "../api/firestore";

const Profile = () => {
  const [Edit, setEdit] = useState(false);
   const [data,setdata]=useState([]);
   const [personalpost,setpersonalpost]=useState([])
   useEffect(()=>{
    getDataFromFirestore(setdata);
    getdetail(setpersonalpost);
   },[])
   
  
   if (data.length === 0) {
    return <div>Loading...</div>;
  }
  
  return (
  <div className="profile">
     <div className='card'>
      <div className="edit"  onClick={() => setEdit(prev=>!prev)}>
     {Edit?<BiArrowBack/>:

      <AiOutlineEdit 
      setedit={setEdit}
      />
      
      }</div>
    {Edit ? <ProfileEdit data={data} /> :
      <>
    
    <h3 className="name">{data[0].name}</h3>
     
     <p className="headline">{data[0].headline}</p>
     <p className="location">{data[0].location}</p>
     <p className="collage">{data[0].collage}</p>
     <p className="company">{data[0].company}</p>
</>
    }
        </div>
       
        { 
personalpost.map((item)=>(
      <div className='posts1' key={item.id}>
          <p className='name'>{item.name}</p>
           <p className='time'>{item.time}</p>
       
        <p className='data'>{item.first}</p>
     
       
        </div>
      
      ))
}
        
    </div>
  )
}

export default Profile