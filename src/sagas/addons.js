import { put, takeEvery } from "redux-saga/effects";
import {
  LIST_LOCAL_ADDONS_REQUEST,
  listLocalAddonsResponse,
  listLocalAddonsError,
  FETCH_REMOTE_ADDON_REQUEST,
  fetchRemoteAddonResponse,
  fetchRemoteAddonError
} from "../actions/addons";

const listWowAddons = window
  .require("electron")
  .remote.require("./lib/listWowAddons");

const Curse = window.require("electron").remote.require("./lib/curse");

function* fetchWowAddons(action) {
  try {
    const addons = yield listWowAddons(action.directory);
    yield put(listLocalAddonsResponse(addons));
  } catch (error) {
    yield put(listLocalAddonsError(error));
  }
}

function* fetchRemoteAddonInfos(action) {
  try {
    const remoteAddon = yield Curse.getRemoteAddonInfos(action.identifier);
    yield put(fetchRemoteAddonResponse(remoteAddon));
  } catch (error) {
    yield put(fetchRemoteAddonError(error));
  }
}

export default function* saga() {
  yield takeEvery(LIST_LOCAL_ADDONS_REQUEST, fetchWowAddons);
  yield takeEvery(FETCH_REMOTE_ADDON_REQUEST, fetchRemoteAddonInfos);
}
