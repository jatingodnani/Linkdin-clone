
import  React,{useState,useEffect} from 'react';
import "./menu.scss";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { LogoutOutlined,  SmileOutlined, } from '@ant-design/icons';
import { useNavigate } from 'react-router';
import user from "../images1/user.png"
import { Signout } from '../api/Authapi';
import { getDataFromFirestore } from '../api/firestore';

export default function MenuProvider(){
  const navigate=useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [detail,setdetail]=useState([]);

React.useEffect(()=>{
  getDataFromFirestore(setdetail)
});
if(detail.length==0){
  return <div>loading...</div>
}

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
 
  };
  const handleClose = () => {
    setAnchorEl(null);
   
  };
const profileopen=() => {
  navigate("/profile",{state:null});
}

  return (
    <div className="men">
     
       <img src={detail[0]?detail[0].url:user}
        onClick={handleClick}
        className='classi'
       
        />
     
      <Menu
       
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
       
      >
        <MenuItem className='meny'>
        <p className='name2'>{detail[0].name}</p>
        <p className='headline' >{detail[0].headline}</p>
        </MenuItem>
        <MenuItem onClick={profileopen} className="pro" >
        <SmileOutlined 
        style={{paddingRight:"20px",color:"#318CE7"}}/>
        Profile</MenuItem>
      
        <MenuItem onClick={()=>Signout()}
         ><LogoutOutlined
         
         style={{paddingRight:"20px",color:"#318CE7"}}/>Logout</MenuItem>
      </Menu>
    </div>
  );
}