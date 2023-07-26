import {React,useState,useMemo,useEffect} from 'react'
import link from  "../images1/link.png"
import "../assets1/makepost.scss"
import Modaling from './modal'
import { getpost} from '../api/firestore'
import { Button, Modal } from 'antd';

export const    Makepost = (props) => {
  const [status,setstatus]=useState("");
  const[poststatus,setpoststaus]=useState([]);
  const [modal1Open, setModal1Open] = useState(false);

  useMemo(()=>{
    getpost(setpoststaus);
  
   },[])
   
  
  return (
    <div className='homi'>
    <div className="box">
      <div className="posting">
     <img src={link}  className='imging' />
   
     <Button type="primary" onClick={() => setModal1Open(true)}  className="post">
      Write a post
      </Button>
     <Modaling 

  status={status}
  setstatus={setstatus}
  modal1Open={modal1Open}
  setModal1Open={setModal1Open}
  />
 
 
    </div>


    </div>

      { 
      poststatus.map((item)=>(
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
