import { createSlice } from "@reduxjs/toolkit";

const configSlice = createSlice({
  name: "config",
  initialState: {
    lang: "en",
  },
  reducers: {
    changeLangugae: (state, action) => {
      state.lang = action.payload;
    },
  },
});

export default configSlice.reducer;
export const { changeLangugae } = configSlice.actions;
