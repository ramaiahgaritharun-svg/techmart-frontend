import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  access: localStorage.getItem("access") || null,
  refresh: localStorage.getItem("refresh") || null,
  username: localStorage.getItem("username") || null,
  isAuthenticated: !!localStorage.getItem("access"),
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    loginSuccess(state, action) {
      const { access, refresh, username } = action.payload;

      state.access = access;
      state.refresh = refresh;
      state.username = username;
      state.isAuthenticated = true;

      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);
      localStorage.setItem("username", username);
    },

    logout(state) {
      state.access = null;
      state.refresh = null;
      state.username = null;
      state.isAuthenticated = false;

      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      localStorage.removeItem("username");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;
