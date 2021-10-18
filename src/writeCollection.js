import pickBy from "lodash.pickby";
import zipObject from "lodash.zipobject";

export function writeCollection(collection) {
  // Verify that we are in server environment
  if (typeof window !== "undefined") {
    throw new Error(
      "writeCollection was invoked on client, but writing can only be done server-side."
    );
  }

  const path = require("path");
  const fse = require("fs-extra");

  // Ensure target directory exists
  const filePath = this.getCollectionFilePath(collection);
  fse.ensureDirSync(path.dirname(filePath));

  // Get all collections that share the same file name as this collection
  const collections = pickBy(
    this.collections,
    ({ file }) => file === this.getCollection(collection).file
  );

  // Assemble data from collections
  const data = zipObject(
    Object.keys(collections),
    Object.keys(collections).map((collectionName) => this.data[collectionName])
  );

  // Write human-friendly
  fse.writeJsonSync(filePath.replace(/\.min.json$/, ".json"), data, {
    spaces: 2,
  });

  // Write minified
  fse.writeJsonSync(filePath, data);
}
