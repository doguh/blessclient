import React, { Component } from "react";
import { connect } from "react-redux";
import { map } from "lodash";
import { installationDirectoryRequest } from "./actions/wow";
import {
  listLocalAddonsRequest,
  listLocalAddonsResponse,
  fetchRemoteAddonRequest
} from "./actions/addons";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(installationDirectoryRequest());
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.installDir !== nextProps.installDir &&
      nextProps.installDir
    ) {
      this.props.dispatch(listLocalAddonsRequest(nextProps.installDir));
    }
    if (
      (nextProps.fetchingRemoteAddon &&
        nextProps.fetchingRemoteAddon !== this.props.fetchingRemoteAddon) ||
      (nextProps.remoteAddon &&
        nextProps.remoteAddon !== this.props.remoteAddon)
    ) {
      const identifier =
        nextProps.fetchingRemoteAddon || nextProps.remoteAddon.identifier;
      const addons = map(nextProps.installedAddons, addon => {
        if (addon.metadata.identifier === identifier) {
          return {
            ...addon,
            latestVersion: {
              fetching: !!nextProps.fetchingRemoteAddon,
              name:
                nextProps.remoteAddon &&
                nextProps.remoteAddon.latestVersion &&
                nextProps.remoteAddon.latestVersion.name,
              url:
                nextProps.remoteAddon &&
                nextProps.remoteAddon.latestVersion &&
                nextProps.remoteAddon.latestVersion.url
            }
          };
        }
        return addon;
      });
      this.props.dispatch(listLocalAddonsResponse(addons));
    }
  }

  render() {
    return (
      <div className="App">
        {this.props.fetchingInstallDir ? (
          <p>Recherche du répertoire d'installation...</p>
        ) : null}
        {this.props.installDir ? (
          <p>Repertoire d'installation : {this.props.installDir}</p>
        ) : null}
        {this.props.fetchInstallDirError ? (
          <p>Erreur lors de la recherche du repertoire d'installation</p>
        ) : null}
        {this.props.fetchingLocalAddons ? (
          <p>Chargement de la liste des addons installés...</p>
        ) : null}
        {this.props.fetchLocalAddonsError ? (
          <p>Erreur lors du chargement de la liste des addons installés</p>
        ) : null}
        {this.props.installedAddons ? (
          <div>
            <p>Addons installés : {this.props.installedAddons.length}</p>
            <ul>
              {map(this.props.installedAddons, (addon, index) => (
                <li key={index}>
                  {addon.Title || addon.metadata.identifier} (Version{" "}
                  {addon.metadata.version || "inconnue"})
                  <button
                    onClick={() =>
                      this.props.dispatch(
                        fetchRemoteAddonRequest(addon.metadata.identifier)
                      )
                    }
                  >
                    Vérifier
                  </button>
                  {addon.latestVersion
                    ? `(Latest version: ${
                        addon.latestVersion.fetching
                          ? "..."
                          : addon.latestVersion.error
                            ? "ERROR"
                            : addon.latestVersion.name
                      })`
                    : null}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    fetchingInstallDir: state.wow.fetchingInstallDir,
    installDir: state.wow.installDir,
    fetchInstallDirError: state.wow.fetchInstallDirError,
    fetchingLocalAddons: state.addons.fetchingLocalAddons,
    installedAddons: state.addons.installed,
    fetchLocalAddonsError: state.addons.fetchLocalAddonsError,
    fetchingRemoteAddon: state.addons.fetchingRemoteAddon,
    remoteAddon: state.addons.remoteAddon,
    fetchRemoteAddonError: state.addons.fetchRemoteAddonError
  };
}

export default connect(mapStateToProps)(App);
