export function writeCollection(collection) {
  // Verify that we are in server environment
  if (typeof window !== "undefined") {
    throw new Error(
      "writeCollection was invoked on client, but writing can only be done server-side."
    );
  }

  // Verify that the collection exists
  if (!this.hasCollection(collection))
    throw new Error(`Collection with name ${collection} does not exist.`);

  const path = require("path");
  const fse = require("fs-extra");

  // Ensure target directory exists
  const filePath = this.getCollectionFilePath(collection);
  fse.ensureDirSync(path.dirname(filePath));

  // Write human-friendly
  fse.writeJsonSync(
    filePath.replace(/\.json$/, "-raw.json"),
    this.data[collection],
    { spaces: 2 }
  );

  // Write minified
  fse.writeJsonSync(filePath, this.data[collection]);
}
