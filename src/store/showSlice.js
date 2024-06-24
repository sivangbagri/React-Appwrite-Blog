import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showLines: false,
};

const showSlice = createSlice({
  name: "show",
  initialState,
  reducers: {
    toggleShow: (state, action) => {
      state.showLines = !state.showLines;
    },
  },
});

export default showSlice.reducer;
export const { toggleShow } = showSlice.actions;
