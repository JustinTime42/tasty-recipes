import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    recipe: {
        uuid: '',
        title: '',
        description: '',
        images: {},
        servings: 0,
        prepTime: 0,
        cookTime: 0,
        postDate: '',
        editDate: '',
        ingredients: [],
        directions: [],

    },
}

export const activeRecipeSlice = createSlice({
    name: 'activeRecipe',
    initialState,
    reducers: {
        setActiveRecipe: (state, action) => {
            state.recipe = action.payload
        },
        clearActiveRecipe: (state, action) => {
            console.log(initialState.recipe)
            state.recipe = initialState.recipe
        }
    }
})

export const {setActiveRecipe, clearActiveRecipe} = activeRecipeSlice.actions

export default activeRecipeSlice.reducer