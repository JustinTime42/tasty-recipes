import { configureStore } from '@reduxjs/toolkit'
import specialsReducer from '../features/specials/specialsSlice'
import recipesReducer from '../features/specials/recipesSlice'
import activeRecipeReducer from '../features/specials/activeRecipeSlice'
import setEditingReducer from '../features/specials/setEditingSlice'

export const store = configureStore({
    reducer: {
        specials: specialsReducer,
        recipes: recipesReducer,
        activeRecipe: activeRecipeReducer,
        setEditing: setEditingReducer,
    },
})