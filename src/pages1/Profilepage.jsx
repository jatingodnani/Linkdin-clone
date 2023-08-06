import {React,useState} from 'react'
import Topbar from '../components/Topbar'
import Profile from '../assets1/Profile'
import ProfileEdit from '../assets1/ProfileEdit'

const Profilepage = () => {
const [edit,setedit]=useState(true);
const [data,setdata]=useState([]);

  return (
    <div>
        <Topbar/>
      {
      edit? <Profile data={data} setdata={setdata} Edit={edit} setEdit={setedit}/>
      :<ProfileEdit data={data} setdata={setdata} Edit={edit} setEdit={setedit}/>
      }
    </div>
  )
}

export default Profilepage