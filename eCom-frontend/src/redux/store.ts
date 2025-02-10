import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import genderReducer from "./genderSlice";
import tokenReducer from "./tokenSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    genderCategory: genderReducer,
    token: tokenReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
