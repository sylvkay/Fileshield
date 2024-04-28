//importing the reducres
import authReducer from "./slices/authSlice.ts";
import fileReducer from "./slices/fileSlice.ts";

//improts from RTK
import { combineReducers, configureStore } from "@reduxjs/toolkit";

//imports from redux persist

import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

//type declarations
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;

//root reducer
const rootReducer = combineReducers({
  auth: authReducer,
  file: fileReducer,
});

const persistConfig = {
  key: "root",
  storage,
  // Optionally, whitelist some reducers if you don't want to persist all state
  // whitelist: ['reducer1', 'reducer2'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  // Other middleware and options if needed
});

const persistor = persistStore(store);

export { store, persistor };
