import urlJoin from "url-join";

export function getCollectionWebPath(collection) {
  // Verify that the collection exists
  if (!this.hasCollection(collection))
    throw new Error(`Collection with name ${collection} does not exist.`);

  return urlJoin("/data", `${collection}.json`);
}
