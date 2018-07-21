import { put, takeEvery } from "redux-saga/effects";
import {
  LIST_LOCAL_ADDONS_REQUEST,
  listLocalAddonsResponse,
  listLocalAddonsError
} from "../actions/addons";

const listWowAddons = window
  .require("electron")
  .remote.require("./lib/listWowAddons");

function* fetchWowAddons(action) {
  try {
    const addons = yield listWowAddons(action.directory);
    yield put(listLocalAddonsResponse(addons));
  } catch (error) {
    yield put(listLocalAddonsError(error));
  }
}

export default function* saga() {
  yield takeEvery(LIST_LOCAL_ADDONS_REQUEST, fetchWowAddons);
}
