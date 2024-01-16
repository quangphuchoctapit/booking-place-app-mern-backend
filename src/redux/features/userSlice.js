// src/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        name: '',
        email: '',
        image: '',
        token: ''
    },
    reducers: {
        setUserInfo: (state, action) => {
            state.name = action.payload.name,
                state.email = action.payload.email,
                state.image = action.payload.image,
                state.token = action.payload.token
        },
        logout: (state) => {
            return state = {
                name: '',
                email: '',
                image: '',
                token: ''
            }
        }
    },
});

export const { setUserInfo, logout } = userSlice.actions;
export default userSlice.reducer;
