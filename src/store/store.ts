import {combineReducers, configureStore} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import rootReducer from "@/store/rootReducer"
import { persistStore,persistReducer } from 'redux-persist';
const rootPersistConfig = {
  key: "root_persist",
  storage,
  blacklist: ["toast"],
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(rootPersistConfig, rootReducer)
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Important
    }),
});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch