import {
  LIST_LOCAL_ADDONS_REQUEST,
  LIST_LOCAL_ADDONS_RESPONSE,
  LIST_LOCAL_ADDONS_ERROR
} from "../actions/addons";

export default function(state = {}, action) {
  switch (action.type) {
    case LIST_LOCAL_ADDONS_REQUEST:
      return {
        ...state,
        fetchingLocalAddons: true,
        installed: null,
        fetchLocalAddonsError: null
      };
    case LIST_LOCAL_ADDONS_RESPONSE:
      return {
        ...state,
        fetchingLocalAddons: false,
        installed: action.addons,
        fetchLocalAddonsError: null
      };
    case LIST_LOCAL_ADDONS_ERROR:
      return {
        ...state,
        fetchingLocalAddons: false,
        installed: null,
        fetchLocalAddonsError: action.error
      };
    default:
      return state;
  }
}
