import React from 'react';
import './Login.css';
import { auth, provider } from './firebase';
import { signInWithPopup } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { signin } from './features/userSlice';

const Login = () => {
  const dispatch = useDispatch();
  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((user) => {
        dispatch(
          signin({
            photoUrl: user._tokenResponse.photoUrl,
          })
        );
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="login">
      <div className="container">
        <img
          className="login___image"
          src="https://cdn2.downdetector.com/static/uploads/logo/gmail_logo_hSykdMC.jpeg"
        />
        <button className="login__button" onClick={signIn}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
