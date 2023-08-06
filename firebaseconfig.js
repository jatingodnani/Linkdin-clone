
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAxr1cLpuWll6GpFE-p5OlA8JCzb-r8L5g",
  authDomain: "linkdin-clone-ca1f5.firebaseapp.com",
  projectId: "linkdin-clone-ca1f5",
  storageBucket: "linkdin-clone-ca1f5.appspot.com",
  messagingSenderId: "994370476195",
  appId: "1:994370476195:web:8cb05021dd17c132b60716",
  measurementId: "G-9KWWYSSQ6X"
};
const firebaseConfig1= {
  apiKey: "AIzaSyAVNhRvn1SV8fKIyDJi_vntwtyZA8dv-lc",
  authDomain: "firedetail-e2673.firebaseapp.com",
  projectId: "firedetail-e2673",
  storageBucket: "firedetail-e2673.appspot.com",
  messagingSenderId: "136144648253",
  appId: "1:136144648253:web:df5ab255e3793baa89d254"
};

const app = initializeApp(firebaseConfig);
const app1 = initializeApp(firebaseConfig1, "secondFirebaseApp");
const auth=getAuth();
const db1 = getFirestore(app1);
const storage=getStorage(app1);
export { app,auth,app1,db1,storage}