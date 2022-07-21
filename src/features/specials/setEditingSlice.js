import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    editing: false,
}

export const setEditingSlice = createSlice({
    name: 'setEditing',
    initialState,
    reducers: {
        setEditing: (state, action) => {
            state.editing = action.payload
        }
    }
})

export const {setEditing} = setEditingSlice.actions

export default setEditingSlice.reducer