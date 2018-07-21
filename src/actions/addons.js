export const LIST_LOCAL_ADDONS_REQUEST = Symbol("LIST_ADDONS_REQUEST");
export const LIST_LOCAL_ADDONS_RESPONSE = Symbol("LIST_LOCAL_ADDONS_RESPONSE");
export const LIST_LOCAL_ADDONS_ERROR = Symbol("LIST_LOCAL_ADDONS_ERROR");

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
