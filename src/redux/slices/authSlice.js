import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: localStorage.getItem("token") || null,
    photo_url: localStorage.getItem("photo_url") || null 
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        signUp: (state, action) => {
            state.token = action.payload.token;
            state.photo_url = action.payload.photo_url;
            localStorage.setItem("token", state.token);
            localStorage.setItem("photo_url", state.photo_url); 
        },
        login: (state, action) => {
            state.token = action.payload.token;
            state.photo_url = action.payload.photo_url;
            localStorage.setItem("token", state.token);
            localStorage.setItem("photo_url", state.photo_url);
        },
        logOut: (state) => {
            state.token = null;
            state.photo_url = null;
            localStorage.removeItem("token");
            localStorage.removeItem("photo_url"); 
        }
    }
});

export const { signUp, login, logOut } = authSlice.actions;

export default authSlice.reducer;
