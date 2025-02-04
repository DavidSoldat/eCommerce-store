import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import genderReducer from "./genderSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    genderCategory: genderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
