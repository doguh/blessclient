const Registry = require("winreg");

module.exports = async function getWowLocation() {
  const regKey = new Registry({
    hive: Registry.HKLM,
    key: "\\SOFTWARE\\Wow6432Node\\Blizzard Entertainment\\World of Warcraft"
  });

  const val = await new Promise((resolve, reject) => {
    regKey.get("InstallPath", (error, key) => {
      if (error) {
        return reject(error);
      }
      resolve(key.value);
    });
  });

  return val;
};
