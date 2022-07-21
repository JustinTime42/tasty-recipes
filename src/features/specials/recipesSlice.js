import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    recipes: [],
}

export const recipesSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers: {
        setRecipes: (state, action) => {
            state.recipes = action.payload
        }
    }
})

export const {setRecipes} = recipesSlice.actions

export default recipesSlice.reducer