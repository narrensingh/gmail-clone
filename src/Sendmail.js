import React, { useState } from 'react';
import './Sendmail.css';
import CloseIcon from '@mui/icons-material/Close';
import { Button, IconButton } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { sendMessageClose } from './features/mailSlice';
import { db } from './firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const Sendmail = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => {
    const ref = collection(db, 'mail');
    addDoc(ref, {
      to: data.to,
      subject: data.subject,
      message: data.message,
      timestamp: serverTimestamp(),
    });
    dispatch(sendMessageClose());
  };
  return (
    <div className="sendmail">
      <div className="sendmail__first">
        <div className="sendmail__header">
          <h3>New Message</h3>
          <div className="sendmail__headerIcon">
            <IconButton onClick={() => dispatch(sendMessageClose())}>
              <CloseIcon />
            </IconButton>
          </div>
        </div>
        <form className="sendmail__body" onSubmit={handleSubmit(onSubmit)}>
          <input
            placeholder="Recepients"
            type="email"
            name="to"
            {...register('to', { required: true })}
          />
          <input
            placeholder="Subject"
            type="text"
            name="subject"
            {...register('subject', { required: true })}
          />
          <textarea
            name="message"
            {...register('message', { required: true })}
          ></textarea>
          <div className="sendmail__footer">
            <Button className="sendmail__footerButton" type="submit">
              Send
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Sendmail;
