export const INSTALLATION_DIRECTORY_REQUEST = Symbol(
  "INSTALLATION_DIRECTORY_REQUEST"
);
export const INSTALLATION_DIRECTORY_RESPONSE = Symbol(
  "INSTALLATION_DIRECTORY_RESPONSE"
);
export const INSTALLATION_DIRECTORY_ERROR = Symbol(
  "INSTALLATION_DIRECTORY_ERROR"
);

export function installationDirectoryRequest() {
  return {
    type: INSTALLATION_DIRECTORY_REQUEST
  };
}

export function installationDirectoryResponse(directory) {
  return {
    type: INSTALLATION_DIRECTORY_RESPONSE,
    directory
  };
}

export function installationDirectoryError(error) {
  return {
    type: INSTALLATION_DIRECTORY_ERROR,
    error
  };
}
