import {
  LIST_LOCAL_ADDONS_REQUEST,
  LIST_LOCAL_ADDONS_RESPONSE,
  LIST_LOCAL_ADDONS_ERROR,
  FETCH_REMOTE_ADDON_REQUEST,
  FETCH_REMOTE_ADDON_RESPONSE,
  FETCH_REMOTE_ADDON_ERROR
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
    case FETCH_REMOTE_ADDON_REQUEST:
      return {
        ...state,
        fetchingRemoteAddon: action.identifier,
        remoteAddon: null,
        fetchRemoteAddonError: null
      };
    case FETCH_REMOTE_ADDON_RESPONSE:
      return {
        ...state,
        fetchingRemoteAddon: false,
        remoteAddon: action.addon,
        fetchRemoteAddonError: null
      };
    case FETCH_REMOTE_ADDON_ERROR:
      return {
        ...state,
        fetchingRemoteAddon: false,
        remoteAddon: null,
        fetchRemoteAddonError: action.error
      };
    default:
      return state;
  }
}
