export const LIST_LOCAL_ADDONS_REQUEST = Symbol("LIST_ADDONS_REQUEST");
export const LIST_LOCAL_ADDONS_RESPONSE = Symbol("LIST_LOCAL_ADDONS_RESPONSE");
export const LIST_LOCAL_ADDONS_ERROR = Symbol("LIST_LOCAL_ADDONS_ERROR");

export const FETCH_REMOTE_ADDON_REQUEST = Symbol("FETCH_REMOTE_ADDON_REQUEST");
export const FETCH_REMOTE_ADDON_RESPONSE = Symbol(
  "FETCH_REMOTE_ADDON_RESPONSE"
);
export const FETCH_REMOTE_ADDON_ERROR = Symbol("FETCH_REMOTE_ADDON_ERROR");

export function listLocalAddonsRequest(directory) {
  return {
    type: LIST_LOCAL_ADDONS_REQUEST,
    directory
  };
}

export function listLocalAddonsResponse(addons) {
  return {
    type: LIST_LOCAL_ADDONS_RESPONSE,
    addons
  };
}

export function listLocalAddonsError(error) {
  return {
    type: LIST_LOCAL_ADDONS_ERROR,
    error
  };
}

export function fetchRemoteAddonRequest(identifier) {
  return {
    type: FETCH_REMOTE_ADDON_REQUEST,
    identifier
  };
}

export function fetchRemoteAddonResponse(addon) {
  return {
    type: FETCH_REMOTE_ADDON_RESPONSE,
    addon
  };
}

export function fetchRemoteAddonError(error) {
  return {
    type: FETCH_REMOTE_ADDON_ERROR,
    error
  };
}
