import React from 'react';
import './EmailBody.css';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import ReportGmailerrorredOutlinedIcon from '@mui/icons-material/ReportGmailerrorredOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import MarkEmailUnreadOutlinedIcon from '@mui/icons-material/MarkEmailUnreadOutlined';
import DriveFileMoveOutlinedIcon from '@mui/icons-material/DriveFileMoveOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { Avatar, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectOpenMail } from './features/mailSlice';

const EmailBody = ({ email, subject, message, name }) => {
  const selectMail = useSelector(selectOpenMail);
  const navigate = useNavigate();
  return (
    <div className="email">
      <div className="email__header">
        <div className="email__header1">
          <IconButton
            className="icons"
            onClick={() => navigate('/gmail-clone')}
          >
            <ArrowBackOutlinedIcon />
          </IconButton>
          <IconButton className="icons">
            <ArchiveOutlinedIcon />
          </IconButton>
          <IconButton className="icons">
            <ReportGmailerrorredOutlinedIcon />
          </IconButton>
          <IconButton className="icons">
            <DeleteOutlineOutlinedIcon />
          </IconButton>
          <IconButton className="icons">
            <MarkEmailUnreadOutlinedIcon />
          </IconButton>
          <IconButton className="icons">
            <DriveFileMoveOutlinedIcon />
          </IconButton>
          <IconButton className="icons">
            <MoreVertOutlinedIcon />
          </IconButton>
        </div>
        <div className="email__header2">
          <h1>{selectMail?.subject}</h1>
        </div>
        <div className="email__header3">
          <Avatar />
          <div className="email__profile">
            <p className="email__profilename">
              {selectMail?.title.split('@')[0]}
            </p>
            <p className="email__profileemail">{selectMail?.title}</p>
          </div>
        </div>
      </div>
      <div className="email__body">
        <p>{selectMail?.message}</p>
      </div>
    </div>
  );
};

export default EmailBody;
