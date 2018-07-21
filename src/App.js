import React, { Component } from "react";
import { connect } from "react-redux";
import { map } from "lodash";
import { installationDirectoryRequest } from "./actions/wow";
import { listLocalAddonsRequest } from "./actions/addons";

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
                  {addon.Title || addon.name} (Version{" "}
                  {addon.Version || "inconnue"})
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
    fetchLocalAddonsError: state.addons.fetchLocalAddonsError
  };
}

export default connect(mapStateToProps)(App);
