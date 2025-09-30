import { configureStore } from "@reduxjs/toolkit";
import { rentalApi } from "./api/rentalApi";

export const store = configureStore({
  reducer: {
    [rentalApi.reducerPath]: rentalApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rentalApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
