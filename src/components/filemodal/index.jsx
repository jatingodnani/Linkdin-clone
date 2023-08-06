
import "../filemodal/index.scss"
  
import { Button, Modal,Progress } from 'antd';
export const Filemodal = ({url,getimg,upload,setModal2Open,modal2Open,urlname,progress}) => {
 
  return (
    <Modal
        title="Add Profile Picture"
        centered
        open={modal2Open}
        onOk={() => setModal2Open(false)}
        onCancel={() => setModal2Open(false)}
        footer={[
            <Button key="submit" disabled={urlname?false:true} type='primary'  onClick={()=>upload(url)}>
             Upload Profile Image
            </Button>]}
      >
        <div className='main'>
            <p>{urlname}{progress}</p>
            <label for='add-picture'>Add an Image</label>
      <input hidden id="add-picture" type={"file"} onChange={getimg}/>
     <div className="prog">
        {
        progress===0 || progress===100?<></>:<Progress type="circle" percent={progress} />
        }
     </div>
   </div>
      </Modal>

  )
}
