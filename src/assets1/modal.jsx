import { Button, Modal } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import "./modal.scss";
import { Progress } from 'antd';
import {Firestore} from '../api/firestore';
import { getDataFromFirestore,updatepost} from '../api/firestore';
import {AiOutlinePicture} from "react-icons/ai";
import { postimage } from '../api/storage';
const Modaling = ({classes,status,setstatus,modal1Open,setModal1Open,isedit,setisedit,updateok}) => {
  const [det,getdet]=useState([]);
 const [progress,setprogress]=useState(0)
  const [urlpost,seturlpost]=useState("")
   useMemo(()=>{
    getDataFromFirestore(getdet);
   },[])
 
  const [loading,setLoading]=useState(false);
  
  const handleOk = () => {
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
    
       
      Firestore(status,det,urlpost)
      setModal1Open(false);
     
      setstatus('');
    
    }, 3000);

  
  };



  return (
    <>
 
 
    <Modal
     title="Create a post"
        style={{
          top: 20,
        }}
        open={modal1Open}
      onCancel={() =>{
        setisedit(false)
        setstatus("")
        seturlpost("")
           setModal1Open(false)}}
        footer={[
           
            <Button key="submit" 
            loading={loading} 
            type="primary" 
            onClick={isedit?updateok:handleOk} 
            disabled={status.length>0 || urlpost?false:true}>
             {
              isedit?"Edit":"Post"
            }
            </Button>,
         
          ]}
          centered
      >
        <div>
       <textarea rows={10} cols={10} 
       placeholder='what do you want to talk about'
        className='talk' 
        onChange={(event)=>setstatus(event.target.value)} 
        value={status}
        />
        {
          progress===0|| progress===100?<></>:<Progress style={{marginLeft:"170px"}} type="circle" percent={progress} />
        }
        {
          urlpost.length>0?
        <img className='modalimg' src={urlpost} />:<></>
          }
          </div>
        <div className="ico">
        <label htmlFor='pictureuplo' >
        <AiOutlinePicture size={40} />
        </label>
        {urlpost && <button className='button1' onClick={()=>{
          seturlpost("")
          setprogress()
          }}>Delete</button>}
        <input
         id="pictureuplo" 
         type={"file"} 
         onChange={(e)=>postimage(e.target.files[0],seturlpost,setprogress)}
         hidden
        />
      </div>
      </Modal>
   
    
  
    
    </>
  );
    }
  export default Modaling;