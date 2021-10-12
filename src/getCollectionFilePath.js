export function getCollectionFilePath(collection) {
  // Verify that we are in server environment
  if (typeof window !== "undefined") {
    throw new Error(
      "getCollectionFilePath was invoked on client, but file paths are only available server-side."
    );
  }

  // Verify that the collection exists
  if (!this.hasCollection(collection))
    throw new Error(`Collection with name ${collection} does not exist.`);

  const path = require("path");
  return path.resolve(
    "./public/data",
    `${this.collections[collection].file}.json`
  );
}
