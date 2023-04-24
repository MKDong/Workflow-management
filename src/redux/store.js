import { configureStore } from '@reduxjs/toolkit'
import couterSlice from './couterSlice/couterSlice'

export const store = configureStore({
    reducer: {
        counter: couterSlice,
    },
})