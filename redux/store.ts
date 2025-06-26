import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

// Tạo store Redux
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// Kiểu của RootState (state toàn cục)
export type RootState = ReturnType<typeof store.getState>;

// Kiểu của dispatch
export type AppDispatch = typeof store.dispatch;

export default store;
