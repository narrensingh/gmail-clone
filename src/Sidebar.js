import React, { forwardRef, useState } from 'react';
import './Sidebar.css';
import { Button, IconButton } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import InboxIcon from '@mui/icons-material/Inbox';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import LabelImportantOutlinedIcon from '@mui/icons-material/LabelImportantOutlined';
import ScheduleSendOutlinedIcon from '@mui/icons-material/ScheduleSendOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import NoteOutlinedIcon from '@mui/icons-material/NoteOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import ReportOutlinedIcon from '@mui/icons-material/ReportOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import { useAnimate, usePresence } from 'framer-motion';
import { useEffect } from 'react';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useDispatch } from 'react-redux';
import { sendMessageOpen } from './features/mailSlice';
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';

const Sidebar = () => {
  const ref = collection(db, 'labels');
  const dispatch = useDispatch();
  const shoot = () => {
    dispatch(sendMessageOpen());
  };
  const [term, setTerm] = useState('');
  const [labels, setLabels] = useState([]);
  const popupWin = () => {
    document.getElementById('popup').style.display = 'flex';
  };
  const cancel = () => {
    document.getElementById('popup').style.display = 'none';
  };
  const create = (e) => {
    e.preventDefault();
    addDoc(ref, {
      label: term,
      timestamp: serverTimestamp(),
    });
    console.log(labels);
    document.getElementById('popup').style.display = 'none';
    setTerm('');
  };
  const q = query(ref, orderBy('timestamp', 'desc'));
  onSnapshot(q, (snapshot) => {
    setLabels(
      snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }))
    );
  });
  const [isPresent, safeToRemove] = usePresence();
  const [scope, animate] = useAnimate();
  const [dropdown, setdropdown] = useState(false);
  const drop = () => {
    if (dropdown === true) {
      setdropdown(false);
    } else {
      setdropdown(true);
    }
  };
  const contents = (Icon, title, onclick, opt = false) => (
    <div className="sidebar__contents" onClick={onclick}>
      <div className="sidebar__contentsLeft">
        <div className="sidebar__contentsIcon">
          <Icon />
        </div>
        <div className="sidebar__contentsTitle">
          <p>{title}</p>
        </div>
      </div>
      <div className="sidebar__contentsoptions">
        {opt ? <MoreVertIcon /> : ''}
      </div>
    </div>
  );
  useEffect(() => {
    if (isPresent) {
      const animation = async () => {
        await animate(
          scope.current,
          { opacity: [0, 1] },
          { duration: 0.5, delay: 0.2 }
        );
      };
      animation();
    } else {
      const exitAnimation = async () => {
        await animate(
          scope.current,
          { opacity: [0, 1] },
          { duration: 0.5, delay: 0.2 }
        );
        safeToRemove();
      };
      exitAnimation();
    }
  }, []);
  return (
    <div className="sidebar" ref={scope}>
      <Button
        className="sidebar__compose"
        startIcon={<CreateIcon />}
        onClick={shoot}
      >
        Compose
      </Button>
      {contents(InboxIcon, 'Inbox')}
      {contents(StarOutlineIcon, 'Starred')}
      {contents(AccessTimeIcon, 'Snoozed')}
      {contents(SendOutlinedIcon, 'Sent')}
      {dropdown === false
        ? contents(KeyboardArrowDownOutlinedIcon, 'More', drop)
        : contents(KeyboardArrowUpOutlinedIcon, 'Less', drop)}
      {dropdown && (
        <>
          {contents(LabelImportantOutlinedIcon, 'Important')}
          {contents(ChatOutlinedIcon, 'Chats')}
          {contents(ScheduleSendOutlinedIcon, 'Scheduled')}
          {contents(NoteOutlinedIcon, 'Draft')}
          {contents(EmailOutlinedIcon, 'All Mail')}
          {contents(ReportOutlinedIcon, 'Spam')}
          {contents(DeleteOutlineOutlinedIcon, 'Bin')}
          {contents(LabelOutlinedIcon, 'Categories')}
          {contents(SettingsOutlinedIcon, 'Manage labels')}
          {contents(AddOutlinedIcon, 'Create new label', popupWin)}
        </>
      )}
      <div className="sidebar__footer">
        <div className="sidebar__footerHeader">
          <h3>Labels</h3>
          <IconButton onClick={popupWin}>
            <AddOutlinedIcon />
          </IconButton>
        </div>
        {labels.map((label) =>
          contents(LabelImportantIcon, label.data.label, () => {}, true)
        )}
      </div>
      <form onSubmit={create}>
        <div className="popup" id="popup">
          <h3>New label</h3>
          <p>Please enter a new label name:</p>
          <input
            type="text"
            value={term}
            onChange={(e) => setTerm(e.currentTarget.value)}
          />
          <div className="s3">
            <Button className="cancel" onClick={cancel}>
              Cancel
            </Button>
            <Button className="create" type="submit">
              Create
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Sidebar;
