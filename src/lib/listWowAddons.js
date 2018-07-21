const { readdir, exists, readFile } = require("fs");
const { map, filter } = require("lodash");
const { join } = require("path");

async function getAddon(name, addonsDir) {
  const descriptor = join(addonsDir, name, `${name}.toc`);
  const isAddon = await new Promise((resolve, reject) => {
    exists(descriptor, success => {
      resolve(success);
    });
  });
  if (!isAddon) {
    return false;
  }
  const addon = await new Promise((resolve, reject) => {
    readFile(descriptor, "utf8", (error, content) => {
      if (error) {
        return reject(error);
      }
      const lines = content.split("\r\n");
      const metadata = {
        folder: name
      };
      const addonObject = { metadata };
      map(lines, line => {
        if (line.substr(0, 2) === "##") {
          const spl = line.replace("## ", "").split(":");
          if (spl.length > 1) {
            addonObject[spl.shift().trim()] = spl.join(":").trim();
          }
        }
      });
      metadata.identifier = addonObject["X-Curse-Project-ID"] || name;
      metadata.version =
        addonObject.Version || addonObject["X-Curse-Packaged-Version"];
      resolve(addonObject);
    });
  });
  return addon;
}

module.exports = async function listWowAddons(wowInstallDir) {
  const addonsDir = join(wowInstallDir, "Interface", "AddOns");
  const addons = await new Promise((resolve, reject) => {
    readdir(addonsDir, (error, filenames) => {
      if (error) {
        return reject(error);
      }
      const promises = map(filenames, (filename, index) =>
        getAddon(filename, addonsDir)
      );
      Promise.all(promises)
        .then(_addons => {
          resolve(filter(_addons));
        })
        .catch(error => {
          reject(error);
        });
    });
  });
  return addons;
};
