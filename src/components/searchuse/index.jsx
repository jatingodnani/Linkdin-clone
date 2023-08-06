import React from 'react'
import "../../components/searchuse/index.scss";
import {ImCancelCircle} from "react-icons/im"
const Searchuser = ({setissearch,setsearchinput}) => {

  return (
    <div className='search'>
        <input type='text' onChange={(e)=>setsearchinput(e.target.value)} className='finduser'  placeholder='Search User...'/>
        <ImCancelCircle  className='icons' size={18} onClick={()=>setissearch(prev=>!prev)}/>
    </div>
  )
}

export default Searchuser;