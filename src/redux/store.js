import { configureStore } from '@reduxjs/toolkit'
import couterSlice from './couterSlice/couterSlice'
import UserSlice from './couterSlice/UserSlice'
import TaskSlice from './couterSlice/TaskSlice';

export const store = configureStore({
  reducer: {
    counter: couterSlice,
    user: UserSlice,
    taskSlice: TaskSlice,
  },
});