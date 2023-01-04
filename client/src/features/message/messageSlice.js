import { createSlice } from "@reduxjs/toolkit";

export const messageSlice = createSlice({
   name: "message",
   initialState: { message: "", messageDetails: [], showSpinner: true },
   reducers: {
      setMessage: (state, action) => {
         const { message, messageDetails } = action.payload;
         state.message = message;
         state.messageDetails = messageDetails;
      },
      clearMessage: (state, action) => {
         state.message = "";
         state.messageDetails = [];
      },
      showSpinner: (state, action) => {
         state.showSpinner = true;
      },
      closeSpinner: (state, action) => {
         state.showSpinner = false;
      },
   },
});

export const { setMessage, clearMessage, showSpinner, closeSpinner } = messageSlice.actions;

export default messageSlice.reducer;

export const selectMessage = (state) => state.message.message;
export const selectMessageDetails = (state) => state.message.messageDetails;
export const selectShowSpinner = (state) => state.message.showSpinner;
