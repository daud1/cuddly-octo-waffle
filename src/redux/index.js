import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore
} from "redux-persist";
import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import authReducer from "../auth/reducers";
import employerReducer from "../employer/reducers";
import storage from "redux-persist/lib/storage";

const persistedReducer = persistReducer(
  { key: "root", storage },
  combineReducers({ auth: authReducer, employer: employerReducer })
);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  })
});

const persistor = persistStore(store);

export default { store, persistor };
