import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './Header';
import Sidebar from './Sidebar';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  BrowserRouter,
} from 'react-router-dom';
import EmailList from './EmailList';
import EmailBody from './EmailBody';
import Sendmail from './Sendmail';
import { useDispatch, useSelector } from 'react-redux';
import { selectSendMessage } from './features/mailSlice';
import { selectUser, signin } from './features/userSlice';
import Login from './Login';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

function App() {
  const sendMailOpen = useSelector(selectSendMessage);
  const [showSidebar, setShowSidebar] = useState(false);
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          signin({
            displayName: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
          })
        );
      }
    });
  }, []);
  return (
    <BrowserRouter>
      {!user ? (
        <Login />
      ) : (
        <div className="app">
          <Header toggleSidebar={toggleSidebar} />
          <div className="app__body">
            {showSidebar && <Sidebar />}
            <Routes>
              <Route path="/gmail-clone" element={<EmailList />} />
              <Route path="/gmail-clone/mail" element={<EmailBody />} />
            </Routes>
            {sendMailOpen && <Sendmail />}
          </div>
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;
