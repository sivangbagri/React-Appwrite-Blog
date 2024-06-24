import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import showSlice from "./showSlice";

export const store = configureStore({
  reducer: {
    auth : authSlice,
    show : showSlice
    
  },
});
