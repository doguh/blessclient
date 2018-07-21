import {
  INSTALLATION_DIRECTORY_REQUEST,
  INSTALLATION_DIRECTORY_RESPONSE,
  INSTALLATION_DIRECTORY_ERROR
} from "../actions/wow";

export default function(state = {}, action) {
  switch (action.type) {
    case INSTALLATION_DIRECTORY_REQUEST:
      return {
        ...state,
        fetchingInstallDir: true,
        installDir: null,
        fetchInstallDirError: null
      };
    case INSTALLATION_DIRECTORY_RESPONSE:
      return {
        ...state,
        fetchingInstallDir: false,
        installDir: action.directory,
        fetchInstallDirError: null
      };
    case INSTALLATION_DIRECTORY_ERROR:
      return {
        ...state,
        fetchingInstallDir: false,
        installDir: null,
        fetchInstallDirError: action.error
      };
    default:
      return state;
  }
}
