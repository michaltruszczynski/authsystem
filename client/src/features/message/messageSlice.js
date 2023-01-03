import { createSlice } from "@reduxjs/toolkit";

export const messageSlice = createSlice({
   name: "message",
   initialState: { message: '', messageDetails: [] },
   reducers: {
      setMessage: (state, action) => {
         const { message, messageDetails} = action.payload;
         state.message =  message;
         state.messageDetails = messageDetails;
      },
      clearMessage: (state, action) => {
         state.message = '';
         state.messageDetails = [];
      },
   },
});

export const {setMessage, clearMessage} = messageSlice.actions;

export default messageSlice.reducer;

export const selectMessage = (state) => state.message.message;
export const selectMessageDetails = (state) => state.message.messageDetails;