import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  genderCategory: "woman",
};

const genderCategorySlice = createSlice({
  name: "genderCategory",
  initialState,
  reducers: {
    setGenderCategory: (state, action) => {
      state.genderCategory = action.payload;
    },
  },
});

export const { setGenderCategory } = genderCategorySlice.actions;
export default genderCategorySlice.reducer;
