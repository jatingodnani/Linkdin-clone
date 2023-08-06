
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebaseconfig";
import { getupdatedata } from "./firestore";
export const uploadeImg=(id,file,setModal2Open,setprogress)=>{
  const  storageref=ref(storage, `uploadImage/${file.name}`);
  const uploadtask= uploadBytesResumable(storageref,file)
  uploadtask.on(
    'stat_changed',
    (snapshot)=>{
       const progress =Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
       setprogress(progress)
     },(error)=>{
    console.log(error)
     },()=>{
    getDownloadURL(uploadtask.snapshot.ref).then((res)=>{
    getupdatedata(id,{url:res})
    setModal2Open(false)
    })
  })
  
}
export const postimage=(file,seturl,setprogress)=>{
  const storageref=ref(storage,`postimage/${file.name}`);
  const uploadtask=uploadBytesResumable(storageref,file);
  uploadtask.on(
    'state_changed',
    (snapshot)=>{
      const progress =Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
     setprogress(progress)
    },(error)=>{
   console.log(error)
    },()=>{
      getDownloadURL(uploadtask.snapshot.ref).then((res)=>{
        console.log(res)
        seturl(res)
      })
    }
    );
 
    };
  
