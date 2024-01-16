// src/counterSlice.js
import { createSlice, current } from '@reduxjs/toolkit';

const photoSlice = createSlice({
    name: 'photo',
    initialState: {
        photos: []
    },
    reducers: {
        setPhotos: (state, action) => {
            // console.log(action.payload);
            if (action.payload) {
                if (Array.isArray(action.payload)) {
                    state.photos = [...state.photos, ...action.payload]
                } else {
                    state.photos = [...state.photos, action.payload]
                }
            } else {
                state.photos = [...state.photos]
            }
        },
        resetPhotos: (state) => {
            return state = { photos: [] }
        }
    },
});

export const { setPhotos, resetPhotos } = photoSlice.actions;
export default photoSlice.reducer;
