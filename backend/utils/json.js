const fs = require("fs");
const path = require("path");

function parse(filePath, defaultArray = []) {
  if (!fs.existsSync(filePath)) return defaultArray;
  const fileData = fs.readFileSync(filePath, "utf8");
  try {
    return JSON.parse(fileData);
  } catch (err) {
    return defaultArray;
  }
}

function serialize(filePath, object) {
  const objectSerialized = JSON.stringify(object);
  createPotentialLastDirectory(filePath);
  fs.writeFileSync(filePath, objectSerialized);
}

function createPotentialLastDirectory(filePath) {
  const pathToLastDirectory = filePath.substring(
    0,
    filePath.lastIndexOf(path.sep)
  );

  if (fs.existsSync(pathToLastDirectory)) return;

  fs.mkdirSync(pathToLastDirectory);
}

module.exports = {
  parse,
  serialize,
};