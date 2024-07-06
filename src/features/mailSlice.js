import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sendMessage: false,
  selectedMail: null,
};

export const mailSlice = createSlice({
  name: 'email',
  initialState,
  reducers: {
    selectMail: (state, action) => {
      state.selectedMail = action.payload;
    },
    sendMessageOpen: (state) => {
      state.sendMessage = true;
    },
    sendMessageClose: (state) => {
      state.sendMessage = false;
    },
  },
});

export const { selectMail, sendMessageOpen, sendMessageClose } =
  mailSlice.actions;
export const selectSendMessage = (state) => state.email.sendMessage;
export const selectOpenMail = (state) => state.email.selectedMail;
export default mailSlice.reducer;
