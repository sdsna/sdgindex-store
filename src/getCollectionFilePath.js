export function getCollectionFilePath(collection) {
  // Verify that we are in server environment
  if (typeof window !== "undefined") {
    throw new Error(
      "getCollectionFilePath was invoked on client, but file paths are only available server-side."
    );
  }

  const path = require("path");
  return path.resolve(
    "./public/data",
    `${this.getCollection(collection).file}.min.json`
  );
}
