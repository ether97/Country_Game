import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "../game/gameSlice";
import { apiSlice } from "../api/apiSlice";
import languageReducer from "../game/languageSlice";
import flagReducer from "../game/flagSlice";
import capitalReducer from "../game/capitalSlice";
import currencyReducer from "../game/currencySlice";
import regionReducer from "../game/regionSlice";

export const store = configureStore({
  reducer: {
    game: gameReducer,
    language: languageReducer,
    flag: flagReducer,
    capital: capitalReducer,
    currency: currencyReducer,
    region: regionReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
