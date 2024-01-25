import { combineReducers, configureStore } from "@reduxjs/toolkit";

import weatherSlice from "../features/weatherSlice.js";

const rootReducer = combineReducers({
  wheatherSlice: weatherSlice,
});

export default configureStore({
  reducer: {
    rootReducer: rootReducer,
  },
});
