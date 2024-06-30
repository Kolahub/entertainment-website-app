import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
    bookmark: []
}

const userBookmarkSlice = createSlice({
    name: 'bookmark',
    initialState,
    reducers: {
        getAll(state, action) {
            state.bookmark = action.payload
        },

        addTo (state, action) {
            state.bookmark.push(action.payload)
        },

        // removeFromBookmark(state, action) {

        // }
    }
})

export const bookmarkActions = userBookmarkSlice.actions

const store = configureStore({ reducer: userBookmarkSlice.reducer })

export default store