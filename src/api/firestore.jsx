
import { collection,getDocs, addDoc,onSnapshot,doc,updateDoc, query, where } from "firebase/firestore"; 
import { db1 } from "../../firebaseconfig";
import { toast } from "react-toastify";
import moment, { updateLocale } from "moment/moment";
const tome=moment().format('LLL');
import uniqid from 'uniqid';
export const Firestore=async(status,det)=>{

  
try {

  const docRef = await addDoc(collection(db1, "users"), {
    first: status,
    time:tome,
    uniqueid:uniqid(),
    email:localStorage.getItem('userEmail'),
    name:det[0].name
    
 
  });
  toast.success("Post added succesfully!!!", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}
} 
export const getpost=(setpoststatus)=>{
  
  onSnapshot(collection(db1, "users"), (doc) => {
   

 const post=  doc.docs.map((item)=>{
  
   
    return {...item.data(),id:item.id}
   })
   setpoststatus([...post])
  
});

  
}
export const getuser=(name,email)=>{
 addDoc(collection(db1,"usersdetails"),{
  name,
  email

 })
}


export const getdetail=(setdetail)=>{
  onSnapshot(collection(db1, "users"), (doc) => {
   const post=  doc.docs.map((item)=>{
       return {...item.data()};
   }).filter((item)=>item.email===localStorage.getItem('userEmail'))
    setdetail([...post])
 
})
}


export const getDataFromFirestore = async (setdata) => {
  onSnapshot(collection(db1, "usersdetails"), (doc) => {
    const datauser=  doc.docs.map((item)=>{
        return {...item.data(),id:item.id}
    }).filter((item)=>item.email===localStorage.getItem('userEmail'))
   setdata([...datauser])
});
}

export const getupdatedata=async(id,payload)=>{
  const docRef = doc(db1, "usersdetails", id);

  try{
    await updateDoc(docRef, payload).then(()=>{
      toast.success("successfully updated!!!")
    
  });
}
  catch(e){
    console.error("Error updating document: ", e);
  }
}

export const getupdatepostnamedata = async(payload) => {

  const userEmail = localStorage.getItem('userEmail');
  const usersCollectionRef = collection(db1, "users");
 
 const quwer=query(usersCollectionRef,where("email","==",userEmail))

 try{
  const querysearch=await getDocs(quwer);
   querysearch.forEach((item)=>{
    const docRef = doc(db1, "users", item.id);
   const data= item.data();
   const updatadata={
    ...data,
    name:payload.name,
   }
 updateDoc(docRef,updatadata).then(()=>{
    console.log("updated")
  })
   })
 }catch(err){
  console.log(err)
 }
}

