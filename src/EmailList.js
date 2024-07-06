import React, { useEffect, useState } from 'react';
import './EmailList.css';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import RefreshIcon from '@mui/icons-material/Refresh';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button, IconButton } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Post from './Post';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Sendmail from './Sendmail';
import { db } from './firebase';
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  doc,
} from 'firebase/firestore';

const EmailList = () => {
  const [email, setemail] = useState([]);
  const [drop, setdrop] = useState(false);
  useEffect(() => {
    const res = collection(db, 'mail');
    const q = query(res, orderBy('timestamp', 'desc'));
    onSnapshot(q, (snapshot) => {
      setemail(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);
  const dropdown = () => {
    setdrop(!drop);
  };
  return (
    <div className="emaillist">
      <div className="emaillist__icon">
        <div className="emaillist__iconleft">
          <IconButton className="icon">
            <CropSquareIcon />
          </IconButton>
          <IconButton className="icon">
            <ArrowDropDownIcon />
          </IconButton>
        </div>
        <div className="emaillist__iconright">
          <IconButton className="icon">
            <RefreshIcon />
          </IconButton>
          <IconButton className="icon">
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="emaillist__category">
        {!drop ? (
          <Button
            className="emaillist__categorybutton"
            startIcon={<KeyboardArrowDownIcon />}
            onClick={dropdown}
          >
            Unread
          </Button>
        ) : (
          <Button
            className="emaillist__categorybutton"
            onClick={dropdown}
            startIcon={<KeyboardArrowUpIcon />}
          >
            Unread
          </Button>
        )}
        {drop && (
          <>
            {email.map(({ id, data: { message, subject, timestamp, to } }) => (
              <Post
                id={id}
                key={id}
                title={to}
                subject={subject}
                time={new Date(timestamp?.seconds * 1000).toUTCString()}
                message={message}
              />
            ))}
          </>
        )}
        <Button
          className="emaillist__categorybutton"
          startIcon={<KeyboardArrowDownIcon />}
        >
          Everything else
        </Button>
      </div>
    </div>
  );
};

export default EmailList;
