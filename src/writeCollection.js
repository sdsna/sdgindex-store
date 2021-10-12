const FILE_PATH = "./public/data";

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
  fse.ensureDirSync(FILE_PATH);

  // Write human-friendly
  fse.writeJsonSync(
    path.join(FILE_PATH, `${collection}-raw.json`),
    this.data[collection],
    { spaces: 2 }
  );

  // Write minified
  fse.writeJsonSync(
    path.join(FILE_PATH, `${collection}.json`),
    this.data[collection]
  );
}
