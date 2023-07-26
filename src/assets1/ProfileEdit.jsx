import React, { useEffect, useState } from 'react';
import "./profileedit.scss";
import { getupdatedata,getDataFromFirestore,getupdatepostnamedata  } from '../api/firestore';
const ProfileEdit = ({data}) => {
  const [dta,setdt]=useState([])
 
  useEffect(()=>{
       getDataFromFirestore(setdt);
     
  },[])
 console.log(dta)
  const [inpu,setInpu]=useState({
    name:"",
    headline:"",
    location:"",
    company:"",
    collage:"",
  })
  useEffect(() => {
    if (dta.length > 0) {
      // Set the initial state of 'inpu' based on the data fetched from Firestore
      setInpu(dta[0]);
    }
  }, [dta]);
useEffect(()=>{
  getupdatepostnamedata(inpu)
},[inpu])

    
  const changeinpu=(e)=>{
    setInpu(prev=>({
      ...prev,
      [e.target.name]:e.target.value
    }));
  }
  const handleupdatedata=()=>{
    const id = data && data[0] && data[0].id;

  getupdatedata(id, inpu);
  if (dta.length === 0) {
    return <div>Loading...</div>;
  }

  
  }
  return (
    <div class="input">
     
      <input 
      type="text"
       name="name"
        onChange={changeinpu} 
      value={inpu.name}
        placeholder="Enter Name" />
  
    
      <input
       type="text"
        name="headline" 
        value={inpu.headline}
       onChange={changeinpu} 
       placeholder="Headline"
       />


      <input 
      type="text" 
      name="location"
       value={inpu.location}
      onChange={changeinpu} 
      placeholder='Location'
      />


      <input 
      type="text" 
      name="company"  
      onChange={changeinpu} 
      value={inpu.company}
      placeholder="Company"/>



      <input 
      type="text" 
      name="collage"  
      onChange={changeinpu}
      value={inpu.collage}
      placeholder="Collage"
      />


      <button
      onClick={handleupdatedata}
      >Edit Profile
      </button>
    </div>
  )
}

export default ProfileEdit