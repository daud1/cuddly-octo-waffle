import { combineReducers, configureStore } from "@reduxjs/toolkit";

import authReducer from "../auth/reducers";
import employerReducer from "../employer/reducers";

// import employeeReducer from "../../employee/reducers";

const rootReducer = combineReducers({
  auth: authReducer,
  employer: employerReducer,
  // employee: employeeReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default { store };
