
import { collection,getDocs,deleteDoc, addDoc,onSnapshot,doc,updateDoc, query, where } from "firebase/firestore"; 
import { db1 } from "../../firebaseconfig";
import { toast } from "react-toastify";
import moment, { updateLocale } from "moment/moment";
const tome=moment().format('LLL');
import uniqid from 'uniqid';

export const Firestore=async(status,det,url)=>{
console.log(url)
  
try {

  const docRef = await addDoc(collection(db1, "users"), {
    first: status,
    time:tome,
    uniqueid:uniqid(),
    email:localStorage.getItem('userEmail'),
    name:det[0].name,
    useerid:det[0].id,
    seturl:url
  
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
export const deletepost=async(id)=>{
   try{
    await deleteDoc(doc(db1,"users",id));
    toast.success("Post Deleted succesfully!!!");
   }catch(error){
    console.log(error)
   }
}
export  const updatepost=async(id,status,seturl)=>{
  try{
    const docRef = doc(db1, "users", id);
    await updateDoc(docRef,{first:status,seturl:seturl})
   
   toast.success("successfully updated!!!")
}
  catch(e){
    console.error("Error updating document: ", e);
    
    
  }
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
       return {...item.data(),id:item.id};
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

export const getDataalluseropersonal = async (setalluser) => {
  onSnapshot(collection(db1, "usersdetails"), (doc) => {
    const datauser=  doc.docs.map((item)=>{
        return {...item.data(),id:item.id}
    })
    setalluser([...datauser])
});
}
export const getupdatedata=async(id,payload,imageurl)=>{

 
 try{
    const docRef = doc(db1, "usersdetails", id);
    await updateDoc(docRef,
       {
        ...payload,
          ... imageurl
       });
  toast.success("successfully updated!!!")
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

export const profilediff = (userid,setft) => {
  const quer = query(collection(db1, "users"), where("uniqueid", "==", userid));
  const querysearch =getDocs(quer);
  querysearch
    .then((querySnapshot) => {
      if (querySnapshot.size === 1) {
      
        const data = querySnapshot.docs[0].data();
     setft(data);
      } else if (querySnapshot.size === 0) {
        console.log("No document found with the provided userid.");
      } else {
        console.log("Multiple documents found with the same userid. Something is wrong!");
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};

export const dataprofilepost=async(email,setpersonalpost)=>{
  const quer = query(collection(db1, "users"), where("email", "==", email));
try{
  const querySnapshot=await getDocs(quer);
  const dataArray = [];
 querySnapshot.forEach((item)=>{
  const data=item.data();

dataArray.push(data); // Add each item's data to the array
});
setpersonalpost(dataArray);
}
catch(err){
  console.log(err);
}
}
export  const profileinfo=async(email,setdata)=>{
  const quer = query(collection(db1, "usersdetails"), where("email", "==", email));
try{
  const querySnapshot=await getDocs(quer);
    querySnapshot.forEach((item)=>{
      const data=item.data();
        setdata([data])
  });

}
catch(err){
  console.log(err);
}
}
export const likesystembyid=async(userid,postid,islike)=>{
 
    if(islike){
      let quer=query(collection(db1,"likes"),where("userid","==",userid));
      try{
        const querySnapshot = await getDocs(quer);
        querySnapshot.forEach((doc) => {
      
          deleteDoc(doc.ref);
        });
        
      }catch(error){
        console.log(error)
      }

    }
      else{
        try{
        await addDoc(collection(db1,"likes"),{
        userid,
        postid
   });
  }
   catch(errror){
    console.log(errror);
   }
  }
}

export const likebyuser=async(postid,userid,setlikebyuser,setliked)=>{

    let querylike=query(collection(db1,"likes"),where("postid","==",postid));

  try{
    let queryshot=await getDocs(querylike);
  const likes= queryshot.docs.map((item)=>{
   return item.data()
  } );
     setlikebyuser(likes.length)
    const islikeornot=likes.some((item)=>item.userid===userid);
    
   setliked(islikeornot)
  }catch(error){
    console.log(error)
  }
}
  

export const postcomment=async(postid,userid,comment,timestamp,name,headline,email)=>{
  try{
    await addDoc(collection(db1,"comments"),{
      postid,
      userid,
      comment,
      timestamp,
      name,headline,email
    })
  }catch(error){
    console.log(error)
  }

}
export const showcomment=async(postid,setcomment)=>{
  const quer = query(collection(db1, "comments"), where("postid", "==", postid));
  try{
    onSnapshot(quer,(doc)=>{
      const comm=doc.docs.map((item)=>{
        return{
          id:item.id,
          ...item.data()
        }
      })
      setcomment([...comm])
    })
     
    }catch(error){
    console.log(error)
  }
 
}

export const connectbyuser=async(connectid,currentid)=>{

    try{
      await addDoc(collection(db1,"connections"),{
      connectid,
      currentid
      });
}
 catch(errror){
  console.log(errror);
 }

}
export const connectuserpost=async(currentuserid,setpoststaus)=>{
  console.log(currentuserid)
  
  try{
 const quer=query(collection(db1,"connections"),where("currentid","==",currentuserid));
   const querysnap=await getDocs(quer);
 const data1=querysnap.docs.map((item)=>{
   const data=item.data();
   console.log(data);
   return data})
setpoststaus([...data1])

  }catch(err){
    console.log(err)
  }
}
export const getconnected=async(connectid,userid,setconnected)=>{

  let querylike=query(collection(db1,"connections"),where("connectid","==",connectid));
    
try{
  let queryshot=await getDocs(querylike);
const connected= queryshot.docs.map((item)=>{

     return item.data()
} );
 
  const islConnectedornot=connected.some((item)=>item.currentid===userid);
 
  setconnected(islConnectedornot)
 
}catch(error){
  console.log(error)
}
}
