import { put, takeEvery } from "redux-saga/effects";
import {
  INSTALLATION_DIRECTORY_REQUEST,
  installationDirectoryResponse,
  installationDirectoryError
} from "../actions/wow";

const getWowLocation = window
  .require("electron")
  .remote.require("./lib/getWowLocation");

function* fetchInstallationDirectory(action) {
  try {
    const directory = yield getWowLocation();
    yield put(installationDirectoryResponse(directory));
  } catch (error) {
    yield put(installationDirectoryError(error));
  }
}

export default function* saga() {
  yield takeEvery(INSTALLATION_DIRECTORY_REQUEST, fetchInstallationDirectory);
}
