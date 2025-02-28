import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id: number | null;
  email: string | null;
  username: string | null;
  role: string | null;
}

const initialState: UserState | null = {
  id: null,
  email: null,
  username: null,
  role: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.role = action.payload.role;
    },
    logout: (state) => {
      state.id = null;
      state.email = null;
      state.username = null;
      state.role = null;
    },
  },
});

export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;
