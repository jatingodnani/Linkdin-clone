import { Button, Modal } from 'antd';
import { useMemo, useState } from 'react';
import "./modal.scss";
import {Firestore} from '../api/firestore';
import { getDataFromFirestore} from '../api/firestore'
const Modaling = ({classes,status,setstatus,modal1Open,setModal1Open}) => {
  const [det,getdet]=useState([]);
  
   useMemo(()=>{
    getDataFromFirestore(getdet);
   },[])
  
  const [loading,setLoading]=useState(false);
 
  const handleOk = () => {
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
     
      Firestore(status,det)
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
   
        onCancel={() => setModal1Open(false)}
        footer={[
           
            <Button key="submit" 
            loading={loading} 
            type="primary" 
            onClick={handleOk} 
            disabled={status.length>0?false:true}>
              Post
            </Button>,
         
          ]}
          centered
      >
       <textarea rows={10} cols={10} 
       placeholder='what do you want to talk about'
        className='talk' 
        onChange={(event)=>setstatus(event.target.value)} 
        value={status}
        />
      </Modal>
   
    
  
    
    </>
  );
    }
  export default Modaling;