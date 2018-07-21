const Crawler = require("crawler");

async function parseLatestVersions(res, phase = "release") {
  const $ = res.$;
  const items = $(".project-file-list__item");
  const versions = [];
  $(items).each(function(index) {
    const isRelease = $(this).find(`.file-phase--${phase}`).length;
    if (isRelease) {
      const tag = $(this).find(
        ".project-file__name .table__content.file__name.full"
      );
      const dl = $(this).find(".button--download.download-button");
      versions.push({ name: $(tag).text(), url: `${$(dl).attr("href")}/file` });
    }
  });
  return versions;
}

async function getRemoteAddonInfos(name) {
  return new Promise((resolve, reject) => {
    const c = new Crawler({
      maxConnections: 10,
      callback: function(error, res, done) {
        if (error) {
          reject(error);
        } else {
          parseLatestVersions(res)
            .then(versions =>
              resolve({
                identifier: name,
                latestVersion: versions.length ? versions[0] : null
              })
            )
            .catch(err => reject(err));
        }
        done();
      }
    });

    c.queue([
      {
        uri: `https://www.curseforge.com/wow/addons/${name}/files?sort=releasetype`
      }
    ]);
  });
}

module.exports = {
  getRemoteAddonInfos
};
