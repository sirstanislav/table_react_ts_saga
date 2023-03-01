import { all } from "redux-saga/effects";
import { excelSaga } from "../slices/excelSlice";

export function* rootSaga() {
  yield all([excelSaga()]);
}
