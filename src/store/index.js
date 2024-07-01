import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
    entertainmentData: [],
    searchQuery: '',
    imgUrl: '',
}

const userEntertainmentSlice = createSlice({
    name: 'bookmark',
    initialState,
    reducers: {
        getAllData(state, action) {
            state.entertainmentData = action.payload
        },

        updateSearchQuery(state, action) {
            state.searchQuery = action.payload
        },

        updateImg(state, action) {
            state.imgUrl = action.payload
        }
    }
})

export const entertainmentDataActions = userEntertainmentSlice.actions

const store = configureStore({ reducer: userEntertainmentSlice.reducer })

export default store