import { combineReducers } from "redux";
import wow from "./wow";
import addons from "./addons";

const rootReducer = combineReducers({
  log: (state = {}, action) => {
    console.log(action);
    return state;
  },
  wow,
  addons
});

export default rootReducer;
