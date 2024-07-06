import React from 'react';
import './Post.css';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { selectMail } from './features/mailSlice';

const Post = ({ id, title, subject, time, message }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const openMail = () => {
    dispatch(
      selectMail({
        id,
        title,
        subject,
        time,
        message,
      })
    );
    navigate('/mail');
  };
  return (
    <div className="post" onClick={openMail}>
      <div className="post__left">
        <div className="post__icons">
          <CropSquareIcon />
          <StarOutlineIcon />
          <LabelOutlinedIcon />
        </div>
        <div className="post__iconsTitle">
          <p>{title}</p>
        </div>
      </div>
      <div className="post__center">
        <p>
          {subject} <span className="post__centerspan">{message}</span>
        </p>
      </div>
      <div className="post__right">
        <p>{time}</p>
      </div>
    </div>
  );
};

export default Post;
