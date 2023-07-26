
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { LogoutOutlined } from '@ant-design/icons';

import user from "../images1/user.png"
import { Signout } from '../api/Authapi';

export default function MenuProvider({classi}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
     
       <img src={user} className={classi} id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        
       
        />
     
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        // anchorOrigin={{
        //   vertical: 'top',
        //   horizontal: 'left',
        // }}
        // transformOrigin={{
        //   vertical: 'top',
        //   horizontal: 'left',
        // }}
      >
        <MenuItem onClick={handleClose} style={{width:"150px"}} centered>Profile</MenuItem>
      
        <MenuItem onClick={()=>Signout()} style={{width:"150px"}}><LogoutOutlined style={{paddingRight:"20px",color:"blue"}}/>Logout</MenuItem>
      </Menu>
    </div>
  );
}