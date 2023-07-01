import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: {
    email: "",
    password: "",
  },
  openModalLogin: false,
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    doLoginAction: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    doLogout: (state) => {
      state.isAuthenticated = false;
    },
    modalLogin: (state, action) => {
      state.openModalLogin = action.payload;
    },
  },
});

export const { doLoginAction, doLogout, modalLogin } = UserSlice.actions;

export default UserSlice.reducer;
