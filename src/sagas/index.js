import { all, fork } from "redux-saga/effects";
import wow from "./wow";
import addons from "./addons";

export default function* root() {
  yield all([fork(wow), fork(addons)]);
}
