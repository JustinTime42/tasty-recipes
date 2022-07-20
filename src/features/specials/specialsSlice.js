import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    specials: [],
}

export const specialsSlice = createSlice({
    name: 'specials',
    initialState,
    reducers: {
        setSpecials: (state, action) => {
            state.specials = action.payload
        }
    }
})

export const {setSpecials} = specialsSlice.actions

export default specialsSlice.reducer