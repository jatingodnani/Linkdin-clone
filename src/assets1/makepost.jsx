import {React,useState,useMemo,useEffect} from 'react'

import "../assets1/makepost.scss"
import Modaling from './modal';

import { getDataFromFirestore,
   getpost, profilediff,
   getDataalluseropersonal,deletepost,
   updatepost} from '../api/firestore'
import { Button } from 'antd';

import { Postcard } from './Postcard';

export const Makepost = (props) => {


 const [currentpost,setcurrentpost]=useState([]);
const [status,setstatus]=useState("");
  const [poststatus,setpoststaus]=useState([]);
  const [modal1Open, setModal1Open] = useState(false);
 const [data,setdata]=useState([]);
 const [alluser,setalluser]=useState([]);
 const [isedit,setisedit]=useState(false);
  useMemo(()=>{
   getpost(setpoststaus);
    getDataFromFirestore(setdata);
    getDataalluseropersonal(setalluser)
  },[])

  
    const updateok=()=>{
      updatepost(currentpost?.id,status)
      setModal1Open(false)
    }
const edit=(item)=>{
 
  setisedit(true)
  setModal1Open(true); 
  setcurrentpost(item)
  setstatus(item?.first)

}

  
   
     return(
      <div className='homi'>
      <div className='userdata'>
        <img className="userimg" src={data[0]?.url}/>
      <p className='nameing'>{data[0]?.name}</p>
      <p className='head'>{data[0]?.headline}</p>
      </div>
      <div className="box">
    
        <div className="posting">
       
        <div className='both'>
    
       <img src={data[0]?.url}  className='imging' />
       
       <Button type="primary" onClick={() => setModal1Open(true)}  className="post">
        Write a post
        </Button>
        </div>
       <Modaling 
         isedit={isedit}
         setisedit={setisedit}
         status={status}
         setstatus={setstatus}
         modal1Open={modal1Open}
         setModal1Open={setModal1Open}
        updateok={updateok}
       />
    
     </div>
       </div>
         { 
        poststatus.map((item)=>(
      
       <Postcard item={item} edit={edit} alluser={alluser} data={data}/>
        
        
        ))
      }
    
      </div>

     
  );
    }
    
