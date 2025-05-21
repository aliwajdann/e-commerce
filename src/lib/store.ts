// lib/store.ts
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "@/redux/cartSlice";
import toggleReducer from "../redux/drawerSlice"; // adjust path if needed


export const store = configureStore({
  reducer: {
    cart: cartReducer,
     toggle: toggleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
