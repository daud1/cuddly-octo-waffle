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
import {
  combineReducers,
  configureStore,
  getDefaultMiddleware
} from "@reduxjs/toolkit";

import authReducer from "../../auth/reducers";
import employerReducer from "../../employer/reducers";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
// import employeeReducer from "../../employee/reducers";

const rootReducer = combineReducers({
  auth: authReducer,
  employer: employerReducer
  // employee: employeeReducer,
});
const persistedReducer = persistReducer({ key: "root", storage }, rootReducer);

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
