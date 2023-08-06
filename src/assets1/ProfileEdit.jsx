import React, { useEffect, useState } from 'react';
import "./profileedit.scss";
import { getupdatedata,getDataFromFirestore,getupdatepostnamedata} from '../api/firestore';
import {BiArrowBack} from 'react-icons/bi';
const ProfileEdit = ({data,setEdit}) => {
  

  const [inpu,setInpu]=useState({
    name:"",
    headline:"",
    location:"",
    company:"",
    collage:"",
    skills:"",
    about:"",
    website:"",
  })
  useEffect(() => {
    if (data.length > 0) {
      // Set the initial state of 'inpu' based on the data fetched from Firestore
      setInpu(data[0]);
    }
  }, [data]);


    
  const changeinpu=(e)=>{
    setInpu(prev=>({
      ...prev,
      [e.target.name]:e.target.value
    }));
  }
  const handleupdatedata=()=>{
    const id = data && data[0] && data[0].id;
    getupdatepostnamedata(inpu)
  getupdatedata(id, inpu);
 
  if (data.length === 0) {
    return <div>Loading...</div>;
  }

  
  }
  return (
    <div className="input">
        <div className="edit"  onClick={() => setEdit(prev=>!prev)}>
           <BiArrowBack/>
         </div>
     <label>Name</label>
      <input 
      type="text"
       name="name"
        onChange={changeinpu} 
      value={inpu.name}
        placeholder="Enter Name" />
  
    <label>Headline</label>
      <input
       type="text"
        name="headline" 
        value={inpu.headline}
       onChange={changeinpu} 
       placeholder="Headline"
       />

<label>Location</label>
      <input 
      type="text" 
      name="location"
       value={inpu.location}
      onChange={changeinpu} 
      placeholder='Location'
      />

<label>Company</label>
      <input 
      type="text" 
      name="company"  
      onChange={changeinpu} 
      value={inpu.company}
      placeholder="Company"/>


<label>Collage</label>
      <input 
      type="text" 
      name="collage"  
      onChange={changeinpu}
      value={inpu.collage}
      placeholder="Collage"
      />
<label>Website</label>
<input
type="url"
name='website'
placeholder='add website'
onChange={changeinpu}
value={inpu.website}
  />
  <label>About Me</label>
  <textarea
  row={5}   
  name='about'
  onChange={changeinpu}
  placeholder='Add about me'
  value={inpu.about}
 /> 
 <label>Skills</label>
          <textarea
           row={5}   
           name='skills'
           onChange={changeinpu}
            placeholder='Skills'
          value={inpu.skills}
         /> 
  
   <button
      onClick={handleupdatedata}
      >Edit Profile
      </button>
    </div>
  )
}

export default ProfileEdit