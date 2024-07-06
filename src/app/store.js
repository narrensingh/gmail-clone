import { configureStore } from '@reduxjs/toolkit';
import mailReducer from '../features/mailSlice';
import userReducer from '../features/userSlice';

export const store = configureStore({
  reducer: {
    email: mailReducer,
    user: userReducer,
  },
});
