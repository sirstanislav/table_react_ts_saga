import { combineReducers } from "@reduxjs/toolkit";
import excelSlice from "./excelSlice"

const rootReducer = combineReducers({
  excelSlice: excelSlice.reducer,
})

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer