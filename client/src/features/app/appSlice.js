import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
   name: "app",
   initialState: { message: "", messageDetails: [], showSpinner: false },
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

export const { setMessage, clearMessage, showSpinner, closeSpinner } = appSlice.actions;

export default appSlice.reducer;

export const selectMessage = (state) => state.app.message;
export const selectMessageDetails = (state) => state.app.messageDetails;
export const selectShowSpinner = (state) => state.app.showSpinner;
