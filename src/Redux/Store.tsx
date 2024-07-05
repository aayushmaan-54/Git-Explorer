import { configureStore } from '@reduxjs/toolkit';
import homeReducer from './Slices/HomeSlice';
import usersReducer from './Slices/UserSlice';

export const store = configureStore({
  reducer: {
    home: homeReducer,
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
