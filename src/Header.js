import React, { useEffect, useState } from 'react';
import './Header.css';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import AppsIcon from '@mui/icons-material/Apps';
import { Avatar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, signout } from './features/userSlice';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';

const Header = ({ toggleSidebar }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const logout = () => {
    signOut(auth).then(() => dispatch(signout()));
  };
  return (
    <div className="header">
      <div className="header__left">
        <IconButton onClick={toggleSidebar}>
          <MenuIcon />
        </IconButton>
        <img src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_2x_r5.png" />
        <div className="header__input">
          <IconButton>
            <SearchIcon />
          </IconButton>
          <input type="text" placeholder="Search mail" />
          <IconButton>
            <TuneIcon />
          </IconButton>
        </div>
      </div>
      <div className="header__right">
        <IconButton>
          <HelpOutlineIcon />
        </IconButton>
        <IconButton>
          <SettingsIcon />
        </IconButton>
        <IconButton>
          <AppsIcon />
        </IconButton>
        <IconButton onClick={logout}>
          <Avatar src={user?.photoUrl} />
        </IconButton>
      </div>
    </div>
  );
};

export default Header;
