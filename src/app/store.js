import { configureStore } from '@reduxjs/toolkit'
import specialsReducer from '../features/specials/specialsSlice'

export const store = configureStore({
    reducer: {
        specials: specialsReducer,
    },
})